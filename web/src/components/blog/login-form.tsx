"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function LoginForm({ configured }: { configured: boolean }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/blog/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) {
        throw new Error(json.error ?? "Login failed.");
      }
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed.");
    } finally {
      setLoading(false);
    }
  }

  if (!configured) {
    return (
      <div className="max-w-md rounded-xl border border-border/70 bg-card/40 p-5">
        <p className="text-[15px] font-medium tracking-tight">
          Admin not configured
        </p>
        <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
          Add these to{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-[12px]">
            web/.env.local
          </code>{" "}
          and restart the dev server:
        </p>
        <pre className="mt-3 overflow-x-auto rounded-lg bg-muted/70 p-3 text-[12px] leading-relaxed text-foreground/85">
{`BLOG_ADMIN_PASSWORD=your-strong-password
BLOG_SESSION_SECRET=at-least-16-chars-secret`}
        </pre>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="max-w-sm space-y-4">
      <div className="space-y-1.5">
        <label
          htmlFor="blog-password"
          className="text-[13px] text-muted-foreground"
        >
          password
        </label>
        <Input
          id="blog-password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border-border/70 bg-card/40"
          required
          minLength={8}
        />
      </div>
      {error ? (
        <p className="text-[13px] text-destructive" role="alert">
          {error}
        </p>
      ) : null}
      <Button type="submit" disabled={loading || password.length < 8}>
        {loading ? "Checking…" : "Enter"}
      </Button>
    </form>
  );
}
