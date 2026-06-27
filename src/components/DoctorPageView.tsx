import {
  ArrowRight,
  BadgeCheck,
  Camera,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  Layers3,
  MessageCircle,
  Plane,
  ShieldCheck,
  Sparkles
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { GlobalBottomCTA } from "@/components/GlobalBottomCTA";
import { VideoWithSoundControl } from "@/components/VideoWithSoundControl";
import { defaultSettings, getWhatsAppUrl } from "@/lib/site-data";
import type { SiteSettings } from "@/lib/site-types";
import { Reveal } from "./Reveal";

type DoctorPageViewProps = {
  settings: SiteSettings;
};

const heroStats = [
  { value: "27+", label: "Years of clinical experience" },
  { value: "9D", label: "Signature facelift planning system" },
  { value: "Global", label: "Online assessment for international patients" }
];

const philosophyCards = [
  {
    icon: Layers3,
    title: "Structural Planning",
    description:
      "The face is assessed by support layers, tissue descent, skin quality, jawline definition, and neck transition before choosing a lifting direction."
  },
  {
    icon: Sparkles,
    title: "Charm Preservation",
    description:
      "The goal is not to create a different face. 9D planning protects expression, proportion, and the features that make a patient recognizable."
  },
  {
    icon: ShieldCheck,
    title: "Medical Restraint",
    description:
      "A good facelift plan is also a safety plan: realistic expectations, careful incision strategy, recovery planning, and honest risk discussion."
  }
];

const assessmentSteps = [
  {
    step: "01",
    title: "Photo-Based Aging Pattern Review",
    description:
      "Front, side, 45-degree, smiling, and neck photos help the team understand jowls, folds, jawline blur, neck laxity, and asymmetry."
  },
  {
    step: "02",
    title: "Procedure Direction",
    description:
      "Dr. Xiao's team considers whether 9D Facelift, 9D Deep Plane Facelift, or a non-surgical plan is more suitable for the visible aging pattern."
  },
  {
    step: "03",
    title: "In-Person Confirmation",
    description:
      "Online assessment is a starting point. The final medical plan is confirmed after direct consultation, examination, and surgical risk review."
  }
];

const diagnosticAreas = [
  {
    area: "Lower Face",
    focus: "Jowls, mandibular line, lower-face heaviness",
    plan: "Restore support without making the mouth or cheek look pulled."
  },
  {
    area: "Midface & Folds",
    focus: "Nasolabial folds, cheek descent, tired expression",
    plan: "Read whether the fold is skin, volume, or deeper support descent."
  },
  {
    area: "Neck & Jawline",
    focus: "Loose neck, blurred chin-neck angle, jawline softness",
    plan: "Decide whether deeper release and support are needed."
  },
  {
    area: "Identity",
    focus: "Expression, facial proportions, cultural aesthetic preference",
    plan: "Refresh the face while keeping the patient recognizably themselves."
  }
];

const authorityTabs = [
  {
    title: "Clinical Focus",
    count: "Facelift",
    items: [
      "9D Facelift planning for jowls, nasolabial folds, lower-face laxity, and blurred jawline",
      "Deep plane facelift direction for advanced sagging and stronger structural descent",
      "Natural-looking facial rejuvenation with expression and identity preserved"
    ]
  },
  {
    title: "Planning Standard",
    count: "9D",
    items: [
      "Aging pattern review before procedure selection",
      "Face and neck considered as one connected support system",
      "Low-tension, discreet-scar thinking built into the plan"
    ]
  },
  {
    title: "Patient Journey",
    count: "Global",
    items: [
      "Online assessment before booking travel to Shanghai",
      "Multi-language support for international patients",
      "Follow-up guidance after the patient returns home"
    ]
  },
  {
    title: "Education",
    count: "Clarity",
    items: [
      "Explains why true 9D is not a short-term thread lift",
      "Uses before and after cases to discuss realistic outcomes",
      "Encourages medical consultation instead of trend-based decisions"
    ]
  }
];

const resultPrinciples = [
  {
    title: "No over-pulled look",
    description: "A natural facelift result should look rested, lifted, and believable in motion."
  },
  {
    title: "No one-size-fits-all plan",
    description: "Different faces age through different combinations of skin, fat, ligament, and support changes."
  },
  {
    title: "No rushed travel decision",
    description: "International patients should begin with photos, medical history, goals, and timing before making travel plans."
  }
];

const journeyCards = [
  {
    icon: Camera,
    title: "Send Photos",
    description: "Share clear facial and neck photos with your main concerns and previous treatment history."
  },
  {
    icon: ClipboardCheck,
    title: "Receive Review",
    description: "The team reviews whether your concerns may match 9D Facelift or 9D Deep Plane Facelift planning."
  },
  {
    icon: Plane,
    title: "Plan Shanghai",
    description: "If suitable, travel timing, recovery stay, and consultation expectations can be discussed before arrival."
  }
];

export function DoctorPageView({ settings }: DoctorPageViewProps) {
  const safeSettings = { ...defaultSettings, ...settings };
  const videoSrc = safeSettings.methodologyVideoUrl?.trim();
  const videoPoster = safeSettings.methodologyVideoPoster || "/images/dr-xiao-team-hero.webp";

  return (
    <div className="bg-[#fbfaf7] text-ink">
      <section className="relative min-h-[100svh] overflow-hidden bg-ink pt-36 text-white sm:pt-36 lg:pt-40">
        <Image
          src="/images/doctor-hero-door-consultation.png"
          alt="Dr. Xiao Zhongye consultation for 9D Facelift in Shanghai"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[67%_center]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,16,12,0.78)_0%,rgba(18,16,12,0.54)_35%,rgba(18,16,12,0.16)_72%,rgba(18,16,12,0.04)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-ink/80 to-transparent" />

        <div className="relative mx-auto flex min-h-[calc(100svh-9rem)] max-w-[1440px] items-center px-5 pb-16 sm:px-8 lg:px-12">
          <Reveal className="max-w-3xl">
            <p className="section-label text-champagne">Dr. Xiao 9D Facelift</p>
            <h1 className="mt-6 max-w-4xl font-display text-[3.55rem] font-semibold leading-[0.96] tracking-[-0.02em] text-white sm:text-[6rem] lg:text-[7.5rem]">
              Dr. Xiao Zhongye
            </h1>
            <p className="mt-6 max-w-2xl text-2xl font-semibold leading-snug text-champagne sm:text-3xl">
              Founder of the 9D Facelift System for natural facial rejuvenation in Shanghai.
            </p>
            <p className="mt-6 max-w-xl text-base leading-8 text-white/82 sm:text-lg">
              A doctor-led facelift practice focused on structural planning, natural-looking results, and online assessment for international patients considering facelift in China.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/consultation"
                className="inline-flex h-14 items-center justify-center gap-3 rounded-md bg-champagne px-7 text-sm font-bold text-ink shadow-lift transition hover:bg-bronze hover:text-white"
              >
                Send Photos for Assessment
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/before-after"
                className="inline-flex h-14 items-center justify-center gap-3 rounded-md border border-white/45 bg-white/8 px-7 text-sm font-bold text-white backdrop-blur transition hover:bg-white hover:text-ink"
              >
                View Natural Case Results
                <ArrowRight size={18} />
              </Link>
            </div>
          </Reveal>
        </div>

        <div className="relative mx-auto max-w-[1440px] px-5 pb-8 sm:px-8 lg:px-12">
          <div className="grid gap-3 border-t border-white/18 pt-6 sm:grid-cols-3">
            {heroStats.map((item) => (
              <div key={item.label} className="rounded-md border border-white/12 bg-white/8 px-5 py-4 backdrop-blur">
                <p className="font-display text-3xl text-champagne">{item.value}</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-white/72">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal>
            <p className="section-label">Doctor-Led Facial Rejuvenation</p>
            <h2 className="section-title max-w-3xl">
              A career dedicated to the face, not assembly-line beauty.
            </h2>
            <div className="mt-8 space-y-5 text-base leading-8 text-graphite/78">
              <p>
                Dr. Xiao's work is built around a simple but demanding idea: a facelift should restore support without erasing identity. The 9D Facelift System studies how each face ages before deciding how much lift, which direction, and which level of support is appropriate.
              </p>
              <p>
                For patients searching for natural facelift results, deep plane facelift planning, or facelift in Shanghai, the first step is not a sales conversation. It is a structured medical review of photos, goals, health history, and realistic recovery expectations.
              </p>
            </div>
            <div className="mt-9 grid gap-4 sm:grid-cols-2">
              {["Surgeon-led planning", "Natural expression preserved", "Online assessment first", "International patient support"].map((item) => (
                <div key={item} className="flex items-center gap-3 border-b border-champagne/30 pb-4 text-sm font-bold text-ink">
                  <CheckCircle2 className="text-bronze" size={18} />
                  {item}
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal direction="left" className="relative">
            <div className="relative overflow-hidden rounded-[2rem] border border-champagne/35 bg-white shadow-soft">
              <Image
                src="/images/international-before-flights-assessment.webp"
                alt="Dr. Xiao reviewing facial rejuvenation goals with an international patient"
                width={1448}
                height={1086}
                className="aspect-[1.12/1] w-full object-cover"
              />
              <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/35 bg-ink/55 p-5 text-white backdrop-blur-md">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-champagne">9D consultation logic</p>
                <p className="mt-2 font-display text-2xl leading-tight">Plan the face before planning the procedure.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-[#f3eee6] px-5 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal className="max-w-3xl">
            <p className="section-label">The 9D Philosophy</p>
            <h2 className="section-title">
              More than pulling skin. <span>A customized lifting plan.</span>
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {philosophyCards.map((item, index) => {
              const Icon = item.icon;
              return (
                <Reveal
                  key={item.title}
                  delay={index * 0.08}
                  className="rounded-2xl border border-champagne/35 bg-[#fffdf8] p-8 shadow-[0_18px_55px_rgba(60,42,22,0.06)]"
                >
                  <Icon className="text-bronze" size={34} />
                  <h3 className="mt-8 font-display text-3xl font-semibold leading-tight">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-graphite/72">{item.description}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-5 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="lg:sticky lg:top-32 lg:h-fit">
            <p className="section-label">Assessment Before Surgery</p>
            <h2 className="section-title">
              How Dr. Xiao's team reads the face before recommending 9D.
            </h2>
            <p className="mt-6 text-base leading-8 text-graphite/75">
              Patients often ask whether they need 9D Facelift or 9D Deep Plane Facelift. The more useful question is where support has been lost and what kind of lift would still look natural.
            </p>
            <Link
              href="/international-patients"
              className="mt-8 inline-flex h-12 items-center gap-3 rounded-md border border-bronze px-5 text-sm font-bold text-ink transition hover:bg-ink hover:text-white"
            >
              International Patient Guide
              <ArrowRight size={17} />
            </Link>
          </Reveal>

          <div className="grid gap-5">
            {assessmentSteps.map((item, index) => (
              <Reveal
                key={item.step}
                delay={index * 0.06}
                className="grid gap-5 rounded-2xl border border-champagne/35 bg-white p-6 shadow-[0_16px_45px_rgba(21,21,20,0.06)] sm:grid-cols-[5.5rem_1fr]"
              >
                <div className="font-display text-5xl text-bronze/80">{item.step}</div>
                <div>
                  <h3 className="font-display text-2xl font-semibold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-graphite/72">{item.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink px-5 py-24 text-white sm:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal className="max-w-4xl">
            <p className="section-label text-champagne">Professional Authority</p>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-tight sm:text-6xl">
              A doctor page should answer the question patients are really asking:
              <span className="text-champagne"> why trust this plan?</span>
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-5 lg:grid-cols-4">
            {authorityTabs.map((group, index) => (
              <Reveal key={group.title} delay={index * 0.07} className="rounded-2xl border border-white/12 bg-white/[0.06] p-7">
                <div className="flex items-center justify-between border-b border-white/12 pb-5">
                  <h3 className="font-display text-2xl font-semibold">{group.title}</h3>
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-champagne">{group.count}</span>
                </div>
                <ul className="mt-6 space-y-4">
                  {group.items.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-6 text-white/75">
                      <BadgeCheck className="mt-0.5 shrink-0 text-champagne" size={17} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            <div className="grid gap-4 sm:grid-cols-2">
              {diagnosticAreas.map((item) => (
                <div key={item.area} className="rounded-2xl border border-champagne/35 bg-[#fffdf8] p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-bronze">{item.area}</p>
                  <h3 className="mt-4 font-display text-2xl font-semibold">{item.focus}</h3>
                  <p className="mt-3 text-sm leading-7 text-graphite/70">{item.plan}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal direction="left">
            <p className="section-label">Facelift Planning Areas</p>
            <h2 className="section-title">
              The 9D method studies the full facial system, not one isolated wrinkle.
            </h2>
            <p className="mt-6 text-base leading-8 text-graphite/75">
              This is why a patient with nasolabial folds may need lower-face support, and a patient with a blurred jawline may need neck and deep plane assessment. The visible concern is only the surface of the diagnosis.
            </p>
            <div className="mt-8 rounded-2xl border border-champagne/35 bg-[#f7f1e7] p-6">
              <p className="font-display text-2xl leading-snug text-ink">
                "The best result is not the tightest face. It is the most natural version of the patient's own face."
              </p>
              <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-bronze">Dr. Xiao 9D planning principle</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-[#f3eee6] px-5 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal className="mx-auto w-full max-w-[420px]">
            <div className="overflow-hidden rounded-[2rem] bg-ink shadow-lift">
              {videoSrc ? (
                <VideoWithSoundControl
                  src={videoSrc}
                  poster={videoPoster}
                  type="video/mp4"
                  ariaLabel="Dr. Xiao explaining the 9D Facelift methodology"
                  className="aspect-[9/16] h-auto w-full object-cover"
                />
              ) : (
                <Image
                  src={videoPoster}
                  alt="Dr. Xiao 9D Facelift methodology"
                  width={1702}
                  height={924}
                  className="aspect-[9/16] h-auto w-full object-cover object-center"
                />
              )}
            </div>
            <p className="mt-5 text-center text-xs font-bold uppercase tracking-[0.22em] text-bronze">9D methodology</p>
          </Reveal>
          <Reveal direction="left">
            <p className="section-label">Education Builds Trust</p>
            <h2 className="section-title">
              Patients should understand the method before they choose the surgery.
            </h2>
            <p className="mt-6 text-base leading-8 text-graphite/75">
              The strongest international medical websites do not only display results. They educate. Dr. Xiao's doctor page should make the difference between true 9D planning, simple skin pulling, and short-term thread lifting easier to understand.
            </p>
            <div className="mt-8 grid gap-4">
              {resultPrinciples.map((item) => (
                <div key={item.title} className="rounded-xl border border-champagne/35 bg-white p-5">
                  <h3 className="font-display text-2xl font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-graphite/70">{item.description}</p>
                </div>
              ))}
            </div>
            <Link
              href="/procedures/9d-facelift"
              className="mt-8 inline-flex h-12 items-center gap-3 rounded-md bg-ink px-5 text-sm font-bold text-white transition hover:bg-bronze"
            >
              Learn About 9D Facelift
              <ArrowRight size={17} />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="px-5 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal className="max-w-3xl">
            <p className="section-label">International Patient Pathway</p>
            <h2 className="section-title">
              Start online before planning your facelift trip to Shanghai.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {journeyCards.map((item, index) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title} delay={index * 0.08} className="rounded-2xl border border-champagne/35 bg-white p-8 shadow-soft">
                  <Icon className="text-bronze" size={34} />
                  <h3 className="mt-8 font-display text-3xl font-semibold">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-graphite/72">{item.description}</p>
                </Reveal>
              );
            })}
          </div>
          <Reveal className="mt-12 overflow-hidden rounded-[2rem] border border-champagne/35 bg-[#fffdf8] shadow-soft">
            <div className="grid items-center lg:grid-cols-[1fr_0.9fr]">
              <div className="p-8 sm:p-12">
                <p className="section-label">What to send first</p>
                <h3 className="mt-4 font-display text-4xl font-semibold leading-tight">
                  Clear photos, medical history, and honest goals make the assessment more useful.
                </h3>
                <div className="mt-7 grid gap-3 text-sm font-semibold text-graphite/78 sm:grid-cols-2">
                  {["Front and side photos", "45-degree photos", "Jawline and neck view", "Previous surgery or fillers", "Health and medication notes", "Desired travel timing"].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <CheckCircle2 className="text-bronze" size={17} />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <Image
                src="/images/dr-xiao-scrubs-portrait.jpg"
                alt="Dr. Xiao Zhongye portrait"
                width={1200}
                height={1800}
                className="h-full max-h-[680px] w-full object-cover object-[50%_18%]"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-ink px-5 py-20 text-white sm:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[1fr_auto]">
          <Reveal>
            <p className="section-label text-champagne">Ready for a doctor-led review?</p>
            <h2 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-tight sm:text-5xl">
              Send your photos before deciding whether 9D Facelift is right for you.
            </h2>
          </Reveal>
          <Reveal direction="left" className="flex flex-col gap-3 sm:flex-row">
            <a
              href={getWhatsAppUrl(safeSettings)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-14 items-center justify-center gap-3 rounded-md bg-champagne px-6 text-sm font-bold text-ink transition hover:bg-bronze hover:text-white"
            >
              <MessageCircle size={18} />
              Chat on WhatsApp
            </a>
            <Link
              href="/consultation"
              className="inline-flex h-14 items-center justify-center gap-3 rounded-md border border-white/24 px-6 text-sm font-bold text-white transition hover:bg-white hover:text-ink"
            >
              <FileText size={18} />
              Online Assessment
            </Link>
          </Reveal>
        </div>
      </section>

      <GlobalBottomCTA settings={safeSettings} source="doctor-global-bottom-cta" />
    </div>
  );
}
