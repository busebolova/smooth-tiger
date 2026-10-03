import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Plus } from "lucide-react";
import { useState } from "react";
import { products, formatPrice } from "../data/products";
import { packImage } from "../data/pack-images";
import { Button } from "../components/button";
import { useStore } from "../components/storefront";

export const Route = createFileRoute("/product/$id")({ staticData: { sitemap: true },
  loader: ({ params }) => {
    const product = products.find((p) => p.id === params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Smooth Tiger" }, { name: "robots", content: "noindex" }] };
    const p = loaderData.product;
    return { meta: [
      { title: `${p.name.en} — Smooth Tiger` },
      { name: "description", content: p.detail.en },
      { property: "og:title", content: `${p.name.en} — Smooth Tiger` },
      { property: "og:description", content: p.detail.en },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: `/product/${p.id}` },
    ],
    links: [{ rel: "canonical", href: `/product/${p.id}` }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Product",
        name: p.name.en,
        description: p.detail.en,
        brand: { "@type": "Brand", name: "Smooth Tiger" },
        offers: {
          "@type": "Offer",
          priceCurrency: "TRY",
          price: p.prices[0]?.price ?? 0,
          availability: "https://schema.org/InStock",
        },
      }),
    }] };
  },
  component: ProductDetail,
});

function ProductDetail() {
  const { product } = Route.useLoaderData();
  const { locale, add } = useStore();
  const tr = locale === "tr";
  const [size, setSize] = useState(product.prices[0]?.size ?? "");
  const price = product.prices.find((v) => v.size === size) ?? product.prices[0];
  const img = packImage(product.id, size, locale);
  const eyebrow = product.category === "tea" ? (tr ? "Çay" : "Tea") : (tr ? "Kahve" : "Coffee");
  const siblings = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);
  return <div className={`product-detail accent-${product.accent}`}>
    <section className="detail-stage">
      <Link to={product.category === "tea" ? "/tea" : "/coffee"} className="detail-back"><ArrowLeft />{tr ? "Mağazaya dön" : "Back to shop"}</Link>
      {img ? <img className="detail-pack" src={img} alt={`${product.name[locale]} ${size}`} /> : <strong className="detail-name-art">{product.name[locale]}</strong>}
      <i className="detail-ring" aria-hidden="true" />
    </section>
    <section className="detail-copy">
      <small className="detail-eyebrow">SMOOTH TIGER · {eyebrow}</small>
      <h1>{product.name[locale]}</h1>
      <p className="detail-sub">{product.detail[locale]}</p>
      <div className="price-line detail-sizes">{product.prices.map((v) => <button type="button" key={v.size} className={v.size === size ? "is-active" : undefined} onClick={() => setSize(v.size)}>{v.size} · {formatPrice(v.price)}</button>)}</div>
      <div className="detail-buy">
        <span className="detail-price">{price ? formatPrice(price.price) : ""}</span>
        <Button variant="solid" onClick={() => add(product, size)}><Plus />{tr ? "Sepete ekle" : "Add to bag"}</Button>
      </div>
      <ul className="detail-notes">
        <li>{tr ? "Elle harmanlanır" : "Hand blended"}</li>
        <li>{tr ? "Küçük partiler" : "Small batches"}</li>
        <li>{tr ? "Siparişe özel taze paketleme" : "Packed fresh per order"}</li>
      </ul>
    </section>
    <section className="detail-more">
      <small>{tr ? "Devamı" : "Keep exploring"}</small>
      <div className="detail-more-row">{siblings.map((p) => {
        const thumb = packImage(p.id, p.prices[0]?.size ?? "", locale);
        return <Link key={p.id} to="/product/$id" params={{ id: p.id }} className={`detail-more-card accent-${p.accent}`}>
          <span className="product-art has-pack">{thumb ? <img src={thumb} alt={p.name[locale]} loading="lazy" /> : <strong>{p.name[locale]}</strong>}</span>
          <b>{p.name[locale]}</b>
          <small>{p.prices[0] ? formatPrice(p.prices[0].price) : ""}</small>
        </Link>;
      })}</div>
    </section>
  </div>;
}
