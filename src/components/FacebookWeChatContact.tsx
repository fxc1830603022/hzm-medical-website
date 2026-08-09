"use client";

import { Check, Copy, MessagesSquare, ScanLine, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { trackAdsLandingEvent } from "@/lib/tracking";

export type FacebookWeChatDetails = {
  description: string;
  qrImage: string;
  wechatId: string;
};

type FacebookWeChatModalProps = FacebookWeChatDetails & {
  open: boolean;
  placement: string;
  onClose: () => void;
};

export function FacebookWeChatModal({
  open,
  placement,
  onClose,
  description,
  qrImage,
  wechatId
}: FacebookWeChatModalProps) {
  const [mounted, setMounted] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;

    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [onClose, open]);

  if (!mounted || !open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[80] flex items-end justify-center bg-black/72 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      role="presentation"
      onMouseDown={(event) => {
        if (event.currentTarget === event.target) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="facebook-wechat-title"
        className="max-h-[94vh] w-full max-w-[760px] overflow-y-auto rounded-t-md border border-[#C9AC77] bg-[#F8F4EE] shadow-[0_34px_120px_rgba(0,0,0,0.44)] sm:rounded-md"
      >
        <div className="flex min-h-[78px] items-center justify-between gap-5 bg-[#171715] px-5 py-4 text-white sm:px-7">
          <div className="min-w-0">
            <p className="font-display text-[22px] tracking-[0.13em]">DR. XIAO</p>
            <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.2em] text-[#D8BE8B]">9D Lifting System</p>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            aria-label="Close WeChat contact"
            onClick={onClose}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-white/18 bg-white/5 text-white transition hover:border-[#D8BE8B] hover:text-[#D8BE8B]"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="grid gap-7 p-5 sm:grid-cols-[0.78fr_1fr] sm:items-center sm:p-8">
          <QrArtwork qrImage={qrImage} />
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#A27B3D]">Private WeChat contact</p>
            <h2 id="facebook-wechat-title" className="mt-3 font-display text-4xl font-semibold leading-[1.08] text-[#1D1B18] sm:text-5xl">
              Continue privately on WeChat.
            </h2>
            <p className="mt-4 max-w-[430px] text-sm leading-7 text-[#5E554B]">
              {description || "Add our private assessment contact for photo guidance and consultation details."}
            </p>

            <div className="mt-6 border-y border-[#D9C8A9] py-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#8F7D67]">WeChat ID</p>
              <div className="mt-2 flex min-w-0 items-center justify-between gap-4">
                <p className="min-w-0 truncate text-base font-bold text-[#211E1A]">{wechatId || "Scan the QR code"}</p>
                {wechatId ? <CopyWeChatButton wechatId={wechatId} placement={placement} compact /> : null}
              </div>
            </div>

            <div className="mt-5 grid gap-3 text-xs leading-5 text-[#665C51] sm:grid-cols-2">
              <div className="flex gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-sm bg-[#171715] text-[10px] font-bold text-white">01</span>
                Open WeChat and select Scan.
              </div>
              <div className="flex gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-sm bg-[#171715] text-[10px] font-bold text-white">02</span>
                Add the contact to begin privately.
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>,
    document.body
  );
}

export function FacebookWeChatQrCard({
  description,
  qrImage,
  wechatId,
  onOpen
}: FacebookWeChatDetails & { onOpen: () => void }) {
  return (
    <aside className="relative mx-auto w-full max-w-[430px] overflow-hidden rounded-md border border-[#C8A96E] bg-[#F8F4EE] text-[#1D1B18] shadow-[0_26px_80px_rgba(0,0,0,0.28)]">
      <div className="flex items-center justify-between gap-4 border-b border-[#D8C7A8] bg-white/68 px-5 py-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#9D773C]">Alternative private contact</p>
          <p className="mt-1 font-display text-2xl font-semibold">Prefer WeChat?</p>
        </div>
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-[#07C160] text-white shadow-[0_12px_28px_rgba(7,193,96,0.24)]">
          <MessagesSquare className="h-5 w-5" aria-hidden="true" />
        </span>
      </div>

      <div className="grid grid-cols-[132px_1fr] gap-5 p-5 sm:grid-cols-[160px_1fr]">
        <div>
          <button
            type="button"
            onClick={onOpen}
            aria-label="Open larger WeChat QR code"
            className="group relative aspect-square w-full overflow-hidden rounded-md border border-[#D6C49F] bg-white transition hover:-translate-y-0.5 hover:border-[#07C160]"
          >
            <Image src={qrImage} alt="WeChat QR code" fill unoptimized sizes="160px" className="scale-[1.34] object-cover object-center" />
          </button>
          <p className="mt-2 flex items-center justify-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.08em] text-[#81715E]">
            <ScanLine className="h-3.5 w-3.5" aria-hidden="true" />
            Tap to enlarge
          </p>
        </div>
        <div className="min-w-0 self-center">
          <p className="text-sm leading-6 text-[#5F554B]">{description}</p>
          <div className="mt-4 border-t border-[#D8C7A8] pt-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#8D7B65]">WeChat ID</p>
            <p className="mt-1 truncate text-sm font-bold text-[#211E1A]">{wechatId || "Scan QR code"}</p>
          </div>
          {wechatId ? <CopyWeChatButton wechatId={wechatId} placement="facebook_final_wechat" /> : null}
        </div>
      </div>
    </aside>
  );
}

function QrArtwork({ qrImage }: { qrImage: string }) {
  return (
    <div className="mx-auto w-full max-w-[260px]">
      <div className="relative aspect-[520/680] overflow-hidden rounded-md border border-[#D6C49F] bg-white p-2 shadow-[0_20px_60px_rgba(72,52,25,0.12)]">
        <Image src={qrImage} alt="WeChat QR code" fill unoptimized sizes="260px" className="object-contain p-2" />
      </div>
      <p className="mt-3 text-center text-[10px] font-bold uppercase tracking-[0.14em] text-[#8A7862]">Scan with WeChat</p>
    </div>
  );
}

function CopyWeChatButton({ wechatId, placement, compact = false }: { wechatId: string; placement: string; compact?: boolean }) {
  const [copied, setCopied] = useState(false);

  async function copyId() {
    try {
      await navigator.clipboard.writeText(wechatId);
    } catch {
      const field = document.createElement("textarea");
      field.value = wechatId;
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.appendChild(field);
      field.select();
      document.execCommand("copy");
      field.remove();
    }

    setCopied(true);
    trackAdsLandingEvent("WeChatIdCopy", { placement });
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <button
      type="button"
      onClick={copyId}
      className={
        compact
          ? "inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-md border border-[#BEA273] bg-white px-3 text-[11px] font-bold text-[#2C2721] transition hover:border-[#07C160] hover:text-[#087B42]"
          : "mt-4 inline-flex h-10 w-full items-center justify-center gap-2 rounded-md border border-[#BEA273] bg-white px-3 text-[11px] font-bold text-[#2C2721] transition hover:border-[#07C160] hover:text-[#087B42]"
      }
    >
      {copied ? <Check className="h-3.5 w-3.5 text-[#07A552]" aria-hidden="true" /> : <Copy className="h-3.5 w-3.5" aria-hidden="true" />}
      {copied ? "Copied" : compact ? "Copy ID" : "Copy WeChat ID"}
    </button>
  );
}
