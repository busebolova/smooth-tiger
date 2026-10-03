import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import hero from "../assets/hero-tiger-real-logo.png";
import tea from "../assets/tea-collection.jpg";
import coffee from "../assets/coffee-collection.jpg";
import story from "../assets/story-cinema.jpg";
import heroVideo from "../assets/hero-tiger-real-logo.mp4.asset.json";
import { products } from "../data/products";
import { ProductCard } from "../components/product-card";
import { useStore } from "../components/storefront";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Smooth Tiger — Tea, Coffee & Rituals" },
    { name: "description", content: "Rare teas, expressive coffees and objects for a smoother ritual." },
    { property: "og:title", content: "Smooth Tiger — Tea, Coffee & Rituals" },
    { property: "og:description", content: "Rare teas, expressive coffees and objects for a smoother ritual." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
    { property: "og:url", content: "/" },
  ], links: [{ rel: "canonical", href: "/" }] }), component: HomePage,
});

function HomePage() {
  const { locale } = useStore();
  const copy = locale === "tr" ? {
    line: "Nadir yapraklar ve özenle kavrulmuş çekirdekler için bir seremoni.", scroll: "Demlemeye doğru", tea: "Çay Ritüeli", teaBody: "Ödüllü sarı çaylardan seremoniyal matchaya.", coffee: "Kavrulma Sahnesi", coffeeBody: "Karakterli kökenler, dengeli kavrumlar.", explore: "Keşfet", selected: "Seçili Demler", all: "Tümünü gör", story: "Hikâyemiz", storyTitle: "Bir isim, bir çocukluk anı ve her zaman smooth bir kaplan.", storyBody: "Dört yaşındaki bir çocuk, televizyondaki güreş gösterisini hayranlıkla izlerken annesi ona ılımış bir kupa çay uzattı. Gösteri bittiğinde annesi sordu: Bir güreşçi olsaydın adın ne olurdu?", storyQuote: "Smooth. Smooth Tiger.", read: "Hikâyeyi oku"
  } : {
    line: "A ceremony of rare leaves and thoughtfully roasted beans.", scroll: "Scroll to brew", tea: "The Tea Ritual", teaBody: "From award-winning yellow tea to ceremonial matcha.", coffee: "The Roastery", coffeeBody: "Expressive origins, balanced roasts.", explore: "Explore", selected: "Selected Brews", all: "View all", story: "Our Story", storyTitle: "A name, a childhood moment, and a tiger that is always smooth.", storyBody: "A four-year-old boy watched a wrestling show in awe as his mother handed him a mug of lukewarm tea. When the show ended, she asked: What would your name be if you were a wrestler?", storyQuote: "Smooth. Smooth Tiger.", read: "Read the story"
  };
  return <main>
    <section className="hero"><video poster={hero} autoPlay muted loop playsInline aria-label="A tiger sipping steaming tea in turquoise light"><source src={heroVideo.url} type="video/mp4" /></video><div className="hero-wash" /><div className="hero-title"><p>Brews & Accessories · İstanbul</p><h1><span className="title-smooth">Smooth</span><br/><span className="title-tiger">Tiger</span></h1><p className="hero-line">{copy.line}</p></div><div className="scroll-mark"><i /><span>{copy.scroll}</span></div></section>
    <div className="claw-divider"><i/><i/><i/></div>
    <section className="collections">
      <Link to="/tea" className="collection"><div className="collection-image"><img src={tea} loading="lazy" width={1200} height={1504} alt="Turquoise tea still life" /></div><div className="collection-copy"><div><small>01 · Tea</small><h2>{copy.tea}</h2><p>{copy.teaBody}</p></div><span>{copy.explore}<ArrowRight /></span></div></Link>
      <Link to="/coffee" className="collection"><div className="collection-image"><img src={coffee} loading="lazy" width={1200} height={1504} alt="Coffee beans in a black bowl" /></div><div className="collection-copy"><div><small>02 · Coffee</small><h2>{copy.coffee}</h2><p>{copy.coffeeBody}</p></div><span>{copy.explore}<ArrowRight /></span></div></Link>
    </section>
    <section className="selected-section"><div className="section-heading"><h2>{copy.selected}</h2><Link to="/tea">{copy.all}<ArrowRight /></Link></div><div className="product-rail">{[products[0], products[7], products[12], products[2]].map((p, i) => p ? <ProductCard product={p} index={i} key={p.id}/> : null)}</div></section>
    <section className="story-teaser"><img src={story} loading="lazy" width={1920} height={1088} alt="A child watching wrestling while his mother pours tea" /><div className="story-overlay"/><div className="story-copy"><small>{copy.story}</small><h2>{copy.storyTitle}</h2><p>{copy.storyBody}</p><blockquote>“{copy.storyQuote}”</blockquote><Link to="/about">{copy.read}<ArrowRight /></Link></div></section>
    <section className="final-word"><span>Smooth.</span><strong>Smooth Tiger.</strong></section>
  </main>;
}
