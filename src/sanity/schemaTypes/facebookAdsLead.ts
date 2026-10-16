import { defineField, defineType } from "sanity";
import { facebookAssessmentAgeRanges, facebookAssessmentConcerns, facebookAssessmentTimelines } from "../../lib/facebook-assessment";

export const facebookAdsLead = defineType({
  name: "facebookAdsLead",
  title: "Facebook 客户",
  type: "document",
  groups: [
    { name: "customer", title: "客户资料", default: true },
    { name: "followup", title: "客户跟进" },
    { name: "sync", title: "Google 表格同步" }
  ],
  fields: [
    defineField({ name: "name", group: "customer", title: "Full Name", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "countryRegion", group: "customer", title: "Country / Region", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "ageGroup", group: "customer", title: "Age Range", type: "string", options: { list: [...facebookAssessmentAgeRanges] }, validation: (rule) => rule.required() }),
    defineField({ name: "treatmentTimeline", group: "customer", title: "Treatment Timeline", type: "string", options: { list: [...facebookAssessmentTimelines] } }),
    defineField({ name: "whatsapp", group: "customer", title: "WhatsApp Number", type: "string" }),
    defineField({ name: "email", group: "customer", title: "Email Address", type: "string" }),
    defineField({ name: "facialConcerns", group: "customer", title: "Main Concerns", type: "array", of: [{ type: "string" }], options: { list: [...facebookAssessmentConcerns] }, validation: (rule) => rule.min(1).required() }),
    defineField({ name: "additionalNotes", group: "customer", title: "Additional Notes", type: "text", rows: 4 }),
    defineField({ name: "consent", group: "customer", title: "Contact Consent", type: "boolean", readOnly: true }),
    defineField({ name: "status", title: "跟进状态", group: "followup", type: "string", initialValue: "new", options: { list: [
      { title: "新客户 · 待联系", value: "new" },
      { title: "已联系", value: "contacted" },
      { title: "有效客户", value: "qualified" },
      { title: "已结束", value: "closed" }
    ] } }),
    defineField({ name: "followUpNotes", title: "跟进记录", group: "followup", type: "text", rows: 5 }),
    defineField({ name: "googleSheetsSyncStatus", title: "表格同步状态", group: "sync", type: "string", readOnly: true, options: { list: [
      { title: "等待同步", value: "pending" },
      { title: "已同步", value: "synced" },
      { title: "尚未连接", value: "not_configured" },
      { title: "同步失败", value: "failed" }
    ] } }),
    defineField({ name: "googleSheetsSyncedAt", title: "同步成功时间", group: "sync", type: "datetime", readOnly: true }),
    defineField({ name: "googleSheetsSyncError", title: "同步问题", group: "sync", type: "text", readOnly: true, rows: 3 }),
    defineField({ name: "source", group: "customer", title: "Source", type: "string", readOnly: true }),
    defineField({ name: "createdAt", group: "customer", title: "Submitted At", type: "datetime", readOnly: true })
  ],
  orderings: [{ title: "Newest first", name: "createdAtDesc", by: [{ field: "createdAt", direction: "desc" }] }],
  preview: {
    select: { title: "name", country: "countryRegion", whatsapp: "whatsapp", email: "email", status: "status" },
    prepare({ title, country, whatsapp, email, status }) {
      return { title: title || "New Facebook Ads lead", subtitle: [country, whatsapp || email, status].filter(Boolean).join(" | ") };
    }
  }
});
