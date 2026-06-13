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
  fieldsets: [
    {
      name: "seo",
      title: "SEO / Search Settings",
      options: { collapsible: true, collapsed: false }
    },
    {
      name: "strategy",
      title: "Content Strategy Notes",
      options: { collapsible: true, collapsed: true }
    }
  ],
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
      name: "seoTitle",
      title: "SEO Title",
      description: "Optional. If empty, the article title will be used for Google and social previews.",
      type: "string",
      fieldset: "seo",
      validation: (Rule) => Rule.max(70).warning("SEO titles are usually best under 70 characters.")
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description",
      description: "Optional. If empty, the article excerpt will be used.",
      type: "text",
      rows: 3,
      fieldset: "seo",
      validation: (Rule) => Rule.max(170).warning("Meta descriptions are usually best under 170 characters.")
    }),
    defineField({
      name: "focusKeyword",
      title: "Focus Keyword",
      description: "Main keyword for this article, for example: 9D Facelift.",
      type: "string",
      fieldset: "seo"
    }),
    defineField({
      name: "secondaryKeywords",
      title: "Secondary Keywords",
      description: "Supporting keywords and related search terms.",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      fieldset: "seo"
    }),
    defineField({
      name: "canonicalUrl",
      title: "Canonical URL",
      description: "Optional. Only use this if this article should point Google to another canonical URL.",
      type: "url",
      fieldset: "seo"
    }),
    defineField({
      name: "bodyHtml",
      title: "Article Body HTML",
      description: "HTML is supported to preserve the original article format.",
      type: "text",
      rows: 14
    }),
    defineField({
      name: "recommendedImageBrief",
      title: "Recommended Image Brief",
      description: "Internal note for what image should be used with this article.",
      type: "text",
      rows: 3,
      fieldset: "strategy"
    }),
    defineField({
      name: "internalLinkingNotes",
      title: "Internal Linking Notes",
      description: "Internal note for what pages this article should link to.",
      type: "text",
      rows: 5,
      fieldset: "strategy"
    }),
    defineField({
      name: "medicalReviewNote",
      title: "Medical Review Note",
      description: "Internal note for doctor/business review before publishing medical content.",
      type: "text",
      rows: 3,
      fieldset: "strategy"
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
