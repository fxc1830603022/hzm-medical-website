import { defineField, defineType } from "sanity";

const faqPageOptions = [
  { title: "All pages / Global", value: "all" },
  { title: "Doctor page", value: "/doctor" },
  { title: "9D Facelift page", value: "/procedures/9d-facelift" },
  { title: "9D Deep Plane Facelift page", value: "/procedures/9d-deep-plane-facelift" },
  { title: "Before & After page", value: "/before-after" },
  { title: "International Patients page", value: "/international-patients" },
  { title: "Consultation page", value: "/consultation" },
  { title: "Articles FAQ tab", value: "/blog" }
];

export const faqItem = defineType({
  name: "faqItem",
  title: "FAQ Item",
  type: "document",
  fields: [
    defineField({ name: "question", title: "Question", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "answer", title: "Answer", type: "text", rows: 5, validation: (Rule) => Rule.required() }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Treatment", value: "treatment" },
          { title: "Travel", value: "travel" },
          { title: "Recovery", value: "recovery" },
          { title: "Payment", value: "payment" },
          { title: "Safety", value: "safety" }
        ]
      }
    }),
    defineField({
      name: "displayOnPages",
      title: "Display On Pages",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: faqPageOptions
      },
      description: "Choose where this FAQ should appear. Leave empty to show it as a global FAQ on all landing pages."
    }),
    defineField({ name: "sortOrder", title: "Sort Order", type: "number", initialValue: 100 }),
    defineField({ name: "active", title: "Active", type: "boolean", initialValue: true })
  ],
  preview: {
    select: {
      title: "question",
      category: "category",
      displayOnPages: "displayOnPages"
    },
    prepare({ title, category, displayOnPages }) {
      const pages = Array.isArray(displayOnPages) && displayOnPages.length ? displayOnPages.join(", ") : "Global";

      return {
        title,
        subtitle: [category, pages].filter(Boolean).join(" | ")
      };
    }
  }
});
