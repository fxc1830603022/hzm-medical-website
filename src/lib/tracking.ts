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

export type WhatsAppGreetingSource =
  | "instagram"
  | "facebook"
  | "facebook_ads"
  | "google"
  | "google_ads_landing"
  | "facebook_ads_landing";

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
const facebookAdsPublicProfileGreeting =
  "\u60a8\u597d\uff0c\u6211\u662f\u901a\u8fc7 Facebook \u5e7f\u544a\u4e86\u89e3\u5230\u60a8\uff0c\u5bf9\u8096\u533b\u751f\u7684\u201c9D \u9762\u90e8\u8bc4\u4f30\u201d\u975e\u5e38\u611f\u5174\u8da3\uff0c\u5e0c\u671b\u80fd\u4e86\u89e3\u66f4\u591a\u8be6\u60c5\u3002";
const googleAdsLandingGreeting =
  "Hello, I found Dr. Xiao 9D Facelift through Google Ads and would like to send my photos for a private online assessment.\n\nMy age:\nMy country:\nMy main concerns:\nPrevious treatments:";
const facebookAdsLandingGreeting =
  "Hello, I saw Dr. Xiao 9D Facelift on Facebook and would like to send my photos for a private online assessment.\n\nMy age:\nMy country:\nMy main concerns:\nPrevious treatments:";
const defaultGoogleAdsLeadConversion = "AW-18323943425/a4RWCPmBvNEcEIHgxKFE";
const googleAdsLeadConversion =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_CONVERSION_ID?.trim() || defaultGoogleAdsLeadConversion;

const defaultWhatsAppSourceGreetings: Record<WhatsAppGreetingSource, string> = {
  instagram:
    "Hello, I came across you on Instagram and am very interested in the 9D Lifting procedure; I would like to know more details.",
  facebook:
    "Hello, I came across you on Facebook and am very interested in the 9D Lifting procedure; I would like to know more details.",
  facebook_ads: facebookAdsPublicProfileGreeting,
  google:
    "Hello, I came across you on Google and am very interested in the 9D Lifting procedure; I would like to know more details.",
  google_ads_landing: googleAdsLandingGreeting,
  facebook_ads_landing: facebookAdsLandingGreeting
};

let configuredWhatsAppSourceGreetings: Record<WhatsAppGreetingSource, string> = {
  ...defaultWhatsAppSourceGreetings
};

export function configureWhatsAppSourceGreetings(messages?: WhatsAppSourceGreetings) {
  configuredWhatsAppSourceGreetings = {
    ...defaultWhatsAppSourceGreetings,
    instagram: messages?.instagram?.trim() || defaultWhatsAppSourceGreetings.instagram,
    facebook: messages?.facebook?.trim() || defaultWhatsAppSourceGreetings.facebook,
    facebook_ads: messages?.facebook_ads?.trim() || defaultWhatsAppSourceGreetings.facebook_ads,
    google: messages?.google?.trim() || defaultWhatsAppSourceGreetings.google,
    google_ads_landing: messages?.google_ads_landing?.trim() || defaultWhatsAppSourceGreetings.google_ads_landing,
    facebook_ads_landing:
      messages?.facebook_ads_landing?.trim() || defaultWhatsAppSourceGreetings.facebook_ads_landing
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
  const adLandingSource = getAdLandingSourceFromPath(url.pathname);

  if (!hasUtm && !hasClickId && existing && detectedSource === "direct" && !adLandingSource) return;

  const campaign = params.get("utm_campaign") || "";
  const content = params.get("utm_content") || "";
  let source = normalizeSource(adLandingSource || params.get("utm_source") || detectedSource);
  const medium =
    params.get("utm_medium") || (adLandingSource ? "paid_landing" : source === "direct" ? "none" : "referral");

  if (source === "facebook" && isFacebookAdsTraffic(medium, campaign, content)) {
    source = "facebook_ads";
  }

  const current: TrafficSource = {
    landingPage: `${window.location.pathname}${window.location.search}`,
    referrer: document.referrer || "",
    source,
    medium,
    campaign,
    content,
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

  const adLandingSource = getAdLandingSourceFromPath(window.location.pathname);
  const trafficSource = adLandingSource || payload.lastTouch?.source || payload.firstTouch?.source || "unknown";
  const trafficMedium = payload.lastTouch?.medium || payload.firstTouch?.medium || "";
  const campaign = payload.lastTouch?.campaign || payload.firstTouch?.campaign || "";
  const content = payload.lastTouch?.content || payload.firstTouch?.content || "";
  const eventParams = {
    event_category: "lead",
    event_label: payload.placement,
    method: "whatsapp",
    placement: payload.placement,
    page_path: payload.page,
    traffic_source: trafficSource,
    traffic_medium: trafficMedium,
    campaign,
    content
  };

  sendGaEvent("whatsapp_click", eventParams);
  sendGaEvent("generate_lead", {
    ...eventParams,
    lead_source: "whatsapp"
  });
  reportGoogleAdsLeadConversion();

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
  reportGoogleAdsLeadConversion();

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

  const url = new URL(window.location.href);
  const adLandingSource = getAdLandingSourceFromPath(url.pathname);
  if (adLandingSource) return adLandingSource;

  const params = url.searchParams;
  const source = normalizeSource(params.get("utm_source") || "");
  const medium = params.get("utm_medium") || "";
  const campaign = params.get("utm_campaign") || "";
  const content = params.get("utm_content") || "";

  if (source === "google_ads_landing") return "google_ads_landing";
  if (source === "facebook_ads_landing") return "facebook_ads_landing";
  if (source === "facebook_ads" || (source === "facebook" && isFacebookAdsTraffic(medium, campaign, content))) {
    return "facebook_ads";
  }
  if (source === "instagram") return "instagram";
  if (source === "facebook") return "facebook";
  if (source === "google" || params.has("gclid")) return "google";
  return "";
}

function getStoredSocialSource(): WhatsAppGreetingSource | "" {
  const stored = readStoredTraffic();
  const source = normalizeSource(stored?.lastTouch?.source || stored?.firstTouch?.source || "");
  const medium = stored?.lastTouch?.medium || stored?.firstTouch?.medium || "";
  const campaign = stored?.lastTouch?.campaign || stored?.firstTouch?.campaign || "";
  const content = stored?.lastTouch?.content || stored?.firstTouch?.content || "";

  if (source === "google_ads_landing") return "google_ads_landing";
  if (source === "facebook_ads_landing") return "facebook_ads_landing";
  if (source === "facebook_ads" || (source === "facebook" && isFacebookAdsTraffic(medium, campaign, content))) {
    return "facebook_ads";
  }
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

function reportGoogleAdsLeadConversion() {
  if (typeof window === "undefined") return;

  if (typeof window.gtag_report_conversion === "function") {
    window.gtag_report_conversion();
    return;
  }

  sendGaEvent("conversion", {
    send_to: googleAdsLeadConversion,
    value: 1.0,
    currency: "CNY"
  });
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
  if (value === "google_ad" || value === "google_ads") return "google";
  if (value === "google_ads_landing" || value === "google-ad-landing") return "google_ads_landing";
  if (
    value === "fb_ads_landing" ||
    value === "facebook_ads_landing" ||
    value === "facebook-ad-landing" ||
    value === "meta_ads_landing"
  ) {
    return "facebook_ads_landing";
  }
  if (value === "fb_ads" || value === "facebook_ad" || value === "facebook_ads" || value === "meta_ads") {
    return "facebook_ads";
  }
  return value || "direct";
}

function getAdLandingSourceFromPath(
  pathname: string
): Extract<WhatsAppGreetingSource, "google_ads_landing" | "facebook_ads_landing"> | "" {
  const normalizedPath = pathname.replace(/\/$/, "");
  if (normalizedPath === "/ads/facebook") return "facebook_ads_landing";
  if (normalizedPath === "/ads/google-9d-facelift") return "google_ads_landing";
  if (normalizedPath === "/ads/facebook-9d-facelift") return "facebook_ads_landing";
  return "";
}

function isFacebookAdsTraffic(medium: string, campaign: string, content: string) {
  const values = [medium, campaign, content].map((value) => value.trim().toLowerCase());
  return values.some((value) => value.includes("paid") || value.includes("ad"));
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    gtag_report_conversion?: (url?: string) => false;
    fbq?: (...args: unknown[]) => void;
  }
}
