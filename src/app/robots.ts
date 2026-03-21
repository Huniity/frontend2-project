import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/dashboard",
          "/agent",
          "/trips",
          "/api",
          "/login",
          "/signin",
          "/auth",
        ],
      },
    ],
    sitemap: "https://be-nomadia.vercel.app/sitemap.xml",
  };
}