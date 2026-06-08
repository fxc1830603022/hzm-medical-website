"use client";

import { MessageCircle, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";

type WeChatContactCardProps = {
  description: string;
  qrImage: string;
  wechatId?: string;
};

export function WeChatContactCard({ description, qrImage, wechatId }: WeChatContactCardProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: PointerEvent) {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((current) => !current)}
        className="flex w-full gap-4 rounded-md border border-ink/10 bg-white p-4 text-left shadow-soft transition hover:-translate-y-0.5 hover:border-champagne hover:shadow-lift"
      >
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-mist text-bronze">
          <MessageCircle size={22} />
        </span>
        <span>
          <span className="block text-sm font-bold text-ink">WeChat</span>
          <span className="mt-1 block text-sm leading-6 text-graphite/70">{description}</span>
        </span>
      </button>

      {open ? (
        <div
          id={panelId}
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/55 p-5 backdrop-blur-sm md:absolute md:inset-auto md:left-full md:top-0 md:ml-4 md:block md:w-72 md:bg-transparent md:p-0 md:backdrop-blur-0"
        >
          <div className="relative w-full max-w-[320px] rounded-md border border-ink/10 bg-white p-5 text-center shadow-lift md:max-w-none">
            <button
              type="button"
              aria-label="Close WeChat QR code"
              onClick={() => setOpen(false)}
              className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-md border border-ink/10 bg-porcelain text-ink transition hover:border-champagne hover:text-bronze"
            >
              <X size={16} />
            </button>
            <p className="section-label text-left">WECHAT</p>
            <div className="mx-auto mt-4 overflow-hidden rounded-md border border-ink/10 bg-porcelain p-2">
              <Image
                src={qrImage}
                alt="WeChat QR code"
                width={520}
                height={680}
                unoptimized
                className="h-auto w-full rounded-sm"
              />
            </div>
            {wechatId ? <p className="mt-4 text-sm font-semibold text-ink">WeChat ID: {wechatId}</p> : null}
            <p className="mt-3 text-xs leading-5 text-graphite/65">Scan with WeChat to add our assistant.</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
