import { defineField, defineType } from "sanity";

export const faqItem = defineType({
  name: "faqItem",
  title: "FAQ Item",
  type: "document",
  fields: [
    defineField({ name: "question", title: "Question", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "answer", title: "Answer", type: "text", rows: 5 }),
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
    defineField({ name: "sortOrder", title: "Sort Order", type: "number", initialValue: 100 }),
    defineField({ name: "active", title: "Active", type: "boolean", initialValue: true })
  ],
  preview: {
    select: {
      title: "question",
      subtitle: "category"
    }
  }
});
