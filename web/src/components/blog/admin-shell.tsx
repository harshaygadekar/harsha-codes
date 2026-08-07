"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { blogStudio } from "@/lib/blog/paths";
import { cn } from "@/lib/utils";

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
    <div className="content-column py-14 md:py-20">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[13px] text-muted-foreground">writing · studio</p>
          <h1 className="mt-1 text-2xl font-medium tracking-tight sm:text-3xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-2 max-w-md text-[14px] leading-relaxed text-muted-foreground">
              {description}
            </p>
          ) : null}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/writing"
            className={cn(
              "text-[13px] text-muted-foreground transition-colors hover:text-foreground",
            )}
          >
            ← public writing
          </Link>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            disabled={busy}
            onClick={logout}
          >
            log out
          </Button>
        </div>
      </div>
      {children}
    </div>
  );
}
