import { describe, expect, it } from "vitest";
import { validateContact } from "./contact";

describe("validateContact", () => {
  it("accepts a valid payload", () => {
    const result = validateContact({
      name: "Alex",
      email: "alex@example.com",
      message: "Hello",
    });
    expect(result).toEqual({
      ok: true,
      honeypot: false,
      name: "Alex",
      email: "alex@example.com",
      message: "Hello",
    });
  });

  it("trims whitespace from fields", () => {
    const result = validateContact({
      name: "  Alex  ",
      email: "  alex@example.com  ",
      message: "  Hello  ",
    });
    expect(result.ok).toBe(true);
    if (result.ok && !result.honeypot) {
      expect(result.name).toBe("Alex");
      expect(result.email).toBe("alex@example.com");
      expect(result.message).toBe("Hello");
    }
  });

  it("rejects missing required fields", () => {
    expect(validateContact({ name: "", email: "a@b.com", message: "x" }).ok).toBe(
      false,
    );
    expect(validateContact({ name: "A", email: "", message: "x" }).ok).toBe(
      false,
    );
    expect(validateContact({ name: "A", email: "a@b.com", message: "" }).ok).toBe(
      false,
    );
  });

  it("rejects invalid email", () => {
    const result = validateContact({
      name: "A",
      email: "not-an-email",
      message: "hi",
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toMatch(/valid email/i);
    }
  });

  it("rejects messages over 5000 characters", () => {
    const result = validateContact({
      name: "A",
      email: "a@b.com",
      message: "x".repeat(5001),
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toMatch(/too long/i);
    }
  });

  it("treats filled honeypot as silent success", () => {
    const result = validateContact({
      name: "",
      email: "",
      message: "",
      website: "http://spam.bot",
    });
    expect(result).toEqual({ ok: true, honeypot: true });
  });
});
