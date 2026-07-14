"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { portfolio } from "@/content/portfolio";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function ContactSection() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
          website: data.get("website"), // honeypot
        }),
      });

      const json = (await res.json()) as { ok?: boolean; error?: string };

      if (!res.ok || !json.ok) {
        throw new Error(json.error ?? "Something went wrong");
      }

      setStatus("ok");
      setMessage("Thanks — I'll get back to you soon.");
      form.reset();
    } catch (err) {
      setStatus("error");
      setMessage(
        err instanceof Error
          ? err.message
          : `Could not send. Email me at ${portfolio.person.email}`,
      );
    }
  }

  return (
    <Section
      id="contact"
      title="Contact"
      description="Open to software engineering roles in Bengaluru or remote India."
    >
      <div className="surface-matte mx-auto max-w-xl rounded-xl p-5 sm:p-8">
        <form onSubmit={onSubmit} className="space-y-4" noValidate>
          {/* Honeypot — hidden from users, bots often fill it */}
          <div className="absolute -left-[9999px] top-auto h-0 w-0 overflow-hidden" aria-hidden>
            <label htmlFor="website">Website</label>
            <input
              id="website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Name
            </label>
            <Input
              id="name"
              name="name"
              required
              autoComplete="name"
              placeholder="Your name"
              disabled={status === "loading"}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@company.com"
              disabled={status === "loading"}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium">
              Message
            </label>
            <Textarea
              id="message"
              name="message"
              required
              rows={5}
              placeholder="What are you building?"
              disabled={status === "loading"}
              className="min-h-28 resize-y"
            />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Button type="submit" disabled={status === "loading"} size="lg">
              <Send data-icon="inline-start" />
              {status === "loading" ? "Sending…" : "Send message"}
            </Button>
            <a
              href={`mailto:${portfolio.person.email}`}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              or email directly
            </a>
          </div>

          {message ? (
            <p
              role="status"
              className={
                status === "ok"
                  ? "text-sm text-primary"
                  : "text-sm text-destructive"
              }
            >
              {message}
            </p>
          ) : null}
        </form>
      </div>
    </Section>
  );
}
