import type { Metadata } from "next";
import { Saira_Condensed } from "next/font/google";
import "./globals.css";

const saira = Saira_Condensed({
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  subsets: ["latin"],
  variable: "--font-saira",
});

export const metadata: Metadata = {
  title: "Morgan Wallen Tickets",
  description: "Official ticket sales for Morgan Wallen 2026 tour.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${saira.variable} antialiased font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
