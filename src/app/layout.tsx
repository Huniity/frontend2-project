import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/ui/navbar/Navbar";
import { SubPlanProvider } from "@/components/context/SubPlanContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthProvider from "@/components/auth/AuthProvider";
import ReloadToTop from "@/components/utils/ReloadToTop";
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata: Metadata = {
  title: {
    default: "NomadIA — AI Travel Planner",
    template: "%s | NomadIA",
  },
  description: "Plan your perfect trip with AI. NomadIA generates personalized day-by-day itineraries, budget breakdowns, and travel tips in seconds.",
  keywords: ["travel planner", "AI travel", "trip planner", "itinerary generator", "travel assistant", "nomad"],
  authors: [{ name: "Adrien Dejonc" }],
  creator: "Yao Development",
  metadataBase: new URL("https://be-nomadia.vercel.app"),
  alternates: {
    canonical: "https://be-nomadia.vercel.app",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://be-nomadia.vercel.app",
    siteName: "NomadIA",
    title: "NomadIA — AI Travel Planner",
    description: "Plan your perfect trip with AI. Personalized itineraries, budget breakdowns, and travel tips in seconds.",
    images: [
      {
        url: "/open_graph_card.png",
        width: 1200,
        height: 630,
        alt: "NomadIA — AI Travel Planner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NomadIA — AI Travel Planner",
    description: "Plan your perfect trip with AI.",
    images: ["/twitter_card.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head suppressHydrationWarning />
      <body>
        <div id="__app">
          <Navbar />
          <SubPlanProvider>
            <AuthProvider>
              <ReloadToTop />
              {children}
            </AuthProvider>
          </SubPlanProvider>
          <ToastContainer position="top-center" theme="dark" />
        </div>
        <GoogleAnalytics gaId="G-5L7ZVXZ2D6" />
      </body>
    </html>
  );
}