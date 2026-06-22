import { createElement } from "react";
import { defineField, defineType } from "sanity";

function ConsultationPreviewIcon() {
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
      d: "M9 11.2L14 14.5L19 11.2",
      stroke: "#111111",
      strokeWidth: 1.5,
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }),
    createElement("circle", { cx: 20.5, cy: 7.5, r: 3.2, fill: "#C9A76A" }),
    createElement("path", {
      d: "M20.5 6.35V6.4M20.5 8.45V9.2",
      stroke: "#111111",
      strokeWidth: 1.25,
      strokeLinecap: "round"
    })
  );
}

export const consultationSubmission = defineType({
  name: "consultationSubmission",
  title: "Consultation Submission",
  type: "document",
  icon: ConsultationPreviewIcon,
  fields: [
    defineField({ name: "name", title: "Name", type: "string" }),
    defineField({
      name: "gender",
      title: "Gender",
      type: "string",
      options: {
        list: [
          { title: "Male", value: "Male" },
          { title: "Female", value: "Female" },
          { title: "Prefer not to say", value: "Prefer not to say" }
        ]
      }
    }),
    defineField({
      name: "ageGroup",
      title: "Age Group",
      type: "string",
      options: {
        list: [
          { title: "Under 25", value: "Under 25" },
          { title: "25-35", value: "25-35" },
          { title: "36-45", value: "36-45" },
          { title: "46-55", value: "46-55" },
          { title: "55+", value: "55+" }
        ]
      }
    }),
    defineField({ name: "nationality", title: "Country / Region", type: "string" }),
    defineField({
      name: "facialConcerns",
      title: "Facial Concerns",
      type: "string",
      options: {
        list: [
          { title: "Sagging midface", value: "Sagging midface" },
          { title: "Jowls / lower face laxity", value: "Jowls / lower face laxity" },
          { title: "Loose neck skin", value: "Loose neck skin" },
          { title: "Deep nasolabial folds", value: "Deep nasolabial folds" },
          { title: "Facial volume loss", value: "Facial volume loss" },
          { title: "Eye area aging", value: "Eye area aging" },
          { title: "Overall anti-aging assessment", value: "Overall anti-aging assessment" },
          { title: "Not sure", value: "Not sure" }
        ]
      }
    }),
    defineField({
      name: "budget",
      title: "Budget",
      type: "string",
      options: {
        list: [
          { title: "$5,000 - $10,000", value: "$5,000 - $10,000" },
          { title: "$10,000 - $20,000", value: "$10,000 - $20,000" },
          { title: "Over $20,000", value: "Over $20,000" }
        ]
      }
    }),
    defineField({ name: "whatsapp", title: "WhatsApp", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "wechat", title: "WeChat", type: "string" }),
    defineField({ name: "phone", title: "Phone", type: "string" }),
    defineField({
      name: "interestedIn",
      title: "Interested In",
      type: "string",
      options: {
        list: [
          { title: "9D Facelift", value: "9D Facelift" },
          { title: "Deep Plane Facelift", value: "Deep Plane Facelift" },
          { title: "Online Consultation", value: "Online Consultation" },
          { title: "International Patient Plan", value: "International Patient Plan" },
          { title: "Not sure yet", value: "Not sure yet" }
        ]
      }
    }),
    defineField({
      name: "hearAbout",
      title: "How Did You Hear About Us?",
      type: "string",
      options: {
        list: [
          { title: "Instagram", value: "Instagram" },
          { title: "Facebook", value: "Facebook" },
          { title: "YouTube", value: "YouTube" },
          { title: "Google Search", value: "Google Search" },
          { title: "Friend / Referral", value: "Friend / Referral" },
          { title: "Doctor / Clinic referral", value: "Doctor / Clinic referral" },
          { title: "Other", value: "Other" }
        ]
      }
    }),
    defineField({ name: "message", title: "Message", type: "text", rows: 4 }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      initialValue: "new",
      options: {
        list: [
          { title: "New", value: "new" },
          { title: "Contacted", value: "contacted" },
          { title: "Closed", value: "closed" }
        ]
      }
    }),
    defineField({ name: "source", title: "Source", type: "string", initialValue: "website" }),
    defineField({ name: "createdAt", title: "Created At", type: "datetime" }),
    defineField({ name: "country", title: "Legacy Country / Region", type: "string", hidden: true, readOnly: true }),
    defineField({ name: "concern", title: "Legacy Concern", type: "string", hidden: true, readOnly: true })
  ],
  preview: {
    select: {
      title: "name",
      email: "email",
      whatsapp: "whatsapp",
      phone: "phone"
    },
    prepare({ title, email, whatsapp, phone }) {
      return {
        title: title || "New consultation",
        subtitle: email || whatsapp || phone || "No contact details",
        media: ConsultationPreviewIcon
      };
    }
  }
});
