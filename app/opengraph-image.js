import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = `${site.handle}: web + mobile developer, learning Web3 in public`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Coin mascot as a data-URI SVG (satori renders <img> reliably).
function coinDataUri() {
  const ticks = Array.from({ length: 48 }, (_, i) => {
    const a = (i * 2 * Math.PI) / 48;
    const f = (n) => n.toFixed(2);
    return `<line x1="${f(100 + Math.cos(a) * 79)}" y1="${f(100 + Math.sin(a) * 79)}" x2="${f(100 + Math.cos(a) * 85)}" y2="${f(100 + Math.sin(a) * 85)}" stroke="#1b8fb5" stroke-width="3" stroke-linecap="round"/>`;
  }).join("");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
<defs><radialGradient id="g" cx="35%" cy="30%" r="80%"><stop offset="0" stop-color="#7d86ff"/><stop offset="1" stop-color="#4F5BFF"/></radialGradient></defs>
<circle cx="100" cy="100" r="94" fill="#1b8fb5"/><circle cx="100" cy="100" r="90" fill="#38DCFF"/>${ticks}
<circle cx="100" cy="100" r="72" fill="url(#g)" stroke="#2aa9d8" stroke-width="3"/>
<ellipse cx="78" cy="98" rx="7" ry="9" fill="#12163f"/><ellipse cx="122" cy="98" rx="7" ry="9" fill="#12163f"/>
<circle cx="80.5" cy="94" r="2.6" fill="#fff"/><circle cx="124.5" cy="94" r="2.6" fill="#fff"/>
<ellipse cx="62" cy="119" rx="10" ry="6" fill="#ff8caf" opacity="0.65"/><ellipse cx="138" cy="119" rx="10" ry="6" fill="#ff8caf" opacity="0.65"/>
<path d="M84 122 Q100 138 116 122" fill="none" stroke="#12163f" stroke-width="5" stroke-linecap="round"/></svg>`;
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "70px 80px",
          background: "linear-gradient(135deg, #0B0E14 0%, #10141F 60%, #1a1f4d 100%)",
          color: "#fff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 680 }}>
          <div style={{ display: "flex", fontSize: 28, color: "#38DCFF", letterSpacing: 4, fontWeight: 700 }}>
            {`</> ${site.handle}`}
          </div>
          <div style={{ display: "flex", fontSize: 70, fontWeight: 700, lineHeight: 1.08, marginTop: 28 }}>
            {site.heroLine1}
          </div>
          <div style={{ display: "flex", fontSize: 70, fontWeight: 700, lineHeight: 1.08, color: "#38DCFF" }}>
            {site.heroLine2}
          </div>
          <div style={{ display: "flex", fontSize: 28, color: "#9AA3B5", marginTop: 28 }}>
            Testnet first. No hype.
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={coinDataUri()} width={330} height={330} alt="" />
      </div>
    ),
    { ...size }
  );
}
