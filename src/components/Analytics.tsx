import Script from "next/script";

const defaultGoogleAdsId = "AW-18323943425";
const defaultGoogleAdsLeadConversion = "AW-18323943425/a4RWCPmBvNEcEIHgxKFE";

function parseMetaPixelIds(value?: string) {
  return (value || "")
    .split(",")
    .map((pixelId) => pixelId.trim())
    .filter((pixelId) => /^\d+$/.test(pixelId));
}

function getMetaPixelIds() {
  return Array.from(
    new Set([
      ...parseMetaPixelIds(process.env.NEXT_PUBLIC_META_PIXEL_ID),
      ...parseMetaPixelIds(process.env.NEXT_PUBLIC_META_PIXEL_IDS)
    ])
  );
}

export function Analytics() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();
  const googleAdsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID?.trim() || defaultGoogleAdsId;
  const googleAdsLeadConversion =
    process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_CONVERSION_ID?.trim() || defaultGoogleAdsLeadConversion;
  const metaPixelIds = getMetaPixelIds();
  const googleTagIds = [measurementId, googleAdsId].filter(Boolean);
  const primaryGoogleTagId = googleTagIds[0];

  if (!primaryGoogleTagId && metaPixelIds.length === 0) return null;

  return (
    <>
      {primaryGoogleTagId ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${primaryGoogleTagId}`} strategy="beforeInteractive" />
          <Script id="google-tag-init" strategy="beforeInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());
              ${googleTagIds.map((tagId) => `gtag('config', ${JSON.stringify(tagId)});`).join("\n              ")}
            `}
          </Script>
          <Script id="google-ads-lead-conversion" strategy="beforeInteractive">
            {`
              window.gtag_report_conversion = function(url) {
                var callback = function () {
                  if (typeof(url) != 'undefined') {
                    window.location = url;
                  }
                };
                gtag('event', 'conversion', {
                  'send_to': ${JSON.stringify(googleAdsLeadConversion)},
                  'value': 1.0,
                  'currency': 'CNY',
                  'event_callback': callback
                });
                return false;
              };
            `}
          </Script>
        </>
      ) : null}
      {metaPixelIds.length > 0 ? (
        <script
          id="meta-pixel-init"
          dangerouslySetInnerHTML={{
            __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            ${metaPixelIds.map((pixelId) => `fbq('init', ${JSON.stringify(pixelId)});`).join("\n            ")}
            fbq('track', 'PageView');
          `
          }}
        />
      ) : null}
    </>
  );
}

export function MetaPixelNoScript() {
  const metaPixelIds = getMetaPixelIds();

  if (metaPixelIds.length === 0) return null;

  return (
    <>
      {metaPixelIds.map((pixelId) => (
        <noscript key={pixelId}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
          />
        </noscript>
      ))}
    </>
  );
}
