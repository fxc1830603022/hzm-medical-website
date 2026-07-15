"use client";

import {
  ArrowRight,
  BadgeCheck,
  Camera,
  CheckCircle2,
  ClipboardCheck,
  Globe2,
  Layers3,
  MessageCircle,
  Plane,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  UserRoundCheck
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import { defaultSettings, getWhatsAppUrl } from "@/lib/site-data";
import type { GalleryItem, SiteSettings } from "@/lib/site-types";
import { ArrivalSupportVideo } from "./ArrivalSupportVideo";
import { TrackedWhatsAppLink } from "./TrackedWhatsAppLink";

type AdsLandingVariant = "google" | "facebook";
type IconType = typeof MessageCircle;

type AdsLandingPageViewProps = {
  variant: AdsLandingVariant;
  settings: SiteSettings;
  galleryItems: GalleryItem[];
};

type ResultCardData = {
  image: string;
  alt: string;
  age: string;
  country: string;
  concern: string;
  procedure: string;
  result: string;
};

type FeatureCardData = {
  title: string;
  description: string;
  icon: IconType;
};

type PageConfig = {
  path: string;
  eyebrow: string;
  title: string;
  titleLines: string[];
  intro: string;
  doctorLine: string;
  heroImage: string;
  heroAlt: string;
  heroImageMode: "portrait" | "wide";
  primaryCta: string;
  secondaryCta: string;
  whatsappMessage: string;
  trustItems: Array<{ title: string; description: string; icon: IconType }>;
  fitTitle: string;
  fitSubtitle: string;
  fitItems: Array<{ title: string; icon: IconType }>;
  differenceTitle: string;
  differenceItems: FeatureCardData[];
  resultsTitle: string;
  results: Array<Omit<ResultCardData, "image"> & { imageFallback: string }>;
  finalTitle: string;
  finalDescription: string;
  finalButton: string;
};

const assessmentInstruction =
  "For assessment, please send front, side, 45-degree, smile, and neck photos + your age, country, and main concerns.";

const facebookArrivalVideoSrc = "/videos/facebook-arrival-support-v21.mp4";
const facebookArrivalVideoPoster = "/videos/facebook-arrival-support-v21-poster.jpg";
const facebookAdsWhatsAppNumber =
  process.env.NEXT_PUBLIC_FACEBOOK_ADS_WHATSAPP_NUMBER?.trim() || "+601161325783";

const googleWhatsAppMessage =
  "Hello, I found Dr. Xiao 9D Facelift through Google Ads and would like to send my photos for a private online assessment.\n\nMy age:\nMy country:\nMy main concerns:\nPrevious treatments:";

const facebookWhatsAppMessage =
  "Hello, I saw Dr. Xiao 9D Facelift on Facebook and would like to send my photos for a private online assessment.\n\nMy age:\nMy country:\nMy main concerns:\nPrevious treatments:";

const processSteps = [
  {
    number: "1",
    title: "Send Photos",
    description: "Front, side, 45-degree, smile, neck photos and key concerns.",
    icon: Camera
  },
  {
    number: "2",
    title: "Receive Guidance",
    description: "Dr. Xiao's team reviews your aging pattern and suitability.",
    icon: ClipboardCheck
  },
  {
    number: "3",
    title: "Plan Shanghai Visit",
    description: "Treatment timing, travel planning, and recovery support.",
    icon: Plane
  }
];

const planCards = [
  {
    title: "9D Facelift",
    description: "For mild to moderate aging and early lower-face heaviness.",
    items: ["Early jowls", "Jawline softening", "Nasolabial folds"],
    image: "/images/gallery-case-11.jpg"
  },
  {
    title: "Not Sure Which One?",
    description: "Start with an online photo assessment before choosing a plan.",
    items: ["Send photos", "Review anatomy", "Confirm in person"],
    image: "/images/international-photo-guide-01.webp",
    featured: true
  },
  {
    title: "9D Deep Plane Facelift",
    description: "For more advanced sagging, neck laxity, and heavier tissue descent.",
    items: ["Pronounced jowls", "Neck laxity", "Heavier sagging"],
    image: "/images/gallery-case-03.jpg"
  }
];

const faqs = [
  {
    question: "What is 9D Facelift?",
    answer:
      "9D Facelift is Dr. Xiao's doctor-led facial rejuvenation planning system. It reviews facial anatomy, aging pattern, tissue descent, skin laxity, previous treatments, recovery expectations, and natural expression before deciding which treatment direction may be appropriate."
  },
  {
    question: "Is 9D Facelift the same as deep plane facelift?",
    answer:
      "No. 9D is Dr. Xiao's planning system. Deep plane technique may be recommended when deeper structural support is needed."
  },
  {
    question: "Can international patients start with an online assessment?",
    answer:
      "Yes. International patients can begin by sending photos and key concerns through WhatsApp. Online assessment provides preliminary direction before travel planning, while the final treatment recommendation requires in-person medical evaluation in Shanghai."
  },
  {
    question: "What photos should I send?",
    answer:
      "Please send front, side, 45-degree, smile, and neck photos, together with your age, country, main concerns, previous treatments, and any relevant medical considerations."
  },
  {
    question: "Am I too young for facelift?",
    answer:
      "Suitability depends on facial anatomy, laxity, skin quality, aging pattern, previous treatments, and goals rather than age alone. Some patients may need a lighter plan or may be advised to wait."
  },
  {
    question: "Will I look different or overdone?",
    answer:
      "The goal is natural rejuvenation, preserving recognizable expression rather than creating an overfilled or pulled look."
  },
  {
    question: "How is the treatment cost determined?",
    answer:
      "The cost depends on facial anatomy, degree of aging, procedure depth, treatment combination, previous procedures, and individual planning. A preliminary range may be discussed after photo assessment, while the final plan requires medical evaluation."
  },
  {
    question: "How long should international patients plan to stay in Shanghai?",
    answer:
      "The recommended stay depends on the selected procedure, recovery progress, follow-up schedule, and individual health considerations. The team can provide initial planning guidance after reviewing your case."
  },
  {
    question: "What are the risks?",
    answer:
      "All surgery has risks, including swelling, bruising, scarring, asymmetry, nerve-related concerns, infection, delayed healing, or results that differ from expectations. Individual risk discussion requires medical evaluation."
  },
  {
    question: "How do I start?",
    answer:
      "Send your photos on WhatsApp for a private preliminary assessment."
  }
];

const facebookDoctorTrustItems = [
  { value: "27+", label: "Years Experience", icon: BadgeCheck },
  { value: "9D", label: "Lifting System", icon: Layers3 },
  { value: "Global", label: "Patient Support", icon: Globe2 },
  { value: "Doctor", label: "Led Assessment", icon: Stethoscope }
];

const facebookPhotoGuideItems = [
  { title: "Front", image: "/images/international-photo-guide-01.webp" },
  { title: "Side", image: "/images/international-photo-guide-03.webp" },
  { title: "45-degree", image: "/images/international-photo-guide-04.webp" },
  { title: "Smile", image: "/images/international-photo-guide-05.webp" },
  { title: "Neck", image: "/images/international-photo-guide-07.webp" }
];

const facebookJourneySteps = [
  {
    title: "Online Assessment",
    description: "Send photos and key concerns privately.",
    icon: Camera
  },
  {
    title: "Travel Planning",
    description: "Coordinate timing before Shanghai arrival.",
    icon: Plane
  },
  {
    title: "Shanghai Visit",
    description: "In-person consultation confirms the plan.",
    icon: Stethoscope
  },
  {
    title: "Recovery Support",
    description: "Organized follow-up guidance in Shanghai.",
    icon: ShieldCheck
  }
];

const facebookDoctorAuthorityPoints = [
  {
    title: "Founder of the 9D Lifting System",
    description: "Dr. Xiao's planning approach focuses on facial structure, aging pattern, and natural expression.",
    icon: Layers3
  },
  {
    title: "Doctor-led facial assessment",
    description: "Treatment direction begins with medical review rather than a generic beauty template.",
    icon: Stethoscope
  },
  {
    title: "Natural-looking rejuvenation focus",
    description: "The goal is refreshed support while preserving recognizable features and expression.",
    icon: Sparkles
  },
  {
    title: "International patient support",
    description: "The team helps patients plan assessment, travel timing, consultation, and recovery in Shanghai.",
    icon: Globe2
  }
];

const facebookArrivalSupportSteps = [
  {
    number: "01",
    title: "Before You Travel",
    description: "Start with photo assessment, treatment direction, and expected stay planning."
  },
  {
    number: "02",
    title: "Arrival Coordination",
    description: "Guidance and coordination after arriving in Shanghai."
  },
  {
    number: "03",
    title: "Doctor Consultation",
    description: "Meet Dr. Xiao and confirm the personalized plan in person."
  },
  {
    number: "04",
    title: "Recovery Support",
    description: "Receive guidance through the early recovery and follow-up journey."
  }
];

const facebookAfterPhotosSteps = [
  {
    number: "01",
    title: "Private Photo Review",
    description: "Your age, concerns, previous treatments, and facial photos are reviewed for initial guidance."
  },
  {
    number: "02",
    title: "Preliminary Plan Direction",
    description: "The team explains whether 9D Facelift, a deeper approach, or waiting may be more appropriate."
  },
  {
    number: "03",
    title: "Plan the Next Step",
    description: "Receive guidance on consultation timing, Shanghai travel planning, and in-person doctor evaluation."
  }
];

const whatIs9dTags = ["Facial Anatomy", "Aging Pattern", "Personalized Surgical Planning"];

const googleInternationalJourneySteps = [
  {
    number: "01",
    title: "Send Photos",
    description: "Send front, side, 45-degree, smile, and neck photos with your concerns and previous treatments."
  },
  {
    number: "02",
    title: "Receive Preliminary Guidance",
    description: "The team reviews your case and provides initial direction before travel planning."
  },
  {
    number: "03",
    title: "Plan Your Shanghai Visit",
    description: "Receive guidance on consultation timing, expected arrangements, and preparation steps."
  },
  {
    number: "04",
    title: "In-Person Medical Evaluation",
    description: "Dr. Xiao confirms the final recommendation after an in-person consultation."
  }
];

const googleInternationalSupportPoints = [
  "Online Assessment",
  "Travel Planning Guidance",
  "Arrival Coordination",
  "English-Speaking Assistance",
  "Recovery Support"
];

const recoveryTimeline = [
  {
    period: "Day 1-3",
    description: "Early swelling, tightness, bruising, and rest are expected after surgery."
  },
  {
    period: "Week 1",
    description: "Incision care and early follow-up are important during the initial recovery period."
  },
  {
    period: "Week 2-4",
    description: "Swelling usually continues to improve, although social recovery varies between patients."
  },
  {
    period: "Month 2-3",
    description: "Facial contours may continue to soften and appear more natural."
  },
  {
    period: "Long-Term",
    description: "Final refinement and scar maturation may continue over several months."
  }
];

const recoverySafetyCards = [
  {
    title: "Nerve Safety Planning",
    description: "Careful anatomical planning is required when deeper structural work is considered.",
    icon: ShieldCheck
  },
  {
    title: "Incision and Scar Strategy",
    description: "Incision placement depends on anatomy, hairline, skin laxity, and the selected procedure.",
    icon: ClipboardCheck
  },
  {
    title: "Realistic Expectations",
    description: "All surgery has risks, and recovery, scars, swelling, and outcomes vary between patients.",
    icon: BadgeCheck
  }
];

const googleAfterPhotosSteps = [
  {
    number: "01",
    title: "Private Photo Review",
    description: "Your facial photos, age, concerns, previous treatments, and goals are reviewed for preliminary guidance."
  },
  {
    number: "02",
    title: "Preliminary Plan Direction",
    description: "The team explains whether 9D Facelift, a deeper approach, a lighter plan, or waiting may be appropriate to discuss."
  },
  {
    number: "03",
    title: "Next-Step Guidance",
    description: "Receive guidance on consultation timing, Shanghai travel planning, and in-person doctor evaluation."
  }
];

const pageConfigs: Record<AdsLandingVariant, PageConfig> = {
  google: {
    path: "/ads/google-9d-facelift",
    eyebrow: "9D Facelift in Shanghai",
    title: "9D Facelift in Shanghai by Dr. Xiao",
    titleLines: ["9D Facelift", "in Shanghai", "by Dr. Xiao"],
    intro:
      "Natural facial rejuvenation without the overfilled or pulled look.",
    doctorLine: "Founder of the 9D Lifting System in Shanghai. Personalized facial planning by Dr. Xiao.",
    heroImage: "/images/home-hero-dr-xiao-consultation-bg.webp",
    heroAlt: "Dr. Xiao reviewing facial structure during a private consultation in Shanghai",
    heroImageMode: "wide",
    primaryCta: "Start WhatsApp Assessment",
    secondaryCta: "View Natural Results",
    whatsappMessage: googleWhatsAppMessage,
    trustItems: [
      { title: "Doctor-Led", description: "Assessment", icon: Stethoscope },
      { title: "9D Lifting", description: "System", icon: Layers3 },
      { title: "Natural-Looking", description: "Results", icon: Sparkles },
      { title: "International", description: "Patients Welcome", icon: Globe2 }
    ],
    fitTitle: "Are You Searching for a Natural Facelift Solution?",
    fitSubtitle: "You may be suitable if you notice:",
    fitItems: [
      { title: "Jawline softening", icon: Sparkles },
      { title: "Early jowls", icon: UserRoundCheck },
      { title: "Lower-face sagging", icon: Layers3 },
      { title: "Nasolabial folds", icon: BadgeCheck },
      { title: "Neck laxity", icon: ShieldCheck },
      { title: "Tired facial appearance", icon: Stethoscope }
    ],
    differenceTitle: "What Makes 9D Facelift Different?",
    differenceItems: [
      {
        title: "Facial Structure Assessment",
        description: "Bone support, soft tissue, skin quality, and aging pattern are reviewed first.",
        icon: Layers3
      },
      {
        title: "Aging Pattern Analysis",
        description: "Jowls, volume shift, folds, and neck laxity are considered together.",
        icon: Stethoscope
      },
      {
        title: "Customized Depth and Incision Planning",
        description: "The surgical direction and incision strategy depend on anatomy and procedure needs.",
        icon: ClipboardCheck
      },
      {
        title: "Natural Expression Preservation",
        description: "The goal is support and refinement without a tight or pulled look.",
        icon: Sparkles
      }
    ],
    resultsTitle: "Real Patients. Natural Results.",
    results: [
      {
        imageFallback: "/images/gallery-case-11.jpg",
        alt: "Natural 9D Facelift case result",
        age: "45",
        country: "USA",
        concern: "Jawline softening, lower-face heaviness",
        procedure: "9D Facelift",
        result: "Natural lower-face refinement without an overfilled look."
      },
      {
        imageFallback: "/images/gallery-case-03.jpg",
        alt: "9D Deep Plane Facelift case result",
        age: "46",
        country: "Malaysia",
        concern: "Lower-face sagging, nasolabial folds",
        procedure: "9D Deep Plane Facelift",
        result: "Improved facial support and contour with natural expression."
      },
      {
        imageFallback: "/images/gallery-case-02.jpg",
        alt: "9D Facelift facial rejuvenation result",
        age: "50",
        country: "Singapore",
        concern: "Jowls, neck laxity, facial heaviness",
        procedure: "9D Facelift",
        result: "Tighter jawline and neck, refreshed and natural."
      }
    ],
    finalTitle: "Find Out If 9D Facelift Fits Your Face",
    finalDescription:
      "Send your photos, age, country, main concerns, and previous treatments for a private preliminary assessment before planning your visit to Shanghai.",
    finalButton: "Send Photos on WhatsApp"
  },
  facebook: {
    path: "/ads/facebook-9d-facelift",
    eyebrow: "Natural facial rejuvenation",
    title: "Natural Facial Rejuvenation by Dr. Xiao",
    titleLines: ["Natural Facial", "Rejuvenation", "by Dr. Xiao"],
    intro:
      "Not overfilled. Not pulled. Still yourself. 9D Facelift is designed for patients who want a refreshed lower-face and neck appearance while preserving natural expression.",
    doctorLine: "Doctor-led 9D facial assessment by Dr. Xiao, founder of the 9D Lifting System in Shanghai.",
    heroImage: "/images/facebook-ads-hero-dr-xiao-portrait.webp",
    heroAlt: "Dr. Xiao Zhongye portrait in a white coat for private 9D facial assessment",
    heroImageMode: "portrait",
    primaryCta: "Send Photos on WhatsApp",
    secondaryCta: "View Results",
    whatsappMessage: facebookWhatsAppMessage,
    trustItems: [
      { title: "Doctor-Led", description: "Planning", icon: Stethoscope },
      { title: "Structure, Not", description: "Overfilling", icon: Layers3 },
      { title: "Expression", description: "Preservation", icon: Sparkles },
      { title: "International", description: "Support", icon: Globe2 }
    ],
    fitTitle: "You May Be Suitable If You Notice:",
    fitSubtitle: "A quick check for common lower-face and neck concerns.",
    fitItems: [
      { title: "Jawline softening", icon: Sparkles },
      { title: "Early jowls", icon: UserRoundCheck },
      { title: "Lower-face heaviness", icon: Layers3 },
      { title: "Nasolabial folds", icon: BadgeCheck },
      { title: "Neck laxity", icon: ShieldCheck },
      { title: "Tired or aged appearance", icon: Stethoscope }
    ],
    differenceTitle: "Why 9D Facelift Looks Natural",
    differenceItems: [
      {
        title: "Structure, Not Overfilling",
        description: "Support is restored where needed instead of adding volume everywhere.",
        icon: Layers3
      },
      {
        title: "Expression Preservation",
        description: "The plan protects natural movement and recognizable expression.",
        icon: Sparkles
      },
      {
        title: "Customized Planning",
        description: "Your facial anatomy, aging pattern, and goals guide the decision.",
        icon: ClipboardCheck
      },
      {
        title: "Doctor-Led Assessment",
        description: "Every plan is personally reviewed before treatment direction is confirmed.",
        icon: Stethoscope
      }
    ],
    resultsTitle: "Real Patients. Natural-Looking Results.",
    results: [
      {
        imageFallback: "/images/gallery-case-02.jpg",
        alt: "Natural 9D Facelift real patient result",
        age: "42",
        country: "USA",
        concern: "Jawline loss, lower-face sagging",
        procedure: "9D Facelift",
        result: "Restored facial support while preserving natural expression."
      },
      {
        imageFallback: "/images/gallery-case-11.jpg",
        alt: "9D Facelift lower-face refinement result",
        age: "45",
        country: "Malaysia",
        concern: "Lower-face heaviness, jawline softening",
        procedure: "9D Facelift",
        result: "Natural refinement without an overfilled appearance."
      },
      {
        imageFallback: "/images/gallery-case-03.jpg",
        alt: "9D Deep Plane Facelift jawline and neck result",
        age: "50",
        country: "UK",
        concern: "Jowls, neck laxity, facial heaviness",
        procedure: "9D Deep Plane Facelift",
        result: "Tighter jawline and neck, refreshed and natural."
      }
    ],
    finalTitle: "Ready to See If 9D Fits You?",
    finalDescription: "Send your photos for a private online assessment.",
    finalButton: "Start Facebook Assessment"
  }
};

export function AdsLandingPageView({ variant, settings, galleryItems }: AdsLandingPageViewProps) {
  const config = pageConfigs[variant];
  const safeSettings = { ...defaultSettings, ...settings, whatsappMessage: config.whatsappMessage };
  const pageSettings =
    variant === "facebook" && facebookAdsWhatsAppNumber
      ? { ...safeSettings, whatsappNumber: facebookAdsWhatsAppNumber }
      : safeSettings;
  const whatsappUrl = getWhatsAppUrl(pageSettings);
  const [trackingQuery, setTrackingQuery] = useState("");
  const resultCards = useMemo(() => buildResultCards(config.results, galleryItems), [config.results, galleryItems]);

  useEffect(() => {
    setTrackingQuery(window.location.search);
  }, []);

  if (variant === "facebook") {
    return (
      <FacebookAdsV2Page
        config={config}
        whatsappUrl={whatsappUrl}
        resultCards={resultCards}
        trackingQuery={trackingQuery}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#FBF8F1] pb-24 text-[#171717] antialiased">
      <SimpleHeader whatsappUrl={whatsappUrl} />
      <main>
        <HeroSection config={config} whatsappUrl={whatsappUrl} />
        <TrustStrip items={config.trustItems} />
        <WhatIs9DSection whatsappUrl={whatsappUrl} />
        <GoogleMethodVideoSection whatsappUrl={whatsappUrl} />
        <FitCheckSection config={config} whatsappUrl={whatsappUrl} />
        <DifferenceSection config={config} />
        <ResultsSection title={config.resultsTitle} results={resultCards} trackingQuery={trackingQuery} />
        <DoctorAuthoritySection />
        <GoogleInternationalJourneySection whatsappUrl={whatsappUrl} />
        <PlanFitSection whatsappUrl={whatsappUrl} />
        <RecoverySafetySection />
        <FaqSection />
        <AfterPhotosSection whatsappUrl={whatsappUrl} />
        <FinalCtaSection config={config} whatsappUrl={whatsappUrl} />
      </main>
      <CompactFooter />
      <StickyWhatsApp whatsappUrl={whatsappUrl} label={config.primaryCta} />
    </div>
  );
}

function FacebookAdsV2Page({
  config,
  whatsappUrl,
  resultCards,
  trackingQuery
}: {
  config: PageConfig;
  whatsappUrl: string;
  resultCards: ResultCardData[];
  trackingQuery: string;
}) {
  return (
    <div className="min-h-screen bg-[#F8F4EE] pb-24 text-[#1C1C1C] antialiased">
      <SimpleHeader whatsappUrl={whatsappUrl} />
      <main>
        <FacebookHeroV2 config={config} whatsappUrl={whatsappUrl} />
        <FacebookDoctorTrustBar />
        <FacebookVideoContinuation whatsappUrl={whatsappUrl} />
        <FacebookSelfAssessment config={config} whatsappUrl={whatsappUrl} />
        <FacebookNaturalDifference config={config} />
        <FacebookResultsStories title={config.resultsTitle} results={resultCards} trackingQuery={trackingQuery} />
        <FacebookDoctorAuthorityV2 whatsappUrl={whatsappUrl} />
        <FacebookInternationalJourneyV2 whatsappUrl={whatsappUrl} />
        <FacebookArrivalExperience whatsappUrl={whatsappUrl} />
        <FacebookPlanFitV2 whatsappUrl={whatsappUrl} />
        <FacebookAfterPhotosV2 whatsappUrl={whatsappUrl} />
        <FacebookPhotoAssessmentGuide whatsappUrl={whatsappUrl} />
        <FacebookFinalCtaV2 config={config} whatsappUrl={whatsappUrl} />
      </main>
      <CompactFooter />
      <StickyWhatsApp whatsappUrl={whatsappUrl} label="Start Private Assessment" />
    </div>
  );
}

function FacebookHeroV2({ config, whatsappUrl }: { config: PageConfig; whatsappUrl: string }) {
  return (
    <section className="relative isolate overflow-hidden border-b border-[#E5D8C4] bg-[#F8F4EE]">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(120deg,rgba(255,255,255,0.98),rgba(248,244,238,0.82)_55%,rgba(224,210,188,0.32))]" />
      <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[1fr_0.82fr] lg:items-center lg:px-8 lg:py-12">
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-[0.26em] text-[#B89A5A]">Facebook / Instagram assessment</p>
          <h1 className="mt-4 font-display text-[38px] font-semibold leading-[1.02] text-[#1C1C1C] sm:text-[60px] lg:text-[70px]">
            <span className="block">Natural</span>
            <span className="block">Rejuvenation.</span>
            <span className="block text-[#7C6337]">
              <span className="block sm:inline">Without Looking </span>
              <span className="block sm:inline">&quot;Done&quot;.</span>
            </span>
          </h1>
          <p className="mt-5 max-w-[560px] text-base leading-8 text-[#3F3831] sm:text-lg">
            Doctor-led 9D facial assessment for patients who want a refreshed lower-face and neck appearance while
            preserving natural expression.
          </p>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {["Doctor-led", "Anatomy-based", "Natural-looking", "International support"].map((item) => (
              <div key={item} className="rounded-md border border-[#D9C59F] bg-white/78 px-3 py-3 text-xs font-bold text-[#332A22]">
                {item}
              </div>
            ))}
          </div>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <TrackedWhatsAppLink
              href={whatsappUrl}
              placement="hero"
              label="Send Photos for Private Assessment"
              className="inline-flex h-12 w-full items-center justify-center gap-3 rounded-md bg-[#1C1C1C] px-5 text-sm font-bold text-white shadow-[0_18px_44px_rgba(28,28,28,0.22)] transition hover:-translate-y-0.5 hover:bg-[#2A2520] sm:w-auto"
            >
              <MessageCircle className="h-5 w-5 text-[#25D366]" aria-hidden="true" />
              <span className="sm:hidden">Start Private Assessment</span>
              <span className="hidden sm:inline">Send Photos for Private Assessment</span>
            </TrackedWhatsAppLink>
            <Link
              href="#real-results"
              className="inline-flex h-12 w-full items-center justify-center gap-3 rounded-md border border-[#B89A5A] bg-white/78 px-5 text-sm font-bold text-[#1C1C1C] transition hover:-translate-y-0.5 hover:bg-white sm:w-auto"
            >
              View Natural Results
              <ArrowRight className="h-4 w-4 text-[#B89A5A]" aria-hidden="true" />
            </Link>
          </div>
          <p className="mt-4 max-w-[640px] text-xs leading-6 text-[#6A5E52]">{assessmentInstruction}</p>
        </div>

        <div className="relative mx-auto aspect-[2/3] w-full max-w-[430px] overflow-hidden rounded-md border border-[#D9C59F] bg-[#4A4A4A] shadow-[0_30px_90px_rgba(48,35,19,0.16)] sm:max-w-[470px] lg:max-w-[430px]">
          <Image
            src={config.heroImage}
            alt={config.heroAlt}
            fill
            priority
            quality={92}
            sizes="(min-width: 1024px) 430px, 92vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#181818]/84 via-[#181818]/32 to-transparent px-4 pb-4 pt-24">
            <div className="rounded-md border border-white/18 bg-[#181818]/72 p-4 text-white shadow-[0_18px_46px_rgba(0,0,0,0.22)] backdrop-blur-md [&_p:last-child]:!text-white">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#D9B878]">Dr. Xiao Zhongye</p>
              <p className="mt-1 text-sm font-bold text-white">Founder of the 9D Lifting System™ in Shanghai</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FacebookDoctorTrustBar() {
  return (
    <section className="border-b border-[#E5D8C4] bg-[#FFFFFF]">
      <div className="mx-auto grid max-w-[1180px] grid-cols-2 gap-px px-4 py-5 sm:px-6 lg:grid-cols-4 lg:px-8">
        {facebookDoctorTrustItems.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="flex items-center gap-3 px-2 py-3">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#D6BD87] text-[#B89A5A]">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span>
                <span className="block font-display text-2xl font-semibold leading-none text-[#1C1C1C]">{item.value}</span>
                <span className="mt-1 block text-xs font-bold uppercase tracking-[0.08em] text-[#6A5E52]">{item.label}</span>
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function FacebookVideoContinuation({ whatsappUrl }: { whatsappUrl: string }) {
  return (
    <FacebookSection className="bg-[#F8F4EE]">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.76fr_1fr] lg:items-center">
        <div className="relative mx-auto aspect-[9/16] w-full max-w-[270px] rounded-[32px] border border-[#D9C59F] bg-[#151514] p-2 shadow-[0_24px_70px_rgba(24,18,12,0.18)] lg:mx-0">
          <div className="absolute left-1/2 top-3 z-10 h-1.5 w-16 -translate-x-1/2 rounded-full bg-white/18" />
          <video
            className="h-full w-full rounded-[24px] object-cover"
            muted
            playsInline
            loop
            controls
            preload="none"
            poster="/videos/dr-xiao-9d-methodology-poster.jpg"
            aria-label="9D Facelift video continuation"
          >
            <source src="/videos/dr-xiao-9d-methodology-vertical.mp4" type="video/mp4" />
          </video>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#B89A5A]">Seen our 9D Facelift video?</p>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-[#1C1C1C] sm:text-5xl">
            The next step is understanding what your face actually needs.
          </h2>
          <p className="mt-4 max-w-[640px] text-sm leading-7 text-[#4E463F]">
            Every face ages differently. A private photo assessment helps review structure, expression, and suitability
            before choosing a plan.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {["Facial structure", "Expression preservation", "Personalized planning"].map((item) => (
              <div key={item} className="rounded-md border border-[#E0D0B3] bg-white p-4 text-sm font-bold text-[#1C1C1C]">
                <CheckCircle2 className="mb-3 h-5 w-5 text-[#B89A5A]" aria-hidden="true" />
                {item}
              </div>
            ))}
          </div>
          <TrackedWhatsAppLink
            href={whatsappUrl}
            placement="middle"
            label="Video continuation WhatsApp"
            className="mt-6 inline-flex h-12 w-full items-center justify-center gap-3 rounded-md bg-[#1C1C1C] px-6 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#2A2520] sm:w-auto"
          >
            Send Photos on WhatsApp
            <MessageCircle className="h-4 w-4 text-[#25D366]" aria-hidden="true" />
          </TrackedWhatsAppLink>
        </div>
      </div>
    </FacebookSection>
  );
}

function FacebookSelfAssessment({ config, whatsappUrl }: { config: PageConfig; whatsappUrl: string }) {
  return (
    <FacebookSection className="bg-[#FFFFFF]">
      <CenteredHeading eyebrow="Quick self assessment" title={config.fitTitle} description={config.fitSubtitle} />
      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {config.fitItems.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="flex min-h-[120px] flex-col justify-between rounded-md border border-[#E5D8C4] bg-[#F8F4EE] p-4">
              <Icon className="h-6 w-6 text-[#B89A5A]" aria-hidden="true" />
              <p className="mt-5 text-sm font-bold leading-5 text-[#1C1C1C]">{item.title}</p>
            </div>
          );
        })}
      </div>
      <div className="mt-7 text-center">
        <TrackedWhatsAppLink
          href={whatsappUrl}
          placement="middle"
          label="Quick self assessment WhatsApp"
          className="inline-flex h-12 w-full items-center justify-center gap-3 rounded-md bg-[#25A85B] px-6 text-sm font-bold text-white shadow-[0_16px_36px_rgba(37,168,91,0.22)] transition hover:-translate-y-0.5 hover:bg-[#1C8F4B] sm:w-auto"
        >
          Start Private Assessment
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
        </TrackedWhatsAppLink>
      </div>
    </FacebookSection>
  );
}

function FacebookResultsStories({
  title,
  results,
  trackingQuery
}: {
  title: string;
  results: ResultCardData[];
  trackingQuery: string;
}) {
  return (
    <section id="real-results" className="border-b border-[#E5D8C4] bg-[#F8F4EE] px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#B89A5A]">Real patient stories</p>
            <h2 className="mt-3 font-display text-4xl font-semibold leading-tight text-[#1C1C1C] sm:text-6xl">{title}</h2>
          </div>
          <Link
            href={withTrackingQuery("/before-after", trackingQuery)}
            className="inline-flex h-12 items-center justify-center gap-3 rounded-md border border-[#B89A5A] bg-white px-6 text-sm font-bold text-[#1C1C1C] transition hover:-translate-y-0.5"
          >
            View More Results
            <ArrowRight className="h-4 w-4 text-[#B89A5A]" aria-hidden="true" />
          </Link>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-7">
          {results.map((item) => (
            <article
              key={`${item.age}-${item.country}-${item.procedure}`}
              className="overflow-hidden rounded-md border border-[#D8BE8B] bg-white shadow-[0_24px_72px_rgba(48,35,19,0.10)]"
            >
              <div className="relative aspect-[4/3] bg-[#FFFEFB]">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 1280px) 430px, (min-width: 1024px) 31vw, 92vw"
                  className="object-contain"
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FacebookDoctorAuthorityV2({ whatsappUrl }: { whatsappUrl: string }) {
  return (
    <FacebookSection className="bg-[#FFFFFF]">
      <div className="max-w-[760px]">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#B89A5A]">Doctor-led planning</p>
        <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-[#1C1C1C] sm:text-5xl">
          Why Patients Choose Dr. Xiao
        </h2>
        <p className="mt-4 max-w-[680px] text-sm leading-7 text-[#4E463F]">
          A natural-looking result begins with doctor-led facial assessment, not a one-size-fits-all procedure choice.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-7 lg:grid-cols-[0.86fr_1.14fr] lg:items-center">
        <div className="relative min-h-[420px] overflow-hidden rounded-md border border-[#E0D0B3] bg-[#EFE7DB] shadow-[0_24px_76px_rgba(48,35,19,0.10)] sm:min-h-[520px] lg:min-h-[580px]">
          <Image
            src="/images/dr-xiao-scrubs-portrait.jpg"
            alt="Dr. Xiao, founder of the 9D Lifting System"
            fill
            sizes="(min-width: 1024px) 440px, 92vw"
            className="object-cover object-[50%_16%]"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1C1C1C]/76 via-[#1C1C1C]/24 to-transparent px-5 pb-5 pt-28 text-white">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#D8BE8B]">Dr. Xiao Zhongye</p>
            <p className="mt-1 text-sm font-semibold">Founder of the 9D Lifting System in Shanghai</p>
          </div>
        </div>

        <div>
          <div className="grid gap-3 sm:grid-cols-2">
            {facebookDoctorAuthorityPoints.map((point) => {
              const Icon = point.icon;
              return (
                <article key={point.title} className="rounded-md border border-[#E5D8C4] bg-[#F8F4EE] p-5">
                  <Icon className="h-6 w-6 text-[#B89A5A]" aria-hidden="true" />
                  <h3 className="mt-4 text-base font-bold text-[#1C1C1C]">{point.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#5A5149]">{point.description}</p>
                </article>
              );
            })}
          </div>

          <blockquote className="mt-5 rounded-md border border-[#D8BE8B] bg-white p-5 font-display text-xl leading-8 text-[#1C1C1C] shadow-[0_18px_54px_rgba(48,35,19,0.06)]">
            &quot;The best aesthetic results do not make you look different. They make you look like yourself again.&quot;
          </blockquote>

          <TrackedWhatsAppLink
            href={whatsappUrl}
            placement="why_doctor"
            label="Doctor authority WhatsApp"
            className="mt-6 inline-flex h-12 w-full items-center justify-center gap-3 rounded-md bg-[#1C1C1C] px-6 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#2A2520] sm:w-auto"
          >
            Start Private Assessment
            <MessageCircle className="h-4 w-4 text-[#25D366]" aria-hidden="true" />
          </TrackedWhatsAppLink>
        </div>
      </div>
    </FacebookSection>
  );
}

function FacebookNaturalDifference({ config }: { config: PageConfig }) {
  return (
    <FacebookSection className="bg-[#FFFFFF]">
      <CenteredHeading eyebrow="Why 9D looks natural" title={config.differenceTitle} />
      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {config.differenceItems.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="rounded-md border border-[#E5D8C4] bg-[#F8F4EE] p-5">
              <Icon className="h-7 w-7 text-[#B89A5A]" aria-hidden="true" />
              <h3 className="mt-4 text-base font-bold text-[#1C1C1C]">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#5A5149]">{item.description}</p>
            </div>
          );
        })}
      </div>
    </FacebookSection>
  );
}

function FacebookPlanFitV2({ whatsappUrl }: { whatsappUrl: string }) {
  return (
    <FacebookSection className="bg-[#F8F4EE]">
      <CenteredHeading eyebrow="Plan fit" title="Which Plan May Fit You?" description="A photo assessment helps decide the right direction." />
      <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3">
        {planCards.map((plan) => (
          <article key={plan.title} className={`rounded-md border p-5 ${plan.featured ? "border-[#B89A5A] bg-[#1C1C1C] text-white" : "border-[#E0D0B3] bg-white text-[#1C1C1C]"}`}>
            <h3 className="text-lg font-bold">{plan.title}</h3>
            <p className={`mt-3 text-sm leading-6 ${plan.featured ? "text-white/72" : "text-[#5A5149]"}`}>{plan.description}</p>
            <ul className="mt-5 space-y-2">
              {plan.items.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm font-semibold">
                  <CheckCircle2 className={`h-4 w-4 ${plan.featured ? "text-[#D8BE8B]" : "text-[#B89A5A]"}`} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            {plan.featured ? (
              <TrackedWhatsAppLink href={whatsappUrl} placement="middle" label="Not sure plan WhatsApp" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#D8BE8B]">
                Send photos first
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </TrackedWhatsAppLink>
            ) : null}
          </article>
        ))}
      </div>
    </FacebookSection>
  );
}

function FacebookInternationalJourneyV2({ whatsappUrl }: { whatsappUrl: string }) {
  return (
    <FacebookSection className="bg-[#FFFFFF]">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_0.82fr] lg:items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#B89A5A]">International patient journey</p>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-[#1C1C1C] sm:text-5xl">
            From online assessment to Shanghai visit.
          </h2>
          <p className="mt-4 max-w-[640px] text-sm leading-7 text-[#4E463F]">
            Online assessment, travel planning, English-speaking assistance, and recovery support in Shanghai help
            make the next step more organized.
          </p>
          <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {facebookJourneySteps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="rounded-md border border-[#E5D8C4] bg-[#F8F4EE] p-4">
                  <Icon className="h-6 w-6 text-[#B89A5A]" aria-hidden="true" />
                  <h3 className="mt-3 text-sm font-bold text-[#1C1C1C]">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#5A5149]">{step.description}</p>
                </div>
              );
            })}
          </div>
          <TrackedWhatsAppLink
            href={whatsappUrl}
            placement="middle"
            label="International journey WhatsApp"
            className="mt-7 inline-flex h-12 w-full items-center justify-center gap-3 rounded-md bg-[#1C1C1C] px-6 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#2A2520] sm:w-auto"
          >
            Start Online Assessment
            <MessageCircle className="h-4 w-4 text-[#25D366]" aria-hidden="true" />
          </TrackedWhatsAppLink>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-[#E0D0B3] bg-white shadow-[0_22px_70px_rgba(50,36,18,0.10)]">
          <Image
            src="/images/international-patients-hero-consultation.webp"
            alt="International patient consultation with Dr. Xiao"
            fill
            sizes="(min-width: 1024px) 430px, 92vw"
            className="object-cover object-[64%_center]"
          />
        </div>
      </div>
    </FacebookSection>
  );
}

function FacebookArrivalExperience({ whatsappUrl }: { whatsappUrl: string }) {
  return (
    <FacebookSection id="international-arrival-experience" className="bg-[#F8F4EE]">
      <div className="lg:hidden">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#B89A5A]">Real international patient journey</p>
        <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-[#1C1C1C]">
          From Arrival in Shanghai to Doctor-Led Care
        </h2>
      </div>

      <div className="mt-7 grid grid-cols-1 gap-8 lg:mt-0 lg:grid-cols-[0.72fr_1fr] lg:items-center lg:gap-12">
        <div className="mx-auto w-full max-w-[310px] rounded-[34px] border border-[#D9C59F] bg-white p-2.5 shadow-[0_28px_84px_rgba(48,35,19,0.14)] lg:mx-0">
          <ArrivalSupportVideo
            src={facebookArrivalVideoSrc}
            poster={facebookArrivalVideoPoster}
            label="Real Patient Journey"
            caption="A real international patient arrival and consultation journey in Shanghai."
            ariaLabel="Real international patient arrival and consultation journey in Shanghai"
          />
        </div>

        <div>
          <div className="hidden lg:block">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#B89A5A]">
              Real international patient journey
            </p>
            <h2 className="mt-3 font-display text-4xl font-semibold leading-tight text-[#1C1C1C] lg:text-5xl">
              From Arrival in Shanghai to Doctor-Led Care
            </h2>
          </div>
          <p className="mt-4 max-w-[680px] text-sm leading-7 text-[#4E463F] sm:text-base sm:leading-8">
            For international patients, feeling supported matters. From the first online assessment to arrival
            coordination, clinic consultation, and recovery support, our team helps make the journey clearer, more
            organized, and more comfortable.
          </p>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {facebookArrivalSupportSteps.map((step) => (
              <article key={step.title} className="rounded-md border border-[#E0D0B3] bg-white p-5">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#B89A5A]">{step.number}</p>
                <h3 className="mt-3 text-base font-bold text-[#1C1C1C]">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#5A5149]">{step.description}</p>
              </article>
            ))}
          </div>

          <TrackedWhatsAppLink
            href={whatsappUrl}
            placement="arrival_video"
            label="Arrival video WhatsApp"
            className="mt-7 inline-flex h-12 w-full items-center justify-center gap-3 rounded-md bg-[#1C1C1C] px-6 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#2A2520] sm:w-auto"
          >
            Start Online Assessment
            <MessageCircle className="h-4 w-4 text-[#25D366]" aria-hidden="true" />
          </TrackedWhatsAppLink>
          <p className="mt-4 max-w-[660px] text-xs leading-6 text-[#6A5E52]">
            Travel support details may vary depending on schedule, location, treatment plan, and individual
            arrangements.
          </p>
        </div>
      </div>
    </FacebookSection>
  );
}

function FacebookAfterPhotosV2({ whatsappUrl }: { whatsappUrl: string }) {
  return (
    <FacebookSection className="bg-[#FFFFFF]">
      <CenteredHeading
        eyebrow="Private online assessment"
        title="What Happens After You Send Your Photos?"
        description="A clear next step helps you understand whether a 9D direction, deeper approach, or in-person consultation should be discussed."
      />
      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        {facebookAfterPhotosSteps.map((step) => (
          <article key={step.title} className="relative rounded-md border border-[#E0D0B3] bg-[#F8F4EE] p-5">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#1C1C1C] text-xs font-bold text-[#D8BE8B]">
              {step.number}
            </span>
            <h3 className="mt-5 text-base font-bold text-[#1C1C1C]">{step.title}</h3>
            <p className="mt-3 text-sm leading-6 text-[#5A5149]">{step.description}</p>
          </article>
        ))}
      </div>
      <div className="mx-auto mt-7 max-w-[760px] rounded-md border border-[#E0D0B3] bg-white p-5 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#B89A5A]">Medical note</p>
        <p className="mt-2 text-sm leading-7 text-[#4E463F]">
          Online assessment provides initial guidance only. Final treatment recommendations require in-person medical
          evaluation.
        </p>
        <TrackedWhatsAppLink
          href={whatsappUrl}
          placement="after_photos"
          label="After photos WhatsApp"
          className="mt-5 inline-flex h-12 w-full items-center justify-center gap-3 rounded-md bg-[#25A85B] px-6 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#1C8F4B] sm:w-auto"
        >
          Send Photos on WhatsApp
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
        </TrackedWhatsAppLink>
        <p className="mt-3 text-xs leading-5 text-[#6A5E52]">
          Your photos and information are reviewed privately for initial guidance.
        </p>
      </div>
    </FacebookSection>
  );
}

function FacebookPhotoAssessmentGuide({ whatsappUrl }: { whatsappUrl: string }) {
  return (
    <FacebookSection className="bg-[#F8F4EE]">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#B89A5A]">Photo assessment guide</p>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-[#1C1C1C] sm:text-5xl">
            What to send for a private review.
          </h2>
          <p className="mt-4 text-sm leading-7 text-[#4E463F]">
            Include front, side, 45-degree, smile, and neck photos, plus age, country, main concerns, and previous
            treatments.
          </p>
          <TrackedWhatsAppLink
            href={whatsappUrl}
            placement="middle"
            label="Photo guide WhatsApp"
            className="mt-6 inline-flex h-12 w-full items-center justify-center gap-3 rounded-md bg-[#25A85B] px-6 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#1C8F4B] sm:w-auto"
          >
            Send Photos on WhatsApp
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
          </TrackedWhatsAppLink>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          {facebookPhotoGuideItems.map((item) => (
            <div key={item.title} className="overflow-hidden rounded-md border border-[#E0D0B3] bg-white">
              <div className="relative aspect-[4/5]">
                <Image src={item.image} alt={`${item.title} assessment photo example`} fill sizes="160px" className="object-cover" />
              </div>
              <p className="px-3 py-3 text-center text-xs font-bold uppercase tracking-[0.1em] text-[#1C1C1C]">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </FacebookSection>
  );
}

function FacebookFinalCtaV2({ config, whatsappUrl }: { config: PageConfig; whatsappUrl: string }) {
  return (
    <section className="bg-[#1C1C1C] px-4 py-12 text-white sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-8 lg:grid-cols-[1fr_0.56fr] lg:items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#D8BE8B]">Private assessment</p>
          <h2 className="mt-3 font-display text-4xl font-semibold leading-tight sm:text-6xl">
            Discover Your Personalized 9D Plan.
          </h2>
          <p className="mt-4 max-w-[620px] text-sm leading-7 text-white/72">{config.finalDescription}</p>
          <p className="mt-3 max-w-[680px] text-xs leading-6 text-white/55">
            Online assessment provides initial guidance only. Final recommendations require in-person medical
            evaluation.
          </p>
          <TrackedWhatsAppLink
            href={whatsappUrl}
            placement="final"
            label="Start Private Assessment"
            className="mt-7 inline-flex h-12 w-full items-center justify-center gap-3 rounded-md bg-[#D8BE8B] px-6 text-sm font-bold text-[#1C1C1C] transition hover:-translate-y-0.5 hover:bg-[#E7C98F] sm:w-auto"
          >
            Start Private Assessment
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </TrackedWhatsAppLink>
        </div>
        <PhonePreview />
      </div>
    </section>
  );
}

function FacebookSection({
  id,
  className,
  children
}: {
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`border-b border-[#E5D8C4] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 ${className || ""}`}>
      <div className="mx-auto max-w-[1180px]">{children}</div>
    </section>
  );
}

function SimpleHeader({ whatsappUrl }: { whatsappUrl: string }) {
  return (
    <header className="border-b border-[#E8DCCB] bg-[#FBF8F1]/95">
      <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="group inline-flex min-w-0 flex-col leading-none" aria-label="Dr. Xiao home">
          <span className="font-display text-2xl tracking-[0.13em] text-[#171717]">DR. XIAO</span>
          <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8C6B35]">
            9D Lifting System
          </span>
        </Link>
        <TrackedWhatsAppLink
          href={whatsappUrl}
          placement="hero"
          label="Header WhatsApp Assessment"
          className="hidden h-11 shrink-0 items-center justify-center gap-2 rounded-md border border-[#C7A56D] bg-white px-4 text-xs font-bold text-[#171717] shadow-[0_12px_32px_rgba(37,25,8,0.08)] transition hover:-translate-y-0.5 hover:border-[#25D366] hover:text-[#128C45] sm:inline-flex"
        >
          <span className="hidden sm:inline">WhatsApp Assessment</span>
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
        </TrackedWhatsAppLink>
      </div>
    </header>
  );
}

function HeroSection({ config, whatsappUrl }: { config: PageConfig; whatsappUrl: string }) {
  const isPortrait = config.heroImageMode === "portrait";

  return (
    <section className="relative isolate overflow-hidden border-b border-[#E8DCCB] bg-[#FBF8F1]">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(115deg,rgba(255,255,255,0.96),rgba(251,248,241,0.72)_52%,rgba(235,224,207,0.38))]" />
      <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-8 px-4 py-8 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-12">
        <div className="w-full min-w-0 max-w-[620px]">
          <p className="text-xs font-bold uppercase tracking-[0.26em] text-[#A47735]">{config.eyebrow}</p>
          <h1 className="mt-4 max-w-full break-words font-display text-[36px] font-semibold leading-[1.05] text-[#181818] sm:text-[58px] sm:leading-[1.03] lg:text-[68px]">
            {config.titleLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
          <p className="mt-5 max-w-[560px] break-words text-base leading-8 text-[#332F2B]/78 sm:text-lg">
            {config.intro}
          </p>
          <p className="mt-4 max-w-[560px] break-words text-sm font-semibold leading-7 text-[#584A3C]">
            {config.doctorLine}
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <TrackedWhatsAppLink
              href={whatsappUrl}
              placement="hero"
              label={config.primaryCta}
              className="inline-flex h-12 w-full items-center justify-center gap-3 rounded-md bg-[#1FA855] px-5 text-sm font-bold text-white shadow-[0_16px_36px_rgba(31,168,85,0.22)] transition hover:-translate-y-0.5 hover:bg-[#168845] sm:w-auto"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              {config.primaryCta}
            </TrackedWhatsAppLink>
            <Link
              href="#real-results"
              className="inline-flex h-12 w-full items-center justify-center gap-3 rounded-md border border-[#C7A56D] bg-white/75 px-5 text-sm font-bold text-[#171717] transition hover:-translate-y-0.5 hover:bg-white sm:w-auto"
            >
              {config.secondaryCta}
              <ArrowRight className="h-4 w-4 text-[#A47735]" aria-hidden="true" />
            </Link>
          </div>
          <p className="mt-4 max-w-[640px] break-words text-xs leading-6 text-[#6C6258]">{assessmentInstruction}</p>
        </div>

        <div
          className={`relative w-full min-w-0 overflow-hidden rounded-md border border-[#E5D8C4] bg-white shadow-[0_30px_90px_rgba(50,36,18,0.13)] ${
            isPortrait ? "mx-auto aspect-[4/5] w-full max-w-[500px]" : "aspect-[16/10] w-full"
          }`}
        >
          <Image
            src={config.heroImage}
            alt={config.heroAlt}
            fill
            priority
            quality={94}
            sizes={isPortrait ? "(min-width: 1024px) 500px, 90vw" : "(min-width: 1024px) 560px, 90vw"}
            className={`object-cover ${isPortrait ? "object-[52%_18%]" : "object-[60%_center]"}`}
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#FBF8F1] via-[#FBF8F1]/42 to-transparent" />
        </div>
      </div>
    </section>
  );
}

function TrustStrip({ items }: { items: PageConfig["trustItems"] }) {
  return (
    <section className="border-b border-[#E8DCCB] bg-white/70">
      <div className="mx-auto grid max-w-[1180px] grid-cols-2 gap-px px-4 py-5 sm:px-6 lg:grid-cols-4 lg:px-8">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div key={`${item.title}-${item.description}`} className="flex min-w-0 items-center gap-3 px-2 py-3">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#D8BE8B] text-[#A47735]">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block break-words text-sm font-bold text-[#171717]">{item.title}</span>
                <span className="block break-words text-xs font-semibold text-[#645A51]">{item.description}</span>
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function WhatIs9DSection({ whatsappUrl }: { whatsappUrl: string }) {
  return (
    <SectionShell className="bg-[#FFFEFB]">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.94fr_1.06fr] lg:items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#A47735]">What is 9D Facelift?</p>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-[#171717] sm:text-4xl">
            A Personalized Facial Rejuvenation Planning System
          </h2>
          <div className="mt-5 space-y-4 text-sm leading-7 text-[#4E463F]">
            <p>
              9D Facelift is Dr. Xiao&apos;s doctor-led facial rejuvenation system. The plan is designed around facial
              anatomy, aging pattern, tissue descent, skin laxity, previous treatments, recovery expectations, and the
              patient&apos;s natural expression.
            </p>
            <p>
              It is not a temporary thread lift and not one standardized operation for every patient.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {whatIs9dTags.map((tag) => (
              <span key={tag} className="rounded-full border border-[#D8BE8B] bg-[#FBF8F1] px-4 py-2 text-xs font-bold text-[#3B332B]">
                {tag}
              </span>
            ))}
          </div>
          <TrackedWhatsAppLink
            href={whatsappUrl}
            placement="what_is_9d"
            label="What is 9D WhatsApp assessment"
            className="mt-7 inline-flex h-11 items-center justify-center gap-3 rounded-md border border-[#C7A56D] bg-white px-5 text-sm font-bold text-[#171717] transition hover:-translate-y-0.5 hover:bg-[#FBF8F1]"
          >
            Ask If 9D Fits You
            <MessageCircle className="h-4 w-4 text-[#25D366]" aria-hidden="true" />
          </TrackedWhatsAppLink>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-[22px] border border-[#E5D8C4] bg-[#F2EADD] shadow-[0_20px_60px_rgba(50,36,18,0.08)]">
          <Image
            src="/images/international-before-flights-assessment.webp"
            alt="Doctor-led facial assessment planning before traveling to Shanghai"
            fill
            sizes="(min-width: 1024px) 560px, 92vw"
            className="object-cover"
          />
        </div>
      </div>
    </SectionShell>
  );
}

function GoogleMethodVideoSection({ whatsappUrl }: { whatsappUrl: string }) {
  return (
    <SectionShell className="bg-[#FBF8F1]">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.72fr_1fr] lg:items-center">
        <div className="relative mx-auto aspect-[9/16] w-full max-w-[300px] rounded-[34px] border border-[#D9C59F] bg-[#151514] p-2 shadow-[0_24px_70px_rgba(24,18,12,0.16)] lg:mx-0">
          <div className="absolute left-1/2 top-3 z-10 h-1.5 w-16 -translate-x-1/2 rounded-full bg-white/18" />
          <video
            className="h-full w-full rounded-[24px] object-cover"
            muted
            playsInline
            controls
            preload="none"
            poster="/videos/dr-xiao-9d-methodology-poster.jpg"
            aria-label="Doctor explanation video about the 9D Facelift method"
          >
            <source src="/videos/dr-xiao-9d-methodology-vertical.mp4" type="video/mp4" />
          </video>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#A47735]">9D method video</p>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-[#171717] sm:text-4xl">
            Dr. Xiao explains the 9D planning approach.
          </h2>
          <p className="mt-4 max-w-[650px] text-sm leading-7 text-[#4E463F]">
            Watch the doctor-led explanation before sending photos. The assessment focuses on facial structure, aging
            pattern, natural expression, and whether 9D Facelift or a deeper approach may be more suitable.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {["Doctor-led planning", "Facial structure review", "Natural expression focus"].map((item) => (
              <div key={item} className="rounded-[18px] border border-[#E2D2B8] bg-white/76 p-4 text-sm font-bold text-[#24211E]">
                <CheckCircle2 className="mb-3 h-5 w-5 text-[#A47735]" aria-hidden="true" />
                {item}
              </div>
            ))}
          </div>
          <TrackedWhatsAppLink
            href={whatsappUrl}
            placement="what_is_9d_video"
            label="9D method video WhatsApp assessment"
            className="mt-6 inline-flex h-12 items-center justify-center gap-3 rounded-md bg-[#171717] px-6 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#2B2723]"
          >
            Start Photo Assessment
            <MessageCircle className="h-4 w-4 text-[#25D366]" aria-hidden="true" />
          </TrackedWhatsAppLink>
        </div>
      </div>
    </SectionShell>
  );
}

function FitCheckSection({ config, whatsappUrl }: { config: PageConfig; whatsappUrl: string }) {
  return (
    <SectionShell className="bg-[#FFFEFB]">
      <CenteredHeading eyebrow="Suitability check" title={config.fitTitle} description={config.fitSubtitle} />
      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
        {config.fitItems.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="flex min-h-[118px] flex-col items-center justify-center rounded-[18px] border border-[#E5D8C4] bg-[#FBF8F1] p-4 text-center shadow-[0_16px_45px_rgba(48,35,19,0.05)]"
            >
              <Icon className="h-6 w-6 text-[#A47735]" aria-hidden="true" />
              <p className="mt-3 text-xs font-bold leading-5 text-[#171717]">{item.title}</p>
            </div>
          );
        })}
      </div>
      <div className="mt-7 text-center">
        <TrackedWhatsAppLink
          href={whatsappUrl}
          placement="suitability"
          label="Fit check WhatsApp"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#171717] px-5 text-xs font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#2B2723]"
        >
          Check If 9D Fits You
          <MessageCircle className="h-4 w-4 text-[#25D366]" aria-hidden="true" />
        </TrackedWhatsAppLink>
      </div>
    </SectionShell>
  );
}

function DifferenceSection({ config }: { config: PageConfig }) {
  return (
    <SectionShell className="bg-[#FBF8F1]">
      <CenteredHeading eyebrow="9D difference" title={config.differenceTitle} />
      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        {config.differenceItems.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="rounded-[20px] border border-[#E5D8C4] bg-white/78 p-6">
              <Icon className="h-7 w-7 text-[#A47735]" aria-hidden="true" />
              <h3 className="mt-4 text-base font-bold text-[#171717]">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#5A5149]">{item.description}</p>
            </div>
          );
        })}
      </div>
    </SectionShell>
  );
}

function ResultsSection({
  title,
  results,
  trackingQuery
}: {
  title: string;
  results: ResultCardData[];
  trackingQuery: string;
}) {
  return (
    <SectionShell id="real-results" className="bg-[#FFFEFB]">
      <CenteredHeading eyebrow="Real results" title={title} />
      <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-3">
        {results.map((item) => (
          <article
            key={`${item.age}-${item.country}-${item.procedure}`}
            className="overflow-hidden rounded-[22px] border border-[#D8BE8B] bg-[#171717] shadow-[0_22px_70px_rgba(48,35,19,0.11)]"
          >
            <div className="relative aspect-[4/3]">
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="(min-width: 1280px) 380px, (min-width: 1024px) 31vw, 92vw"
                className="object-cover"
              />
            </div>
          </article>
        ))}
      </div>
      <p className="mt-5 text-center text-xs font-semibold text-[#6C6258]">Individual results vary.</p>
      <div className="mt-7 text-center">
        <Link
          href={withTrackingQuery("/before-after", trackingQuery)}
          className="inline-flex h-11 items-center justify-center gap-3 rounded-md border border-[#C7A56D] bg-white px-7 text-sm font-bold text-[#A47735] transition hover:-translate-y-0.5 hover:bg-[#FBF8F1]"
        >
          View More Results
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </SectionShell>
  );
}

function DoctorAuthoritySection() {
  const points = [
    "Founder of the 9D Lifting System",
    "Doctor-led facial assessment and planning",
    "Personalized planning based on anatomy",
    "Experience supporting international patients in Shanghai"
  ];

  return (
    <SectionShell className="bg-[#FBF8F1]">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:items-center">
        <div className="relative order-2 aspect-[4/3] overflow-hidden rounded-[22px] border border-[#E5D8C4] bg-white shadow-[0_22px_70px_rgba(50,36,18,0.10)] lg:order-1">
          <Image
            src="/images/doctor-hero-door-consultation.png"
            alt="Dr. Xiao welcoming a patient for consultation"
            fill
            sizes="(min-width: 1024px) 430px, 92vw"
            className="object-cover object-[62%_center]"
          />
        </div>
        <div className="order-1 lg:order-2">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#A47735]">Doctor-led planning</p>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-[#171717] sm:text-4xl">
            Why Patients Choose Dr. Xiao
          </h2>
          <p className="mt-4 max-w-[650px] text-sm leading-7 text-[#4E463F]">
            A serious facelift decision should start with facial anatomy, aging pattern, and realistic planning before
            procedure choice.
          </p>
          <ul className="mt-6 space-y-3">
            {points.map((point) => (
              <li key={point} className="flex items-start gap-3 text-sm font-semibold leading-6 text-[#332F2B]">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#A47735]" aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>
          <blockquote className="mt-7 rounded-[20px] border border-[#E1CFAD] bg-white/82 p-5 font-display text-xl leading-8 text-[#2C2824]">
            &quot;The best aesthetic results do not make you look different. They make you look like yourself again.&quot;
          </blockquote>
        </div>
      </div>
    </SectionShell>
  );
}

function GoogleInternationalJourneySection({ whatsappUrl }: { whatsappUrl: string }) {
  return (
    <SectionShell className="bg-[#FFFEFB]">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_0.72fr] lg:items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#A47735]">International patient journey</p>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-[#171717] sm:text-4xl">
            From Online Assessment to Arrival in Shanghai
          </h2>
          <p className="mt-4 max-w-[690px] text-sm leading-7 text-[#4E463F]">
            For international patients, the first step is clarity before travel: photos, preliminary direction,
            consultation timing, and preparation for an in-person medical evaluation.
          </p>

          <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2">
            {googleInternationalJourneySteps.map((step) => (
              <div key={step.title} className="rounded-[18px] border border-[#E5D8C4] bg-[#FBF8F1] p-5">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#A47735]">{step.number}</p>
                <h3 className="mt-3 text-base font-bold text-[#171717]">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#5A5149]">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-7 lg:hidden">
            <GoogleArrivalVideoCard />
          </div>

          <div className="mt-7 flex flex-wrap gap-2">
            {googleInternationalSupportPoints.map((point) => (
              <span key={point} className="rounded-full border border-[#D8BE8B] bg-white px-4 py-2 text-xs font-bold text-[#3B332B]">
                {point}
              </span>
            ))}
          </div>

          <p className="mt-5 max-w-[680px] text-xs leading-6 text-[#6C6258]">
            Travel support details may vary depending on schedule, location, treatment plan, and individual arrangements.
          </p>

          <TrackedWhatsAppLink
            href={whatsappUrl}
            placement="international_video"
            label="International journey WhatsApp assessment"
            className="mt-7 inline-flex h-12 items-center justify-center gap-3 rounded-md bg-[#171717] px-6 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#2B2723]"
          >
            Start Online Assessment
            <MessageCircle className="h-4 w-4 text-[#25D366]" aria-hidden="true" />
          </TrackedWhatsAppLink>
        </div>

        <div className="hidden lg:block">
          <GoogleArrivalVideoCard />
        </div>
      </div>
    </SectionShell>
  );
}

function GoogleArrivalVideoCard() {
  return (
    <div className="mx-auto w-full max-w-[310px] rounded-[34px] border border-[#D9C59F] bg-[#171717] p-2 shadow-[0_24px_70px_rgba(24,18,12,0.16)]">
      <ArrivalSupportVideo
        src={facebookArrivalVideoSrc}
        poster={facebookArrivalVideoPoster}
        label="Real International Patient Journey"
        caption="A real international patient arrival and consultation journey in Shanghai."
        ariaLabel="Real international patient arrival and consultation journey in Shanghai"
      />
    </div>
  );
}

function InternationalSection({ whatsappUrl }: { whatsappUrl: string }) {
  return (
    <SectionShell className="bg-[#FFFEFB]">
      <div className="grid grid-cols-1 gap-7 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#A47735]">International patients</p>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-[#171717] sm:text-4xl">
            Your journey can begin online.
          </h2>
          <p className="mt-4 max-w-[620px] text-sm leading-7 text-[#4E463F]">
            Our team guides you through online assessment, travel planning, consultation timing, and recovery support
            in Shanghai.
          </p>
          <div className="mt-6">
            <StepGrid compact />
          </div>
          <TrackedWhatsAppLink
            href={whatsappUrl}
            placement="mid_page"
            label="International WhatsApp Assessment"
            className="mt-7 inline-flex h-12 items-center justify-center gap-3 rounded-md bg-[#171717] px-6 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#2B2723]"
          >
            Start Online Assessment
            <MessageCircle className="h-4 w-4 text-[#25D366]" aria-hidden="true" />
          </TrackedWhatsAppLink>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-[#E5D8C4] bg-white shadow-[0_22px_70px_rgba(50,36,18,0.10)]">
          <Image
            src="/images/international-patients-hero-consultation.webp"
            alt="International patient consultation with Dr. Xiao"
            fill
            sizes="(min-width: 1024px) 430px, 92vw"
            className="object-cover object-[64%_center]"
          />
        </div>
      </div>
    </SectionShell>
  );
}

function PlanFitSection({ whatsappUrl }: { whatsappUrl: string }) {
  return (
    <SectionShell className="bg-[#FBF8F1]">
      <CenteredHeading eyebrow="Plan fit" title="Which Approach May Fit Your Face?" />
      <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3">
        {planCards.map((plan) => (
          <article
            key={plan.title}
            className={`overflow-hidden rounded-[20px] border p-5 ${
              plan.featured
                ? "border-[#C7A56D] bg-[#171717] text-white"
                : "border-[#E5D8C4] bg-white/82 text-[#171717]"
            }`}
          >
            <div className="relative mb-5 aspect-[4/3] overflow-hidden rounded-md bg-[#EEE6D9]">
              <Image src={plan.image} alt={plan.title} fill sizes="(min-width: 1024px) 330px, 92vw" className="object-cover" />
            </div>
            <h3 className="text-lg font-bold">{plan.title}</h3>
            <p className={`mt-2 text-sm leading-6 ${plan.featured ? "text-white/76" : "text-[#5A5149]"}`}>
              {plan.description}
            </p>
            <ul className="mt-4 space-y-2">
              {plan.items.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm font-semibold">
                  <CheckCircle2 className={`h-4 w-4 ${plan.featured ? "text-[#D8BE8B]" : "text-[#A47735]"}`} />
                  {item}
                </li>
              ))}
            </ul>
            {plan.featured ? (
              <TrackedWhatsAppLink
                href={whatsappUrl}
                placement="plan_fit"
                label="Plan fit WhatsApp"
                className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#D8BE8B]"
              >
                Find out which plan fits you
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </TrackedWhatsAppLink>
            ) : null}
          </article>
        ))}
      </div>
      <p className="mx-auto mt-7 max-w-[880px] text-center text-xs font-semibold leading-6 text-[#6C6258]">
        The final recommendation depends on facial anatomy, aging pattern, previous treatments, medical history,
        recovery expectations, and in-person evaluation.
      </p>
    </SectionShell>
  );
}

function RecoverySafetySection() {
  return (
    <SectionShell className="bg-[#FFFEFB]">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.98fr_1.02fr] lg:items-start">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#A47735]">Medical transparency</p>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-[#171717] sm:text-4xl">
            Recovery, Scars &amp; Safety
          </h2>
          <div className="mt-7 border-l border-[#D8BE8B]">
            {recoveryTimeline.map((item) => (
              <div key={item.period} className="relative pl-6 pb-7 last:pb-0">
                <span className="absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full bg-[#B98939]" />
                <p className="text-sm font-bold text-[#171717]">{item.period}</p>
                <p className="mt-2 text-sm leading-6 text-[#5A5149]">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="grid grid-cols-1 gap-4">
            {recoverySafetyCards.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="rounded-[20px] border border-[#E5D8C4] bg-[#FBF8F1] p-5">
                  <Icon className="h-6 w-6 text-[#A47735]" aria-hidden="true" />
                  <h3 className="mt-4 text-base font-bold text-[#171717]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#5A5149]">{item.description}</p>
                </article>
              );
            })}
          </div>
          <p className="mt-5 rounded-[18px] border border-[#E5D8C4] bg-white p-4 text-xs font-semibold leading-6 text-[#6C6258]">
            The information above is general guidance only. Individual recovery, risks, incision planning, and suitability
            must be discussed during medical evaluation.
          </p>
        </div>
      </div>
    </SectionShell>
  );
}

function FaqSection() {
  return (
    <SectionShell className="bg-[#FFFEFB]">
      <CenteredHeading eyebrow="FAQ" title="Frequently Asked Questions" />
      <div className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-2">
        {faqs.map((faq) => (
          <details key={faq.question} className="group rounded-md border border-[#E5D8C4] bg-white p-4">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-bold text-[#171717]">
              {faq.question}
              <span className="text-lg leading-none text-[#A47735] group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 text-sm leading-6 text-[#5A5149]">{faq.answer}</p>
          </details>
        ))}
      </div>
    </SectionShell>
  );
}

function AfterPhotosSection({ whatsappUrl }: { whatsappUrl: string }) {
  return (
    <SectionShell className="bg-[#FBF8F1]">
      <CenteredHeading
        eyebrow="After photos"
        title="What Happens After You Send Your Photos?"
        description="Your photos are reviewed privately for initial guidance before any in-person treatment decision."
      />
      <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3">
        {googleAfterPhotosSteps.map((step) => (
          <article key={step.title} className="rounded-[20px] border border-[#E5D8C4] bg-white/82 p-5">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#A47735]">{step.number}</p>
            <h3 className="mt-3 text-base font-bold text-[#171717]">{step.title}</h3>
            <p className="mt-2 text-sm leading-6 text-[#5A5149]">{step.description}</p>
          </article>
        ))}
      </div>
      <div className="mt-7 flex flex-col items-center gap-4 text-center">
        <TrackedWhatsAppLink
          href={whatsappUrl}
          placement="after_photos"
          label="After photos WhatsApp assessment"
          className="inline-flex h-12 items-center justify-center gap-3 rounded-md bg-[#171717] px-6 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#2B2723]"
        >
          Send Photos on WhatsApp
          <MessageCircle className="h-4 w-4 text-[#25D366]" aria-hidden="true" />
        </TrackedWhatsAppLink>
        <p className="max-w-[760px] text-xs leading-6 text-[#6C6258]">
          Your photos and information are reviewed privately for initial guidance only. Final treatment recommendations
          require in-person medical evaluation.
        </p>
      </div>
    </SectionShell>
  );
}

function FinalCtaSection({ config, whatsappUrl }: { config: PageConfig; whatsappUrl: string }) {
  return (
    <section className="bg-[#26221F] px-4 py-14 text-white sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-8 lg:grid-cols-[1fr_0.72fr] lg:items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#D8BE8B]">Private online assessment</p>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-white sm:text-5xl">
            {config.finalTitle}
          </h2>
          <p className="mt-4 max-w-[660px] text-sm leading-7 text-white/76">{config.finalDescription}</p>
          <p className="mt-3 max-w-[680px] text-xs leading-6 text-white/62">{assessmentInstruction}</p>
          <p className="mt-3 max-w-[680px] text-xs font-semibold leading-6 text-white/68">
            Your information and photos are reviewed privately for initial guidance. Online assessment does not replace
            in-person medical evaluation.
          </p>
          <TrackedWhatsAppLink
            href={whatsappUrl}
            placement="final"
            label={config.finalButton}
            className="mt-6 inline-flex h-12 items-center justify-center gap-3 rounded-md bg-[#2E8B57] px-6 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#257247]"
          >
            {config.finalButton}
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
          </TrackedWhatsAppLink>
        </div>
        <PhonePreview />
      </div>
    </section>
  );
}

function PhonePreview() {
  return (
    <div className="mx-auto w-full max-w-[260px] rounded-[34px] border border-[#D7C195] bg-[#171717] p-2 shadow-[0_24px_60px_rgba(24,18,12,0.22)]">
      <div className="overflow-hidden rounded-[26px] bg-[#F7F2E9]">
        <div className="flex items-center justify-between border-b border-[#E1D5C5] bg-white px-4 py-3">
          <span className="text-xs font-bold text-[#171717]">WhatsApp</span>
          <MessageCircle className="h-4 w-4 text-[#25D366]" aria-hidden="true" />
        </div>
        <div className="space-y-3 p-4">
          <div className="ml-auto max-w-[188px] rounded-md bg-[#DCF8C6] p-3 text-xs leading-5 text-[#1F2A20]">
            Hello, I would like a private 9D assessment.
          </div>
          <div className="grid grid-cols-3 gap-2">
            {["/images/international-photo-guide-01.webp", "/images/international-photo-guide-03.webp", "/images/international-photo-guide-05.webp"].map((src) => (
              <div key={src} className="relative aspect-square overflow-hidden rounded bg-white">
                <Image src={src} alt="Assessment photo example" fill sizes="72px" className="object-cover" />
              </div>
            ))}
          </div>
          <div className="max-w-[188px] rounded-md bg-white p-3 text-xs leading-5 text-[#4E463F]">
            Thank you. Please include age, country, main concerns, and previous treatments.
          </div>
        </div>
      </div>
    </div>
  );
}

function StickyWhatsApp({ whatsappUrl, label }: { whatsappUrl: string; label: string }) {
  return (
    <div className="fixed inset-x-3 bottom-3 z-50 sm:inset-x-auto sm:right-5 sm:w-[300px]">
      <TrackedWhatsAppLink
        href={whatsappUrl}
        placement="sticky"
        label="Sticky WhatsApp Assessment"
        className="flex h-[52px] items-center justify-center gap-3 rounded-md border border-[#2EC266] bg-[#1FA855] px-4 text-sm font-bold text-white shadow-[0_18px_48px_rgba(31,168,85,0.32)] transition hover:-translate-y-0.5 hover:bg-[#168845]"
      >
        <MessageCircle className="h-5 w-5" aria-hidden="true" />
        {label}
      </TrackedWhatsAppLink>
    </div>
  );
}

function CompactFooter() {
  return (
    <footer className="border-t border-[#302B25] bg-[#151514] px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-2xl tracking-[0.13em]">DR. XIAO</p>
          <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#D8BE8B]">9D Lifting System</p>
        </div>
        <div className="grid gap-3 text-xs font-bold uppercase tracking-[0.12em] text-white/74 sm:grid-cols-3">
          <span>Only one 9D</span>
          <span>Natural, not overfilled</span>
          <span>Designed for you</span>
        </div>
      </div>
    </footer>
  );
}

function StepGrid({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`grid grid-cols-1 gap-4 ${compact ? "lg:grid-cols-3" : "mt-8 md:grid-cols-3"}`}>
      {processSteps.map((step) => {
        const Icon = step.icon;
        return (
          <div key={step.title} className="rounded-md border border-[#E5D8C4] bg-white/82 p-5">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#B98939] text-sm font-bold text-white">
                {step.number}
              </span>
              <Icon className="h-6 w-6 text-[#A47735]" aria-hidden="true" />
            </div>
            <h3 className="mt-4 text-base font-bold text-[#171717]">{step.title}</h3>
            <p className="mt-2 text-sm leading-6 text-[#5A5149]">{step.description}</p>
          </div>
        );
      })}
    </div>
  );
}

function SectionShell({
  id,
  className,
  children
}: {
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`border-b border-[#E8DCCB] px-4 py-14 sm:px-6 lg:px-8 lg:py-24 ${className || ""}`}>
      <div className="mx-auto max-w-[1180px]">{children}</div>
    </section>
  );
}

function CenteredHeading({
  eyebrow,
  title,
  description
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mx-auto max-w-[760px] text-center">
      <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#A47735]">{eyebrow}</p>
      <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-[#171717] sm:text-4xl">{title}</h2>
      {description ? <p className="mt-3 text-sm leading-7 text-[#5A5149]">{description}</p> : null}
    </div>
  );
}

function buildResultCards(
  configuredResults: PageConfig["results"],
  galleryItems: GalleryItem[]
): ResultCardData[] {
  const galleryImages = galleryItems.map((item) => item.image).filter(Boolean);

  return configuredResults.map((result, index) => ({
    ...result,
    image: galleryImages[index + 1] || result.imageFallback
  }));
}

function withTrackingQuery(href: string, trackingQuery: string) {
  if (!trackingQuery || href.startsWith("#") || href.startsWith("http")) return href;

  const [path, hash] = href.split("#");
  const separator = path.includes("?") ? "&" : "?";
  return `${path}${separator}${trackingQuery.replace(/^\?/, "")}${hash ? `#${hash}` : ""}`;
}
