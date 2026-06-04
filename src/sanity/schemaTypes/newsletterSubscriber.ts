import { defineField, defineType } from "sanity";

export const newsletterSubscriber = defineType({
  name: "newsletterSubscriber",
  title: "Newsletter Subscriber",
  type: "document",
  fields: [
    defineField({ name: "email", title: "Email", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "source", title: "Source", type: "string", initialValue: "blog" }),
    defineField({ name: "createdAt", title: "Created At", type: "datetime" })
  ],
  preview: {
    select: {
      title: "email",
      subtitle: "createdAt"
    }
  }
});
