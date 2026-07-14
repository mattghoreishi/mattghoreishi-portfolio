import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#050914",
          color: "white",
          padding: 70,
          fontFamily: "Inter, Arial, sans-serif"
        }}
      >
        <div style={{ display: "flex", fontSize: 24, color: "#a5f3fc", letterSpacing: 4 }}>AI PRODUCT READINESS</div>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 1020 }}>
          <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.03 }}>Before I Trust an AI Feature</div>
          <div style={{ marginTop: 34, display: "flex", gap: 14 }}>
            {["Behavior", "Failure", "Evaluation", "Control"].map((item) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  borderLeft: "2px solid #67e8f9",
                  paddingLeft: 14,
                  fontSize: 23,
                  color: "#cbd5e1"
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 27, color: "#94a3b8" }}>Matt Ghoreishi · June 2026</div>
      </div>
    ),
    size
  );
}
