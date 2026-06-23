import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { HomePage, homeFaqs } from "@/components/HomePage";
import { Navbar } from "@/components/Navbar";
import { StructuredData } from "@/components/StructuredData";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { getGalleryItems, getSiteSettings } from "@/lib/sanity";
import { faqJsonLd, imageUrl, organizationJsonLd, physicianJsonLd, siteUrl, webPageJsonLd, websiteJsonLd } from "@/lib/seo";

export const dynamic = "force-dynamic";

const homeSeo = {
  title: "Dr. Xiao 9D Facelift in Shanghai | Natural Facial Rejuvenation",
  description:
    "Dr. Xiao's 9D Facelift in Shanghai offers natural facial rejuvenation for jowls, nasolabial folds, lower-face sagging and jawline definition. Start with online photo assessment."
};

export const metadata: Metadata = {
  title: {
    absolute: homeSeo.title
  },
  description: homeSeo.description,
  alternates: {
    canonical: siteUrl
  },
  openGraph: {
    title: homeSeo.title,
    description: homeSeo.description,
    url: siteUrl,
    images: [imageUrl()]
  },
  twitter: {
    card: "summary_large_image",
    title: homeSeo.title,
    description: homeSeo.description,
    images: [imageUrl()]
  }
};

export default async function Page() {
  const [settings, galleryItems] = await Promise.all([getSiteSettings(), getGalleryItems()]);

  return (
    <>
      <StructuredData
        data={[
          organizationJsonLd(),
          physicianJsonLd(),
          websiteJsonLd(),
          webPageJsonLd({
            name: homeSeo.title,
            description: homeSeo.description,
            path: "/"
          }),
          faqJsonLd(homeFaqs)
        ]}
      />
      <Navbar settings={settings} />
      <main>
        <HomePage settings={settings} galleryItems={galleryItems} />
      </main>
      <Footer />
      <BackToTop />
      <WhatsAppFloat settings={settings} />
    </>
  );
}
