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
          background: "linear-gradient(135deg,#050914 0%,#07111f 52%,#0b1b32 100%)",
          color: "white",
          padding: 72,
          fontFamily: "Inter, Arial, sans-serif"
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 28, color: "#a5f3fc", letterSpacing: 4 }}>MATT GHOREISHI</div>
          <div style={{ border: "1px solid rgba(165,243,252,0.45)", borderRadius: 999, padding: "12px 20px", fontSize: 22 }}>
            AI · SaaS · Data
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.05, maxWidth: 920 }}>
            I build products where AI, data, and business outcomes meet.
          </div>
          <div style={{ marginTop: 30, fontSize: 30, color: "#cbd5e1", maxWidth: 840 }}>
            Senior Product Manager based in Hamburg.
          </div>
        </div>
      </div>
    ),
    size
  );
}
