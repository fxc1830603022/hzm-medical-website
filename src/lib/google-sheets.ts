type LeadPayload = {
  name: string;
  gender?: string;
  ageGroup?: string;
  nationality?: string;
  facialConcerns?: string;
  budget?: string;
  whatsapp?: string;
  email: string;
  wechat?: string;
  phone?: string;
  country?: string;
  concern?: string;
  interestedIn?: string;
  hearAbout?: string;
  message?: string;
  source?: string;
  createdAt: string;
  status?: string;
};

type GoogleSheetsResponse = {
  ok?: boolean;
  error?: string;
};

function getGoogleSheetsWebhookUrl() {
  return process.env.GOOGLE_SHEETS_WEBHOOK_URL?.trim() || "";
}

function getGoogleSheetsWebhookSecret() {
  return process.env.GOOGLE_SHEETS_WEBHOOK_SECRET?.trim() || "";
}

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
    hourCycle: "h23"
  }).format(date);
}

function formatSheetText(value?: string) {
  const text = value?.trim() || "";
  return text ? `'${text}` : "";
}

async function readResponse(response: Response) {
  const text = await response.text();

  try {
    return {
      text,
      json: JSON.parse(text) as GoogleSheetsResponse
    };
  } catch {
    return {
      text,
      json: null
    };
  }
}

export async function syncLeadToGoogleSheets(payload: LeadPayload, sanityRecordId?: string) {
  const webhookUrl = getGoogleSheetsWebhookUrl();

  if (!webhookUrl) {
    return {
      configured: false,
      synced: false
    };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      cache: "no-store",
      signal: controller.signal,
      body: JSON.stringify({
        secret: getGoogleSheetsWebhookSecret(),
        submittedAt: formatSubmittedAt(payload.createdAt),
        name: payload.name,
        gender: payload.gender || "",
        ageGroup: payload.ageGroup || "",
        nationality: payload.nationality || "",
        facialConcerns: payload.facialConcerns || "",
        budget: payload.budget || "",
        whatsapp: formatSheetText(payload.whatsapp),
        email: payload.email,
        wechat: payload.wechat || "",
        phone: formatSheetText(payload.phone),
        country: payload.country || "",
        concern: payload.concern || "",
        interestedIn: payload.interestedIn || "",
        hearAbout: payload.hearAbout || "",
        message: payload.message || "",
        source: payload.source || "website",
        status: payload.status || "new",
        sanityRecordId: sanityRecordId || ""
      })
    });

    const data = await readResponse(response);
    if (!response.ok || data.json?.ok === false) {
      return {
        configured: true,
        synced: false,
        error: data.json?.error || data.text.slice(0, 180) || `Google Sheets returned ${response.status}.`
      };
    }

    return {
      configured: true,
      synced: true
    };
  } catch (error) {
    return {
      configured: true,
      synced: false,
      error: error instanceof Error ? error.message : "Google Sheets sync failed."
    };
  } finally {
    clearTimeout(timeout);
  }
}
