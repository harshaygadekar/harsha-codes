import { ImageResponse } from "next/og";
import { portfolio } from "@/content/portfolio";

export const runtime = "edge";
export const alt = `${portfolio.person.fullName} — ${portfolio.person.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  const name = portfolio.person.fullName;
  const role = portfolio.person.role;
  const brand = portfolio.brand;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0c0c0e",
          color: "#f4f4f5",
          padding: "72px 80px",
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 28,
            letterSpacing: "-0.02em",
            color: "#a1a1aa",
          }}
        >
          {brand}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 600,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              color: "#fafafa",
            }}
          >
            {name}
          </div>
          <div
            style={{
              fontSize: 32,
              lineHeight: 1.35,
              color: "#a1a1aa",
              maxWidth: 900,
            }}
          >
            {role}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 24,
            color: "#71717a",
          }}
        >
          <span>{portfolio.person.location}</span>
          <span style={{ color: "#52525b" }}>Backend · AI · Systems</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
