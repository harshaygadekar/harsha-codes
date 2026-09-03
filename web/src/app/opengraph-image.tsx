import { ImageResponse } from "next/og";
import { portfolio } from "@/content/portfolio";

export const runtime = "edge";
export const alt = `${portfolio.person.fullName} — ${portfolio.person.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  const name = portfolio.person.firstName.toLowerCase();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#14110e",
          color: "#f3eee4",
          padding: "72px 80px",
          fontFamily: "Georgia, ui-serif, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: "0.08em",
            color: "#a3988a",
            fontFamily: "ui-monospace, monospace",
          }}
        >
          harsha.codes
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 88,
              fontStyle: "italic",
              fontWeight: 400,
              letterSpacing: "-0.04em",
              lineHeight: 1,
              color: "#f3eee4",
            }}
          >
            {name}
          </div>
          <div
            style={{
              fontSize: 28,
              lineHeight: 1.4,
              color: "#a3988a",
              maxWidth: 820,
              fontFamily: "ui-sans-serif, system-ui, sans-serif",
            }}
          >
            {portfolio.person.about}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 22,
            color: "#6f675c",
            fontFamily: "ui-monospace, monospace",
          }}
        >
          <span>{portfolio.person.location.toLowerCase()}</span>
          <span>work · projects · writing</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
