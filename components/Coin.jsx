// The brand mascot as an inline SVG. Edit freely.
export default function Coin({ className = "" }) {
  const ticks = Array.from({ length: 48 }, (_, i) => {
    const a = (i * 2 * Math.PI) / 48;
    return {
      x1: 100 + Math.cos(a) * 79,
      y1: 100 + Math.sin(a) * 79,
      x2: 100 + Math.cos(a) * 85,
      y2: 100 + Math.sin(a) * 85,
    };
  });

  return (
    <svg viewBox="0 0 200 200" className={className} role="img" aria-label="Smiling coin mascot">
      <defs>
        <radialGradient id="coinFace" cx="35%" cy="30%" r="80%">
          <stop offset="0" stopColor="#7d86ff" />
          <stop offset="1" stopColor="#4F5BFF" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="94" fill="#1b8fb5" />
      <circle cx="100" cy="100" r="90" fill="#38DCFF" />
      {ticks.map((t, i) => (
        <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} stroke="#1b8fb5" strokeWidth="3" strokeLinecap="round" />
      ))}
      <circle cx="100" cy="100" r="72" fill="url(#coinFace)" stroke="#2aa9d8" strokeWidth="3" />
      <text x="100" y="62" textAnchor="middle" fontFamily="monospace" fontWeight="700" fontSize="17" fill="#c3c9ff">
        {"</>"}
      </text>
      <ellipse cx="78" cy="98" rx="7" ry="9" fill="#12163f" />
      <ellipse cx="122" cy="98" rx="7" ry="9" fill="#12163f" />
      <circle cx="80.5" cy="94" r="2.6" fill="#fff" />
      <circle cx="124.5" cy="94" r="2.6" fill="#fff" />
      <ellipse cx="62" cy="119" rx="10" ry="6" fill="#ff8caf" opacity="0.65" />
      <ellipse cx="138" cy="119" rx="10" ry="6" fill="#ff8caf" opacity="0.65" />
      <path d="M84 122 Q100 138 116 122" fill="none" stroke="#12163f" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}
