export type TrafficSource = {
  landingPage: string;
  referrer: string;
  source: string;
  medium: string;
  campaign: string;
  content: string;
  term: string;
  fbclid: string;
  gclid: string;
  capturedAt: string;
};

export type StoredTraffic = {
  firstTouch: TrafficSource;
  lastTouch: TrafficSource;
};

export type WhatsAppGreetingSource = "instagram" | "facebook" | "google";

export type WhatsAppSourceGreetings = Partial<Record<WhatsAppGreetingSource, string>>;

export type WhatsAppClickPayload = {
  event: "whatsapp_click";
  placement: string;
  label: string;
  page: string;
  whatsappUrl: string;
  firstTouch?: TrafficSource;
  lastTouch?: TrafficSource;
  clickedAt: string;
};

export type LeadFormSubmitPayload = {
  formName: string;
  source?: string;
};

export type LinksPageActionPayload = {
  placement: string;
  label: string;
  destination: string;
};

export const trafficStorageKey = "dr_xiao_traffic_source_v1";

const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;
const defaultWhatsAppSourceGreetings: Record<WhatsAppGreetingSource, string> = {
  instagram:
    "Hello, I came across you on Instagram and am very interested in the 9D Lifting procedure; I would like to know more details.",
  facebook:
    "Hello, I came across you on Facebook and am very interested in the 9D Lifting procedure; I would like to know more details.",
  google:
    "Hello, I came across you on Google and am very interested in the 9D Lifting procedure; I would like to know more details."
};

let configuredWhatsAppSourceGreetings: Record<WhatsAppGreetingSource, string> = {
  ...defaultWhatsAppSourceGreetings
};

export function configureWhatsAppSourceGreetings(messages?: WhatsAppSourceGreetings) {
  configuredWhatsAppSourceGreetings = {
    ...defaultWhatsAppSourceGreetings,
    instagram: messages?.instagram?.trim() || defaultWhatsAppSourceGreetings.instagram,
    facebook: messages?.facebook?.trim() || defaultWhatsAppSourceGreetings.facebook,
    google: messages?.google?.trim() || defaultWhatsAppSourceGreetings.google
  };
}

export function captureTrafficSource() {
  if (typeof window === "undefined") return;

  const url = new URL(window.location.href);
  const params = url.searchParams;
  const hasUtm = utmKeys.some((key) => params.has(key));
  const hasClickId = params.has("fbclid") || params.has("gclid");
  const existing = readStoredTraffic();
  const detectedSource = detectSource(document.referrer);

  if (!hasUtm && !hasClickId && existing && detectedSource === "direct") return;

  const source = normalizeSource(params.get("utm_source") || detectedSource);
  const medium = params.get("utm_medium") || (source === "direct" ? "none" : "referral");
  const current: TrafficSource = {
    landingPage: `${window.location.pathname}${window.location.search}`,
    referrer: document.referrer || "",
    source,
    medium,
    campaign: params.get("utm_campaign") || "",
    content: params.get("utm_content") || "",
    term: params.get("utm_term") || "",
    fbclid: params.get("fbclid") || "",
    gclid: params.get("gclid") || "",
    capturedAt: new Date().toISOString()
  };

  writeStoredTraffic({
    firstTouch: existing?.firstTouch || current,
    lastTouch: current
  });
}

export function readStoredTraffic(): StoredTraffic | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(trafficStorageKey);
    return raw ? (JSON.parse(raw) as StoredTraffic) : null;
  } catch {
    return null;
  }
}

export function buildWhatsAppClickPayload({
  placement,
  label,
  whatsappUrl
}: {
  placement: string;
  label: string;
  whatsappUrl: string;
}): WhatsAppClickPayload {
  const stored = readStoredTraffic();

  return {
    event: "whatsapp_click",
    placement,
    label,
    page:
      typeof window === "undefined"
        ? ""
        : `${window.location.pathname}${window.location.search}${window.location.hash}`,
    whatsappUrl,
    firstTouch: stored?.firstTouch,
    lastTouch: stored?.lastTouch,
    clickedAt: new Date().toISOString()
  };
}

export function getSourceAwareWhatsAppUrl(whatsappUrl: string) {
  if (typeof window === "undefined") return whatsappUrl;

  const source = getCurrentOrStoredSocialSource();
  const message = source ? configuredWhatsAppSourceGreetings[source] : "";
  if (!message) return whatsappUrl;

  try {
    const url = new URL(whatsappUrl);
    url.searchParams.set("text", message);
    return url.toString();
  } catch {
    const separator = whatsappUrl.includes("?") ? "&" : "?";
    return `${whatsappUrl}${separator}text=${encodeURIComponent(message)}`;
  }
}

export function trackWhatsAppClick(payload: WhatsAppClickPayload) {
  if (typeof window === "undefined") return;

  const eventParams = {
    event_category: "lead",
    event_label: payload.placement,
    method: "whatsapp",
    placement: payload.placement,
    page_path: payload.page,
    traffic_source: payload.lastTouch?.source || payload.firstTouch?.source || "unknown",
    traffic_medium: payload.lastTouch?.medium || payload.firstTouch?.medium || "",
    campaign: payload.lastTouch?.campaign || payload.firstTouch?.campaign || "",
    content: payload.lastTouch?.content || payload.firstTouch?.content || ""
  };

  sendGaEvent("whatsapp_click", eventParams);
  sendGaEvent("generate_lead", {
    ...eventParams,
    lead_source: "whatsapp"
  });

  window.fbq?.("track", "Lead", {
    content_name: "WhatsApp click",
    content_category: payload.placement,
    source: eventParams.traffic_source,
    medium: eventParams.traffic_medium,
    campaign: eventParams.campaign
  });
  window.fbq?.("trackCustom", "WhatsAppClick", {
    placement: payload.placement,
    page: payload.page,
    source: eventParams.traffic_source,
    medium: eventParams.traffic_medium,
    campaign: eventParams.campaign,
    content: eventParams.content
  });

  const body = JSON.stringify(payload);
  const blob = new Blob([body], { type: "application/json" });

  if (!navigator.sendBeacon?.("/api/track/whatsapp-click", blob)) {
    fetch("/api/track/whatsapp-click", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true
    }).catch(() => undefined);
  }
}

export function trackLeadFormSubmit(payload: LeadFormSubmitPayload) {
  if (typeof window === "undefined") return;

  const stored = readStoredTraffic();
  const page =
    typeof window === "undefined" ? "" : `${window.location.pathname}${window.location.search}${window.location.hash}`;
  const eventParams = {
    event_category: "lead",
    event_label: payload.formName,
    method: "form",
    form_name: payload.formName,
    form_source: payload.source || payload.formName,
    page_path: page,
    traffic_source: stored?.lastTouch?.source || stored?.firstTouch?.source || "unknown",
    traffic_medium: stored?.lastTouch?.medium || stored?.firstTouch?.medium || "",
    campaign: stored?.lastTouch?.campaign || stored?.firstTouch?.campaign || "",
    content: stored?.lastTouch?.content || stored?.firstTouch?.content || ""
  };

  sendGaEvent("form_submit_lead", eventParams);
  sendGaEvent("generate_lead", {
    ...eventParams,
    lead_source: "form"
  });

  window.fbq?.("track", "Lead", {
    content_name: "Form submit",
    content_category: payload.formName,
    source: eventParams.traffic_source,
    medium: eventParams.traffic_medium,
    campaign: eventParams.campaign
  });
  window.fbq?.("trackCustom", "FormSubmitLead", eventParams);
}

export function trackLinksPageAction(payload: LinksPageActionPayload) {
  if (typeof window === "undefined") return;

  const stored = readStoredTraffic();
  const page = `${window.location.pathname}${window.location.search}${window.location.hash}`;
  const eventParams = {
    event_category: "navigation",
    event_label: payload.placement,
    placement: payload.placement,
    link_text: payload.label,
    destination: payload.destination,
    page_path: page,
    traffic_source: stored?.lastTouch?.source || stored?.firstTouch?.source || "unknown",
    traffic_medium: stored?.lastTouch?.medium || stored?.firstTouch?.medium || "",
    campaign: stored?.lastTouch?.campaign || stored?.firstTouch?.campaign || "",
    content: stored?.lastTouch?.content || stored?.firstTouch?.content || ""
  };

  sendGaEvent("links_page_click", eventParams);
  window.fbq?.("trackCustom", "LinksPageClick", eventParams);
}

function getCurrentOrStoredSocialSource(): WhatsAppGreetingSource | "" {
  const currentSource = getCurrentUrlSocialSource();
  if (currentSource) return currentSource;

  return getStoredSocialSource();
}

function getCurrentUrlSocialSource(): WhatsAppGreetingSource | "" {
  if (typeof window === "undefined") return "";

  const params = new URL(window.location.href).searchParams;
  const source = normalizeSource(params.get("utm_source") || "");

  if (source === "instagram") return "instagram";
  if (source === "facebook") return "facebook";
  if (source === "google" || params.has("gclid")) return "google";
  return "";
}

function getStoredSocialSource(): WhatsAppGreetingSource | "" {
  const stored = readStoredTraffic();
  const source = normalizeSource(stored?.lastTouch?.source || stored?.firstTouch?.source || "");

  if (source === "instagram") return "instagram";
  if (source === "facebook") return "facebook";
  if (source === "google") return "google";
  return "";
}

function sendGaEvent(eventName: string, params: Record<string, unknown>) {
  if (typeof window === "undefined") return;

  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(["event", eventName, params]);
}

function writeStoredTraffic(value: StoredTraffic) {
  try {
    window.localStorage.setItem(trafficStorageKey, JSON.stringify(value));
  } catch {
    // Ignore storage failures; GA4 and Meta events still fire on click.
  }
}

function detectSource(referrer: string) {
  if (!referrer) return "direct";

  try {
    const hostname = new URL(referrer).hostname.toLowerCase();
    if (typeof window !== "undefined" && hostname === window.location.hostname.toLowerCase()) return "direct";
    if (hostname.includes("instagram")) return "instagram";
    if (hostname.includes("facebook") || hostname.includes("fb.")) return "facebook";
    if (hostname.includes("google")) return "google";
    if (hostname.includes("youtube")) return "youtube";
    return hostname.replace(/^www\./, "");
  } catch {
    return "referral";
  }
}

function normalizeSource(source: string) {
  const value = source.trim().toLowerCase();
  if (value === "ig") return "instagram";
  if (value === "fb") return "facebook";
  return value || "direct";
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}
