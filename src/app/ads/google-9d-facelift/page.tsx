import type { Metadata } from "next";
import { AdsLandingPageView } from "@/components/AdsLandingPageView";
import { StructuredData } from "@/components/StructuredData";
import { getGalleryItems, getSiteSettings } from "@/lib/sanity";
import {
  absoluteUrl,
  imageUrl,
  medicalProcedureJsonLd,
  organizationJsonLd,
  physicianJsonLd,
  webPageJsonLd
} from "@/lib/seo";

export const dynamic = "force-dynamic";

const pageSeo = {
  title: "9D Facelift in Shanghai by Dr. Xiao",
  description:
    "Doctor-led 9D Facelift assessment in Shanghai for natural facial rejuvenation, international patients, and private WhatsApp photo review.",
  path: "/ads/google-9d-facelift",
  image: "/images/dr-xiao-links-hero-portrait.webp"
};

export const metadata: Metadata = {
  title: {
    absolute: pageSeo.title
  },
  description: pageSeo.description,
  alternates: {
    canonical: absoluteUrl(pageSeo.path)
  },
  openGraph: {
    title: pageSeo.title,
    description: pageSeo.description,
    url: absoluteUrl(pageSeo.path),
    images: [imageUrl(pageSeo.image)]
  },
  twitter: {
    card: "summary_large_image",
    title: pageSeo.title,
    description: pageSeo.description,
    images: [imageUrl(pageSeo.image)]
  }
};

export default async function GoogleAdsLandingPage() {
  const [settings, galleryItems] = await Promise.all([getSiteSettings(), getGalleryItems()]);

  return (
    <>
      <StructuredData
        data={[
          organizationJsonLd(),
          physicianJsonLd(),
          webPageJsonLd({
            name: pageSeo.title,
            description: pageSeo.description,
            path: pageSeo.path,
            image: pageSeo.image
          }),
          medicalProcedureJsonLd({
            name: "9D Facelift in Shanghai by Dr. Xiao",
            description: pageSeo.description,
            path: pageSeo.path,
            image: pageSeo.image
          })
        ]}
      />
      <AdsLandingPageView variant="google" settings={settings} galleryItems={galleryItems} />
    </>
  );
}
