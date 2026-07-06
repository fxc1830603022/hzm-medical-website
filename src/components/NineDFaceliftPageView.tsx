import {
  ArrowRight,
  BadgeCheck,
  CalendarClock,
  Camera,
  Check,
  ChevronRight,
  ClipboardCheck,
  Gem,
  Globe2,
  HeartPulse,
  Layers3,
  MessageCircle,
  Ruler,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  UserRoundCheck
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { GlobalBottomCTA } from "@/components/GlobalBottomCTA";
import { Reveal } from "@/components/Reveal";
import { defaultSettings, getWhatsAppUrl } from "@/lib/site-data";
import type { GalleryItem, ProcedurePageAsset, SiteSettings } from "@/lib/site-types";

type NineDFaceliftPageViewProps = {
  settings: SiteSettings;
  galleryItems?: GalleryItem[];
  procedurePageAsset?: ProcedurePageAsset | null;
};

const heroImage = "/images/home-hero-dr-xiao-consultation-bg.webp";
const doctorPortrait = "/images/doctor-hero-door-consultation.png";
const planningImage = "/images/international-before-flights-assessment.webp";

const trustItems = [
  {
    title: "Only One 9D",
    description: "Dr. Xiao proprietary planning",
    icon: Gem
  },
  {
    title: "3N Standard",
    description: "Nerve, scar, natural-look planning",
    icon: ShieldCheck
  },
  {
    title: "International Patients",
    description: "Start with online assessment",
    icon: Globe2
  },
  {
    title: "Personalized Plan",
    description: "Anatomy before procedure choice",
    icon: ClipboardCheck
  }
];

const fitItems = [
  "Early jowls",
  "Mild to moderate lower-face sagging",
  "Softened jawline definition",
  "Nasolabial folds",
  "Tired lower-face contour",
  "Previous thread lift or filler history"
];

const fallbackResultCards = [
  {
    image: "/images/gallery-case-02.jpg",
    alt: "Natural 9D Facelift before and after result",
    title: "Age 35 | Malaysia | 9D Facelift",
    concern: "Lower-face heaviness, jawline softening",
    result: "Natural lower-face refinement without an overfilled appearance."
  },
  {
    image: "/images/gallery-case-11.jpg",
    alt: "Natural 9D Deep Plane Facelift before and after result",
    title: "Age 42 | United States | 9D Deep Plane Facelift",
    concern: "Jawline loss, lower-face sagging",
    result: "Restored support while preserving recognizable expression."
  }
];

const methodItems = [
  {
    title: "Not a temporary thread lift",
    description:
      "9D Facelift is positioned as surgical facial rejuvenation planning, not a short-lived thread support label."
  },
  {
    title: "Not one incision for every face",
    description:
      "Incision direction and depth are selected after reviewing facial structure, laxity, skin quality, and prior treatments."
  },
  {
    title: "Not a one-price menu item",
    description:
      "Age, anatomy, travel timing, health status, and recovery goals all influence the recommended plan."
  },
  {
    title: "Not a fake-look transformation",
    description:
      "The goal is to refresh your own face, preserving expression, movement, and personal identity."
  }
];

const systemItems = [
  {
    title: "Deep Structural Lifting",
    description: "Addresses support layers when indicated, not only loose skin.",
    icon: Layers3
  },
  {
    title: "Natural Expression Preservation",
    description: "Lift direction is planned to avoid a tight or wind-pulled look.",
    icon: Sparkles
  },
  {
    title: "Customized Incision Planning",
    description: "Hairline, ear, and natural contours guide discreet placement.",
    icon: Ruler
  },
  {
    title: "Long-Term Facial Harmony",
    description: "Planning considers the face as a complete structure over time.",
    icon: HeartPulse
  }
];

const comparisonRows = [
  {
    shortcut: "Thread lift",
    shortcutText: "Temporary support for selected patients",
    approach: "9D planning",
    approachText: "Surgical structural assessment when a true lift is needed"
  },
  {
    shortcut: "Filler-heavy correction",
    shortcutText: "May add volume without correcting descent",
    approach: "Anatomy-based lift",
    approachText: "Focuses on support, contour, and natural facial balance"
  },
  {
    shortcut: "Same incision for everyone",
    shortcutText: "Template-driven and often less precise",
    approach: "Custom incision strategy",
    approachText: "Hairline, laxity, scars, and facial shape guide planning"
  },
  {
    shortcut: "Pulling skin tighter",
    shortcutText: "Can create a stretched or unfamiliar expression",
    approach: "Natural movement preserved",
    approachText: "Designed to refresh while keeping recognizable expression"
  },
  {
    shortcut: "One-price menu item",
    shortcutText: "Procedure-first decision making",
    approach: "Medical assessment first",
    approachText: "Suitability, plan depth, and recovery are reviewed first"
  }
];

const candidateItems = [
  "Lower-face sagging",
  "Early jowls",
  "Jawline softening",
  "Nasolabial folds",
  "Neck laxity",
  "Tired or heavy expression"
];

const doctorBullets = [
  "Founder of 9D Lifting System",
  "Focus on natural facial rejuvenation",
  "International patient online assessment",
  "Personalized planning based on anatomy, not templates"
];

const planCards = [
  {
    title: "9D Facelift",
    tag: "Mild to moderate facial aging",
    text: "May be considered when the main concerns are early jowls, lower-face softness, nasolabial folds, and jawline definition."
  },
  {
    title: "9D Deep Plane Facelift",
    tag: "Stronger structural needs",
    text: "May be recommended for heavier jowls, advanced neck laxity, deeper tissue descent, or stronger support requirements."
  }
];

const journeySteps = [
  "Send Photos",
  "Preliminary Assessment",
  "Personalized Plan Direction",
  "Travel & Treatment Planning",
  "In-Person Consultation"
];

const recoverySteps = [
  {
    time: "Day 1-3",
    title: "Early swelling and observation",
    text: "Rest, swelling control, incision care, and medical observation are the priority."
  },
  {
    time: "Week 1",
    title: "First recovery checkpoint",
    text: "Bruising and swelling are reviewed, and aftercare guidance is adjusted."
  },
  {
    time: "Week 2-4",
    title: "Social recovery begins",
    text: "Many patients look more presentable, although swelling and tightness may remain."
  },
  {
    time: "Month 2-3",
    title: "Contour refinement",
    text: "Facial lines continue to settle as tissue recovery becomes more stable."
  },
  {
    time: "Long-Term",
    title: "Natural maturation",
    text: "Final refinement depends on anatomy, healing, skin quality, and aftercare."
  }
];

const safetyItems = [
  {
    title: "Nerve Safety Planning",
    text: "Surgical planning should include careful anatomical review and responsible risk discussion.",
    icon: ShieldCheck
  },
  {
    title: "Scar Concealment Strategy",
    text: "Incisions are planned around natural transitions when anatomy allows. Scar healing varies.",
    icon: Ruler
  },
  {
    title: "No Fake-Look Result",
    text: "The lift direction is designed for a refreshed appearance, not an over-tightened face.",
    icon: Sparkles
  }
];

const faqItems = [
  {
    question: "What is 9D Facelift?",
    answer:
      "9D Facelift is Dr. Xiao's proprietary facial rejuvenation planning approach for suitable patients with mild to moderate facial aging. It focuses on anatomy, incision planning, natural expression, and long-term facial harmony."
  },
  {
    question: "Is 9D Facelift the same as thread lift?",
    answer:
      "No. Thread lift can provide temporary support for selected patients. 9D Facelift is positioned as surgical structural planning and requires medical assessment before deciding suitability."
  },
  {
    question: "What is the difference between 9D Facelift and 9D Deep Plane Facelift?",
    answer:
      "9D Facelift may suit mild to moderate aging. 9D Deep Plane Facelift may be recommended when deeper tissue descent, stronger jowls, or advanced neck laxity require a deeper structural plan."
  },
  {
    question: "Can international patients start online?",
    answer:
      "Yes. International patients can send front, side, 45-degree, smile, and neck photos for a preliminary online assessment before making travel plans."
  },
  {
    question: "How long should I stay in Shanghai?",
    answer:
      "The recommended stay depends on procedure depth, healing, early swelling, and follow-up needs. A realistic window should be discussed after online assessment."
  },
  {
    question: "Are scars or risks guaranteed to be minimal?",
    answer:
      "No surgical result can be guaranteed. Scar appearance and risk profile vary by anatomy, health status, surgical plan, and healing. These points must be discussed before treatment."
  }
];

export function NineDFaceliftPageView({
  settings,
  galleryItems = [],
  procedurePageAsset = null
}: NineDFaceliftPageViewProps) {
  const safeSettings = { ...defaultSettings, ...settings };
  const whatsappUrl = getWhatsAppUrl(safeSettings);
  const asset: Partial<ProcedurePageAsset> = procedurePageAsset || {};
  const pageImages = {
    hero: asset.heroImage || heroImage,
    heroAlt: asset.heroImageAlt || "Dr. Xiao consulting with an international patient for 9D Facelift assessment",
    philosophy: asset.philosophyImage || planningImage,
    philosophyAlt: asset.philosophyImageAlt || "Dr. Xiao facial rejuvenation planning consultation",
    doctorAuthority: asset.doctorAuthorityImage || doctorPortrait,
    doctorAuthorityAlt: asset.doctorAuthorityImageAlt || "Dr. Xiao portrait for 9D Facelift authority",
    finalCta: asset.finalCtaImage || asset.heroImage || heroImage,
    finalCtaAlt: asset.finalCtaImageAlt || "International patient preparing for online facial assessment"
  };
  const cmsResultCards = galleryItems
    .filter((item) => {
      const searchable = `${item.procedure || ""} ${item.title || ""}`.toLowerCase();
      return item.image && (searchable.includes("9d") || searchable.includes("facelift"));
    })
    .slice(0, 2)
    .map((item, index) => ({
      image: item.image,
      alt: item.alt || item.title || "Natural 9D Facelift before and after result",
      title:
        item.title ||
        [item.age ? `Age ${item.age}` : null, item.country, item.procedure || "9D Facelift"].filter(Boolean).join(" | ") ||
        fallbackResultCards[index]?.title,
      concern: item.mainConcerns || fallbackResultCards[index]?.concern || "Lower-face aging concerns",
      result: item.visibleChange || item.description || fallbackResultCards[index]?.result || "Natural-looking refinement."
    }));
  const resultCards = [...cmsResultCards, ...fallbackResultCards].slice(0, 2);

  return (
    <div className="bg-[#F8F4EE] text-[#1F1C19]">
      <section className="relative isolate overflow-hidden px-5 pb-16 pt-28 sm:px-8 lg:min-h-screen lg:px-10 lg:pb-24 lg:pt-36">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_18%,rgba(182,138,69,0.14),transparent_28%),linear-gradient(135deg,#FFFDFC_0%,#F3EBDF_100%)]" />
        <div className="pointer-events-none absolute -right-24 top-24 -z-10 h-96 w-96 rounded-full bg-white/70 blur-3xl" />
        <div className="pointer-events-none absolute left-0 top-0 -z-10 h-px w-full bg-gradient-to-r from-transparent via-[#B68A45]/45 to-transparent" />

        <div className="mx-auto grid min-w-0 w-full max-w-[1420px] gap-10 lg:grid-cols-[0.96fr_1.04fr] lg:items-center">
          <Reveal direction="none" className="order-1 min-w-0 w-full max-w-[350px] sm:max-w-none">
            <div className="relative overflow-hidden rounded-[28px] border border-[#E6DED3] bg-white p-3 shadow-[0_30px_80px_rgba(43,37,32,0.12)]">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[22px] bg-[#E6DED3] lg:aspect-[0.96/1] xl:aspect-[1.08/1]">
                <Image
                  src={pageImages.hero}
                  alt={pageImages.heroAlt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover object-[62%_center]"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/52 to-transparent p-5 text-white">
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#E4BF76]">Doctor-led assessment</p>
                  <p className="mt-2 max-w-[300px] font-display text-xl leading-tight sm:text-2xl">
                    Plan the face before planning the procedure.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal direction="none" className="order-2 min-w-0 w-full max-w-[350px] sm:max-w-none">
            <nav className="mb-8 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#6F675F]">
              <Link href="/" className="transition hover:text-[#B68A45]">
                Home
              </Link>
              <span className="h-px w-8 bg-[#B68A45]" />
              <span className="text-[#B68A45]">9D Facelift</span>
            </nav>
            <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.24em] text-[#B68A45]">
              <Gem size={15} />
              9D Facelift by Dr. Xiao
            </p>
            <h1 className="mt-6 max-w-full break-words font-display text-[38px] font-semibold leading-[1.02] text-[#1F1C19] max-[380px]:text-[34px] sm:text-6xl lg:max-w-3xl lg:text-[84px] xl:text-[88px]">
              9D Facelift
              <span className="block text-[#B68A45]">Natural</span>
              <span className="block text-[#B68A45]">Rejuvenation,</span>
              <span className="block text-[#B68A45]">No Fake-Look</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#4D4741]">
              9D Facelift is Dr. Xiao&apos;s proprietary facial rejuvenation planning approach, designed for suitable
              patients with mild to moderate facial aging who want to look refreshed while preserving their own
              expression, charm, and identity.
            </p>
            <div className="mt-9 grid gap-4 sm:grid-cols-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-14 items-center justify-center gap-3 rounded-md bg-[#D8B56D] px-6 text-sm font-bold text-[#15120E] shadow-[0_18px_42px_rgba(182,138,69,0.22)] transition hover:bg-[#E3C57F]"
              >
                WhatsApp Assessment
                <ArrowRight size={18} />
              </a>
              <Link
                href="/before-after"
                className="inline-flex h-14 items-center justify-center gap-3 rounded-md border border-[#B68A45] bg-white/70 px-6 text-sm font-bold text-[#1F1C19] transition hover:bg-white"
              >
                View Natural Results
                <ArrowRight size={18} />
              </Link>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {["Doctor-Led Facial Assessment", "Customized Incision & Depth Planning", "Natural Expression Preservation"].map(
                (item) => (
                  <div key={item} className="rounded-md border border-[#E6DED3] bg-white/72 p-4 shadow-[0_16px_38px_rgba(43,37,32,0.06)]">
                    <Check className="mb-3 text-[#B68A45]" size={18} />
                    <p className="text-sm font-bold leading-6 text-[#1F1C19]">{item}</p>
                  </div>
                )
              )}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-[#E6DED3] bg-[#FFFDFC] px-5 py-8 sm:px-8">
        <div className="mx-auto grid max-w-[1320px] gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trustItems.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="flex items-center gap-4 rounded-md border border-[#E6DED3] bg-[#F8F4EE] p-5 lg:border-0 lg:bg-transparent">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#B68A45]/35 bg-white text-[#B68A45]">
                  <Icon size={22} />
                </span>
                <div>
                  <h2 className="font-display text-xl font-semibold leading-tight text-[#1F1C19]">{item.title}</h2>
                  <p className="mt-1 text-sm text-[#6F675F]">{item.description}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto grid max-w-[1320px] gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <Reveal direction="right">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#B68A45]">Fit Check</p>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-[#1F1C19] sm:text-5xl">
              Is 9D Facelift right for you?
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-[#6F675F]">
              Not sure? Send front, side, 45-degree, smile, and neck photos for a preliminary online assessment.
            </p>
            <div className="mt-8 rounded-[22px] border border-[#E6DED3] bg-white p-6 shadow-[0_24px_60px_rgba(43,37,32,0.07)]">
              <div className="grid gap-4 sm:grid-cols-2">
                {fitItems.map((item) => (
                  <div key={item} className="flex gap-3 text-sm font-semibold leading-6 text-[#2B2520]">
                    <Check className="mt-0.5 shrink-0 text-[#B68A45]" size={18} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-7 inline-flex h-12 w-full items-center justify-center gap-3 rounded-md bg-[#2B2520] px-5 text-sm font-bold text-white transition hover:bg-[#B68A45] hover:text-[#1F1C19] sm:w-auto"
              >
                Start Online Assessment
                <MessageCircle size={18} />
              </a>
            </div>
          </Reveal>

          <div className="grid snap-x gap-5 overflow-x-auto pb-2 sm:grid-cols-2 sm:overflow-visible">
            {resultCards.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.06}>
                <article className="min-w-[82vw] snap-start overflow-hidden rounded-[22px] border border-[#E6DED3] bg-white shadow-[0_24px_60px_rgba(43,37,32,0.08)] sm:min-w-0">
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#F8F4EE]">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      sizes="(min-width: 768px) 34vw, 82vw"
                      className="object-contain"
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#B68A45]">Mini result preview</p>
                    <h3 className="mt-3 font-display text-2xl font-semibold leading-tight text-[#1F1C19]">{item.title}</h3>
                    <p className="mt-4 text-sm leading-7 text-[#6F675F]">
                      <strong className="text-[#1F1C19]">Concern:</strong> {item.concern}
                    </p>
                    <p className="mt-2 text-sm leading-7 text-[#6F675F]">
                      <strong className="text-[#1F1C19]">Result direction:</strong> {item.result}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#2B2520] px-5 py-20 text-white sm:px-8 lg:py-28">
        <div className="mx-auto grid max-w-[1320px] gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <Reveal direction="right">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] border border-white/12 bg-white/5 shadow-[0_34px_90px_rgba(0,0,0,0.22)]">
              <Image
                src={pageImages.philosophy}
                alt={pageImages.philosophyAlt}
                fill
                sizes="(min-width: 1024px) 38vw, 100vw"
                className="object-cover object-[58%_center]"
              />
            </div>
          </Reveal>
          <Reveal direction="left">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#D8B56D]">Philosophy</p>
            <blockquote className="mt-6 max-w-4xl font-display text-4xl font-semibold leading-tight sm:text-6xl">
              The question is not &quot;How small is the incision?&quot;
              <span className="mt-3 block text-[#D8B56D]">The real question is: Which plan fits your anatomy?</span>
            </blockquote>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/72">
              The best aesthetic results do not make you look different. They make you look like yourself again.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto grid max-w-[1320px] gap-10 lg:grid-cols-[0.82fr_1.18fr]">
          <Reveal direction="right">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#B68A45]">What Is 9D Facelift?</p>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-[#1F1C19] sm:text-5xl">
              A proprietary planning system, not a generic facelift package.
            </h2>
            <p className="mt-6 text-base leading-8 text-[#6F675F]">
              9D Facelift is Dr. Xiao&apos;s facial rejuvenation planning system. It is not a temporary thread lift and not a
              one-size-fits-all facelift. The plan is selected after reviewing anatomy, aging pattern, prior treatments,
              expectations, and recovery timing.
            </p>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2">
            {methodItems.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.05}>
                <article className="h-full rounded-[18px] border border-[#E6DED3] bg-white p-6 shadow-[0_20px_50px_rgba(43,37,32,0.06)]">
                  <span className="font-display text-4xl text-[#B68A45]/50">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="mt-5 font-display text-2xl font-semibold leading-tight text-[#1F1C19]">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-[#6F675F]">{item.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-20 sm:px-8 lg:py-28">
        <SectionIntro eyebrow="The 9D Lifting System" title="Four principles guide the plan before the procedure begins." />
        <div className="mx-auto mt-12 grid max-w-[1320px] gap-5 md:grid-cols-2 xl:grid-cols-4">
          {systemItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={index * 0.05}>
                <article className="h-full rounded-[20px] border border-[#E6DED3] bg-[#FFFDFC] p-7 shadow-[0_20px_50px_rgba(43,37,32,0.06)]">
                  <Icon className="text-[#B68A45]" size={34} strokeWidth={1.55} />
                  <h3 className="mt-7 font-display text-2xl font-semibold leading-tight text-[#1F1C19]">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-[#6F675F]">{item.description}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:py-28">
        <SectionIntro eyebrow="Differentiation" title="9D Facelift vs common anti-aging shortcuts." />
        <div className="mx-auto mt-12 max-w-[1180px] overflow-hidden rounded-[24px] border border-[#E6DED3] bg-white shadow-[0_24px_70px_rgba(43,37,32,0.08)]">
          <div className="hidden grid-cols-2 bg-[#2B2520] text-sm font-bold uppercase tracking-[0.16em] text-white md:grid">
            <div className="border-r border-white/10 p-5">Common shortcut</div>
            <div className="p-5">9D planning approach</div>
          </div>
          {comparisonRows.map((row) => (
            <article key={row.shortcut} className="grid border-t border-[#E6DED3] md:grid-cols-2">
              <div className="border-[#E6DED3] p-5 md:border-r">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#B68A45] md:hidden">Common shortcut</p>
                <h3 className="font-display text-2xl font-semibold text-[#1F1C19]">{row.shortcut}</h3>
                <p className="mt-2 text-sm leading-7 text-[#6F675F]">{row.shortcutText}</p>
              </div>
              <div className="bg-[#FFFDFC] p-5">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#B68A45] md:hidden">9D planning approach</p>
                <h3 className="font-display text-2xl font-semibold text-[#1F1C19]">{row.approach}</h3>
                <p className="mt-2 text-sm leading-7 text-[#6F675F]">{row.approachText}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#FFFDFC] px-5 py-20 sm:px-8 lg:py-28">
        <SectionIntro eyebrow="Candidate Signals" title="Who may be a candidate for 9D Facelift?" />
        <div className="mx-auto mt-12 grid max-w-[1320px] gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {candidateItems.map((item, index) => (
            <Reveal key={item} delay={index * 0.04}>
              <article className="flex min-h-32 items-center gap-5 rounded-[18px] border border-[#E6DED3] bg-[#F8F4EE] p-6">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-[#B68A45]">
                  <ChevronRight size={22} />
                </span>
                <h3 className="font-display text-2xl font-semibold leading-tight text-[#1F1C19]">{item}</h3>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto grid max-w-[1320px] gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <Reveal direction="right">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#B68A45]">Why Dr. Xiao?</p>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-[#1F1C19] sm:text-5xl">
              Doctor-led judgment before any procedure recommendation.
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {doctorBullets.map((item) => (
                <div key={item} className="flex gap-3 rounded-md border border-[#E6DED3] bg-white p-5 shadow-[0_18px_45px_rgba(43,37,32,0.05)]">
                  <UserRoundCheck className="mt-1 shrink-0 text-[#B68A45]" size={20} />
                  <p className="text-sm font-bold leading-7 text-[#1F1C19]">{item}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal direction="left">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] border border-[#E6DED3] bg-white p-3 shadow-[0_30px_80px_rgba(43,37,32,0.12)]">
              <Image
                src={pageImages.doctorAuthority}
                alt={pageImages.doctorAuthorityAlt}
                fill
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover object-[62%_center]"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-[#2B2520] px-5 py-20 text-white sm:px-8 lg:py-28">
        <SectionIntro
          eyebrow="Procedure Matching"
          title="9D Facelift or 9D Deep Plane Facelift?"
          dark
        />
        <div className="mx-auto mt-12 grid max-w-[1180px] gap-5 md:grid-cols-2">
          {planCards.map((item) => (
            <article key={item.title} className="rounded-[22px] border border-white/14 bg-white/[0.06] p-7 backdrop-blur">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#D8B56D]">{item.tag}</p>
              <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-white">{item.title}</h2>
              <p className="mt-5 text-sm leading-7 text-white/70">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:py-28">
        <SectionIntro eyebrow="International Patient Journey" title="Start online before you plan travel to Shanghai." />
        <div className="mx-auto mt-12 grid max-w-[1320px] gap-4 lg:grid-cols-5">
          {journeySteps.map((step, index) => (
            <Reveal key={step} delay={index * 0.04}>
              <article className="relative h-full rounded-[18px] border border-[#E6DED3] bg-white p-6 shadow-[0_18px_45px_rgba(43,37,32,0.05)]">
                <span className="font-display text-5xl text-[#B68A45]/45">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-5 font-display text-2xl font-semibold leading-tight text-[#1F1C19]">{step}</h3>
                {index < journeySteps.length - 1 ? (
                  <ArrowRight className="absolute right-5 top-8 hidden text-[#B68A45]/45 lg:block" size={24} />
                ) : null}
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-white px-5 py-20 sm:px-8 lg:py-28">
        <SectionIntro eyebrow="Recovery Timeline" title="Recovery is part of the plan, not an afterthought." />
        <div className="mx-auto mt-12 grid max-w-[1180px] gap-4">
          {recoverySteps.map((item, index) => (
            <Reveal key={item.time} delay={index * 0.04}>
              <article className="grid gap-5 rounded-[18px] border border-[#E6DED3] bg-[#FFFDFC] p-6 md:grid-cols-[140px_1fr] md:items-start">
                <div className="flex items-center gap-3 text-[#B68A45]">
                  <CalendarClock size={24} />
                  <span className="font-display text-2xl font-semibold">{item.time}</span>
                </div>
                <div>
                  <h3 className="font-display text-2xl font-semibold text-[#1F1C19]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-[#6F675F]">{item.text}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:py-28">
        <SectionIntro eyebrow="Safety, Scars & Natural Results" title="A serious procedure deserves transparent expectations." />
        <div className="mx-auto mt-12 grid max-w-[1320px] gap-5 md:grid-cols-3">
          {safetyItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={index * 0.05}>
                <article className="h-full rounded-[20px] border border-[#E6DED3] bg-white p-7 shadow-[0_20px_50px_rgba(43,37,32,0.06)]">
                  <Icon className="text-[#B68A45]" size={32} strokeWidth={1.55} />
                  <h3 className="mt-6 font-display text-2xl font-semibold leading-tight text-[#1F1C19]">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-[#6F675F]">{item.text}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
        <p className="mx-auto mt-8 max-w-[920px] rounded-md border border-[#E6DED3] bg-white/70 p-5 text-center text-sm leading-7 text-[#6F675F]">
          No surgical result can be guaranteed. Individual outcomes vary depending on anatomy, health status, skin quality,
          procedure plan, healing, and aftercare.
        </p>
      </section>

      <section className="bg-[#2B2520] px-5 py-20 text-white sm:px-8 lg:py-28">
        <div className="mx-auto grid max-w-[1320px] gap-10 lg:grid-cols-[0.82fr_1.18fr]">
          <Reveal direction="right">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#D8B56D]">FAQ</p>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-tight sm:text-5xl">
              Questions before a 9D Facelift assessment.
            </h2>
            <p className="mt-6 text-base leading-8 text-white/68">
              These answers are educational. A final recommendation requires medical assessment and in-person confirmation.
            </p>
          </Reveal>
          <div className="grid gap-4">
            {faqItems.map((item) => (
              <details key={item.question} className="group rounded-[18px] border border-white/14 bg-white/[0.06] p-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-display text-2xl font-semibold leading-tight text-white">
                  {item.question}
                  <span className="shrink-0 text-[#D8B56D] transition group-open:rotate-90">
                    <ChevronRight size={22} />
                  </span>
                </summary>
                <p className="mt-4 text-sm leading-7 text-white/68">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#FFFDFC] px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto grid max-w-[1320px] gap-10 rounded-[28px] border border-[#E6DED3] bg-[#F8F4EE] p-5 shadow-[0_28px_80px_rgba(43,37,32,0.08)] md:p-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <Reveal direction="right">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[22px] bg-white">
              <Image
                src={pageImages.finalCta}
                alt={pageImages.finalCtaAlt}
                fill
                sizes="(min-width: 1024px) 38vw, 100vw"
                className="object-cover object-[62%_center]"
              />
            </div>
          </Reveal>
          <Reveal direction="left">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#B68A45]">Personalized Assessment</p>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-[#1F1C19] sm:text-5xl">
              Find out if 9D Facelift fits your face.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#6F675F]">
              Send your photos, age range, country, WhatsApp number, main concerns, and prior treatments. The team can
              advise whether 9D Facelift, 9D Deep Plane Facelift, or another plan is more suitable.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-14 items-center justify-center gap-3 rounded-md bg-[#D8B56D] px-6 text-sm font-bold text-[#15120E] transition hover:bg-[#E3C57F]"
              >
                WhatsApp Assessment
                <MessageCircle size={18} />
              </a>
              <Link
                href="/consultation"
                className="inline-flex h-14 items-center justify-center gap-3 rounded-md border border-[#B68A45] bg-white px-6 text-sm font-bold text-[#1F1C19] transition hover:bg-[#FFFDFC]"
              >
                Submit Online Form
                <ArrowRight size={18} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <GlobalBottomCTA settings={safeSettings} source="9d-facelift-global-bottom-cta" />
    </div>
  );
}

function SectionIntro({
  eyebrow,
  title,
  dark = false
}: {
  eyebrow: string;
  title: string;
  dark?: boolean;
}) {
  return (
    <Reveal className="mx-auto max-w-4xl text-center">
      <p className={`text-sm font-bold uppercase tracking-[0.2em] ${dark ? "text-[#D8B56D]" : "text-[#B68A45]"}`}>
        {eyebrow}
      </p>
      <h2 className={`mt-4 font-display text-4xl font-semibold leading-tight sm:text-5xl ${dark ? "text-white" : "text-[#1F1C19]"}`}>
        {title}
      </h2>
    </Reveal>
  );
}
