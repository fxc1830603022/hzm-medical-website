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
  contentHtml: string;
  status?: "published" | "draft";
};

export type GalleryItem = {
  id?: string;
  image: string;
  title: string;
  alt: string;
  sortOrder: number;
};

export type SiteSettings = {
  siteTitle: string;
  heroSubtitle: string;
  heroTitleTop: string;
  heroTitleBottom: string;
  heroDescription: string;
  whatsappNumber: string;
  whatsappMessage: string;
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
