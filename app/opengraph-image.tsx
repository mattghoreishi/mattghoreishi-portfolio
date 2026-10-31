import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#f5f2eb", color: "#183137", padding: 76, fontFamily: "Arial, sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 23, color: "#52666a" }}>
        <span>Product work & personal notes</span><span>Hamburg, Germany</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 90, letterSpacing: -4, lineHeight: 1.1 }}>Matt Ghoreishi.</div>
        <div style={{ marginTop: 25, fontSize: 32, color: "#17645f" }}>Senior Product Manager</div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 25, borderTop: "1px solid #ccd4ce", fontSize: 24 }}>
        <span>Payments · Video · Enterprise AI · Industrial software</span>
        <span>mattghoreishi.com</span>
      </div>
    </div>, size,
  );
}
