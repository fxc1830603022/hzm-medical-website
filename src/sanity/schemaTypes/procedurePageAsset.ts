import { defineField, defineType, type PreviewValue } from "sanity";
import { makePreviewImage } from "../previewImage";

type ProcedureAssetPreviewSelection = {
  title?: string;
  slug?: string;
  media?: PreviewValue["media"];
  heroImageUrl?: string;
  heroImagePath?: string;
};

const procedurePageOptions = [
  { title: "9D Facelift", value: "9d-facelift" },
  { title: "9D Deep Plane Facelift", value: "9d-deep-plane-facelift" }
];

function imageFields(prefix: string, title: string) {
  return [
    defineField({
      name: `${prefix}Image`,
      title: `${title} Upload`,
      type: "image",
      options: { hotspot: true }
    }),
    defineField({
      name: `${prefix}ImageUrl`,
      title: `${title} External Image URL`,
      description: "Use this for Cloudflare R2 or another public image URL.",
      type: "url"
    }),
    defineField({
      name: `${prefix}ImagePath`,
      title: `${title} Local Image Path`,
      description: "Example: /images/home-hero-dr-xiao-consultation-bg.webp",
      type: "string"
    }),
    defineField({
      name: `${prefix}ImageAlt`,
      title: `${title} Alt Text`,
      type: "string"
    })
  ];
}

export const procedurePageAsset = defineType({
  name: "procedurePageAsset",
  title: "Procedure Page Assets",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "9D Facelift Page Assets",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "slug",
      title: "Procedure Page",
      type: "string",
      options: {
        layout: "radio",
        list: procedurePageOptions
      },
      initialValue: "9d-facelift",
      validation: (Rule) => Rule.required()
    }),
    ...imageFields("hero", "Hero Consultation Image"),
    ...imageFields("miniResultOne", "Mini Result Preview Image 1"),
    ...imageFields("miniResultTwo", "Mini Result Preview Image 2"),
    ...imageFields("philosophy", "Philosophy Section Image"),
    ...imageFields("doctorAuthority", "Doctor Authority Image"),
    ...imageFields("finalCta", "Final CTA Image"),
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
      slug: "slug",
      media: "heroImage",
      heroImageUrl: "heroImageUrl",
      heroImagePath: "heroImagePath"
    },
    prepare({ title, slug, media, heroImageUrl, heroImagePath }: ProcedureAssetPreviewSelection) {
      return {
        title,
        subtitle: slug ? `Page: ${slug}` : "Procedure page assets",
        media: media || makePreviewImage(heroImageUrl || heroImagePath)
      };
    }
  }
});
