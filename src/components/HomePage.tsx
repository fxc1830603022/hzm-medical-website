import {
  BriefcaseMedical,
  Check,
  Globe2,
  Mail,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Star,
  UserRoundCheck
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { defaultSettings, getWhatsAppUrl, procedures, rules, whyItems } from "@/lib/site-data";
import type { GalleryItem, SiteSettings } from "@/lib/site-types";
import { ContactForm } from "./ContactForm";
import { Gallery } from "./Gallery";
import { Reveal } from "./Reveal";
import { WeChatContactCard } from "./WeChatContactCard";

type HomePageProps = {
  settings: SiteSettings;
  galleryItems: GalleryItem[];
};

export function HomePage({ settings, galleryItems }: HomePageProps) {
  const safeSettings = { ...defaultSettings, ...settings };
  const heroLines = safeSettings.heroDescription.split("\n");
  const socialLinks: Array<{
    label: string;
    href: string;
    icon: ReactNode;
    color: string;
  }> = [
    {
      label: "WhatsApp",
      href: getWhatsAppUrl(safeSettings),
      icon: <WhatsAppBrandIcon />,
      color: "#25D366"
    },
    {
      label: "Email",
      href: `mailto:${safeSettings.email}`,
      icon: <EnvelopeBrandIcon />,
      color: "#C9A76A"
    },
    {
      label: "Instagram",
      href: safeSettings.instagramUrl,
      icon: <InstagramBrandIcon />,
      color: "#E4405F"
    },
    {
      label: "YouTube",
      href: safeSettings.youtubeUrl,
      icon: <YouTubeBrandIcon />,
      color: "#FF0000"
    },
    {
      label: "Facebook",
      href: safeSettings.facebookUrl,
      icon: <FacebookBrandIcon />,
      color: "#1877F2"
    }
  ];

  return (
    <>
      <section id="hero" className="relative flex min-h-[92vh] items-center overflow-hidden bg-ink px-5 py-28 text-white sm:px-8">
        <Image
          src="/images/dr-xiao-team-hero.webp"
          alt="Dr. Xiao Zhongye 9D Facelift medical team"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-[0.42]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(21,21,20,0.88),rgba(21,21,20,0.58),rgba(21,21,20,0.35))]" />
        <div className="relative mx-auto w-full max-w-7xl">
          <Reveal direction="none" className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-champagne">
              {safeSettings.heroSubtitle}
            </p>
            <h1 className="mt-7 font-display text-5xl font-semibold leading-[1.04] text-white sm:text-6xl lg:text-7xl">
              <span className="block">{safeSettings.heroTitleTop}</span>
              <span className="mt-2 block text-champagne">{safeSettings.heroTitleBottom}</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/85">
              {heroLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/consultation"
                className="inline-flex h-12 items-center justify-center rounded-md bg-champagne px-6 text-sm font-bold text-ink transition hover:bg-white"
              >
                Book a 1-on-1 Online Consultation
              </Link>
              <Link
                href="#about"
                className="inline-flex h-12 items-center justify-center rounded-md border border-white/35 px-6 text-sm font-bold text-white transition hover:border-champagne hover:text-champagne"
              >
                Discover 9D Facelift
              </Link>
            </div>
          </Reveal>
        </div>
        <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 text-center text-xs uppercase tracking-[0.24em] text-white/70 md:block">
          <span>Explore</span>
          <span className="mx-auto mt-3 block h-14 w-px bg-champagne" />
        </div>
      </section>

      <section id="about" className="bg-porcelain px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal direction="right">
            <p className="section-label">ABOUT 9D FACELIFT</p>
            <h2 className="section-title">
              What Is
              <br />
              <span>9D Facelift</span>
            </h2>
            <p className="mt-7 text-xl leading-9 text-ink">
              9D Facelift, also known as the 9D Lifting System, is the exclusive proprietary facelift planning
              approach of Dr. Xiao Zhongye. Its core principle is always <strong>Charm Preservation</strong>.
            </p>
            <p className="mt-5 text-base leading-8 text-graphite/75">
              Many anti-aging procedures make one critical mistake: in the pursuit of youth, patients lose the
              essence of who they are. 9D refuses assembly-line aesthetics. Every plan is tailored to your facial
              anatomy, aging pattern, goals, and budget.
            </p>
            <div className="mt-10 grid grid-cols-3 gap-3">
              {[
                ["100%", "Customized"],
                ["3N", "Golden Rules"],
                ["0", "Fake Look"]
              ].map(([value, label]) => (
                <div key={label} className="rounded-md border border-ink/10 bg-white p-4 text-center shadow-soft">
                  <div className="font-display text-3xl font-semibold text-bronze">{value}</div>
                  <div className="mt-1 text-xs font-semibold uppercase text-graphite/60">{label}</div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal direction="left">
            <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-mist shadow-lift">
              <Image
                src="/images/896412cd7db178d8aff7975c761cf596.jpg"
                alt="9D Facelift by Dr. Xiao Zhongye"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section id="procedures" className="bg-white px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="PROCEDURES"
            title="Procedure Options"
            highlight="Precisely Customized"
            description="Because every face, aging pattern, and budget is different, no 9D surgical plan is ever one-size-fits-all."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {procedures.map((item, index) => {
              const procedureHref =
                item.name === "9D Deep Plane Facelift"
                  ? "/procedures/9d-deep-plane-facelift"
                  : "/procedures/9d-facelift";

              return (
              <Reveal key={item.name} delay={index * 0.08}>
                <div
                  className={`relative h-full rounded-md border p-7 shadow-soft ${
                    item.featured ? "border-champagne bg-ink text-white" : "border-ink/10 bg-porcelain text-ink"
                  }`}
                >
                  {item.featured ? (
                    <span className="absolute right-5 top-5 rounded-md bg-champagne px-3 py-1 text-xs font-bold text-ink">
                      Signature Procedure
                    </span>
                  ) : null}
                  <div
                    className={`inline-flex h-14 w-14 items-center justify-center rounded-md ${
                      item.featured ? "bg-white/10 text-champagne" : "bg-white text-bronze"
                    }`}
                  >
                    <BriefcaseMedical size={28} />
                  </div>
                  <h3 className="mt-7 font-display text-3xl font-semibold">{item.name}</h3>
                  <p className={`mt-2 text-sm font-semibold ${item.featured ? "text-white/70" : "text-graphite/60"}`}>
                    {item.target}
                  </p>
                  <ul className="mt-7 grid gap-4">
                    {item.features.map((feature) => (
                      <li key={feature} className="flex gap-3 text-sm leading-7">
                        <Check className="mt-1 shrink-0 text-champagne" size={17} />
                        <span className={item.featured ? "text-white/80" : "text-graphite/75"}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div
                    className={`mt-7 rounded-md px-4 py-3 text-sm font-bold ${
                      item.featured ? "bg-white/10 text-champagne" : "bg-white text-bronze"
                    }`}
                  >
                    {item.tag}
                  </div>
                  <Link
                    href={procedureHref}
                    className={`mt-5 inline-flex h-11 items-center rounded-md px-5 text-sm font-bold transition ${
                      item.featured
                        ? "bg-champagne text-ink hover:bg-white"
                        : "bg-ink text-white hover:bg-champagne hover:text-ink"
                    }`}
                  >
                    Learn more
                  </Link>
                </div>
              </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section id="3n" className="bg-mist px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="GOLDEN RULES"
            title="3N Golden Rules"
            highlight="Dr. Xiao's Promise"
            description="Whichever 9D plan you choose, every procedure must honor these three commitments."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {rules.map((rule, index) => {
              const Icon = index === 0 ? ShieldCheck : index === 1 ? Sparkles : UserRoundCheck;
              return (
                <Reveal key={rule.title} delay={index * 0.08}>
                  <div className="h-full rounded-md bg-white p-7 shadow-soft">
                    <div className="flex items-center justify-between">
                      <span className="font-display text-5xl text-champagne/50">{rule.number}</span>
                      <Icon className="text-bronze" size={34} />
                    </div>
                    <h3 className="mt-7 font-display text-2xl font-semibold text-ink">{rule.title}</h3>
                    <p className="mt-2 text-sm font-semibold text-sage">{rule.subtitle}</p>
                    <p className="mt-5 text-sm leading-7 text-graphite/75">{rule.description}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-ink px-5 py-20 text-center text-white sm:px-8">
        <Reveal>
          <p className="font-display text-4xl font-semibold leading-tight sm:text-5xl">
            You still look like yourself,
            <br />
            only ten years younger,
            <br />
            not like a stiff stranger.
          </p>
          <p className="mt-6 text-sm uppercase tracking-[0.2em] text-champagne">Dr. Xiao Zhongye</p>
        </Reveal>
      </section>

      <section id="gallery" className="bg-porcelain px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="GALLERY"
            title="Case Gallery"
            highlight="Real Results, Natural Beauty"
            description="Real transformations from global patients, across ethnicities and borders."
          />
          <div className="mt-12">
            <Gallery items={galleryItems} />
          </div>
        </div>
      </section>

      <section id="why-xiao" className="bg-white px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="WHY DR. XIAO"
            title="Why True 9D"
            highlight="Can Only Be Performed By Dr. Xiao"
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {whyItems.map((item, index) => {
              const Icon = index === 0 ? Star : Globe2;
              return (
                <Reveal key={item.title} direction={index === 0 ? "right" : "left"}>
                  <div className="h-full rounded-md border border-ink/10 bg-porcelain p-7 shadow-soft">
                    <Icon className="text-bronze" size={34} />
                    <h3 className="mt-6 font-display text-2xl font-semibold text-ink">{item.title}</h3>
                    <p className="mt-5 text-sm leading-7 text-graphite/75">{item.description}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
          <Reveal className="mt-8 rounded-md bg-ink p-7 text-white">
            <p className="text-base leading-8">
              Because 9D works precisely on deep structures, it is designed to avoid common traditional facelift
              complications:
            </p>
            <ul className="mt-5 grid gap-3 text-sm text-white/80 md:grid-cols-2">
              <li className="flex gap-3">
                <Check className="mt-1 shrink-0 text-champagne" size={17} />
                Hair follicle necrosis, hair loss, or a receding hairline
              </li>
              <li className="flex gap-3">
                <Check className="mt-1 shrink-0 text-champagne" size={17} />
                Ear distortion, a key test of skill in deep plane facelift surgery
              </li>
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="bg-mist px-5 py-20 text-center sm:px-8">
        <Reveal>
          <p className="section-label">GLOBAL AESTHETICS</p>
          <h2 className="mx-auto max-w-4xl font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
            Travel Halfway Around The World
            <br />
            Because Your Beauty Allows No Trial And Error
          </h2>
          <p className="mt-5 text-sm font-semibold uppercase tracking-[0.2em] text-bronze">
            Only One 9D | Only By Dr. Xiao
          </p>
          <Link
            href="/consultation"
            className="mt-9 inline-flex h-12 items-center justify-center rounded-md bg-ink px-6 text-sm font-bold text-white transition hover:bg-champagne hover:text-ink"
          >
            Book Your 1-on-1 Online Consultation
          </Link>
        </Reveal>
      </section>

      <section id="contact" className="bg-porcelain px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal direction="right">
            <p className="section-label">CONTACT US</p>
            <h2 className="section-title">Book A Consultation</h2>
            <p className="mt-6 text-base leading-8 text-graphite/75">
              Contact us to begin your Charm Preservation journey. Dr. Xiao's team will reply within 24 hours.
            </p>
            <div className="mt-9 grid gap-4">
              <ContactItem icon={<MessageCircle size={22} />} title="WhatsApp">
                <a className="font-semibold text-whatsapp" href={getWhatsAppUrl(safeSettings)} target="_blank" rel="noreferrer">
                  Chat directly -&gt;
                </a>
              </ContactItem>
              <WeChatContactCard
                description={safeSettings.wechatDescription || defaultSettings.wechatDescription}
                qrImage={safeSettings.wechatQrImage || defaultSettings.wechatQrImage}
                wechatId={safeSettings.wechatId}
              />
              <ContactItem icon={<Mail size={22} />} title="Email">
                {safeSettings.email}
              </ContactItem>
              <ContactItem icon={<MapPin size={22} />} title="Location">
                {safeSettings.location}
              </ContactItem>
            </div>
            <div className="mt-8 rounded-md border border-ink/10 bg-white px-5 pb-5 pt-6 shadow-soft">
              <div className="flex items-center justify-between gap-3">
                {socialLinks.map((item) => {
                  const href = item.href || "#contact";
                  const isExternal = /^https?:\/\//.test(href);

                  return (
                    <a
                      key={item.label}
                      href={href}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noreferrer" : undefined}
                      aria-label={item.label}
                      title={item.label}
                      style={{ color: item.color }}
                      className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-md border border-ink/10 bg-porcelain shadow-soft transition hover:-translate-y-0.5 hover:border-champagne hover:bg-white hover:shadow-lift"
                    >
                      {item.icon}
                    </a>
                  );
                })}
              </div>
              <div className="mt-5 h-px w-full bg-ink/10" />
            </div>
          </Reveal>

          <Reveal direction="left">
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}

function SectionHeader({
  label,
  title,
  highlight,
  description
}: {
  label: string;
  title: string;
  highlight: string;
  description?: string;
}) {
  return (
    <Reveal className="mx-auto max-w-3xl text-center">
      <p className="section-label">{label}</p>
      <h2 className="section-title">
        {title}
        <br />
        <span>{highlight}</span>
      </h2>
      {description ? <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-graphite/70">{description}</p> : null}
    </Reveal>
  );
}

function WhatsAppBrandIcon() {
  return (
    <svg aria-hidden="true" className="h-6 w-6" viewBox="0 0 24 24" fill="none">
      <path
        d="M12.03 3.25a8.61 8.61 0 0 0-7.34 13.11L3.75 20l3.75-.98a8.6 8.6 0 1 0 4.53-15.77Z"
        fill="currentColor"
      />
      <path
        d="M9.44 7.72c.18-.4.37-.41.64-.41h.46c.15 0 .35.05.52.4l.71 1.7c.08.2.07.36-.04.53l-.34.46c-.13.15-.11.31.03.5.35.48.93 1.17 1.62 1.53.23.12.39.1.53-.06l.62-.71c.15-.18.33-.22.55-.12l1.65.78c.26.12.39.28.35.57-.06.5-.46 1.2-1 1.46-.42.2-1.91.27-4.05-1.59-2.18-1.9-2.8-3.72-2.56-4.4.18-.51.5-.96.7-1.08Z"
        fill="#fff"
      />
    </svg>
  );
}

function EnvelopeBrandIcon() {
  return (
    <svg aria-hidden="true" className="h-6 w-6" viewBox="0 0 24 24" fill="none">
      <rect x="3.5" y="5.75" width="17" height="12.5" rx="2.2" fill="currentColor" />
      <path d="m5.25 8.05 6.75 5.1 6.75-5.1" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function InstagramBrandIcon() {
  return (
    <svg aria-hidden="true" className="h-6 w-6" viewBox="0 0 24 24" fill="none">
      <defs>
        <linearGradient id="instagram-brand-gradient" x1="5" y1="19" x2="19" y2="5" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F58529" />
          <stop offset="0.35" stopColor="#DD2A7B" />
          <stop offset="0.7" stopColor="#8134AF" />
          <stop offset="1" stopColor="#515BD4" />
        </linearGradient>
      </defs>
      <rect x="4" y="4" width="16" height="16" rx="4.2" fill="url(#instagram-brand-gradient)" />
      <circle cx="12" cy="12" r="3.3" stroke="#fff" strokeWidth="1.8" />
      <circle cx="16.1" cy="7.9" r="1.05" fill="#fff" />
    </svg>
  );
}

function YouTubeBrandIcon() {
  return (
    <svg aria-hidden="true" className="h-6 w-6" viewBox="0 0 24 24" fill="none">
      <path
        d="M20.5 8.06a2.54 2.54 0 0 0-1.79-1.8C17.12 5.84 12 5.84 12 5.84s-5.12 0-6.71.42a2.54 2.54 0 0 0-1.79 1.8A26.5 26.5 0 0 0 3.08 12c0 1.33.13 2.64.42 3.94a2.54 2.54 0 0 0 1.79 1.8c1.59.42 6.71.42 6.71.42s5.12 0 6.71-.42a2.54 2.54 0 0 0 1.79-1.8c.29-1.3.42-2.61.42-3.94 0-1.33-.13-2.64-.42-3.94Z"
        fill="currentColor"
      />
      <path d="m10.35 15.1 4.85-2.8-4.85-2.8v5.6Z" fill="#fff" />
    </svg>
  );
}

function FacebookBrandIcon() {
  return (
    <svg aria-hidden="true" className="h-6 w-6" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="8.5" fill="currentColor" />
      <path d="M13.32 20.35v-6.54h2.2l.33-2.55h-2.53V9.63c0-.74.2-1.24 1.27-1.24h1.35V6.1a18.05 18.05 0 0 0-1.97-.1c-1.95 0-3.29 1.2-3.29 3.38v1.88H8.48v2.55h2.2v6.54h2.64Z" fill="#fff" />
    </svg>
  );
}

function ContactItem({
  icon,
  title,
  children,
  href
}: {
  icon: ReactNode;
  title: string;
  children: ReactNode;
  href?: string;
}) {
  const isExternal = Boolean(href && /^https?:\/\//.test(href));
  const className = `flex gap-4 rounded-md border border-ink/10 bg-white p-4 shadow-soft ${
    href ? "transition hover:-translate-y-0.5 hover:border-champagne hover:shadow-lift" : ""
  }`;
  const content = (
    <>
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-mist text-bronze">{icon}</div>
      <div>
        <h3 className="text-sm font-bold text-ink">{title}</h3>
        <div className="mt-1 text-sm leading-6 text-graphite/70">{children}</div>
      </div>
    </>
  );

  if (href) {
    return (
      <a href={href} target={isExternal ? "_blank" : undefined} rel={isExternal ? "noreferrer" : undefined} className={className}>
        {content}
      </a>
    );
  }

  return (
    <div className={className}>
      {content}
    </div>
  );
}
