import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dr. Xiao Zhongye | 9D Lifting System - Charm Preservation",
  description:
    "9D Lifting System by Dr. Xiao Zhongye. Charm Preservation, natural deep plane facelift and global anti-aging consultation.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000")
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
