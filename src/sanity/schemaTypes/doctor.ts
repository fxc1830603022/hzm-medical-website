import { defineField, defineType } from "sanity";

export const doctor = defineType({
  name: "doctor",
  title: "Doctor",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name", maxLength: 96 } }),
    defineField({ name: "photo", title: "Photo", type: "image", options: { hotspot: true } }),
    defineField({ name: "title", title: "Professional Title", type: "string" }),
    defineField({ name: "specialties", title: "Specialties", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "experience", title: "Experience", type: "text", rows: 4 }),
    defineField({ name: "credentials", title: "Credentials", type: "text", rows: 4 }),
    defineField({ name: "academicBackground", title: "Academic Background", type: "text", rows: 4 }),
    defineField({ name: "sortOrder", title: "Sort Order", type: "number", initialValue: 100 }),
    defineField({ name: "active", title: "Active", type: "boolean", initialValue: true })
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "title",
      media: "photo"
    }
  }
});
