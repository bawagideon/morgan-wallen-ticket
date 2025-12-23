import type { Metadata } from "next";
import { Saira_Condensed } from "next/font/google";
import "./globals.css";
import UrgencyBar from "@/components/UrgencyBar";

const saira = Saira_Condensed({
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  subsets: ["latin"],
  variable: "--font-saira",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"),
  title: "Still The Problem Tour 2026 | Official Tickets",
  description: "Secure your seats for the 2026 Tour. Live in Lagos, Minneapolis, and Las Vegas. Limited VIP and Pit tickets available.",
  keywords: ["Morgan Wallen tickets Lagos", "Concert tickets 2026", "Official Tour"],
  icons: {
    icon: "/favicon/favicon.ico",
    apple: "/favicon/apple-touch-icon.png",
    shortcut: "/favicon/android-chrome-192x192.png",
  },
  openGraph: {
    title: "Still The Problem Tour 2026 | Official Tickets",
    description: "Secure your seats for the 2026 Tour. Live in Lagos, Minneapolis, and Las Vegas.",
    images: [{ url: "/logo.png", width: 800, height: 600, alt: "Morgan Wallen Tour" }],
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MusicEvent",
  "name": "Still The Problem Tour 2026",
  "startDate": "2026-04-10T19:00",
  "location": {
    "@type": "Place",
    "name": "US Bank Stadium",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Minneapolis",
      "addressRegion": "MN",
      "addressCountry": "US"
    }
  },
  "image": [
    "https://example.com/tour-poster.jpg" // Fallback or use real URL if available, but technically required or recommended. 
    // I will use logo or generic since I don't have a hosted URL handy yet, but usually absolute URLs are best.
    // I'll leave a placeholder or reuse one of the unsplash images if I had the absolute URL. 
    // Given the prompt didn't specify the image URL, I'll omit or use a safe placeholder.
  ],
  "description": "Morgan Wallen Live in Concert - One Night At A Time 2026",
  "performer": {
    "@type": "Person",
    "name": "Morgan Wallen"
  },
  "offers": {
    "@type": "Offer",
    "url": "https://morganwallentickets.com", // Hypothetical
    "price": "125",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${saira.variable} antialiased font-sans`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <UrgencyBar />
      </body>
    </html>
  );
}
