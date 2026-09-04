import { useState } from "react";

function placeholderDataURI(label) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600">
    <rect width="800" height="600" fill="#0A0A0A"/>
    <defs><pattern id="p" width="10" height="10" patternUnits="userSpaceOnUse">
      <circle cx="2.5" cy="2.5" r="2" fill="#F2F1EA" opacity="0.5"/>
    </pattern></defs>
    <rect width="800" height="600" fill="url(#p)" opacity="0.5"/>
    <text x="400" y="310" text-anchor="middle" font-family="Georgia, serif" font-size="46" fill="#F2F1EA" opacity="0.85">METAL HUNTERS</text>
    <text x="400" y="350" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" letter-spacing="4" fill="#C8DDE3">${(label || "RAW SINCE 2015").toUpperCase()}</text>
  </svg>`;
  return "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg);
}

export default function Photo({ src, alt, fallbackLabel, className, style }) {
  const [failed, setFailed] = useState(false);
  return (
    <img
      className={className}
      style={style}
      src={failed ? placeholderDataURI(fallbackLabel || alt) : src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}
