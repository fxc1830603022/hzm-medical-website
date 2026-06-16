import {
  ArrowRight,
  Building2,
  CalendarCheck2,
  CheckCircle2,
  Globe2,
  HeartHandshake,
  Languages,
  MessageCircle,
  Plane,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Video
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { LandingFAQ } from "@/lib/landing-pages";
import { defaultSettings, getWhatsAppUrl } from "@/lib/site-data";
import type { SiteSettings } from "@/lib/site-types";
import { ContactForm } from "./ContactForm";

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

const fallbackFaqs: LandingFAQ[] = [
  {
    question: "How long should I stay in China?",
    answer:
      "The recommended stay depends on the procedure plan, swelling, incision care, and follow-up needs. A realistic window is discussed after your online assessment."
  },
  {
    question: "Can I travel alone?",
    answer:
      "Some patients travel independently, while others prefer a companion. The team can help you understand what support is recommended for your treatment and recovery plan."
  },
  {
    question: "When can I fly home?",
    answer:
      "Departure timing should be planned around early recovery, swelling, and surgeon follow-up. Do not book return flights until your recommended recovery window is clear."
  },
  {
    question: "Do you provide English support?",
    answer:
      "English consultation and coordination support can be arranged so international patients understand the plan, timing, and follow-up instructions clearly."
  },
  {
    question: "How does remote follow-up work?",
    answer:
      "After returning home, remote follow-up can help review progress photos, swelling, incision care, and recovery milestones. Urgent medical concerns should always be handled locally."
  }
];

const trustMetrics = [
  {
    value: "27+",
    label: "Years Experience",
    detail: "Long-term facial rejuvenation planning led by surgical experience."
  },
  {
    value: "9D",
    label: "Founder of 9D Facelift",
    detail: "A doctor-led approach focused on anatomy, balance, and natural expression."
  },
  {
    value: "Many",
    label: "Procedures Performed",
    detail: "Experience across facial rejuvenation planning and surgical consultation."
  },
  {
    value: "Global",
    label: "International Patient Experience",
    detail: "Built for overseas patients who need clarity before traveling."
  }
];

const resultCards = [
  {
    country: "USA",
    image: "/images/gallery-case-01.jpg"
  },
  {
    country: "Russia",
    image: "/images/gallery-case-04.jpg"
  },
  {
    country: "Thailand",
    image: "/images/gallery-case-07.jpg"
  },
  {
    country: "Singapore",
    image: "/images/gallery-ai-04.jpeg"
  },
  {
    country: "United Kingdom",
    image: "/images/gallery-ai-08.jpeg"
  }
];

const journeySteps = [
  {
    icon: Video,
    title: "Online Consultation",
    text: "Send photos, goals, health history, and previous treatment details."
  },
  {
    icon: Stethoscope,
    title: "Treatment Planning",
    text: "Receive preliminary direction based on facial anatomy and suitability."
  },
  {
    icon: Plane,
    title: "Travel Preparation",
    text: "Clarify arrival timing, stay window, and consultation schedule."
  },
  {
    icon: Sparkles,
    title: "Procedure",
    text: "Your treatment plan is confirmed after in-person medical evaluation."
  },
  {
    icon: ShieldCheck,
    title: "Recovery",
    text: "Plan early swelling, incision care, local check-ups, and departure timing."
  },
  {
    icon: MessageCircle,
    title: "Remote Follow-Up",
    text: "Continue progress communication after returning home."
  }
];

const supportItems = [
  {
    icon: Languages,
    title: "English Consultation",
    text: "Clear communication before, during, and after your visit."
  },
  {
    icon: CalendarCheck2,
    title: "Treatment Coordination",
    text: "A smoother schedule from online review to in-person planning."
  },
  {
    icon: Plane,
    title: "Travel Guidance",
    text: "Understand timing before booking flights or arranging your stay."
  },
  {
    icon: Building2,
    title: "Accommodation Assistance",
    text: "Guidance for recovery-friendly stay planning when needed."
  },
  {
    icon: HeartHandshake,
    title: "Recovery Support",
    text: "Practical aftercare guidance during the early recovery window."
  },
  {
    icon: Globe2,
    title: "Follow-Up Care",
    text: "Remote progress review after you return home."
  }
];

const heroHighlights = ["Remote Review", "Surgeon-Led Plan", "Travel Clarity"];

export function InternationalPatientsView({
  settings,
  faqs = fallbackFaqs
}: InternationalPatientsViewProps) {
  const safeSettings = { ...defaultSettings, ...settings };
  const whatsappUrl = getWhatsAppUrl(safeSettings);
  const visibleFaqs = faqs.length ? faqs : fallbackFaqs;

  return (
    <div className="overflow-x-hidden bg-porcelain text-ink">
      <section className="relative isolate flex min-h-screen overflow-hidden bg-ink px-5 pb-12 pt-28 text-white sm:px-8 lg:pt-32">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:180px_180px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_32%,rgba(209,174,104,0.15),transparent_28%),radial-gradient(circle_at_78%_50%,rgba(255,255,255,0.08),transparent_25%),linear-gradient(115deg,#141311_0%,#151412_45%,#1f1d19_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(20,19,17,0.98)_0%,rgba(20,19,17,0.82)_42%,rgba(20,19,17,0.66)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-black/80 to-transparent" />

        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col justify-center">
          <Reveal className="max-w-4xl">
            <div className="flex items-center gap-4">
              <span className="h-1.5 w-1.5 rounded-full bg-champagne" />
              <p className="text-xs font-bold uppercase tracking-[0.34em] text-champagne">
                International 9D Facelift Consultation
              </p>
            </div>
            <h1 className="mt-8 max-w-4xl font-display text-5xl font-semibold leading-[0.94] tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-8xl">
              Plan your facelift before you fly.
            </h1>
            <p className="mt-7 max-w-2xl break-words text-lg leading-8 text-white/76 sm:text-xl sm:leading-9">
              Remote photo review, travel timing, procedure suitability, and recovery planning for
              international patients considering 9D Facelift in China.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <LuxuryButton href="#online-assessment" variant="gold" className="w-full sm:w-auto">
                Start Online Assessment
              </LuxuryButton>
              <LuxuryButton href={whatsappUrl} variant="outlineDark" className="w-full sm:w-auto" external>
                WhatsApp Consultation
              </LuxuryButton>
            </div>
          </Reveal>

          <div className="mt-16 grid gap-3 sm:grid-cols-3 lg:ml-auto lg:w-[620px]">
            {heroHighlights.map((item) => (
              <Reveal key={item} className="border border-white/24 bg-white/[0.03] px-6 py-5 backdrop-blur-sm">
                <p className="font-display text-3xl font-semibold leading-none text-champagne">
                  {item.split(" ")[0]}
                </p>
                <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.24em] text-white">
                  {item.replace(item.split(" ")[0], "").trim()}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.96fr_1.04fr] lg:items-center">
          <Reveal className="relative min-h-[600px] overflow-hidden bg-mist lg:min-h-[640px]">
            <Image
              src="/images/dr-xiao-scrubs-portrait.jpg"
              alt="Dr. Xiao Zhongye for international patient consultation"
              fill
              sizes="(min-width: 1024px) 46vw, 100vw"
              className="object-cover object-[50%_12%]"
            />
          </Reveal>

          <Reveal>
            <p className="section-label">Why Patients Travel To Dr Xiao</p>
            <h2 className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl">
              Doctor-first planning before international travel.
            </h2>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-graphite/76">
              The decision to travel for facial rejuvenation should begin with trust. Dr. Xiao's
              consultation starts with facial structure, treatment history, and realistic planning
              before travel logistics are discussed.
            </p>
            <div className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
              {trustMetrics.map((metric) => (
                <div key={metric.label} className="border-t border-ink/10 pt-6">
                  <div className="font-display text-4xl font-semibold text-bronze sm:text-5xl">
                    {metric.value}
                  </div>
                  <h3 className="mt-2 text-xs font-bold uppercase tracking-[0.2em] text-ink">
                    {metric.label}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-graphite/70">{metric.detail}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-[#f4f0e9] px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal className="grid gap-8 lg:grid-cols-[0.78fr_1fr] lg:items-end">
            <div>
              <p className="section-label">International Patient Results</p>
              <h2 className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl">
                Country-based patient stories with visual proof.
              </h2>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-graphite/74">
              Explore selected patient references from different regions before starting your own
              online consultation.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {resultCards.map((card) => (
              <Reveal key={card.country} className="group relative min-h-[420px] overflow-hidden bg-ink text-white">
                <Image
                  src={card.image}
                  alt={`${card.country} international patient result for 9D Facelift`}
                  fill
                  sizes="(min-width: 1280px) 20vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover object-center transition duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/12 to-black/78" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-7">
                  <h3 className="font-display text-3xl font-semibold leading-none text-champagne">
                    {card.country}
                  </h3>
                  <ArrowRight
                    className="mb-1 text-champagne transition duration-300 group-hover:translate-x-1"
                    size={24}
                    strokeWidth={1.7}
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="journey" className="bg-white px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="section-label">Your Journey</p>
              <h2 className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl">
                A clear international journey, explained without pressure.
              </h2>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-graphite/72">
              The goal is not to push travel. The goal is to help you understand medical suitability,
              timing, recovery, and next actions before you make a serious decision.
            </p>
          </Reveal>

          <div className="mt-16 grid border-y border-ink/10 md:grid-cols-2 lg:grid-cols-6">
            {journeySteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <Reveal
                  key={step.title}
                  className="border-b border-ink/10 py-9 md:px-6 lg:border-b-0 lg:border-r lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="font-display text-3xl font-semibold text-bronze">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <Icon className="text-bronze" size={22} />
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-semibold leading-tight text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-4 text-sm leading-6 text-graphite/70">{step.text}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#f4f0e9] px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.52fr_0.48fr] lg:items-center">
          <Reveal className="relative min-h-[620px]">
            <Image
              src="/images/international-patient-recovery-visit.jpg"
              alt="International patient recovery support with Dr. Xiao Zhongye"
              fill
              sizes="(min-width: 1024px) 52vw, 100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/34 via-transparent to-transparent" />
          </Reveal>

          <Reveal>
            <p className="section-label">International Patient Support</p>
            <h2 className="mt-5 max-w-2xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl">
              Premium care before, during, and after your visit.
            </h2>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-graphite/76">
              International treatment is coordinated with medical seriousness, clear communication,
              and steady support from the first message through recovery and remote follow-up.
            </p>
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {supportItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="border-t border-ink/10 pt-5">
                    <Icon className="text-bronze" size={22} />
                    <h3 className="mt-4 font-display text-2xl font-semibold leading-tight text-ink">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-graphite/70">{item.text}</p>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-ink text-white">
        <div className="grid lg:min-h-[620px] lg:grid-cols-[0.46fr_0.54fr]">
          <div className="relative min-h-[430px] overflow-hidden bg-black lg:min-h-[620px]">
            <Image
              src="/images/international-patient-recovery-visit.jpg"
              alt="Doctor and international patient recovery visit"
              fill
              sizes="(min-width: 1024px) 46vw, 100vw"
              className="object-cover object-center opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-ink/62" />
          </div>

          <div className="relative z-10 grid gap-12 px-5 py-16 sm:px-10 lg:grid-cols-[1fr_220px] lg:px-14 lg:py-24 xl:px-20">
            <Reveal>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-champagne">Doctor & Patient Trust</p>
              <h2 className="mt-5 max-w-lg font-display text-4xl font-semibold leading-[1.05] text-white sm:text-5xl lg:text-6xl">
                Plan with the surgeon. Recover with a team.
              </h2>
              <p className="mt-7 max-w-xl text-base leading-8 text-white/72">
                For international patients, trust comes from doctor authority, careful planning,
                realistic limits, and follow-up after returning home.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <LuxuryButton href="#online-assessment" variant="gold">
                  Submit Assessment
                </LuxuryButton>
                <LuxuryButton href={whatsappUrl} variant="outlineDark" external>
                  WhatsApp Consultation
                </LuxuryButton>
              </div>
            </Reveal>
            <Reveal className="border-white/20 lg:border-l lg:pl-10">
              {[
                ["27+", "Years Experience"],
                ["9D", "Facelift Planning"],
                ["Global", "Patient Support"]
              ].map(([value, label]) => (
                <div key={value} className="mb-10 last:mb-0">
                  <div className="font-display text-4xl font-semibold text-champagne sm:text-5xl">
                    {value}
                  </div>
                  <div className="mt-2 text-xs font-bold uppercase tracking-[0.16em] text-white">
                    {label}
                  </div>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.82fr_1.18fr]">
          <Reveal>
            <p className="section-label">FAQ</p>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl">
              Clear answers before booking travel.
            </h2>
            <p className="mt-6 text-lg leading-8 text-graphite/74">
              These questions focus on the concerns international patients usually need answered
              before a serious consultation.
            </p>
          </Reveal>

          <div className="border-t border-ink/10">
            {visibleFaqs.map((faq) => (
              <Reveal key={faq.question} className="border-b border-ink/10 py-7">
                <h3 className="font-display text-2xl font-semibold leading-tight text-ink">
                  {faq.question}
                </h3>
                <p className="mt-4 max-w-3xl text-base leading-8 text-graphite/72">{faq.answer}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section
        id="online-assessment"
        className="relative overflow-hidden bg-[#f4f0e9] px-5 py-20 sm:px-8 sm:py-28"
      >
        <div className="absolute right-0 top-0 hidden h-full w-[34%] bg-white lg:block" />
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
          <Reveal>
            <p className="section-label">Start Online</p>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl">
              Book a free video consultation before you fly.
            </h2>
            <p className="mt-7 max-w-lg text-lg leading-8 text-graphite/76">
              Start with clear photos, honest medical history, your main facial concerns, and a
              realistic travel window. Our team will guide the next step.
            </p>
            <div className="mt-10 max-w-lg border-y border-ink/10 py-7">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between gap-6 bg-ink px-6 py-5 text-white transition hover:bg-champagne hover:text-ink"
              >
                <span className="flex items-center gap-4">
                  <span className="grid size-11 place-items-center border border-white/20 text-champagne transition group-hover:border-ink/20 group-hover:text-ink">
                    <MessageCircle size={22} />
                  </span>
                  <span>
                    <span className="block text-sm font-bold uppercase tracking-[0.2em]">WhatsApp</span>
                    <span className="mt-1 block text-sm text-white/70 transition group-hover:text-ink/70">
                      Send photos and receive faster scheduling guidance.
                    </span>
                  </span>
                </span>
                <ArrowRight className="shrink-0" size={18} />
              </a>
              <div className="mt-6 grid gap-4">
                {[
                  "Share photos, travel timing, and your main facial concerns.",
                  "Receive clear next-step guidance before booking flights.",
                  "Use WeChat only if it is convenient for you."
                ].map((item) => (
                  <div key={item} className="flex gap-3 text-sm font-semibold leading-6 text-graphite">
                    <CheckCircle2 className="mt-0.5 shrink-0 text-bronze" size={18} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal className="lg:pl-4">
            <ContactForm compact title="Book Free Video Consultation" />
          </Reveal>
        </div>
      </section>
    </div>
  );
}

type LuxuryButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "gold" | "dark" | "outline" | "outlineDark";
  className?: string;
  external?: boolean;
};

function LuxuryButton({
  href,
  children,
  variant = "dark",
  className = "",
  external = false
}: LuxuryButtonProps) {
  const classes = {
    gold: "border border-champagne bg-champagne text-ink hover:bg-bronze hover:text-white hover:border-bronze",
    dark: "border border-ink bg-ink text-white hover:border-champagne hover:bg-champagne hover:text-ink",
    outline: "border border-ink/20 bg-transparent text-ink hover:border-ink hover:bg-ink hover:text-white",
    outlineDark: "border border-white/18 bg-transparent text-white hover:border-champagne hover:bg-champagne hover:text-ink"
  };

  const classNameValue = `inline-flex min-h-12 items-center justify-center gap-2 px-5 py-3 text-sm font-bold transition ${classes[variant]} ${className}`;

  const content = (
    <>
      <span>{children}</span>
      <ArrowRight size={17} />
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={classNameValue}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classNameValue}>
      {content}
    </Link>
  );
}
