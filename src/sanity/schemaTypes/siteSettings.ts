import { createElement } from "react";
import { defineField, defineType } from "sanity";

function SiteSettingsPreviewIcon() {
  return createElement(
    "svg",
    {
      width: 28,
      height: 28,
      viewBox: "0 0 28 28",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      "aria-hidden": true
    },
    createElement("rect", { x: 2, y: 2, width: 24, height: 24, rx: 7, fill: "#111111" }),
    createElement("path", {
      d: "M18.8 7.6L20.4 9.2L17.5 12.1L15.9 10.5L18.8 7.6Z",
      fill: "#C9A76A"
    }),
    createElement("path", {
      d: "M16.7 11.3L10.1 17.9",
      stroke: "#F6F0E5",
      strokeWidth: 2,
      strokeLinecap: "round"
    }),
    createElement("path", {
      d: "M8.2 18.7L9.3 19.8L11.4 18.8L9.2 16.6L8.2 18.7Z",
      fill: "#F6F0E5"
    }),
    createElement("circle", { cx: 18.7, cy: 18.2, r: 2.2, stroke: "#C9A76A", strokeWidth: 1.6 }),
    createElement("path", {
      d: "M18.7 15.2V14.2M18.7 22.2V21.2M15.7 18.2H14.7M22.7 18.2H21.7",
      stroke: "#C9A76A",
      strokeWidth: 1.2,
      strokeLinecap: "round"
    })
  );
}

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  icon: SiteSettingsPreviewIcon,
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
        title: "Site Settings",
        media: SiteSettingsPreviewIcon
      };
    }
  }
});
