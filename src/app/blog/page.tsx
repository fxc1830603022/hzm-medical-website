import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { BlogIndex } from "@/components/BlogIndex";
import { Navbar } from "@/components/Navbar";
import { NewsletterForm } from "@/components/NewsletterForm";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { getFaqItemsForPage, getPosts, getSiteSettings } from "@/lib/sanity";
import { absoluteUrl, imageUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Articles | Dr. Xiao Zhongye - 9D Facelift",
  description: "Technique notes, patient education, and professional perspectives from Dr. Xiao Zhongye.",
  alternates: {
    canonical: absoluteUrl("/blog")
  },
  openGraph: {
    title: "Articles | Dr. Xiao Zhongye - 9D Facelift",
    description: "Technique notes, patient education, and professional perspectives from Dr. Xiao Zhongye.",
    url: absoluteUrl("/blog"),
    images: [imageUrl()]
  }
};

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const [posts, settings, faqItems] = await Promise.all([getPosts(), getSiteSettings(), getFaqItemsForPage("/blog")]);

  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="bg-ink px-5 py-20 text-center text-white sm:px-8 lg:py-28">
          <p className="text-sm font-bold uppercase text-champagne" style={{ letterSpacing: "0.18em" }}>
            BLOG & ARTICLES
          </p>
          <h1 className="mt-5 font-display text-5xl font-semibold leading-tight sm:text-6xl">
            Expert Anti-Aging Insights
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/70">
            Technique notes, patient education, and professional perspectives from Dr. Xiao Zhongye.
          </p>
        </section>
        <BlogIndex posts={posts} faqItems={faqItems} />
        <section className="bg-ink px-5 py-16 text-center text-white sm:px-8">
          <h2 className="font-display text-3xl font-semibold">Subscribe To Dr. Xiao's Anti-Aging Updates</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/70">
            Receive technique notes, case insights, and exclusive consultation information.
          </p>
          <NewsletterForm />
        </section>
      </main>
      <Footer />
      <BackToTop />
      <WhatsAppFloat settings={settings} />
    </>
  );
}
