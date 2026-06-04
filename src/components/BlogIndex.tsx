"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { categoryFilters } from "@/lib/site-data";
import type { BlogPost, CategoryKey } from "@/lib/site-types";
import { Reveal } from "./Reveal";

type BlogIndexProps = {
  posts: BlogPost[];
};

export function BlogIndex({ posts }: BlogIndexProps) {
  const [active, setActive] = useState<"all" | CategoryKey>("all");
  const filtered = useMemo(
    () => (active === "all" ? posts : posts.filter((post) => post.category === active)),
    [active, posts]
  );

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
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((post, index) => (
            <Reveal key={post.slug} delay={(index % 3) * 0.07}>
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
          ))}
        </div>
      </section>
    </>
  );
}
