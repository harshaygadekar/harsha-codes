import { describe, expect, it } from "vitest";
import { monthLabels, toWeeks, windowForGraph } from "./github-contributions";

describe("windowForGraph", () => {
  it("starts on a Sunday and includes today", () => {
    const today = new Date("2026-09-03T12:00:00Z");
    const { start, end } = windowForGraph(today);
    expect(end).toBe("2026-09-03");
    expect(new Date(`${start}T00:00:00Z`).getUTCDay()).toBe(0);
  });
});

describe("toWeeks / monthLabels", () => {
  it("labels the week that contains the 1st", () => {
    const days = [];
    const cursor = new Date(Date.UTC(2026, 7, 30));
    for (let i = 0; i < 14; i += 1) {
      days.push({
        date: cursor.toISOString().slice(0, 10),
        count: 0,
        level: 0,
      });
      cursor.setUTCDate(cursor.getUTCDate() + 1);
    }
    const weeks = toWeeks(days);
    const labels = monthLabels(weeks);
    expect(labels.some((l) => l.label === "Sep")).toBe(true);
  });
});
