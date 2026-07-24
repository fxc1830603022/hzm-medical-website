import type { Metadata } from "next";
import { GoogleAdsLandingPageV3 } from "@/components/GoogleAdsLandingPageV3";
import { StructuredData } from "@/components/StructuredData";
import { getSiteSettings } from "@/lib/sanity";
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
  title: "9D Facelift in Shanghai by Dr. Xiao | Online Assessment",
  description:
    "Request a private doctor-led 9D facial assessment with Dr. Xiao in Shanghai. View real patient results and learn about international patient planning.",
  path: "/ads/google-9d-facelift",
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

export default async function GoogleAdsLandingPage() {
  const settings = await getSiteSettings();

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
      <GoogleAdsLandingPageV3 settings={settings} />
    </>
  );
}
