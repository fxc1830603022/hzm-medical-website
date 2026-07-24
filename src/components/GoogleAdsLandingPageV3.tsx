"use client";

import {
  ArrowRight,
  BadgeCheck,
  Check,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  Globe2,
  LockKeyhole,
  MessageCircle,
  Plane,
  Play,
  ShieldCheck,
  Stethoscope,
  UserRoundCheck
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { FormEvent, RefObject } from "react";
import { useEffect, useRef, useState } from "react";
import { defaultSettings, getWhatsAppUrl } from "@/lib/site-data";
import type { SiteSettings } from "@/lib/site-types";
import { trackAdsLandingEvent, trackLeadFormSubmit } from "@/lib/tracking";
import { TrackedWhatsAppLink } from "./TrackedWhatsAppLink";

type GoogleAdsLandingPageV3Props = {
  settings: SiteSettings;
};

type AssessmentValues = {
  country: string;
  ageGroup: string;
  facialConcerns: string[];
  previousTreatments: string;
  treatmentTimeline: string;
  name: string;
  whatsapp: string;
  email: string;
  preferredContactMethod: string;
  message: string;
  consent: boolean;
};

const googleAdsWhatsAppNumber = "+601121706171";
const googleAdsWhatsAppMessage =
  "Hello, I found Dr. Xiao's 9D Facelift through Google Ads. I have completed the private assessment form and would like to send my photos for review.";

const trustItems = [
  { value: "27+", label: "Years of Clinical Experience", icon: BadgeCheck },
  { value: "Doctor-Led", label: "Facial Assessment", icon: Stethoscope },
  { value: "International", label: "Patient Support", icon: Globe2 },
  { value: "Shanghai", label: "Treatment and Recovery", icon: ShieldCheck }
];

const resultCases = [
  {
    image: "/images/gallery-case-11.jpg",
    alt: "Before and after facial rejuvenation result showing lower-face refinement",
    age: "45",
    country: "USA",
    concern: "Jawline softening and early lower-face heaviness",
    treatment: "9D facial rejuvenation direction",
    timing: "Early clinical follow-up",
    result: "Refined lower-face support while preserving recognizable expression."
  },
  {
    image: "/images/gallery-case-03.jpg",
    alt: "Before and after facial rejuvenation result showing structural support",
    age: "46",
    country: "Singapore",
    concern: "Lower-face descent and reduced jawline definition",
    treatment: "Personalized 9D surgical direction",
    timing: "Post-treatment clinical photo",
    result: "Improved structural support with a natural-looking facial balance."
  },
  {
    image: "/images/facebook-ads-result-case-03-day30-20260720.jpg",
    alt: "Before treatment and day 30 facial rejuvenation patient result",
    age: "Private",
    country: "Not disclosed",
    concern: "Jawline, lower-face and neck aging",
    treatment: "Doctor-led facial rejuvenation plan",
    timing: "Day 30",
    result: "Early recovery result with clearer lower-face and neck definition."
  }
];

const concerns = [
  {
    title: "Jawline Softening",
    description: "Your lower face may feel less defined than it used to.",
    icon: UserRoundCheck
  },
  {
    title: "Early Jowls",
    description: "You notice tissue gathering beside the chin or jawline.",
    icon: CheckCircle2
  },
  {
    title: "Lower-Face Heaviness",
    description: "The lower face can look heavier even without weight change.",
    icon: ClipboardCheck
  },
  {
    title: "Neck Laxity",
    description: "Skin or deeper tissue under the jaw may feel less supported.",
    icon: ShieldCheck
  },
  {
    title: "Previous Filler Heaviness",
    description: "Past volume treatments may have changed facial balance.",
    icon: BadgeCheck
  },
  {
    title: "Not Sure Where to Start",
    description: "A private assessment can help organize the right questions.",
    icon: Stethoscope
  }
];

const methodPoints = [
  "Facial structure and aging-pattern assessment",
  "Natural expression and recognizable features",
  "Personalized depth and treatment planning",
  "Final direction confirmed through medical evaluation"
];

const journeySteps = [
  { title: "Send Your Information", description: "Complete a short private assessment before planning travel." },
  { title: "Receive Initial Guidance", description: "The team reviews your concerns and previous treatments." },
  { title: "Plan Your Shanghai Visit", description: "Discuss timing, consultation, travel and recovery support." },
  { title: "Confirm the Plan in Person", description: "Dr. Xiao completes the medical evaluation in Shanghai." }
];

const faqs = [
  {
    question: "What is the 9D Facelift approach?",
    answer:
      "9D is Dr. Xiao's doctor-led planning system. It considers facial structure, aging pattern, tissue descent, skin quality, previous treatments and natural expression before a treatment direction is discussed."
  },
  {
    question: "Can international patients begin online?",
    answer:
      "Yes. You can begin with the private assessment form. The team can then explain which photos are needed and provide initial guidance before you plan a Shanghai visit."
  },
  {
    question: "Will an online assessment confirm my final treatment?",
    answer:
      "No. Online assessment provides initial guidance only. Final recommendations require an in-person medical evaluation with Dr. Xiao."
  },
  {
    question: "Will I look overfilled or pulled?",
    answer:
      "The planning focus is structural support and natural expression. Results and suitability vary, and the appropriate direction depends on your individual anatomy."
  },
  {
    question: "What photos may be requested after I submit the form?",
    answer:
      "The team may request clear front, side, 45-degree, smile and neck photos, together with your age, country, main concerns and previous treatment history."
  },
  {
    question: "How long should I plan to stay in Shanghai?",
    answer:
      "Timing depends on the treatment direction, medical evaluation, recovery needs and follow-up plan. The team can provide initial travel guidance after reviewing your information."
  }
];

const initialAssessmentValues: AssessmentValues = {
  country: "",
  ageGroup: "",
  facialConcerns: [],
  previousTreatments: "",
  treatmentTimeline: "",
  name: "",
  whatsapp: "",
  email: "",
  preferredContactMethod: "WhatsApp",
  message: "",
  consent: false
};

export function GoogleAdsLandingPageV3({ settings }: GoogleAdsLandingPageV3Props) {
  const safeSettings = {
    ...defaultSettings,
    ...settings,
    whatsappNumber: googleAdsWhatsAppNumber,
    whatsappMessage: googleAdsWhatsAppMessage
  };
  const whatsappUrl = getWhatsAppUrl(safeSettings);
  const resultsRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLElement>(null);
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    trackAdsLandingEvent("ViewContent", { content_name: "google_ads_9d_facelift_v3" });
  }, []);

  useEffect(() => {
    const results = resultsRef.current;
    if (!results) return;

    let tracked = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !tracked) {
          tracked = true;
          trackAdsLandingEvent("ViewResults", { section: "real_patient_results" });
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(results);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const form = formRef.current;
    if (!form) return;

    const observer = new IntersectionObserver(([entry]) => setFormVisible(entry.isIntersecting), { threshold: 0.08 });
    observer.observe(form);
    return () => observer.disconnect();
  }, []);

  function trackAssessmentStart(placement: string) {
    trackAdsLandingEvent("StartAssessment", { placement });
  }

  return (
    <div className="min-h-screen bg-[#F7F4EE] pb-20 text-[#202321] antialiased lg:pb-0">
      <header className="sticky top-0 z-50 border-b border-[#DED6C8] bg-[#FCFBF8]/95 backdrop-blur-lg">
        <div className="mx-auto flex h-[72px] max-w-[1240px] items-center justify-between px-5 sm:px-8">
          <div className="shrink-0" aria-label="Dr. Xiao 9D Lifting System">
            <span className="block font-display text-xl font-semibold leading-none">DR. XIAO</span>
            <span className="mt-1 block text-[9px] font-bold uppercase tracking-[0.18em] text-[#B8A98F]">
              9D Lifting System
            </span>
          </div>
          <nav className="hidden items-center gap-7 text-xs font-semibold text-[#4B504D] lg:flex" aria-label="Page sections">
            <a className="transition hover:text-[#42564D]" href="#real-results">Results</a>
            <a className="transition hover:text-[#42564D]" href="#about-9d">About 9D</a>
            <a className="transition hover:text-[#42564D]" href="#doctor">Dr. Xiao</a>
            <a className="transition hover:text-[#42564D]" href="#international">International</a>
          </nav>
          <a
            href="#private-assessment"
            onClick={() => trackAssessmentStart("sticky_navigation")}
            className="inline-flex h-11 items-center justify-center rounded-[10px] bg-[#42564D] px-4 text-xs font-bold text-white transition hover:bg-[#53685E] sm:px-5"
          >
            <span className="sm:hidden">Assessment</span>
            <span className="hidden sm:inline">Request Assessment</span>
          </a>
        </div>
      </header>

      <main>
        <section className="overflow-hidden border-b border-[#DED6C8]">
          <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-8 px-5 py-10 sm:px-8 sm:py-14 lg:grid-cols-[0.94fr_1.06fr] lg:items-center lg:gap-16 lg:py-16">
            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#9B8562]">
                Doctor-Led Facial Rejuvenation in Shanghai
              </p>
              <h1 className="mt-4 max-w-[660px] font-display text-[42px] font-semibold leading-[1.02] sm:text-[58px] lg:text-[66px]">
                9D Facelift in Shanghai for International Patients
              </h1>
              <p className="mt-5 max-w-[620px] text-base leading-7 text-[#4B504D] sm:text-lg sm:leading-8">
                A personalized facial rejuvenation approach for jawline softening, jowls, lower-face heaviness and neck
                laxity. Every treatment direction is confirmed through medical assessment.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#private-assessment"
                  onClick={() => trackAssessmentStart("hero")}
                  className="inline-flex h-14 items-center justify-center gap-3 rounded-[11px] bg-[#42564D] px-6 text-sm font-bold text-white shadow-[0_16px_38px_rgba(66,86,77,0.18)] transition hover:-translate-y-0.5 hover:bg-[#53685E]"
                >
                  Request a Private Assessment
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href="#real-results"
                  className="inline-flex h-14 items-center justify-center gap-3 rounded-[11px] border border-[#B8A98F] bg-[#FCFBF8] px-6 text-sm font-bold transition hover:-translate-y-0.5 hover:bg-white"
                >
                  View Real Patient Results
                </a>
              </div>
              <p className="mt-4 flex items-center gap-2 text-xs leading-5 text-[#6A6F6C]">
                <LockKeyhole className="h-4 w-4 shrink-0 text-[#53685E]" aria-hidden="true" />
                Private inquiry. Your information is reviewed only for assessment and contact.
              </p>
            </div>

            <div className="relative aspect-[4/3] overflow-hidden rounded-[20px] border border-[#DED6C8] bg-[#EDE7DD] shadow-[0_24px_70px_rgba(32,35,33,0.11)] lg:aspect-[1.04/1]">
              <Image
                src="/images/home-hero-dr-xiao-consultation-bg.webp"
                alt="Dr. Xiao consulting with an international patient in Shanghai"
                fill
                priority
                sizes="(min-width: 1024px) 600px, 92vw"
                className="object-cover object-[63%_center]"
              />
              <div className="absolute inset-x-4 bottom-4 rounded-[12px] border border-white/20 bg-[#202321]/88 p-4 text-white backdrop-blur-md sm:left-auto sm:w-[360px]">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#D8C5A5]">Dr. Xiao Zhongye</p>
                <p className="mt-1 text-sm font-semibold">Founder of the 9D Lifting System{String.fromCharCode(8482)}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-[#DED6C8] bg-[#FCFBF8]">
          <div className="mx-auto grid max-w-[1240px] grid-cols-2 gap-x-4 gap-y-6 px-5 py-7 sm:px-8 lg:grid-cols-4 lg:py-8">
            {trustItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-start gap-3 lg:border-r lg:border-[#DED6C8] lg:last:border-r-0">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#CDBFAD] text-[#53685E]">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block font-display text-lg font-semibold leading-tight">{item.value}</span>
                    <span className="mt-1 block text-[10px] font-semibold uppercase leading-4 tracking-[0.08em] text-[#6A6F6C]">
                      {item.label}
                    </span>
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        <section ref={resultsRef} id="real-results" className="scroll-mt-24 bg-[#FCFBF8] py-16 sm:py-20">
          <SectionHeading
            eyebrow="Real Patient Results"
            title="Natural-looking refinement, shown clearly."
            description="Selected clinical cases with patient context, treatment direction and photo timing."
          />
          <div className="mx-auto mt-9 max-w-[1280px] px-5 sm:px-8">
            <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-5 [-ms-overflow-style:none] [scrollbar-width:none] md:grid md:grid-cols-3 md:overflow-visible md:pb-0 [&::-webkit-scrollbar]:hidden">
              {resultCases.map((item, index) => (
                <article
                  key={item.image}
                  className="w-[86vw] max-w-[408px] shrink-0 snap-center overflow-hidden rounded-[16px] border border-[#D8CBB7] bg-white shadow-[0_18px_55px_rgba(32,35,33,0.07)] md:w-auto"
                >
                  <div className="relative aspect-[512/680] bg-[#EDE7DD]">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      sizes="(min-width: 768px) 33vw, 86vw"
                      className="object-cover object-top"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-[#202321]/82 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.12em] text-white">
                      Before
                    </span>
                    <span className="absolute right-3 top-3 rounded-full bg-[#202321]/82 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.12em] text-white">
                      After
                    </span>
                    {index === 1 ? (
                      <span className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-[#FCFBF8]/92 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.1em] text-[#42564D]">
                        Selected Case
                      </span>
                    ) : null}
                  </div>
                  <div className="p-5 sm:p-6">
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#9B8562]">
                      Age {item.age} <span className="px-1.5 text-[#C6B9A7]">|</span> {item.country}
                    </p>
                    <h3 className="mt-3 font-display text-2xl font-semibold">Before and After Facial Rejuvenation</h3>
                    <div className="mt-4 space-y-2.5 border-t border-[#E4DDD1] pt-4 text-xs leading-5 text-[#4B504D]">
                      <p><strong className="text-[#202321]">Concern:</strong> {item.concern}</p>
                      <p><strong className="text-[#202321]">Direction:</strong> {item.treatment}</p>
                      <p><strong className="text-[#202321]">Photo timing:</strong> {item.timing}</p>
                      <p><strong className="text-[#202321]">Result focus:</strong> {item.result}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <p className="mt-4 text-center text-[11px] leading-5 text-[#6A6F6C]">
              Individual results vary. Images do not guarantee a specific outcome.
            </p>
            <div className="mt-6 text-center">
              <a
                href="#private-assessment"
                onClick={() => trackAssessmentStart("results")}
                className="inline-flex h-12 items-center justify-center gap-3 rounded-[10px] border border-[#B8A98F] bg-[#FCFBF8] px-6 text-sm font-bold transition hover:bg-white"
              >
                Request a Private Assessment
                <ArrowRight className="h-4 w-4 text-[#9B8562]" aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        <section className="border-y border-[#DED6C8] bg-[#F7F4EE] py-16 sm:py-20">
          <SectionHeading
            eyebrow="Common Concerns"
            title="Does this sound like what you notice?"
            description="Aging can show up differently from one face to another."
          />
          <div className="mx-auto mt-9 grid max-w-[1240px] grid-cols-1 gap-4 px-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-3">
            {concerns.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-[16px] border border-[#DED6C8] bg-[#FCFBF8] p-5">
                  <Icon className="h-5 w-5 text-[#53685E]" aria-hidden="true" />
                  <h3 className="mt-4 text-sm font-bold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#5C625E]">{item.description}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-8 text-center">
            <a
              href="#private-assessment"
              onClick={() => trackAssessmentStart("concerns")}
              className="inline-flex h-12 items-center justify-center gap-3 rounded-[10px] bg-[#42564D] px-6 text-sm font-bold text-white transition hover:bg-[#53685E]"
            >
              Tell Us What You Notice
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </section>

        <section id="about-9d" className="scroll-mt-24 bg-[#FCFBF8] py-16 sm:py-20">
          <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-9 px-5 sm:px-8 lg:grid-cols-[0.72fr_1fr] lg:items-center lg:gap-16">
            <div className="lg:hidden">
              <SectionHeadingContent
                eyebrow="What Is 9D"
                title="A doctor-led planning system, not a one-size-fits-all procedure."
              />
            </div>
            <LazyTrackedVideo
              src="/videos/dr-xiao-9d-methodology-mobile-v2.mp4"
              poster="/videos/dr-xiao-9d-methodology-poster.jpg"
              label="9D Method Video"
              className="mx-auto aspect-[9/16] w-full max-w-[330px]"
            />
            <div>
              <div className="hidden lg:block">
                <SectionHeadingContent
                  eyebrow="What Is 9D"
                  title="A doctor-led planning system, not a one-size-fits-all procedure."
                />
              </div>
              <p className="mt-5 max-w-[650px] text-base leading-8 text-[#4B504D]">
                Every face ages differently. Dr. Xiao reviews facial structure, expression, tissue descent, skin
                quality and previous treatment history before recommending a direction.
              </p>
              <ul className="mt-6 space-y-3">
                {methodPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm font-semibold leading-6">
                    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#E8EEE9] text-[#42564D]">
                      <Check className="h-3 w-3" aria-hidden="true" />
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
              <a
                href="#private-assessment"
                onClick={() => trackAssessmentStart("about_9d")}
                className="mt-7 inline-flex h-12 items-center justify-center gap-3 rounded-[10px] border border-[#B8A98F] px-6 text-sm font-bold transition hover:bg-[#F7F4EE]"
              >
                Request a Private Assessment
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        <section className="border-y border-[#DED6C8] bg-[#F7F4EE] py-16 sm:py-20">
          <SectionHeading
            eyebrow="Treatment Direction"
            title="Different concerns may need different depth."
            description="The appropriate direction depends on anatomy, aging pattern, previous treatments and in-person evaluation."
          />
          <div className="mx-auto mt-9 grid max-w-[1080px] grid-cols-1 gap-5 px-5 sm:px-8 lg:grid-cols-2">
            <ComparisonCard
              index="01"
              title="9D Facial Rejuvenation Direction"
              description="May be discussed for earlier lower-face change, a softer jawline or mild-to-moderate tissue descent."
              points={["Earlier jowls", "Jawline softening", "Lower-face heaviness"]}
            />
            <ComparisonCard
              index="02"
              title="Deeper Surgical Direction"
              description="May be discussed when laxity, neck change or deeper structural descent appears more advanced."
              points={["More pronounced jowls", "Neck laxity", "Heavier tissue descent"]}
            />
          </div>
          <p className="mx-auto mt-6 max-w-[860px] px-5 text-center text-xs leading-6 text-[#6A6F6C]">
            No treatment direction is automatically better. Final recommendations depend on medical evaluation and
            individual suitability.
          </p>
        </section>

        <section id="doctor" className="scroll-mt-24 bg-[#FCFBF8] py-16 sm:py-20">
          <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-9 px-5 sm:px-8 lg:grid-cols-[0.78fr_1fr] lg:items-center lg:gap-16">
            <div className="relative mx-auto aspect-[3/4] w-full max-w-[470px] overflow-hidden rounded-[20px] border border-[#DED6C8] bg-[#EDE7DD]">
              <Image
                src="/images/dr-xiao-links-hero-portrait.webp"
                alt="Portrait of Dr. Xiao Zhongye in his Shanghai clinic"
                fill
                sizes="(min-width: 1024px) 470px, 92vw"
                className="object-cover object-top"
              />
            </div>
            <div>
              <SectionHeadingContent eyebrow="Meet the Doctor" title="Dr. Xiao Zhongye" />
              <p className="mt-5 max-w-[650px] text-base leading-8 text-[#4B504D]">
                Founder of the 9D Lifting System{String.fromCharCode(8482)} with more than 27 years of clinical
                experience in facial rejuvenation assessment and planning.
              </p>
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {[
                  "Doctor-led facial assessment",
                  "Anatomy-based planning",
                  "Natural expression focus",
                  "International patient experience"
                ].map((point) => (
                  <div key={point} className="flex items-center gap-3 rounded-[12px] border border-[#DED6C8] bg-[#F7F4EE] p-4 text-sm font-semibold">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-[#53685E]" aria-hidden="true" />
                    {point}
                  </div>
                ))}
              </div>
              <a
                href="#private-assessment"
                onClick={() => trackAssessmentStart("doctor")}
                className="mt-7 inline-flex h-12 items-center justify-center gap-3 rounded-[10px] bg-[#42564D] px-6 text-sm font-bold text-white transition hover:bg-[#53685E]"
              >
                Request a Private Assessment
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        <section id="international" className="scroll-mt-24 border-y border-[#DED6C8] bg-[#F7F4EE] py-16 sm:py-20">
          <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
            <div className="lg:hidden">
              <SectionHeadingContent
                eyebrow="International Patient Journey"
                title="Begin online before planning your visit to Shanghai."
              />
            </div>
            <div className="mt-8 grid grid-cols-1 gap-10 lg:mt-0 lg:grid-cols-[0.72fr_1fr] lg:items-center lg:gap-16">
              <LazyTrackedVideo
                src="/videos/facebook-arrival-support-mobile-v2.mp4"
                poster="/videos/facebook-arrival-support-v21-poster.jpg"
                label="International Patient Journey Video"
                className="mx-auto aspect-[9/16] w-full max-w-[330px]"
              />
              <div>
                <div className="hidden lg:block">
                  <SectionHeadingContent
                    eyebrow="International Patient Journey"
                    title="Begin online before planning your visit to Shanghai."
                  />
                </div>
                <p className="mt-5 text-base leading-8 text-[#4B504D]">
                  Online assessment, travel planning, English-speaking assistance and recovery support help make each
                  step clearer for international patients.
                </p>
                <div className="mt-7 space-y-3">
                  {journeySteps.map((step, index) => (
                    <div key={step.title} className="grid grid-cols-[42px_1fr] gap-4 rounded-[14px] border border-[#DED6C8] bg-[#FCFBF8] p-4">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#42564D] text-xs font-bold text-white">
                        {index + 1}
                      </span>
                      <span>
                        <span className="block text-sm font-bold">{step.title}</span>
                        <span className="mt-1 block text-xs leading-5 text-[#5C625E]">{step.description}</span>
                      </span>
                    </div>
                  ))}
                </div>
                <a
                  href="#private-assessment"
                  onClick={() => trackAssessmentStart("international_journey")}
                  className="mt-7 inline-flex h-12 items-center justify-center gap-3 rounded-[10px] bg-[#42564D] px-6 text-sm font-bold text-white transition hover:bg-[#53685E]"
                >
                  Start Your Private Assessment
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#FCFBF8] py-16 sm:py-20">
          <SectionHeading eyebrow="Before You Begin" title="Frequently asked questions" />
          <div className="mx-auto mt-8 max-w-[900px] px-5 sm:px-8">
            {faqs.map((item, index) => (
              <details
                key={item.question}
                open={index === 0}
                onToggle={(event) => {
                  if (event.currentTarget.open) {
                    trackAdsLandingEvent("FAQOpen", { question: item.question });
                  }
                }}
                className="group border-b border-[#DED6C8]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-5 text-left text-sm font-bold sm:text-base">
                  {item.question}
                  <ChevronDown className="h-5 w-5 shrink-0 text-[#53685E] transition group-open:rotate-180" aria-hidden="true" />
                </summary>
                <p className="max-w-[760px] pb-6 text-sm leading-7 text-[#4B504D]">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section ref={formRef} id="private-assessment" className="scroll-mt-20 bg-[#42564D] py-16 text-white sm:py-20">
          <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-10 px-5 sm:px-8 lg:grid-cols-[0.72fr_1fr] lg:items-start lg:gap-16">
            <div className="lg:sticky lg:top-28">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#D8C5A5]">Private Online Assessment</p>
              <h2 className="mt-3 font-display text-4xl font-semibold leading-tight sm:text-5xl">Tell us what you notice.</h2>
              <p className="mt-5 max-w-[480px] text-base leading-8 text-white/76">
                This short two-step form helps the team understand your concerns before discussing photos, travel or
                the next medical consultation step.
              </p>
              <div className="mt-7 space-y-3 text-sm text-white/82">
                <p className="flex items-center gap-3"><LockKeyhole className="h-4 w-4 text-[#D8C5A5]" /> Private and confidential</p>
                <p className="flex items-center gap-3"><Stethoscope className="h-4 w-4 text-[#D8C5A5]" /> Doctor-led assessment pathway</p>
                <p className="flex items-center gap-3"><Globe2 className="h-4 w-4 text-[#D8C5A5]" /> International patient support</p>
              </div>
            </div>
            <PrivateAssessmentForm />
          </div>
        </section>

        <section className="bg-[#F7F4EE] py-14 sm:py-16">
          <div className="mx-auto flex max-w-[1080px] flex-col items-start justify-between gap-7 px-5 sm:px-8 lg:flex-row lg:items-center">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#9B8562]">A quieter way to begin</p>
              <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">Assessment first. Travel planning second.</h2>
              <p className="mt-3 max-w-[680px] text-sm leading-7 text-[#4B504D]">
                Online assessment provides initial guidance only. Final recommendations require in-person medical evaluation.
              </p>
            </div>
            <a
              href="#private-assessment"
              onClick={() => trackAssessmentStart("final_cta")}
              className="inline-flex h-14 shrink-0 items-center justify-center gap-3 rounded-[10px] bg-[#42564D] px-6 text-sm font-bold text-white transition hover:bg-[#53685E]"
            >
              Request a Private Assessment
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-[#202321] px-5 py-10 text-white sm:px-8">
        <div className="mx-auto grid max-w-[1180px] gap-7 sm:grid-cols-[1fr_auto] sm:items-end">
          <div>
            <p className="font-display text-2xl font-semibold">Dr. Xiao Zhongye</p>
            <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#D8C5A5]">
              Dr. Xiao Zhongye | 9D Facelift
            </p>
            <p className="mt-5 max-w-[720px] text-xs leading-6 text-white/55">
              Information on this page is for reference only. A specific treatment plan must be confirmed after medical
              consultation. Individual results vary.
            </p>
          </div>
          <div>
            <TrackedWhatsAppLink
              href={whatsappUrl}
              placement="google_ads_footer_auxiliary"
              label="Send photos on WhatsApp"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-[10px] border border-white/20 px-4 text-xs font-bold text-white/82 transition hover:bg-white/10"
            >
              <MessageCircle className="h-4 w-4 text-[#7EC894]" aria-hidden="true" />
              WhatsApp
            </TrackedWhatsAppLink>
          </div>
        </div>
      </footer>

      <div
        className={`fixed inset-x-0 bottom-0 z-50 border-t border-[#DED6C8] bg-[#FCFBF8]/96 p-3 shadow-[0_-14px_40px_rgba(32,35,33,0.12)] backdrop-blur-lg transition duration-300 lg:hidden ${
          formVisible ? "translate-y-full opacity-0" : "translate-y-0 opacity-100"
        }`}
      >
        <div className="mx-auto flex max-w-md gap-2">
          <a
            href="#private-assessment"
            onClick={() => trackAssessmentStart("mobile_sticky")}
            className="inline-flex h-14 flex-1 items-center justify-center rounded-[10px] bg-[#42564D] px-4 text-sm font-bold text-white"
          >
            Request Assessment
          </a>
          <TrackedWhatsAppLink
            href={whatsappUrl}
            placement="google_ads_mobile_auxiliary"
            label="WhatsApp"
            aria-label="Send photos on WhatsApp"
            className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-[10px] border border-[#C9D3CB] bg-[#E8EEE9] p-3 text-[#42564D]"
          >
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
          </TrackedWhatsAppLink>
        </div>
      </div>
    </div>
  );
}

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <div className="mx-auto max-w-[920px] px-5 text-center sm:px-8">
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#9B8562]">{eyebrow}</p>
      <h2 className="mt-3 font-display text-[34px] font-semibold leading-tight sm:text-[44px]">{title}</h2>
      {description ? <p className="mx-auto mt-4 max-w-[760px] text-sm leading-7 text-[#5C625E] sm:text-base">{description}</p> : null}
    </div>
  );
}

function SectionHeadingContent({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <>
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#9B8562]">{eyebrow}</p>
      <h2 className="mt-3 font-display text-[34px] font-semibold leading-tight sm:text-[44px]">{title}</h2>
    </>
  );
}

function ComparisonCard({
  index,
  title,
  description,
  points
}: {
  index: string;
  title: string;
  description: string;
  points: string[];
}) {
  return (
    <article className="rounded-[16px] border border-[#D8CBB7] bg-[#FCFBF8] p-6 sm:p-8">
      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#9B8562]">{index}</p>
      <h3 className="mt-4 font-display text-3xl font-semibold">{title}</h3>
      <p className="mt-4 text-sm leading-7 text-[#4B504D]">{description}</p>
      <ul className="mt-6 space-y-3 border-t border-[#DED6C8] pt-5">
        {points.map((point) => (
          <li key={point} className="flex items-center gap-3 text-sm font-semibold">
            <CheckCircle2 className="h-4 w-4 text-[#53685E]" aria-hidden="true" />
            {point}
          </li>
        ))}
      </ul>
    </article>
  );
}

function LazyTrackedVideo({ src, poster, label, className }: { src: string; poster: string; label: string; className: string }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const playedRef = useRef(false);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setReady(true);
        observer.disconnect();
      }
    }, { rootMargin: "500px 0px" });
    observer.observe(wrapper);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={`relative overflow-hidden rounded-[20px] border border-[#CDBFAD] bg-[#202321] p-2 shadow-[0_24px_70px_rgba(32,35,33,0.12)] ${className}`}
    >
      <video
        className="h-full w-full rounded-[14px] object-cover"
        controls
        playsInline
        preload="metadata"
        poster={poster}
        aria-label={label}
        onPlay={() => {
          if (!playedRef.current) {
            playedRef.current = true;
            trackAdsLandingEvent("VideoPlay", { video_name: label });
          }
        }}
      >
        {ready ? <source src={src} type="video/mp4" /> : null}
      </video>
      <span className="pointer-events-none absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-[#202321]/82 px-3 py-2 text-[9px] font-bold uppercase tracking-[0.12em] text-white">
        <Play className="h-3 w-3 fill-current" aria-hidden="true" />
        {label}
      </span>
    </div>
  );
}

function PrivateAssessmentForm() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [values, setValues] = useState<AssessmentValues>(initialAssessmentValues);
  const [state, setState] = useState<"idle" | "submitting" | "error">("idle");
  const [error, setError] = useState("");
  const formElementRef = useRef<HTMLFormElement>(null);

  function update<K extends keyof AssessmentValues>(key: K, value: AssessmentValues[K]) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  function toggleConcern(concern: string) {
    setValues((current) => ({
      ...current,
      facialConcerns: current.facialConcerns.includes(concern)
        ? current.facialConcerns.filter((item) => item !== concern)
        : [...current.facialConcerns, concern]
    }));
  }

  function continueToContact() {
    if (
      !values.country ||
      !values.ageGroup ||
      values.facialConcerns.length === 0 ||
      !values.previousTreatments ||
      !values.treatmentTimeline
    ) {
      setError("Please complete each item before continuing.");
      return;
    }

    setError("");
    setStep(2);
    trackAdsLandingEvent("FormStep1Complete", { form_name: "google_ads_private_assessment_v3" });
    requestAnimationFrame(() => formElementRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }));
  }

  async function submitAssessment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!values.name || (!values.whatsapp && !values.email) || !values.consent) {
      setError("Please add your name, WhatsApp or email, and confirm consent.");
      return;
    }

    setState("submitting");
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "google-ads-private-assessment-v3",
          name: values.name,
          country: values.country,
          ageGroup: values.ageGroup,
          facialConcerns: values.facialConcerns.join(", "),
          previousTreatments: values.previousTreatments,
          treatmentTimeline: values.treatmentTimeline,
          whatsapp: values.whatsapp,
          email: values.email,
          preferredContactMethod: values.preferredContactMethod,
          message: values.message,
          consent: values.consent
        })
      });
      const data = await response.json();
      if (!response.ok || !data.ok) throw new Error(data.error || "Submission failed.");

      trackLeadFormSubmit({
        formName: "google_ads_private_assessment_v3",
        source: "google-ads-private-assessment-v3"
      });
      router.push("/thank-you/google-assessment");
    } catch (submissionError) {
      setState("error");
      setError(submissionError instanceof Error ? submissionError.message : "Please try again.");
    }
  }

  const fieldClass = "grid gap-2 text-xs font-bold text-[#303531]";
  const inputClass =
    "h-14 w-full rounded-[10px] border border-[#DED6C8] bg-[#FCFBF8] px-4 text-sm font-normal text-[#202321] outline-none transition placeholder:text-[#7C827E]/55 focus:border-[#53685E] focus:ring-2 focus:ring-[#53685E]/10";

  return (
    <form
      ref={formElementRef}
      data-testid="google-private-assessment-form"
      onSubmit={submitAssessment}
      className="rounded-[16px] bg-white p-5 text-[#202321] shadow-[0_24px_70px_rgba(22,31,27,0.22)] sm:p-8"
    >
      <div className="flex items-center justify-between gap-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#53685E]">Step {step} of 2</p>
        <p className="text-[10px] font-semibold text-[#7C827E]">About 2 minutes</p>
      </div>
      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[#E8E3DA]">
        <div className={`h-full rounded-full bg-[#53685E] transition-all ${step === 1 ? "w-1/2" : "w-full"}`} />
      </div>

      {step === 1 ? (
        <div className="mt-7 space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className={fieldClass}>
              Country / Region
              <input
                className={inputClass}
                type="text"
                data-testid="assessment-country"
                autoComplete="country-name"
                value={values.country}
                onChange={(event) => update("country", event.target.value)}
                placeholder="e.g. United States"
                required
              />
            </label>
            <label className={fieldClass}>
              Age Range
              <select data-testid="assessment-age-range" className={inputClass} value={values.ageGroup} onChange={(event) => update("ageGroup", event.target.value)} required>
                <option value="">Choose an age range</option>
                <option value="Under 30">Under 30</option>
                <option value="30-39">30-39</option>
                <option value="40-49">40-49</option>
                <option value="50-59">50-59</option>
                <option value="60+">60+</option>
              </select>
            </label>
          </div>

          <fieldset>
            <legend className="text-xs font-bold text-[#303531]">Main Facial Concern <span className="font-normal text-[#7C827E]">(select all that apply)</span></legend>
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {["Jawline", "Jowls", "Lower Face", "Neck", "Previous Fillers", "Other"].map((concern) => {
                const selected = values.facialConcerns.includes(concern);
                return (
                  <button
                    key={concern}
                    type="button"
                    data-testid={`assessment-concern-${concern.toLowerCase().replaceAll(" ", "-")}`}
                    aria-pressed={selected}
                    onClick={() => toggleConcern(concern)}
                    className={`flex min-h-14 items-center justify-between gap-2 rounded-[10px] border px-3 py-3 text-left text-xs font-bold transition ${
                      selected
                        ? "border-[#53685E] bg-[#E8EEE9] text-[#304139]"
                        : "border-[#DED6C8] bg-[#FCFBF8] hover:border-[#B8A98F]"
                    }`}
                  >
                    {concern}
                    <span className={`inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${selected ? "border-[#53685E] bg-[#53685E] text-white" : "border-[#CFC7BA]"}`}>
                      {selected ? <Check className="h-3 w-3" /> : null}
                    </span>
                  </button>
                );
              })}
            </div>
          </fieldset>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className={fieldClass}>
              Previous Facial Treatments
              <select data-testid="assessment-previous-treatments" className={inputClass} value={values.previousTreatments} onChange={(event) => update("previousTreatments", event.target.value)} required>
                <option value="">Choose an option</option>
                <option value="None">None</option>
                <option value="Fillers or injectables">Fillers or injectables</option>
                <option value="Energy-based treatments">Energy-based treatments</option>
                <option value="Previous facial surgery">Previous facial surgery</option>
                <option value="Multiple treatments">Multiple treatments</option>
              </select>
            </label>
            <label className={fieldClass}>
              Expected Treatment Timeline
              <select data-testid="assessment-timeline" className={inputClass} value={values.treatmentTimeline} onChange={(event) => update("treatmentTimeline", event.target.value)} required>
                <option value="">Choose an option</option>
                <option value="Within 1-3 months">Within 1-3 months</option>
                <option value="Within 3-6 months">Within 3-6 months</option>
                <option value="Within 6-12 months">Within 6-12 months</option>
                <option value="Researching for now">Researching for now</option>
              </select>
            </label>
          </div>

          <button
            type="button"
            data-testid="assessment-continue"
            onClick={continueToContact}
            className="inline-flex h-14 w-full items-center justify-center gap-3 rounded-[11px] bg-[#42564D] px-5 text-sm font-bold text-white transition hover:bg-[#53685E]"
          >
            Continue to Contact Details
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      ) : (
        <div className="mt-7 space-y-5">
          <label className={fieldClass}>
            Full Name
            <input data-testid="assessment-name" className={inputClass} type="text" autoComplete="name" value={values.name} onChange={(event) => update("name", event.target.value)} placeholder="Your full name" required />
          </label>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className={fieldClass}>
              WhatsApp Number
              <input data-testid="assessment-whatsapp" className={inputClass} type="tel" autoComplete="tel" value={values.whatsapp} onChange={(event) => update("whatsapp", event.target.value)} placeholder="Include country code" />
            </label>
            <label className={fieldClass}>
              Email Address
              <input data-testid="assessment-email" className={inputClass} type="email" autoComplete="email" value={values.email} onChange={(event) => update("email", event.target.value)} placeholder="you@example.com" />
            </label>
          </div>
          <p className="-mt-2 text-[11px] leading-5 text-[#6A6F6C]">WhatsApp or email is required. You may provide both.</p>
          <label className={fieldClass}>
            Preferred Contact Method
            <select data-testid="assessment-contact-method" className={inputClass} value={values.preferredContactMethod} onChange={(event) => update("preferredContactMethod", event.target.value)}>
              <option value="WhatsApp">WhatsApp</option>
              <option value="Email">Email</option>
              <option value="Either">Either is fine</option>
            </select>
          </label>
          <label className={fieldClass}>
            Additional Notes <span className="font-normal text-[#7C827E]">(optional)</span>
            <textarea
              className="min-h-28 rounded-[10px] border border-[#DED6C8] bg-[#FCFBF8] px-4 py-3 text-sm font-normal outline-none transition placeholder:text-[#7C827E]/55 focus:border-[#53685E] focus:ring-2 focus:ring-[#53685E]/10"
              value={values.message}
              onChange={(event) => update("message", event.target.value)}
              placeholder="Previous procedures, timing questions, medical considerations or goals..."
            />
          </label>
          <label className="flex cursor-pointer items-start gap-3 rounded-[10px] bg-[#F7F4EE] p-4 text-xs leading-5 text-[#4B504D]">
            <input data-testid="assessment-consent" className="mt-0.5 h-4 w-4 accent-[#53685E]" type="checkbox" checked={values.consent} onChange={(event) => update("consent", event.target.checked)} />
            I agree to be contacted regarding my assessment and understand that online guidance does not replace an in-person medical consultation.
          </label>
          <div className="grid gap-3 sm:grid-cols-[auto_1fr]">
            <button type="button" onClick={() => { setError(""); setStep(1); }} className="inline-flex h-14 items-center justify-center rounded-[11px] border border-[#B8A98F] px-5 text-sm font-bold">
              Back
            </button>
            <button
              type="submit"
              disabled={state === "submitting"}
              className="inline-flex h-14 items-center justify-center gap-3 rounded-[11px] bg-[#42564D] px-5 text-sm font-bold text-white transition hover:bg-[#53685E] disabled:cursor-wait disabled:opacity-65"
            >
              {state === "submitting" ? "Submitting..." : "Submit My Private Assessment"}
              {state !== "submitting" ? <ArrowRight className="h-4 w-4" aria-hidden="true" /> : null}
            </button>
          </div>
        </div>
      )}

      {error ? <p role="alert" className="mt-4 rounded-[10px] bg-[#F9ECE8] px-4 py-3 text-xs font-semibold leading-5 text-[#8A4D4D]">{error}</p> : null}
      <p className="mt-5 flex items-center justify-center gap-2 text-center text-[10px] leading-5 text-[#7C827E]">
        <LockKeyhole className="h-3.5 w-3.5" aria-hidden="true" />
        Your information is used only to respond to your assessment request.
      </p>
    </form>
  );
}
