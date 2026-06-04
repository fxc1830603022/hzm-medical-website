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
    defineField({ name: "whatsappNumber", title: "WhatsApp Number", type: "string" }),
    defineField({ name: "whatsappMessage", title: "WhatsApp Message", type: "text", rows: 3 }),
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
