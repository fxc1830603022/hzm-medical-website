"use client";

import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Facebook,
  Globe2,
  Image as ImageIcon,
  Instagram,
  MessageCircle,
  Music2,
  Plane,
  ShieldCheck,
  Sparkles,
  Stethoscope
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { defaultSettings, getWhatsAppUrl } from "@/lib/site-data";
import type { GalleryItem, SiteSettings } from "@/lib/site-types";
import { trackLinksPageAction } from "@/lib/tracking";
import { TrackedWhatsAppLink } from "./TrackedWhatsAppLink";

type SocialLinksPageViewProps = {
  settings: SiteSettings;
  galleryItems: GalleryItem[];
};

type ActionCard = {
  title: string;
  description: string;
  href: string;
  placement: string;
  icon: typeof MessageCircle;
  featured?: boolean;
  whatsapp?: boolean;
};

type PreviewCase = GalleryItem & {
  age: string;
  country: string;
  procedure: string;
  concern: string;
  resultSummary: string;
};

const heroImage = "/images/dr-xiao-links-hero-portrait.webp";
const methodologyFallbackVideo = "/videos/dr-xiao-9d-methodology-vertical.mp4";
const methodologyFallbackPoster = "/videos/dr-xiao-9d-methodology-poster.jpg";
const internationalJourneyVideo = "/videos/international-arrival-support.mp4";
const internationalJourneyPoster = "/images/international-patients-hero-consultation.webp";
const instagramFallbackUrl = "https://www.instagram.com/dr.xiao9d/";
const facebookFallbackUrl = "https://www.facebook.com/profile.php?id=61580001223508";

const mainActions: ActionCard[] = [
  {
    title: "WhatsApp Facial Assessment",
    description: "Send your photos and concerns for a private online assessment.",
    href: "whatsapp",
    placement: "links_main_whatsapp",
    icon: MessageCircle,
    featured: true,
    whatsapp: true
  },
  {
    title: "View Real Results",
    description: "Explore natural-looking before and after references.",
    href: "/before-after",
    placement: "links_main_results",
    icon: ImageIcon
  },
  {
    title: "9D Facelift",
    description: "Learn how Dr. Xiao's 9D system restores facial structure naturally.",
    href: "/procedures/9d-facelift",
    placement: "links_main_9d_facelift",
    icon: Sparkles
  },
  {
    title: "International Patients",
    description: "Plan your online consultation, travel, treatment, and recovery in Shanghai.",
    href: "/international-patients",
    placement: "links_main_international",
    icon: Globe2
  }
];

const quickStarts: ActionCard[] = [
  {
    title: "I want to know if I'm suitable",
    description: "Private photo review",
    href: "whatsapp",
    placement: "links_quick_suitable_whatsapp",
    icon: ClipboardCheck,
    whatsapp: true
  },
  {
    title: "I want to see real cases",
    description: "Before and after",
    href: "/before-after",
    placement: "links_quick_cases",
    icon: ImageIcon
  },
  {
    title: "I'm traveling from another country",
    description: "International journey",
    href: "/international-patients",
    placement: "links_quick_travel",
    icon: Plane
  },
  {
    title: "I want to understand 9D Facelift",
    description: "Procedure guide",
    href: "/procedures/9d-facelift",
    placement: "links_quick_understand_9d",
    icon: Stethoscope
  }
];

const trustItems = [
  {
    title: "International patients welcome",
    icon: Globe2
  },
  {
    title: "Doctor-led assessment",
    icon: Stethoscope
  },
  {
    title: "Natural-looking results",
    icon: Sparkles
  }
];

const methodologyTrustPoints = [
  "Facial structure assessment",
  "Natural expression preservation",
  "Personalized 9D planning"
];

const patientSteps = [
  {
    step: "1",
    title: "Send Photos",
    description: "Share clear facial photos and your concerns.",
    icon: ImageIcon
  },
  {
    step: "2",
    title: "Receive Assessment Guidance",
    description: "Dr. Xiao's team reviews your goals and facial structure.",
    icon: ClipboardCheck
  },
  {
    step: "3",
    title: "Plan Treatment in Shanghai",
    description: "Coordinate travel, treatment timing, and recovery support.",
    icon: Plane
  }
];

const fallbackPreviewCases: Array<Pick<PreviewCase, "age" | "country" | "concern" | "procedure" | "resultSummary">> = [
  {
    age: "Private",
    country: "Not disclosed",
    concern: "Lower-face heaviness and softer jawline definition",
    procedure: "9D Facelift",
    resultSummary: "Cleaner lower-face contour while preserving a natural expression."
  },
  {
    age: "Private",
    country: "Not disclosed",
    concern: "Mid-face volume descent and facial tiredness",
    procedure: "9D Deep Plane Assessment",
    resultSummary: "Improved facial support with a refreshed, not overfilled appearance."
  },
  {
    age: "Private",
    country: "Not disclosed",
    concern: "Neck laxity and lower-face sagging",
    procedure: "9D Facelift",
    resultSummary: "More defined neck and jawline balance with subtle rejuvenation."
  }
];

export function SocialLinksPageView({ settings, galleryItems }: SocialLinksPageViewProps) {
  const safeSettings = { ...defaultSettings, ...settings };
  const whatsappUrl = getWhatsAppUrl(safeSettings);
  const [trackingQuery, setTrackingQuery] = useState("");
  const previewCases = useMemo(() => buildPreviewCases(galleryItems), [galleryItems]);
  const socialLinks = useMemo(() => buildSocialLinks(safeSettings), [safeSettings]);
  const followActionCount = socialLinks.length + 1;
  const followGridClass =
    followActionCount >= 4
      ? "mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
      : followActionCount === 3
        ? "mt-6 grid gap-3 sm:grid-cols-3"
        : "mt-6 grid gap-3 sm:grid-cols-2";
  const methodologyVideoSrc = methodologyFallbackVideo;
  const methodologyPoster = methodologyFallbackPoster;

  useEffect(() => {
    setTrackingQuery(window.location.search);
  }, []);

  return (
    <div className="min-h-screen bg-[#FBF8F1] text-[#171717]">
      <main>
        <section className="relative isolate overflow-hidden border-b border-[#E7DBC8] bg-[#FBF8F1]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(201,169,110,0.18),transparent_32%),linear-gradient(90deg,rgba(255,255,255,0.92),rgba(255,255,255,0.62),rgba(251,248,241,0.92))]" />
          <div className="relative mx-auto max-w-[1180px] px-5 pb-9 pt-5 sm:px-8 lg:pb-12">
            <Link
              href={withTrackingQuery("/", trackingQuery)}
              onClick={() =>
                trackLinksPageAction({
                  placement: "links_logo_home",
                  label: "Logo home",
                  destination: "/"
                })
              }
              className="mx-auto flex w-fit flex-col items-center leading-none"
            >
              <span className="font-display text-[30px] font-semibold uppercase tracking-[0.12em] text-[#A67C32] sm:text-[38px]">
                Dr. Xiao
              </span>
              <span className="mt-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#171717]/80 sm:text-xs">
                9D Lifting System
              </span>
            </Link>

            <div className="mt-8 grid gap-9 lg:grid-cols-[minmax(320px,0.43fr)_minmax(0,0.57fr)] lg:items-center">
              <div className="relative order-2 mx-auto w-full max-w-[520px] rounded-lg bg-[linear-gradient(135deg,#D6BE8E_0%,rgba(255,255,255,0.86)_48%,#B88A3B_100%)] p-px shadow-[0_28px_80px_rgba(80,55,24,0.12)] lg:order-1 lg:mx-0">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[7px] bg-[#EFE7DC]">
                  <Image
                    src={heroImage}
                    alt="Dr. Xiao portrait in a white coat at his Shanghai clinic"
                    fill
                    priority
                    unoptimized
                    sizes="(max-width: 1024px) 92vw, 520px"
                    className="scale-[1.08] object-cover object-[50%_34%]"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.18),transparent_28%,rgba(255,255,255,0.08))]" />
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#FBF8F1] via-[#FBF8F1]/74 to-transparent" />
                </div>
              </div>

              <div className="order-1 min-w-0 lg:order-2 lg:pl-3">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#A67C32]">Official social entry</p>
                <h1 className="mt-4 font-display text-[clamp(38px,6vw,64px)] font-semibold leading-[0.98] text-[#171717]">
                  Natural Facial Rejuvenation in Shanghai
                </h1>
                <p className="mt-5 max-w-xl text-base leading-7 text-[#3B342B] sm:text-lg sm:leading-8">
                  Personalized 9D facial assessment for international patients seeking natural, refined, and
                  non-overfilled results.
                </p>
                <p className="mt-3 max-w-xl text-sm font-semibold leading-6 text-[#6B6257]">
                  Doctor-led 9D facial assessment by Dr. Xiao, founder of the 9D Lifting System™ in Shanghai.
                </p>

                <div className="mt-7 grid gap-3 sm:max-w-[430px]">
                  <TrackedWhatsAppLink
                    href={whatsappUrl}
                    placement="links_hero_whatsapp"
                    label="Links hero WhatsApp facial assessment"
                    onClick={() =>
                      trackLinksPageAction({
                        placement: "links_hero_whatsapp",
                        label: "WhatsApp Facial Assessment",
                        destination: "whatsapp"
                      })
                    }
                    className="inline-flex h-14 w-full items-center justify-center gap-3 rounded-md bg-[#1FA855] px-5 text-sm font-bold text-white shadow-[0_18px_38px_rgba(31,168,85,0.24)] transition hover:-translate-y-0.5 hover:bg-[#188F48]"
                  >
                    <MessageCircle size={20} />
                    WhatsApp Facial Assessment
                  </TrackedWhatsAppLink>
                  <p className="rounded-md border border-[#E7DBC8] bg-white/70 px-4 py-3 text-xs leading-6 text-[#6B6257]">
                    For assessment, please send front, side, 45-degree, smile, and neck photos + your age, country, and
                    main concerns.
                  </p>
                  <TrackedActionLink
                    href="#real-results"
                    placement="links_hero_results"
                    label="View Real Results"
                    trackingQuery={trackingQuery}
                    className="inline-flex h-14 w-full items-center justify-center gap-3 rounded-md border border-[#C9A96E] bg-white/82 px-5 text-sm font-bold text-[#171717] shadow-[0_14px_30px_rgba(80,55,24,0.08)] transition hover:-translate-y-0.5 hover:bg-white"
                  >
                    View Real Results
                    <ArrowRight size={17} className="text-[#A67C32]" />
                  </TrackedActionLink>
                </div>

                <p className="mt-4 max-w-[430px] text-xs leading-6 text-[#6B6257]">
                  Share your photos privately for an initial online assessment.
                </p>

                <div className="mt-7 grid gap-3 sm:grid-cols-3">
                  {trustItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.title} className="flex items-center gap-3">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#D8C196] bg-white text-[#A67C32]">
                          <Icon size={18} strokeWidth={1.7} />
                        </span>
                        <span className="text-xs font-semibold leading-5 text-[#3B342B]">{item.title}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 py-8 sm:px-8 lg:py-10">
          <div className="mx-auto grid max-w-[1180px] gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {mainActions.map((action) => (
              <ActionCardView
                key={action.title}
                action={action}
                whatsappUrl={whatsappUrl}
                trackingQuery={trackingQuery}
              />
            ))}
          </div>
        </section>

        <section className="border-y border-[#E7DBC8] bg-[#FFFDF8] px-5 py-8 sm:px-8">
          <div className="mx-auto max-w-[1180px]">
            <h2 className="text-center font-display text-3xl font-semibold leading-tight text-[#171717] sm:text-4xl">
              Not Sure Where to Start?
            </h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {quickStarts.map((action) => (
                <QuickStartLink
                  key={action.title}
                  action={action}
                  whatsappUrl={whatsappUrl}
                  trackingQuery={trackingQuery}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-10 sm:px-8 lg:py-12">
          <div className="mx-auto grid max-w-[1180px] gap-8 lg:grid-cols-[0.48fr_0.52fr] lg:items-center">
            <div className="lg:pr-4">
              <LazyTrustVideo
                src={methodologyVideoSrc}
                poster={methodologyPoster}
                label="9D Method"
                caption="Doctor-led 9D planning for natural facial rejuvenation."
                ariaLabel="Dr. Xiao explaining the 9D Lifting System methodology"
                phoneFrame
              />
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#A67C32]">9D Method</p>
              <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-[#171717] sm:text-4xl">
                A Doctor-Led Approach to Natural Rejuvenation
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-[#6B6257] sm:text-base sm:leading-8">
                Every face ages differently. Dr. Xiao's 9D Lifting System™ focuses on structure, expression, and
                personalized planning - helping patients look refreshed without looking overfilled or pulled.
              </p>
              <div className="mt-5 grid gap-3">
                {methodologyTrustPoints.map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm font-semibold text-[#3B342B]">
                    <CheckCircle2 size={18} className="shrink-0 text-[#A67C32]" />
                    {item}
                  </div>
                ))}
              </div>
              <TrackedActionLink
                href="/procedures/9d-facelift"
                placement="links_method_video_learn_9d"
                label="Learn 9D Facelift"
                trackingQuery={trackingQuery}
                className="mt-7 inline-flex min-h-[48px] w-full items-center justify-center gap-3 rounded-md border border-[#C9A96E] bg-white px-6 py-3 text-sm font-bold text-[#171717] shadow-[0_12px_30px_rgba(60,42,22,0.07)] transition hover:-translate-y-0.5 hover:bg-[#FFF8EA] sm:w-auto"
              >
                Learn 9D Facelift
                <ArrowRight size={16} className="text-[#A67C32]" />
              </TrackedActionLink>
            </div>
          </div>
        </section>

        <section id="real-results" className="scroll-mt-6 px-5 py-10 sm:px-8 lg:py-12">
          <div className="mx-auto max-w-[1180px]">
            <div className="flex flex-col gap-3 text-center sm:items-center">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#A67C32]">Before and after</p>
              <h2 className="font-display text-3xl font-semibold leading-tight text-[#171717] sm:text-4xl">
                Real Results Preview
              </h2>
            </div>

            <div className="mt-7 grid gap-4 lg:grid-cols-3">
              {previewCases.map((item, index) => (
                <article
                  key={`${item.image}-${index}`}
                  className="overflow-hidden rounded-lg border border-[#E3D6C2] bg-white shadow-[0_18px_42px_rgba(60,42,22,0.08)]"
                >
                  <div className="relative aspect-[4/3] bg-[#F8F2E8]">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      unoptimized
                      sizes="(max-width: 1024px) 100vw, 360px"
                      className="object-contain p-2"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-xl font-semibold leading-tight text-[#171717]">{item.title}</h3>
                    <div className="mt-3 grid gap-2 text-sm leading-6 text-[#6B6257]">
                      <CaseLine label="Age" value={item.age} />
                      <CaseLine label="Country" value={item.country} />
                      <CaseLine label="Concern" value={item.concern} />
                      <CaseLine label="Procedure" value={item.procedure} />
                      <CaseLine label="Result" value={item.resultSummary} />
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-7 flex justify-center">
              <TrackedActionLink
                href="/before-after"
                placement="links_results_more"
                label="View More Results"
                trackingQuery={trackingQuery}
                className="inline-flex h-12 w-full max-w-[340px] items-center justify-center gap-3 rounded-md border border-[#C9A96E] bg-white px-6 text-sm font-bold text-[#171717] transition hover:-translate-y-0.5 hover:bg-[#FFF8EA]"
              >
                View More Results
                <ArrowRight size={16} className="text-[#A67C32]" />
              </TrackedActionLink>
            </div>
          </div>
        </section>

        <section className="border-y border-[#E7DBC8] bg-[#FFFDF8] px-5 py-10 sm:px-8 lg:py-12">
          <div className="mx-auto grid max-w-[1180px] gap-8 lg:grid-cols-[minmax(0,0.64fr)_minmax(280px,0.36fr)] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#A67C32]">Real Patient Journey</p>
              <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-[#171717] sm:text-4xl">
                From Online Assessment to Arrival in Shanghai
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-[#6B6257] sm:text-base sm:leading-8">
                For international patients, feeling supported matters. From the first WhatsApp assessment to arrival
                coordination, clinic scheduling, and in-person consultation, our team helps make the journey clearer and
                more organized.
              </p>
              <p className="mt-4 max-w-2xl text-sm font-semibold leading-7 text-[#3B342B]">
                Online assessment · Travel planning · English-speaking assistance · Recovery support in Shanghai.
              </p>

              <div className="mt-7 grid gap-4 sm:grid-cols-3 lg:max-w-3xl">
                {patientSteps.map((item) => {
                  const Icon = item.icon;
                  return (
                    <article key={item.step} className="relative flex gap-3 rounded-lg border border-[#E3D6C2] bg-white/82 p-4 shadow-[0_10px_28px_rgba(60,42,22,0.05)] sm:block">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#B88A3B] text-sm font-bold text-white">
                        {item.step}
                      </span>
                      <div>
                        <div className="hidden h-11 w-11 items-center justify-center rounded-md border border-[#D8C196] bg-white text-[#A67C32] sm:mt-4 sm:flex">
                          <Icon size={21} strokeWidth={1.6} />
                        </div>
                        <h3 className="font-display text-lg font-semibold leading-tight text-[#171717] sm:mt-4">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-xs leading-5 text-[#6B6257]">{item.description}</p>
                      </div>
                    </article>
                  );
                })}
              </div>

              <TrackedWhatsAppLink
                href={whatsappUrl}
                placement="links_international_assessment_whatsapp"
                label="Links international start online assessment"
                onClick={() =>
                  trackLinksPageAction({
                    placement: "links_international_assessment_whatsapp",
                    label: "Start Online Assessment",
                    destination: "whatsapp"
                  })
                }
                className="mt-7 inline-flex min-h-[52px] w-full max-w-[480px] items-center justify-center gap-3 rounded-md bg-[#B88A3B] px-6 py-4 text-sm font-bold text-white shadow-[0_16px_34px_rgba(184,138,59,0.20)] transition hover:-translate-y-0.5 hover:bg-[#A67C32]"
              >
                <MessageCircle size={18} />
                Start Online Assessment
                <ArrowRight size={16} />
              </TrackedWhatsAppLink>
              <p className="mt-4 max-w-[560px] text-xs leading-6 text-[#6B6257]">
                Online assessment provides initial guidance only. Final recommendations require in-person medical
                evaluation.
              </p>
            </div>

            <div className="mx-auto w-full max-w-[310px] lg:max-w-[340px]">
              <LazyTrustVideo
                src={internationalJourneyVideo}
                poster={internationalJourneyPoster}
                label="Real Patient Journey"
                caption="Arrival support and care coordination for international patients in Shanghai."
                ariaLabel="International patient arrival and support journey in Shanghai"
                phoneFrame
              />
            </div>
          </div>
        </section>

        {socialLinks.length ? (
          <section className="px-5 py-9 sm:px-8">
            <div className="mx-auto max-w-[1180px]">
              <h2 className="text-center font-display text-3xl font-semibold leading-tight text-[#171717]">
                Follow Dr. Xiao
              </h2>
              <div className={followGridClass}>
                {socialLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        trackLinksPageAction({
                          placement: item.placement,
                          label: item.label,
                          destination: item.href
                        })
                      }
                      className="inline-flex h-12 items-center justify-center gap-3 rounded-md border border-[#D8C196] bg-white px-5 text-sm font-bold text-[#171717] transition hover:-translate-y-0.5 hover:border-[#B88A3B] hover:bg-[#FFF8EA]"
                    >
                      <Icon size={20} className={item.color} />
                      {item.label}
                      <ArrowRight size={15} className="ml-auto text-[#A67C32]" />
                    </a>
                  );
                })}
                <TrackedWhatsAppLink
                  href={whatsappUrl}
                  placement="links_social_whatsapp"
                  label="WhatsApp"
                  className="inline-flex h-12 items-center justify-center gap-3 rounded-md border border-[#B8DDBF] bg-[#F8FFF9] px-5 text-sm font-bold text-[#173B25] transition hover:-translate-y-0.5 hover:border-[#25D366] hover:bg-[#EFFFF3]"
                >
                  <MessageCircle size={20} className="text-[#25D366]" />
                  WhatsApp
                  <ArrowRight size={15} className="ml-auto text-[#1FAE55]" />
                </TrackedWhatsAppLink>
              </div>
            </div>
          </section>
        ) : null}
      </main>

      <footer className="border-t border-[#E7DBC8] bg-[#F7F0E5] px-5 pb-24 pt-8 sm:px-8 sm:pb-12">
        <div className="mx-auto grid max-w-[1180px] gap-6 text-center md:grid-cols-[0.7fr_1fr_0.7fr] md:items-center md:text-left">
          <div>
            <p className="font-display text-2xl font-semibold uppercase tracking-[0.12em] text-[#A67C32]">Dr. Xiao</p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.22em] text-[#171717]/70">9D Lifting System</p>
          </div>
          <div className="md:text-center">
            <p className="font-display text-xl font-semibold text-[#171717]">Only one 9D | Only by Dr. Xiao.</p>
            <p className="mt-2 text-sm leading-6 text-[#6B6257]">Natural. Precise. Personalized.</p>
            <p className="mx-auto mt-3 max-w-xl text-xs leading-6 text-[#6B6257]">
              Online assessment is for initial guidance. Final treatment recommendations require doctor evaluation.
            </p>
          </div>
          <div className="flex items-center justify-center gap-3 md:justify-end">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-[#D8C196] bg-white text-[#A67C32]">
              <ShieldCheck size={22} />
            </span>
            <div className="text-left">
              <p className="text-sm font-bold text-[#171717]">Official clinic in Shanghai</p>
              <p className="mt-1 text-xs text-[#6B6257]">International patients welcome</p>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-7 flex max-w-[1180px] flex-wrap justify-center gap-x-7 gap-y-3 text-xs text-[#6B6257]">
          <TrackedActionLink href="/" placement="links_footer_home" label="Official Website" trackingQuery={trackingQuery}>
            Official Website
          </TrackedActionLink>
          <TrackedActionLink href="/doctor" placement="links_footer_doctor" label="About Dr. Xiao" trackingQuery={trackingQuery}>
            About Dr. Xiao
          </TrackedActionLink>
          <a
            href={`mailto:${safeSettings.email}`}
            onClick={() =>
              trackLinksPageAction({
                placement: "links_footer_email",
                label: "Contact",
                destination: `mailto:${safeSettings.email}`
              })
            }
            className="transition hover:text-[#A67C32]"
          >
            Contact
          </a>
        </div>
      </footer>

      <TrackedWhatsAppLink
        href={whatsappUrl}
        placement="links_floating_whatsapp"
        label="Links floating WhatsApp"
        onClick={() =>
          trackLinksPageAction({
            placement: "links_floating_whatsapp",
            label: "Floating WhatsApp",
            destination: "whatsapp"
          })
        }
        aria-label="WhatsApp facial assessment"
        className="fixed bottom-4 right-4 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#20B456] text-white shadow-[0_14px_34px_rgba(31,168,85,0.32)] transition hover:-translate-y-1 hover:bg-[#188F48] sm:h-16 sm:w-16"
      >
        <MessageCircle size={27} />
      </TrackedWhatsAppLink>
    </div>
  );
}

function ActionCardView({
  action,
  whatsappUrl,
  trackingQuery
}: {
  action: ActionCard;
  whatsappUrl: string;
  trackingQuery: string;
}) {
  const Icon = action.icon;
  const content = (
    <>
      <span
        className={`flex h-16 w-16 items-center justify-center rounded-full border ${
          action.featured ? "border-[#1FA855]/20 bg-[#1FA855] text-white" : "border-[#D8C196] bg-white text-[#A67C32]"
        }`}
      >
        <Icon size={28} strokeWidth={1.6} />
      </span>
      <span className="mt-7 block font-display text-2xl font-semibold leading-tight text-[#171717]">{action.title}</span>
      <span className="mt-3 block text-sm leading-7 text-[#3B342B]">{action.description}</span>
      <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#A67C32]">
        Continue
        <ArrowRight size={17} />
      </span>
    </>
  );

  if (action.whatsapp) {
    return (
      <TrackedWhatsAppLink
        href={whatsappUrl}
        placement={action.placement}
        label={action.title}
        onClick={() =>
          trackLinksPageAction({
            placement: action.placement,
            label: action.title,
            destination: "whatsapp"
          })
        }
        className="block min-h-[258px] rounded-lg border border-[#E3D6C2] bg-white p-6 shadow-[0_18px_42px_rgba(60,42,22,0.08)] transition hover:-translate-y-1 hover:border-[#B88A3B] hover:shadow-[0_22px_52px_rgba(60,42,22,0.11)]"
      >
        {content}
      </TrackedWhatsAppLink>
    );
  }

  return (
    <TrackedActionLink
      href={action.href}
      placement={action.placement}
      label={action.title}
      trackingQuery={trackingQuery}
      className="block min-h-[258px] rounded-lg border border-[#E3D6C2] bg-white p-6 shadow-[0_18px_42px_rgba(60,42,22,0.08)] transition hover:-translate-y-1 hover:border-[#B88A3B] hover:shadow-[0_22px_52px_rgba(60,42,22,0.11)]"
    >
      {content}
    </TrackedActionLink>
  );
}

function QuickStartLink({
  action,
  whatsappUrl,
  trackingQuery
}: {
  action: ActionCard;
  whatsappUrl: string;
  trackingQuery: string;
}) {
  const Icon = action.icon;
  const className =
    "flex min-h-[86px] items-center gap-4 rounded-lg border border-[#E3D6C2] bg-white px-5 py-4 text-left shadow-[0_12px_30px_rgba(60,42,22,0.06)] transition hover:-translate-y-0.5 hover:border-[#B88A3B] hover:bg-[#FFF8EA]";
  const content = (
    <>
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-[#D8C196] text-[#A67C32]">
        <Icon size={22} strokeWidth={1.6} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-bold leading-5 text-[#171717]">{action.title}</span>
        <span className="mt-1 block text-xs leading-5 text-[#6B6257]">{action.description}</span>
      </span>
      <ArrowRight size={16} className="shrink-0 text-[#A67C32]" />
    </>
  );

  if (action.whatsapp) {
    return (
      <TrackedWhatsAppLink
        href={whatsappUrl}
        placement={action.placement}
        label={action.title}
        onClick={() =>
          trackLinksPageAction({
            placement: action.placement,
            label: action.title,
            destination: "whatsapp"
          })
        }
        className={className}
      >
        {content}
      </TrackedWhatsAppLink>
    );
  }

  return (
    <TrackedActionLink
      href={action.href}
      placement={action.placement}
      label={action.title}
      trackingQuery={trackingQuery}
      className={className}
    >
      {content}
    </TrackedActionLink>
  );
}

function TrackedActionLink({
  href,
  placement,
  label,
  trackingQuery,
  children,
  className
}: {
  href: string;
  placement: string;
  label: string;
  trackingQuery: string;
  children: ReactNode;
  className?: string;
}) {
  const finalHref = withTrackingQuery(href, trackingQuery);
  const isAnchor = href.startsWith("#");
  const handleClick = () =>
    trackLinksPageAction({
      placement,
      label,
      destination: finalHref
    });

  if (isAnchor) {
    return (
      <a href={finalHref} onClick={handleClick} className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link href={finalHref} onClick={handleClick} className={className}>
      {children}
    </Link>
  );
}

function CaseLine({ label, value }: { label: string; value: string }) {
  return (
    <p>
      <span className="font-bold text-[#171717]">{label}: </span>
      {value}
    </p>
  );
}

function LazyTrustVideo({
  src,
  poster,
  label,
  caption,
  ariaLabel,
  phoneFrame = false
}: {
  src: string;
  poster: string;
  label: string;
  caption: string;
  ariaLabel: string;
  phoneFrame?: boolean;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          videoRef.current?.play().catch(() => undefined);
          return;
        }

        videoRef.current?.pause();
      },
      { rootMargin: "220px 0px", threshold: 0.25 }
    );

    observer.observe(wrapper);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldLoad) return;
    videoRef.current?.play().catch(() => undefined);
  }, [shouldLoad]);

  const frameClass = phoneFrame
    ? "mx-auto w-full max-w-[300px] rounded-[30px] border-[10px] border-[#171717] bg-[#171717] p-1 shadow-[0_26px_70px_rgba(60,42,22,0.18)]"
    : "w-full rounded-xl border border-[#E3D6C2] bg-white p-2 shadow-[0_22px_60px_rgba(60,42,22,0.12)]";
  const mediaClass = phoneFrame
    ? "aspect-[9/16] w-full overflow-hidden rounded-[20px] bg-[#1B1814]"
    : "aspect-video w-full overflow-hidden rounded-lg bg-[#1B1814]";

  return (
    <div ref={wrapperRef} className={frameClass}>
      <div
        className={`relative ${mediaClass}`}
        style={{
          aspectRatio: phoneFrame ? "9 / 16" : "16 / 9",
          overflow: "hidden",
          position: "relative"
        }}
      >
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full max-w-full object-cover"
          style={{
            display: "block",
            height: "100%",
            inset: 0,
            maxWidth: "100%",
            objectFit: "cover",
            position: "absolute",
            width: "100%"
          }}
          src={shouldLoad ? src : undefined}
          poster={poster}
          muted
          autoPlay
          loop
          playsInline
          preload="none"
          aria-label={ariaLabel}
        >
          {shouldLoad ? <source src={src} type={getVideoMimeType(src)} /> : null}
        </video>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/76 via-black/20 to-transparent px-4 pb-4 pt-16 text-white">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#D8BD80]">{label}</p>
          <p className="mt-2 text-xs font-semibold leading-5">{caption}</p>
        </div>
      </div>
    </div>
  );
}

function buildPreviewCases(items: GalleryItem[]) {
  const caseItems = [...items]
    .filter((item) => item.image && (!item.displayRole || item.displayRole === "case"))
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .slice(0, 3);

  return (caseItems.length ? caseItems : []).map((item, index): PreviewCase => {
    const fallback = fallbackPreviewCases[index % fallbackPreviewCases.length];

    return {
      ...item,
      title: item.caseLabel || item.title || `9D Facelift Case ${index + 1}`,
      alt: item.alt || item.title || `9D Facelift case preview ${index + 1}`,
      age: item.age || fallback.age,
      country: item.country || fallback.country,
      concern: item.mainConcerns || fallback.concern,
      procedure: item.procedure || fallback.procedure,
      resultSummary: item.visibleChange || item.description || fallback.resultSummary
    };
  });
}

function buildSocialLinks(settings: SiteSettings) {
  const links: Array<{
    label: string;
    href: string;
    icon: typeof Instagram;
    color: string;
    placement: string;
  }> = [
    {
      label: "Instagram",
      href: normalizeSocialUrl(settings.instagramUrl) || instagramFallbackUrl,
      icon: Instagram,
      color: "text-[#E4405F]",
      placement: "links_social_instagram"
    },
    {
      label: "Facebook",
      href: normalizeSocialUrl(settings.facebookUrl) || facebookFallbackUrl,
      icon: Facebook,
      color: "text-[#1877F2]",
      placement: "links_social_facebook"
    },
    {
      label: "TikTok",
      href: normalizeSocialUrl(settings.tiktokUrl),
      icon: Music2,
      color: "text-[#111111]",
      placement: "links_social_tiktok"
    }
  ];

  return links.filter((item) => Boolean(item.href));
}

function normalizeSocialUrl(value: string) {
  const trimmed = value?.trim();
  if (!trimmed || trimmed === "#contact" || trimmed === "#") return "";
  return /^https?:\/\//i.test(trimmed) ? trimmed : "";
}

function getVideoMimeType(src: string) {
  const cleanSrc = src.split("?")[0]?.toLowerCase() || "";
  if (cleanSrc.endsWith(".webm")) return "video/webm";
  if (cleanSrc.endsWith(".mov")) return "video/quicktime";
  return "video/mp4";
}

function withTrackingQuery(href: string, queryString: string) {
  if (!queryString || !href.startsWith("/") || href.startsWith("//")) return href;

  const [withoutHash, hash = ""] = href.split("#");
  const url = new URL(withoutHash, "https://www.drxiao9d.com");
  const incoming = new URLSearchParams(queryString);
  incoming.forEach((value, key) => {
    if ((key.startsWith("utm_") || key === "fbclid" || key === "gclid") && !url.searchParams.has(key)) {
      url.searchParams.set(key, value);
    }
  });

  return `${url.pathname}${url.search}${hash ? `#${hash}` : ""}`;
}
