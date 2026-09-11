import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async rewrites() {
    return [
      {
        source: "/api/ecom/:path*",
        destination: `${process.env.NEXT_PUBLIC_ECOM_API_URL}/:path*`,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        // Sitehaus R2 CDN — product images (staging)
        protocol: "https",
        hostname: "cdn.staging.commerce.sitehaus.dev",
      },
      {
        // Sitehaus R2 CDN — product images (production)
        protocol: "https",
        hostname: "cdn.commerce.sitehaus.dev",
      },
    ],
  },
};

export default nextConfig;
