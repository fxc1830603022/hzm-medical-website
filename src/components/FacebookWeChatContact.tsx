"use client";

import { Check, Copy, ScanLine, X } from "lucide-react";
import Image from "next/image";
import { type SVGProps, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { trackAdsLandingEvent } from "@/lib/tracking";

export type FacebookWeChatDetails = {
  description: string;
  qrImage: string;
  wechatId: string;
};

export function WeChatBrandIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.89c-.135-.01-.27-.027-.407-.03zm-2.53 3.274c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.969-.982z" />
    </svg>
  );
}

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

export function FacebookWeChatButton({ onOpen }: FacebookWeChatDetails & { onOpen: () => void }) {
  return (
    <div className="flex w-full justify-start lg:justify-end">
      <button
        type="button"
        onClick={onOpen}
        className="group inline-flex h-14 w-full max-w-[360px] items-center justify-between gap-4 rounded-md border border-white/22 bg-white/[0.07] px-4 text-white shadow-[0_18px_52px_rgba(0,0,0,0.18)] transition hover:-translate-y-0.5 hover:border-[#56D894] hover:bg-white/[0.11]"
      >
        <span className="flex min-w-0 items-center gap-3">
          <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-sm bg-[#07C160] text-white shadow-[0_10px_24px_rgba(7,193,96,0.25)]">
            <WeChatBrandIcon className="h-5 w-5" />
          </span>
          <span className="truncate text-sm font-bold">Open WeChat QR Code</span>
        </span>
        <ScanLine className="h-5 w-5 shrink-0 text-[#D8BE8B] transition group-hover:text-[#6BE2A4]" aria-hidden="true" />
      </button>
    </div>
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
