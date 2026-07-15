export interface ContactInput {
  name?: string | null;
  email?: string | null;
  message?: string | null;
  website?: string | null;
}

export type ContactValidation =
  | { ok: true; honeypot: true }
  | {
      ok: true;
      honeypot: false;
      name: string;
      email: string;
      message: string;
    }
  | { ok: false; error: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_MESSAGE = 5000;

/**
 * Pure contact payload validation (shared by API route).
 * Honeypot filled → ok + honeypot true (caller should accept silently).
 */
export function validateContact(input: ContactInput): ContactValidation {
  if (input.website) {
    return { ok: true, honeypot: true };
  }

  const name = (input.name ?? "").trim();
  const email = (input.email ?? "").trim();
  const message = (input.message ?? "").trim();

  if (!name || !email || !message) {
    return {
      ok: false,
      error: "Name, email, and message are required.",
    };
  }

  if (!EMAIL_RE.test(email)) {
    return { ok: false, error: "Enter a valid email address." };
  }

  if (message.length > MAX_MESSAGE) {
    return { ok: false, error: "Message is too long." };
  }

  return { ok: true, honeypot: false, name, email, message };
}
