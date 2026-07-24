import type { Metadata } from "next";
import { GoogleAssessmentThankYou } from "@/components/GoogleAssessmentThankYou";
import { getGoogleAdsLandingPageContent } from "@/lib/sanity";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Assessment Received | Dr. Xiao 9D",
  description: "Your private 9D facial assessment request has been received.",
  robots: {
    index: false,
    follow: false
  }
};

export default async function GoogleAssessmentThankYouPage() {
  const content = await getGoogleAdsLandingPageContent();
  return <GoogleAssessmentThankYou content={content} />;
}
