import { defineField, defineType, type PreviewValue } from "sanity";
import { makePreviewImage } from "../previewImage";

type PostPreviewSelection = {
  title?: string;
  subtitle?: string;
  media?: PreviewValue["media"];
  externalImageUrl?: string;
  localImagePath?: string;
};

export const post = defineType({
  name: "post",
  title: "Article",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Article Title",
      type: "string",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      initialValue: "technique",
      options: {
        list: [
          { title: "Technique", value: "technique" },
          { title: "Education", value: "knowledge" },
          { title: "Cases", value: "case" },
          { title: "FAQ", value: "faq" }
        ]
      }
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
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
      name: "excerpt",
      title: "Article Excerpt",
      type: "text",
      rows: 3
    }),
    defineField({
      name: "bodyHtml",
      title: "Article Body HTML",
      description: "HTML is supported to preserve the original article format.",
      type: "text",
      rows: 14
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      initialValue: "published",
      options: {
        list: [
          { title: "Published", value: "published" },
          { title: "Draft", value: "draft" }
        ],
        layout: "radio"
      }
    }),
    defineField({
      name: "readTime",
      title: "Read Time",
      type: "string",
      initialValue: "5 min read"
    }),
    defineField({
      name: "publishedAt",
      title: "Publish Date",
      type: "date"
    })
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "coverImage",
      externalImageUrl: "externalImageUrl",
      localImagePath: "localImagePath"
    },
    prepare({ title, subtitle, media, externalImageUrl, localImagePath }: PostPreviewSelection) {
      return {
        title,
        subtitle,
        media: media || makePreviewImage(externalImageUrl || localImagePath)
      };
    }
  }
});
