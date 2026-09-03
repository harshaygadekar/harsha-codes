"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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
      <div className="max-w-md space-y-3 text-[14px] sm:text-[14.5px] leading-relaxed text-foreground/90">
        <p>admin is not set up yet. add these to web/.env.local and restart:</p>
        <pre className="overflow-x-auto text-[13px] text-muted-foreground">
{`BLOG_ADMIN_PASSWORD=your-strong-password
BLOG_SESSION_SECRET=at-least-16-chars-secret`}
        </pre>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="max-w-sm space-y-5">
      <div>
        <label
          htmlFor="blog-password"
          className="block text-[13px] text-muted-foreground mb-1"
        >
          password
        </label>
        <input
          id="blog-password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="field-ink"
          required
          minLength={8}
        />
      </div>
      {error ? (
        <p className="text-[13px] text-destructive" role="alert">
          {error}
        </p>
      ) : null}
      <button
        type="submit"
        className="blue-link"
        disabled={loading || password.length < 8}
      >
        {loading ? "checking…" : "enter"}
      </button>
    </form>
  );
}
