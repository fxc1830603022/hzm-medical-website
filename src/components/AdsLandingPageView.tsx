"use client";

import {
  ArrowRight,
  BadgeCheck,
  Camera,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  Globe2,
  Layers3,
  MapPin,
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
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { defaultSettings, getWhatsAppUrl } from "@/lib/site-data";
import type { GalleryItem, SiteSettings } from "@/lib/site-types";
import { trackAdsLandingEvent } from "@/lib/tracking";
import { ArrivalSupportVideo } from "./ArrivalSupportVideo";
import { BackToTop } from "./BackToTop";
import {
  FacebookWeChatModal,
  type FacebookWeChatDetails,
  WeChatBrandIcon
} from "./FacebookWeChatContact";
import { FacebookAssessmentSection } from "./FacebookAssessmentSection";
import { Footer } from "./Footer";
import { HospitalTrustVideo } from "./HospitalTrustVideo";
import { TrackedWhatsAppLink } from "./TrackedWhatsAppLink";

type AdsLandingVariant = "google" | "facebook";
type IconType = typeof MessageCircle;

type AdsLandingPageViewProps = {
  variant: AdsLandingVariant;
  settings: SiteSettings;
  galleryItems: GalleryItem[];
};

type ResultCardData = {
  id?: string;
  image: string;
  alt: string;
  title?: string;
  age: string;
  country: string;
  concern: string;
  procedure: string;
  result: string;
  beforeLabel?: string;
  afterLabel?: string;
  postOpTime?: string;
  featured?: boolean;
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

const facebookMethodVideoSrc = "/videos/dr-xiao-9d-methodology-mobile-v2.mp4";
const facebookArrivalVideoSrc = "/videos/facebook-arrival-support-mobile-v2.mp4";
const facebookArrivalVideoPoster = "/videos/facebook-arrival-support-v21-poster.jpg";
const facebookHospitalVideoMp4 = "/videos/shengya-hospital-trust.mp4";
const facebookHospitalVideoWebm = "/videos/shengya-hospital-trust.webm";
const facebookHospitalVideoPoster = "/images/shengya-hospital-trust-poster.webp";
const facebookAdsWhatsAppNumber = "+13043567880";
const googleAdsWhatsAppNumber = "+601121706171";
const facebookResultImageOverrides = [
  "/images/facebook-ads-result-case-01-20260724.jpg",
  "/images/facebook-ads-result-case-02-20260724.jpg",
  "/images/facebook-ads-result-case-03-day30-20260720.jpg"
];

const googleWhatsAppMessage =
  "Hello, I found Dr. Xiao 9D Facelift through Google Ads and would like to send my photos for a private online assessment.\n\nMy age:\nMy country:\nMy main concerns:\nPrevious treatments:";

const facebookWhatsAppMessage =
  "Hello, I’m interested in Dr. Xiao’s 9D Facelift. Could you please share more details about the treatment and online assessment process?";

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

const facebookFaqs = [
  {
    question: "Is the 9D Facelift the same as a thread lift?",
    answer:
      "No. A thread lift relies mainly on threads placed within a limited tissue plane. The 9D Facelift is Dr. Xiao's personalized surgical planning approach across multiple facial regions, treatment points, and tissue layers. Depending on your anatomy and aging pattern, the plan may include deeper structural lifting and SMAS-level support."
  },
  {
    question: "Who may be suitable for a 9D Facelift?",
    answer:
      "It may be considered for patients concerned about midface descent, deepened folds, lower-face heaviness, jowls, loss of jawline definition, or neck laxity. Suitability depends on anatomy, skin quality, medical history, previous treatments, and an in-person medical evaluation rather than age alone."
  },
  {
    question: "Will I look pulled, overfilled, or different?",
    answer:
      "The design goal is to restore support while preserving the features, movement, and expressions that make you recognizable. Every plan is individualized; no specific appearance or outcome can be guaranteed."
  },
  {
    question: "Can I receive an assessment before traveling to Shanghai?",
    answer:
      "Yes. You can send the requested photos, your age, country, main concerns, and previous treatments through WhatsApp for a private preliminary review. Final recommendations require an in-person medical consultation."
  },
  {
    question: "What should I expect during recovery?",
    answer:
      "Recovery varies with the treatment plan and the individual. Swelling, bruising, tightness, temporary numbness, and activity restrictions may occur. A personalized recovery and follow-up plan is discussed after medical evaluation."
  },
  {
    question: "How long should international patients stay in Shanghai?",
    answer:
      "The recommended stay depends on the procedure, recovery progress, and follow-up schedule. After the initial photo review, the team can provide preliminary guidance for travel timing and local support."
  }
];

const facebookAgingPortrait = "/images/facebook-facial-assessment-portrait-20261020.webp";

const facebookAgingPatterns = [
  {
    number: "01",
    title: "Cheek Support",
    description: "Changes in cheek volume and support can make the midface look flatter or less lifted.",
    marker: { left: "17%", top: "39%" },
    target: { left: "37.5%", top: "40%" }
  },
  {
    number: "02",
    title: "Nasolabial Folds",
    description: "The creases from the sides of the nose toward the mouth corners can become more visible with smiling.",
    marker: { left: "15%", top: "49%" },
    target: { left: "41.6%", top: "44.3%" }
  },
  {
    number: "03",
    title: "Neck Skin & Contour",
    description: "Skin creases and laxity below the chin are assessed separately from the jawline.",
    marker: { left: "25%", top: "72%" },
    target: { left: "52%", top: "67%" }
  },
  {
    number: "04",
    title: "Crow's Feet",
    description: "Fine lines at the outer corners of the eyes often become more visible when smiling.",
    marker: { left: "86%", top: "32%" },
    target: { left: "68.7%", top: "35%" }
  },
  {
    number: "05",
    title: "Marionette Lines",
    description: "Lines below the mouth corners extend toward the chin, distinct from the folds beside the nose.",
    marker: { left: "86%", top: "48%" },
    target: { left: "64.5%", top: "51%" }
  },
  {
    number: "06",
    title: "Jawline Definition",
    description: "The lower edge of the jaw is reviewed for contour changes near the chin and lower cheek.",
    marker: { left: "85%", top: "61%" },
    target: { left: "64.5%", top: "57.5%" }
  }
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

const facebookHospitalTrustPoints = [
  {
    number: "01",
    title: "Professional Medical Environment",
    description: "Consultation, treatment and recovery support within one coordinated setting."
  },
  {
    number: "02",
    title: "Doctor-Led Care",
    description: "Your treatment direction is confirmed through an in-person assessment with Dr. Xiao."
  },
  {
    number: "03",
    title: "International Patient Support",
    description: "Guidance for consultation, treatment arrangements and recovery in Shanghai."
  }
];

const facebookCareMoments = [
  {
    label: "Private Consultation",
    image: "/images/facebook-care-consultation.webp",
    alt: "Dr. Xiao meeting an international patient in the Shanghai consultation room",
    position: "center 38%"
  },
  {
    label: "Treatment Day",
    image: "/images/facebook-care-treatment-day.webp",
    alt: "Dr. Xiao with an international patient in the clinical treatment room",
    position: "center 36%"
  },
  {
    label: "Recovery Check-In",
    image: "/images/facebook-care-recovery-checkin.webp",
    alt: "Dr. Xiao checking on an international patient during early recovery",
    position: "center 34%"
  },
  {
    label: "Hospital Follow-Up",
    image: "/images/facebook-care-hospital-followup.webp",
    alt: "Dr. Xiao supporting an international patient during a hospital follow-up",
    position: "center 34%"
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
  const adsWhatsAppNumber = variant === "google" ? googleAdsWhatsAppNumber : facebookAdsWhatsAppNumber;
  const pageSettings = { ...safeSettings, whatsappNumber: adsWhatsAppNumber };
  const whatsappUrl = getWhatsAppUrl(pageSettings);
  const wechatDetails: FacebookWeChatDetails = {
    description: safeSettings.wechatDescription || defaultSettings.wechatDescription,
    qrImage: "/images/facebook-wechat-qr-hzm69968.jpg?v=20260811",
    wechatId: "Hzm69968"
  };
  const resultCards = useMemo(
    () =>
      variant === "facebook"
        ? buildFacebookResultCards(galleryItems)
        : buildResultCards(config.results, galleryItems),
    [config.results, galleryItems, variant]
  );

  if (variant === "facebook") {
    return (
      <FacebookAdsV2Page
        config={config}
        whatsappUrl={whatsappUrl}
        wechatDetails={wechatDetails}
        resultCards={resultCards}
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
        <ResultsSection title={config.resultsTitle} results={resultCards} whatsappUrl={whatsappUrl} />
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
  wechatDetails,
  resultCards
}: {
  config: PageConfig;
  whatsappUrl: string;
  wechatDetails: FacebookWeChatDetails;
  resultCards: ResultCardData[];
}) {
  const [wechatModal, setWechatModal] = useState({ open: false, placement: "facebook_wechat" });

  const openWechat = useCallback((placement: string) => {
    trackAdsLandingEvent("WeChatOpen", { placement });
    setWechatModal({ open: true, placement });
  }, []);

  const closeWechat = useCallback(() => {
    setWechatModal((current) => ({ ...current, open: false }));
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F4EE] text-[#1C1C1C] antialiased">
      <SimpleHeader whatsappUrl={whatsappUrl} allowHomeLink={false} tone="dark" />
      <main>
        <FacebookHeroV2 config={config} whatsappUrl={whatsappUrl} onOpenWechat={() => openWechat("facebook_hero_wechat")} />
        <FacebookDoctorTrustBar />
        <FacebookVideoContinuation whatsappUrl={whatsappUrl} />
        <FacebookSelfAssessment whatsappUrl={whatsappUrl} />
        <FacebookNaturalDifference whatsappUrl={whatsappUrl} />
        <FacebookResultsStories
          title={config.resultsTitle}
          results={resultCards}
          whatsappUrl={whatsappUrl}
        />
        <FacebookDoctorAuthorityV2 whatsappUrl={whatsappUrl} />
        <FacebookHospitalTrustSection whatsappUrl={whatsappUrl} />
        <FacebookCareMoments whatsappUrl={whatsappUrl} />
        <FacebookInternationalJourneyV2 whatsappUrl={whatsappUrl} />
        <FacebookArrivalExperience whatsappUrl={whatsappUrl} />
        <FacebookPlanFitV2 whatsappUrl={whatsappUrl} />
        <FacebookAfterPhotosV2 whatsappUrl={whatsappUrl} />
        <FacebookPhotoAssessmentGuide whatsappUrl={whatsappUrl} />
        <FacebookFaqSection whatsappUrl={whatsappUrl} />
        <FacebookFinalCtaV2
          config={config}
          whatsappUrl={whatsappUrl}
          wechatDetails={wechatDetails}
          onOpenWechat={() => openWechat("facebook_final_wechat")}
        />
      </main>
      <div className="bg-ink pb-20 sm:pb-0">
        <Footer />
      </div>
      <BackToTop />
      <StickyFacebookContacts
        whatsappUrl={whatsappUrl}
        label="Start Private Assessment"
        onOpenWechat={() => openWechat("facebook_sticky_wechat")}
      />
      <FacebookWeChatModal
        {...wechatDetails}
        open={wechatModal.open}
        placement={wechatModal.placement}
        onClose={closeWechat}
      />
    </div>
  );
}

function FacebookHeroV2({
  config,
  whatsappUrl,
  onOpenWechat
}: {
  config: PageConfig;
  whatsappUrl: string;
  onOpenWechat: () => void;
}) {
  return (
    <section id="facebook-hero" aria-labelledby="facebook-hero-heading" className="relative isolate overflow-hidden border-b border-[#E5D8C4] bg-[#F8F4EE]">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(115deg,#FFFEFC,rgba(248,244,238,0.94)_62%,#EFE7DA)]" />
      <div className="mx-auto grid max-w-[1320px] grid-cols-1 gap-9 px-5 py-9 sm:gap-12 sm:px-8 sm:py-12 lg:grid-cols-[1.25fr_0.9fr] lg:items-center lg:gap-12 lg:py-14 xl:gap-16 xl:py-16">
        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase leading-5 tracking-[0.19em] text-[#A67B36] sm:text-[11px] sm:tracking-[0.25em]">9D Facelift · Dr. Xiao · Shanghai</p>
          <h1 id="facebook-hero-heading" className="mt-5 font-display text-[clamp(34px,9vw,48px)] font-semibold leading-[1.04] tracking-[-0.035em] text-[#1C1C1C] sm:text-[68px] lg:text-[62px] xl:text-[76px]">
            <span className="block">A More Defined</span>
            <span className="block">Jawline.</span>
            <span className="mt-1 block text-[0.78em] leading-[1.13] tracking-[-0.04em] text-[#866A37]">Still Naturally You.</span>
          </h1>
          <p className="mt-5 max-w-[620px] text-[15px] leading-7 text-[#615B54] sm:mt-6 sm:text-[17px] sm:leading-8">
            Explore a personalized approach to lower-face and neck rejuvenation with Dr. Xiao in Shanghai—planned around your facial anatomy and goals.
          </p>
          <div className="mt-6 h-px w-24 bg-[#B18B4B] sm:mt-7 sm:w-32" aria-hidden="true" />
          <div className="mt-5 grid grid-cols-3 divide-x divide-[#D8C5A5] sm:mt-6">
            {[
              { label: "Personalized Planning", icon: UserRoundCheck },
              { label: "Shanghai Consultation", icon: MapPin },
              { label: "International Patient Support", icon: Globe2 }
            ].map(({ label, icon: Icon }, index) => (
              <div key={label} className={`flex min-w-0 flex-col items-start gap-2 pr-3 sm:flex-row sm:items-center sm:gap-3 ${index > 0 ? "pl-3 sm:pl-4" : ""}`}>
                <Icon className="h-6 w-6 shrink-0 stroke-[1.4] text-[#A18147] sm:h-7 sm:w-7" aria-hidden="true" />
                <p className="max-w-[136px] text-[11px] leading-[1.5] text-[#4D4841] sm:text-xs">{label}</p>
              </div>
            ))}
          </div>
          <div className="mt-7 flex flex-col items-stretch gap-4 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6 sm:gap-y-4">
            <TrackedWhatsAppLink
              href={whatsappUrl}
              placement="hero"
              label="Start My Private Assessment"
              className="inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-lg bg-[#174B32] px-5 py-4 text-[13px] font-bold text-white shadow-[0_12px_30px_rgba(23,75,50,0.15)] transition hover:bg-[#103D27] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#174B32] sm:w-auto sm:px-6 sm:text-sm"
            >
              <MessageCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
              <span>Start My Private Assessment</span>
              <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
            </TrackedWhatsAppLink>
            <Link
              href="#real-results"
              className="inline-flex min-h-11 items-center justify-center gap-2 self-center text-[13px] font-semibold text-[#5C503C] underline decoration-[#B39460] underline-offset-[7px] transition hover:text-[#9A773C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9A773C] sm:justify-start sm:text-sm"
            >
              View Patient Results
              <ArrowRight className="h-4 w-4 shrink-0 text-[#A78140]" aria-hidden="true" />
            </Link>
          </div>
          <p className="mt-3 max-w-[560px] text-xs leading-6 text-[#81796F] sm:mt-4">Start with your concerns. Our team will guide you through the next steps.</p>
          <button
            type="button"
            onClick={onOpenWechat}
            aria-haspopup="dialog"
            className="mt-4 inline-flex min-h-11 max-w-full items-center gap-3 text-left text-xs leading-5 text-[#5B554C] transition hover:text-[#174B32] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#174B32] sm:mt-3 sm:text-[13px]"
          >
            <WeChatBrandIcon className="h-6 w-6 shrink-0 text-[#21964B]" />
            <span className="border-l border-[#D8C5A5] pl-3 underline decoration-[#BFA77D] underline-offset-4">Prefer WeChat? Connect with our team</span>
          </button>
        </div>

        <div className="relative mx-auto aspect-[2/3] w-full max-w-[430px] overflow-hidden rounded-xl border border-[#CDBB9E] bg-[#4A4A4A] shadow-[0_24px_65px_rgba(48,35,19,0.14)] sm:max-w-[470px] lg:max-w-none">
          <Image
            src={config.heroImage}
            alt={config.heroAlt}
            fill
            priority
            quality={92}
            sizes="(min-width: 1320px) 500px, (min-width: 1024px) 40vw, (min-width: 640px) 470px, 92vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
            <div className="rounded-lg border border-[#D7C7AD] bg-[#FFFCF5]/95 px-3 py-4 text-center shadow-[0_8px_28px_rgba(0,0,0,0.08)] backdrop-blur-sm sm:py-5">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#A17D40] sm:text-xs">Dr. Xiao Zhongye</p>
              <p className="mt-2 text-xs text-[#5F5850] sm:text-sm">9D Lifting System · Shanghai</p>
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
        <FacebookMethodVideo />
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

function FacebookMethodVideo() {
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
        } else {
          videoRef.current?.pause();
        }
      },
      { rootMargin: "720px 0px", threshold: 0.01 }
    );

    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldLoad) return;
    videoRef.current?.load();
  }, [shouldLoad]);

  return (
    <div
      ref={frameRef}
      className="relative isolate mx-auto aspect-[9/16] w-full max-w-[270px] overflow-hidden rounded-[32px] border border-[#D9C59F] bg-[#151514] p-2 shadow-[0_24px_70px_rgba(24,18,12,0.18)] lg:mx-0"
    >
      <div className="pointer-events-none absolute left-1/2 top-3 z-10 h-1.5 w-16 -translate-x-1/2 rounded-full bg-white/18" />
      <div
        className="relative h-full w-full overflow-hidden rounded-[24px] bg-[#151514]"
        style={{ backfaceVisibility: "hidden", transform: "translateZ(0)" }}
      >
        <video
          ref={videoRef}
          className="block h-full w-full object-cover"
          style={{ backfaceVisibility: "hidden", transform: "translateZ(0)" }}
          muted
          playsInline
          loop
          controls
          preload={shouldLoad ? "auto" : "none"}
          poster="/videos/dr-xiao-9d-methodology-poster.jpg"
          aria-label="9D Facelift video continuation"
        >
          {shouldLoad ? <source src={facebookMethodVideoSrc} type="video/mp4" /> : null}
        </video>
      </div>
    </div>
  );
}

function FacebookSelfAssessment({ whatsappUrl }: { whatsappUrl: string }) {
  const leftPatterns = facebookAgingPatterns.slice(0, 3);
  const rightPatterns = facebookAgingPatterns.slice(3);
  // Project the same source-photo landmarks into the desktop's centered 430px, 3:4 image.
  const desktopTargets = facebookAgingPatterns.map((pattern, index) => ({
    number: pattern.number,
    x: 385 + 430 * Number.parseFloat(pattern.target.left) / 100,
    y: (650 - 430 * 4 / 3) / 2 + (430 * 4 / 3) * Number.parseFloat(pattern.target.top) / 100,
    labelY: [140, 325, 510][index % 3],
    left: index < 3
  }));

  return (
    <section
      id="facial-aging-patterns"
      className="overflow-hidden border-b border-[#E0D5C4] bg-[#F6F2EB] px-5 py-[72px] sm:px-6 sm:py-24 lg:px-8"
    >
      <div className="mx-auto max-w-[1240px]">
        <div className="mx-auto max-w-[860px] text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#A67B36]">Facial aging patterns</p>
          <h2 className="mt-4 font-display text-[36px] font-semibold leading-[1.08] text-[#201D19] sm:text-[46px] lg:text-[54px]">
            Where Facial Aging Often Becomes Visible
          </h2>
          <p className="mx-auto mt-5 max-w-[760px] text-[15px] leading-7 text-[#665F57] sm:text-base">
            Dr. Xiao reviews cheek support, expression lines, the jawline, and neck together to understand your concerns
            before recommending a treatment direction.
          </p>
        </div>

        <div className="relative mx-auto mt-10 hidden h-[650px] max-w-[1200px] xl:block">
          <div className="grid h-full grid-cols-[minmax(0,1fr)_430px_minmax(0,1fr)] items-center gap-10">
            <div className="relative z-20 flex h-[560px] flex-col justify-around py-7">
              {leftPatterns.map((pattern) => (
                <div key={pattern.number} className="max-w-[285px] bg-[#F6F2EB] pr-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#A67B36]">{pattern.number}</p>
                  <h3 className="mt-2 font-display text-[24px] font-semibold leading-tight text-[#211E1A]">
                    {pattern.title}
                  </h3>
                  <p className="mt-2 text-[13px] leading-6 text-[#70685E]">{pattern.description}</p>
                </div>
              ))}
            </div>

            <figure className="relative z-0 aspect-[3/4] w-full overflow-hidden rounded-md bg-[#171717] shadow-[0_24px_70px_rgba(58,45,30,0.12)] ring-1 ring-[#D8CAB4]" data-assessment-photo="desktop">
              <Image
                src={facebookAgingPortrait}
                alt="Smiling portrait with reference points for cheek support, facial lines, jawline, and neck assessment"
                fill
                sizes="430px"
                className="object-contain"
              />
            </figure>

            <div className="relative z-20 flex h-[560px] flex-col justify-around py-7">
              {rightPatterns.map((pattern) => (
                <div key={pattern.number} className="ml-auto max-w-[285px] bg-[#F6F2EB] pl-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#A67B36]">{pattern.number}</p>
                  <h3 className="mt-2 font-display text-[24px] font-semibold leading-tight text-[#211E1A]">
                    {pattern.title}
                  </h3>
                  <p className="mt-2 text-[13px] leading-6 text-[#70685E]">{pattern.description}</p>
                </div>
              ))}
            </div>
          </div>

          <svg
            className="pointer-events-none absolute inset-0 z-10 h-full w-full"
            viewBox="0 0 1200 650"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <g fill="none" stroke="#B68A43" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
              {desktopTargets.map((target) => (
                <path key={target.number} d={`M ${target.left ? 285 : 915} ${target.labelY} H ${target.left ? 365 : 835} L ${target.x} ${target.y}`} />
              ))}
            </g>
            <g fill="#B68A43" stroke="#F6F2EB" strokeWidth="3">
              {desktopTargets.map((target) => (
                <circle key={target.number} cx={target.x} cy={target.y} r="6" data-assessment-point={target.number} />
              ))}
            </g>
          </svg>
        </div>

        <div className="mt-9 xl:hidden">
          <figure className="relative mx-auto aspect-[3/4] w-full max-w-[520px] overflow-hidden rounded-md bg-[#171717] shadow-[0_20px_55px_rgba(58,45,30,0.1)] ring-1 ring-[#D8CAB4]" data-assessment-photo="mobile">
            {/* Full 3:4 photograph and annotations share the same coordinate plane at every width. */}
              <Image
                src={facebookAgingPortrait}
                alt="Numbered assessment areas: cheeks, nasolabial folds, neck, crow's feet, marionette lines, and jawline"
                fill
                sizes="(max-width: 640px) calc(100vw - 40px), 520px"
                className="object-contain"
              />
              <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                {facebookAgingPatterns.map((pattern) => (
                  <line
                    key={pattern.number}
                    x1={pattern.marker.left}
                    y1={pattern.marker.top}
                    x2={pattern.target.left}
                    y2={pattern.target.top}
                    stroke="#B68A43"
                    strokeWidth="1.5"
                    vectorEffect="non-scaling-stroke"
                  />
                ))}
              </svg>
              {facebookAgingPatterns.map((pattern, index) => (
                <div key={pattern.number} aria-hidden="true">
                  <span style={pattern.target} data-assessment-point={pattern.number} className="pointer-events-none absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white bg-[#B68A43] shadow-sm" />
                  <span style={pattern.marker} className="pointer-events-none absolute flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#F6F2EB] bg-[#B68A43] text-[11px] font-bold text-white shadow-md">
                    {index + 1}
                  </span>
                </div>
              ))}
          </figure>

          <div className="mx-auto mt-6 grid max-w-[760px] grid-cols-1 border-y border-[#D8CCBA] sm:grid-cols-2">
            {facebookAgingPatterns.map((pattern, index) => (
              <div
                key={pattern.number}
                className={`grid grid-cols-[30px_1fr] gap-3 py-4 ${
                  index > 0 ? "border-t border-[#E2D8C9] sm:border-t-0" : ""
                } ${index % 2 === 1 ? "sm:border-l sm:pl-5" : "sm:pr-5"} ${
                  index > 1 ? "sm:border-t sm:border-[#E2D8C9]" : ""
                }`}
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#B68A43] text-[10px] font-bold text-white">
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-sm font-bold text-[#211E1A]">{pattern.title}</h3>
                  <p className="mt-1 text-xs leading-5 text-[#70685E]">{pattern.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-7 max-w-[820px] border-t border-[#D8CCBA] pt-6 text-center">
          <p className="text-sm leading-6 text-[#665F57]">
            Smiling can accentuate facial lines. Assessment also considers the face at rest.
          </p>
          <p className="mt-2 text-[11px] leading-5 text-[#8A8176]">
            This visual highlights common aging patterns and is not a medical diagnosis.
          </p>
        </div>

        <div className="mt-6 text-center">
          <TrackedWhatsAppLink
            href={whatsappUrl}
            placement="facial_aging_patterns"
            label="Facial aging patterns WhatsApp assessment"
            className="inline-flex h-14 w-full items-center justify-center gap-3 rounded-md bg-[#25A85B] px-7 text-sm font-bold text-white shadow-[0_16px_36px_rgba(37,168,91,0.22)] transition hover:-translate-y-0.5 hover:bg-[#1C8F4B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B68A43] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F6F2EB] motion-reduce:transform-none sm:w-auto"
          >
            Send Photos for Private Assessment
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
          </TrackedWhatsAppLink>
        </div>
      </div>
    </section>
  );
}

function FacebookResultsStories({
  title,
  results,
  whatsappUrl
}: {
  title: string;
  results: ResultCardData[];
  whatsappUrl: string;
}) {
  return (
    <section id="real-results" className="overflow-hidden border-b border-[#E5D8C4] bg-[#FBF8F1] py-14 lg:py-24">
      <div className="mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-[760px]">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#B89A5A]">Real patient stories</p>
            <h2 className="mt-3 font-display text-[36px] font-semibold leading-[1.08] text-[#1C1C1C] sm:text-5xl lg:text-[58px]">
              {title}
            </h2>
            <p className="mt-4 max-w-[680px] text-sm leading-7 text-[#665C52] sm:text-base">
              Selected before-and-after cases showing personalized facial rejuvenation while preserving each patient&apos;s
              natural expression.
            </p>
          </div>
          <TrackedWhatsAppLink
            href={whatsappUrl}
            placement="middle"
            label="Results section WhatsApp"
            className="inline-flex h-11 w-fit items-center justify-center gap-3 rounded-md border border-[#C8A664] bg-transparent px-5 text-sm font-bold text-[#2A251F] transition-colors hover:bg-white"
          >
            Ask About Results on WhatsApp
            <ArrowRight className="h-4 w-4 text-[#B89A5A]" aria-hidden="true" />
          </TrackedWhatsAppLink>
        </div>

        <div className="-mx-4 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:-mx-6 sm:gap-5 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:px-0 lg:pb-0">
          {results.map((item, index) => (
            <div
              key={item.id || `${item.image}-${index}`}
              className="group block h-auto w-[86vw] max-w-[420px] shrink-0 snap-center sm:w-[68vw] lg:w-auto lg:max-w-none"
            >
              <article className="flex h-full flex-col overflow-hidden rounded-md border border-[#DDCBA9] bg-[#FFFEFB] shadow-[0_12px_30px_rgba(48,35,19,0.045)]">
                <div className="relative aspect-square overflow-hidden bg-[#EDE7DD]">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 1280px) 430px, (min-width: 1024px) 31vw, 86vw"
                    className="object-cover object-top"
                  />
                  <div className="pointer-events-none absolute inset-y-0 left-1/2 w-px bg-white/72 shadow-[0_0_0_1px_rgba(29,25,20,0.08)]" />
                  <span className="absolute left-3 top-3 rounded-sm bg-[#1D1A17]/82 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white backdrop-blur-sm">
                    {item.beforeLabel || "Before"}
                  </span>
                  <span className="absolute right-3 top-3 rounded-sm bg-[#1D1A17]/82 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white backdrop-blur-sm">
                    {item.afterLabel || "After"}
                  </span>
                  {item.featured ? (
                    <span className="absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-sm border border-white/55 bg-[#B08A45]/92 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-white backdrop-blur-sm">
                      Featured Result
                    </span>
                  ) : null}
                </div>

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-4 border-b border-[#E9DFCE] pb-4">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#A67B36]">
                        Age {item.age} <span className="px-1 text-[#C8B48E]">|</span> {item.country}
                      </p>
                      <h3 className="mt-2 font-display text-[22px] font-semibold leading-tight text-[#211D19]">
                        {item.title || item.procedure}
                      </h3>
                    </div>
                  </div>

                  <dl className="mt-4 grid gap-3 text-sm leading-6 text-[#5D544B]">
                    <div>
                      <dt className="inline font-bold text-[#211D19]">Procedure: </dt>
                      <dd className="inline">{item.procedure}</dd>
                    </div>
                    {item.postOpTime ? (
                      <div>
                        <dt className="inline font-bold text-[#211D19]">Post-op: </dt>
                        <dd className="inline">{item.postOpTime}</dd>
                      </div>
                    ) : null}
                    <div>
                      <dt className="inline font-bold text-[#211D19]">Concern: </dt>
                      <dd className="inline">{item.concern}</dd>
                    </div>
                    <div>
                      <dt className="inline font-bold text-[#211D19]">Result focus: </dt>
                      <dd className="inline">{item.result}</dd>
                    </div>
                  </dl>
                </div>
              </article>
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-xs leading-6 text-[#74695E]">
          Individual results vary. Photos show real patient examples and do not guarantee a specific outcome.
        </p>
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

function FacebookHospitalTrustSection({ whatsappUrl }: { whatsappUrl: string }) {
  return (
    <section
      id="hospital-trust"
      className="border-b border-[#D9CDBB] bg-[#F5F2EC] px-5 py-[76px] text-[#162B30] sm:px-6 sm:py-24 lg:px-8 lg:py-[104px]"
    >
      <div className="mx-auto max-w-[1240px]">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,0.76fr)_minmax(0,1fr)] lg:items-start lg:gap-16">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#A67B36]">
              Your care in Shanghai
            </p>
            <h2 className="mt-4 max-w-[540px] font-display text-[38px] font-semibold leading-[1.08] text-[#162B30] sm:text-[46px] lg:text-[52px]">
              Where the 9D Journey Becomes Real.
            </h2>
            <div className="mt-6 max-w-[540px] space-y-3 text-[15px] leading-7 text-[#536164] sm:text-base">
              <p>
                Shanghai Shengya Medical Beauty Hospital provides the medical setting for Dr. Xiao&apos;s facial
                rejuvenation consultations, procedures, and recovery care in Shanghai.
              </p>
              <p>
                From your in-person facial assessment and personalized planning to treatment and early-stage
                follow-up, each step is coordinated within a professional medical environment.
              </p>
              <p>
                For international patients, our team also helps make the journey in Shanghai clearer, more organized,
                and more reassuring.
              </p>
            </div>
          </div>

          <div>
            <HospitalTrustVideo
              mp4Src={facebookHospitalVideoMp4}
              webmSrc={facebookHospitalVideoWebm}
              poster={facebookHospitalVideoPoster}
            />
            <div className="mt-3 flex flex-wrap items-center justify-between gap-x-5 gap-y-2 px-1 text-[10px] font-semibold uppercase tracking-[0.13em] text-[#667174] sm:text-[11px]">
              <span className="inline-flex items-center gap-2 text-[#8C6B35]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#C9A15D]" aria-hidden="true" />
                Real clinical setting
              </span>
              <span>Shanghai Shengya Medical Beauty Hospital &middot; Shanghai, China</span>
            </div>
          </div>
        </div>

        <div className="mt-10 grid border-y border-[#D9CDBB] lg:grid-cols-3">
          {facebookHospitalTrustPoints.map((point, index) => (
            <div
              key={point.number}
              className={`grid grid-cols-[42px_1fr] gap-x-4 py-5 sm:grid-cols-[46px_1fr] lg:px-6 lg:py-6 ${
                index === 0 ? "" : "border-t border-[#DDD3C4] lg:border-l lg:border-t-0"
              }`}
            >
              <span className="pt-0.5 font-display text-lg font-semibold text-[#B48B47]">{point.number}</span>
              <div>
                <h3 className="text-sm font-bold leading-6 text-[#162B30]">{point.title}</h3>
                <p className="mt-1 text-sm leading-6 text-[#5C686A]">{point.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-7">
          <TrackedWhatsAppLink
            href={whatsappUrl}
            placement="hospital_trust"
            label="Plan Your Shanghai Visit"
            className="inline-flex h-14 w-full items-center justify-center gap-3 rounded-md bg-[#17393D] px-8 text-sm font-bold text-white shadow-[0_14px_34px_rgba(23,57,61,0.18)] transition hover:-translate-y-px hover:bg-[#21494D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A15D] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F5F2EC] motion-reduce:transform-none sm:w-auto"
          >
            Plan Your Shanghai Visit
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
          </TrackedWhatsAppLink>
          <p className="max-w-[520px] text-xs leading-6 text-[#6C7576]">
            Final treatment recommendations require an in-person medical consultation.
          </p>
        </div>
      </div>
    </section>
  );
}

function FacebookCareMoments({ whatsappUrl }: { whatsappUrl: string }) {
  return (
    <section
      id="real-care-moments"
      className="overflow-hidden border-b border-[#DED2C0] bg-[#F6F2EB] px-5 py-[76px] text-[#202827] sm:px-6 sm:py-24 lg:px-8 lg:py-[104px]"
    >
      <div className="mx-auto max-w-[1240px]">
        <div className="grid gap-7 lg:grid-cols-[minmax(0,0.94fr)_minmax(360px,0.72fr)] lg:items-end lg:gap-16">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#9A7133]">
              Real moments of care
            </p>
            <h2 className="mt-4 max-w-[700px] font-display text-[38px] font-semibold leading-[1.08] sm:text-[46px] lg:text-[52px]">
              Doctor-Led Care, Seen Up Close.
            </h2>
          </div>
          <div className="border-l border-[#B79252] pl-5 sm:pl-7">
            <p className="max-w-[500px] text-[15px] leading-7 text-[#625E57] sm:text-base">
              From private consultation and treatment planning to recovery follow-up, these real moments reflect the
              personal care international patients receive in Shanghai.
            </p>
          </div>
        </div>

        <div className="mt-10 hidden grid-cols-[minmax(0,1.42fr)_minmax(0,1fr)] gap-3 lg:grid">
          <figure className="group relative aspect-[4/3] overflow-hidden rounded-md border border-[#D7C9B3] bg-[#ECE5DA] shadow-[0_20px_55px_rgba(67,53,35,0.1)]">
            <Image
              src="/images/facebook-care-real-moments-main.webp"
              alt="Dr. Xiao and his team with international patients in the Shanghai consultation room"
              fill
              sizes="(min-width: 1280px) 710px, 58vw"
              className="object-cover transition duration-700 group-hover:scale-[1.015] motion-reduce:transform-none"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/78 via-black/30 to-transparent px-7 pb-6 pt-20">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#E2C58F]">Shanghai, China</p>
              <figcaption className="mt-2 max-w-[520px] font-display text-2xl font-semibold leading-tight text-white">
                Personal care, from the first meeting to follow-up.
              </figcaption>
            </div>
          </figure>

          <div className="grid min-h-0 grid-cols-2 grid-rows-2 gap-3">
            {facebookCareMoments.map((moment) => (
              <figure
                key={moment.label}
                className="group relative min-h-0 overflow-hidden rounded-md border border-[#D7C9B3] bg-[#ECE5DA] shadow-[0_14px_34px_rgba(67,53,35,0.08)]"
              >
                <Image
                  src={moment.image}
                  alt={moment.alt}
                  fill
                  sizes="(min-width: 1280px) 245px, 20vw"
                  style={{ objectPosition: moment.position }}
                  className="object-cover transition duration-700 group-hover:scale-[1.025] motion-reduce:transform-none"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/82 via-black/22 to-transparent px-4 pb-4 pt-14">
                  <figcaption className="text-xs font-bold uppercase tracking-[0.14em] text-white">
                    {moment.label}
                  </figcaption>
                </div>
              </figure>
            ))}
          </div>
        </div>

        <div className="mt-9 lg:hidden">
          <figure className="relative aspect-[4/3] overflow-hidden rounded-md border border-[#D7C9B3] bg-[#ECE5DA] shadow-[0_18px_44px_rgba(67,53,35,0.1)]">
            <Image
              src="/images/facebook-care-real-moments-main.webp"
              alt="Dr. Xiao and his team with international patients in the Shanghai consultation room"
              fill
              sizes="calc(100vw - 40px)"
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent px-5 pb-5 pt-16">
              <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#E2C58F]">Shanghai, China</p>
              <figcaption className="mt-2 font-display text-xl font-semibold leading-tight text-white">
                Personal care, from the first meeting to follow-up.
              </figcaption>
            </div>
          </figure>

          <div className="-mx-5 mt-3 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:-mx-6 sm:px-6">
            {facebookCareMoments.map((moment) => (
              <figure
                key={moment.label}
                className="relative aspect-[4/5] w-[68vw] max-w-[300px] shrink-0 snap-start overflow-hidden rounded-md border border-[#D7C9B3] bg-[#ECE5DA] shadow-[0_12px_28px_rgba(67,53,35,0.08)]"
              >
                <Image
                  src={moment.image}
                  alt={moment.alt}
                  fill
                  sizes="(max-width: 640px) 68vw, 300px"
                  style={{ objectPosition: moment.position }}
                  className="object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/82 via-black/22 to-transparent px-4 pb-4 pt-16">
                  <figcaption className="text-[11px] font-bold uppercase tracking-[0.14em] text-white">
                    {moment.label}
                  </figcaption>
                </div>
              </figure>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-[#D8CCBA] pt-7 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
          <p className="max-w-[610px] text-xs leading-6 text-[#726B61]">
            Real patient moments shared with permission. Individual treatment journeys and recovery experiences vary.
          </p>
          <TrackedWhatsAppLink
            href={whatsappUrl}
            placement="real_care_moments"
            label="Real care moments private assessment"
            className="inline-flex h-14 w-full shrink-0 items-center justify-center gap-3 rounded-md border border-[#17393D] bg-[#17393D] px-7 text-sm font-bold text-white shadow-[0_14px_34px_rgba(23,57,61,0.18)] transition hover:-translate-y-px hover:bg-[#21494D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B79252] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F6F2EB] motion-reduce:transform-none sm:w-auto"
          >
            Start a Private Assessment
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
          </TrackedWhatsAppLink>
        </div>
      </div>
    </section>
  );
}

function FacebookNaturalDifference({ whatsappUrl }: { whatsappUrl: string }) {
  const concerns = [
    "Midface descent and tired-looking contours",
    "Deepened folds and lower-face heaviness",
    "Jowls and loss of jawline definition",
    "Neck laxity and tissue descent"
  ];

  return (
    <section id="what-is-9d-facelift" className="border-b border-[#E4D8C6] bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-center lg:gap-16 xl:gap-20">
        <div className="lg:hidden">
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#A67B36]">What is 9D Facelift?</p>
          <h2 className="mt-4 font-display text-[38px] font-semibold leading-[1.08] text-[#201D19] sm:text-[48px]">
            Multi-Layer Lift. Natural Identity Preserved.
          </h2>
        </div>

        <figure className="mx-auto w-full max-w-[500px] lg:mx-0">
          <div className="relative aspect-[3/4] overflow-hidden rounded-md border border-[#D8CAB4] bg-[#F3EEE6] shadow-[0_26px_70px_rgba(46,34,21,0.13)]">
            <Image
              src="/images/facebook-9d-method-case-20261013.webp"
              alt="Real patient before and after 9D facial rejuvenation"
              fill
              sizes="(max-width: 1024px) calc(100vw - 40px), 500px"
              className="object-cover"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/30 to-transparent" />
            <span className="absolute bottom-5 left-5 text-[10px] font-bold uppercase tracking-[0.2em] text-white">
              Real patient · Before &amp; After
            </span>
          </div>
          <figcaption className="mt-3 text-[11px] leading-5 text-[#82786C]">
            Individual healing and results vary.
          </figcaption>
        </figure>

        <div>
          <div className="hidden lg:block">
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#A67B36]">What is 9D Facelift?</p>
            <h2 className="mt-4 max-w-[680px] font-display text-[38px] font-semibold leading-[1.08] text-[#201D19] sm:text-[48px] lg:text-[54px]">
              Multi-Layer Lift. Natural Identity Preserved.
            </h2>
          </div>
          <p className="mt-6 max-w-[680px] text-[16px] leading-8 text-[#554D45]">
            The 9D Facelift is not a thread lift. It is Dr. Xiao&apos;s personalized, doctor-led approach to facial
            rejuvenation, planned across multiple facial regions, treatment points, and tissue layers. Depending on
            the patient&apos;s anatomy and aging pattern, the plan may include deeper structural lifting and SMAS-level
            support to reposition descended tissue and restore facial definition.
          </p>

          <div className="mt-7 grid grid-cols-1 border-y border-[#DCCFBC] sm:grid-cols-2">
            <div className="py-5 sm:pr-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#A67B36]">Technical principle</p>
              <p className="mt-2 text-sm leading-6 text-[#3F3933]">
                Multi-area, multi-point, and multi-layer lifting planned across the midface, lower face, jawline, and
                neck.
              </p>
            </div>
            <div className="border-t border-[#E4D9C8] py-5 sm:border-l sm:border-t-0 sm:pl-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#A67B36]">Not a thread lift</p>
              <p className="mt-2 text-sm leading-6 text-[#3F3933]">
                Thread lifting relies mainly on threads within a more limited tissue plane. 9D planning addresses
                several structural layers according to each patient&apos;s anatomy.
              </p>
            </div>
          </div>

          <div className="mt-7">
            <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-[#27231F]">Designed to improve</h3>
            <div className="mt-4 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
              {concerns.map((concern) => (
                <div key={concern} className="flex items-start gap-3 border-b border-[#E9E1D5] pb-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#B68A43]" aria-hidden="true" />
                  <span className="text-sm leading-6 text-[#554D45]">{concern}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-7 border-l-2 border-[#B68A43] bg-[#F7F2EA] px-5 py-4">
            <p className="text-sm font-bold text-[#29241F]">Dr. Xiao&apos;s design principle</p>
            <p className="mt-2 text-sm leading-6 text-[#62594F]">
              Restore support while preserving the features that make you recognizable. The aim is a refreshed,
              naturally lifted appearance that maintains facial movement, expression, and individual character. The
              appropriate layers and degree of lifting are confirmed after in-person medical evaluation.
            </p>
          </div>

          <TrackedWhatsAppLink
            href={whatsappUrl}
            placement="what_is_9d_facelift"
            label="Ask if 9D Facelift fits you"
            className="mt-7 inline-flex h-14 w-full items-center justify-center gap-3 rounded-md bg-[#1E1C19] px-7 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#302B25] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B68A43] focus-visible:ring-offset-2 sm:w-auto"
          >
            Ask If 9D Fits You
            <MessageCircle className="h-4 w-4 text-[#25D366]" aria-hidden="true" />
          </TrackedWhatsAppLink>
        </div>
      </div>
    </section>
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
    <FacebookSection id="international-patient-journey" className="bg-[#FFFFFF]">
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
        <div className="relative mx-auto aspect-[4/5] w-full max-w-[520px] overflow-hidden rounded-md border border-[#E0D0B3] bg-[#EDE3D6] shadow-[0_22px_70px_rgba(50,36,18,0.10)] lg:max-w-none">
          <Image
            src="/images/facebook-in-person-consultation.webp"
            alt="Dr. Xiao reviewing a patient during an in-person facial consultation"
            fill
            sizes="(min-width: 1440px) 540px, (min-width: 1024px) 42vw, (min-width: 640px) 520px, 92vw"
            className="object-cover object-[50%_65%]"
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

function FacebookFaqSection({ whatsappUrl }: { whatsappUrl: string }) {
  return (
    <FacebookSection id="frequently-asked-questions" className="border-t border-[#E0D0B3] bg-white">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#B89A5A]">Frequently asked questions</p>
          <h2 className="mt-3 max-w-[430px] font-display text-3xl font-semibold leading-tight text-[#1C1C1C] sm:text-5xl">
            Questions before your private assessment.
          </h2>
          <p className="mt-5 max-w-[470px] text-sm leading-7 text-[#4E463F]">
            Clear guidance on the 9D approach, suitability, recovery, and planning your visit to Shanghai.
          </p>
          <TrackedWhatsAppLink
            href={whatsappUrl}
            placement="faq"
            label="FAQ WhatsApp"
            className="mt-7 inline-flex h-12 w-full items-center justify-center gap-3 rounded-md border border-[#1C1C1C] bg-[#1C1C1C] px-6 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#2A2520] sm:w-auto"
          >
            Ask a Private Question
            <MessageCircle className="h-4 w-4 text-[#25D366]" aria-hidden="true" />
          </TrackedWhatsAppLink>
        </div>

        <div className="border-t border-[#D9C6A6]">
          {facebookFaqs.map((faq, index) => (
            <details key={faq.question} className="group border-b border-[#D9C6A6]" open={index === 0 ? true : undefined}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-5 text-left text-base font-bold text-[#1C1C1C] marker:content-none sm:py-6 sm:text-lg [&::-webkit-details-marker]:hidden">
                <span className="flex items-start gap-4">
                  <span className="mt-0.5 text-[11px] font-bold tracking-[0.16em] text-[#B89A5A]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{faq.question}</span>
                </span>
                <ChevronDown
                  className="h-5 w-5 shrink-0 text-[#B89A5A] transition-transform duration-200 group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <p className="pb-6 pl-11 pr-8 text-sm leading-7 text-[#5A5149] sm:pr-12">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
      <p className="mt-8 border-t border-[#EEE4D5] pt-5 text-xs leading-6 text-[#6A5E52]">
        Information on this page is general guidance only. Treatment suitability, risks, recovery, and final recommendations
        require an in-person medical evaluation.
      </p>
    </FacebookSection>
  );
}

function FacebookFinalCtaV2({ whatsappUrl, wechatDetails, onOpenWechat }: {
  config: PageConfig;
  whatsappUrl: string;
  wechatDetails: FacebookWeChatDetails;
  onOpenWechat: () => void;
}) {
  return <FacebookAssessmentSection whatsappUrl={whatsappUrl} wechatId={wechatDetails.wechatId} onOpenWechat={onOpenWechat} />;
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

function SimpleHeader({
  whatsappUrl,
  allowHomeLink = true,
  tone = "light"
}: {
  whatsappUrl: string;
  allowHomeLink?: boolean;
  tone?: "light" | "dark";
}) {
  const isDark = tone === "dark";
  const brand = (
    <>
      <span className={`font-display text-[22px] tracking-[0.13em] ${isDark ? "text-white" : "text-[#171717]"}`}>
        DR. XIAO
      </span>
      <span className={`mt-1 text-[9px] font-semibold uppercase tracking-[0.2em] ${isDark ? "text-[#D8BE8B]" : "text-[#8C6B35]"}`}>
        9D Lifting System
      </span>
    </>
  );

  return (
    <header className={isDark ? "border-b border-white/10 bg-[#171715]" : "border-b border-[#E8DCCB] bg-[#FBF8F1]/95"}>
      <div className="mx-auto flex min-h-[64px] max-w-[1180px] items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        {allowHomeLink ? (
          <Link href="/" className="group inline-flex min-w-0 flex-col leading-none" aria-label="Dr. Xiao home">
            {brand}
          </Link>
        ) : (
          <div className="inline-flex min-w-0 flex-col leading-none" aria-label="Dr. Xiao 9D Lifting System">
            {brand}
          </div>
        )}
        {isDark ? (
          <div className="hidden items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.13em] text-white/62 md:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-[#C7A56D]" aria-hidden="true" />
            Doctor-led assessment
            <span className="h-px w-5 bg-white/18" aria-hidden="true" />
            International patients · Shanghai
          </div>
        ) : null}
        <TrackedWhatsAppLink
          href={whatsappUrl}
          placement="hero"
          label="Header WhatsApp Assessment"
          className={
            isDark
              ? "inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-md bg-[#1FA855] px-3.5 text-[11px] font-bold text-white shadow-[0_10px_28px_rgba(31,168,85,0.22)] transition hover:-translate-y-0.5 hover:bg-[#168845] sm:px-4 sm:text-xs"
              : "hidden h-11 shrink-0 items-center justify-center gap-2 rounded-md border border-[#C7A56D] bg-white px-4 text-xs font-bold text-[#171717] shadow-[0_12px_32px_rgba(37,25,8,0.08)] transition hover:-translate-y-0.5 hover:border-[#25D366] hover:text-[#128C45] sm:inline-flex"
          }
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          <span>{isDark ? "WhatsApp" : "WhatsApp Assessment"}</span>
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
  whatsappUrl
}: {
  title: string;
  results: ResultCardData[];
  whatsappUrl: string;
}) {
  return (
    <SectionShell id="real-results" className="bg-[#FFFEFB]">
      <CenteredHeading eyebrow="Real results" title={title} />
      <div className="relative left-1/2 mt-10 w-screen max-w-[1380px] -translate-x-1/2 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-[1304px] grid-cols-1 justify-items-center gap-7 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {results.map((item) => (
            <article
              key={`${item.age}-${item.country}-${item.procedure}`}
              className="w-full max-w-[400px] overflow-hidden rounded-[24px] border border-[#D8BE8B] bg-[#171717] shadow-[0_30px_86px_rgba(48,35,19,0.13)]"
            >
              <div className="relative aspect-[512/680]">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 1024px) 512px, (min-width: 768px) 48vw, 92vw"
                  className="object-cover"
                />
              </div>
            </article>
          ))}
        </div>
      </div>
      <p className="mt-5 text-center text-xs font-semibold text-[#6C6258]">Individual results vary.</p>
      <div className="mt-7 text-center">
        <TrackedWhatsAppLink
          href={whatsappUrl}
          placement="google_ads_results_whatsapp"
          label="Google Ads results WhatsApp assessment"
          className="inline-flex h-11 items-center justify-center gap-3 rounded-md border border-[#C7A56D] bg-white px-7 text-sm font-bold text-[#A47735] transition hover:-translate-y-0.5 hover:bg-[#FBF8F1]"
        >
          Ask About Results on WhatsApp
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </TrackedWhatsAppLink>
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
    <SectionShell className="overflow-hidden bg-[#F8F4EE]">
      <CenteredHeading
        eyebrow="Plan fit"
        title="Which Approach May Fit Your Face?"
        description="A private photo assessment helps identify the most appropriate direction for your facial anatomy and aging pattern."
      />
      <div className="relative left-1/2 mt-10 w-screen max-w-[1380px] -translate-x-1/2 px-4 sm:px-6 lg:px-8">
        <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:-mx-6 sm:gap-5 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:px-0 lg:pb-0">
          {planCards.map((plan, index) => (
            <article
              key={plan.title}
              className="flex h-auto w-[86vw] max-w-[430px] shrink-0 snap-center flex-col overflow-hidden rounded-md bg-[#FFFEFB] shadow-[0_12px_30px_rgba(48,35,19,0.045)] sm:w-[68vw] lg:w-auto lg:max-w-none"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-[#F1ECE4]">
                <Image
                  src={plan.image}
                  alt={plan.title}
                  fill
                  sizes="(min-width: 1280px) 430px, (min-width: 1024px) 31vw, 86vw"
                  className="object-contain object-center"
                />
                <span className="absolute left-4 top-4 rounded-sm bg-[#1D1A17]/82 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white backdrop-blur-sm">
                  {plan.featured ? "Private assessment" : `Approach 0${index + 1}`}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#A67B36]">
                    {plan.featured ? "Start with facial assessment" : "Personalized treatment direction"}
                  </p>
                  <h3 className="mt-2 font-display text-[24px] font-semibold leading-tight text-[#211D19]">{plan.title}</h3>
                </div>

                <p className="mt-4 text-sm leading-6 text-[#5D544B]">{plan.description}</p>
                <ul className="mt-5 grid gap-3 text-sm font-semibold text-[#2A251F]">
                  {plan.items.map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-[#B89A5A]" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>

                {plan.featured ? (
                  <TrackedWhatsAppLink
                    href={whatsappUrl}
                    placement="plan_fit"
                    label="Plan fit WhatsApp"
                    className="mt-6 inline-flex h-11 w-fit items-center justify-center gap-3 rounded-md border border-[#C8A664] px-5 text-sm font-bold text-[#2A251F] transition-colors hover:bg-[#F8F4EE]"
                  >
                    Find Out on WhatsApp
                    <ArrowRight className="h-4 w-4 text-[#B89A5A]" aria-hidden="true" />
                  </TrackedWhatsAppLink>
                ) : null}
              </div>
            </article>
          ))}
        </div>
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

function StickyFacebookContacts({
  whatsappUrl,
  label,
  onOpenWechat
}: {
  whatsappUrl: string;
  label: string;
  onOpenWechat: () => void;
}) {
  const [contactSectionVisible, setContactSectionVisible] = useState(false);
  useEffect(() => {
    const sections = ["facebook-hero", "private-assessment"]
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);
    if (sections.length === 0) return;
    const visibleSections = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visibleSections.add(entry.target);
        else visibleSections.delete(entry.target);
      }
      setContactSectionVisible(visibleSections.size > 0);
    });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  if (contactSectionVisible) return null;
  return (
    <div className="fixed inset-x-3 bottom-3 z-50 flex gap-2 sm:inset-x-auto sm:right-5 sm:w-[368px]">
      <button
        type="button"
        aria-label="Open WeChat contact"
        title="WeChat"
        onClick={onOpenWechat}
        className="inline-flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-md border border-[#07C160] bg-white text-[#07A653] shadow-[0_18px_48px_rgba(16,95,56,0.2)] transition hover:-translate-y-0.5 hover:bg-[#F2FFF8]"
      >
        <WeChatBrandIcon className="h-5 w-5" />
      </button>
      <TrackedWhatsAppLink
        href={whatsappUrl}
        placement="sticky"
        label="Sticky WhatsApp Assessment"
        className="flex h-[52px] min-w-0 flex-1 items-center justify-center gap-3 rounded-md border border-[#2EC266] bg-[#1FA855] px-3 text-sm font-bold text-white shadow-[0_18px_48px_rgba(31,168,85,0.32)] transition hover:-translate-y-0.5 hover:bg-[#168845]"
      >
        <MessageCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
        <span className="truncate">{label}</span>
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

function buildFacebookResultCards(galleryItems: GalleryItem[]): ResultCardData[] {
  const availableItems = galleryItems.filter((item) => item.image && item.displayRole !== "hero");
  const selectedItems = (availableItems.length >= 3 ? availableItems : galleryItems.filter((item) => item.image)).slice(0, 3);

  return selectedItems.map((item, index) => ({
    id: item.id,
    image: facebookResultImageOverrides[index] || item.image,
    alt: item.alt || item.title || `9D facial rejuvenation result ${index + 1}`,
    title: item.title || item.caseLabel || "Natural Facial Rejuvenation",
    age: item.age?.trim() || "Private",
    country: item.country?.trim() || "Not disclosed",
    concern: item.mainConcerns?.trim() || item.description?.trim() || "Personalized facial rejuvenation",
    procedure: item.procedure?.trim() || "9D Facial Rejuvenation",
    result: item.visibleChange?.trim() || "Natural-looking refinement with expression preserved",
    beforeLabel: item.beforeLabel?.trim() || "Before",
    afterLabel: item.afterLabel?.trim() || "After",
    postOpTime: getPostOpTime(item.afterLabel),
    featured: item.displayRole === "featured" || index === 1
  }));
}

function getPostOpTime(afterLabel?: string) {
  const value = afterLabel?.trim();
  if (!value || /^after$/i.test(value)) return undefined;

  return value.replace(/^after\s*/i, "");
}
