import { defineArrayMember, defineField, defineType } from "sanity";
import { defaultGoogleAdsLandingPageContent } from "../../lib/google-ads-landing";

const defaults = defaultGoogleAdsLandingPageContent;

const initialValue = {
  internalTitle: "Google Ads - 9D Facelift Landing Page",
  seoTitle: defaults.seoTitle,
  seoDescription: defaults.seoDescription,
  whatsappNumber: defaults.whatsappNumber,
  whatsappMessage: defaults.whatsappMessage,
  hero: {
    ...defaults.hero,
    image: undefined
  },
  trustItems: defaults.trustItems,
  results: {
    ...defaults.results,
    cases: defaults.results.cases.map(({ image: _image, ...item }) => item)
  },
  concerns: defaults.concerns,
  method: {
    ...defaults.method,
    video: undefined,
    poster: undefined
  },
  comparison: defaults.comparison,
  doctor: {
    ...defaults.doctor,
    image: undefined
  },
  international: {
    ...defaults.international,
    video: undefined,
    poster: undefined
  },
  faq: defaults.faq,
  assessment: defaults.assessment,
  finalCta: defaults.finalCta,
  footer: defaults.footer,
  thankYou: defaults.thankYou
};

const enabledField = defineField({
  name: "enabled",
  title: "Show this section",
  type: "boolean",
  initialValue: true
});

const eyebrowField = defineField({
  name: "eyebrow",
  title: "Small label",
  type: "string"
});

const titleField = defineField({
  name: "title",
  title: "Heading",
  type: "string",
  validation: (rule) => rule.required()
});

const descriptionField = defineField({
  name: "description",
  title: "Description",
  type: "text",
  rows: 3
});

const ctaLabelField = defineField({
  name: "ctaLabel",
  title: "Assessment button label",
  type: "string"
});

const imageField = (name: string, title: string, description: string) =>
  defineField({
    name,
    title,
    description,
    type: "image",
    options: { hotspot: true }
  });

const videoField = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "file",
    options: { accept: "video/mp4,video/webm,video/quicktime" },
    description: "Upload an optimized vertical MP4 or WebM. Leave blank to keep the current built-in video."
  });

const stringListField = (name: string, title: string, description?: string) =>
  defineField({
    name,
    title,
    description,
    type: "array",
    of: [defineArrayMember({ type: "string" })]
  });

const textItemMember = defineArrayMember({
  name: "textItem",
  title: "Item",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "description", title: "Description", type: "text", rows: 2 })
  ],
  preview: {
    select: { title: "title", subtitle: "description" }
  }
});

export const googleAdsLandingPage = defineType({
  name: "googleAdsLandingPage",
  title: "Google Ads Landing Page",
  type: "document",
  groups: [
    { name: "conversion", title: "Conversion" },
    { name: "hero", title: "Hero" },
    { name: "results", title: "Results" },
    { name: "content", title: "Page Sections" },
    { name: "form", title: "Form and Thank You" },
    { name: "seo", title: "SEO" }
  ],
  initialValue,
  fields: [
    defineField({
      name: "internalTitle",
      title: "Internal title",
      type: "string",
      readOnly: true,
      hidden: true
    }),
    defineField({
      name: "whatsappNumber",
      title: "Google Ads WhatsApp number",
      type: "string",
      group: "conversion",
      description: "Dedicated number for this closed landing page. Include the country code.",
      validation: (rule) =>
        rule.required().custom((value) => {
          const digits = String(value || "").replace(/\D/g, "");
          return /^\d{8,15}$/.test(digits) || "Enter a valid international WhatsApp number with country code.";
        })
    }),
    defineField({
      name: "whatsappMessage",
      title: "WhatsApp greeting",
      type: "text",
      rows: 4,
      group: "conversion",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "seoTitle",
      title: "SEO title",
      type: "string",
      group: "seo",
      validation: (rule) => rule.required().max(70)
    }),
    defineField({
      name: "seoDescription",
      title: "SEO description",
      type: "text",
      rows: 3,
      group: "seo",
      validation: (rule) => rule.required().max(180)
    }),
    defineField({
      name: "hero",
      title: "First screen",
      type: "object",
      group: "hero",
      fields: [
        eyebrowField,
        titleField,
        descriptionField,
        imageField("image", "Hero image", "Recommended landscape image, at least 1600 x 1200 px. Leave blank to keep the built-in image."),
        defineField({ name: "imageAlt", title: "Image alt text", type: "string" }),
        defineField({ name: "doctorName", title: "Doctor name on image", type: "string" }),
        defineField({ name: "doctorCredential", title: "Doctor credential on image", type: "string" }),
        defineField({ name: "primaryCtaLabel", title: "Primary button label", type: "string" }),
        defineField({ name: "secondaryCtaLabel", title: "Results button label", type: "string" }),
        defineField({ name: "privacyNote", title: "Privacy note", type: "string" })
      ]
    }),
    defineField({
      name: "trustItems",
      title: "Trust strip",
      type: "array",
      group: "hero",
      validation: (rule) => rule.max(4),
      of: [
        defineArrayMember({
          name: "trustItem",
          title: "Trust item",
          type: "object",
          fields: [
            defineField({ name: "value", title: "Large value", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "label", title: "Label", type: "string", validation: (rule) => rule.required() })
          ],
          preview: { select: { title: "value", subtitle: "label" } }
        })
      ]
    }),
    defineField({
      name: "results",
      title: "Real patient results",
      type: "object",
      group: "results",
      fields: [
        enabledField,
        eyebrowField,
        titleField,
        descriptionField,
        defineField({
          name: "cases",
          title: "Result cards",
          type: "array",
          description: "Use 1536 x 2040 px for the best fit. Keep the page to three selected cases.",
          validation: (rule) => rule.min(1).max(3),
          of: [
            defineArrayMember({
              name: "resultCase",
              title: "Result case",
              type: "object",
              fields: [
                imageField("image", "Before and after image", "Recommended exact size: 1536 x 2040 px. Leave blank to keep the built-in image for this position."),
                defineField({ name: "alt", title: "Image alt text", type: "string" }),
                defineField({ name: "age", title: "Age", type: "string" }),
                defineField({ name: "country", title: "Country / region", type: "string" }),
                defineField({ name: "title", title: "Card title", type: "string" }),
                defineField({ name: "concern", title: "Concern", type: "text", rows: 2 }),
                defineField({ name: "treatment", title: "Treatment direction", type: "text", rows: 2 }),
                defineField({ name: "timing", title: "Photo timing", type: "string" }),
                defineField({ name: "result", title: "Result focus", type: "text", rows: 2 }),
                defineField({ name: "featured", title: "Show selected case badge", type: "boolean", initialValue: false })
              ],
              preview: {
                select: { title: "title", subtitle: "country", media: "image" }
              }
            })
          ]
        }),
        defineField({ name: "beforeLabel", title: "Before label", type: "string" }),
        defineField({ name: "afterLabel", title: "After label", type: "string" }),
        defineField({ name: "selectedLabel", title: "Selected case badge", type: "string" }),
        defineField({ name: "disclaimer", title: "Results disclaimer", type: "string" }),
        ctaLabelField
      ]
    }),
    defineField({
      name: "concerns",
      title: "Common concerns",
      type: "object",
      group: "content",
      fields: [
        enabledField,
        eyebrowField,
        titleField,
        descriptionField,
        defineField({ name: "items", title: "Concern cards", type: "array", validation: (rule) => rule.max(6), of: [textItemMember] }),
        ctaLabelField
      ]
    }),
    defineField({
      name: "method",
      title: "9D method video",
      type: "object",
      group: "content",
      fields: [
        enabledField,
        eyebrowField,
        titleField,
        descriptionField,
        stringListField("points", "Trust points"),
        videoField("video", "9D method video"),
        imageField("poster", "Video poster", "Recommended vertical 1080 x 1920 px. Leave blank to keep the built-in poster."),
        defineField({ name: "videoLabel", title: "Video label", type: "string" }),
        ctaLabelField
      ]
    }),
    defineField({
      name: "comparison",
      title: "Treatment direction comparison",
      type: "object",
      group: "content",
      fields: [
        enabledField,
        eyebrowField,
        titleField,
        descriptionField,
        defineField({
          name: "cards",
          title: "Comparison cards",
          type: "array",
          validation: (rule) => rule.max(2),
          of: [
            defineArrayMember({
              name: "comparisonCard",
              title: "Comparison card",
              type: "object",
              fields: [
                defineField({ name: "index", title: "Number", type: "string" }),
                defineField({ name: "title", title: "Title", type: "string" }),
                defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
                stringListField("points", "Points")
              ],
              preview: { select: { title: "title", subtitle: "description" } }
            })
          ]
        }),
        defineField({ name: "disclaimer", title: "Comparison disclaimer", type: "text", rows: 2 })
      ]
    }),
    defineField({
      name: "doctor",
      title: "Doctor authority",
      type: "object",
      group: "content",
      fields: [
        enabledField,
        eyebrowField,
        titleField,
        descriptionField,
        imageField("image", "Doctor portrait", "Recommended portrait image, at least 1200 x 1600 px. Leave blank to keep the built-in portrait."),
        defineField({ name: "imageAlt", title: "Image alt text", type: "string" }),
        stringListField("points", "Authority points"),
        ctaLabelField
      ]
    }),
    defineField({
      name: "international",
      title: "International patient journey",
      type: "object",
      group: "content",
      fields: [
        enabledField,
        eyebrowField,
        titleField,
        descriptionField,
        videoField("video", "Arrival and support video"),
        imageField("poster", "Video poster", "Recommended vertical 1080 x 1920 px. Leave blank to keep the built-in poster."),
        defineField({ name: "videoLabel", title: "Video label", type: "string" }),
        defineField({ name: "steps", title: "Journey steps", type: "array", validation: (rule) => rule.max(4), of: [textItemMember] }),
        ctaLabelField
      ]
    }),
    defineField({
      name: "faq",
      title: "Frequently asked questions",
      type: "object",
      group: "content",
      fields: [
        enabledField,
        eyebrowField,
        titleField,
        defineField({
          name: "items",
          title: "Questions",
          type: "array",
          validation: (rule) => rule.max(8),
          of: [
            defineArrayMember({
              name: "faqItem",
              title: "Question",
              type: "object",
              fields: [
                defineField({ name: "question", title: "Question", type: "string", validation: (rule) => rule.required() }),
                defineField({ name: "answer", title: "Answer", type: "text", rows: 4, validation: (rule) => rule.required() })
              ],
              preview: { select: { title: "question", subtitle: "answer" } }
            })
          ]
        })
      ]
    }),
    defineField({
      name: "assessment",
      title: "Private assessment form section",
      type: "object",
      group: "form",
      fields: [
        eyebrowField,
        titleField,
        descriptionField,
        stringListField("benefits", "Trust lines"),
        stringListField("concernOptions", "Form concern options", "Keep these concise. Changes affect newly submitted lead values."),
        defineField({ name: "privacyText", title: "Form privacy note", type: "string" })
      ]
    }),
    defineField({
      name: "finalCta",
      title: "Final assessment prompt",
      type: "object",
      group: "content",
      fields: [eyebrowField, titleField, descriptionField, ctaLabelField]
    }),
    defineField({
      name: "footer",
      title: "Closed landing page footer",
      type: "object",
      group: "content",
      description: "No website navigation fields are available here by design.",
      fields: [
        defineField({ name: "doctorName", title: "Doctor name", type: "string" }),
        defineField({ name: "brandLine", title: "Brand line", type: "string" }),
        defineField({ name: "disclaimer", title: "Medical disclaimer", type: "text", rows: 3 }),
        defineField({ name: "whatsappLabel", title: "WhatsApp button label", type: "string" })
      ]
    }),
    defineField({
      name: "thankYou",
      title: "Thank-you page",
      type: "object",
      group: "form",
      fields: [
        defineField({ name: "whatsappMessage", title: "Thank-you WhatsApp greeting", type: "text", rows: 4 }),
        eyebrowField,
        titleField,
        descriptionField,
        defineField({ name: "whatsappLabel", title: "Send photos button label", type: "string" }),
        defineField({ name: "returnLabel", title: "Return to results button label", type: "string" }),
        defineField({ name: "checklistTitle", title: "Photo checklist title", type: "string" }),
        stringListField("photoItems", "Photo checklist items"),
        defineField({ name: "photoInstructions", title: "Photo instructions", type: "text", rows: 3 }),
        defineField({ name: "disclaimer", title: "Medical disclaimer", type: "text", rows: 3 })
      ]
    })
  ],
  preview: {
    select: { title: "internalTitle", subtitle: "whatsappNumber" },
    prepare({ title, subtitle }) {
      return {
        title: title || "Google Ads - 9D Facelift Landing Page",
        subtitle: subtitle ? `Dedicated WhatsApp: ${subtitle}` : "Dedicated closed landing page"
      };
    }
  }
});
