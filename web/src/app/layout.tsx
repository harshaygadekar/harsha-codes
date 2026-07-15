import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { CommandPalette } from "@/components/layout/command-palette";
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

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://harsha.codes";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: portfolio.seo.title,
    template: `%s · ${portfolio.brand}`,
  },
  description: portfolio.seo.description,
  keywords: portfolio.seo.keywords,
  authors: [{ name: portfolio.person.fullName }],
  creator: portfolio.person.fullName,
  alternates: {
    canonical: "/",
  },
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
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#07070b" },
    { media: "(prefers-color-scheme: light)", color: "#f7f7f8" },
  ],
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
    sameAs: [portfolio.links.github, portfolio.links.linkedin],
  };

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
          >
            Skip to content
          </a>
          <SiteHeader />
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter />
          <CommandPalette />
        </ThemeProvider>
      </body>
    </html>
  );
}
