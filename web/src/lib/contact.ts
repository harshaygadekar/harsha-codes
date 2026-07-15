export interface ContactInput {
  name?: string | null;
  email?: string | null;
  message?: string | null;
  website?: string | null;
}

export type ContactFieldErrors = {
  name?: string;
  email?: string;
  message?: string;
};

export type ContactValidation =
  | { ok: true; honeypot: true }
  | {
      ok: true;
      honeypot: false;
      name: string;
      email: string;
      message: string;
    }
  | { ok: false; error: string; fields?: ContactFieldErrors };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_MESSAGE = 5000;

/**
 * Pure contact payload validation (shared by client form + API route).
 * Honeypot filled → ok + honeypot true (caller should accept silently).
 */
export function validateContact(input: ContactInput): ContactValidation {
  if (input.website) {
    return { ok: true, honeypot: true };
  }

  const name = (input.name ?? "").trim();
  const email = (input.email ?? "").trim();
  const message = (input.message ?? "").trim();

  const fields: ContactFieldErrors = {};

  if (!name) fields.name = "Name is required.";
  if (!email) fields.email = "Email is required.";
  else if (!EMAIL_RE.test(email)) fields.email = "Enter a valid email address.";
  if (!message) fields.message = "Message is required.";
  else if (message.length > MAX_MESSAGE)
    fields.message = "Message is too long.";

  if (Object.keys(fields).length > 0) {
    const error =
      !name || !email || !message
        ? "Name, email, and message are required."
        : (fields.email ?? fields.message ?? "Please fix the form errors.");
    return { ok: false, error, fields };
  }

  return { ok: true, honeypot: false, name, email, message };
}
