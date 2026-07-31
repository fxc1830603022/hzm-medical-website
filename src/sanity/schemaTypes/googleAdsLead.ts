import { defineField, defineType } from "sanity";

export const googleAdsLead = defineType({
  name: "googleAdsLead",
  title: "Google Ads Lead",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Full Name", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "countryRegion",
      title: "Country / Region",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({ name: "ageGroup", title: "Age Range", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "facialConcerns",
      title: "Main Facial Concerns",
      type: "array",
      of: [{ type: "string" }],
      validation: (rule) => rule.min(1).required()
    }),
    defineField({ name: "previousTreatments", title: "Previous Facial Treatments", type: "string" }),
    defineField({ name: "treatmentTimeline", title: "Expected Treatment Timeline", type: "string" }),
    defineField({ name: "whatsapp", title: "WhatsApp Number", type: "string" }),
    defineField({ name: "email", title: "Email Address", type: "string" }),
    defineField({ name: "preferredContactMethod", title: "Preferred Contact Method", type: "string" }),
    defineField({ name: "additionalNotes", title: "Additional Notes", type: "text", rows: 4 }),
    defineField({ name: "consent", title: "Contact Consent", type: "boolean", readOnly: true }),
    defineField({
      name: "status",
      title: "Lead Status",
      type: "string",
      initialValue: "new",
      options: {
        list: [
          { title: "New", value: "new" },
          { title: "Contacted", value: "contacted" },
          { title: "Qualified", value: "qualified" },
          { title: "Closed", value: "closed" }
        ]
      }
    }),
    defineField({ name: "source", title: "Source", type: "string", readOnly: true }),
    defineField({ name: "createdAt", title: "Submitted At", type: "datetime", readOnly: true }),
    defineField({
      name: "googleSheetsSyncStatus",
      title: "Google Sheets Sync",
      type: "string",
      readOnly: true,
      options: {
        list: [
          { title: "Pending", value: "pending" },
          { title: "Synced", value: "synced" },
          { title: "Not Configured", value: "not_configured" },
          { title: "Failed", value: "failed" }
        ]
      }
    }),
    defineField({ name: "googleSheetsSyncedAt", title: "Google Sheets Synced At", type: "datetime", readOnly: true }),
    defineField({ name: "googleSheetsSyncError", title: "Google Sheets Sync Error", type: "text", readOnly: true })
  ],
  orderings: [
    {
      title: "Newest first",
      name: "createdAtDesc",
      by: [{ field: "createdAt", direction: "desc" }]
    }
  ],
  preview: {
    select: {
      title: "name",
      country: "countryRegion",
      whatsapp: "whatsapp",
      email: "email",
      status: "status"
    },
    prepare({ title, country, whatsapp, email, status }) {
      const contact = whatsapp || email || "No contact details";
      return {
        title: title || "New Google Ads lead",
        subtitle: [country, contact, status].filter(Boolean).join(" | ")
      };
    }
  }
});
