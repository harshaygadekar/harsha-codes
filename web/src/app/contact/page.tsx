import type { Metadata } from "next";
import { portfolio } from "@/content/portfolio";
import { PageIntro } from "@/components/site/page-intro";
import { ContactForm } from "@/components/site/contact-form";
import { InkLink } from "@/components/site/ink-link";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://harsha.codes";

export const metadata: Metadata = {
  title: "Hello",
  description: `Write to ${portfolio.person.fullName}.`,
  alternates: { canonical: `${siteUrl}/contact` },
  robots: { index: false, follow: true },
};

export default function ContactPage() {
  return (
    <div className="site-frame page-enter pt-28 pb-8 sm:pt-32 sm:pb-12">
      <PageIntro
        title="hello"
        lede="say hi. tell me what you're building."
      />
      <ContactForm />
      <p className="mt-12 text-[0.9rem] text-muted-foreground">
        or just{" "}
        <InkLink href={`mailto:${portfolio.person.email}`}>
          {portfolio.person.email}
        </InkLink>
      </p>
    </div>
  );
}
