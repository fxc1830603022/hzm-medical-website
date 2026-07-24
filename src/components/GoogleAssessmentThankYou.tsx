"use client";

import { ArrowRight, Camera, CheckCircle2, LockKeyhole, MessageCircle } from "lucide-react";
import Link from "next/link";
import type { GoogleAdsLandingPageContent } from "@/lib/google-ads-landing";
import { defaultSettings, getWhatsAppUrl } from "@/lib/site-data";
import { TrackedWhatsAppLink } from "./TrackedWhatsAppLink";

type GoogleAssessmentThankYouProps = {
  content: GoogleAdsLandingPageContent;
};

export function GoogleAssessmentThankYou({ content }: GoogleAssessmentThankYouProps) {
  const whatsappUrl = getWhatsAppUrl({
    ...defaultSettings,
    whatsappNumber: content.whatsappNumber,
    whatsappMessage: content.thankYou.whatsappMessage
  });

  return (
    <div className="min-h-screen bg-[#F7F4EE] text-[#202321] antialiased">
      <header className="border-b border-[#DED6C8] bg-[#FCFBF8]">
        <div className="mx-auto flex h-[72px] max-w-[1120px] items-center justify-between px-5 sm:px-8">
          <div aria-label="Dr. Xiao 9D Lifting System">
            <span className="block font-display text-xl font-semibold leading-none">DR. XIAO</span>
            <span className="mt-1 block text-[9px] font-bold uppercase tracking-[0.18em] text-[#B8A98F]">9D Lifting System</span>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#53685E]">Private Assessment</span>
        </div>
      </header>

      <main className="mx-auto grid max-w-[1060px] grid-cols-1 gap-10 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div>
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#E5EDE7] text-[#42564D]">
            <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
          </span>
          <p className="mt-7 text-[11px] font-bold uppercase tracking-[0.2em] text-[#9B8562]">{content.thankYou.eyebrow}</p>
          <h1 className="mt-3 font-display text-[42px] font-semibold leading-tight sm:text-[54px]">{content.thankYou.title}</h1>
          <p className="mt-5 max-w-[600px] text-base leading-8 text-[#4B504D]">
            {content.thankYou.description}
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <TrackedWhatsAppLink
              href={whatsappUrl}
              placement="google_assessment_thank_you"
              label="Send assessment photos on WhatsApp"
              className="inline-flex h-14 items-center justify-center gap-3 rounded-[11px] bg-[#42564D] px-6 text-sm font-bold text-white transition hover:bg-[#53685E]"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              {content.thankYou.whatsappLabel}
            </TrackedWhatsAppLink>
            <Link
              href="/ads/google-9d-facelift#real-results"
              className="inline-flex h-14 items-center justify-center gap-3 rounded-[11px] border border-[#B8A98F] bg-[#FCFBF8] px-6 text-sm font-bold"
            >
              {content.thankYou.returnLabel}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <section className="rounded-[16px] border border-[#D8CBB7] bg-[#FCFBF8] p-6 shadow-[0_24px_70px_rgba(32,35,33,0.08)] sm:p-8">
          <div className="flex items-center gap-3">
            <Camera className="h-5 w-5 text-[#53685E]" aria-hidden="true" />
            <h2 className="font-display text-2xl font-semibold">{content.thankYou.checklistTitle}</h2>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {content.thankYou.photoItems.map((photo, index) => (
              <div key={photo} className="rounded-[12px] border border-[#DED6C8] bg-[#F7F4EE] p-4">
                <span className="text-[10px] font-bold text-[#9B8562]">0{index + 1}</span>
                <p className="mt-2 text-xs font-bold">{photo}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-[12px] bg-[#E8EEE9] p-4 text-xs leading-6 text-[#42564D]">
            {content.thankYou.photoInstructions}
          </div>
          <p className="mt-5 flex items-start gap-2 text-[11px] leading-5 text-[#6A6F6C]">
            <LockKeyhole className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            {content.thankYou.disclaimer}
          </p>
        </section>
      </main>
    </div>
  );
}
