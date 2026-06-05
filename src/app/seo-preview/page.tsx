import type { Metadata } from "next";
import {
  ArrowUpRight,
  BarChart3,
  Bot,
  CheckCircle2,
  FileSearch,
  Globe2,
  LockKeyhole,
  Network,
  SearchCheck,
  ShieldCheck
} from "lucide-react";
import Link from "next/link";
import { getPosts } from "@/lib/sanity";
import { absoluteUrl, siteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "SEO Foundation Preview",
  robots: {
    index: false,
    follow: false
  }
};

const completedItems = [
  {
    icon: SearchCheck,
    title: "Sitemap Enabled",
    copy: "Search engines can discover the homepage, article index, and article detail URLs.",
    href: "/sitemap.xml"
  },
  {
    icon: Bot,
    title: "Robots Rules",
    copy: "Public pages are crawlable while the CMS Studio route is excluded from indexing.",
    href: "/robots.txt"
  },
  {
    icon: Network,
    title: "Canonical URLs",
    copy: "Homepage, blog index, and article pages now declare their preferred canonical addresses.",
    href: "/blog"
  },
  {
    icon: ShieldCheck,
    title: "Structured Data",
    copy: "Organization, physician, website, article, and breadcrumb data are prepared for Google understanding.",
    href: "/"
  }
];

const nextItems = [
  "Add Google Search Console verification code",
  "Add GA4 measurement ID and conversion events",
  "Create independent procedure pages",
  "Add SEO fields to Sanity articles and cases"
];

export default async function SeoPreviewPage() {
  const posts = await getPosts();

  return (
    <main className="min-h-screen bg-[#f7f4ee] text-ink">
      <section className="border-b border-ink/10 bg-ink px-5 py-16 text-white sm:px-8 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase text-champagne" style={{ letterSpacing: "0.22em" }}>
              SEO / GEO Foundation
            </p>
            <h1 className="mt-5 max-w-4xl font-display text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              Search visibility starts with a clean technical base.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/72">
              This private preview summarizes the first SEO layer for Dr. Xiao 9D: crawlability, canonical signals,
              structured data, and the remaining analytics setup.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {[
              ["Domain", "Live"],
              ["Articles", String(posts.length)],
              ["Studio", "Noindex"]
            ].map(([label, value]) => (
              <div key={label} className="rounded-md border border-white/12 bg-white/[0.06] p-5">
                <p className="text-xs font-semibold uppercase text-white/50" style={{ letterSpacing: "0.14em" }}>
                  {label}
                </p>
                <p className="mt-3 font-display text-3xl font-semibold text-champagne">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-12 sm:px-8 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-5 border-b border-ink/10 pb-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="section-label">FIRST LAYER</p>
              <h2 className="section-title">
                Technical SEO
                <br />
                <span>Ready For Indexing</span>
              </h2>
            </div>
            <Link
              href={siteUrl}
              className="inline-flex h-11 items-center gap-2 rounded-md bg-ink px-5 text-sm font-semibold text-white transition hover:bg-bronze"
            >
              Visit Live Site <ArrowUpRight size={16} />
            </Link>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {completedItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group rounded-md border border-ink/10 bg-white p-6 shadow-soft transition hover:-translate-y-1 hover:border-bronze/50"
                >
                  <div className="flex items-center justify-between">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-mist text-bronze">
                      <Icon size={22} />
                    </span>
                    <CheckCircle2 className="text-sage" size={20} />
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-semibold text-ink">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-graphite/72">{item.copy}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-bronze">
                    Inspect <ArrowUpRight size={15} className="transition group-hover:translate-x-0.5" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-12 sm:px-8 lg:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="section-label">CRAWL MAP</p>
            <h2 className="section-title">
              Pages Google
              <br />
              <span>Can Discover</span>
            </h2>
            <p className="mt-6 text-sm leading-7 text-graphite/72">
              The first sitemap includes the homepage, article index, and live article URLs. Procedure and case pages
              will join this map after the next build phase.
            </p>
          </div>

          <div className="grid gap-3">
            {[absoluteUrl("/"), absoluteUrl("/blog"), ...posts.slice(0, 6).map((post) => absoluteUrl(`/blog/${post.slug}`))].map(
              (url) => (
                <div key={url} className="flex items-center gap-4 rounded-md border border-ink/10 bg-[#fbfaf7] px-4 py-3">
                  <Globe2 className="shrink-0 text-bronze" size={18} />
                  <span className="min-w-0 flex-1 truncate text-sm text-graphite">{url}</span>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      <section className="px-5 py-12 sm:px-8 lg:py-16">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
          <div className="rounded-md bg-ink p-7 text-white">
            <FileSearch className="text-champagne" size={30} />
            <h2 className="mt-5 font-display text-3xl font-semibold">What Is Still Needed</h2>
            <div className="mt-6 grid gap-3">
              {nextItems.map((item) => (
                <div key={item} className="flex gap-3 rounded-md bg-white/[0.06] p-4 text-sm leading-6 text-white/78">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-champagne" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {[
              {
                icon: BarChart3,
                label: "GA4",
                value: "Waiting for ID",
                copy: "Tracking will start after you provide the GA4 measurement ID."
              },
              {
                icon: LockKeyhole,
                label: "Search Console",
                value: "Waiting for code",
                copy: "Google ownership verification needs a Search Console token."
              }
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="rounded-md border border-ink/10 bg-white p-6 shadow-soft">
                  <Icon className="text-bronze" size={28} />
                  <p className="mt-5 text-xs font-bold uppercase text-graphite/50" style={{ letterSpacing: "0.14em" }}>
                    {item.label}
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-semibold text-ink">{item.value}</h3>
                  <p className="mt-4 text-sm leading-7 text-graphite/72">{item.copy}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}

