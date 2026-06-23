import {
  ArrowRight,
  BadgeCheck,
  ChevronRight,
  CircleDot,
  Gem,
  Globe2,
  HeartPulse,
  Layers3,
  MapPin,
  MessageCircle,
  Plane,
  ShieldCheck,
  Sparkles,
  Stethoscope
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { GlobalBottomCTA } from "@/components/GlobalBottomCTA";
import { defaultSettings, getWhatsAppUrl } from "@/lib/site-data";
import type { GalleryItem, SiteSettings } from "@/lib/site-types";
import { Reveal } from "./Reveal";

type HomePageProps = {
  settings: SiteSettings;
  galleryItems: GalleryItem[];
};

export const homeFaqs = [
  {
    question: "What is 9D Facelift?",
    answer:
      "9D Facelift is Dr. Xiao's surgeon-led facial rejuvenation system for lifting, restoring facial support, and preserving natural identity. The final plan is personalized after consultation and medical evaluation."
  },
  {
    question: "Is 9D Facelift the same as thread lift?",
    answer:
      "No. True 9D is not a short-term thread lift. It is positioned as a medical lifting system based on deeper structural planning and doctor-led assessment."
  },
  {
    question: "Who is suitable for 9D Facelift?",
    answer:
      "It may be considered for patients with jowls, nasolabial folds, lower-face sagging, facial heaviness, or a blurred jawline. Suitability must be confirmed after photo review and consultation."
  },
  {
    question: "What is the difference between 9D Facelift and Deep Plane Facelift?",
    answer:
      "9D Facelift is generally used for mild to moderate aging concerns, while 9D Deep Plane Facelift is designed for more advanced sagging, heavier jowls, neck laxity, and deeper structural descent."
  },
  {
    question: "Can international patients start online?",
    answer:
      "Yes. International patients can begin with online photo assessment before booking flights to Shanghai. The team can review photos, goals, travel timing, and recovery planning first."
  },
  {
    question: "Are results guaranteed?",
    answer:
      "No medical result can be guaranteed. Individual results vary based on anatomy, skin quality, health status, procedure plan, recovery, and aftercare."
  }
];

const painPoints = [
  {
    icon: CircleDot,
    title: "Jowls & Lower Face Laxity",
    description: "Lower-face heaviness that makes the face look tired or older."
  },
  {
    icon: HeartPulse,
    title: "Nasolabial Folds",
    description: "Deep folds that become more visible as facial support descends."
  },
  {
    icon: Layers3,
    title: "Sagging Lower Face",
    description: "Loss of youthful contour and facial support."
  },
  {
    icon: Sparkles,
    title: "Blurred Jawline",
    description: "A less defined jawline caused by aging and soft-tissue laxity."
  }
];

const charmCards = [
  {
    title: "Customized, Not Assembly-Line",
    description:
      "No two faces age the same way. Every 9D plan is designed around facial anatomy, aging pattern, and personal goals."
  },
  {
    title: "Surgical, Not Thread Lift",
    description:
      "True 9D is not a short-term thread lift. It is a doctor-led surgical lifting system based on deeper structural planning."
  },
  {
    title: "Natural, Not Over-Pulled",
    description:
      "The result should look refreshed, lifted, and recognizable - never artificial."
  }
];

const techniquePoints = [
  {
    title: "Multi-Layered Lifting",
    description: "Addresses deeper support layers, not only the skin surface."
  },
  {
    title: "Stronger, Longer-Lasting Results",
    description: "Designed to restore support and facial contour with a structural approach."
  },
  {
    title: "Natural Expression Preserved",
    description: "Refreshes the face while keeping natural movement and identity."
  }
];

const doctorTrustPoints = [
  "27+ Years Experience",
  "9D Lifting System™",
  "Global Patient Support",
  "Doctor-Led Planning & Surgery"
];

const travelSteps = [
  "Send Photos",
  "Medical Review",
  "Travel & Consultation Planning",
  "Procedure & Recovery Stay",
  "Remote Follow-Up"
];

const pathCards = [
  {
    title: "9D Facelift",
    href: "/procedures/9d-facelift",
    description:
      "For mild to moderate aging concerns such as early jowls, nasolabial folds, lower-face sagging, and blurred jawline.",
    cta: "Learn About 9D Facelift"
  },
  {
    title: "9D Deep Plane Facelift",
    href: "/procedures/9d-deep-plane-facelift",
    description:
      "For advanced sagging, heavier jowls, neck laxity, and deeper structural descent.",
    cta: "Learn About Deep Plane Facelift"
  }
];

const featuredCaseFallbacks = [
  {
    label: "Case 01",
    demographics: "Female, 48",
    procedure: "9D Facelift",
    concerns: "jowls, nasolabial folds, lower-face heaviness",
    visibleChange: "cleaner jawline, softer folds, fresher expression"
  },
  {
    label: "Case 02",
    demographics: "Female, 50s",
    procedure: "9D Deep Plane Facelift",
    concerns: "lower-face sagging, neck laxity",
    visibleChange: "lifted lower face, improved contour"
  },
  {
    label: "Case 03",
    demographics: "Male, 40s",
    procedure: "9D Facelift",
    concerns: "tired look, blurred jawline",
    visibleChange: "sharper lower-face definition, natural masculine result"
  }
];

export function HomePage({ settings, galleryItems }: HomePageProps) {
  const safeSettings = { ...defaultSettings, ...settings };
  const whatsappUrl = getWhatsAppUrl(safeSettings);
  const heroGalleryItem = galleryItems.find((item) => item.displayRole === "hero");
  const heroImage = heroGalleryItem?.image || "/images/international-patients-hero-consultation.webp";
  const heroAlt =
    heroGalleryItem?.alt || "Dr. Xiao 9D Facelift online assessment for international patients in Shanghai";
  const featuredCaseItems = getFeaturedCaseItems(galleryItems);

  return (
    <>
      <section id="hero" className="relative isolate min-h-[calc(100vh-76px)] overflow-hidden bg-[#FAF8F3] px-5 py-16 sm:px-8 lg:flex lg:items-center lg:py-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_16%,rgba(184,138,59,0.13),transparent_32%),linear-gradient(135deg,#FFFDF8_0%,#F5EEE3_100%)]" />
        <div className="pointer-events-none absolute -left-36 top-0 h-[34rem] w-[62rem] -rotate-12 rounded-[50%] border-t border-[#B88A3B]/20" />
        <div className="relative mx-auto grid w-full max-w-[1280px] gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center xl:gap-16">
          <Reveal direction="right" className="max-w-2xl">
            <p className="flex items-center gap-3 text-xs font-bold uppercase text-bronze sm:text-sm" style={{ letterSpacing: "0.22em" }}>
              <Gem size={16} strokeWidth={1.7} />
              Dr. Xiao 9D Facelift
            </p>
            <h1 className="mt-6 font-display text-[clamp(48px,7.5vw,88px)] font-semibold leading-[0.96] tracking-[-0.01em] text-ink">
              Natural 9D Facelift{" "}
              <span className="block text-bronze">in Shanghai</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-graphite/78 sm:text-xl sm:leading-9">
              A surgeon-led facial rejuvenation system that lifts, restores, and preserves your natural charm.
            </p>
            <div className="mt-9 grid gap-4 sm:grid-cols-2">
              <Link
                href="#home-bottom-cta"
                className="inline-flex h-14 w-full items-center justify-center gap-3 rounded-md bg-champagne px-6 text-sm font-bold text-ink shadow-soft transition hover:bg-bronze hover:text-white"
              >
                Send Photos for Assessment
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/before-after"
                className="inline-flex h-14 w-full items-center justify-center gap-3 rounded-md border border-bronze bg-white/70 px-6 text-sm font-bold text-ink transition hover:bg-white"
              >
                View Before & After
                <ArrowRight size={18} />
              </Link>
            </div>
            <div className="mt-9 grid gap-3 sm:grid-cols-2">
              {["Surgeon-Led Treatment", "27+ Years Experience", "International Patient Support", "Medical-Grade Safety"].map(
                (item) => (
                  <div key={item} className="flex items-center gap-3 rounded-md border border-[#E6DED2] bg-white/62 px-4 py-3 text-sm font-semibold text-graphite shadow-[0_12px_36px_rgba(60,42,22,0.06)]">
                    <ShieldCheck size={17} className="shrink-0 text-bronze" />
                    {item}
                  </div>
                )
              )}
            </div>
          </Reveal>

          <Reveal direction="left">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-[640px] overflow-hidden rounded-[26px] border border-white/80 bg-white shadow-[0_30px_90px_rgba(60,42,22,0.16)] lg:max-w-none">
              <Image
                src={heroImage}
                alt={heroAlt}
                fill
                priority
                unoptimized
                sizes="(max-width: 1024px) 100vw, 56vw"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/55 to-transparent p-6 text-white">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-champagne">Facial Rejuvenation in China</p>
                <p className="mt-2 max-w-md font-display text-2xl font-semibold">Online assessment before traveling to Shanghai.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-[1280px]">
          <SectionIntro
            label="START WITH THE REAL CONCERNS"
            title="Is Any of This Starting to Bother You?"
            description="Most facelift decisions begin with small changes in the lower face, jawline, folds, and facial support."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {painPoints.map((item, index) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title} delay={index * 0.05}>
                  <div className="h-full rounded-md border border-[#E6DED2] bg-[#FAF8F3] p-6 shadow-[0_18px_50px_rgba(60,42,22,0.06)]">
                    <Icon className="text-bronze" size={34} strokeWidth={1.6} />
                    <h3 className="mt-6 font-display text-2xl font-semibold leading-tight text-ink">{item.title}</h3>
                    <p className="mt-4 text-sm leading-7 text-graphite/72">{item.description}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#F4EFE7] px-5 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto max-w-[1180px] text-center">
          <Reveal>
            <p className="section-label">Reject the Assembly Line</p>
            <h2 className="mx-auto mt-5 max-w-4xl font-display text-[clamp(40px,5vw,68px)] font-semibold leading-[1.05] text-ink">
              Not a Different Face.{" "}
              <span className="block text-bronze">A Younger Version of You.</span>
            </h2>
            <p className="mx-auto mt-7 max-w-3xl text-base leading-8 text-graphite/76 sm:text-lg sm:leading-9">
              The goal of Dr. Xiao&apos;s 9D Lifting System™ is not to create a stiff, over-pulled, or unfamiliar look.
              It is designed to preserve your natural identity while restoring facial support, contour, and expression.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {charmCards.map((card, index) => (
              <Reveal key={card.title} delay={index * 0.06}>
                <div className="h-full rounded-md border border-[#E3D6C2] bg-[#FFFDF8] p-7 text-left shadow-[0_22px_60px_rgba(60,42,22,0.07)]">
                  <span className="font-display text-4xl text-champagne/70">0{index + 1}</span>
                  <h3 className="mt-5 font-display text-2xl font-semibold leading-tight text-ink">{card.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-graphite/74">{card.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-12">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-graphite/45">Charm Preservation</p>
            <p className="mt-3 font-display text-3xl font-semibold text-bronze sm:text-4xl">Only One 9D. Only by Dr. Xiao.</p>
          </Reveal>
        </div>
      </section>

      <section className="bg-[#FAF8F3] px-5 py-20 sm:px-8 lg:py-32">
        <div className="mx-auto grid max-w-[1280px] gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <Reveal direction="right">
            <div className="relative overflow-hidden rounded-[24px] border border-[#E6DED2] bg-white p-5 shadow-[0_26px_80px_rgba(60,42,22,0.10)]">
              <div className="relative aspect-[5/4] overflow-hidden rounded-[18px] bg-[#F4EFE7]">
                <Image
                  src="/images/dr-xiao-team-hero.webp"
                  alt="Dr. Xiao 9D Facelift structural planning and surgeon-led assessment"
                  fill
                  sizes="(max-width: 1024px) 100vw, 48vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 rounded-md border border-white/35 bg-white/86 p-4 backdrop-blur">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-bronze">9D Methodology</p>
                  <p className="mt-2 font-display text-2xl font-semibold leading-tight text-ink">
                    Structural planning for natural facelift results.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal direction="left">
            <p className="section-label">The 9D Facelift System</p>
            <h2 className="mt-5 font-display text-[clamp(40px,4.8vw,64px)] font-semibold leading-[1.05] text-ink">
              More Than Pulling Skin.{" "}
              <span className="block text-bronze">A Customized Lifting Plan.</span>
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-graphite/76 sm:text-lg sm:leading-9">
              9D is not about simply pulling the skin. It is a customized lifting plan based on facial structure, aging
              pattern, and charm preservation.
            </p>
            <div className="mt-8 grid gap-4">
              {techniquePoints.map((point) => (
                <div key={point.title} className="flex gap-4 rounded-md border border-[#E6DED2] bg-white p-5 shadow-[0_16px_40px_rgba(60,42,22,0.05)]">
                  <BadgeCheck className="mt-1 shrink-0 text-bronze" size={24} />
                  <div>
                    <h3 className="font-display text-xl font-semibold text-ink">{point.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-graphite/72">{point.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link
              href="/procedures/9d-facelift"
              className="mt-8 inline-flex min-h-[52px] items-center justify-center gap-3 rounded-md bg-ink px-6 py-4 text-sm font-bold text-white transition hover:bg-champagne hover:text-ink"
            >
              Learn About 9D Facelift
              <ArrowRight size={18} />
            </Link>
          </Reveal>
        </div>
      </section>

      <section id="gallery" className="bg-white px-5 py-20 sm:px-8 lg:py-32">
        <div className="mx-auto max-w-[1280px]">
          <SectionIntro
            label="SELECTED PATIENT RESULTS"
            title="Real Results. Real Confidence."
            description="Natural-looking facial rejuvenation for jowls, nasolabial folds, lower-face sagging, and jawline definition."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {featuredCaseItems.map((item, index) => {
              const fallback = featuredCaseFallbacks[index] || featuredCaseFallbacks[0];
              const age = normalizeCaseValue(item.age);
              const gender = normalizeCaseValue(item.gender);
              const demographics =
                age && gender
                  ? `${gender}, ${age}`
                  : age
                    ? `${fallback.demographics.split(",")[0]}, ${age}`
                    : gender
                      ? `${gender}, ${fallback.demographics.split(",").slice(1).join(",").trim() || "Private"}`
                      : fallback.demographics;
              const caseLabel = normalizeCaseValue(item.caseLabel) || fallback.label;
              const mainConcerns = normalizeCaseValue(item.mainConcerns) || fallback.concerns;
              const visibleChange = normalizeCaseValue(item.visibleChange) || fallback.visibleChange;
              const procedure = item.procedure || fallback.procedure;

              return (
                <Reveal key={item.id || item.image || fallback.label} delay={index * 0.06}>
                  <article className="h-full overflow-hidden rounded-[18px] border border-[#E3D6C2] bg-[#FFFDF8] shadow-[0_24px_70px_rgba(60,42,22,0.08)]">
                    <div className="relative aspect-[4/3] overflow-hidden bg-[#F4EFE7]">
                      <Image
                        src={item.image}
                        alt={item.alt || item.title || `${procedure} before and after result`}
                        fill
                        unoptimized
                        sizes="(max-width: 1024px) 100vw, 30vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-bronze">{caseLabel}</p>
                      <h3 className="mt-3 font-display text-2xl font-semibold leading-tight text-ink">
                        {item.title || procedure}
                      </h3>
                      <dl className="mt-5 space-y-3 text-sm leading-6 text-graphite/78">
                        <div>
                          <dt className="inline font-bold text-ink">Age / Gender: </dt>
                          <dd className="inline">{demographics}</dd>
                        </div>
                        <div>
                          <dt className="inline font-bold text-ink">Procedure: </dt>
                          <dd className="inline">{procedure}</dd>
                        </div>
                        <div>
                          <dt className="inline font-bold text-ink">Main concerns: </dt>
                          <dd className="inline">{mainConcerns}</dd>
                        </div>
                        <div>
                          <dt className="inline font-bold text-ink">Visible change: </dt>
                          <dd className="inline">{visibleChange}</dd>
                        </div>
                      </dl>
                      <p className="mt-5 border-t border-[#E3D6C2] pt-4 text-xs font-semibold uppercase tracking-[0.14em] text-graphite/45">
                        Individual results vary.
                      </p>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/before-after"
              className="inline-flex h-12 items-center justify-center gap-3 rounded-md border border-bronze bg-[#FFFDF8] px-6 text-sm font-bold text-ink transition hover:bg-champagne hover:text-ink"
            >
              View More Before & After
              <ArrowRight size={18} />
            </Link>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-graphite/45">Individual results vary.</p>
          </div>
        </div>
      </section>

      <section className="bg-[#F4EFE7] px-5 py-20 sm:px-8 lg:py-32">
        <div className="mx-auto grid max-w-[1280px] gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal direction="right">
            <div className="relative mx-auto aspect-[4/5] max-w-[520px] overflow-hidden rounded-[24px] border border-white bg-white shadow-[0_28px_80px_rgba(60,42,22,0.14)] lg:mx-0">
              <Image
                src="/images/dr-xiao-scrubs-portrait.jpg"
                alt="Dr. Xiao Zhongye, surgeon focused on natural facial rejuvenation"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <Reveal direction="left">
            <p className="section-label">Meet Dr. Xiao</p>
            <h2 className="mt-5 max-w-3xl font-display text-[clamp(40px,4.8vw,64px)] font-semibold leading-[1.05] text-ink">
              A Surgeon Focused on Natural Facial Rejuvenation
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-graphite/76 sm:text-lg sm:leading-9">
              Dr. Xiao Zhongye is known for his 9D Lifting System™ and his philosophy of Charm Preservation - helping
              patients look younger while staying recognizable.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {doctorTrustPoints.map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-md border border-[#E3D6C2] bg-[#FFFDF8] px-5 py-4 font-semibold text-ink shadow-[0_14px_40px_rgba(60,42,22,0.06)]">
                  <Stethoscope size={20} className="shrink-0 text-bronze" />
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <Link
                href="/doctor"
                className="inline-flex min-h-[52px] items-center justify-center gap-3 rounded-md bg-ink px-6 py-4 text-sm font-bold text-white transition hover:bg-champagne hover:text-ink"
              >
                About Dr. Xiao
                <ArrowRight size={18} />
              </Link>
              <Link
                href="#home-bottom-cta"
                className="inline-flex min-h-[52px] items-center justify-center gap-3 rounded-md border border-bronze bg-white px-6 py-4 text-sm font-bold text-ink transition hover:bg-[#FFFDF8]"
              >
                Send Photos for Review
                <ArrowRight size={18} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-[#FAF8F3] px-5 py-20 sm:px-8 lg:py-32">
        <div className="mx-auto grid max-w-[1280px] gap-12 lg:grid-cols-[1fr_0.95fr] lg:items-center">
          <Reveal direction="right">
            <p className="section-label">International Patients</p>
            <h2 className="mt-5 max-w-3xl font-display text-[clamp(40px,4.8vw,64px)] font-semibold leading-[1.05] text-ink">
              Planning a Facelift in China?{" "}
              <span className="block text-bronze">Start With Online Assessment.</span>
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-graphite/76 sm:text-lg sm:leading-9">
              Before booking flights to Shanghai, send your photos and information first. Dr. Xiao&apos;s team will
              review your case and suggest a suitable next step.
            </p>
            <div className="mt-9 grid gap-3">
              {travelSteps.map((step, index) => (
                <div key={step} className="flex items-center gap-4 rounded-md border border-[#E6DED2] bg-white px-5 py-4 shadow-[0_14px_40px_rgba(60,42,22,0.05)]">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F4EFE7] text-sm font-bold text-bronze">
                    {index + 1}
                  </span>
                  <span className="font-semibold text-ink">{step}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <Link
                href="/international-patients"
                className="inline-flex min-h-[52px] items-center justify-center gap-3 rounded-md bg-ink px-6 py-4 text-sm font-bold text-white transition hover:bg-champagne hover:text-ink"
              >
                International Patient Guide
                <Plane size={18} />
              </Link>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-[52px] items-center justify-center gap-3 rounded-md border border-bronze bg-white px-6 py-4 text-sm font-bold text-ink transition hover:bg-[#FFFDF8]"
              >
                Send Photos on WhatsApp
                <MessageCircle size={18} />
              </a>
            </div>
          </Reveal>

          <Reveal direction="left">
            <div className="relative overflow-hidden rounded-[24px] border border-white bg-white shadow-[0_28px_80px_rgba(60,42,22,0.12)]">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/images/international-patient-recovery-visit.jpg"
                  alt="International patients planning facial rejuvenation in Shanghai"
                  fill
                  sizes="(max-width: 1024px) 100vw, 46vw"
                  className="object-cover"
                />
              </div>
              <div className="grid gap-3 p-6 sm:grid-cols-2">
                <div className="rounded-md bg-[#FAF8F3] p-4">
                  <Globe2 className="text-bronze" size={24} />
                  <p className="mt-3 font-display text-xl font-semibold text-ink">Global Patients</p>
                  <p className="mt-2 text-sm leading-6 text-graphite/68">Online review before travel decisions.</p>
                </div>
                <div className="rounded-md bg-[#FAF8F3] p-4">
                  <MapPin className="text-bronze" size={24} />
                  <p className="mt-3 font-display text-xl font-semibold text-ink">Shanghai, China</p>
                  <p className="mt-2 text-sm leading-6 text-graphite/68">A clear destination plan for treatment and recovery.</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white px-5 py-20 sm:px-8 lg:py-32">
        <div className="mx-auto max-w-[1280px]">
          <SectionIntro
            label="Procedure Direction"
            title="Choose the Path That's Right for You"
            description="A suitable plan must be confirmed after consultation and medical evaluation."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {pathCards.map((card, index) => (
              <Reveal key={card.title} direction={index === 0 ? "right" : "left"}>
                <Link
                  href={card.href}
                  className="group flex h-full flex-col rounded-[22px] border border-[#E6DED2] bg-[#FAF8F3] p-8 shadow-[0_22px_70px_rgba(60,42,22,0.08)] transition hover:-translate-y-1 hover:border-champagne hover:bg-[#FFFDF8]"
                >
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-bronze">Path 0{index + 1}</p>
                      <h3 className="mt-4 font-display text-4xl font-semibold leading-tight text-ink">{card.title}</h3>
                    </div>
                    <ChevronRight className="mt-3 shrink-0 text-bronze transition group-hover:translate-x-1" size={28} />
                  </div>
                  <p className="mt-6 max-w-xl text-base leading-8 text-graphite/74">{card.description}</p>
                  <span className="mt-8 inline-flex h-12 w-full items-center justify-center gap-3 rounded-md bg-ink px-6 text-sm font-bold text-white transition group-hover:bg-champagne group-hover:text-ink sm:w-fit">
                    {card.cta}
                    <ArrowRight size={18} />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F4EFE7] px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-[1000px]">
          <SectionIntro
            label="FAQ"
            title="Frequently Asked Questions"
            description="Clear answers before you decide whether to send photos, review cases, or plan a trip to Shanghai."
          />
          <div className="mt-12 grid gap-4">
            {homeFaqs.map((faq) => (
              <details key={faq.question} className="group rounded-md border border-[#E3D6C2] bg-[#FFFDF8] p-6 shadow-[0_14px_40px_rgba(60,42,22,0.05)]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-xl font-semibold text-ink">
                  {faq.question}
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#E3D6C2] text-bronze transition group-open:rotate-90">
                    <ChevronRight size={18} />
                  </span>
                </summary>
                <p className="mt-4 max-w-3xl text-sm leading-7 text-graphite/74">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <div id="home-bottom-cta">
        <GlobalBottomCTA settings={safeSettings} source="home-global-bottom-cta" />
      </div>
    </>
  );
}

function SectionIntro({
  label,
  title,
  description
}: {
  label: string;
  title: string;
  description?: string;
}) {
  return (
    <Reveal className="mx-auto max-w-3xl text-center">
      <p className="section-label">{label}</p>
      <h2 className="mt-4 font-display text-[clamp(36px,4.6vw,58px)] font-semibold leading-[1.08] text-ink">{title}</h2>
      {description ? <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-graphite/70">{description}</p> : null}
    </Reveal>
  );
}

function getFeaturedCaseItems(items: GalleryItem[]) {
  const sortedItems = [...items].sort((a, b) => a.sortOrder - b.sortOrder);
  const featuredItems = sortedItems.filter((item) => item.displayRole === "featured");
  const nonHeroItems = sortedItems.filter((item) => item.displayRole !== "hero");
  const caseItems = nonHeroItems.length ? nonHeroItems : sortedItems;
  const selectedItems = (featuredItems.length ? featuredItems : caseItems).slice(0, 3);

  if (selectedItems.length >= 3) return selectedItems;

  const selectedImages = new Set(selectedItems.map((item) => item.image));
  const fillItems = caseItems.filter((item) => !selectedImages.has(item.image));

  return [...selectedItems, ...fillItems].slice(0, 3);
}

function normalizeCaseValue(value?: string) {
  const normalized = value?.trim();
  if (!normalized || normalized.toLowerCase() === "private") return "";
  return normalized;
}
