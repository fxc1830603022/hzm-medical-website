/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    const immutableVideoHeaders = [
      {
        key: "Cache-Control",
        value: "public, max-age=31536000, immutable"
      }
    ];

    return [
      {
        source: "/videos/dr-xiao-9d-methodology-mobile-v2.mp4",
        headers: immutableVideoHeaders
      },
      {
        source: "/videos/facebook-arrival-support-mobile-v2.mp4",
        headers: immutableVideoHeaders
      }
    ];
  },
  async redirects() {
    return [
      {
        source: "/ig",
        destination: "/links?utm_source=instagram&utm_medium=social&utm_campaign=ig_profile&utm_content=bio",
        permanent: false
      },
      {
        source: "/fb",
        destination: "/links?utm_source=facebook&utm_medium=social&utm_campaign=fb_page&utm_content=profile",
        permanent: false
      },
      {
        source: "/ads",
        destination:
          "/links?utm_source=facebook&utm_medium=paid_social&utm_campaign=fb_ads_public_profile&utm_content=ads_shortlink",
        permanent: false
      },
      {
        source: "/google",
        destination:
          "/procedures/9d-facelift?utm_source=google&utm_medium=cpc&utm_campaign=google_ads&utm_content=9d_facelift",
        permanent: false
      }
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io"
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com"
      },
      {
        protocol: "https",
        hostname: "*.r2.dev"
      },
      {
        protocol: "https",
        hostname: "*.cloudflarestorage.com"
      }
    ]
  }
};

export default nextConfig;
