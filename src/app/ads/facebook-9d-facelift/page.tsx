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
  title: 'Natural Rejuvenation Without Looking "Done" | Dr. Xiao 9D Facelift',
  description:
    "Premium doctor-led 9D Facelift assessment by Dr. Xiao in Shanghai for natural-looking rejuvenation and private WhatsApp photo review.",
  path: "/ads/facebook-9d-facelift",
  image: "/images/doctor-hero-door-consultation.png"
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
            name: 'Natural 9D Facelift Without Looking "Done"',
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
