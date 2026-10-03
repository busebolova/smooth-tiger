import type { Locale } from "./products";

// Pack photos are served from /public/media/packs so they work on any host (Lovable, Vercel).
const files = import.meta.glob("../assets/packs/*.asset.json", { eager: true });

const packs: Record<string, string> = {};
for (const path of Object.keys(files)) {
  const filename = path.split("/").pop();
  if (!filename) continue;
  const key = filename.replace(/\.(?:png|jpe?g|webp)\.asset\.json$/i, "");
  packs[key] = `/media/packs/${key}.webp`;
}

/** Returns the supplied package photo for a product size and language, falling back to any available size. */
export function packImage(id: string, size: string, locale: Locale): string | undefined {
  const grams = size.match(/\d+g/)?.[0] ?? size;
  const other: Locale = locale === "tr" ? "en" : "tr";
  const direct = packs[`${id}-${grams}-${locale}`] ?? packs[`${id}-${grams}-${other}`];
  if (direct) return direct;
  for (const g of ["100g", "50g", "200g", "500g"]) {
    const v = packs[`${id}-${g}-${locale}`] ?? packs[`${id}-${g}-${other}`];
    if (v) return v;
  }
  return undefined;
}
