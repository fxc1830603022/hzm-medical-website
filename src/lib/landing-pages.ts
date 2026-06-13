export type LandingStat = {
  value: string;
  label: string;
};

export type LandingFeature = {
  title: string;
  description: string;
};

export type LandingSection = {
  eyebrow: string;
  title: string;
  description?: string;
  layout?: "cards" | "timeline" | "split";
  items: LandingFeature[];
};

export type LandingFAQ = {
  question: string;
  answer: string;
};

export type LandingPageData = {
  path: string;
  breadcrumb: string;
  eyebrow: string;
  title: string;
  accent: string;
  intro: string;
  description: string;
  image: string;
  imageAlt: string;
  primaryCta: string;
  primaryHref: string;
  secondaryCta?: string;
  secondaryHref?: string;
  stats: LandingStat[];
  heroCard?: {
    eyebrow: string;
    title: string;
    items: string[];
    note: string;
  };
  lead: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    highlights: string[];
  };
  sections: LandingSection[];
  faqs: LandingFAQ[];
  finalCta: {
    eyebrow: string;
    title: string;
    description: string;
    button: string;
    href: string;
  };
  seo: {
    title: string;
    description: string;
  };
};

export const landingPages: Record<string, LandingPageData> = {
  doctor: {
    path: "/doctor",
    breadcrumb: "Doctor",
    eyebrow: "Doctor Profile",
    title: "Dr. Xiao Zhongye",
    accent: "Charm Preservation Surgeon",
    intro:
      "A facial rejuvenation practice built around anatomical planning, natural movement, and the refusal of assembly-line beauty.",
    description:
      "Meet Dr. Xiao Zhongye, founder of the 9D Lifting System, focused on natural facelift results, deep anatomical safety, and international patient care.",
    image: "/images/896412cd7db178d8aff7975c761cf596.jpg",
    imageAlt: "Dr. Xiao Zhongye 9D Facelift",
    primaryCta: "Book a 1-on-1 Online Consultation",
    primaryHref: "/consultation",
    secondaryCta: "View Natural Case Results",
    secondaryHref: "/before-after",
    stats: [
      { value: "9D", label: "Exclusive lifting system" },
      { value: "3N", label: "No nerve, scar, fake look" },
      { value: "Global", label: "International patients" }
    ],
    lead: {
      eyebrow: "Professional Focus",
      title: "Natural facelift results start with preserving identity.",
      paragraphs: [
        "Dr. Xiao's 9D Lifting System is designed for patients who want meaningful rejuvenation without looking pulled, frozen, or unfamiliar.",
        "The planning process studies facial anatomy, aging pattern, ethnic structure, expression, prior treatments, and the patient's own sense of beauty before choosing a surgical direction."
      ],
      highlights: [
        "Deep structural planning rather than surface skin pulling.",
        "Low-tension incision strategy for discreet scar management.",
        "Aesthetic restraint: the goal is a younger version of the same face."
      ]
    },
    sections: [
      {
        eyebrow: "Surgical Philosophy",
        title: "The 3N standard is the operating promise.",
        items: [
          {
            title: "No Nerve Damage",
            description:
              "Deep work is planned around safe anatomical zones. Nerve safety must be discussed clearly before surgery."
          },
          {
            title: "No Visible Scars",
            description:
              "Incisions are designed for concealment around natural folds, hairline transitions, and low-tension closure."
          },
          {
            title: "No Fake Look",
            description:
              "The result should keep the patient's dynamic smile, expression, and recognizable character."
          }
        ]
      },
      {
        eyebrow: "International Experience",
        title: "Different faces age differently.",
        description:
          "International patients often bring different facial structures, skin thickness, bone support, and aesthetic expectations. The plan must respect those differences.",
        items: [
          {
            title: "Anatomy-based planning",
            description:
              "The procedure level is selected after reviewing laxity, tissue descent, skin quality, neck condition, and previous treatments."
          },
          {
            title: "Natural motion",
            description:
              "Charm preservation prioritizes expression and movement, not a mask-like tightness."
          },
          {
            title: "Clear risk disclosure",
            description:
              "Swelling, scars, nerve safety, anesthesia, recovery, and realistic expectations need a formal medical conversation."
          }
        ]
      }
    ],
    faqs: [
      {
        question: "What photos should I send before consultation?",
        answer:
          "Front, side, 45-degree, smiling, and neck/jawline photos in natural lighting are the most useful starting point."
      },
      {
        question: "Can Dr. Xiao assess international patients online?",
        answer:
          "Yes. Online assessment can provide preliminary direction, but the final surgical plan must be confirmed through medical consultation."
      }
    ],
    finalCta: {
      eyebrow: "Best Next Step",
      title: "Start with a structured online assessment.",
      description:
        "Send clear photos and previous treatment history so the team can advise whether 9D Facelift, 9D Deep Plane Facelift, or another plan is more suitable.",
      button: "Send Photos for Online Assessment",
      href: "/consultation"
    },
    seo: {
      title: "Dr. Xiao Zhongye | 9D Facelift Surgeon for Natural Results",
      description:
        "Meet Dr. Xiao Zhongye, founder of the 9D Lifting System, focused on natural facelift results, deep anatomical safety, and international patient care."
    }
  },
  "9d-facelift": {
    path: "/procedures/9d-facelift",
    breadcrumb: "9D Facelift",
    eyebrow: "Signature Procedure",
    title: "9D Facelift",
    accent: "Natural Rejuvenation, No Fake-Look",
    intro:
      "9D Facelift, also known as the 9D Lifting System, is Dr. Xiao's proprietary facelift planning approach for suitable mild to moderate facial aging, designed to refresh the face while preserving the patient's own charm, expression, and identity.",
    description:
      "9D Facelift by Dr. Xiao focuses on charm preservation, customized incision planning, and natural movement for suitable mild to moderate facial aging.",
    image: "/images/gallery-ai-02.jpeg",
    imageAlt: "Natural 9D facelift result",
    primaryCta: "Check If 9D Facelift Fits You",
    primaryHref: "/consultation",
    secondaryCta: "View Natural Results",
    secondaryHref: "/before-after",
    stats: [
      { value: "Only 9D", label: "Dr. Xiao proprietary planning" },
      { value: "3N", label: "No nerve, scar, fake-look standard" },
      { value: "Custom", label: "Incision and depth by anatomy" }
    ],
    heroCard: {
      eyebrow: "Online Suitability Check",
      title: "Not sure if you need 9D Facelift or Deep Plane?",
      items: [
        "Early jowls, nasolabial folds, or tired lower-face contour",
        "Want a smaller, discreet incision when anatomy allows",
        "Have thread-lift or filler history and need a real assessment"
      ],
      note: "Send clear front, side, 45-degree, smile, and neck photos for preliminary direction before making travel plans."
    },
    lead: {
      eyebrow: "First Decision",
      title: "The real question is not 'How small is the incision?' It is 'Which plan fits your anatomy?'",
      paragraphs: [
        "Many patients searching for a facelift want youth without losing their own face. 9D Facelift is built around that decision: refresh the aging structure while avoiding the over-pulled, unfamiliar look.",
        "For suitable patients with early to moderate laxity, the plan can focus on discreet incision placement, natural lifting direction, and charm preservation. For heavier neck laxity or deeper descent, Dr. Xiao may recommend 9D Deep Plane Facelift instead."
      ],
      highlights: [
        "Best considered for mild to moderate facial aging after photo review.",
        "Different from thread lift: this is surgical structural planning, not temporary thread support.",
        "The goal is a younger version of the same face, not a standardized beauty template."
      ]
    },
    sections: [
      {
        eyebrow: "Core Advantage",
        title: "Why patients choose 9D Facelift instead of assembly-line anti-aging.",
        items: [
          {
            title: "Charm Preservation",
            description:
              "The desired result is recognizable rejuvenation: the face looks rested and younger, but expression, smile, and personal character remain believable."
          },
          {
            title: "Customized incision planning",
            description:
              "For suitable 9D Facelift patients, incision strategy can be planned around the hairline and natural contours. The final design depends on anatomy and skin laxity."
          },
          {
            title: "Depth matched to the face",
            description:
              "The procedure level is selected after reviewing facial foundation, aging degree, previous treatments, budget, and available recovery time."
          }
        ]
      },
      {
        eyebrow: "3N Standard",
        title: "The operating promise: safer planning, discreet scars, no fake-look.",
        description:
          "All surgery has risk, so these standards must be discussed seriously in consultation. The 3N rule is the direction of Dr. Xiao's planning and execution.",
        items: [
          {
            title: "No nerve damage mindset",
            description:
              "Deep work is planned around safer anatomical zones and careful dissection. Nerve safety must be part of the medical conversation before surgery."
          },
          {
            title: "No visible scar focus",
            description:
              "Low-tension closure and incision concealment are used to reduce obvious scarring around hairline transitions and natural folds when anatomy allows."
          },
          {
            title: "No fake-look result",
            description:
              "The lift direction is designed to avoid the wind-pulled face and preserve natural dynamic expression rather than chasing maximum tightness."
          }
        ]
      },
      {
        eyebrow: "Decision Guide",
        title: "9D Facelift is not a thread lift, and it is not the same plan for every patient.",
        description:
          "Google and patients both need clear answers. This page should help visitors understand what 9D Facelift is, who it may suit, and why a formal assessment matters.",
        items: [
          {
            title: "Not temporary thread support",
            description:
              "Some clinics use the word 9D loosely. Dr. Xiao's 9D Facelift is positioned as surgical facial rejuvenation planning, not a short-lived thread-lift label."
          },
          {
            title: "Not always the smallest cut",
            description:
              "The incision is customized. A smaller-looking plan is only appropriate when it can still address the patient's real aging pattern safely."
          },
          {
            title: "Not a one-price menu item",
            description:
              "Facial structure, ethnic anatomy, previous procedures, travel plan, and recovery time all influence the recommendation and quote."
          }
        ]
      }
    ],
    faqs: [
      {
        question: "What is 9D Facelift?",
        answer:
          "9D Facelift is Dr. Xiao's proprietary facelift planning system for suitable facial aging concerns. It focuses on charm preservation, anatomy-based lifting direction, discreet incision planning, and natural expression."
      },
      {
        question: "Is 9D Facelift the same as thread lift?",
        answer:
          "No. A thread lift gives temporary support for selected patients. 9D Facelift is positioned as surgical structural planning and should be evaluated through medical consultation."
      },
      {
        question: "Will 9D Facelift leave visible scars?",
        answer:
          "Incisions are planned for concealment and low-tension closure when anatomy allows, but scar healing varies by patient. Scar risk and aftercare must be discussed before surgery."
      }
    ],
    finalCta: {
      eyebrow: "Personalized 9D Assessment",
      title: "Find out whether 9D Facelift is enough, or whether you need a deeper plan.",
      description:
        "Send photos, goals, prior treatments, budget, country, and recovery timing. The first step is to match the procedure to your face before you commit to travel or surgery.",
      button: "Submit a 9D Facelift Assessment",
      href: "/consultation"
    },
    seo: {
      title: "9D Facelift in China | Natural Facelift by Dr. Xiao",
      description:
        "Explore 9D Facelift by Dr. Xiao: charm preservation, natural movement, customized incision planning, and online assessment for international patients."
    }
  },
  "9d-deep-plane-facelift": {
    path: "/procedures/9d-deep-plane-facelift",
    breadcrumb: "9D Deep Plane Facelift",
    eyebrow: "Signature Procedure",
    title: "9D Deep Plane Facelift",
    accent: "Deep Structural Remodeling for Advanced Aging",
    intro:
      "For heavier jowls, neck laxity, and deeper tissue descent, the strategy shifts from surface tightening to structural repositioning.",
    description:
      "9D Deep Plane Facelift is Dr. Xiao's deeper structural approach for severe facial and neck laxity, designed for natural results without a pulled look.",
    image: "/images/gallery-case-02.jpg",
    imageAlt: "9D Deep Plane Facelift result",
    primaryCta: "Send Photos for Online Assessment",
    primaryHref: "/consultation",
    secondaryCta: "Read Recovery Articles",
    secondaryHref: "/blog",
    stats: [
      { value: "Deep", label: "Structural support" },
      { value: "Neck", label: "Jowls and laxity" },
      { value: "Stable", label: "Longer-term planning" }
    ],
    lead: {
      eyebrow: "How It Differs",
      title: "Deep plane work addresses the cause, not only the loose skin.",
      paragraphs: [
        "Traditional skin-pulling can create tightness without correcting the deeper cause of aging. 9D Deep Plane Facelift is designed to release and reposition deeper support structures.",
        "The aim is not maximum tightness. The aim is stable support, safer dissection, natural expression, and a result that does not announce surgery."
      ],
      highlights: [
        "For advanced lower-face and neck laxity.",
        "Designed around deep anatomical judgment.",
        "Recovery and nerve safety must be discussed carefully."
      ]
    },
    sections: [
      {
        eyebrow: "Suitable Concerns",
        title: "When the problem is deep, the plan must be deeper.",
        items: [
          {
            title: "Heavy jowls",
            description:
              "Lower-face heaviness often comes from deeper tissue descent, not skin alone."
          },
          {
            title: "Neck laxity",
            description:
              "Loose neck skin or visible banding may need a deeper, more comprehensive plan."
          },
          {
            title: "Thread-lift disappointment",
            description:
              "Short-lived thread results may indicate that temporary support is not enough."
          }
        ]
      },
      {
        eyebrow: "Risk and Recovery",
        title: "A serious procedure requires a serious conversation.",
        description:
          "Deep plane surgery requires advanced anatomical judgment. Swelling, nerve irritation, scars, anesthesia, asymmetry, and healing timelines must be reviewed before any decision.",
        items: [
          {
            title: "Nerve safety",
            description:
              "Temporary or lasting nerve issues are possible risks and must be part of informed consent."
          },
          {
            title: "Day 1 to Day 90 recovery",
            description:
              "Patients need realistic expectations around swelling, incision care, and staged follow-up."
          },
          {
            title: "Not for everyone",
            description:
              "Uncontrolled medical conditions or unrealistic goals may make elective facelift surgery unsuitable."
          }
        ]
      }
    ],
    faqs: [
      {
        question: "Is deep plane always better?",
        answer:
          "No. It is suitable for specific aging patterns. Some patients need a smaller plan, while others need deeper remodeling."
      },
      {
        question: "Will the scar be longer?",
        answer:
          "It may be longer than a smaller facelift, but the design focuses on concealment within natural ear folds and hairline transitions."
      }
    ],
    finalCta: {
      eyebrow: "Procedure Matching",
      title: "Ask whether you need 9D Facelift or deep plane remodeling.",
      description:
        "Send your photos and treatment history so the team can judge whether deeper structural work is appropriate.",
      button: "Ask If You Are Suitable for 9D Lifting",
      href: "/consultation"
    },
    seo: {
      title: "9D Deep Plane Facelift | Natural Deep Structural Remodeling",
      description:
        "9D Deep Plane Facelift is Dr. Xiao's deeper structural approach for severe facial and neck laxity, designed for natural results without a pulled look."
    }
  },
  "before-after": {
    path: "/before-after",
    breadcrumb: "Before & After",
    eyebrow: "Case Gallery",
    title: "Deep Plane Facelift Before and After",
    accent: "Natural Results, Not a New Face",
    intro:
      "Case examples should educate the eye: the best result looks refreshed, proportionate, and still emotionally recognizable.",
    description:
      "View natural-looking 9D Facelift and 9D Deep Plane Facelift case examples with age range, concern, treatment plan, and recovery notes.",
    image: "/images/gallery-ai-05.jpeg",
    imageAlt: "Natural 9D before and after case",
    primaryCta: "Send Photos for Online Assessment",
    primaryHref: "/consultation",
    secondaryCta: "Explore Deep Plane",
    secondaryHref: "/procedures/9d-deep-plane-facelift",
    stats: [
      { value: "40s-60s", label: "Common age range" },
      { value: "Natural", label: "Identity preserved" },
      { value: "Varies", label: "Individual healing" }
    ],
    lead: {
      eyebrow: "How to Read Cases",
      title: "Before-and-after photos are guidance, not guarantees.",
      paragraphs: [
        "Cases should be viewed as educational examples. Individual surgical plans, healing speed, swelling, scar behavior, and final results vary by anatomy and recovery.",
        "The most valuable comparison is not only tighter skin. Look for jawline balance, midface support, neck smoothness, expression, and whether the person still looks like themselves."
      ],
      highlights: [
        "Suitability depends more on anatomy than age alone.",
        "Naturalness is judged by expression, not only angle.",
        "A formal consultation is required before treatment decisions."
      ]
    },
    sections: [
      {
        eyebrow: "Common Concerns",
        title: "What patients usually want to improve.",
        items: [
          {
            title: "Jowls and lower-face heaviness",
            description:
              "Structural descent can blur the jawline and create a tired lower-face contour."
          },
          {
            title: "Nasolabial folds",
            description:
              "Folds may deepen when midface support descends, not simply because skin is loose."
          },
          {
            title: "Neck laxity",
            description:
              "A refined neck often requires thoughtful planning rather than surface tightening alone."
          }
        ]
      },
      {
        eyebrow: "Result Standard",
        title: "The 9D standard is recognizable rejuvenation.",
        description:
          "A case is successful when the person looks rested, supported, and natural without losing facial identity.",
        items: [
          {
            title: "Expression preserved",
            description:
              "Smile and facial movement should remain believable and personal."
          },
          {
            title: "No wind-pulled face",
            description:
              "The lift direction should not make the face look stretched or artificial."
          },
          {
            title: "Balanced improvement",
            description:
              "The face, jawline, and neck should improve together rather than in isolated fragments."
          }
        ]
      }
    ],
    faqs: [
      {
        question: "Can I expect the same result as another patient?",
        answer:
          "No. Results depend on anatomy, skin quality, health status, lifestyle, aftercare, and surgical plan."
      },
      {
        question: "What should I send for case review?",
        answer:
          "Send clear facial and neck photos, your age range, major concerns, and any previous treatments."
      }
    ],
    finalCta: {
      eyebrow: "Case Review",
      title: "Understand which 9D approach may fit your own case.",
      description:
        "A personalized assessment is the safest way to compare procedure options and set realistic expectations.",
      button: "Get a Personalized Case Assessment",
      href: "/consultation"
    },
    seo: {
      title: "Deep Plane Facelift Before and After | Natural 9D Results",
      description:
        "View natural-looking 9D Facelift and 9D Deep Plane Facelift case examples with age range, concern, treatment plan, and recovery notes."
    }
  },
  "international-patients": {
    path: "/international-patients",
    breadcrumb: "International Patients",
    eyebrow: "Global Patient Guide",
    title: "Traveling to China for Facelift Surgery",
    accent: "How 9D Online Assessment Works",
    intro:
      "Cross-border surgery needs clarity before travel: photos, medical history, timing, translation, recovery stay, and follow-up.",
    description:
      "International patient guide for 9D Facelift in China: online assessment, photos to send, travel stay, translation, follow-up, cost range, and risks.",
    image: "/images/896412cd7db178d8aff7975c761cf596.jpg",
    imageAlt: "International patient planning for 9D facelift in China",
    primaryCta: "Start Online Assessment",
    primaryHref: "/consultation",
    secondaryCta: "Review Cost Factors",
    secondaryHref: "/blog",
    stats: [
      { value: "5 steps", label: "Assessment process" },
      { value: "Remote", label: "Preliminary review" },
      { value: "Follow-up", label: "Post-op guidance" }
    ],
    lead: {
      eyebrow: "International Process",
      title: "The safest overseas journey starts before booking flights.",
      paragraphs: [
        "International patients need a structured path: send assessment photos, share medical and treatment history, receive preliminary direction, plan travel and recovery, then follow a clear post-operative schedule.",
        "The consultation should clarify procedure suitability, recovery expectations, possible risks, communication support, and travel timing."
      ],
      highlights: [
        "Start with photos before making travel decisions.",
        "Share medication, allergies, prior procedures, and health conditions.",
        "Allow enough time for pre-op checks, surgery, early recovery, and follow-up."
      ]
    },
    sections: [
      {
        eyebrow: "Assessment Steps",
        title: "A calm, organized path for overseas patients.",
        layout: "timeline",
        items: [
          {
            title: "Send assessment photos",
            description:
              "Front, side, 45-degree, smiling, and neck views in good lighting help the team understand anatomy."
          },
          {
            title: "Share treatment history",
            description:
              "Mention thread lifts, fillers, prior surgery, allergies, medications, and medical conditions."
          },
          {
            title: "Receive preliminary direction",
            description:
              "The team can explain whether 9D Facelift, 9D Deep Plane Facelift, or another plan may be suitable."
          },
          {
            title: "Plan travel and recovery",
            description:
              "International patients should allow time for consultation, pre-op checks, surgery, early recovery, and follow-up."
          },
          {
            title: "Remote follow-up",
            description:
              "Post-operative communication helps monitor swelling, incision care, and recovery milestones."
          }
        ]
      },
      {
        eyebrow: "Travel Questions",
        title: "What overseas patients usually ask.",
        items: [
          {
            title: "How many days should I stay?",
            description:
              "The recommended stay depends on procedure depth, anesthesia, health status, and early swelling."
          },
          {
            title: "Is translation available?",
            description:
              "Communication support can be arranged so important assessment and follow-up details are not missed."
          },
          {
            title: "Can cost be quoted online?",
            description:
              "A preliminary range may be discussed after photo review, but final planning requires medical assessment."
          }
        ]
      }
    ],
    faqs: [
      {
        question: "Should I book flights before assessment?",
        answer:
          "No. Start with photos and medical history first, then plan travel only after preliminary direction."
      },
      {
        question: "What photos are most useful?",
        answer:
          "Front, left side, right side, left 45-degree, right 45-degree, smiling, jawline, and neck photos are recommended."
      }
    ],
    finalCta: {
      eyebrow: "Before You Travel",
      title: "Cross-border surgery should never be rushed.",
      description:
        "Start with a structured assessment and a realistic recovery plan before making travel decisions.",
      button: "Get a Personalized Anti-Aging Plan",
      href: "/consultation"
    },
    seo: {
      title: "Facelift in China for International Patients | 9D Online Consultation",
      description:
        "International patient guide for 9D Facelift in China: online assessment, photos to send, travel stay, translation, follow-up, cost range, and risks."
    }
  },
  consultation: {
    path: "/consultation",
    breadcrumb: "Consultation",
    eyebrow: "Online Assessment",
    title: "Send Photos for a Personalized",
    accent: "9D Facelift Assessment",
    intro:
      "Online assessment helps determine whether 9D Facelift, 9D Deep Plane Facelift, or another plan may fit your anatomy, goals, recovery time, and travel schedule.",
    description:
      "Book a 1-on-1 online consultation for 9D Facelift. Send photos, goals, previous treatment history, and travel schedule for personalized assessment.",
    image: "/images/gallery-ai-03.jpeg",
    imageAlt: "Online 9D facelift consultation",
    primaryCta: "Start the Form",
    primaryHref: "#assessment-form",
    secondaryCta: "WhatsApp Online Assessment",
    secondaryHref: "#whatsapp",
    stats: [
      { value: "Photos", label: "Front, side, 45-degree" },
      { value: "History", label: "Prior treatments" },
      { value: "Plan", label: "Next-step guidance" }
    ],
    lead: {
      eyebrow: "What to Prepare",
      title: "The better the information, the safer the direction.",
      paragraphs: [
        "A useful online assessment needs more than a short message. Clear photos, treatment history, medical details, and travel timing help the team understand whether a procedure is suitable.",
        "For international patients, include your country, expected travel window, and how many days you can stay for surgery and follow-up."
      ],
      highlights: [
        "Front, left side, right side, and 45-degree facial photos.",
        "Smiling photo plus neck and jawline photo in natural lighting.",
        "Age range, main concerns, desired result, and prior treatments."
      ]
    },
    sections: [
      {
        eyebrow: "Fastest Route",
        title: "WhatsApp is usually the quickest way to begin.",
        items: [
          {
            title: "Send photos directly",
            description:
              "Use WhatsApp when you want the fastest scheduling guidance and photo review."
          },
          {
            title: "Use the form for structured details",
            description:
              "The form is useful for goals, previous treatments, medical history, and travel planning."
          },
          {
            title: "Wait for team direction",
            description:
              "The team will advise whether a formal consultation and surgical plan should be considered."
          }
        ]
      }
    ],
    faqs: [
      {
        question: "Can I get a final plan online?",
        answer:
          "Online assessment gives preliminary direction. A final surgical plan requires formal medical consultation."
      },
      {
        question: "What if I am not sure which procedure I need?",
        answer:
          "Choose 'Not sure' in the form and describe your concerns. The team can guide you toward the right assessment path."
      }
    ],
    finalCta: {
      eyebrow: "Start Now",
      title: "Begin with photos, goals, and treatment history.",
      description:
        "Your first message does not need to be perfect. Clear photos and honest history are the most important starting point.",
      button: "Submit Online Assessment Request",
      href: "#assessment-form"
    },
    seo: {
      title: "Online Facelift Consultation | Send Photos for 9D Assessment",
      description:
        "Book a 1-on-1 online consultation for 9D Facelift. Send photos, goals, previous treatment history, and travel schedule for personalized assessment."
    }
  }
};

export const procedureLandingSlugs = ["9d-facelift", "9d-deep-plane-facelift"] as const;

export const landingPagePaths = [
  "/doctor",
  "/procedures/9d-facelift",
  "/procedures/9d-deep-plane-facelift",
  "/before-after",
  "/international-patients",
  "/consultation"
];

export function getLandingPage(slug: string) {
  return landingPages[slug] || null;
}
