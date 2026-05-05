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
          background: "linear-gradient(135deg,#050914 0%,#07111f 48%,#0b2340 100%)",
          color: "white",
          padding: 72,
          fontFamily: "Inter, Arial, sans-serif"
        }}
      >
        <div style={{ fontSize: 26, color: "#a5f3fc", letterSpacing: 4 }}>THE AGENTIC AI PRODUCT GAP</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.02, maxWidth: 960 }}>
            Why the hard part starts after an agent gets the first task right
          </div>
          <div style={{ marginTop: 30, display: "flex", gap: 16 }}>
            {["Workflow", "Risk", "Autonomy", "Evals", "Value"].map((item) => (
              <div key={item} style={{ border: "1px solid rgba(165,243,252,0.35)", borderRadius: 14, padding: "12px 18px", fontSize: 24 }}>
                {item}
              </div>
            ))}
          </div>
        </div>
        <div style={{ fontSize: 28, color: "#cbd5e1" }}>Matt Ghoreishi · May 2026</div>
      </div>
    ),
    size
  );
}
