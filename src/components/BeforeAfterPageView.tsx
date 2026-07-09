"use client";

import {
  ArrowRight,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  Heart,
  MessageCircle,
  Search,
  ShieldCheck,
  Sparkles,
  UserRound,
  X,
  ZoomIn
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { LandingPageData } from "@/lib/landing-pages";
import { defaultSettings, getWhatsAppUrl } from "@/lib/site-data";
import type { GalleryItem, SiteSettings } from "@/lib/site-types";
import { TrackedWhatsAppLink } from "./TrackedWhatsAppLink";

type BeforeAfterPageViewProps = {
  page: LandingPageData;
  settings: SiteSettings;
  galleryItems: GalleryItem[];
};

type CaseMeta = {
  title: string;
  age: string;
  country: string;
  procedure: string;
};

type CaseCard = GalleryItem & CaseMeta;

const caseMeta: CaseMeta[] = [
  {
    title: "Deep Plane Facelift Before and After",
    age: "Private",
    country: "United States",
    procedure: "9D Deep Plane Facelift"
  },
  {
    title: "Natural Facelift and Jawline Improvement",
    age: "Private",
    country: "Singapore",
    procedure: "9D Facelift"
  },
  {
    title: "Lower Face Rejuvenation Results",
    age: "Private",
    country: "Malaysia",
    procedure: "9D Facelift"
  },
  {
    title: "Jawline Lift Before and After",
    age: "Private",
    country: "Russia",
    procedure: "9D Deep Plane Facelift"
  },
  {
    title: "Profile Refinement Result",
    age: "Private",
    country: "Australia",
    procedure: "9D Facelift"
  },
  {
    title: "Contour Support Case",
    age: "Private",
    country: "Thailand",
    procedure: "9D Facelift"
  },
  {
    title: "Soft Facial Rejuvenation",
    age: "Private",
    country: "Indonesia",
    procedure: "9D Facelift"
  },
  {
    title: "Eye and Midface Harmony",
    age: "Private",
    country: "Philippines",
    procedure: "9D Facial Rejuvenation"
  },
  {
    title: "Jawline Definition Case",
    age: "Private",
    country: "Canada",
    procedure: "9D Deep Plane Assessment"
  },
  {
    title: "Charm Preservation Result",
    age: "Private",
    country: "United Kingdom",
    procedure: "9D Facelift"
  },
  {
    title: "Full-Face Balance Case",
    age: "Private",
    country: "Vietnam",
    procedure: "9D Facelift"
  },
  {
    title: "Pre-Surgery Planning Reference",
    age: "Private",
    country: "Hong Kong",
    procedure: "Online Case Review"
  }
];

const trustItems = [
  {
    title: "Real Patient Cases",
    description: "Before and after references",
    icon: UserRound
  },
  {
    title: "Natural Facelift Results",
    description: "Not overdone",
    icon: Sparkles
  },
  {
    title: "Shanghai 9D Facelift",
    description: "For international patients",
    icon: ShieldCheck
  }
];

const searchChips = [
  "deep plane facelift results",
  "jawline lift before after",
  "natural facelift results",
  "facelift in Shanghai",
  "facelift recovery results"
];

const noticeItems = [
  {
    title: "Improved Jawline Definition",
    description: "Cleaner, stronger lower-face contour.",
    icon: UserRound
  },
  {
    title: "Lower Face Lift and Tightening",
    description: "Reduced sagging without a pulled look.",
    icon: ShieldCheck
  },
  {
    title: "Natural Facial Rejuvenation",
    description: "Younger while maintaining expression.",
    icon: Sparkles
  },
  {
    title: "Long-lasting Results",
    description: "Planned for stable structural support.",
    icon: CalendarDays
  },
  {
    title: "Customized Approach",
    description: "Matched to anatomy and facial structure.",
    icon: Heart
  }
];

export function BeforeAfterPageView({ page, settings, galleryItems }: BeforeAfterPageViewProps) {
  const safeSettings = { ...defaultSettings, ...settings };
  const whatsappUrl = getWhatsAppUrl(safeSettings);
  const allCases = useMemo(() => buildCaseCards(galleryItems), [galleryItems]);
  const [activeCase, setActiveCase] = useState<CaseCard | null>(null);
  const [showAll, setShowAll] = useState(false);

  if (!allCases.length) return null;

  const heroCase =
    allCases.find((item) => item.displayRole === "hero") ||
    allCases.find((item) => item.displayRole !== "featured" && !isLifestyleReference(item)) ||
    allCases[0];
  const caseItems = allCases.filter((item) => !item.displayRole || item.displayRole === "case");
  const cases = caseItems.length ? caseItems : allCases.filter((item) => item.image !== heroCase.image);
  const featuredCase =
    allCases.find((item) => item.displayRole === "featured") ||
    cases.find((item) => item.image !== heroCase.image) ||
    heroCase;
  const visibleCases = showAll ? cases : cases.slice(0, 4);

  return (
    <div className="bg-[#FAF7EF] text-[#171717]">
      <section className="relative isolate overflow-hidden border-b border-[#E7DBC8] bg-[#FBF8F1] px-5 sm:px-8 lg:min-h-[100svh]">
        <div className="pointer-events-none absolute left-[-20rem] top-[-18rem] h-[40rem] w-[40rem] rounded-full bg-[#B88A3B]/12 blur-3xl" />
        <div className="pointer-events-none absolute right-[-14rem] top-20 h-[34rem] w-[34rem] rounded-full bg-white/85 blur-3xl" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#F4EADD] to-transparent" />

        <div className="relative mx-auto grid min-h-[calc(100svh+120px)] max-w-[1440px] gap-9 pb-12 pt-36 sm:pt-40 lg:min-h-[100svh] lg:grid-cols-[minmax(0,0.45fr)_minmax(640px,0.55fr)] lg:items-center lg:gap-12 lg:pb-16 lg:pt-36 2xl:max-w-[1520px]">
          <div className="min-w-0 lg:pb-6">
            <nav className="flex items-center gap-2 text-xs font-medium text-[#6B6257]/70">
              <Link href="/" className="transition hover:text-[#B88A3B]">
                Home
              </Link>
              <span>/</span>
              <span>{page.breadcrumb}</span>
            </nav>

            <h1 className="mt-7 max-w-[620px] font-display text-[clamp(46px,5.6vw,78px)] font-semibold leading-[0.96] text-[#171717]">
              9D Facelift Before and After
              <span className="text-[#B88A3B]"> Results </span>
              in Shanghai
            </h1>

            <p className="mt-6 max-w-[560px] text-lg font-bold leading-8 text-[#171717] sm:text-xl">
              Real patient facelift before and after results from Dr. Xiao's 9D Facelift and deep plane facelift system
              for international patients.
            </p>
            <p className="mt-4 max-w-[590px] text-base leading-8 text-[#6B6257]">
              Explore natural facelift results in Shanghai, including deep plane facelift before and after cases, jawline
              lift improvement, lower-face rejuvenation, and 9D facial rejuvenation outcomes for overseas patients.
            </p>

            <div className="mt-9 grid gap-3 sm:grid-cols-2">
              <a
                href="#case-gallery"
                className="inline-flex h-14 w-full items-center justify-center gap-3 rounded-md bg-[#C59236] px-5 text-sm font-bold text-[#171717] shadow-[0_14px_34px_rgba(184,138,59,0.24)] transition hover:bg-[#B3822F]"
              >
                View Real Facelift Cases
                <ArrowRight size={17} />
              </a>
              <TrackedWhatsAppLink
                href={whatsappUrl}
                placement="before_after_hero_whatsapp"
                label="Before After hero WhatsApp"
                className="inline-flex h-14 w-full items-center justify-center gap-3 rounded-md border border-[#C59236] bg-white/72 px-5 text-sm font-bold text-[#171717] transition hover:bg-white"
              >
                <MessageCircle size={17} />
                Send Photos for Assessment
              </TrackedWhatsAppLink>
            </div>

            <div className="mt-9 grid gap-4 sm:grid-cols-3">
              {trustItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#C59236] text-[#C59236]">
                      <Icon size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-bold leading-5 text-[#171717]">{item.title}</p>
                      <p className="mt-0.5 text-xs leading-5 text-[#6B6257]">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative min-w-0 lg:self-stretch lg:py-8">
            <CompleteCaseImage
              item={heroCase}
              priority
              className="h-full min-h-[560px] rounded-2xl bg-white p-1.5 shadow-[0_28px_90px_rgba(60,42,22,0.14)] lg:min-h-[680px]"
              imageClassName="object-cover"
              sizes="(max-width: 1024px) 100vw, 55vw"
            />
          </div>
        </div>
      </section>

      <div className="border-b border-[#E7DBC8] bg-[#F7F0E5] px-5 py-5 sm:px-8">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-3 lg:flex-row lg:items-center">
          <div className="flex shrink-0 items-center gap-3 text-sm font-semibold text-[#6B6257]">
            <Search size={20} className="text-[#B88A3B]" />
            Popular Searches:
          </div>
          <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 lg:flex lg:flex-wrap">
            {searchChips.map((chip) => (
              <a
                key={chip}
                href="#case-gallery"
                className="inline-flex min-h-11 w-full items-center justify-center rounded-md border border-[#E3D6C2] bg-white px-4 py-2 text-center text-sm font-medium leading-5 text-[#6B6257] shadow-sm transition hover:border-[#B88A3B] hover:text-[#171717] lg:w-auto lg:px-5"
              >
                {chip}
              </a>
            ))}
          </div>
        </div>
      </div>

      <section id="case-gallery" className="scroll-mt-32 px-5 py-12 sm:px-8 lg:scroll-mt-36 lg:py-16">
        <div className="mx-auto max-w-[1280px]">
          <SectionTitle index="1" title="Real Patient Facelift Before and After Results" />

          <div className="mt-9 grid gap-7 lg:grid-cols-2">
            {visibleCases.map((item, index) => (
              <CaseCardView key={`${item.image}-${index}`} item={item} index={index} onView={() => setActiveCase(item)} />
            ))}
          </div>

          {!showAll && cases.length > 4 ? (
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={() => setShowAll(true)}
                className="inline-flex h-11 min-w-52 items-center justify-center gap-3 rounded-md border border-[#C59236] bg-white px-6 text-sm font-bold text-[#171717] transition hover:bg-[#FFF8EA]"
              >
                View More Cases
                <ArrowRight size={16} />
              </button>
            </div>
          ) : null}
        </div>
      </section>

      <section className="px-5 py-10 sm:px-8 lg:py-14">
        <div className="mx-auto grid max-w-[1280px] gap-10 border-t border-[#E7DBC8] pt-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <CompleteCaseImage
            item={featuredCase}
            className="min-h-[360px] rounded-xl bg-white p-1.5 shadow-[0_18px_56px_rgba(60,42,22,0.10)] lg:min-h-[430px]"
            imageClassName="object-cover"
            sizes="(max-width: 1024px) 100vw, 54vw"
          />

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#B88A3B]">Featured Case</p>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-[#171717] sm:text-5xl">
              Deep Plane Facelift Before and After Result
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-[#6B6257]">
              This featured deep plane facelift result demonstrates natural facial rejuvenation in Shanghai, with improved
              jawline support, softened lower-face heaviness, and a recognizable facial expression.
            </p>
            <dl className="mt-6 grid gap-3 text-sm">
              <FeaturedField label="Age" value={featuredCase.age} />
              <FeaturedField label="Country" value={featuredCase.country} />
              <FeaturedField label="Procedure" value={featuredCase.procedure} />
            </dl>
            <button
              type="button"
              onClick={() => setActiveCase(featuredCase)}
              className="mt-7 inline-flex h-12 w-full items-center justify-center gap-3 rounded-md bg-[#C59236] px-6 text-sm font-bold text-[#171717] shadow-[0_12px_28px_rgba(184,138,59,0.18)] transition hover:bg-[#B3822F] sm:w-auto"
            >
              View Full Case Details
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      <section className="px-5 py-10 sm:px-8 lg:py-14">
        <div className="mx-auto max-w-[1280px] border-t border-[#E7DBC8] pt-10">
          <SectionTitle index="2" title="What Results You Can Expect From 9D Facelift Surgery" />
          <div className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {noticeItems.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="text-center lg:text-left">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#C59236] bg-white text-[#C59236] shadow-sm lg:mx-0">
                    <Icon size={26} strokeWidth={1.65} />
                  </div>
                  <h3 className="mt-4 text-base font-bold leading-snug text-[#171717]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#6B6257]">{item.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-5 py-12 sm:px-8 lg:py-16">
        <div className="mx-auto rounded-xl border border-[#E3D6C2] bg-white/72 p-6 shadow-[0_18px_50px_rgba(60,42,22,0.08)] sm:p-8 lg:max-w-[1280px]">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#B88A3B]">Final CTA</p>
              <h2 className="mt-3 font-display text-4xl font-semibold leading-tight text-[#171717] sm:text-5xl">
                Still thinking?
              </h2>
              <p className="mt-4 max-w-xl text-base leading-7 text-[#6B6257]">
                Send your photos for a professional 9D Facelift before and after assessment before planning surgery in
                Shanghai.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <TrackedWhatsAppLink
                href={whatsappUrl}
                placement="before_after_final_consultation_whatsapp"
                label="Before After final WhatsApp consultation"
                className="inline-flex h-12 w-full items-center justify-center gap-3 rounded-md bg-[#C59236] px-6 text-sm font-bold text-[#171717] shadow-[0_12px_28px_rgba(184,138,59,0.20)] transition hover:bg-[#B3822F] sm:w-auto"
              >
                WhatsApp Consultation
                <ArrowRight size={16} />
              </TrackedWhatsAppLink>
              <TrackedWhatsAppLink
                href={whatsappUrl}
                placement="before_after_final_photos_whatsapp"
                label="Before After final send photos WhatsApp"
                className="inline-flex h-12 w-full items-center justify-center gap-3 rounded-md border border-[#C59236] bg-white px-6 text-sm font-bold text-[#171717] transition hover:bg-[#FFF8EA] sm:w-auto"
              >
                <MessageCircle size={16} />
                Send Photos for Assessment
              </TrackedWhatsAppLink>
            </div>
          </div>
        </div>
      </section>

      {activeCase ? <CaseModal item={activeCase} onClose={() => setActiveCase(null)} /> : null}
    </div>
  );
}

function buildCaseCards(items: GalleryItem[]): CaseCard[] {
  const orderedItems = [...items]
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .sort((a, b) => Number(isLifestyleReference(a)) - Number(isLifestyleReference(b)));

  return orderedItems
    .map((item, index) => {
      const meta = caseMeta[index % caseMeta.length];
      return {
        ...item,
        displayRole: item.displayRole || "case",
        title: item.title || meta.title,
        age: item.age || meta.age,
        country: item.country || meta.country,
        procedure: item.procedure || meta.procedure,
        beforeLabel: item.beforeLabel || "",
        afterLabel: item.afterLabel || "",
        description: item.description || "",
        alt: item.alt || `${item.title || meta.title} before and after case`
      };
    });
}

function isLifestyleReference(item: GalleryItem) {
  return item.image.includes("gallery-case-01");
}

function CompleteCaseImage({
  item,
  priority = false,
  className,
  imageClassName,
  sizes
}: {
  item: CaseCard;
  priority?: boolean;
  className: string;
  imageClassName: string;
  sizes: string;
}) {
  const hasLabels = Boolean(item.beforeLabel || item.afterLabel);

  return (
    <div className={`relative ${className}`}>
      <div className="relative h-full min-h-[inherit] overflow-hidden rounded-[inherit]">
        <Image
          src={item.image}
          alt={item.alt}
          fill
          priority={priority}
          unoptimized
          sizes={sizes}
          className={imageClassName}
        />
        {hasLabels ? (
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-[#171717]/48 to-transparent p-4">
            {item.beforeLabel ? (
              <span className="text-xs font-bold uppercase tracking-[0.12em] text-white">{item.beforeLabel}</span>
            ) : null}
            {item.afterLabel ? (
              <span className="text-xs font-bold uppercase tracking-[0.12em] text-white">{item.afterLabel}</span>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function SectionTitle({ index, title }: { index: string; title: string }) {
  return (
    <div className="text-center">
      <h2 className="font-display text-3xl font-semibold leading-tight text-[#171717] sm:text-4xl">
        {index}. {title}
      </h2>
      <div className="mx-auto mt-3 h-px w-16 bg-[#B88A3B]" />
    </div>
  );
}

function CaseCardView({ item, index, onView }: { item: CaseCard; index: number; onView: () => void }) {
  return (
    <article className="overflow-hidden rounded-lg border border-[#E3D6C2] bg-white shadow-[0_16px_42px_rgba(60,42,22,0.08)]">
      <button
        type="button"
        onClick={onView}
        className="group relative block aspect-[4/3] w-full overflow-hidden bg-[#F8F4EA] text-left"
      >
        <span className="absolute inset-2 overflow-hidden rounded-md bg-[#FFFDF8] shadow-inner">
          <Image
            src={item.image}
            alt={item.alt}
            fill
            unoptimized
            loading={index < 4 ? "eager" : "lazy"}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-contain transition duration-500 group-hover:brightness-[1.03]"
          />
        </span>
        <span className="absolute left-1/2 top-1/2 hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#171717] shadow-[0_8px_22px_rgba(60,42,22,0.18)] sm:flex">
          <ChevronLeft size={16} />
          <ChevronRight size={16} />
        </span>
      </button>
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-2xl font-semibold leading-tight text-[#171717]">{item.title}</h3>
          <button
            type="button"
            onClick={onView}
            className="hidden shrink-0 items-center gap-2 rounded-md border border-[#C59236] px-3 py-2 text-xs font-bold text-[#171717] transition hover:bg-[#FFF8EA] sm:inline-flex"
          >
            View Case
            <ZoomIn size={14} />
          </button>
        </div>
        <dl className="mt-4 grid gap-2 border-b border-[#E7DBC8] pb-4 text-sm text-[#3A332C]">
          <CaseLine label="Age" value={item.age} />
          <CaseLine label="Country" value={item.country} />
          <CaseLine label="Procedure" value={item.procedure} />
        </dl>
        <button
          type="button"
          onClick={onView}
          className="mt-4 inline-flex items-center gap-3 text-sm font-bold text-[#171717] transition hover:text-[#B88A3B]"
        >
          View Case
          <ArrowRight size={15} className="text-[#B88A3B]" />
        </button>
      </div>
    </article>
  );
}

function CaseLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-1">
      <dt className="shrink-0 font-bold text-[#171717]">{label}:</dt>
      <dd className="leading-6 text-[#6B6257]">{value}</dd>
    </div>
  );
}

function FeaturedField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start gap-2">
      <CircleCheck className="mt-0.5 shrink-0 text-[#B88A3B]" size={18} />
      <div className="text-sm leading-6 text-[#3A332C]">
        <span className="font-bold text-[#171717]">{label}: </span>
        {value}
      </div>
    </div>
  );
}

function CaseModal({ item, onClose }: { item: CaseCard; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[80] overflow-y-auto bg-[#3A2A18]/70 px-4 py-6 backdrop-blur-sm" role="dialog" aria-modal="true">
      <div className="mx-auto max-w-6xl rounded-xl border border-[#E3D6C2] bg-[#FAF7EF] p-4 shadow-[0_28px_90px_rgba(0,0,0,0.22)] sm:p-6">
        <div className="flex items-center justify-between gap-4 pb-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#B88A3B]">Case View</p>
            <h3 className="mt-1 font-display text-2xl font-semibold text-[#171717]">{item.title}</h3>
          </div>
          <button
            type="button"
            aria-label="Close case view"
            onClick={onClose}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#D8C59E] bg-white text-[#171717] transition hover:bg-[#FFF8EA]"
          >
            <X size={21} />
          </button>
        </div>
        <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
          <div className="relative min-h-[62vh] overflow-hidden rounded-lg bg-white">
            <Image src={item.image} alt={item.alt} fill unoptimized sizes="100vw" className="object-contain" />
          </div>
          <div className="rounded-lg border border-[#E3D6C2] bg-white p-5">
            <dl className="grid gap-4 text-sm">
              <CaseLine label="Age" value={item.age} />
              <CaseLine label="Country" value={item.country} />
              <CaseLine label="Procedure" value={item.procedure} />
            </dl>
            <p className="mt-6 border-t border-[#E3D6C2] pt-5 text-sm leading-7 text-[#6B6257]">
              Individual results vary. A final recommendation requires photo review and formal medical consultation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
