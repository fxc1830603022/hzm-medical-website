import { consultationSubmission } from "./consultationSubmission";
import { doctor } from "./doctor";
import { faqItem } from "./faqItem";
import { galleryItem } from "./galleryItem";
import { newsletterSubscriber } from "./newsletterSubscriber";
import { post } from "./post";
import { siteSettings } from "./siteSettings";
import { testimonial } from "./testimonial";
import { treatment } from "./treatment";

export const schemaTypes = [
  post,
  doctor,
  treatment,
  galleryItem,
  faqItem,
  testimonial,
  consultationSubmission,
  newsletterSubscriber,
  siteSettings
];
