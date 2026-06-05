import type { BlogPost } from "./site-types";

const productionSiteUrl = "https://www.drxiao9d.com";
const configuredSiteUrl = (process.env.NEXT_PUBLIC_SITE_URL || productionSiteUrl).replace(/\/$/, "");

export const siteUrl = configuredSiteUrl.includes(".vercel.app") ? productionSiteUrl : configuredSiteUrl;

export const seoDefaults = {
  siteName: "Dr. Xiao Zhongye 9D Lifting System",
  title: "Dr. Xiao Zhongye | 9D Lifting System - Charm Preservation",
  description:
    "9D Lifting System by Dr. Xiao Zhongye. Charm Preservation, natural deep plane facelift and global anti-aging consultation.",
  doctorName: "Dr. Xiao Zhongye",
  email: "contact@drxiao-9d.com",
  location: "Shanghai, China",
  defaultImage: "/images/896412cd7db178d8aff7975c761cf596.jpg"
};

export function absoluteUrl(path = "/") {
  if (path.startsWith("http")) return path;
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function imageUrl(path = seoDefaults.defaultImage) {
  return absoluteUrl(path);
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "@id": absoluteUrl("/#organization"),
    name: seoDefaults.siteName,
    url: siteUrl,
    image: imageUrl(),
    email: seoDefaults.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Shanghai",
      addressCountry: "CN"
    },
    medicalSpecialty: ["PlasticSurgery", "CosmeticSurgery"],
    sameAs: [siteUrl]
  };
}

export function physicianJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Physician",
    "@id": absoluteUrl("/#physician"),
    name: seoDefaults.doctorName,
    url: siteUrl,
    image: imageUrl(),
    worksFor: {
      "@id": absoluteUrl("/#organization")
    },
    medicalSpecialty: ["PlasticSurgery", "CosmeticSurgery"],
    knowsAbout: [
      "Deep plane facelift",
      "Facelift recovery",
      "Natural facial rejuvenation",
      "International aesthetic surgery consultation"
    ]
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    name: seoDefaults.siteName,
    url: siteUrl,
    publisher: {
      "@id": absoluteUrl("/#organization")
    },
    inLanguage: "en"
  };
}

export function webPageJsonLd(page: { name: string; description: string; path: string; image?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "@id": absoluteUrl(`${page.path}#webpage`),
    name: page.name,
    description: page.description,
    url: absoluteUrl(page.path),
    image: imageUrl(page.image),
    isPartOf: {
      "@id": absoluteUrl("/#website")
    },
    publisher: {
      "@id": absoluteUrl("/#organization")
    },
    about: {
      "@id": absoluteUrl("/#physician")
    },
    inLanguage: "en"
  };
}

export function articleJsonLd(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: imageUrl(post.image),
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@id": absoluteUrl("/#physician")
    },
    publisher: {
      "@id": absoluteUrl("/#organization")
    },
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`)
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path)
    }))
  };
}
