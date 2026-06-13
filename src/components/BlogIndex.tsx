"use client";

import {
  ArrowRight,
  CheckCircle2,
  Globe2,
  Layers3,
  Send,
  ShieldCheck,
  Sparkles
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { FormEvent } from "react";
import { useState } from "react";
import type { LandingFAQ } from "@/lib/landing-pages";
import { categoryFilters } from "@/lib/site-data";
import type { BlogPost, CategoryKey } from "@/lib/site-types";
import { Reveal } from "./Reveal";

type BlogIndexProps = {
  posts: BlogPost[];
  faqItems?: LandingFAQ[];
};

type SubmitState = "idle" | "submitting" | "success" | "error";

export function BlogIndex({ posts, faqItems = [] }: BlogIndexProps) {
  const [active, setActive] = useState<"all" | CategoryKey>("all");
  const shouldShowCmsFaq = active === "faq" && faqItems.length > 0;
  const visiblePosts = posts.filter((post) => active === "all" || post.category === active);

  return (
    <>
      <section id="featured-guide" className="bg-porcelain px-5 py-14 sm:px-8 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <Reveal className="grid overflow-hidden rounded-md border border-ink/10 bg-white shadow-lift lg:grid-cols-[0.82fr_1fr]">
            <Link href="/procedures/9d-facelift" className="group relative min-h-[330px] overflow-hidden bg-mist lg:min-h-[455px]">
              <Image
                src="/images/blog-featured-9d-facelift-guide.jpg"
                alt="Natural 9D Facelift patient result guide"
                fill
                unoptimized
                sizes="(max-width: 1024px) 100vw, 48vw"
                className="object-cover object-center transition duration-700 group-hover:scale-105"
              />
            </Link>
            <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
              <p className="section-label">Featured Guide</p>
              <h2 className="mt-5 font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
                What Is 9D Facelift?
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-graphite/76">
                A comprehensive introduction to Dr. Xiao Zhongye&apos;s anatomy-based facelift philosophy, designed for
                natural expression, long-lasting structure, and international patient decision-making.
              </p>
              <div className="mt-7 grid gap-3 text-sm leading-7 text-graphite/78">
                {featuredInsights.map((item) => (
                  <p key={item} className="flex gap-3">
                    <CheckCircle2 className="mt-1 shrink-0 text-bronze" size={16} />
                    <span>{item}</span>
                  </p>
                ))}
              </div>
              <Link
                href="/procedures/9d-facelift"
                className="mt-8 inline-flex w-fit items-center gap-2 rounded-md border border-bronze/45 px-5 py-3 text-sm font-bold text-bronze transition hover:border-ink hover:bg-ink hover:text-white"
              >
                Read Guide <ArrowRight size={16} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-porcelain px-5 pb-16 sm:px-8 lg:pb-20">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 xl:grid-cols-4">
          {topicClusters.map((topic, index) => {
            const Icon = topic.icon;

            return (
              <Reveal key={topic.title} delay={index * 0.06}>
                <article className="flex h-full flex-col rounded-md border border-ink/10 bg-white p-7 shadow-soft transition hover:-translate-y-1 hover:border-champagne hover:shadow-lift">
                  <div className="flex justify-center">
                    <span className="inline-flex h-16 w-16 items-center justify-center rounded-full border border-champagne/45 bg-porcelain text-bronze">
                      <Icon size={29} strokeWidth={1.5} />
                    </span>
                  </div>
                  <h3 className="mt-6 text-center font-display text-2xl font-semibold leading-tight text-ink">
                    {topic.title}
                  </h3>
                  <p className="mx-auto mt-3 max-w-[18rem] text-center text-sm leading-6 text-graphite/68">
                    {topic.description}
                  </p>
                  <div className="mt-7 border-t border-ink/10 pt-5">
                    {topic.links.map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        className="group flex items-center justify-between gap-4 py-2 text-sm font-medium text-graphite transition hover:text-bronze"
                      >
                        <span>{link.label}</span>
                        <ArrowRight size={14} className="transition group-hover:translate-x-1" />
                      </Link>
                    ))}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="bg-porcelain px-5 pb-16 sm:px-8 lg:pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-5">
            <Reveal>
              <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">Latest Articles</h2>
            </Reveal>
            <Reveal delay={0.04} className="flex flex-wrap gap-2">
              {categoryFilters.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setActive(item.key)}
                  className={`h-9 rounded-md border px-3 text-xs font-bold transition ${
                    active === item.key
                      ? "border-ink bg-ink text-white"
                      : "border-ink/12 bg-white text-graphite hover:border-champagne hover:text-bronze"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </Reveal>
          </div>

          <div className={`mx-auto max-w-5xl ${shouldShowCmsFaq ? "" : "hidden"}`}>
            <Reveal className="mb-10 text-center">
              <p className="section-label">FAQ</p>
              <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
                Common Questions
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-graphite/70">
                Clear answers for patients considering online consultation, facial rejuvenation, and international care.
              </p>
            </Reveal>
            <div className="grid gap-4">
              {faqItems.map((faq, index) => (
                <Reveal key={`${faq.question}-${index}`} delay={(index % 4) * 0.05}>
                  <article className="rounded-md border border-ink/10 bg-white p-6 shadow-soft transition hover:-translate-y-0.5 hover:border-champagne hover:shadow-lift">
                    <div className="flex gap-4">
                      <span className="mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-champagne/70 bg-porcelain font-display text-sm font-semibold text-bronze">
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

          <div className={`grid gap-5 md:grid-cols-2 xl:grid-cols-4 ${shouldShowCmsFaq ? "hidden" : ""}`}>
            {visiblePosts.map((post, index) => (
              <Reveal key={post.slug} delay={(index % 4) * 0.05}>
                <article className="h-full overflow-hidden rounded-md border border-ink/10 bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-lift">
                  <Link href={`/blog/${post.slug}`} className="group block">
                    <div className="relative aspect-[4/3] overflow-hidden bg-mist">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        unoptimized
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                      <span className="absolute left-3 top-3 rounded-md bg-champagne px-2.5 py-1 text-[10px] font-bold uppercase text-ink">
                        {post.categoryLabel}
                      </span>
                    </div>
                    <div className="p-5">
                      <div className="flex flex-wrap gap-2 text-[10px] font-bold uppercase text-graphite/55">
                        <time dateTime={post.date}>{post.displayDate}</time>
                        <span>{post.readTime}</span>
                      </div>
                      <h3 className="mt-3 font-display text-xl font-semibold leading-tight text-ink">{post.title}</h3>
                      <p className="mt-3 line-clamp-3 text-xs leading-6 text-graphite/72">{post.excerpt}</p>
                      <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-bronze">
                        Read Guide <ArrowRight size={15} />
                      </span>
                    </div>
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-ink text-white">
        <div className="grid items-stretch lg:min-h-[390px] lg:grid-cols-[34vw_minmax(0,1fr)_19vw]">
          <Reveal className="relative min-h-[330px] overflow-hidden lg:min-h-[390px]">
            <Image
              src="/images/896412cd7db178d8aff7975c761cf596.jpg"
              alt="Dr. Xiao Zhongye doctor insight"
              fill
              unoptimized
              sizes="(max-width: 1024px) 100vw, 34vw"
              className="object-cover object-[50%_18%]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-ink" />
            <div className="absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-ink to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink to-transparent" />
          </Reveal>
          <Reveal delay={0.04} className="lg:border-r lg:border-white/16 lg:pr-12">
            <div className="flex h-full max-w-3xl flex-col justify-center px-5 py-12 sm:px-8 lg:px-14">
              <p className="section-label">Doctor Insight</p>
              <h2 className="mt-5 font-display text-4xl font-semibold leading-tight text-white sm:text-5xl">
                Precision. Anatomy.
                <span className="block">Natural Beauty.</span>
              </h2>
              <div className="mt-7 h-px w-56 bg-champagne/65" />
              <p className="mt-7 max-w-3xl text-sm leading-7 text-white/72">
                9D Facelift is more than a technique. It is a philosophy rooted in anatomy, balance, and restraint.
                My goal is not to change who you are, but to help you look as vibrant as you feel.
              </p>
              <div className="mt-8 font-display text-2xl italic text-champagne">Dr. Xiao Zhongye</div>
              <p className="mt-2 text-xs font-semibold uppercase text-white/58" style={{ letterSpacing: "0.16em" }}>
                Charm Preservation Surgeon
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="flex h-full flex-col justify-center gap-8 border-l border-white/16 px-5 py-12 sm:px-8 lg:pl-8">
              {doctorStats.map((item) => (
                <div key={item.value}>
                  <div className="font-display text-4xl font-semibold text-champagne">{item.value}</div>
                  <p className="mt-2 text-xs font-bold uppercase leading-5 text-white/72" style={{ letterSpacing: "0.14em" }}>
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-porcelain px-5 py-14 sm:px-8 lg:py-16">
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
              <Link
                href="/international-patients"
                className="inline-flex h-11 items-center justify-center rounded-md border border-ink/12 px-5 text-sm font-bold text-bronze transition hover:border-bronze"
              >
                International Patient Plan <ArrowRight size={15} />
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <BlogLeadForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}

const featuredInsights = [
  "How 9D Facelift differs from traditional facelift techniques",
  "Key benefits for facial rejuvenation and long-term results",
  "Who is an ideal candidate for 9D Facelift?"
];

const topicClusters = [
  {
    title: "9D Facelift",
    description: "Understand the 9D lifting system, techniques, and who it is best for.",
    icon: Sparkles,
    links: [
      { label: "What is 9D Facelift?", href: "/procedures/9d-facelift" },
      { label: "9D Facelift vs Thread Lift", href: "/blog/thread-lift-vs-surgical-facelift-do-not-confuse-the-concepts" },
      { label: "Full vs Mini vs 9D Facelift", href: "/procedures/9d-facelift" }
    ]
  },
  {
    title: "Deep Plane Facelift",
    description: "In-depth guides on deep plane techniques and structural lifting.",
    icon: Layers3,
    links: [
      { label: "What is Deep Plane Facelift?", href: "/blog/what-is-a-deep-plane-facelift-and-how-is-it-different" },
      { label: "Deep Plane Recovery Timeline", href: "/blog/facelift-recovery-guide-day-1-to-day-90" },
      { label: "Deep Plane vs Traditional Lift", href: "/procedures/9d-deep-plane-facelift" }
    ]
  },
  {
    title: "Recovery & Safety",
    description: "Recovery timelines, safety tips, and aftercare guidance.",
    icon: ShieldCheck,
    links: [
      { label: "Recovery Timelines", href: "/blog/facelift-recovery-guide-day-1-to-day-90" },
      { label: "Scars & Incisions", href: "/procedures/9d-facelift" },
      { label: "Risks & How We Minimize Them", href: "/consultation" }
    ]
  },
  {
    title: "International Patients",
    description: "Travel, consultation, and care designed for you.",
    icon: Globe2,
    links: [
      { label: "Why Patients Travel to Us", href: "/international-patients" },
      { label: "Consultation Process", href: "/consultation" },
      { label: "Travel & Stay Guide", href: "/international-patients" }
    ]
  }
];

const doctorStats = [
  { value: "27+", label: "Years of experience" },
  { value: "10,000+", label: "Successful cases" },
  { value: "Global", label: "Patients from 30+ countries" }
];

function BlogLeadForm() {
  const [state, setState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      if (!response.ok || !data.ok) throw new Error(data.error || "Submission failed");

      setState("success");
      setMessage("Submitted. Our team will contact you soon.");
      form.reset();
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "Please try again or contact us on WhatsApp.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="rounded-md border border-ink/10 bg-white p-4 shadow-lift sm:p-5">
      <input type="hidden" name="source" value="blog-resource-center" />
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          className="h-11 rounded-md border border-ink/12 bg-porcelain px-4 text-sm outline-none transition placeholder:text-graphite/42 focus:border-champagne"
          type="text"
          name="name"
          placeholder="Full Name"
          required
        />
        <input
          className="h-11 rounded-md border border-ink/12 bg-porcelain px-4 text-sm outline-none transition placeholder:text-graphite/42 focus:border-champagne"
          type="email"
          name="email"
          placeholder="Email Address"
          required
        />
        <select
          className="h-11 rounded-md border border-ink/12 bg-porcelain px-4 text-sm text-graphite outline-none transition focus:border-champagne"
          name="gender"
          defaultValue=""
          required
        >
          <option value="" disabled>
            Gender
          </option>
          <option value="Female">Female</option>
          <option value="Male">Male</option>
          <option value="Prefer not to say">Prefer not to say</option>
        </select>
        <select
          className="h-11 rounded-md border border-ink/12 bg-porcelain px-4 text-sm text-graphite outline-none transition focus:border-champagne"
          name="ageGroup"
          defaultValue=""
          required
        >
          <option value="" disabled>
            Age Group
          </option>
          <option value="Under 25">Under 25</option>
          <option value="25-35">25-35</option>
          <option value="36-45">36-45</option>
          <option value="46-55">46-55</option>
          <option value="55+">55+</option>
        </select>
        <input
          className="h-11 rounded-md border border-ink/12 bg-porcelain px-4 text-sm outline-none transition placeholder:text-graphite/42 focus:border-champagne"
          type="text"
          name="country"
          placeholder="Country / Region"
          required
        />
        <input
          className="h-11 rounded-md border border-ink/12 bg-porcelain px-4 text-sm outline-none transition placeholder:text-graphite/42 focus:border-champagne"
          type="tel"
          name="whatsapp"
          placeholder="WhatsApp"
          required
        />
        <select
          className="h-11 rounded-md border border-ink/12 bg-porcelain px-4 text-sm text-graphite outline-none transition focus:border-champagne sm:col-span-2"
          name="facialConcerns"
          defaultValue=""
          required
        >
          <option value="" disabled>
            I&apos;m interested in...
          </option>
          <option value="9D Facelift (mild to moderate aging)">9D Facelift</option>
          <option value="9D Deep Plane Facelift (severe laxity)">9D Deep Plane Facelift</option>
          <option value="Not sure, I need an assessment">Not sure, I need an assessment</option>
          <option value="Sagging midface">Sagging midface</option>
          <option value="Jowls / lower face laxity">Jowls / lower face laxity</option>
          <option value="Loose neck skin">Loose neck skin</option>
          <option value="Deep nasolabial folds">Deep nasolabial folds</option>
        </select>
        <select
          className="h-11 rounded-md border border-ink/12 bg-porcelain px-4 text-sm text-graphite outline-none transition focus:border-champagne"
          name="budget"
          defaultValue=""
          required
        >
          <option value="" disabled>
            Budget
          </option>
          <option value="$5,000 - $10,000">$5,000 - $10,000</option>
          <option value="$10,000 - $20,000">$10,000 - $20,000</option>
          <option value="Over $20,000">Over $20,000</option>
        </select>
        <input
          className="h-11 rounded-md border border-ink/12 bg-porcelain px-4 text-sm outline-none transition placeholder:text-graphite/42 focus:border-champagne"
          type="text"
          name="wechat"
          placeholder="WeChat ID (optional)"
        />
      </div>
      <textarea
        className="mt-3 min-h-20 w-full rounded-md border border-ink/12 bg-porcelain px-4 py-3 text-sm outline-none transition placeholder:text-graphite/42 focus:border-champagne"
        name="message"
        placeholder="Briefly describe your goals or concerns..."
      />
      <button
        type="submit"
        disabled={state === "submitting"}
        className="mt-3 inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-ink px-5 text-sm font-bold text-white transition hover:bg-champagne hover:text-ink disabled:cursor-not-allowed disabled:opacity-65"
      >
        <Send size={16} />
        {state === "submitting" ? "Submitting..." : "Submit Consultation Request"}
      </button>
      {message ? (
        <p className={`mt-3 text-sm ${state === "success" ? "text-sage" : "text-rosewood"}`}>
          {message}
        </p>
      ) : null}
    </form>
  );
}
