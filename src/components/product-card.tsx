import { Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { useState } from "react";
import type { Product } from "../data/products";
import { formatPrice } from "../data/products";
import { packImage } from "../data/pack-images";
import { Button } from "./button";
import { useStore } from "./storefront";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { locale, add } = useStore();
  const [size, setSize] = useState(product.prices[0]?.size ?? "");
  const img = packImage(product.id, size, locale);
  return <article className={`product-card accent-${product.accent}`}>
    <Link to="/product/$id" params={{ id: product.id }} aria-label={product.name[locale]} className={img ? "product-art has-pack" : "product-art"}>
      <span>{String(index + 1).padStart(2, "0")}</span>
      {img ? <img src={img} alt={`${product.name[locale]} ${size}`} loading="lazy" /> : <strong>{product.name[locale]}</strong>}
      <i />
    </Link>
    <div className="product-info"><div><h3>{product.name[locale]}</h3><p>{product.detail[locale]}</p></div><Button variant="icon" onClick={() => add(product, size)} aria-label={`${product.name[locale]} add to cart`}><Plus /></Button></div>
    <div className="price-line">{product.prices.map((v) => <button type="button" key={v.size} className={v.size === size ? "is-active" : undefined} onClick={() => setSize(v.size)}>{v.size} · {formatPrice(v.price)}</button>)}</div>
  </article>;
}
