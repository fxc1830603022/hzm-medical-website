import type { Metadata } from "next";
import { BackToTop } from "@/components/BackToTop";
import {
  ConsultationPageView,
  consultationPageSeo,
  defaultConsultationFaqs
} from "@/components/ConsultationPageView";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { StructuredData } from "@/components/StructuredData";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { getFaqItemsForPage, getSiteSettings } from "@/lib/sanity";
import {
  absoluteUrl,
  breadcrumbJsonLd,
  faqJsonLd,
  imageUrl,
  physicianJsonLd,
  webPageJsonLd
} from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: {
    absolute: consultationPageSeo.title
  },
  description: consultationPageSeo.description,
  alternates: {
    canonical: absoluteUrl(consultationPageSeo.path)
  },
  openGraph: {
    title: consultationPageSeo.title,
    description: consultationPageSeo.description,
    url: absoluteUrl(consultationPageSeo.path),
    images: [imageUrl(consultationPageSeo.image)]
  },
  twitter: {
    card: "summary_large_image",
    title: consultationPageSeo.title,
    description: consultationPageSeo.description,
    images: [imageUrl(consultationPageSeo.image)]
  }
};

export default async function ConsultationPage() {
  const [settings, cmsFaqs] = await Promise.all([
    getSiteSettings(),
    getFaqItemsForPage(consultationPageSeo.path)
  ]);
  const faqs = cmsFaqs.length ? cmsFaqs : defaultConsultationFaqs;
  const structuredData: unknown[] = [
    webPageJsonLd({
      name: consultationPageSeo.title,
      description: consultationPageSeo.description,
      path: consultationPageSeo.path,
      image: consultationPageSeo.image
    }),
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Online Consultation", path: consultationPageSeo.path }
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
        <ConsultationPageView settings={settings} faqs={faqs} />
      </main>
      <Footer />
      <BackToTop />
      <WhatsAppFloat settings={settings} />
    </>
  );
}
