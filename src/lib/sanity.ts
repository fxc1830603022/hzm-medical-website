import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import type { LandingFAQ } from "./landing-pages";
import {
  categoryLabels,
  defaultGalleryItems,
  defaultPosts,
  defaultSettings,
  formatDisplayDate
} from "./site-data";
import type { BlogPost, CategoryKey, GalleryItem, ProcedurePageAsset, SiteSettings } from "./site-types";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-02-19";
const token = process.env.SANITY_API_TOKEN;

export const sanityConfigured = Boolean(projectId && dataset);

export const sanityClient = createClient({
  projectId: projectId || "placeholder",
  dataset,
  apiVersion,
  token,
  useCdn: !token,
  stega: false
});

const builder = sanityConfigured ? imageUrlBuilder(sanityClient) : null;

export function urlFor(source: SanityImageSource) {
  if (!builder) return "";
  return builder.image(source);
}

function normalizePost(post: Partial<BlogPost> & { category?: string }): BlogPost {
  const category = (post.category || "technique") as CategoryKey;
  const date = post.date || new Date().toISOString().slice(0, 10);

  return {
    slug: post.slug || "article",
    title: post.title || "Untitled Article",
    category,
    categoryLabel: post.categoryLabel || categoryLabels[category] || category,
    date,
    displayDate: post.displayDate || formatDisplayDate(date),
    readTime: post.readTime || "5 min read",
    image: post.image || "/images/gallery-case-01.jpg",
    excerpt: post.excerpt || "",
    seoTitle: post.seoTitle || "",
    metaDescription: post.metaDescription || "",
    focusKeyword: post.focusKeyword || "",
    secondaryKeywords: post.secondaryKeywords || [],
    canonicalUrl: post.canonicalUrl || "",
    recommendedImageBrief: post.recommendedImageBrief || "",
    internalLinkingNotes: post.internalLinkingNotes || "",
    medicalReviewNote: post.medicalReviewNote || "",
    contentHtml: post.contentHtml || "<p></p>",
    status: post.status || "published"
  };
}

export async function getPosts(): Promise<BlogPost[]> {
  if (!sanityConfigured) return defaultPosts;

  try {
    const posts = await sanityClient.fetch<
      Array<Partial<BlogPost> & { category?: string }>
    >(`*[_type == "post" && status == "published"] | order(coalesce(publishedAt, _createdAt) desc) {
      "id": _id,
      title,
      "slug": slug.current,
      category,
      excerpt,
      seoTitle,
      metaDescription,
      focusKeyword,
      secondaryKeywords,
      canonicalUrl,
      recommendedImageBrief,
      internalLinkingNotes,
      medicalReviewNote,
      "image": coalesce(coverImage.asset->url, externalImageUrl, localImagePath),
      "contentHtml": bodyHtml,
      "date": coalesce(publishedAt, _createdAt),
      readTime,
      status
    }`);

    return posts.length ? posts.map(normalizePost) : defaultPosts;
  } catch {
    return defaultPosts;
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!sanityConfigured) {
    return defaultPosts.find((post) => post.slug === slug) || null;
  }

  try {
    const post = await sanityClient.fetch<
      Partial<BlogPost> & { category?: string }
    >(
      `*[_type == "post" && slug.current == $slug && status == "published"][0] {
        "id": _id,
        title,
        "slug": slug.current,
        category,
        excerpt,
        seoTitle,
        metaDescription,
        focusKeyword,
        secondaryKeywords,
        canonicalUrl,
        recommendedImageBrief,
        internalLinkingNotes,
        medicalReviewNote,
        "image": coalesce(coverImage.asset->url, externalImageUrl, localImagePath),
        "contentHtml": bodyHtml,
        "date": coalesce(publishedAt, _createdAt),
        readTime,
        status
      }`,
      { slug }
    );

    return post ? normalizePost(post) : defaultPosts.find((item) => item.slug === slug) || null;
  } catch {
    return defaultPosts.find((item) => item.slug === slug) || null;
  }
}

export async function getPostSlugs(): Promise<string[]> {
  if (!sanityConfigured) return defaultPosts.map((post) => post.slug);

  try {
    const slugs = await sanityClient.fetch<string[]>(
      `*[_type == "post" && status == "published" && defined(slug.current)].slug.current`
    );

    return slugs.length ? slugs : defaultPosts.map((post) => post.slug);
  } catch {
    return defaultPosts.map((post) => post.slug);
  }
}

export async function getGalleryItems(): Promise<GalleryItem[]> {
  if (!sanityConfigured) return defaultGalleryItems;

  try {
    const items = await sanityClient.fetch<GalleryItem[]>(`*[_type == "galleryItem" && active != false] | order(sortOrder asc) {
      "id": _id,
      "image": coalesce(image.asset->url, externalImageUrl, localImagePath),
      title,
      "alt": coalesce(alt, title),
      sortOrder,
      displayRole,
      age,
      gender,
      country,
      procedure,
      caseLabel,
      mainConcerns,
      visibleChange,
      beforeLabel,
      afterLabel,
      description
    }`);

    return items.length ? items : defaultGalleryItems;
  } catch {
    return defaultGalleryItems;
  }
}

export async function getProcedurePageAsset(slug: string): Promise<ProcedurePageAsset | null> {
  if (!sanityConfigured) return null;

  try {
    return await sanityClient.fetch<ProcedurePageAsset | null>(
      `*[_type == "procedurePageAsset" && slug == $slug && active != false][0] {
          slug,
          "heroImage": coalesce(heroImage.asset->url, heroImageUrl, heroImagePath),
          heroImageAlt,
          "miniResultOneImage": coalesce(miniResultOneImage.asset->url, miniResultOneImageUrl, miniResultOneImagePath),
          miniResultOneImageAlt,
          "miniResultTwoImage": coalesce(miniResultTwoImage.asset->url, miniResultTwoImageUrl, miniResultTwoImagePath),
          miniResultTwoImageAlt,
          "philosophyImage": coalesce(philosophyImage.asset->url, philosophyImageUrl, philosophyImagePath),
        philosophyImageAlt,
        "doctorAuthorityImage": coalesce(doctorAuthorityImage.asset->url, doctorAuthorityImageUrl, doctorAuthorityImagePath),
        doctorAuthorityImageAlt,
        "finalCtaImage": coalesce(finalCtaImage.asset->url, finalCtaImageUrl, finalCtaImagePath),
        finalCtaImageAlt
      }`,
      { slug }
    );
  } catch {
    return null;
  }
}

export async function getFaqItemsForPage(pagePath: string): Promise<LandingFAQ[]> {
  if (!sanityConfigured) return [];

  try {
    const items = await sanityClient.fetch<LandingFAQ[]>(
      `*[
        _type == "faqItem" &&
        active != false &&
        defined(question) &&
        (
          count(coalesce(displayOnPages, [])) == 0 ||
          "all" in coalesce(displayOnPages, []) ||
          $pagePath in coalesce(displayOnPages, [])
        )
      ] | order(coalesce(sortOrder, 100) asc, _createdAt asc) {
        question,
        answer
      }`,
      { pagePath }
    );

    return items.filter((item) => item.question && item.answer);
  } catch {
    return [];
  }
}

export async function getSiteSettings(): Promise<SiteSettings> {
  if (!sanityConfigured) return defaultSettings;

  try {
    const settings = await sanityClient.fetch<Partial<SiteSettings>>(`*[_type == "siteSettings"][0] {
      siteTitle,
      heroSubtitle,
      heroTitleTop,
      heroTitleBottom,
      heroDescription,
      "methodologyVideoUrl": coalesce(methodologyVideoFile.asset->url, methodologyVideoUrl),
      "methodologyVideoPoster": coalesce(methodologyVideoPoster.asset->url, methodologyVideoPosterUrl, methodologyVideoPosterPath),
      whatsappNumber,
      whatsappMessage,
      wechatDescription,
      "wechatQrImage": coalesce(wechatQrImage.asset->url, wechatQrImageUrl, wechatQrImagePath),
      wechatId,
      instagramUrl,
      youtubeUrl,
      facebookUrl,
      email,
      location
    }`);

    return {
      ...defaultSettings,
      ...settings
    };
  } catch {
    return defaultSettings;
  }
}

export function makeServerSanityClient() {
  if (!projectId || !dataset || !token) return null;

  return createClient({
    projectId,
    dataset,
    apiVersion,
    token,
    useCdn: false
  });
}
