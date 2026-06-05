import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LandingPageShell } from "@/components/LandingPageShell";
import { getLandingPage, procedureLandingSlugs } from "@/lib/landing-pages";
import { absoluteUrl, imageUrl } from "@/lib/seo";

type ProcedurePageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";
export const dynamicParams = false;

export function generateStaticParams() {
  return procedureLandingSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProcedurePageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getLandingPage(slug);

  if (!page) {
    return {
      title: "Procedure | Dr. Xiao Zhongye"
    };
  }

  return {
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
}

export default async function ProcedurePage({ params }: ProcedurePageProps) {
  const { slug } = await params;
  const page = getLandingPage(slug);

  if (!page) notFound();

  return <LandingPageShell page={page} />;
}
