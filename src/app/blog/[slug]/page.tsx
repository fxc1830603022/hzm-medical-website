import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleBackButton } from "@/components/ArticleBackButton";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { GlobalBottomCTA } from "@/components/GlobalBottomCTA";
import { Navbar } from "@/components/Navbar";
import { StructuredData } from "@/components/StructuredData";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { getPostBySlug, getSiteSettings } from "@/lib/sanity";
import { absoluteUrl, articleJsonLd, breadcrumbJsonLd, imageUrl, webPageJsonLd } from "@/lib/seo";

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

  const metaTitle = post.seoTitle || post.title;
  const metaDescription = post.metaDescription || post.excerpt;
  const canonicalUrl = post.canonicalUrl || absoluteUrl(`/blog/${post.slug}`);
  const keywords = [post.focusKeyword, ...(post.secondaryKeywords || [])].filter(Boolean) as string[];

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: keywords.length ? keywords : undefined,
    alternates: {
      canonical: canonicalUrl
    },
    openGraph: {
      type: "article",
      title: metaTitle,
      description: metaDescription,
      url: absoluteUrl(`/blog/${post.slug}`),
      images: [imageUrl(post.image)],
      publishedTime: post.date
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: [imageUrl(post.image)]
    }
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const [post, settings] = await Promise.all([getPostBySlug(slug), getSiteSettings()]);

  if (!post) notFound();

  return (
    <>
      <StructuredData
        data={[
          webPageJsonLd({
            name: post.seoTitle || post.title,
            description: post.metaDescription || post.excerpt,
            path: `/blog/${post.slug}`,
            image: post.image
          }),
          articleJsonLd(post),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Articles", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` }
          ])
        ]}
      />
      <Navbar settings={settings} />
      <main className="bg-porcelain pt-28">
        <article>
          <section className="bg-ink px-5 py-12 text-white sm:px-8 lg:py-16">
            <div className="mx-auto max-w-4xl">
              <ArticleBackButton />
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
              <div className="relative flex bg-mist">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={1280}
                  height={900}
                  unoptimized
                  sizes="(min-width: 1024px) 896px, 100vw"
                  className="h-auto max-h-[760px] w-full object-contain"
                  priority
                />
              </div>
              <div className="p-6 sm:p-10">
                <div className="article-content" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
                <div className="mt-10 rounded-md bg-mist p-6">
                  <p className="text-base leading-8 text-graphite">
                    Want to learn more? Contact us for a personalized consultation plan.
                  </p>
                  <Link
                    href="/consultation"
                    className="mt-5 inline-flex h-11 items-center rounded-md bg-ink px-5 text-sm font-semibold text-white transition hover:bg-champagne hover:text-ink"
                  >
                    Book a 1-on-1 Online Consultation
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </article>
        <GlobalBottomCTA settings={settings} source="article-bottom-cta" />
      </main>
      <Footer />
      <BackToTop />
      <WhatsAppFloat settings={settings} />
    </>
  );
}
