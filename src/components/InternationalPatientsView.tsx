import {
  ArrowRight,
  Building2,
  CalendarCheck2,
  Camera,
  CheckCircle2,
  ClipboardCheck,
  Globe2,
  Headphones,
  HeartPulse,
  MessageCircle,
  Plane,
  Stethoscope,
  UserRound
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { LandingFAQ } from "@/lib/landing-pages";
import { defaultSettings, getWhatsAppUrl } from "@/lib/site-data";
import type { SiteSettings } from "@/lib/site-types";
import { InternationalCtaLeadForm } from "./InternationalCtaLeadForm";

type InternationalPatientsViewProps = {
  settings?: SiteSettings;
  faqs?: LandingFAQ[];
};

type RevealProps = {
  children: ReactNode;
  className?: string;
};

function Reveal({ children, className }: RevealProps) {
  return <div className={className}>{children}</div>;
}

const SHOW_VERIFIED_CASE_COUNT = false;

const fallbackFaqs: LandingFAQ[] = [
  {
    question: "Do I need to book flights before the pre-surgery assessment?",
    answer:
      "No. We recommend submitting photos first for an online preliminary assessment. After your suitability and travel window are clearer, you can plan flights and appointments."
  },
  {
    question: "What photos are needed for online assessment?",
    answer:
      "Please send six natural-light photos: front, left side, right side, 45-degree angle, smile or expression, and neck or jawline view. Avoid heavy makeup and keep hair away from the face."
  },
  {
    question: "Can I receive an estimated price online?",
    answer:
      "After you submit complete photos and previous aesthetic treatment history, the team can provide a reference range. Final planning and quotation require in-person medical assessment."
  },
  {
    question: "How long should I stay in Shanghai after surgery?",
    answer:
      "The recommended stay depends on your procedure, recovery condition, and surgeon guidance. After online assessment, the team can advise a more suitable stay window."
  },
  {
    question: "Is an in-person consultation required before surgery?",
    answer:
      "Yes. Online assessment is preliminary. The final surgical plan and treatment decision must be confirmed through an in-person medical consultation."
  },
  {
    question: "Can I have 9D Facelift if I had fillers, threads, or previous surgery?",
    answer:
      "Possibly. Please disclose previous fillers, thread lifts, surgeries, allergies, medications, and health conditions so the team can assess tissue condition and safety."
  },
  {
    question: "How does follow-up work after I return home?",
    answer:
      "You can send recovery photos through WhatsApp. The team can provide remote recovery guidance while urgent medical concerns should always be handled locally."
  },
  {
    question: "Can surgical results be guaranteed?",
    answer:
      "No surgical result can be guaranteed. Results vary by anatomy, aging degree, treatment plan, recovery condition, and personal healing response."
  }
];

const trustPhrases = [
  "Private and confidential assessment",
  "Surgeon-led planning review",
  "No forced in-clinic sales pressure",
  "Long-term remote follow-up support"
];

const advantageCards = [
  {
    icon: Globe2,
    title: "Online First",
    text: "Start your assessment remotely. Save time and travel with clarity."
  },
  {
    icon: UserRound,
    title: "Surgeon-Led Review",
    text: "Dr. Xiao personally reviews your case to provide professional recommendations."
  },
  {
    icon: Plane,
    title: "Travel Clarity",
    text: "Know if you are a good candidate and plan your trip with confidence."
  },
  {
    icon: Headphones,
    title: "Follow-Up Support",
    text: "We support you before, during, and after your journey."
  }
];

const prepItems = [
  "Clear face photos as described below",
  "Medical history and current health condition",
  "Previous fillers, threads, or facial surgery records if any",
  "Expected travel window to Shanghai",
  "Main facial concerns and aesthetic goals"
];

const photoGuide = [
  { label: "Front", image: "/images/international-photo-guide-01.webp" },
  { label: "Front Relaxed", image: "/images/international-photo-guide-02.webp" },
  { label: "Left Side", image: "/images/international-photo-guide-03.webp" },
  { label: "Right Side", image: "/images/international-photo-guide-04.webp" },
  { label: "45 Degree", image: "/images/international-photo-guide-05.webp" },
  { label: "Smile / Expression", image: "/images/international-photo-guide-06.webp" },
  { label: "Neck & Jawline", image: "/images/international-photo-guide-07.webp" }
];

const concernCards = [
  {
    icon: CalendarCheck2,
    title: "Can I be assessed before booking flights?",
    text: "Yes. Please send clear facial photos and medical history first. We will assess online and advise next steps."
  },
  {
    icon: Building2,
    title: "How long should I stay in Shanghai?",
    text: "The stay window depends on the surgical plan, recovery progress, and surgeon guidance."
  },
  {
    icon: MessageCircle,
    title: "Will language support be available?",
    text: "Our international patient support team can coordinate English communication throughout the journey."
  },
  {
    icon: HeartPulse,
    title: "How does follow-up work after I return home?",
    text: "You can send recovery photos online and receive remote recovery guidance from the team."
  }
];

const journeySteps = [
  {
    icon: Camera,
    title: "Send Photos",
    text: "Submit clear facial photos and basic personal information."
  },
  {
    icon: Stethoscope,
    title: "Medical Review",
    text: "The team reviews aging concerns, previous treatments, and health history."
  },
  {
    icon: ClipboardCheck,
    title: "Travel & Consultation Planning",
    text: "We advise stay length, surgery window, and in-person consultation schedule."
  },
  {
    icon: HeartPulse,
    title: "Procedure & Recovery Stay",
    text: "Arrive in Shanghai for consultation, procedure, and early recovery care."
  },
  {
    icon: Plane,
    title: "Follow-Up",
    text: "Continue online recovery communication after returning home."
  }
];

const baseTrustStats = [
  {
    icon: CalendarCheck2,
    value: "27+",
    label: "Years Experience",
    text: "Decades of surgical expertise."
  },
  {
    icon: UserRound,
    value: "9D",
    label: "Facelift Planning System",
    text: "Multi-layer anatomical planning."
  },
  {
    icon: Globe2,
    value: "Global",
    label: "Patient Support",
    text: "Comprehensive support before, during, and after."
  }
];

const trustStats = SHOW_VERIFIED_CASE_COUNT
  ? [
      baseTrustStats[0],
      {
        icon: UserRound,
        value: "10,000+",
        label: "Facial Cases",
        text: "Trusted by thousands of patients worldwide."
      },
      ...baseTrustStats.slice(1)
    ]
  : baseTrustStats;

export function InternationalPatientsView({
  settings,
  faqs = fallbackFaqs
}: InternationalPatientsViewProps) {
  const safeSettings = { ...defaultSettings, ...settings };
  const whatsappUrl = getWhatsAppUrl(safeSettings);
  const visibleFaqs = faqs.length ? faqs : fallbackFaqs;

  return (
    <div className="overflow-x-hidden bg-white text-[#222222]">
      <section className="relative overflow-hidden bg-[#fbf8f2]">
        <div className="grid min-h-[780px] lg:min-h-screen lg:grid-cols-[0.47fr_0.53fr] xl:min-h-[980px]">
          <div className="flex items-center px-5 pb-14 pt-32 sm:px-8 lg:px-12 lg:py-32 xl:px-16">
            <Reveal className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#b28a3d]">
                International Patient Program
              </p>
              <h1 className="mt-5 font-display text-5xl font-semibold leading-[1.02] tracking-tight text-[#222222] sm:text-6xl lg:text-7xl">
                Planning a Facelift in China? Start With Online Assessment First.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-[#222222]/72">
                Send your photos and information before booking flights to Shanghai. Dr. Xiao and
                the team will review and guide you on the best plan for your journey.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <LuxuryButton href={whatsappUrl} variant="gold" external icon={<MessageCircle size={18} />}>
                  Send Photos for Assessment
                </LuxuryButton>
                <LuxuryButton href="#journey" variant="outline" icon={<ArrowRight size={18} />}>
                  See How It Works
                </LuxuryButton>
              </div>
              <div className="mt-9 grid gap-3 sm:grid-cols-2">
                {trustPhrases.map((item) => (
                  <div key={item} className="flex items-start gap-3 text-sm font-semibold text-[#222222]/70">
                    <CheckCircle2 className="mt-0.5 shrink-0 text-[#b28a3d]" size={17} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="relative min-h-[640px] overflow-hidden lg:min-h-full">
            <Image
              src="/images/international-patients-hero-consultation.webp"
              alt="Shanghai 9D facelift online facial assessment for international patients"
              fill
              priority
              sizes="(min-width: 1024px) 53vw, 100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-[#fbf8f2] to-transparent" />
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-5 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-3 md:grid-cols-2 lg:grid-cols-4">
          {advantageCards.map((item) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} className="rounded-lg border border-[#d8c7a8]/55 bg-white p-6 shadow-[0_14px_50px_rgba(34,34,34,0.04)]">
                <div className="flex items-start gap-5">
                  <Icon className="mt-1 shrink-0 text-[#b28a3d]" size={38} strokeWidth={1.45} />
                  <div>
                    <h2 className="font-display text-xl font-semibold leading-tight text-[#222222]">
                      {item.title}
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-[#222222]/70">{item.text}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="bg-white px-5 py-4 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal className="relative min-h-[360px] overflow-hidden rounded-lg bg-[#f5f5f3]">
            <Image
              src="/images/dr-xiao-scrubs-portrait.jpg"
              alt="Dr. Xiao reviewing Shanghai facelift medical assessment before travel"
              fill
              sizes="(min-width: 1024px) 54vw, 100vw"
              className="object-cover object-[50%_18%]"
            />
          </Reveal>
          <Reveal className="rounded-lg border border-[#d8c7a8]/55 bg-[#fbf8f2] p-7 sm:p-9">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#b28a3d]">Before You Book Flights</p>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-[#222222] sm:text-4xl">
              Before You Book Flights
            </h2>
            <p className="mt-4 text-base leading-7 text-[#222222]/70">
              Prepare these details first so the medical team can give more accurate preliminary
              guidance before you arrange travel.
            </p>
            <div className="mt-6 space-y-3">
              {prepItems.map((item) => (
                <div key={item} className="flex items-start gap-3 text-sm font-semibold text-[#222222]/76">
                  <CheckCircle2 className="mt-0.5 shrink-0 text-[#b28a3d]" size={18} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-7">
              <LuxuryButton href="#photos" variant="gold">
                What Photos Should I Send?
              </LuxuryButton>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="photos" className="bg-white px-5 py-4 sm:px-8">
        <div className="mx-auto max-w-7xl rounded-lg border border-[#d8c7a8]/55 bg-white p-5 sm:p-7">
          <Reveal className="text-center">
            <h2 className="font-display text-3xl font-semibold leading-tight text-[#222222] sm:text-4xl">
              What Photos Should You Send?
            </h2>
          </Reveal>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-7">
            {photoGuide.map((photo, index) => (
              <Reveal key={photo.label} className="overflow-hidden rounded-md bg-[#f5f5f3]">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={photo.image}
                    alt={`${photo.label} photo for online 9D facelift assessment`}
                    fill
                    sizes="(min-width: 1024px) 16vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover object-center"
                  />
                </div>
                <div className="flex items-center gap-2 px-3 py-3">
                  <span className="grid size-6 place-items-center rounded-full bg-[#b28a3d] text-xs font-bold text-white">
                    {index + 1}
                  </span>
                  <span className="text-sm font-semibold text-[#222222]">{photo.label}</span>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-5 text-center text-sm text-[#222222]/68">
            Please use natural lighting, avoid heavy makeup, tie your hair back, and keep the face relaxed.
          </p>
        </div>
      </section>

      <section className="bg-white px-5 py-6 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-2 lg:grid-cols-4">
          {concernCards.map((item) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} className="rounded-lg border border-[#d8c7a8]/55 bg-white p-6">
                <Icon className="text-[#b28a3d]" size={32} strokeWidth={1.45} />
                <h2 className="mt-5 font-display text-xl font-semibold leading-tight text-[#222222]">
                  {item.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-[#222222]/70">{item.text}</p>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section id="journey" className="bg-white px-5 py-6 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal className="text-center">
            <h2 className="font-display text-3xl font-semibold leading-tight text-[#222222] sm:text-4xl">
              Your International Journey (5 Steps)
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-8 lg:grid-cols-5 lg:gap-5">
            {journeySteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <Reveal key={step.title} className="relative text-center">
                  <div className="mx-auto grid size-10 place-items-center rounded-full bg-[#b28a3d] text-sm font-bold text-white">
                    {index + 1}
                  </div>
                  <Icon className="mx-auto mt-6 text-[#222222]" size={34} strokeWidth={1.35} />
                  <h3 className="mt-4 font-display text-xl font-semibold leading-tight text-[#222222]">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-[#222222]/68">{step.text}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-6 sm:px-8">
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-lg border border-[#d8c7a8]/55 bg-[#fbf8f2] lg:grid-cols-[0.42fr_0.58fr]">
          <Reveal className="relative min-h-[360px] bg-[#f5f5f3]">
            <Image
              src="/images/dr-xiao-scrubs-portrait.jpg"
              alt="Dr. Xiao 9D facelift surgeon for international patients"
              fill
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="object-cover object-[50%_14%]"
            />
          </Reveal>
          <Reveal className="p-7 text-center sm:p-10">
            <h2 className="font-display text-3xl font-semibold leading-tight text-[#222222] sm:text-4xl">
              Dr. Xiao's 9D Facelift for International Patients
            </h2>
            <p className="mt-3 text-lg text-[#222222]/70">Experience. Precision. Natural Results.</p>
            <div className={`mt-9 grid gap-6 ${trustStats.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
              {trustStats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="border-t border-[#d8c7a8]/65 pt-6">
                    <Icon className="mx-auto text-[#b28a3d]" size={34} strokeWidth={1.45} />
                    <p className="mt-4 font-display text-3xl font-semibold text-[#222222]">{stat.value}</p>
                    <h3 className="mt-2 text-xs font-bold uppercase tracking-[0.16em] text-[#222222]">
                      {stat.label}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-[#222222]/68">{stat.text}</p>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white px-5 py-6 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal className="text-center">
            <h2 className="font-display text-3xl font-semibold leading-tight text-[#222222] sm:text-4xl">
              Common Questions
            </h2>
          </Reveal>
          <div className="mt-7 grid gap-4 lg:grid-cols-2">
            {visibleFaqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-md border border-[#d8c7a8]/55 bg-white px-5 py-4"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-[#222222]">
                  <span>{faq.question}</span>
                  <span className="text-xl leading-none text-[#b28a3d] transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 text-sm leading-6 text-[#222222]/68">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="online-assessment" className="relative overflow-hidden bg-porcelain px-5 py-14 sm:px-8 lg:py-16">
        <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[0.72fr_1fr]">
          <Reveal>
            <h2 className="font-display text-4xl font-semibold leading-tight text-ink">
              Have Questions?
              <span className="block">We&apos;re Here to Help</span>
            </h2>
            <p className="mt-4 max-w-md text-sm leading-7 text-graphite/72">
              Our team will provide a personalized consultation plan based on your goals and facial anatomy.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/consultation"
                className="inline-flex h-11 items-center justify-center rounded-md bg-champagne px-5 text-sm font-bold text-ink transition hover:bg-bronze hover:text-white"
              >
                Book Online Consultation
              </Link>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-ink/12 px-5 text-sm font-bold text-bronze transition hover:border-bronze"
              >
                WhatsApp Consultation <ArrowRight size={15} />
              </a>
            </div>
          </Reveal>
          <Reveal>
            <InternationalCtaLeadForm />
          </Reveal>
        </div>
      </section>
    </div>
  );
}

type LuxuryButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "gold" | "outline";
  icon?: ReactNode;
  external?: boolean;
};

function LuxuryButton({ href, children, variant = "gold", icon, external = false }: LuxuryButtonProps) {
  const classes = {
    gold: "border border-[#C8B898] bg-[#C8B898] text-[#222222] hover:bg-[#b6a37d] hover:border-[#b6a37d]",
    outline: "border border-[#C8B898] bg-white/70 text-[#b28a3d] hover:bg-[#C8B898] hover:text-[#222222]"
  };
  const className = `inline-flex min-h-12 items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-bold transition ${classes[variant]}`;
  const content = (
    <>
      {icon}
      <span>{children}</span>
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}
