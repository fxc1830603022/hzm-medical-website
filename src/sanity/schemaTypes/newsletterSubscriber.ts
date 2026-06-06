import { createElement } from "react";
import { defineField, defineType } from "sanity";

function SubscriberPreviewIcon() {
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
    createElement("rect", { x: 7, y: 8, width: 14, height: 12, rx: 3, fill: "#F6F0E5" }),
    createElement("path", {
      d: "M9 11.5L14 14.8L19 11.5",
      stroke: "#111111",
      strokeWidth: 1.45,
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }),
    createElement("circle", { cx: 20.4, cy: 7.6, r: 3.1, fill: "#C9A76A" }),
    createElement("path", {
      d: "M20.4 6.55V6.6M20.4 8.5V9.1",
      stroke: "#111111",
      strokeWidth: 1.2,
      strokeLinecap: "round"
    })
  );
}

export const newsletterSubscriber = defineType({
  name: "newsletterSubscriber",
  title: "Newsletter Subscriber",
  type: "document",
  icon: SubscriberPreviewIcon,
  fields: [
    defineField({ name: "email", title: "Email", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "source", title: "Source", type: "string", initialValue: "blog" }),
    defineField({ name: "createdAt", title: "Created At", type: "datetime" })
  ],
  preview: {
    select: {
      title: "email",
      subtitle: "createdAt"
    },
    prepare({ title, subtitle }) {
      return {
        title: title || "New subscriber",
        subtitle: subtitle || "Newsletter lead",
        media: SubscriberPreviewIcon
      };
    }
  }
});
