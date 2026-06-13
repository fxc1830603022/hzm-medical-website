"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function ArticleBackButton() {
  const router = useRouter();

  function handleBack() {
    const referrer = document.referrer ? new URL(document.referrer) : null;
    const cameFromThisSite = referrer?.origin === window.location.origin;

    if (cameFromThisSite && window.history.length > 1) {
      router.back();
      return;
    }

    router.push("/blog");
  }

  return (
    <button
      type="button"
      onClick={handleBack}
      className="inline-flex items-center gap-2 text-sm font-semibold text-champagne transition hover:text-white"
    >
      <ArrowLeft size={16} />
      Back to Articles
    </button>
  );
}
