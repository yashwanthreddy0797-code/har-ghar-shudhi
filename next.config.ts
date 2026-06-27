import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: path.join(__dirname),
  serverExternalPackages: [
    "@shopify/storefront-api-client",
    "@shopify/graphql-client",
  ],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
        pathname: "/s/files/**",
      },
    ],
  },
  async headers() {
    // Hero media is content-addressed by filename and never mutated in place,
    // so cache it aggressively. Repeat visits then skip the network entirely.
    return [
      {
        source: "/:path*.(mp4|webm|webp|jpg|jpeg|png|avif)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
