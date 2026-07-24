export type GoogleAdsTrustItem = {
  value: string;
  label: string;
};

export type GoogleAdsResultCase = {
  image: string;
  alt: string;
  age: string;
  country: string;
  title: string;
  concern: string;
  treatment: string;
  timing: string;
  result: string;
  featured?: boolean;
};

export type GoogleAdsTextItem = {
  title: string;
  description: string;
};

export type GoogleAdsComparisonCard = GoogleAdsTextItem & {
  index: string;
  points: string[];
};

export type GoogleAdsFaqItem = {
  question: string;
  answer: string;
};

export type GoogleAdsLandingPageContent = {
  seoTitle: string;
  seoDescription: string;
  whatsappNumber: string;
  whatsappMessage: string;
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    image: string;
    imageAlt: string;
    doctorName: string;
    doctorCredential: string;
    primaryCtaLabel: string;
    secondaryCtaLabel: string;
    privacyNote: string;
  };
  trustItems: GoogleAdsTrustItem[];
  results: {
    enabled: boolean;
    eyebrow: string;
    title: string;
    description: string;
    cases: GoogleAdsResultCase[];
    beforeLabel: string;
    afterLabel: string;
    selectedLabel: string;
    disclaimer: string;
    ctaLabel: string;
  };
  concerns: {
    enabled: boolean;
    eyebrow: string;
    title: string;
    description: string;
    items: GoogleAdsTextItem[];
    ctaLabel: string;
  };
  method: {
    enabled: boolean;
    eyebrow: string;
    title: string;
    description: string;
    points: string[];
    video: string;
    poster: string;
    videoLabel: string;
    ctaLabel: string;
  };
  comparison: {
    enabled: boolean;
    eyebrow: string;
    title: string;
    description: string;
    cards: GoogleAdsComparisonCard[];
    disclaimer: string;
  };
  doctor: {
    enabled: boolean;
    eyebrow: string;
    title: string;
    description: string;
    image: string;
    imageAlt: string;
    points: string[];
    ctaLabel: string;
  };
  international: {
    enabled: boolean;
    eyebrow: string;
    title: string;
    description: string;
    video: string;
    poster: string;
    videoLabel: string;
    steps: GoogleAdsTextItem[];
    ctaLabel: string;
  };
  faq: {
    enabled: boolean;
    eyebrow: string;
    title: string;
    items: GoogleAdsFaqItem[];
  };
  assessment: {
    eyebrow: string;
    title: string;
    description: string;
    benefits: string[];
    concernOptions: string[];
    privacyText: string;
  };
  finalCta: {
    eyebrow: string;
    title: string;
    description: string;
    ctaLabel: string;
  };
  footer: {
    doctorName: string;
    brandLine: string;
    disclaimer: string;
    whatsappLabel: string;
  };
  thankYou: {
    whatsappMessage: string;
    eyebrow: string;
    title: string;
    description: string;
    whatsappLabel: string;
    returnLabel: string;
    checklistTitle: string;
    photoItems: string[];
    photoInstructions: string;
    disclaimer: string;
  };
};

export type DeepPartial<T> = T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends object
    ? { [K in keyof T]?: DeepPartial<T[K]> }
    : T;

export const defaultGoogleAdsLandingPageContent: GoogleAdsLandingPageContent = {
  seoTitle: "9D Facelift in Shanghai by Dr. Xiao | Online Assessment",
  seoDescription:
    "Request a private doctor-led 9D facial assessment with Dr. Xiao in Shanghai. View real patient results and learn about international patient planning.",
  whatsappNumber: "+601121706171",
  whatsappMessage:
    "Hello, I found Dr. Xiao's 9D Facelift through Google Ads. I have completed the private assessment form and would like to send my photos for review.",
  hero: {
    eyebrow: "Doctor-Led Facial Rejuvenation in Shanghai",
    title: "9D Facelift in Shanghai for International Patients",
    description:
      "A personalized facial rejuvenation approach for jawline softening, jowls, lower-face heaviness and neck laxity. Every treatment direction is confirmed through medical assessment.",
    image: "/images/home-hero-dr-xiao-consultation-bg.webp",
    imageAlt: "Dr. Xiao consulting with an international patient in Shanghai",
    doctorName: "Dr. Xiao Zhongye",
    doctorCredential: "Founder of the 9D Lifting System\u2122",
    primaryCtaLabel: "Request a Private Assessment",
    secondaryCtaLabel: "View Real Patient Results",
    privacyNote: "Private inquiry. Your information is reviewed only for assessment and contact."
  },
  trustItems: [
    { value: "27+", label: "Years of Clinical Experience" },
    { value: "Doctor-Led", label: "Facial Assessment" },
    { value: "International", label: "Patient Support" },
    { value: "Shanghai", label: "Treatment and Recovery" }
  ],
  results: {
    enabled: true,
    eyebrow: "Real Patient Results",
    title: "Natural-looking refinement, shown clearly.",
    description: "Selected clinical cases with patient context, treatment direction and photo timing.",
    cases: [
      {
        image: "/images/gallery-case-11.jpg",
        alt: "Before and after facial rejuvenation result showing lower-face refinement",
        age: "45",
        country: "USA",
        title: "Before and After Facial Rejuvenation",
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
        title: "Before and After Facial Rejuvenation",
        concern: "Lower-face descent and reduced jawline definition",
        treatment: "Personalized 9D surgical direction",
        timing: "Post-treatment clinical photo",
        result: "Improved structural support with a natural-looking facial balance.",
        featured: true
      },
      {
        image: "/images/facebook-ads-result-case-03-day30-20260720.jpg",
        alt: "Before treatment and day 30 facial rejuvenation patient result",
        age: "Private",
        country: "Not disclosed",
        title: "Before and After Facial Rejuvenation",
        concern: "Jawline, lower-face and neck aging",
        treatment: "Doctor-led facial rejuvenation plan",
        timing: "Day 30",
        result: "Early recovery result with clearer lower-face and neck definition."
      }
    ],
    beforeLabel: "Before",
    afterLabel: "After",
    selectedLabel: "Selected Case",
    disclaimer: "Individual results vary. Images do not guarantee a specific outcome.",
    ctaLabel: "Request a Private Assessment"
  },
  concerns: {
    enabled: true,
    eyebrow: "Common Concerns",
    title: "Does this sound like what you notice?",
    description: "Aging can show up differently from one face to another.",
    items: [
      { title: "Jawline Softening", description: "Your lower face may feel less defined than it used to." },
      { title: "Early Jowls", description: "You notice tissue gathering beside the chin or jawline." },
      { title: "Lower-Face Heaviness", description: "The lower face can look heavier even without weight change." },
      { title: "Neck Laxity", description: "Skin or deeper tissue under the jaw may feel less supported." },
      { title: "Previous Filler Heaviness", description: "Past volume treatments may have changed facial balance." },
      { title: "Not Sure Where to Start", description: "A private assessment can help organize the right questions." }
    ],
    ctaLabel: "Tell Us What You Notice"
  },
  method: {
    enabled: true,
    eyebrow: "What Is 9D",
    title: "A doctor-led planning system, not a one-size-fits-all procedure.",
    description:
      "Every face ages differently. Dr. Xiao reviews facial structure, expression, tissue descent, skin quality and previous treatment history before recommending a direction.",
    points: [
      "Facial structure and aging-pattern assessment",
      "Natural expression and recognizable features",
      "Personalized depth and treatment planning",
      "Final direction confirmed through medical evaluation"
    ],
    video: "/videos/dr-xiao-9d-methodology-mobile-v2.mp4",
    poster: "/videos/dr-xiao-9d-methodology-poster.jpg",
    videoLabel: "9D Method Video",
    ctaLabel: "Request a Private Assessment"
  },
  comparison: {
    enabled: true,
    eyebrow: "Treatment Direction",
    title: "Different concerns may need different depth.",
    description:
      "The appropriate direction depends on anatomy, aging pattern, previous treatments and in-person evaluation.",
    cards: [
      {
        index: "01",
        title: "9D Facial Rejuvenation Direction",
        description: "May be discussed for earlier lower-face change, a softer jawline or mild-to-moderate tissue descent.",
        points: ["Earlier jowls", "Jawline softening", "Lower-face heaviness"]
      },
      {
        index: "02",
        title: "Deeper Surgical Direction",
        description: "May be discussed when laxity, neck change or deeper structural descent appears more advanced.",
        points: ["More pronounced jowls", "Neck laxity", "Heavier tissue descent"]
      }
    ],
    disclaimer:
      "No treatment direction is automatically better. Final recommendations depend on medical evaluation and individual suitability."
  },
  doctor: {
    enabled: true,
    eyebrow: "Meet the Doctor",
    title: "Dr. Xiao Zhongye",
    description:
      "Founder of the 9D Lifting System\u2122 with more than 27 years of clinical experience in facial rejuvenation assessment and planning.",
    image: "/images/dr-xiao-links-hero-portrait.webp",
    imageAlt: "Portrait of Dr. Xiao Zhongye in his Shanghai clinic",
    points: [
      "Doctor-led facial assessment",
      "Anatomy-based planning",
      "Natural expression focus",
      "International patient experience"
    ],
    ctaLabel: "Request a Private Assessment"
  },
  international: {
    enabled: true,
    eyebrow: "International Patient Journey",
    title: "Begin online before planning your visit to Shanghai.",
    description:
      "Online assessment, travel planning, English-speaking assistance and recovery support help make each step clearer for international patients.",
    video: "/videos/facebook-arrival-support-mobile-v2.mp4",
    poster: "/videos/facebook-arrival-support-v21-poster.jpg",
    videoLabel: "International Patient Journey Video",
    steps: [
      { title: "Send Your Information", description: "Complete a short private assessment before planning travel." },
      { title: "Receive Initial Guidance", description: "The team reviews your concerns and previous treatments." },
      { title: "Plan Your Shanghai Visit", description: "Discuss timing, consultation, travel and recovery support." },
      { title: "Confirm the Plan in Person", description: "Dr. Xiao completes the medical evaluation in Shanghai." }
    ],
    ctaLabel: "Start Your Private Assessment"
  },
  faq: {
    enabled: true,
    eyebrow: "Before You Begin",
    title: "Frequently asked questions",
    items: [
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
    ]
  },
  assessment: {
    eyebrow: "Private Online Assessment",
    title: "Tell us what you notice.",
    description:
      "This short two-step form helps the team understand your concerns before discussing photos, travel or the next medical consultation step.",
    benefits: ["Private and confidential", "Doctor-led assessment pathway", "International patient support"],
    concernOptions: ["Jawline", "Jowls", "Lower Face", "Neck", "Previous Fillers", "Other"],
    privacyText: "Your information is used only to respond to your assessment request."
  },
  finalCta: {
    eyebrow: "A quieter way to begin",
    title: "Assessment first. Travel planning second.",
    description:
      "Online assessment provides initial guidance only. Final recommendations require in-person medical evaluation.",
    ctaLabel: "Request a Private Assessment"
  },
  footer: {
    doctorName: "Dr. Xiao Zhongye",
    brandLine: "Dr. Xiao Zhongye | 9D Facelift",
    disclaimer:
      "Information on this page is for reference only. A specific treatment plan must be confirmed after medical consultation. Individual results vary.",
    whatsappLabel: "WhatsApp"
  },
  thankYou: {
    whatsappMessage:
      "Hello, I have submitted the private assessment form for Dr. Xiao's 9D Facelift. I am ready to send my front, side, 45-degree, smile and neck photos.",
    eyebrow: "Assessment Received",
    title: "Thank you. Your request has been submitted.",
    description:
      "Dr. Xiao's team will review your information and contact you through your preferred method. You can now send the requested photos on WhatsApp to help the team prepare initial guidance.",
    whatsappLabel: "Send Photos on WhatsApp",
    returnLabel: "Return to Patient Results",
    checklistTitle: "Photo checklist",
    photoItems: ["Front", "Left Side", "Right Side", "45-Degree", "Smile", "Neck"],
    photoInstructions:
      "Use clear, unfiltered photos in even lighting. Include your age, country, main concerns and any previous facial treatments when you send them.",
    disclaimer:
      "Online assessment provides initial guidance only. Final recommendations require in-person medical evaluation."
  }
};

function mergeObjectList<T extends Record<string, unknown>>(
  value: Array<DeepPartial<T>> | undefined,
  fallback: T[]
): T[] {
  if (!value?.length) return fallback;

  return value.map((item, index) => ({
    ...(fallback[index] || fallback[fallback.length - 1] || {}),
    ...item
  })) as T[];
}

function mergeStringList(value: Array<string | undefined> | undefined, fallback: string[]) {
  const cleaned = value?.filter((item): item is string => Boolean(item?.trim()));
  return cleaned?.length ? cleaned : fallback;
}

export function mergeGoogleAdsLandingPageContent(
  value?: DeepPartial<GoogleAdsLandingPageContent> | null
): GoogleAdsLandingPageContent {
  const fallback = defaultGoogleAdsLandingPageContent;
  const content = value || {};

  return {
    ...fallback,
    ...content,
    hero: {
      ...fallback.hero,
      ...content.hero,
      image: content.hero?.image || fallback.hero.image
    },
    trustItems: mergeObjectList(content.trustItems, fallback.trustItems),
    results: {
      ...fallback.results,
      ...content.results,
      cases: mergeObjectList(content.results?.cases, fallback.results.cases).map((item, index) => ({
        ...item,
        image: item.image || fallback.results.cases[index]?.image || fallback.results.cases[0].image
      }))
    },
    concerns: {
      ...fallback.concerns,
      ...content.concerns,
      items: mergeObjectList(content.concerns?.items, fallback.concerns.items)
    },
    method: {
      ...fallback.method,
      ...content.method,
      points: mergeStringList(content.method?.points, fallback.method.points),
      video: content.method?.video || fallback.method.video,
      poster: content.method?.poster || fallback.method.poster
    },
    comparison: {
      ...fallback.comparison,
      ...content.comparison,
      cards: mergeObjectList(content.comparison?.cards, fallback.comparison.cards).map((card, index) => ({
        ...card,
        points: mergeStringList(content.comparison?.cards?.[index]?.points, fallback.comparison.cards[index]?.points || [])
      }))
    },
    doctor: {
      ...fallback.doctor,
      ...content.doctor,
      points: mergeStringList(content.doctor?.points, fallback.doctor.points),
      image: content.doctor?.image || fallback.doctor.image
    },
    international: {
      ...fallback.international,
      ...content.international,
      steps: mergeObjectList(content.international?.steps, fallback.international.steps),
      video: content.international?.video || fallback.international.video,
      poster: content.international?.poster || fallback.international.poster
    },
    faq: {
      ...fallback.faq,
      ...content.faq,
      items: mergeObjectList(content.faq?.items, fallback.faq.items)
    },
    assessment: {
      ...fallback.assessment,
      ...content.assessment,
      benefits: mergeStringList(content.assessment?.benefits, fallback.assessment.benefits),
      concernOptions: mergeStringList(content.assessment?.concernOptions, fallback.assessment.concernOptions)
    },
    finalCta: { ...fallback.finalCta, ...content.finalCta },
    footer: { ...fallback.footer, ...content.footer },
    thankYou: {
      ...fallback.thankYou,
      ...content.thankYou,
      photoItems: mergeStringList(content.thankYou?.photoItems, fallback.thankYou.photoItems)
    }
  } as GoogleAdsLandingPageContent;
}
