"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { navItems } from "@/lib/site-data";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-porcelain/95 shadow-soft backdrop-blur" : "bg-ink/35 backdrop-blur-sm"
      }`}
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/#hero" className="flex flex-col leading-none" onClick={() => setOpen(false)}>
          <span className={`font-display text-xl font-semibold ${scrolled ? "text-ink" : "text-white"}`}>
            Dr. Xiao Zhongye
          </span>
          <span className={`mt-1 text-[11px] uppercase tracking-[0.18em] ${scrolled ? "text-bronze" : "text-champagne"}`}>
            9D Lifting System
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
