"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { portfolio } from "@/content/portfolio";
import { blogStudio } from "@/lib/blog/paths";

export function AdminShell({
  children,
  title,
  description,
}: {
  children: React.ReactNode;
  title: string;
  description?: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function logout() {
    setBusy(true);
    await fetch("/api/blog/auth/logout", { method: "POST" });
    router.push(blogStudio.root);
    router.refresh();
    setBusy(false);
  }

  return (
    <div className="site-frame pt-12 pb-16 sm:pt-20 sm:pb-24">
      <header className="flex items-baseline justify-between mb-2">
        <Link
          href="/"
          className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground font-sans lowercase hover:opacity-80"
        >
          {portfolio.person.fullName.toLowerCase()}
        </Link>
        <div className="flex items-baseline gap-x-3 text-sm sm:text-base">
          <Link href="/writing" className="blue-link font-sans">
            writings
          </Link>
          <button
            type="button"
            className="blue-link font-sans"
            disabled={busy}
            onClick={logout}
          >
            {busy ? "…" : "log out"}
          </button>
        </div>
      </header>

      <div className="flex flex-wrap items-center gap-x-2 text-[13.5px] sm:text-sm text-muted-foreground mb-8">
        <span className="font-semibold text-foreground lowercase">{title}</span>
        {description ? (
          <>
            <span className="text-muted-foreground/60 select-none">|</span>
            <span>{description}</span>
          </>
        ) : null}
      </div>

      {children}
    </div>
  );
}
