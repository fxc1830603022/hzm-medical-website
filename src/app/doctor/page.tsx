import type { Metadata } from "next";
import { BackToTop } from "@/components/BackToTop";
import { DoctorPageView } from "@/components/DoctorPageView";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { StructuredData } from "@/components/StructuredData";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { landingPages } from "@/lib/landing-pages";
import { getFaqItemsForPage, getSiteSettings } from "@/lib/sanity";
import { absoluteUrl, breadcrumbJsonLd, faqJsonLd, imageUrl, physicianJsonLd, webPageJsonLd } from "@/lib/seo";

const page = landingPages.doctor;

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: {
    absolute: page.seo.title
  },
  description: page.seo.description,
  alternates: {
    canonical: absoluteUrl(page.path)
  },
  openGraph: {
    title: page.seo.title,
    description: page.seo.description,
    url: absoluteUrl(page.path),
    images: [imageUrl(page.image)]
  },
  twitter: {
    card: "summary_large_image",
    title: page.seo.title,
    description: page.seo.description,
    images: [imageUrl(page.image)]
  }
};

export default async function DoctorPage() {
  const [settings, cmsFaqs] = await Promise.all([getSiteSettings(), getFaqItemsForPage(page.path)]);
  const faqs = cmsFaqs.length ? cmsFaqs : page.faqs;
  const structuredData: unknown[] = [
    webPageJsonLd({
      name: page.seo.title,
      description: page.seo.description,
      path: page.path,
      image: page.image
    }),
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: page.breadcrumb, path: page.path }
    ]),
    physicianJsonLd()
  ];

  if (faqs.length) {
    structuredData.push(faqJsonLd(faqs));
  }

  return (
    <>
      <StructuredData data={structuredData} />
      <Navbar settings={settings} />
      <main>
        <DoctorPageView settings={settings} />
      </main>
      <Footer />
      <BackToTop />
      <WhatsAppFloat settings={settings} />
    </>
  );
}
