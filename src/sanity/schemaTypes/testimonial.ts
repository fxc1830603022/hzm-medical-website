import { defineField, defineType } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Client Name", type: "string" }),
    defineField({ name: "country", title: "Country or Region", type: "string" }),
    defineField({ name: "treatment", title: "Treatment", type: "string" }),
    defineField({ name: "quote", title: "Quote", type: "text", rows: 5 }),
    defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "sortOrder", title: "Sort Order", type: "number", initialValue: 100 }),
    defineField({ name: "active", title: "Active", type: "boolean", initialValue: true })
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "country",
      media: "image"
    }
  }
});
