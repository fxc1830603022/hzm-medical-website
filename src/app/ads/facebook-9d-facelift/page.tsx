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
  title: "Natural Facial Rejuvenation by Dr. Xiao",
  description:
    "Natural 9D Facelift assessment by Dr. Xiao in Shanghai. Send photos on WhatsApp for private online guidance before treatment planning.",
  path: "/ads/facebook-9d-facelift",
  image: "/images/home-hero-dr-xiao-consultation-bg.webp"
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

export default async function FacebookAdsLandingPage() {
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
            name: "Natural 9D Facelift by Dr. Xiao",
            description: pageSeo.description,
            path: pageSeo.path,
            image: pageSeo.image
          })
        ]}
      />
      <AdsLandingPageView variant="facebook" settings={settings} galleryItems={galleryItems} />
    </>
  );
}
