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
  }> = [
    {
      label: "WhatsApp",
      href: getWhatsAppUrl(safeSettings),
      icon: <WhatsAppBrandIcon />
    },
    {
      label: "Email",
      href: `mailto:${safeSettings.email}`,
      icon: <EnvelopeBrandIcon />
    },
    {
      label: "Instagram",
      href: safeSettings.instagramUrl,
      icon: <InstagramBrandIcon />
    },
    {
      label: "YouTube",
      href: safeSettings.youtubeUrl,
      icon: <YouTubeBrandIcon />
    },
    {
      label: "Facebook",
      href: safeSettings.facebookUrl,
      icon: <FacebookBrandIcon />
    }
  ];

  return (
    <>
      <section id="hero" className="relative flex min-h-[92vh] items-center overflow-hidden bg-ink px-5 py-28 text-white sm:px-8">
        <Image
          src="/images/896412cd7db178d8aff7975c761cf596.jpg"
          alt="9D Lifting System"
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
                Discover 9D Lifting
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
            <p className="section-label">ABOUT 9D LIFTING</p>
            <h2 className="section-title">
              What Is
              <br />
              <span>9D Lifting System</span>
            </h2>
            <p className="mt-7 text-xl leading-9 text-ink">
              9D Lifting System is the exclusive proprietary technique of Dr. Xiao Zhongye. Its core principle is
              always <strong>Charm Preservation</strong>.
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
                alt="9D Lifting System"
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
                      className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-md border border-ink/10 bg-porcelain text-[#005b34] shadow-soft transition hover:-translate-y-0.5 hover:border-champagne hover:bg-white hover:shadow-lift"
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
    <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none">
      <path
        d="M4.55 19.48 5.6 15.7a7.4 7.4 0 1 1 2.76 2.72l-3.81 1.06Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.15 8.5c.2-.45.4-.46.7-.46h.5c.16 0 .38.05.57.44l.78 1.87c.09.22.08.4-.04.58l-.38.5c-.14.17-.12.34.03.55.38.52 1.02 1.28 1.78 1.67.25.13.43.12.58-.06l.68-.78c.17-.2.37-.24.6-.13l1.82.86c.28.13.42.3.38.62-.06.55-.5 1.32-1.1 1.6-.46.22-2.1.3-4.45-1.75-2.4-2.08-3.08-4.08-2.82-4.82.2-.56.55-1.05.77-1.19Z"
        fill="currentColor"
      />
    </svg>
  );
}

function EnvelopeBrandIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none">
      <rect x="4" y="6.5" width="16" height="11" rx="1.6" stroke="currentColor" strokeWidth="1.8" />
      <path d="m5.2 8 6.8 5.1L18.8 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function InstagramBrandIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none">
      <rect x="5.2" y="5.2" width="13.6" height="13.6" rx="3.2" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="3.35" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="15.95" cy="8.15" r="1" fill="currentColor" />
    </svg>
  );
}

function YouTubeBrandIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none">
      <path
        d="M20.25 8.38a2.4 2.4 0 0 0-1.68-1.7C17.08 6.3 12 6.3 12 6.3s-5.08 0-6.57.4a2.4 2.4 0 0 0-1.68 1.69A25.1 25.1 0 0 0 3.35 12c0 1.22.12 2.43.4 3.62a2.4 2.4 0 0 0 1.68 1.7c1.49.39 6.57.39 6.57.39s5.08 0 6.57-.4a2.4 2.4 0 0 0 1.68-1.69c.28-1.19.4-2.4.4-3.62 0-1.22-.12-2.43-.4-3.62Z"
        fill="currentColor"
      />
      <path d="m10.45 14.65 4.05-2.34-4.05-2.35v4.69Z" fill="#fbfaf7" />
    </svg>
  );
}

function FacebookBrandIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none">
      <path
        d="M13.55 20v-7.05h2.33l.36-2.75h-2.69V8.47c0-.8.22-1.34 1.36-1.34h1.45V4.66A19.35 19.35 0 0 0 14.24 4c-2.1 0-3.53 1.28-3.53 3.62v2.58H8.34v2.75h2.37V20h2.84Z"
        fill="currentColor"
      />
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
