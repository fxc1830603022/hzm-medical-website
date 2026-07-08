import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { BlogIndex } from "@/components/BlogIndex";
import { Navbar } from "@/components/Navbar";
import { GlobalBottomCTA } from "@/components/GlobalBottomCTA";
import { StructuredData } from "@/components/StructuredData";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { getFaqItemsForPage, getPosts, getSiteSettings } from "@/lib/sanity";
import { absoluteUrl, blogItemListJsonLd, collectionPageJsonLd, imageUrl } from "@/lib/seo";

const blogPageSeo = {
  title: "9D Facelift Resource Center | Dr. Xiao Zhongye",
  description:
    "Expert guides on 9D Facelift, deep plane facelift, recovery, natural results, and international patient planning."
};

export const metadata: Metadata = {
  title: {
    absolute: blogPageSeo.title
  },
  description: blogPageSeo.description,
  alternates: {
    canonical: absoluteUrl("/blog")
  },
  openGraph: {
    title: blogPageSeo.title,
    description: blogPageSeo.description,
    url: absoluteUrl("/blog"),
    images: [imageUrl()]
  }
};

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const [posts, settings, faqItems] = await Promise.all([getPosts(), getSiteSettings(), getFaqItemsForPage("/blog")]);

  return (
    <>
      <StructuredData
        data={[
          collectionPageJsonLd({
            name: blogPageSeo.title,
            description: blogPageSeo.description,
            path: "/blog"
          }),
          blogItemListJsonLd(posts)
        ]}
      />
      <Navbar settings={settings} />
      <main className="pt-28">
        <section className="relative isolate flex min-h-[82vh] items-center overflow-hidden bg-ink px-5 py-24 text-white sm:px-8 lg:min-h-[90vh]">
          <Image
            src="/images/896412cd7db178d8aff7975c761cf596.jpg"
            alt="Dr. Xiao Zhongye 9D Facelift resource center"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[70%_18%] opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-ink/20" />
          <div className="absolute inset-0 bg-ink/12" />
          <div className="relative z-10 mx-auto w-full max-w-7xl">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase text-champagne" style={{ letterSpacing: "0.2em" }}>
                Expert Guides. Natural Results. Global Trust.
              </p>
              <h1 className="mt-6 max-w-4xl font-display text-5xl font-semibold leading-[0.98] text-white sm:text-7xl lg:text-[6.7rem]">
                9D Facelift
                <span className="block text-champagne">Resource Center</span>
              </h1>
              <p className="mt-7 max-w-2xl text-base leading-8 text-white/86 sm:text-lg">
                Expert guides on 9D Facelift, deep plane facelift, recovery, natural results, and international patient
                planning.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="#featured-guide"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-champagne px-6 text-sm font-bold text-ink transition hover:bg-bronze hover:text-white"
                >
                  Explore All Guides
                </Link>
                <Link
                  href="/consultation"
                  className="inline-flex h-12 items-center justify-center rounded-md border border-white/34 bg-ink/18 px-6 text-sm font-bold text-white transition hover:border-champagne hover:text-champagne"
                >
                  Book a Consultation
                </Link>
              </div>
            </div>
          </div>
        </section>
        <BlogIndex posts={posts} faqItems={faqItems} />
        <GlobalBottomCTA settings={settings} source="blog-bottom-cta" />
      </main>
      <Footer />
      <BackToTop />
      <WhatsAppFloat settings={settings} />
    </>
  );
}
