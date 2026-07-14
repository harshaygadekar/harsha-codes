import { describe, expect, it } from "vitest";
import { getInitials } from "./person";

describe("getInitials", () => {
  it("returns two initials for a two-part name", () => {
    expect(getInitials("Harsha Y")).toBe("HY");
  });

  it("handles single name", () => {
    expect(getInitials("Harsha")).toBe("H");
  });

  it("caps at two characters for longer names", () => {
    expect(getInitials("Ada Lovelace Byron")).toBe("AL");
  });

  it("trims extra whitespace", () => {
    expect(getInitials("  Harsha   Y  ")).toBe("HY");
  });
});
