"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { portfolio } from "@/content/portfolio";
import {
  validateContact,
  type ContactFieldErrors,
} from "@/lib/contact";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/layout/reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function ContactSection() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");
  const [fields, setFields] = useState<ContactFieldErrors>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    setFields({});

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      message: String(data.get("message") ?? ""),
      website: String(data.get("website") ?? ""),
    };

    const client = validateContact(payload);
    if (!client.ok) {
      setStatus("error");
      setMessage(client.error);
      setFields(client.fields ?? {});
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
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
      className="pb-10 md:pb-14"
      align="center"
    >
      <Reveal>
        <div className="surface-matte mx-auto max-w-xl rounded-2xl p-6 sm:p-9">
          <form onSubmit={onSubmit} className="relative space-y-5" noValidate>
            <div
              className="pointer-events-none absolute -left-[9999px] h-0 w-0 overflow-hidden"
              aria-hidden
            >
              <label htmlFor="website">Website</label>
              <input
                id="website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div className="space-y-1.5">
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
                className="h-10"
                aria-invalid={fields.name ? true : undefined}
                aria-describedby={fields.name ? "name-error" : undefined}
              />
              {fields.name ? (
                <p id="name-error" className="text-xs text-destructive">
                  {fields.name}
                </p>
              ) : null}
            </div>

            <div className="space-y-1.5">
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
                className="h-10"
                aria-invalid={fields.email ? true : undefined}
                aria-describedby={fields.email ? "email-error" : undefined}
              />
              {fields.email ? (
                <p id="email-error" className="text-xs text-destructive">
                  {fields.email}
                </p>
              ) : null}
            </div>

            <div className="space-y-1.5">
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
                className="min-h-32 resize-y"
                aria-invalid={fields.message ? true : undefined}
                aria-describedby={fields.message ? "message-error" : undefined}
              />
              {fields.message ? (
                <p id="message-error" className="text-xs text-destructive">
                  {fields.message}
                </p>
              ) : null}
            </div>

            <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
              <Button type="submit" disabled={status === "loading"} size="lg">
                <Send data-icon="inline-start" />
                {status === "loading" ? "Sending…" : "Send message"}
              </Button>
              <a
                href={`mailto:${portfolio.person.email}`}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                or email directly
              </a>
            </div>

            {message ? (
              <p
                role={status === "error" ? "alert" : "status"}
                className={
                  status === "ok"
                    ? "rounded-md border border-primary/20 bg-primary/5 px-3 py-2 text-sm text-foreground"
                    : "rounded-md border border-destructive/25 bg-destructive/5 px-3 py-2 text-sm text-destructive"
                }
              >
                {status === "error" ? `Error: ${message}` : message}
              </p>
            ) : null}
          </form>
        </div>
      </Reveal>
    </Section>
  );
}
