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

  it("rejects missing required fields with field map", () => {
    const result = validateContact({ name: "", email: "a@b.com", message: "x" });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.fields?.name).toBeTruthy();
    }
  });

  it("flags only empty fields when several are missing", () => {
    const result = validateContact({ name: "", email: "", message: "" });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.fields?.name).toBeTruthy();
      expect(result.fields?.email).toBeTruthy();
      expect(result.fields?.message).toBeTruthy();
    }
  });

  it("rejects invalid email with field error", () => {
    const result = validateContact({
      name: "A",
      email: "not-an-email",
      message: "hi",
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.fields?.email).toMatch(/valid email/i);
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
      expect(result.fields?.message).toMatch(/too long/i);
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
