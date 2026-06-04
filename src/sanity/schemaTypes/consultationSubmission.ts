import { defineField, defineType } from "sanity";

export const consultationSubmission = defineType({
  name: "consultationSubmission",
  title: "Consultation Submission",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "phone", title: "Phone", type: "string" }),
    defineField({ name: "country", title: "Country / Region", type: "string" }),
    defineField({ name: "concern", title: "Concern", type: "string" }),
    defineField({ name: "message", title: "Message", type: "text", rows: 4 }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      initialValue: "new",
      options: {
        list: [
          { title: "New", value: "new" },
          { title: "Contacted", value: "contacted" },
          { title: "Closed", value: "closed" }
        ]
      }
    }),
    defineField({ name: "source", title: "Source", type: "string", initialValue: "website" }),
    defineField({ name: "createdAt", title: "Created At", type: "datetime" })
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "email"
    }
  }
});
