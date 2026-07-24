import { consultationSubmission } from "./consultationSubmission";
import { doctor } from "./doctor";
import { faqItem } from "./faqItem";
import { galleryItem } from "./galleryItem";
import { googleAdsLandingPage } from "./googleAdsLandingPage";
import { newsletterSubscriber } from "./newsletterSubscriber";
import { post } from "./post";
import { procedurePageAsset } from "./procedurePageAsset";
import { siteSettings } from "./siteSettings";
import { testimonial } from "./testimonial";
import { treatment } from "./treatment";

export const schemaTypes = [
  post,
  doctor,
  treatment,
  procedurePageAsset,
  galleryItem,
  googleAdsLandingPage,
  faqItem,
  testimonial,
  consultationSubmission,
  newsletterSubscriber,
  siteSettings
];
