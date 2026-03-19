import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    scrollRestoration: false,
  },
  images: {
    domains: ["picsum.photos", "ilnxkatlbohmcsfjboxx.supabase.co"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ilnxkatlbohmcsfjboxx.supabase.co",
        pathname: "/storage/v1/object/**",
      },
    ],
  },
};

export default nextConfig;
