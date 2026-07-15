import { describe, expect, it } from "vitest";
import { techIconUrl } from "./tech-icons";

describe("techIconUrl", () => {
  it("returns a local public path for the slug", () => {
    expect(techIconUrl("python")).toBe("/icons/tech/python.svg");
  });

  it("encodes special characters in the slug", () => {
    expect(techIconUrl("next.js")).toBe("/icons/tech/next.js.svg");
  });

  it("maps amazonwebservices to a local path (no CDN)", () => {
    expect(techIconUrl("amazonwebservices")).toBe(
      "/icons/tech/amazonwebservices.svg",
    );
  });
});
