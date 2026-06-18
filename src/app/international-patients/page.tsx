import type { Metadata } from "next";
import { BackToTop } from "@/components/BackToTop";
import { Footer } from "@/components/Footer";
import { InternationalPatientsView } from "@/components/InternationalPatientsView";
import { Navbar } from "@/components/Navbar";
import { StructuredData } from "@/components/StructuredData";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { landingPages, type LandingFAQ } from "@/lib/landing-pages";
import { getFaqItemsForPage, getSiteSettings } from "@/lib/sanity";
import { absoluteUrl, breadcrumbJsonLd, faqJsonLd, imageUrl, webPageJsonLd } from "@/lib/seo";

const page = landingPages["international-patients"];
const resultsGuaranteedFaq: LandingFAQ = {
  question: "Are results guaranteed?",
  answer:
    "No surgical result can be guaranteed. Online review is only a preliminary step. Individual results vary depending on anatomy, aging pattern, procedure plan and healing. A final plan must be confirmed after in-person consultation."
};

function withResultsGuaranteedFaq(faqs: LandingFAQ[]) {
  let hasGuaranteeQuestion = false;
  const normalizedFaqs = faqs.map((faq) => {
    if (!/guarantee/i.test(faq.question)) return faq;
    hasGuaranteeQuestion = true;
    return resultsGuaranteedFaq;
  });

  return hasGuaranteeQuestion ? normalizedFaqs : [...normalizedFaqs, resultsGuaranteedFaq];
}

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

export default function InternationalPatientsPage() {
  return <InternationalPatientsPageShell />;
}

async function InternationalPatientsPageShell() {
  const [settings, cmsFaqs] = await Promise.all([
    getSiteSettings(),
    getFaqItemsForPage(page.path)
  ]);
  const faqs = withResultsGuaranteedFaq(cmsFaqs.length ? cmsFaqs : page.faqs);
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
    ])
  ];

  if (faqs.length) {
    structuredData.push(faqJsonLd(faqs));
  }

  return (
    <>
      <StructuredData data={structuredData} />
      <Navbar settings={settings} />
      <main>
        <InternationalPatientsView settings={settings} faqs={faqs} />
      </main>
      <Footer />
      <BackToTop />
      <WhatsAppFloat settings={settings} />
    </>
  );
}
