import type { Metadata } from "next";
import { GoogleAdsLandingPageV3 } from "@/components/GoogleAdsLandingPageV3";
import { StructuredData } from "@/components/StructuredData";
import { getGoogleAdsLandingPageContent } from "@/lib/sanity";
import {
  absoluteUrl,
  imageUrl,
  medicalProcedureJsonLd,
  organizationJsonLd,
  physicianJsonLd,
  webPageJsonLd
} from "@/lib/seo";

export const dynamic = "force-dynamic";

const pagePath = "/ads/google-9d-facelift";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getGoogleAdsLandingPageContent();

  return {
    title: { absolute: content.seoTitle },
    description: content.seoDescription,
    alternates: { canonical: absoluteUrl(pagePath) },
    openGraph: {
      title: content.seoTitle,
      description: content.seoDescription,
      url: absoluteUrl(pagePath),
      images: [imageUrl(content.hero.image)]
    },
    twitter: {
      card: "summary_large_image",
      title: content.seoTitle,
      description: content.seoDescription,
      images: [imageUrl(content.hero.image)]
    }
  };
}

export default async function GoogleAdsLandingPage() {
  const content = await getGoogleAdsLandingPageContent();

  return (
    <>
      <StructuredData
        data={[
          organizationJsonLd(),
          physicianJsonLd(),
          webPageJsonLd({
            name: content.seoTitle,
            description: content.seoDescription,
            path: pagePath,
            image: content.hero.image
          }),
          medicalProcedureJsonLd({
            name: "9D Facelift in Shanghai by Dr. Xiao",
            description: content.seoDescription,
            path: pagePath,
            image: content.hero.image
          })
        ]}
      />
      <GoogleAdsLandingPageV3 content={content} />
    </>
  );
}
