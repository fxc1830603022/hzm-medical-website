import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  Check,
  ClipboardCheck,
  Clock3,
  Globe2,
  LockKeyhole,
  MessageCircle,
  Plane,
  ShieldCheck,
  Sparkles,
  UserRoundCheck
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { GlobalBottomCTA } from "@/components/GlobalBottomCTA";
import { Reveal } from "@/components/Reveal";
import { defaultSettings, getWhatsAppUrl } from "@/lib/site-data";
import type { SiteSettings } from "@/lib/site-types";

type ConsultationFaq = {
  question: string;
  answer: string;
};

type ConsultationPageViewProps = {
  settings?: SiteSettings;
  faqs: ConsultationFaq[];
};

export const consultationPageImage = "/images/home-hero-dr-xiao-consultation-bg.webp";

export const consultationPageSeo = {
  path: "/consultation",
  title: "Online Facelift Consultation | 9D Facelift Assessment in Shanghai",
  description:
    "Start an online facelift consultation before traveling to Shanghai. Send photos for Dr. Xiao's 9D Facelift and Deep Plane Facelift assessment, photo guidance, and international patient planning.",
  image: consultationPageImage
};

export const defaultConsultationFaqs: ConsultationFaq[] = [
  {
    question: "Can I start a facelift consultation before flying to China?",
    answer:
      "Yes. Online assessment is designed for patients who want preliminary direction before traveling to Shanghai. A final surgical plan still requires formal in-person medical consultation."
  },
  {
    question: "What photos should I send for an online facelift assessment?",
    answer:
      "Send clear front, left 45-degree, right 45-degree, left profile, right profile, and neck or jawline photos. Natural light, no filters, and hair tied back help the team evaluate more accurately."
  },
  {
    question: "Will Dr. Xiao personally review my case?",
    answer:
      "Every case is reviewed through Dr. Xiao's clinical team, with senior-team direction for suitability, procedure category, and next-step planning."
  },
  {
    question: "Is online assessment enough to decide surgery?",
    answer:
      "No. Online review gives preliminary direction only. Medical history, physical examination, safety checks, and final consent must happen before any treatment decision."
  },
  {
    question: "Can international patients plan surgery after the online review?",
    answer:
      "The team can help you understand whether an in-person consultation in Shanghai should be considered and what recovery window may be realistic for international travel."
  }
];

const assessmentReasons = [
  {
    icon: Plane,
    title: "Avoid unnecessary travel",
    description:
      "Understand whether a 9D Facelift or Deep Plane Facelift assessment is reasonable before booking flights to Shanghai."
  },
  {
    icon: UserRoundCheck,
    title: "Surgeon-led direction",
    description:
      "Your case is reviewed with clinical judgment, not treated like a generic beauty inquiry or a sales chat."
  },
  {
    icon: ClipboardCheck,
    title: "Clearer procedure path",
    description:
      "Share your facial concerns, recovery window, previous treatments, and goals so the team can suggest a sensible next step."
  },
  {
    icon: LockKeyhole,
    title: "Private photo review",
    description:
      "Your information and photos are used for consultation preparation and handled with confidentiality."
  }
];

const processSteps = [
  {
    title: "Submit your basic information",
    description:
      "Tell us your age group, country, main facial concerns, procedure interest, budget range, and how to contact you."
  },
  {
    title: "Send clear facial photos",
    description:
      "Use WhatsApp or the online form follow-up to send front, profile, 45-degree, neck, and jawline photos."
  },
  {
    title: "Receive preliminary direction",
    description:
      "Dr. Xiao's team reviews whether 9D Facelift, 9D Deep Plane Facelift, or another plan may fit your anatomy and goals."
  },
  {
    title: "Plan the next consultation",
    description:
      "International patients can discuss timing, Shanghai travel, recovery stay, and what must be confirmed in person."
  }
];

const photoGuides = [
  {
    image: "/images/international-photo-guide-01.webp",
    title: "Front relaxed",
    description: "Face forward, relaxed expression, natural light."
  },
  {
    image: "/images/international-photo-guide-02.webp",
    title: "Left 45-degree",
    description: "Show cheek, jawline, and lower-face contour."
  },
  {
    image: "/images/international-photo-guide-03.webp",
    title: "Right 45-degree",
    description: "Keep the same lighting and camera height."
  },
  {
    image: "/images/international-photo-guide-04.webp",
    title: "Side profile",
    description: "Useful for neck laxity, jawline, and chin support."
  },
  {
    image: "/images/international-photo-guide-05.webp",
    title: "Neck and jawline",
    description: "Include the lower face and upper neck clearly."
  },
  {
    image: "/images/international-photo-guide-06.webp",
    title: "No filter, hair back",
    description: "Avoid beauty filters, heavy makeup, and shadows."
  }
];

const trustItems = [
  "Original 9D facial rejuvenation system by Dr. Xiao",
  "Focused on natural-looking lower-face and deep-plane results",
  "International patient planning before arrival in Shanghai",
  "No result guarantee; final plan requires in-person consultation"
];

const supportCards = [
  {
    icon: Globe2,
    title: "International communication",
    description: "Multi-language support can help patients understand timing, photos, and travel preparation."
  },
  {
    icon: CalendarDays,
    title: "Travel window planning",
    description: "Discuss consultation, surgery, early recovery, and follow-up timing before making travel decisions."
  },
  {
    icon: ShieldCheck,
    title: "Medical safety first",
    description: "Online assessment is preliminary. Safety checks and final treatment decisions must be completed in person."
  }
];

export function ConsultationPageView({ settings, faqs }: ConsultationPageViewProps) {
  const safeSettings = { ...defaultSettings, ...settings };
  const whatsappUrl = getWhatsAppUrl(safeSettings);

  return (
    <div className="bg-[#fbf7ef] text-ink">
      <section className="relative isolate flex min-h-screen items-center overflow-hidden bg-[#f8f1e6] px-5 pb-16 pt-36 sm:px-8 lg:px-10 lg:pb-20 lg:pt-32">
        <Image
          src={consultationPageImage}
          alt="Dr. Xiao consultation for online facelift assessment"
          fill
          priority
          sizes="100vw"
          className="z-0 object-cover object-[60%_center]"
        />
        <div className="absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(251,247,239,0.9)_0%,rgba(251,247,239,0.78)_100%)] lg:bg-[linear-gradient(90deg,rgba(251,247,239,0.97)_0%,rgba(251,247,239,0.88)_31%,rgba(251,247,239,0.3)_58%,rgba(251,247,239,0.06)_100%)]" />
        <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_18%_24%,rgba(184,138,59,0.18),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.16),rgba(251,247,239,0.42))]" />
        <div className="pointer-events-none absolute -left-28 top-24 z-10 h-96 w-[36rem] rounded-full border border-bronze/15" />

        <div className="relative z-20 mx-auto grid min-w-0 w-full max-w-[1380px] gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="min-w-0 w-full max-w-[340px] sm:max-w-none">
            <nav className="mb-8 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-graphite/58">
              <Link href="/" className="transition hover:text-bronze">
                Home
              </Link>
              <span className="h-px w-8 bg-bronze/55" />
              <span className="text-bronze">Online Consultation</span>
            </nav>

            <p className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.24em] text-bronze">
              <Sparkles size={15} />
              Dr. Xiao 9D Facelift
            </p>
            <h1 className="mt-6 max-w-full break-words font-display text-[clamp(36px,10vw,96px)] font-semibold leading-[0.96] text-ink sm:max-w-4xl sm:text-[clamp(56px,7vw,96px)]">
              <span className="block">Start Your 9D</span>
              <span className="block">Facelift</span>
              <span className="block text-bronze sm:hidden">Assessment</span>
              <span className="block text-bronze sm:hidden">Online</span>
              <span className="hidden text-bronze sm:block">Assessment Online</span>
            </h1>
            <p className="mt-7 max-w-full text-lg leading-9 text-graphite/82 sm:max-w-2xl sm:text-xl">
              Send your photos before traveling to Shanghai. Dr. Xiao&apos;s team will review your facial concerns and
              recommend the most suitable next step for your 9D Facelift or Deep Plane Facelift journey.
            </p>

            <div className="mt-9 flex w-full max-w-full flex-col gap-4 sm:flex-row">
              <a
                href="#assessment-form"
                className="inline-flex h-14 w-full items-center justify-center gap-3 rounded-md bg-champagne px-7 text-sm font-bold text-ink shadow-[0_18px_46px_rgba(157,123,69,0.24)] transition hover:bg-bronze hover:text-white sm:w-auto"
              >
                Send Photos for Assessment
                <ArrowRight size={18} />
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-14 w-full items-center justify-center gap-3 rounded-md border border-bronze/55 bg-white/70 px-7 text-sm font-bold text-ink backdrop-blur transition hover:border-bronze hover:bg-white sm:w-auto"
              >
                <MessageCircle size={18} />
                Chat on WhatsApp
              </a>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {[
                ["100% private", "Photo review is confidential"],
                ["Surgeon-led", "Clinical direction first"],
                ["Before travel", "Plan Shanghai more clearly"]
              ].map(([title, description]) => (
                <div key={title} className="rounded-md border border-bronze/18 bg-white/64 p-4 shadow-[0_18px_55px_rgba(60,42,22,0.08)] backdrop-blur">
                  <p className="text-sm font-bold text-ink">{title}</p>
                  <p className="mt-2 text-xs leading-5 text-graphite/65">{description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="ml-auto max-w-md rounded-[28px] border border-white/60 bg-white/24 p-5 shadow-[0_30px_90px_rgba(60,42,22,0.16)] backdrop-blur-md">
              <div className="rounded-[22px] border border-white/70 bg-white/38 p-6">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-bronze">Assessment Focus</p>
                <div className="mt-6 grid gap-4">
                  {[
                    "Facelift in China planning",
                    "Deep Plane Facelift suitability",
                    "What photos to send before travel",
                    "International patient recovery timing"
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 rounded-md bg-white/72 px-4 py-3 text-sm font-semibold text-graphite shadow-[0_12px_35px_rgba(60,42,22,0.07)]">
                      <Check className="shrink-0 text-bronze" size={17} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="section-label">Why Online Assessment First</p>
            <h2 className="section-title">
              A serious facelift decision should start with clear information.
            </h2>
            <p className="mt-6 text-base leading-8 text-graphite/72">
              The consultation page is designed for patients comparing facelift in China, 9D Facelift, Deep Plane
              Facelift, and international patient options before they commit to travel.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {assessmentReasons.map((item, index) => {
              const Icon = item.icon;

              return (
                <Reveal key={item.title} delay={index * 0.05}>
                  <article className="h-full rounded-md border border-bronze/18 bg-[#fffdf8] p-7 shadow-[0_18px_60px_rgba(60,42,22,0.08)]">
                    <div className="flex h-12 w-12 items-center justify-center rounded-md bg-[#f7efe2] text-bronze">
                      <Icon size={23} strokeWidth={1.65} />
                    </div>
                    <h3 className="mt-7 font-display text-2xl font-semibold leading-tight text-ink">{item.title}</h3>
                    <p className="mt-4 text-sm leading-7 text-graphite/72">{item.description}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#fffdf8] px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <Reveal direction="right">
            <p className="section-label">How It Works</p>
            <h2 className="section-title">
              From first message to a realistic next step.
            </h2>
            <p className="mt-6 text-base leading-8 text-graphite/72">
              This is not a final diagnosis. It is a structured pre-consultation so the team can understand your facial
              aging pattern, goals, and travel needs before recommending the next conversation.
            </p>
          </Reveal>

          <div className="grid gap-5">
            {processSteps.map((step, index) => (
              <Reveal key={step.title} delay={index * 0.05}>
                <article className="grid gap-5 rounded-md border border-bronze/16 bg-[#fbf7ef] p-6 shadow-[0_16px_50px_rgba(60,42,22,0.07)] sm:grid-cols-[108px_1fr] sm:items-start">
                  <div className="flex items-center gap-4">
                    <span className="font-display text-5xl font-semibold text-bronze/70">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="hidden h-px flex-1 bg-bronze/30 sm:block" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-semibold text-ink">{step.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-graphite/72">{step.description}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="section-label">What Photos To Send</p>
            <h2 className="section-title">
              Better photos make your online facelift consultation more useful.
            </h2>
            <p className="mt-6 text-base leading-8 text-graphite/72">
              Use these angles when you send photos for 9D Facelift assessment. Keep the camera at eye level, use
              natural light, and avoid filters or heavy retouching.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {photoGuides.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.04}>
                <article className="overflow-hidden rounded-md border border-bronze/18 bg-[#fffdf8] shadow-[0_18px_60px_rgba(60,42,22,0.08)]">
                  <div className="relative aspect-[4/3] bg-[#efe5d7]">
                    <Image
                      src={item.image}
                      alt={`${item.title} photo guide for online facelift consultation`}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                    <div className="absolute left-4 top-4 rounded-full bg-white/88 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-bronze">
                      Photo {String(index + 1).padStart(2, "0")}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-2xl font-semibold text-ink">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-graphite/72">{item.description}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fffdf8] px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.04fr_0.96fr] lg:items-center">
          <Reveal direction="right">
            <div className="relative overflow-hidden rounded-[28px] border border-bronze/20 bg-[#f6efe4] p-3 shadow-[0_24px_80px_rgba(60,42,22,0.12)]">
              <div className="relative aspect-[5/4] overflow-hidden rounded-[22px]">
                <Image
                  src="/images/international-patients-hero-consultation.webp"
                  alt="Dr. Xiao surgeon-led consultation"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/62 to-transparent p-6 text-white">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-champagne">Surgeon-led review</p>
                  <p className="mt-2 font-display text-2xl font-semibold">Not a sales consultation.</p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal direction="left">
            <p className="section-label">Doctor-Led Assessment</p>
            <h2 className="section-title">
              The goal is not to sell a procedure. The goal is to understand your face.
            </h2>
            <p className="mt-6 text-base leading-8 text-graphite/75">
              Dr. Xiao&apos;s 9D philosophy focuses on natural facial rejuvenation, deep structural support, and
              preserving personal identity. Online review helps the team decide whether your concerns should move
              toward 9D Facelift, Deep Plane Facelift, non-surgical direction, or in-person examination first.
            </p>
            <div className="mt-8 grid gap-3">
              {trustItems.map((item) => (
                <div key={item} className="flex gap-3 rounded-md border border-bronze/16 bg-[#fbf7ef] px-5 py-4 text-sm font-semibold leading-6 text-graphite">
                  <BadgeCheck className="mt-0.5 shrink-0 text-bronze" size={18} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl rounded-[28px] border border-bronze/18 bg-[#fffdf8] p-6 shadow-[0_24px_80px_rgba(60,42,22,0.10)] sm:p-8 lg:p-12">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <Reveal direction="right">
              <p className="section-label">International Patients</p>
              <h2 className="section-title">
                Planning a facelift in China should feel organized before you arrive.
              </h2>
              <p className="mt-6 text-base leading-8 text-graphite/72">
                For patients outside Shanghai, the consultation page helps collect the details needed for timing,
                communication, and a realistic recovery window. This reduces confusion before international travel.
              </p>
            </Reveal>

            <div className="grid gap-5 md:grid-cols-3">
              {supportCards.map((item, index) => {
                const Icon = item.icon;

                return (
                  <Reveal key={item.title} delay={index * 0.05}>
                    <article className="h-full rounded-md border border-bronze/14 bg-[#fbf7ef] p-6">
                      <Icon className="text-bronze" size={29} strokeWidth={1.55} />
                      <h3 className="mt-5 font-display text-xl font-semibold leading-tight text-ink">{item.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-graphite/70">{item.description}</p>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#fffdf8] px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.78fr_1.22fr]">
          <Reveal direction="right">
            <p className="section-label">FAQ</p>
            <h2 className="section-title">
              Questions before sending your photos?
            </h2>
            <p className="mt-6 text-base leading-8 text-graphite/72">
              These answers help patients understand what online assessment can and cannot do before they submit a
              facelift consultation request.
            </p>
          </Reveal>

          <div className="grid gap-4">
            {faqs.map((faq, index) => (
              <Reveal key={faq.question} delay={index * 0.04}>
                <article className="rounded-md border border-bronze/16 bg-[#fbf7ef] p-6 shadow-[0_16px_48px_rgba(60,42,22,0.06)]">
                  <div className="flex gap-4">
                    <span className="mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-bronze/40 font-display text-sm font-semibold text-bronze">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-display text-2xl font-semibold leading-snug text-ink">{faq.question}</h3>
                      <p className="mt-3 text-sm leading-7 text-graphite/72">{faq.answer}</p>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div id="assessment-form">
        <GlobalBottomCTA settings={safeSettings} source="consultation-online-assessment" />
      </div>

      <section className="bg-[#fbf7ef] px-5 py-16 sm:px-8 lg:py-20">
        <Reveal className="mx-auto flex max-w-5xl flex-col items-center gap-5 text-center">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-bronze/30 bg-white text-bronze">
            <Clock3 size={21} />
          </div>
          <p className="max-w-3xl text-sm leading-7 text-graphite/68">
            Medical note: online assessment is preliminary and educational. Individual results vary, and no surgical
            result can be guaranteed. A final treatment plan requires in-person medical evaluation.
          </p>
        </Reveal>
      </section>
    </div>
  );
}
