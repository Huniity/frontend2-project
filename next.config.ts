import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    scrollRestoration: false,
  },
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ilnxkatlbohmcsfjboxx.supabase.co",
        pathname: "/storage/v1/object/**",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        pathname: "/**",
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    unoptimized: false,
  },
  async redirects() {
    return [
      { source: "/home", destination: "/", permanent: true },
      { source: "/register", destination: "/signin", permanent: true },
      { source: "/sign-up", destination: "/signin", permanent: true },
      { source: "/sign-in", destination: "/login", permanent: true },
      { source: "/plans", destination: "/pricing", permanent: true },
      { source: "/app", destination: "/dashboard", permanent: false },
      { source: "/policy", destination: "/privacy-policy", permanent: true },
    ];
  },
};

export default nextConfig;
