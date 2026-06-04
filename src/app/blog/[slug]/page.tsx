import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { Navbar } from "@/components/Navbar";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { getPostBySlug, getSiteSettings } from "@/lib/sanity";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";
export const dynamicParams = true;

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Article | Dr. Xiao Zhongye"
    };
  }

  return {
    title: `${post.title} | Dr. Xiao Zhongye`,
    description: post.excerpt
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const [post, settings] = await Promise.all([getPostBySlug(slug), getSiteSettings()]);

  if (!post) notFound();

  return (
    <>
      <Navbar />
      <main className="bg-porcelain pt-20">
        <article>
          <section className="bg-ink px-5 py-12 text-white sm:px-8 lg:py-16">
            <div className="mx-auto max-w-4xl">
              <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-champagne">
                <ArrowLeft size={16} />
                Back to Articles
              </Link>
              <p className="mt-8 text-sm font-bold uppercase text-champagne" style={{ letterSpacing: "0.18em" }}>
                {post.categoryLabel}
              </p>
              <h1 className="mt-5 font-display text-4xl font-semibold leading-tight sm:text-5xl">
                {post.title}
              </h1>
              <div className="mt-5 flex flex-wrap gap-4 text-sm text-white/65">
                <time dateTime={post.date}>{post.displayDate}</time>
                <span>{post.readTime}</span>
              </div>
            </div>
          </section>

          <section className="px-5 py-12 sm:px-8 lg:py-16">
            <div className="mx-auto max-w-4xl overflow-hidden rounded-md bg-white shadow-soft">
              <div className="relative aspect-[16/9] bg-mist">
                <Image src={post.image} alt={post.title} fill sizes="100vw" className="object-cover" priority />
              </div>
              <div className="p-6 sm:p-10">
                <div className="article-content" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
                <div className="mt-10 rounded-md bg-mist p-6">
                  <p className="text-base leading-8 text-graphite">
                    Want to learn more? Contact us for a personalized consultation plan.
                  </p>
                  <Link
                    href="/#contact"
                    className="mt-5 inline-flex h-11 items-center rounded-md bg-ink px-5 text-sm font-semibold text-white transition hover:bg-champagne hover:text-ink"
                  >
                    Book a 1-on-1 Online Consultation
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </article>
      </main>
      <Footer />
      <BackToTop />
      <WhatsAppFloat settings={settings} />
    </>
  );
}
