import type { Metadata } from "next";
import { LandingPageShell } from "@/components/LandingPageShell";
import { landingPages } from "@/lib/landing-pages";
import { absoluteUrl, imageUrl } from "@/lib/seo";

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

export default function DoctorPage() {
  return <LandingPageShell page={page} />;
}
