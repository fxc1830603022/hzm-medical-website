import {
  ArrowRight,
  Camera,
  CheckCircle2,
  Clock3,
  Globe2,
  MessageCircle,
  Plane,
  ShieldCheck,
  Stethoscope
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
    question: "Should I book flights before assessment?",
    answer:
      "No. Start with photos, medical history, previous treatments, and your expected travel window first. Travel should be planned after preliminary direction."
  },
  {
    question: "How many days should I stay in China?",
    answer:
      "The stay depends on procedure depth, anesthesia plan, swelling, and follow-up needs. A realistic window should be discussed during assessment."
  },
  {
    question: "What photos should I send first?",
    answer:
      "Front, side, 45-degree, smiling, jawline, and neck photos in clean natural lighting are the most useful starting point."
  },
  {
    question: "Can my family join the online consultation?",
    answer:
      "Yes. Many international patients prefer to involve a family member when discussing travel timing, recovery stay, and aftercare."
  },
  {
    question: "What happens after I return home?",
    answer:
      "Remote follow-up can help review swelling, incision care, and recovery milestones. Any urgent medical concern should still be handled locally."
  }
];

const journeySteps = [
  {
    number: "01",
    title: "Send Photos",
    text: "Front, side, 45-degree, jawline, neck and expression photos in clean lighting."
  },
  {
    number: "02",
    title: "Medical Review",
    text: "Share prior fillers, threads, surgery, medication, allergies and health conditions."
  },
  {
    number: "03",
    title: "Travel Plan",
    text: "Clarify arrival timing, consultation and the realistic surgery window."
  },
  {
    number: "04",
    title: "Recovery Stay",
    text: "Plan early swelling, incision care, check-ups and departure timing."
  },
  {
    number: "05",
    title: "Follow-up",
    text: "Continue communication after returning home through remote progress updates."
  }
];

const patientConcerns = [
  "How long should I stay in China?",
  "Can I be assessed online before booking flights?",
  "What support is available for translation and communication?",
  "How will recovery and follow-up work after I return home?"
];

const trustItems = [
  { icon: Camera, label: "Remote Review", text: "Photo-first planning before travel." },
  { icon: Plane, label: "Travel Clarity", text: "Know the likely stay and timing." },
  { icon: Stethoscope, label: "Surgeon-led Plan", text: "Direction starts with anatomy." },
  { icon: ShieldCheck, label: "Follow-up Support", text: "Recovery guidance after return." }
];

const sendFirstItems = ["Photos", "Health History", "Travel Window"];

export function InternationalPatientsView({
  settings,
  faqs = fallbackFaqs
}: InternationalPatientsViewProps) {
  const safeSettings = { ...defaultSettings, ...settings };
  const whatsappUrl = getWhatsAppUrl(safeSettings);
  const visibleFaqs = faqs.length ? faqs : fallbackFaqs;

  return (
    <div className="bg-porcelain text-ink">
      <section className="relative overflow-hidden bg-white px-5 pb-16 pt-28 sm:px-8 lg:min-h-[760px] lg:pb-0 lg:pt-32">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.46fr_0.54fr] lg:items-center">
          <Reveal className="relative z-10 max-w-xl">
            <p className="section-label">International Patient Program</p>
            <h1 className="mt-5 font-display text-5xl font-semibold leading-[0.96] tracking-tight text-ink sm:text-6xl lg:text-7xl">
              Plan your facelift before you fly.
            </h1>
            <p className="mt-7 text-lg leading-8 text-graphite/76">
              For overseas patients considering 9D Facelift in China, the safest journey starts
              with online assessment, not travel pressure.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <LuxuryButton href="/consultation" variant="dark" className="w-full sm:w-auto">
                Start Online Assessment
              </LuxuryButton>
              <LuxuryButton href="#journey" variant="outline" className="w-full sm:w-auto">
                View Journey
              </LuxuryButton>
            </div>
          </Reveal>

          <Reveal className="relative min-h-[520px] lg:min-h-[640px]">
            <div className="absolute inset-0 overflow-hidden bg-mist">
              <Image
                src="/images/6914b0490000000004012cb7_1.jpg"
                alt="International patient online photo assessment for 9D Facelift"
                fill
                sizes="(min-width: 1024px) 28vw, 56vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white/75 via-white/30 to-transparent" />
            </div>
            <div className="absolute bottom-12 right-4 z-10 w-[72%] max-w-xs bg-white px-7 py-6 shadow-soft sm:right-8 lg:right-6">
              <h2 className="font-display text-3xl font-semibold leading-tight text-ink">Online First</h2>
              <p className="mt-3 text-sm leading-6 text-graphite/72">
                Photos, health history, recovery window and travel plan reviewed before major decisions.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-ink/10 bg-[#f4f0e9] px-5 py-9 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {trustItems.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="grid grid-cols-[2rem_1fr] gap-4">
                <Icon className="mt-0.5 text-bronze" size={22} />
                <div className="min-w-0">
                  <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-bronze">{item.label}</h2>
                  <p className="mt-2 break-words text-sm leading-6 text-graphite/70">{item.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-white px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.52fr_0.48fr] lg:items-center">
          <Reveal className="relative min-h-[560px]">
            <div className="absolute left-0 top-0 h-[520px] w-[82%] overflow-hidden bg-mist">
              <Image
                src="/images/dr-xiao-scrubs-portrait.jpg"
                alt="Dr. Xiao Zhongye portrait for international patient review"
                fill
                sizes="(min-width: 1024px) 520px, 86vw"
                className="object-cover object-[50%_18%]"
              />
            </div>
            <div className="absolute bottom-0 right-0 w-[48%] min-w-[220px] overflow-hidden bg-porcelain shadow-soft">
              <div className="relative aspect-[1.35/1]">
                <Image
                  src="/images/gallery-ai-03.jpeg"
                  alt="9D Facelift photo review example"
                  fill
                  sizes="320px"
                  className="object-cover object-center"
                />
              </div>
            </div>
          </Reveal>

          <Reveal>
            <p className="section-label">Before Travel</p>
            <h2 className="mt-5 max-w-xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl">
              Your first step is a clear medical conversation.
            </h2>
            <p className="mt-7 max-w-xl text-lg leading-8 text-graphite/76">
              International patients should not feel rushed into flights. Start with photos,
              medical history, previous treatments, and a preliminary surgeon-led direction.
            </p>
            <p className="mt-5 max-w-xl text-lg leading-8 text-graphite/76">
              You receive focused guidance on whether an in-person consultation, procedure planning,
              and travel schedule should be considered.
            </p>
            <div className="mt-9">
              <LuxuryButton href="/consultation" variant="dark">
                What to Send First
              </LuxuryButton>
            </div>
            <div className="mt-7 flex flex-wrap gap-x-8 gap-y-3 border-t border-ink/10 pt-5">
              {sendFirstItems.map((item) => (
                <span key={item} className="border-b border-ink pb-1 text-sm font-bold text-ink">
                  {item}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#f4f0e9] px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.48fr_0.52fr] lg:items-center">
          <Reveal className="relative z-10">
            <p className="section-label">Patient Concerns</p>
            <h2 className="mt-5 max-w-xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl">
              Answer what overseas patients worry about first.
            </h2>
            <p className="mt-7 max-w-xl text-lg leading-8 text-graphite/78">
              We clarify stay duration, communication support, recovery expectations, privacy,
              budget range, and post-return follow-up before patients make a travel decision.
            </p>
            <div className="mt-9 grid gap-5">
              {patientConcerns.map((item) => (
                <div key={item} className="flex gap-3 border-t border-ink/10 pt-5">
                  <CheckCircle2 className="mt-0.5 shrink-0 text-bronze" size={20} />
                  <span className="text-base font-semibold leading-7 text-ink">{item}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal className="relative min-h-[600px] lg:min-h-[700px]">
            <div className="absolute right-0 top-0 h-[560px] w-full overflow-hidden bg-[#ebe5dc] lg:w-[86%]">
              <Image
                src="/images/gallery-ai-03.jpeg"
                alt="International patient online assessment for 9D Facelift"
                fill
                sizes="(min-width: 1024px) 660px, 100vw"
                className="object-cover object-center"
              />
            </div>
            <div className="absolute bottom-0 left-0 z-10 w-[84%] max-w-md bg-white px-8 py-9 shadow-soft sm:px-10 sm:py-10">
              <h3 className="font-display text-3xl font-semibold leading-tight text-ink">
                Can I be assessed online?
              </h3>
              <p className="mt-4 text-sm leading-6 text-graphite/72">
                Yes. A structured photo review can help decide whether an in-person consultation
                and travel plan should be considered.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="journey" className="bg-white px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <p className="section-label">International Journey</p>
              <h2 className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl">
                A simple international journey, explained without pressure.
              </h2>
            </div>
            <p className="max-w-xl text-lg leading-8 text-graphite/72">
              From photo review to recovery follow-up, every step is arranged to help overseas
              patients understand timing, medical suitability, and next actions before traveling.
            </p>
          </Reveal>

          <div className="mt-16 grid border-y border-ink/10 md:grid-cols-5">
            {journeySteps.map((step) => (
              <Reveal
                key={step.number}
                className="border-b border-ink/10 py-9 md:border-b-0 md:border-r md:px-7 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
              >
                <div className="font-display text-4xl font-semibold text-bronze">{step.number}</div>
                <h3 className="mt-5 font-display text-2xl font-semibold leading-tight text-ink">{step.title}</h3>
                <p className="mt-4 text-sm leading-6 text-graphite/70">{step.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-ink text-white">
        <div className="grid lg:min-h-[620px] lg:grid-cols-[0.46fr_0.54fr]">
          <div className="relative min-h-[420px] overflow-hidden bg-black lg:min-h-[620px]">
            <Image
              src="/images/international-patient-recovery-visit.jpg"
              alt="International patient recovery visit with Dr. Xiao Zhongye"
              fill
              sizes="(min-width: 1024px) 46vw, 100vw"
              className="object-cover object-[38%_center] opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-ink/58" />
          </div>

          <div className="relative z-10 grid gap-12 px-5 py-16 sm:px-10 lg:grid-cols-[1fr_210px] lg:px-14 lg:py-24 xl:px-20">
            <Reveal>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-champagne">Doctor & Patient Trust</p>
              <h2 className="mt-5 max-w-lg font-display text-4xl font-semibold leading-[1.05] text-white sm:text-5xl lg:text-6xl">
                Plan with the surgeon. Recover with a team.
              </h2>
              <p className="mt-7 max-w-xl text-base leading-8 text-white/72">
                For international patients, trust comes from surgeon-led planning, real patient context,
                realistic expectations, careful recovery timing, and follow-up after returning home.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <LuxuryButton href="/consultation" variant="gold">
                  Submit Assessment
                </LuxuryButton>
                <LuxuryButton href={whatsappUrl} variant="outlineDark" external>
                  WhatsApp Consultation
                </LuxuryButton>
              </div>
            </Reveal>
            <Reveal className="border-white/20 lg:border-l lg:pl-10">
              {[
                ["27+", "Years experience"],
                ["9D", "Facelift planning"],
                ["Global", "Patient support"]
              ].map(([value, label]) => (
                <div key={value} className="mb-10 last:mb-0">
                  <div className="font-display text-4xl font-semibold text-champagne sm:text-5xl">{value}</div>
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
            <p className="section-label">Common Questions</p>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl">
              Clear answers before a serious decision.
            </h2>
            <p className="mt-6 text-lg leading-8 text-graphite/74">
              These answers help you understand assessment, travel timing, recovery, and follow-up
              before making an international treatment decision.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <LuxuryButton href={whatsappUrl} variant="outline" external>
                Chat on WhatsApp
              </LuxuryButton>
              <LuxuryButton href="/consultation" variant="dark">
                Book Online Assessment
              </LuxuryButton>
            </div>
          </Reveal>

          <div className="border-t border-ink/10">
            {visibleFaqs.map((faq) => (
              <Reveal key={faq.question} className="border-b border-ink/10 py-7">
                <h3 className="font-display text-2xl font-semibold leading-tight text-ink">{faq.question}</h3>
                <p className="mt-4 max-w-3xl text-base leading-8 text-graphite/72">{faq.answer}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="online-assessment" className="relative overflow-hidden bg-[#f4f0e9] px-5 py-20 sm:px-8 sm:py-28">
        <div className="absolute right-0 top-0 hidden h-full w-[34%] bg-white lg:block" />
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
          <Reveal>
            <p className="section-label">Start Online</p>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl">
              Start with photos, goals, and travel timing.
            </h2>
            <p className="mt-7 max-w-lg text-lg leading-8 text-graphite/76">
              Start with clear photos, honest medical history, your main facial concerns,
              and a realistic travel window. Our team will guide the next step.
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
                    <span className="block text-sm font-bold uppercase tracking-[0.2em]">
                      WhatsApp
                    </span>
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
                    <Globe2 className="mt-0.5 shrink-0 text-bronze" size={18} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal className="lg:pl-4">
            <ContactForm compact title="Online Assessment" />
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
