import { createElement } from "react";
import { defineField, defineType } from "sanity";

const faqPageOptions = [
  { title: "All pages / Global", value: "all" },
  { title: "Doctor page", value: "/doctor" },
  { title: "9D Facelift page", value: "/procedures/9d-facelift" },
  { title: "9D Deep Plane Facelift page", value: "/procedures/9d-deep-plane-facelift" },
  { title: "Before & After page", value: "/before-after" },
  { title: "International Patients page", value: "/international-patients" },
  { title: "Consultation page", value: "/consultation" },
  { title: "Articles FAQ tab", value: "/blog" }
];

function FaqPreviewIcon() {
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
      d: "M8.1 9.1H19.9C21 9.1 21.9 10 21.9 11.1V17.1C21.9 18.2 21 19.1 19.9 19.1H14.8L11.4 21.7V19.1H8.1C7 19.1 6.1 18.2 6.1 17.1V11.1C6.1 10 7 9.1 8.1 9.1Z",
      fill: "#F6F0E5"
    }),
    createElement("path", {
      d: "M11.4 12.4C11.6 11.4 12.5 10.7 13.9 10.7C15.4 10.7 16.5 11.5 16.5 12.7C16.5 13.5 16 14.1 15.1 14.6C14.4 15 14.1 15.3 14.1 16",
      stroke: "#111111",
      strokeWidth: 1.45,
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }),
    createElement("circle", { cx: 14.05, cy: 17.35, r: 0.75, fill: "#111111" }),
    createElement("circle", { cx: 20.2, cy: 8.2, r: 3.1, fill: "#C9A76A" }),
    createElement("path", {
      d: "M19.1 8.15H21.3M20.2 7.05V9.25",
      stroke: "#111111",
      strokeWidth: 1.15,
      strokeLinecap: "round"
    })
  );
}

export const faqItem = defineType({
  name: "faqItem",
  title: "FAQ Item",
  type: "document",
  icon: FaqPreviewIcon,
  fields: [
    defineField({ name: "question", title: "Question", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "answer", title: "Answer", type: "text", rows: 5, validation: (Rule) => Rule.required() }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Treatment", value: "treatment" },
          { title: "Travel", value: "travel" },
          { title: "Recovery", value: "recovery" },
          { title: "Payment", value: "payment" },
          { title: "Safety", value: "safety" }
        ]
      }
    }),
    defineField({
      name: "displayOnPages",
      title: "Display On Pages",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: faqPageOptions
      },
      description: "Choose where this FAQ should appear. Leave empty to show it as a global FAQ on all landing pages."
    }),
    defineField({ name: "sortOrder", title: "Sort Order", type: "number", initialValue: 100 }),
    defineField({ name: "active", title: "Active", type: "boolean", initialValue: true })
  ],
  preview: {
    select: {
      title: "question",
      category: "category",
      displayOnPages: "displayOnPages"
    },
    prepare({ title, category, displayOnPages }) {
      const pages =
        Array.isArray(displayOnPages) && displayOnPages.length
          ? displayOnPages.map((page) => faqPageOptions.find((option) => option.value === page)?.title || page).join(", ")
          : "Global";
      const categoryLabel = category ? category.charAt(0).toUpperCase() + category.slice(1) : "FAQ";

      return {
        title: title || "New FAQ",
        subtitle: `${categoryLabel} | ${pages}`,
        media: FaqPreviewIcon
      };
    }
  }
});
