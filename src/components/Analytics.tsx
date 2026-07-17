import Script from "next/script";

const defaultGoogleAdsId = "AW-18323943425";

export function Analytics() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();
  const googleAdsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID?.trim() || defaultGoogleAdsId;
  const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const googleTagIds = [measurementId, googleAdsId].filter(Boolean);
  const primaryGoogleTagId = googleTagIds[0];

  if (!primaryGoogleTagId && !metaPixelId) return null;

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
        </>
      ) : null}
      {metaPixelId ? (
        <Script id="meta-pixel-init" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${metaPixelId}');
            fbq('track', 'PageView');
          `}
        </Script>
      ) : null}
    </>
  );
}
