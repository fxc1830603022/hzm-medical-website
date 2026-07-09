import type {
  BlogPost,
  CategoryKey,
  GalleryItem,
  Procedure,
  Rule,
  SiteSettings,
  WhyItem
} from "./site-types";

export const categoryLabels: Record<CategoryKey, string> = {
  technique: "Technique",
  knowledge: "Education",
  case: "Cases",
  faq: "FAQ"
};

export const categoryFilters: Array<{ key: "all" | CategoryKey; label: string }> = [
  { key: "all", label: "All Articles" },
  { key: "technique", label: "Technique" },
  { key: "knowledge", label: "Education" },
  { key: "case", label: "Cases" },
  { key: "faq", label: "FAQ" }
];

export const navItems = [
  { href: "/doctor", label: "Doctor" },
  { href: "/procedures/9d-facelift", label: "9D Facelift" },
  { href: "/procedures/9d-deep-plane-facelift", label: "Deep Plane" },
  { href: "/before-after", label: "Before & After" },
  { href: "/international-patients", label: "International Patients" },
  { href: "/blog", label: "Articles" }
];

export const defaultSettings: SiteSettings = {
  siteTitle: "Dr. Xiao Zhongye | 9D Facelift - Charm Preservation",
  heroSubtitle: "Only One 9D | Only By Dr. Xiao",
  heroTitleTop: "Reject the Assembly Line",
  heroTitleBottom: "Charm Preservation",
  heroDescription: "True anti-aging preserves your original charm.\nYou still look like yourself, only ten years younger.",
  whatsappNumber: "+1 213-527-5514",
  whatsappMessage: "Hello, I am interested in 9D Facelift and would like to learn more.",
  methodologyVideoUrl: "",
  methodologyVideoPoster: "/images/dr-xiao-team-hero.webp",
  wechatDescription: "Add our assistant on WeChat for a personalized consultation plan.",
  wechatQrImage: "/images/wechat-qr.jpg",
  wechatId: "夏天的风",
  instagramUrl: "#contact",
  youtubeUrl: "#contact",
  facebookUrl: "#contact",
  email: "contact@drxiao-9d.com",
  location: "Shanghai, China"
};

export const procedures: Procedure[] = [
  {
    name: "9D Facelift",
    target: "For mild to moderate facial aging",
    tag: "Ideal for mild to moderate aging",
    features: [
      "Ultra-small incisions hidden within the hairline",
      "Shorter recovery with a natural-looking outcome",
      "Precise lifting of lax midface and lower-face tissues",
      "Visible rejuvenation immediately after surgery"
    ]
  },
  {
    name: "9D Deep Plane Facelift",
    target: "For severe laxity | Deep plane facelift",
    tag: "Advanced lifting for severe laxity",
    featured: true,
    features: [
      "Precise release and reshaping of deep facial structures",
      "Zero-tension suturing, with incisions concealed in natural ear folds",
      "Designed to avoid common facelift issues such as hairline loss or ear distortion",
      "Long-lasting rejuvenation from one carefully planned procedure"
    ]
  }
];

export const rules: Rule[] = [
  {
    number: "01",
    title: "Nerve Safety Planning",
    subtitle: "Designed around safer anatomical zones",
    description:
      "Designed around safer anatomical zones and careful surgical planning."
  },
  {
    number: "02",
    title: "Scar Concealment Strategy",
    subtitle: "Discreet incision planning",
    description:
      "Incision planning and closure techniques are designed to help scars remain discreet where possible."
  },
  {
    number: "03",
    title: "No Fake-Look Result",
    subtitle: "Natural-looking expression and identity",
    description:
      "The goal is a natural-looking result that preserves facial expression and identity."
  }
];

export const whyItems: WhyItem[] = [
  {
    title: "Beware of Concept Substitution",
    description:
      'Many clinics now claim to offer "9D" while actually performing inexpensive, short-lived thread lifts. True 9D is serious surgical deep-structure remodeling, not the placement of a few threads.'
  },
  {
    title: "International Facial Anatomy Expertise",
    description:
      "Dr. Xiao has extensive surgical experience with European, American, Middle Eastern, and other international patients. Western and Asian facial structures differ significantly. His understanding of different anatomical patterns allows him to deliver the core value of 9D across ethnicities."
  }
];

export const defaultGalleryItems: GalleryItem[] = [
  {
    image: "/images/gallery-case-01.jpg",
    title: "Before & After - Facial Lifting",
    alt: "Case 1",
    sortOrder: 10
  },
  {
    image: "/images/gallery-case-02.jpg",
    title: "9D Facelift Result",
    alt: "Case 2",
    sortOrder: 20
  },
  {
    image: "/images/gallery-case-03.jpg",
    title: "Deep Plane Facelift",
    alt: "Case 3",
    sortOrder: 30
  },
  {
    image: "/images/gallery-case-04.jpg",
    title: "Precise Midface & Lower-Face Lift",
    alt: "Case 4",
    sortOrder: 40
  },
  {
    image: "/images/gallery-case-05.jpg",
    title: "Charm Preservation - Natural Beauty",
    alt: "Case 5",
    sortOrder: 50
  },
  {
    image: "/images/gallery-case-06.jpg",
    title: "Deep Structural Remodeling",
    alt: "Case 6",
    sortOrder: 60
  },
  {
    image: "/images/gallery-case-07.jpg",
    title: "Youthful Contour Refinement",
    alt: "Case 7",
    sortOrder: 70
  },
  {
    image: "/images/gallery-case-08.jpg",
    title: "Natural Movement - Preserved Expression",
    alt: "Case 8",
    sortOrder: 80
  },
  {
    image: "/images/gallery-case-09.jpg",
    title: "Deep Plane Facelift Result",
    alt: "Case 9",
    sortOrder: 90
  },
  {
    image: "/images/gallery-case-10.jpg",
    title: "Sharper Jawline Remodeling",
    alt: "Case 10",
    sortOrder: 100
  },
  {
    image: "/images/gallery-case-11.jpg",
    title: "Targeted Nasolabial Fold Improvement",
    alt: "Case 11",
    sortOrder: 110
  },
  {
    image: "/images/gallery-case-12.jpg",
    title: "Full-Face Rejuvenation",
    alt: "Case 12",
    sortOrder: 120
  }
];

export const defaultPosts: BlogPost[] = [
  {
    slug: "what-is-a-deep-plane-facelift-and-how-is-it-different",
    title: "What Is a Deep Plane Facelift, and How Is It Different?",
    category: "technique",
    categoryLabel: "Technique",
    date: "2024-12-15",
    displayDate: "December 15, 2024",
    readTime: "8 min read",
    image: "/images/b54df5be51a02c27874d9654dcf7cd3b.jpg",
    excerpt:
      "Deep plane technique works beneath the superficial layers to reposition deeper structures, helping create a more natural and longer-lasting rejuvenation than skin-tension lifting...",
    contentHtml:
      "<p>Deep Plane facelift technique is one of the most advanced approaches in modern facial rejuvenation.</p><p>Unlike traditional skin-tension or superficial SMAS lifting, deep plane surgery works in a deeper anatomical layer to release and reposition facial support structures. This helps the result look softer, more natural, and more durable.</p><h4>Why the deep plane matters</h4><p>1. A more natural result: deeper tissues are repositioned instead of simply pulling the skin.</p><p>2. Better longevity: the lift addresses structural aging rather than surface looseness alone.</p><p>3. Greater technical demand: safe, precise dissection requires deep anatomical expertise.</p>"
  },
  {
    slug: "the-truth-about-facial-aging-from-bone-to-skin",
    title: "The Truth About Facial Aging: From Bone to Skin",
    category: "knowledge",
    categoryLabel: "Education",
    date: "2024-12-10",
    displayDate: "December 10, 2024",
    readTime: "6 min read",
    image: "/images/be355d7cd70301a66fcdf6effc5a781f.jpg",
    excerpt:
      "Facial aging is more than loose skin. Bone resorption, fat-pad descent, fascial laxity, and skin thinning all work together. Understanding the layers helps you choose the right solution...",
    contentHtml:
      "<p>Facial aging is a multilayer process involving bone resorption, fat-pad descent, fascial laxity, and skin quality changes.</p><p>That is why a procedure focused only on the skin cannot solve every visible sign of aging. 9D Lifting System is designed from a layered understanding of facial anatomy, allowing the treatment plan to match the patient rather than forcing every patient into the same method.</p>"
  },
  {
    slug: "the-philosophy-of-9d-lifting-why-charm-preservation-matters",
    title: "The Philosophy of 9D Lifting: Why Charm Preservation Matters",
    category: "technique",
    categoryLabel: "Technique",
    date: "2024-12-05",
    displayDate: "December 5, 2024",
    readTime: "10 min read",
    image: "/images/896412cd7db178d8aff7975c761cf596.jpg",
    excerpt:
      "Over-operated, face-changing procedures are increasingly rejected by patients with taste. 9D Lifting preserves your original features and character while rejuvenating the right anatomical layers...",
    contentHtml:
      "<p>Charm Preservation means protecting your unique facial proportions, expression, and personal character while performing precise rejuvenation in the correct anatomical layers.</p><p>The goal is not to create a new face. The goal is to bring back a younger version of you, with your own smile, movement, and identity still intact.</p>"
  },
  {
    slug: "facelift-recovery-guide-day-1-to-day-90",
    title: "Facelift Recovery Guide: Day 1 to Day 90",
    category: "faq",
    categoryLabel: "FAQ",
    date: "2024-11-28",
    displayDate: "November 28, 2024",
    readTime: "5 min read",
    image: "/images/f12e811b39a2ca6114abc09612047f30.jpg",
    excerpt:
      "Surgery is only the first step. Recovery matters just as much. Here is a clear timeline for swelling, care points, restrictions, and returning to social life...",
    contentHtml:
      "<p>Recovery is an important part of the final result. Swelling, bruising, tightness, and gradual contour refinement each have their own timeline.</p><p>During consultation, Dr. Xiao's team provides a personalized recovery plan based on your procedure type, anatomy, and travel schedule, helping you move through each stage with clarity and confidence.</p>"
  },
  {
    slug: "a-50-year-old-european-patients-9d-deep-plane-journey",
    title: "A 50-Year-Old European Patient's 9D Deep Plane Journey",
    category: "case",
    categoryLabel: "Cases",
    date: "2024-11-20",
    displayDate: "November 20, 2024",
    readTime: "7 min read",
    image: "/images/2683b7b84cb3111a72f78c2f1cb83942.jpg",
    excerpt:
      "After disappointing thread-lift results, Sarah from the UK chose Dr. Xiao for a 9D Deep Plane Facelift. From consultation to six-month follow-up, her transformation remained natural...",
    contentHtml:
      "<p>After a short-lived thread lift, Sarah from the UK wanted a more structural, natural solution. Her 9D Deep Plane plan focused on repositioning deep tissue support while preserving her original expression.</p><p>At six months, the goal was not a different face, but a refreshed, rested, and younger-looking version of herself.</p>"
  },
  {
    slug: "thread-lift-vs-surgical-facelift-do-not-confuse-the-concepts",
    title: "Thread Lift vs. Surgical Facelift: Do Not Confuse the Concepts",
    category: "knowledge",
    categoryLabel: "Education",
    date: "2024-11-15",
    displayDate: "November 15, 2024",
    readTime: "6 min read",
    image: "/images/b8cb485707aa2b6872cc479109c0605e.jpg",
    excerpt:
      'Some clinics market thread lifts as "9D lifting" or "scarless facelifts." In reality, thread lifting and surgical deep-structure remodeling are completely different levels of treatment...',
    contentHtml:
      "<p>Thread lifting and surgical deep-structure remodeling are not the same level of treatment. A thread lift may provide temporary support for selected patients, but it cannot replace a carefully performed facelift when deep laxity is the core problem.</p><p>True 9D Lifting is a surgical system, not a marketing label for thread placement.</p>"
  }
];

export function getWhatsAppUrl(settings: SiteSettings = defaultSettings) {
  const message = encodeURIComponent(settings.whatsappMessage || defaultSettings.whatsappMessage);
  const number = normalizeWhatsAppNumber(settings.whatsappNumber || defaultSettings.whatsappNumber);
  return `https://wa.me/${number}?text=${message}`;
}

export function normalizeWhatsAppNumber(value: string) {
  const digits = value.replace(/\D/g, "");
  if (digits.length === 10) return `1${digits}`;
  return digits || defaultSettings.whatsappNumber.replace(/\D/g, "");
}

export function formatDisplayDate(value: string) {
  if (!value) return "";
  const date = /^\d{4}-\d{2}-\d{2}$/.test(value) ? new Date(`${value}T00:00:00`) : new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}
