import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { HomePage } from "@/components/HomePage";
import { Navbar } from "@/components/Navbar";
import { StructuredData } from "@/components/StructuredData";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { getGalleryItems, getSiteSettings } from "@/lib/sanity";
import { imageUrl, organizationJsonLd, physicianJsonLd, seoDefaults, siteUrl, websiteJsonLd } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: seoDefaults.title,
  description: seoDefaults.description,
  alternates: {
    canonical: siteUrl
  },
  openGraph: {
    title: seoDefaults.title,
    description: seoDefaults.description,
    url: siteUrl,
    images: [imageUrl()]
  }
};

export default async function Page() {
  const [settings, galleryItems] = await Promise.all([getSiteSettings(), getGalleryItems()]);

  return (
    <>
      <StructuredData data={[organizationJsonLd(), physicianJsonLd(), websiteJsonLd()]} />
      <Navbar />
      <main>
        <HomePage settings={settings} galleryItems={galleryItems} />
      </main>
      <Footer />
      <BackToTop />
      <WhatsAppFloat settings={settings} />
    </>
  );
}
