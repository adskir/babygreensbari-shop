import React from "react";
import { accentFor } from "../lib/theme";

// Renders a product's photo if it has one, otherwise a branded gradient
// swatch with a sprout motif — used so the catalog always looks polished
// even before real product photography is uploaded.
export default function ProductVisual({ product, className = "" }) {
  const image = product.images?.[0];
  if (image) {
    return (
      <img
        src={image}
        alt={product.name}
        className={`w-full h-full object-cover ${className}`}
      />
    );
  }

  const accent = accentFor(product.slug);

  return (
    <div className={`w-full h-full bg-gradient-to-br ${accent.bg} relative overflow-hidden flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 100 100"
        className="w-2/3 h-2/3 opacity-90"
        fill="none"
        stroke="white"
        strokeWidth="1.6"
        strokeLinecap="round"
      >
        <path d="M50 88 C50 88 50 55 50 45 C50 25 34 14 14 14 C14 14 14 40 30 50 C38 55 50 58 50 58" />
        <path d="M50 45 C50 30 62 19 86 19 C86 19 87 38 74 46 C68 50 50 52 50 52" />
      </svg>
      <span className="absolute bottom-3 right-3 text-white/70 text-[10px] font-medium tracking-wide uppercase">
        Baby Greens
      </span>
    </div>
  );
}
