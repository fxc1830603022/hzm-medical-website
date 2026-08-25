import Script from "next/script";

const facebookAdsPixelId = "1559352332606230";

export function FacebookAdsPixel() {
  return (
    <>
      <Script id="facebook-ads-meta-pixel" strategy="afterInteractive">
        {`
          if (!window.__drXiaoFacebookAdsPixelLoaded) {
            window.__drXiaoFacebookAdsPixelLoaded = true;
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', ${JSON.stringify(facebookAdsPixelId)});
            fbq('trackSingle', ${JSON.stringify(facebookAdsPixelId)}, 'PageView');
          }
        `}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${facebookAdsPixelId}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  );
}

declare global {
  interface Window {
    __drXiaoFacebookAdsPixelLoaded?: boolean;
  }
}
