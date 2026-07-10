import type { Metadata } from "next";
import { SocialLinksPageView } from "@/components/SocialLinksPageView";
import { StructuredData } from "@/components/StructuredData";
import { getGalleryItems, getSiteSettings } from "@/lib/sanity";
import { absoluteUrl, imageUrl, organizationJsonLd, physicianJsonLd, webPageJsonLd } from "@/lib/seo";

export const dynamic = "force-dynamic";

const linksSeo = {
  title: "Official Links | Dr. Xiao 9D Facelift Shanghai",
  description:
    "Official Dr. Xiao 9D Facelift links for WhatsApp facial assessment, real results, 9D Facelift information, and international patient guidance.",
  image: "/images/home-hero-dr-xiao-consultation-bg.webp"
};

export const metadata: Metadata = {
  title: {
    absolute: linksSeo.title
  },
  description: linksSeo.description,
  alternates: {
    canonical: absoluteUrl("/links")
  },
  openGraph: {
    title: linksSeo.title,
    description: linksSeo.description,
    url: absoluteUrl("/links"),
    images: [imageUrl(linksSeo.image)]
  },
  twitter: {
    card: "summary_large_image",
    title: linksSeo.title,
    description: linksSeo.description,
    images: [imageUrl(linksSeo.image)]
  }
};

export default async function LinksPage() {
  const [settings, galleryItems] = await Promise.all([getSiteSettings(), getGalleryItems()]);

  return (
    <>
      <StructuredData
        data={[
          organizationJsonLd(),
          physicianJsonLd(),
          webPageJsonLd({
            name: linksSeo.title,
            description: linksSeo.description,
            path: "/links",
            image: linksSeo.image
          })
        ]}
      />
      <SocialLinksPageView settings={settings} galleryItems={galleryItems} />
    </>
  );
}
