import {
  ArrowUpRight,
  BadgeCheck,
  Camera,
  Check,
  ClipboardCheck,
  Globe2,
  MessageCircle,
  ShieldCheck,
  Sparkles
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { LandingPageData } from "@/lib/landing-pages";
import { defaultSettings, getWhatsAppUrl } from "@/lib/site-data";
import type { GalleryItem, SiteSettings } from "@/lib/site-types";
import { ContactForm } from "./ContactForm";
import { Gallery } from "./Gallery";
import { Reveal } from "./Reveal";

type LandingPageViewProps = {
  page: LandingPageData;
  settings: SiteSettings;
  galleryItems?: GalleryItem[];
};

export function LandingPageView({ page, settings, galleryItems = [] }: LandingPageViewProps) {
  const safeSettings = { ...defaultSettings, ...settings };
  const whatsappUrl = getWhatsAppUrl(safeSettings);
  const secondaryHref = page.secondaryHref === "#whatsapp" ? whatsappUrl : page.secondaryHref;
  const usesPhotoHero = page.path === "/doctor";

  return (
    <>
      <section className="relative flex min-h-[88vh] items-end overflow-hidden bg-ink px-5 pb-14 pt-32 text-white sm:px-8 lg:pb-20">
        {usesPhotoHero ? (
          <>
            <Image
              src={page.image}
              alt={page.imageAlt}
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-[0.44]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(21,21,20,0.94),rgba(21,21,20,0.72),rgba(21,21,20,0.42))]" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-[linear-gradient(135deg,#151514_0%,#1b1a18_46%,#0d0d0c_100%)]" />
            <div className="absolute inset-0 opacity-[0.13] [background-image:linear-gradient(90deg,rgba(201,169,110,0.22)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:112px_112px]" />
            <div className="absolute inset-y-0 right-0 hidden w-[42%] border-l border-white/10 bg-white/[0.035] xl:block" />
            <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-champagne/45 to-transparent" />
          </>
        )}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />

        <div className="relative mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <Reveal direction="none">
            <nav className="mb-9 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
              <Link href="/" className="transition hover:text-champagne">
                Home
              </Link>
              <span className="h-px w-8 bg-champagne/70" />
              <span className="text-champagne">{page.breadcrumb}</span>
            </nav>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-champagne">{page.eyebrow}</p>
            <h1 className="mt-7 max-w-5xl font-display text-5xl font-semibold leading-[1.02] text-white sm:text-6xl lg:text-7xl">
              {page.title}
              <span className="mt-2 block text-champagne">{page.accent}</span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-white/82">{page.intro}</p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <CtaLink href={page.primaryHref} variant="primary">
                {page.primaryCta}
              </CtaLink>
              {secondaryHref && page.secondaryCta ? (
                <CtaLink href={secondaryHref} variant="ghost">
                  {page.secondaryCta}
                </CtaLink>
              ) : null}
            </div>
          </Reveal>

          <Reveal direction="left" delay={0.08}>
            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {page.stats.map((stat) => (
                <div key={stat.label} className="rounded-md border border-white/18 bg-white/[0.06] p-5 backdrop-blur-md">
                  <div className="font-display text-3xl font-semibold text-champagne">{stat.value}</div>
                  <div className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/62">{stat.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-porcelain px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <Reveal direction="right">
            <p className="section-label">{page.lead.eyebrow}</p>
            <h2 className="section-title">{page.lead.title}</h2>
          </Reveal>
          <Reveal direction="left">
            <div className="space-y-5 text-base leading-8 text-graphite/76">
              {page.lead.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-9 grid gap-4">
              {page.lead.highlights.map((highlight) => (
                <div key={highlight} className="flex gap-4 border-l-2 border-champagne bg-white px-5 py-4 shadow-soft">
                  <Check className="mt-1 shrink-0 text-bronze" size={18} />
                  <p className="text-sm font-semibold leading-7 text-ink">{highlight}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {page.sections.map((section, sectionIndex) => (
        <section
          key={section.title}
          className={`px-5 py-20 sm:px-8 lg:py-28 ${sectionIndex % 2 === 0 ? "bg-white" : "bg-mist"}`}
        >
          <div className="mx-auto max-w-7xl">
            <Reveal className="max-w-3xl">
              <p className="section-label">{section.eyebrow}</p>
              <h2 className="section-title">{section.title}</h2>
              {section.description ? (
                <p className="mt-6 text-base leading-8 text-graphite/72">{section.description}</p>
              ) : null}
            </Reveal>

            {section.layout === "timeline" ? (
              <div className="mt-14 grid gap-5">
                {section.items.map((item, index) => (
                  <Reveal key={item.title} delay={index * 0.05}>
                    <div className="grid gap-5 rounded-md border border-ink/10 bg-porcelain p-6 shadow-soft md:grid-cols-[112px_1fr] md:items-start">
                      <div className="flex items-center gap-4">
                        <span className="font-display text-5xl text-champagne/70">{String(index + 1).padStart(2, "0")}</span>
                        <span className="hidden h-px flex-1 bg-ink/12 md:block" />
                      </div>
                      <div>
                        <h3 className="font-display text-2xl font-semibold text-ink">{item.title}</h3>
                        <p className="mt-3 text-sm leading-7 text-graphite/72">{item.description}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            ) : (
              <div className="mt-14 grid gap-5 md:grid-cols-3">
                {section.items.map((item, index) => {
                  const Icon = featureIcons[index % featureIcons.length];
                  return (
                    <Reveal key={item.title} delay={index * 0.06}>
                      <article className="h-full rounded-md border border-ink/10 bg-porcelain p-7 shadow-soft">
                        <div className="flex h-12 w-12 items-center justify-center rounded-md bg-white text-bronze shadow-soft">
                          <Icon size={23} />
                        </div>
                        <h3 className="mt-7 font-display text-2xl font-semibold leading-tight text-ink">{item.title}</h3>
                        <p className="mt-4 text-sm leading-7 text-graphite/72">{item.description}</p>
                      </article>
                    </Reveal>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      ))}

      {page.path === "/before-after" && galleryItems.length ? (
        <section className="bg-porcelain px-5 py-20 sm:px-8 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <Reveal className="mx-auto max-w-3xl text-center">
              <p className="section-label">Visual Reference</p>
              <h2 className="section-title">
                Case Gallery
                <br />
                <span>Natural, Not Overdone</span>
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-graphite/70">
                Use these cases as visual references only. Individual outcomes vary and require medical assessment.
              </p>
            </Reveal>
            <div className="mt-12">
              <Gallery items={galleryItems} />
            </div>
          </div>
        </section>
      ) : null}

      {page.path === "/consultation" ? (
        <section id="assessment-form" className="bg-porcelain px-5 py-20 sm:px-8 lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal direction="right">
              <p className="section-label">Assessment Form</p>
              <h2 className="section-title">
                Online Assessment
                <br />
                <span>Structured and Clear</span>
              </h2>
              <p className="mt-6 text-base leading-8 text-graphite/75">
                Add your goals, main concerns, previous treatments, and travel timing. Photos can be sent by WhatsApp
                after submitting the form.
              </p>
              <div id="whatsapp" className="mt-8 rounded-md bg-ink p-6 text-white shadow-lift">
                <div className="flex items-center gap-3 text-champagne">
                  <MessageCircle size={22} />
                  <span className="text-sm font-bold uppercase tracking-[0.18em]">Fastest Route</span>
                </div>
                <p className="mt-5 text-sm leading-7 text-white/75">
                  WhatsApp is usually the quickest way to send photos and receive scheduling guidance.
                </p>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-md bg-champagne px-5 text-sm font-bold text-ink transition hover:bg-white"
                >
                  Send Photos on WhatsApp
                  <ArrowUpRight size={17} />
                </a>
              </div>
            </Reveal>
            <Reveal direction="left">
              <ContactForm />
            </Reveal>
          </div>
        </section>
      ) : null}

      <section className="bg-ink px-5 py-20 text-white sm:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.86fr_1.14fr]">
          <Reveal direction="right">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-champagne">Common Questions</p>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-tight sm:text-5xl">
              Clear answers before a serious decision.
            </h2>
          </Reveal>
          <div className="grid gap-4">
            {page.faqs.map((faq, index) => (
              <Reveal key={faq.question} delay={index * 0.06}>
                <article className="rounded-md border border-white/12 bg-white/[0.06] p-6 backdrop-blur">
                  <h3 className="font-display text-2xl font-semibold text-white">{faq.question}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/72">{faq.answer}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-porcelain px-5 py-20 sm:px-8 lg:py-28">
        <Reveal className="mx-auto max-w-5xl text-center">
          <p className="section-label">{page.finalCta.eyebrow}</p>
          <h2 className="mx-auto mt-4 max-w-4xl font-display text-4xl font-semibold leading-tight text-ink sm:text-6xl">
            {page.finalCta.title}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-graphite/72">{page.finalCta.description}</p>
          <CtaLink href={page.finalCta.href} variant="dark" className="mt-10">
            {page.finalCta.button}
          </CtaLink>
        </Reveal>
      </section>
    </>
  );
}

const featureIcons = [ShieldCheck, Sparkles, ClipboardCheck, Camera, Globe2, BadgeCheck];

function CtaLink({
  href,
  variant,
  className = "",
  children
}: {
  href: string;
  variant: "primary" | "ghost" | "dark";
  className?: string;
  children: ReactNode;
}) {
  const styles = {
    primary: "bg-champagne text-ink hover:bg-white",
    ghost: "border border-white/35 text-white hover:border-champagne hover:text-champagne",
    dark: "bg-ink text-white hover:bg-champagne hover:text-ink"
  };

  const content = (
    <>
      {children}
      <ArrowUpRight size={17} />
    </>
  );

  const baseClass = `inline-flex h-12 items-center justify-center gap-2 rounded-md px-6 text-sm font-bold transition ${styles[variant]} ${className}`;

  if (href.startsWith("http")) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={baseClass}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={baseClass}>
      {content}
    </Link>
  );
}
