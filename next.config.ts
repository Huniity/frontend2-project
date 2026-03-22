import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    scrollRestoration: false,
  },
  images: {
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
