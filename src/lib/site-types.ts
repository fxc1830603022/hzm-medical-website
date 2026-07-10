export type CategoryKey = "technique" | "knowledge" | "case" | "faq";

export type BlogPost = {
  id?: string;
  slug: string;
  title: string;
  category: CategoryKey;
  categoryLabel: string;
  date: string;
  displayDate: string;
  readTime: string;
  image: string;
  excerpt: string;
  seoTitle?: string;
  metaDescription?: string;
  focusKeyword?: string;
  secondaryKeywords?: string[];
  canonicalUrl?: string;
  recommendedImageBrief?: string;
  internalLinkingNotes?: string;
  medicalReviewNote?: string;
  contentHtml: string;
  status?: "published" | "draft";
};

export type GalleryItem = {
  id?: string;
  image: string;
  title: string;
  alt: string;
  sortOrder: number;
  displayRole?: "case" | "hero" | "featured";
  age?: string;
  gender?: string;
  country?: string;
  procedure?: string;
  caseLabel?: string;
  mainConcerns?: string;
  visibleChange?: string;
  beforeLabel?: string;
  afterLabel?: string;
  description?: string;
};

export type ProcedurePageAsset = {
  slug: string;
  heroImage?: string;
  heroImageAlt?: string;
  miniResultOneImage?: string;
  miniResultOneImageAlt?: string;
  miniResultTwoImage?: string;
  miniResultTwoImageAlt?: string;
  philosophyImage?: string;
  philosophyImageAlt?: string;
  doctorAuthorityImage?: string;
  doctorAuthorityImageAlt?: string;
  finalCtaImage?: string;
  finalCtaImageAlt?: string;
};

export type SiteSettings = {
  siteTitle: string;
  heroSubtitle: string;
  heroTitleTop: string;
  heroTitleBottom: string;
  heroDescription: string;
  whatsappNumber: string;
  whatsappMessage: string;
  whatsappInstagramMessage: string;
  whatsappFacebookMessage: string;
  whatsappGoogleMessage: string;
  methodologyVideoUrl: string;
  methodologyVideoPoster: string;
  wechatDescription: string;
  wechatQrImage: string;
  wechatId: string;
  instagramUrl: string;
  youtubeUrl: string;
  facebookUrl: string;
  email: string;
  location: string;
};

export type Procedure = {
  name: string;
  target: string;
  tag: string;
  featured?: boolean;
  features: string[];
};

export type Rule = {
  number: string;
  title: string;
  subtitle: string;
  description: string;
};

export type WhyItem = {
  title: string;
  description: string;
};
