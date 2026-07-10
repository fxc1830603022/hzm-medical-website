type Ga4Event = {
  name: string;
  params?: Record<string, string | number | boolean | undefined>;
};

type SendGa4ServerEventsResult = {
  configured: boolean;
  sent: boolean;
  status?: number;
  error?: string;
};

const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || "";
const apiSecret = process.env.GA4_API_SECRET?.trim() || "";

export async function sendGa4ServerEvents(request: Request, events: Ga4Event[]): Promise<SendGa4ServerEventsResult> {
  if (!measurementId || !apiSecret || events.length === 0) {
    return { configured: Boolean(measurementId && apiSecret), sent: false };
  }

  const clientId = getGaClientId(request) || makeFallbackClientId(request);
  const url = `https://www.google-analytics.com/mp/collect?measurement_id=${encodeURIComponent(
    measurementId
  )}&api_secret=${encodeURIComponent(apiSecret)}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: clientId,
        events: events.map((event) => ({
          name: event.name,
          params: {
            engagement_time_msec: 1,
            ...event.params
          }
        }))
      })
    });

    return {
      configured: true,
      sent: response.ok,
      status: response.status,
      error: response.ok ? undefined : `GA4 Measurement Protocol returned ${response.status}`
    };
  } catch (error) {
    return {
      configured: true,
      sent: false,
      error: error instanceof Error ? error.message : "GA4 Measurement Protocol request failed"
    };
  }
}

function getGaClientId(request: Request) {
  const cookie = request.headers.get("cookie") || "";
  const match = cookie.match(/(?:^|;\s*)_ga=GA\d+\.\d+\.(\d+\.\d+)/);
  return match?.[1] || "";
}

function makeFallbackClientId(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for") || "";
  const userAgent = request.headers.get("user-agent") || "";
  const seed = `${forwardedFor}|${userAgent}|${Date.now()}|${Math.random()}`;
  let hash = 0;

  for (let index = 0; index < seed.length; index += 1) {
    hash = (hash * 31 + seed.charCodeAt(index)) >>> 0;
  }

  return `${Date.now()}.${hash}`;
}
