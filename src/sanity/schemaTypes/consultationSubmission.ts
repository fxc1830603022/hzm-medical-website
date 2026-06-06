import { defineField, defineType } from "sanity";

export const consultationSubmission = defineType({
  name: "consultationSubmission",
  title: "Consultation Submission",
  type: "document",
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
    defineField({ name: "createdAt", title: "Created At", type: "datetime" })
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "email"
    }
  }
});
