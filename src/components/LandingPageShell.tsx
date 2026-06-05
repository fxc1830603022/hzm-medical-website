import { BackToTop } from "@/components/BackToTop";
import { Footer } from "@/components/Footer";
import { LandingPageView } from "@/components/LandingPageView";
import { Navbar } from "@/components/Navbar";
import { StructuredData } from "@/components/StructuredData";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import type { LandingPageData } from "@/lib/landing-pages";
import { getGalleryItems, getSiteSettings } from "@/lib/sanity";
import { breadcrumbJsonLd, physicianJsonLd, webPageJsonLd } from "@/lib/seo";

type LandingPageShellProps = {
  page: LandingPageData;
};

export async function LandingPageShell({ page }: LandingPageShellProps) {
  const shouldLoadGallery = page.path === "/before-after";
  const [settings, galleryItems] = await Promise.all([
    getSiteSettings(),
    shouldLoadGallery ? getGalleryItems() : Promise.resolve([])
  ]);

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

  if (page.path === "/doctor") {
    structuredData.push(physicianJsonLd());
  }

  return (
    <>
      <StructuredData data={structuredData} />
      <Navbar />
      <main>
        <LandingPageView page={page} settings={settings} galleryItems={galleryItems} />
      </main>
      <Footer />
      <BackToTop />
      <WhatsAppFloat settings={settings} />
    </>
  );
}
