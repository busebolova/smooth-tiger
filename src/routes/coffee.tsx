import { createFileRoute } from "@tanstack/react-router";
import coffee from "../assets/coffee-collection.jpg";
import brazilLife from "../assets/lifestyle-brazil.jpg";
import sidamoLife from "../assets/lifestyle-sidamo.jpg";
import turkLife from "../assets/lifestyle-turk-kahvesi.jpg";
import { products } from "../data/products";
import { ProductCard } from "../components/product-card";
import { useStore } from "../components/storefront";
export const Route = createFileRoute("/coffee")({ head: () => ({ meta: [{ title: "Coffee Collection — Smooth Tiger" }, { name: "description", content: "Brazil, Ethiopia and Turkish coffee from Smooth Tiger." }, { property: "og:title", content: "Coffee Collection — Smooth Tiger" }, { property: "og:description", content: "Expressive origins and balanced roasts." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }, { property: "og:url", content: "/coffee" }], links: [{ rel: "canonical", href: "/coffee" }] }), component: CoffeePage });
const scenes = [
  { img: brazilLife, tr: "Brezilya FC Santos · sabahın ilk demi", en: "Brazil FC Santos · the first pour of the morning" },
  { img: sidamoLife, tr: "Etiyopya Sidamo · atasal çekirdek, yumuşak asidite", en: "Ethiopia Sidamo · heirloom beans, gentle acidity" },
  { img: turkLife, tr: "Türk Kahvesi · cezvede, köpüğüyle", en: "Turkish Coffee · in the cezve, with its foam" },
];
function CoffeePage(){ const { locale } = useStore(); return <main className="catalog-page"><section className="catalog-hero reverse"><img src={coffee} width={1200} height={1504} alt="Smooth Tiger coffee collection"/><div><small>02 · COLLECTION</small><h1>{locale === "tr" ? "Kahve" : "Coffee"}</h1><p>{locale === "tr" ? "Kökenin karakterini saklamayan, dengeli kavrumlar." : "Balanced roasts that let every origin keep its voice."}</p></div></section><section className="catalog-grid coffee-grid">{products.filter(p=>p.category==="coffee").map((p,i)=><ProductCard product={p} index={i} key={p.id}/>)}</section><section className="lifestyle-strip">{scenes.map((s) => <figure key={s.en} className="lifestyle-shot"><img src={s.img} width={928} height={1152} loading="lazy" alt={s[locale]} /><figcaption>{s[locale]}</figcaption></figure>)}</section></main> }
