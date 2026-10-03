import { createFileRoute } from "@tanstack/react-router";
import tea from "../assets/tea-collection.jpg";
import lifeTurk from "../assets/lifestyle-turk-cayi.jpg";
import lifeMatcha from "../assets/lifestyle-matcha.jpg";
import lifeBalmy from "../assets/lifestyle-balmy.jpg";
import { products } from "../data/products";
import { ProductCard } from "../components/product-card";
import { useStore } from "../components/storefront";
export const Route = createFileRoute("/tea")({ staticData: { sitemap: true }, head: () => ({ meta: [{ title: "Tea Collection — Smooth Tiger" }, { name: "description", content: "Explore Smooth Tiger's award-winning yellow, green, white and herbal teas." }, { property: "og:title", content: "Tea Collection — Smooth Tiger" }, { property: "og:description", content: "Rare leaves, bold blends and ceremonial matcha." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }, { property: "og:url", content: "/tea" }], links: [{ rel: "canonical", href: "/tea" }] }), component: TeaPage });
const teaScenes = [
  { img: lifeTurk, tr: "Türk Çayı — günün ilk demlenişi", en: "Türk Çayı — the day's first brew" },
  { img: lifeMatcha, tr: "Matcha — sakin, odaklı, seremonik", en: "Matcha — calm, focused, ceremonial" },
  { img: lifeBalmy, tr: "Balmy — akşam kapanışı için dem", en: "Balmy — a brew for the evening close" },
];
function TeaPage(){ const { locale } = useStore(); return <main className="catalog-page"><section className="catalog-hero"><img src={tea} width={1200} height={1504} alt="Smooth Tiger tea collection"/><div><small>01 · COLLECTION</small><h1>{locale === "tr" ? "Çay" : "Tea"}</h1><p>{locale === "tr" ? "Her yaprak bir kadraj. Her dem, kendine ait bir ritim." : "Every leaf is a frame. Every brew has its own rhythm."}</p></div></section><section className="catalog-grid">{products.filter(p=>p.category==="tea").map((p,i)=><ProductCard product={p} index={i} key={p.id}/>)}</section><section className="lifestyle-strip">{teaScenes.map((s) => <figure key={s.en} className="lifestyle-shot"><img src={s.img} width={1024} height={1024} loading="lazy" alt={s[locale]} /><figcaption>{s[locale]}</figcaption></figure>)}</section></main> }
