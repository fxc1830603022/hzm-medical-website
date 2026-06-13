import { BackToTop } from "@/components/BackToTop";
import { Footer } from "@/components/Footer";
import { LandingPageView } from "@/components/LandingPageView";
import { Navbar } from "@/components/Navbar";
import { StructuredData } from "@/components/StructuredData";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import type { LandingPageData } from "@/lib/landing-pages";
import { getFaqItemsForPage, getGalleryItems, getSiteSettings } from "@/lib/sanity";
import { breadcrumbJsonLd, faqJsonLd, medicalProcedureJsonLd, physicianJsonLd, webPageJsonLd } from "@/lib/seo";

type LandingPageShellProps = {
  page: LandingPageData;
};

export async function LandingPageShell({ page }: LandingPageShellProps) {
  const shouldLoadGallery = page.path === "/before-after";
  const [settings, galleryItems, cmsFaqs] = await Promise.all([
    getSiteSettings(),
    shouldLoadGallery ? getGalleryItems() : Promise.resolve([]),
    getFaqItemsForPage(page.path)
  ]);
  const pageWithFaqs: LandingPageData = {
    ...page,
    faqs: cmsFaqs.length ? cmsFaqs : page.faqs
  };

  const structuredData: unknown[] = [
    webPageJsonLd({
      name: pageWithFaqs.seo.title,
      description: pageWithFaqs.seo.description,
      path: pageWithFaqs.path,
      image: pageWithFaqs.image
    }),
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: pageWithFaqs.breadcrumb, path: pageWithFaqs.path }
    ])
  ];

  if (pageWithFaqs.faqs.length) {
    structuredData.push(faqJsonLd(pageWithFaqs.faqs));
  }

  if (pageWithFaqs.path.startsWith("/procedures/")) {
    structuredData.push(
      medicalProcedureJsonLd({
        name: pageWithFaqs.title,
        description: pageWithFaqs.seo.description,
        path: pageWithFaqs.path,
        image: pageWithFaqs.image
      })
    );
  }

  if (pageWithFaqs.path === "/doctor") {
    structuredData.push(physicianJsonLd());
  }

  return (
    <>
      <StructuredData data={structuredData} />
      <Navbar settings={settings} />
      <main>
        <LandingPageView page={pageWithFaqs} settings={settings} galleryItems={galleryItems} />
      </main>
      <Footer />
      <BackToTop />
      <WhatsAppFloat settings={settings} />
    </>
  );
}
