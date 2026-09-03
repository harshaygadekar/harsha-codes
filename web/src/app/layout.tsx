import type { Metadata, Viewport } from "next";
import { Fraunces, Geist, Geist_Mono } from "next/font/google";
import { SiteChrome } from "@/components/layout/site-chrome";
import { SiteFooter } from "@/components/layout/site-footer";
import { CommandPalette } from "@/components/layout/command-palette";
import { Analytics } from "@vercel/analytics/react";
import { portfolio } from "@/content/portfolio";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["SOFT", "opsz"],
  display: "swap",
  preload: false,
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://harsha.codes";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: portfolio.seo.title,
    template: `%s · ${portfolio.person.firstName.toLowerCase()}`,
  },
  description: portfolio.seo.description,
  keywords: portfolio.seo.keywords,
  authors: [{ name: portfolio.person.fullName }],
  creator: portfolio.person.fullName,
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: portfolio.brand,
    title: portfolio.seo.title,
    description: portfolio.seo.description,
  },
  twitter: {
    card: "summary_large_image",
    title: portfolio.seo.title,
    description: portfolio.seo.description,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon.ico?v=6", sizes: "any" },
      { url: "/icon.png?v=6", type: "image/png", sizes: "64x64" },
    ],
    apple: [{ url: "/apple-icon.png?v=6", sizes: "180x180" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: portfolio.person.fullName,
    jobTitle: portfolio.person.role,
    email: portfolio.person.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bengaluru",
      addressCountry: "IN",
    },
    url: siteUrl,
    sameAs: [
      portfolio.links.github,
      portfolio.links.linkedin,
      ...(portfolio.links.x ? [portfolio.links.x] : []),
    ],
  };

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${display.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <SiteChrome />
        <main id="main" className="relative z-0 flex-1">
          {children}
        </main>
        <SiteFooter />
        <CommandPalette />
        <Analytics />
      </body>
    </html>
  );
}
