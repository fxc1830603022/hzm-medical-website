import { defineField, defineType, type PreviewValue } from "sanity";
import { makePreviewImage } from "../previewImage";

type GalleryPreviewSelection = {
  title?: string;
  subtitle?: string;
  displayRole?: string;
  media?: PreviewValue["media"];
  externalImageUrl?: string;
  localImagePath?: string;
};

export const galleryItem = defineType({
  name: "galleryItem",
  title: "Gallery Item",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true }
    }),
    defineField({
      name: "externalImageUrl",
      title: "External Image URL",
      description: "Use this for Cloudflare R2 public image URLs.",
      type: "url"
    }),
    defineField({
      name: "localImagePath",
      title: "Local Image Path",
      description: "Example: /images/gallery-case-01.jpg",
      type: "string"
    }),
    defineField({
      name: "alt",
      title: "Alt Text",
      type: "string"
    }),
    defineField({
      name: "displayRole",
      title: "Before & After Page Role",
      description: "Choose Hero for the single full-width image in the first screen. Existing blank items are treated as Case Gallery items.",
      type: "string",
      options: {
        layout: "radio",
        list: [
          { title: "Case Gallery", value: "case" },
          { title: "Hero First Screen Image", value: "hero" },
          { title: "Featured Case", value: "featured" }
        ]
      },
      initialValue: "case"
    }),
    defineField({
      name: "age",
      title: "Age",
      description: "Use Private if you do not want to show patient age.",
      type: "string"
    }),
    defineField({
      name: "concern",
      title: "Concern",
      description: "Example: Lower-face sagging and jawline softness.",
      type: "string"
    }),
    defineField({
      name: "procedure",
      title: "Procedure",
      description: "Example: 9D Deep Plane Facelift.",
      type: "string"
    }),
    defineField({
      name: "beforeLabel",
      title: "Before Label",
      description: "Optional overlay label for a complete before/after image.",
      type: "string",
      initialValue: "Before"
    }),
    defineField({
      name: "afterLabel",
      title: "After Label",
      description: "Optional overlay label for a complete before/after image.",
      type: "string",
      initialValue: "After 6 months"
    }),
    defineField({
      name: "description",
      title: "Short Description",
      type: "text",
      rows: 3
    }),
    defineField({
      name: "sortOrder",
      title: "Sort Order",
      type: "number",
      initialValue: 100
    }),
    defineField({
      name: "active",
      title: "Active",
      type: "boolean",
      initialValue: true
    })
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "localImagePath",
      displayRole: "displayRole",
      media: "image",
      externalImageUrl: "externalImageUrl",
      localImagePath: "localImagePath"
    },
    prepare({ title, subtitle, displayRole, media, externalImageUrl, localImagePath }: GalleryPreviewSelection) {
      return {
        title,
        subtitle: [displayRole ? `Role: ${displayRole}` : null, subtitle || externalImageUrl].filter(Boolean).join(" | "),
        media: media || makePreviewImage(externalImageUrl || localImagePath)
      };
    }
  }
});
