"use client";

import { Instagram, Mail, Menu, Phone, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { defaultSettings, getWhatsAppUrl, navItems } from "@/lib/site-data";
import type { SiteSettings } from "@/lib/site-types";

type NavbarProps = {
  settings?: SiteSettings;
};

export function Navbar({ settings }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const safeSettings = { ...defaultSettings, ...settings };
  const instagramHref =
    safeSettings.instagramUrl && safeSettings.instagramUrl !== "#contact"
      ? safeSettings.instagramUrl
      : "https://www.instagram.com/dr.xiao9d/";
  const instagramLabel = getInstagramLabel(instagramHref);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="border-b border-champagne/20 bg-ink text-white">
        <div className="mx-auto flex min-h-9 max-w-7xl items-center justify-between gap-4 px-5 py-2 text-xs sm:px-8">
          <div className="hidden items-center gap-3 font-semibold uppercase tracking-[0.2em] text-champagne md:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-champagne" />
            <span>International 9D Facelift Consultation</span>
          </div>
          <div className="grid w-full grid-cols-3 items-center gap-2 md:flex md:w-auto md:justify-end md:gap-6">
            <a
              href={getWhatsAppUrl(safeSettings)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-w-0 items-center justify-start gap-1.5 font-semibold text-white/82 transition hover:text-champagne md:gap-2"
            >
              <Phone size={13} />
              <span>WhatsApp</span>
              <span className="hidden sm:inline">{safeSettings.whatsappNumber}</span>
            </a>
            <a
              href={instagramHref}
              target={instagramHref.startsWith("http") ? "_blank" : undefined}
              rel={instagramHref.startsWith("http") ? "noreferrer" : undefined}
              className="inline-flex min-w-0 items-center justify-center gap-1.5 font-semibold text-white/82 transition hover:text-champagne md:gap-2"
            >
              <Instagram size={13} />
              <span className="truncate">{instagramLabel}</span>
            </a>
            <a
              href={`mailto:${safeSettings.email}`}
              className="inline-flex min-w-0 items-center justify-end gap-1.5 font-semibold text-white/82 transition hover:text-champagne md:gap-2"
            >
              <Mail size={13} />
              <span className="hidden sm:inline">{safeSettings.email}</span>
              <span className="sm:hidden">Email</span>
            </a>
          </div>
        </div>
      </div>

      <div
        className={`transition-all duration-300 ${
          scrolled ? "bg-porcelain/95 shadow-soft backdrop-blur" : "bg-ink/95 backdrop-blur-sm"
        }`}
      >
        <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link href="/#hero" className="flex flex-col leading-none" onClick={() => setOpen(false)}>
            <span className={`font-display text-xl font-semibold ${scrolled ? "text-ink" : "text-white"}`}>
              Dr. Xiao Zhongye
            </span>
            <span className={`mt-1 text-[11px] uppercase tracking-[0.18em] ${scrolled ? "text-bronze" : "text-champagne"}`}>
              9D Facelift
            </span>
          </Link>

          <div className="hidden items-center gap-5 xl:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-[13px] font-medium transition-colors hover:text-champagne ${
                  scrolled ? "text-graphite" : "text-white"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/consultation"
              className="inline-flex h-11 items-center rounded-md bg-champagne px-5 text-sm font-semibold text-ink transition hover:bg-bronze hover:text-white"
            >
              Consultation
            </Link>
          </div>

          <button
            type="button"
            className={`inline-flex h-11 w-11 items-center justify-center rounded-md border xl:hidden ${
              scrolled ? "border-ink/15 text-ink" : "border-white/25 text-white"
            }`}
            aria-label="Toggle navigation"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </div>

      {open ? (
        <div className="border-t border-ink/10 bg-porcelain px-5 py-5 shadow-soft xl:hidden">
          <div className="mx-auto grid max-w-7xl gap-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-3 text-sm font-semibold text-graphite hover:bg-mist"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/consultation"
              className="mt-2 rounded-md bg-ink px-4 py-3 text-center text-sm font-semibold text-white"
              onClick={() => setOpen(false)}
            >
              Consultation
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}

function getInstagramLabel(url: string) {
  const fallback = "@dr.xiao9d";

  if (!url.startsWith("http")) return fallback;

  try {
    const pathname = new URL(url).pathname.replace(/^\/|\/$/g, "");
    const handle = pathname.split("/")[0];
    return handle ? `@${handle}` : fallback;
  } catch {
    return fallback;
  }
}
