export const facebookAssessmentSource = "facebook-ads-private-assessment-v1";
export const facebookAssessmentConcerns = ["Midface", "Jawline", "Neck", "Eye Area", "Overall Aging"] as const;
export const facebookAssessmentAgeRanges = ["18-29", "30-39", "40-49", "50-59", "60-69", "70+"] as const;
export const facebookAssessmentTimelines = ["Just exploring", "Within 1-3 months", "Within 3-6 months", "Within 6-12 months"] as const;

export type FacebookAssessment = {
  name: string;
  countryRegion: string;
  ageGroup: string;
  treatmentTimeline: string;
  whatsapp: string;
  email: string;
  facialConcerns: string[];
  additionalNotes: string;
  consent: boolean;
};

export function validateFacebookAssessment(input: unknown):
  | { ok: true; data: FacebookAssessment }
  | { ok: false; error: string } {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return { ok: false, error: "Please complete the assessment form." };
  }
  const body = input as Record<string, unknown>;
  const limits: Record<string, number> = { name: 120, countryRegion: 100, ageGroup: 20, treatmentTimeline: 40, whatsapp: 40, email: 254, additionalNotes: 2000 };
  if (Object.entries(limits).some(([key, max]) => typeof body[key] === "string" && body[key].trim().length > max)) {
    return { ok: false, error: "One of your entries is too long. Please shorten it and try again." };
  }
  const text = (key: string, max: number) => {
    const value = typeof body[key] === "string" ? body[key].trim() : "";
    return value.length <= max ? value : "";
  };
  const data: FacebookAssessment = {
    name: text("name", 120),
    countryRegion: text("countryRegion", 100),
    ageGroup: text("ageGroup", 20),
    treatmentTimeline: text("treatmentTimeline", 40),
    whatsapp: text("whatsapp", 40),
    email: text("email", 254),
    facialConcerns: Array.isArray(body.facialConcerns)
      ? [...new Set(body.facialConcerns.filter((value): value is string => typeof value === "string"))]
      : [],
    additionalNotes: text("additionalNotes", 2000),
    consent: body.consent === true
  };
  if (!data.name || !data.countryRegion || !facebookAssessmentAgeRanges.some((value) => value === data.ageGroup)) {
    return { ok: false, error: "Please add your name, country or region, and age range." };
  }
  if (!data.facialConcerns.length || data.facialConcerns.some((value) => !facebookAssessmentConcerns.some((concern) => concern === value))) {
    return { ok: false, error: "Please select at least one main concern." };
  }
  if (data.treatmentTimeline && !facebookAssessmentTimelines.some((value) => value === data.treatmentTimeline)) {
    return { ok: false, error: "Please select a treatment timeline from the list." };
  }
  if (!data.whatsapp && !data.email) {
    return { ok: false, error: "Please provide a WhatsApp number or email address." };
  }
  if (data.whatsapp && (!/^\+?[\d\s().-]+$/.test(data.whatsapp) || !/^\d{8,15}$/.test(data.whatsapp.replace(/\D/g, "")))) {
    return { ok: false, error: "Please enter a valid WhatsApp number, including your country code." };
  }
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }
  if (typeof body.additionalNotes === "string" && body.additionalNotes.trim().length > 2000) {
    return { ok: false, error: "Please keep additional notes within 2,000 characters." };
  }
  if (!data.consent) {
    return { ok: false, error: "Please confirm that we may contact you about your assessment." };
  }
  return { ok: true, data };
}
