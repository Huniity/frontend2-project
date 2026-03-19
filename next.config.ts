import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    scrollRestoration: false,
  },
  images: {
    domains: ["picsum.photos"],
  },
};

export default nextConfig;
