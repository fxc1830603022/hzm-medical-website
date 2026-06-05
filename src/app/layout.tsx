import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Analytics } from "@/components/Analytics";
import { imageUrl, seoDefaults, siteUrl } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: seoDefaults.siteName,
  title: {
    default: seoDefaults.title,
    template: `%s | ${seoDefaults.siteName}`
  },
  description: seoDefaults.description,
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: seoDefaults.siteName,
    title: seoDefaults.title,
    description: seoDefaults.description,
    url: siteUrl,
    images: [
      {
        url: imageUrl(),
        width: 1200,
        height: 630,
        alt: seoDefaults.siteName
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: seoDefaults.title,
    description: seoDefaults.description,
    images: [imageUrl()]
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
  }
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
