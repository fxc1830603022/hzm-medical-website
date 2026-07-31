import type { GoogleAdsLead } from "./sanity-write";

type GoogleSheetsResponse = {
  ok?: boolean;
  error?: string;
};

function formatSubmittedAt(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23"
  }).format(date);
}

function formatSheetText(value?: string) {
  const text = value?.trim() || "";
  return text ? `'${text}` : "";
}

export async function syncGoogleAdsLeadToSheets(payload: GoogleAdsLead, sanityRecordId?: string) {
  const webhookUrl = process.env.GOOGLE_ADS_SHEETS_WEBHOOK_URL?.trim() || "";
  if (!webhookUrl) {
    return { configured: false, synced: false };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
      signal: controller.signal,
      body: JSON.stringify({
        secret: process.env.GOOGLE_ADS_SHEETS_WEBHOOK_SECRET?.trim() || "",
        submittedAt: formatSubmittedAt(payload.createdAt),
        name: payload.name,
        countryRegion: payload.countryRegion,
        ageGroup: payload.ageGroup,
        facialConcerns: payload.facialConcerns.join(", "),
        previousTreatments: payload.previousTreatments,
        treatmentTimeline: payload.treatmentTimeline,
        whatsapp: formatSheetText(payload.whatsapp),
        email: payload.email || "",
        preferredContactMethod: payload.preferredContactMethod,
        additionalNotes: payload.additionalNotes || "",
        consent: payload.consent ? "Yes" : "No",
        status: payload.status,
        source: payload.source,
        sanityRecordId: sanityRecordId || ""
      })
    });

    const text = await response.text();
    let data: GoogleSheetsResponse | null = null;
    try {
      data = JSON.parse(text) as GoogleSheetsResponse;
    } catch {
      data = null;
    }

    if (!response.ok || data?.ok === false) {
      return {
        configured: true,
        synced: false,
        error: data?.error || text.slice(0, 180) || `Google Sheets returned ${response.status}.`
      };
    }

    return { configured: true, synced: true };
  } catch (error) {
    return {
      configured: true,
      synced: false,
      error: error instanceof Error ? error.message : "Google Ads Sheets sync failed."
    };
  } finally {
    clearTimeout(timeout);
  }
}
