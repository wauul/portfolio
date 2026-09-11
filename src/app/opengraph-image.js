import { ImageResponse } from "next/og";
export const runtime = "edge";
export const alt = "Wael Fezari — Développement full-stack & IA";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#f5f3ec",
          color: "#242720",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "65px",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", fontSize: 32 }}>WF.</div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 76,
            letterSpacing: -4,
          }}
        >
          <span>L’idée. Le code.</span>
          <span style={{ color: "#bb481e" }}>Le possible.</span>
        </div>
        <div style={{ display: "flex", fontSize: 22 }}>
          Wael Fezari / Full-stack development & applied AI
        </div>
      </div>
    ),
    size,
  );
}
