import { describe, expect, it } from "vitest";
import { techIconUrl } from "./tech-icons";

describe("techIconUrl", () => {
  it("requests a white monochrome glyph for masking", () => {
    expect(techIconUrl("python")).toBe(
      "https://cdn.simpleicons.org/python/ffffff",
    );
  });

  it("encodes special characters in the slug", () => {
    expect(techIconUrl("next.js")).toBe(
      "https://cdn.simpleicons.org/next.js/ffffff",
    );
  });

  it("uses jsDelivr for amazonwebservices (missing on simpleicons CDN)", () => {
    expect(techIconUrl("amazonwebservices")).toContain(
      "cdn.jsdelivr.net/npm/simple-icons",
    );
    expect(techIconUrl("amazonwebservices")).toContain(
      "amazonwebservices.svg",
    );
  });
});
