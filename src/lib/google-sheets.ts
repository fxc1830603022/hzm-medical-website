type LeadPayload = {
  name: string;
  email: string;
  phone?: string;
  country?: string;
  concern?: string;
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
        submittedAt: payload.createdAt,
        name: payload.name,
        email: payload.email,
        phone: payload.phone || "",
        country: payload.country || "",
        concern: payload.concern || "",
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
