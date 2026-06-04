"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-24 right-5 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full border border-ink/10 bg-white text-ink shadow-soft transition hover:-translate-y-1 hover:border-champagne hover:text-bronze"
    >
      <ArrowUp size={21} />
    </button>
  );
}
