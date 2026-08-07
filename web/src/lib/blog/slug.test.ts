import { describe, expect, it } from "vitest";
import { ensureUniqueSlug, slugify } from "./slug";

describe("slugify", () => {
  it("normalizes titles", () => {
    expect(slugify("Hello World")).toBe("hello-world");
    expect(slugify("  AI / Systems — notes ")).toBe("ai-systems-notes");
  });

  it("strips unsafe characters", () => {
    expect(slugify("C++ & Rust???")).toBe("c-rust");
  });
});

describe("ensureUniqueSlug", () => {
  it("returns base when free", () => {
    expect(ensureUniqueSlug("Hello", [])).toBe("hello");
  });

  it("suffixes when taken", () => {
    expect(ensureUniqueSlug("Hello", ["hello"])).toBe("hello-2");
    expect(ensureUniqueSlug("Hello", ["hello", "hello-2"])).toBe("hello-3");
  });

  it("keeps current slug when editing", () => {
    expect(ensureUniqueSlug("Hello", ["hello", "other"], "hello")).toBe(
      "hello",
    );
  });
});
