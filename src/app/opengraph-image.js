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
          background: "#111214",
          color: "#f1f2f4",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "65px",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", fontSize: 32 }}>WF / Wael Fezari</div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 78,
            letterSpacing: -3,
          }}
        >
          <span>Interfaces</span>
          <span>Intelligence</span>
          <span style={{ color: "#ff785b" }}>Intégrations</span>
        </div>
        <div style={{ display: "flex", fontSize: 22 }}>
          Wael Fezari / Full-stack development & applied AI
        </div>
      </div>
    ),
    size,
  );
}
