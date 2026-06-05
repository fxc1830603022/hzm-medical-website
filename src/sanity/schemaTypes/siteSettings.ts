import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "siteTitle", title: "Site Title", type: "string" }),
    defineField({ name: "heroSubtitle", title: "Hero Subtitle", type: "string" }),
    defineField({ name: "heroTitleTop", title: "Hero Title Top", type: "string" }),
    defineField({ name: "heroTitleBottom", title: "Hero Title Bottom", type: "string" }),
    defineField({ name: "heroDescription", title: "Hero Description", type: "text", rows: 3 }),
    defineField({
      name: "whatsappNumber",
      title: "WhatsApp Number",
      type: "string",
      description: "Use the standard US display format: +1 304-356-8136.",
      validation: (rule) =>
        rule.required().custom((value) => {
          const digits = String(value || "").replace(/\D/g, "");
          return /^1\d{10}$/.test(digits) || "Use a valid US WhatsApp number, for example: +1 304-356-8136.";
        })
    }),
    defineField({ name: "whatsappMessage", title: "WhatsApp Message", type: "text", rows: 3 }),
    defineField({
      name: "instagramUrl",
      title: "Instagram URL",
      type: "url",
      description: "Paste the Instagram profile URL. Leave empty until the official account is ready."
    }),
    defineField({
      name: "youtubeUrl",
      title: "YouTube URL",
      type: "url",
      description: "Paste the YouTube channel URL."
    }),
    defineField({
      name: "facebookUrl",
      title: "Facebook URL",
      type: "url",
      description: "Paste the Facebook page URL."
    }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "location", title: "Location", type: "string" })
  ],
  preview: {
    prepare() {
      return {
        title: "Site Settings"
      };
    }
  }
});
