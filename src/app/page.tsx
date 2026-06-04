import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { HomePage } from "@/components/HomePage";
import { Navbar } from "@/components/Navbar";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { getGalleryItems, getSiteSettings } from "@/lib/sanity";

export const dynamic = "force-dynamic";

export default async function Page() {
  const [settings, galleryItems] = await Promise.all([getSiteSettings(), getGalleryItems()]);

  return (
    <>
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
