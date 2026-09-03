"use client";

import { useState } from "react";
import { portfolio } from "@/content/portfolio";
import {
  validateContact,
  type ContactFieldErrors,
} from "@/lib/contact";
import { InkLink } from "@/components/site/ink-link";

export function ContactForm() {
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
      setMessage("thanks — i'll get back to you.");
      form.reset();
    } catch (err) {
      setStatus("error");
      setMessage(
        err instanceof Error
          ? err.message
          : `could not send. email me at ${portfolio.person.email}`,
      );
    }
  }

  return (
    <form onSubmit={onSubmit} className="relative max-w-md space-y-7" noValidate>
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

      <Field
        id="name"
        name="name"
        label="name"
        autoComplete="name"
        error={fields.name}
        disabled={status === "loading"}
      />
      <Field
        id="email"
        name="email"
        type="email"
        label="email"
        autoComplete="email"
        error={fields.email}
        disabled={status === "loading"}
      />
      <div className="space-y-1.5">
        <label
          htmlFor="message"
          className="font-mono text-[0.72rem] tracking-[0.04em] text-muted-foreground"
        >
          message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          disabled={status === "loading"}
          className="field-ink min-h-32 resize-y"
          aria-invalid={fields.message ? true : undefined}
          aria-describedby={fields.message ? "message-error" : undefined}
        />
        {fields.message ? (
          <p id="message-error" className="text-xs text-destructive">
            {fields.message}
          </p>
        ) : null}
      </div>

      <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2 pt-1">
        <button
          type="submit"
          disabled={status === "loading"}
          className="ink-link bg-transparent font-normal"
        >
          {status === "loading" ? "sending…" : "send"}
        </button>
        <InkLink
          href={`mailto:${portfolio.person.email}`}
          className="text-[0.9rem] text-muted-foreground"
        >
          or email directly
        </InkLink>
      </div>

      {message ? (
        <p
          role={status === "error" ? "alert" : "status"}
          className={
            status === "ok"
              ? "text-[0.9rem] text-foreground"
              : "text-[0.9rem] text-destructive"
          }
        >
          {status === "error" ? `error: ${message}` : message}
        </p>
      ) : null}
    </form>
  );
}

function Field({
  id,
  name,
  label,
  type = "text",
  autoComplete,
  error,
  disabled,
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  autoComplete?: string;
  error?: string;
  disabled?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className="font-mono text-[0.72rem] tracking-[0.04em] text-muted-foreground"
      >
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required
        autoComplete={autoComplete}
        disabled={disabled}
        className="field-ink"
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error ? (
        <p id={`${id}-error`} className="text-xs text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}
