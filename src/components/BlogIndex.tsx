"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { LandingFAQ } from "@/lib/landing-pages";
import { categoryFilters } from "@/lib/site-data";
import type { BlogPost, CategoryKey } from "@/lib/site-types";
import { Reveal } from "./Reveal";

type BlogIndexProps = {
  posts: BlogPost[];
  faqItems?: LandingFAQ[];
};

export function BlogIndex({ posts, faqItems = [] }: BlogIndexProps) {
  const [active, setActive] = useState<"all" | CategoryKey>("all");
  const shouldShowCmsFaq = active === "faq" && faqItems.length > 0;

  return (
    <>
      <section className="border-b border-ink/10 bg-white px-5 py-6 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-3">
          {categoryFilters.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setActive(item.key)}
              className={`h-10 rounded-md border px-4 text-sm font-semibold transition ${
                active === item.key
                  ? "border-ink bg-ink text-white"
                  : "border-ink/15 bg-white text-graphite hover:border-champagne hover:text-bronze"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </section>

      <section className="bg-porcelain px-5 py-16 sm:px-8 lg:py-24">
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

        <div className={`mx-auto grid max-w-7xl gap-8 md:grid-cols-2 xl:grid-cols-3 ${shouldShowCmsFaq ? "hidden" : ""}`}>
          {posts.map((post, index) => {
            const shouldShowPost = active === "all" || post.category === active;

            return (
              <Reveal key={post.slug} delay={(index % 3) * 0.07} className={shouldShowPost ? "" : "hidden"}>
                <article className="h-full overflow-hidden rounded-md bg-white shadow-soft">
                  <Link href={`/blog/${post.slug}`} className="group block">
                    <div className="relative aspect-[16/10] overflow-hidden bg-mist">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        unoptimized
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                      <span className="absolute left-4 top-4 rounded-md bg-champagne px-3 py-1 text-xs font-bold text-ink">
                        {post.categoryLabel}
                      </span>
                    </div>
                    <div className="p-6">
                      <div className="flex flex-wrap gap-3 text-xs font-semibold uppercase text-graphite/60">
                        <time dateTime={post.date}>{post.displayDate}</time>
                        <span>{post.readTime}</span>
                      </div>
                      <h2 className="mt-4 font-display text-2xl font-semibold leading-tight text-ink">
                        {post.title}
                      </h2>
                      <p className="mt-4 line-clamp-3 text-sm leading-7 text-graphite/75">{post.excerpt}</p>
                      <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-bronze">
                        Read More <ArrowRight size={16} />
                      </span>
                    </div>
                  </Link>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>
    </>
  );
}
