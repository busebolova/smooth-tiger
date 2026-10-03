import type { Locale } from "./products";

const files = import.meta.glob<{ url: string }>("../assets/packs/*.asset.json", { eager: true, import: "default" });

const packs: Record<string, string> = {};
for (const [path, asset] of Object.entries(files)) {
  const key = path.split("/").pop()!.replace(".png.asset.json", "");
  packs[key] = asset.url;
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
