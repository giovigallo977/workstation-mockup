import { useId } from "react";

const FIT_COLORS = {
  black: { garment: "#161616", trim: "#0A0A0A", ink: "#F2F1EA" },
  white: { garment: "#EDEBE1", trim: "#c9c7bb", ink: "#0A0A0A" },
  grey:  { garment: "#6d6f72", trim: "#54565a", ink: "#F2F1EA" },
};

function garmentPath(type) {
  switch (type) {
    case "hoodie":
      return "M70,38 C70,18 130,18 130,38 L150,46 L172,78 L150,96 L150,205 L50,205 L50,96 L28,78 L50,46 Z";
    case "cap":
      return "M40,90 C40,55 78,32 100,32 C122,32 160,55 160,90 L165,96 L100,102 L35,96 Z";
    case "sticker":
      return "M100,20 L160,55 L160,125 L100,160 L40,125 L40,55 Z";
    default:
      return "M50,20 L80,8 Q100,26 120,8 L150,20 L174,52 L150,68 L150,205 L50,205 L50,68 L26,52 Z";
  }
}

export default function GarmentSVG({ product, wordmark = true }) {
  const rid = useId().replace(/:/g, "");
  const palette = FIT_COLORS[product.fit] || FIT_COLORS.black;
  const path = garmentPath(product.type);
  const patternId = `ht-${rid}`;
  const clipId = `clip-${rid}`;
  const printY = product.type === "hoodie" ? 60 : 55;
  const printH = product.type === "cap" ? 30 : 70;

  return (
    <svg viewBox="0 0 200 220" preserveAspectRatio="xMidYMid meet" role="img" aria-label={product.name}>
      <defs>
        <pattern id={patternId} width="4" height="4" patternUnits="userSpaceOnUse">
          <circle cx="1.2" cy="1.2" r="1" fill={palette.ink} opacity="0.55" />
        </pattern>
        <clipPath id={clipId}><path d={path} /></clipPath>
      </defs>
      <rect width="200" height="220" fill="#0d0d0d" />
      <g clipPath={`url(#${clipId})`}>
        <path d={path} fill={palette.garment} />
        <rect x="20" y={printY} width="160" height={printH} fill={`url(#${patternId})`} />
        <path d={path} fill="none" stroke={palette.trim} strokeWidth="3" />
      </g>
      {wordmark && (
        <>
          <text x="100" y={printY + printH / 2 - 6} textAnchor="middle" fontFamily="Oswald, sans-serif" fontStyle="italic" fontWeight="700" fontSize="16" fill={palette.ink}>MH</text>
          <text x="100" y={printY + printH / 2 + 14} textAnchor="middle" fontFamily="Oswald, sans-serif" fontWeight="700" fontStyle="italic" letterSpacing="1" fontSize="10" fill={palette.ink}>{product.tag}</text>
        </>
      )}
    </svg>
  );
}

export function miniGarment(imageKey) {
  const [type = "tee", fit = "black"] = (imageKey || "tee-black").split("-");
  return <GarmentSVG product={{ name: "", type, fit, tag: "MH" }} wordmark={false} />;
}
