import { defineField, defineType } from "sanity";

export const treatment = defineType({
  name: "treatment",
  title: "Treatment",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Treatment Name", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title", maxLength: 96 } }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Anti Aging", value: "anti-aging" },
          { title: "Skin Rejuvenation", value: "skin-rejuvenation" },
          { title: "Injectables", value: "injectables" },
          { title: "Facial Rejuvenation", value: "facial-rejuvenation" },
          { title: "Medical Tourism", value: "medical-tourism" }
        ]
      }
    }),
    defineField({ name: "coverImage", title: "Cover Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "summary", title: "Summary", type: "text", rows: 3 }),
    defineField({ name: "introduction", title: "Project Introduction", type: "text", rows: 6 }),
    defineField({ name: "effects", title: "Effects", type: "text", rows: 5 }),
    defineField({ name: "recovery", title: "Recovery Period", type: "text", rows: 5 }),
    defineField({ name: "suitableFor", title: "Suitable For", type: "text", rows: 5 }),
    defineField({ name: "faqHtml", title: "FAQ HTML", type: "text", rows: 8 }),
    defineField({ name: "sortOrder", title: "Sort Order", type: "number", initialValue: 100 }),
    defineField({ name: "active", title: "Active", type: "boolean", initialValue: true })
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "coverImage"
    }
  }
});
