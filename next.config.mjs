/** @type {import('next').NextConfig} */
const nextConfig = {
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
