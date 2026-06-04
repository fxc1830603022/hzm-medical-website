import { defineField, defineType, type PreviewValue } from "sanity";
import { makePreviewImage } from "../previewImage";

type GalleryPreviewSelection = {
  title?: string;
  subtitle?: string;
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
      media: "image",
      externalImageUrl: "externalImageUrl",
      localImagePath: "localImagePath"
    },
    prepare({ title, subtitle, media, externalImageUrl, localImagePath }: GalleryPreviewSelection) {
      return {
        title,
        subtitle,
        media: media || makePreviewImage(externalImageUrl || localImagePath)
      };
    }
  }
});
