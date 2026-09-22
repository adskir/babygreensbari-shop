// Deterministic accent color + icon per product, used instead of stock photography
// so every product card looks intentional and on-brand without relying on external images.

const PALETTE = [
  { bg: "from-forest-600 to-forest-800", tag: "bg-forest-700" }, // deep green
  { bg: "from-clay-400 to-clay-600", tag: "bg-clay-600" }, // terracotta
  { bg: "from-rose-400 to-clay-600", tag: "bg-rose-600" }, // radish pink
  { bg: "from-lime-500 to-forest-700", tag: "bg-lime-600" }, // fresh lime
  { bg: "from-amber-400 to-clay-600", tag: "bg-amber-600" }, // mustard gold
  { bg: "from-rose-500 to-forest-800", tag: "bg-rose-700" }, // beet magenta, muted
];

export function accentFor(slug = "") {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) hash = (hash * 31 + slug.charCodeAt(i)) >>> 0;
  return PALETTE[hash % PALETTE.length];
}
