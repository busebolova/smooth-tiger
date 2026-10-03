import { Link, useRouterState } from "@tanstack/react-router";
import { BookOpen, Coffee, Home, Leaf, ShoppingBag, UserRound, X } from "lucide-react";
import { createContext, useContext, useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
const logoLight = { url: "/media/ST-light.png" };
const logoDark = { url: "/media/ST-dark.png" };
import { Button } from "./button";
import type { Locale, Product } from "../data/products";
import { formatPrice } from "../data/products";
import { supabase } from "../integrations/supabase/client";
import { lovable } from "../integrations/lovable";

type CartItem = { product: Product; size: string; qty: number };
type StoreContextValue = { locale: Locale; toggleLocale: () => void; cart: CartItem[]; add: (p: Product, size?: string) => void; remove: (id: string) => void; updateQty: (id: string, size: string, delta: number) => void; cartOpen: boolean; setCartOpen: (open: boolean) => void; accountOpen: boolean; setAccountOpen: (open: boolean) => void };
const StoreContext = createContext<StoreContextValue | undefined>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("tr");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const value = useMemo(() => ({ locale, toggleLocale: () => setLocale((v) => v === "tr" ? "en" : "tr"), cart, add: (p: Product, size?: string) => { setCart((v) => { const s = size ?? p.prices[0]?.size ?? ""; const i = v.findIndex((it) => it.product.id === p.id && it.size === s); return i < 0 ? [...v, { product: p, size: s, qty: 1 }] : v.map((it, index) => index === i ? { ...it, qty: it.qty + 1 } : it); }); setCartOpen(true); }, remove: (id: string) => setCart((v) => v.filter((it) => it.product.id !== id)), updateQty: (id: string, size: string, delta: number) => setCart((v) => { const i = v.findIndex((it) => it.product.id === id && it.size === size); const row = v[i]; if (i < 0 || !row) return v; const next = row.qty + delta; return next <= 0 ? v.filter((_, index) => index !== i) : v.map((it, index) => index === i ? { ...it, qty: next } : it); }), cartOpen, setCartOpen, accountOpen, setAccountOpen }), [locale, cart, cartOpen, accountOpen]);
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() { const context = useContext(StoreContext); if (!context) throw new Error("StoreProvider missing"); return context; }

const labels = { tr: { tea: "Çay", coffee: "Kahve", about: "Hakkımızda", journal: "Günlük", cart: "Sepet", menu: "Menü" }, en: { tea: "Tea", coffee: "Coffee", about: "About", journal: "Journal", cart: "Cart", menu: "Menu" } };
export function Header() {
  const { locale, toggleLocale, cart, setCartOpen, setAccountOpen } = useStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });
  useEffect(() => setMenuOpen(false), [path]);
  const copy = labels[locale];
  void menuOpen;
  return <><header className="site-header band-header">
    <Link to="/" className="brand-mark"><img src={logoLight.url} alt="Smooth Tiger" /></Link>
    <nav className="nav-links" aria-label="Main navigation">
      <Link to="/tea" activeProps={{ className: "active" }}>{copy.tea}</Link>
      <Link to="/coffee" activeProps={{ className: "active" }}>{copy.coffee}</Link>
      <Link to="/about" activeProps={{ className: "active" }}>{copy.about}</Link>
      <Link to="/journal" activeProps={{ className: "active" }}>{copy.journal}</Link>
    </nav>
    <Button variant="outline" className="locale" onClick={toggleLocale} aria-label="Change language">{locale === "tr" ? "TR / EN" : "EN / TR"}</Button>
    <div className="header-actions"><Button variant="icon" className="account-button" onClick={() => setAccountOpen(true)} aria-label={locale === "tr" ? "Hesap" : "Account"}><UserRound /></Button><Button variant="icon" className="cart-button" onClick={() => setCartOpen(true)} aria-label={`${copy.cart}: ${cart.reduce((s, it) => s + it.qty, 0)}`}><ShoppingBag /><span>{cart.reduce((s, it) => s + it.qty, 0)}</span></Button></div>
  </header>
  <nav className="bottom-nav" aria-label="Mobile navigation">
    <Link to="/" activeOptions={{ exact: true }} activeProps={{ className: "active" }}><Home /><span>{locale === "tr" ? "Ana" : "Home"}</span></Link>
    <Link to="/tea" activeProps={{ className: "active" }}><Leaf /><span>{copy.tea}</span></Link>
    <Link to="/coffee" activeProps={{ className: "active" }}><Coffee /><span>{copy.coffee}</span></Link>
    <Link to="/about" activeProps={{ className: "active" }}><BookOpen /><span>{copy.about}</span></Link>
    <button type="button" onClick={() => setAccountOpen(true)}><UserRound /><span>{locale === "tr" ? "Hesap" : "Account"}</span></button>
  </nav></>;
}

export function AccountPanel() {
  const { locale, accountOpen, setAccountOpen } = useStore();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState(""); const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); const [busy, setBusy] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setMessage("");
    const result = mode === "signin" ? await supabase.auth.signInWithPassword({ email, password }) : await supabase.auth.signUp({ email, password, options: { emailRedirectTo: window.location.origin } });
    setBusy(false);
    if (result.error) { setMessage(result.error.message); return; }
    setMessage(mode === "signup" && !result.data.session ? (locale === "tr" ? "Onay bağlantısı e-posta adresine gönderildi." : "A confirmation link was sent to your email.") : (locale === "tr" ? "Hoş geldin. Oturumun açıldı." : "Welcome. You are signed in."));
  }
  async function continueWithGoogle() { setBusy(true); const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin }); if (result.error) setMessage(result.error.message); setBusy(false); }
  return <div className={accountOpen ? "account-layer is-open" : "account-layer"} aria-hidden={!accountOpen}><div className="account-scrim" onClick={() => setAccountOpen(false)} /><section className="account-panel"><div className="account-head"><small>SMOOTH TIGER · CLUB</small><Button variant="icon" onClick={() => setAccountOpen(false)} aria-label="Close"><X /></Button></div><h2>{mode === "signin" ? (locale === "tr" ? "Tekrar hoş geldin." : "Welcome back.") : (locale === "tr" ? "Ritüele katıl." : "Join the ritual.")}</h2><div className="account-tabs"><Button variant={mode === "signin" ? "solid" : "outline"} onClick={() => setMode("signin")}>{locale === "tr" ? "Giriş" : "Sign in"}</Button><Button variant={mode === "signup" ? "solid" : "outline"} onClick={() => setMode("signup")}>{locale === "tr" ? "Kayıt" : "Register"}</Button></div><form onSubmit={submit}><label><span>E-mail</span><input type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></label><label><span>{locale === "tr" ? "Şifre" : "Password"}</span><input type="password" autoComplete={mode === "signin" ? "current-password" : "new-password"} minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} required /></label><Button type="submit" disabled={busy}>{busy ? "…" : mode === "signin" ? (locale === "tr" ? "Giriş yap" : "Sign in") : (locale === "tr" ? "Hesap oluştur" : "Create account")}</Button></form><div className="account-or"><span />{locale === "tr" ? "veya" : "or"}<span /></div><Button variant="outline" className="google-button" onClick={continueWithGoogle} disabled={busy}><b>G</b>{locale === "tr" ? "Google ile devam et" : "Continue with Google"}</Button>{message && <p className="account-message" role="status">{message}</p>}</section></div>;
}

export function CartDrawer() {
  const { locale, cart, remove, updateQty, cartOpen, setCartOpen } = useStore();
  const [waiting, setWaiting] = useState(false);
  const tr = locale === "tr";
  const close = () => { setWaiting(false); setCartOpen(false); };
  const total = cart.reduce((sum, it) => { const found = it.product.prices.find((v) => v.size === it.size) ?? it.product.prices[0]; return sum + (found?.price ?? 0) * it.qty; }, 0);
  const count = cart.reduce((sum, it) => sum + it.qty, 0);
  return <div className={cartOpen ? "cart-layer is-open" : "cart-layer"} aria-hidden={!cartOpen}>
    <div className="cart-scrim" onClick={close} />
    <aside className="cart-drawer" aria-label={tr ? "Sepet" : "Cart"}>
      <div className="cart-head"><h2>{tr ? "Sepet" : "Cart"}{count ? <small> · {count}</small> : null}</h2><Button variant="icon" onClick={close} aria-label="Close"><X /></Button></div>
      {cart.length === 0 ? <p className="empty-copy">{tr ? "Henüz seçim yapmadınız." : "Your ritual is waiting."}</p> : <div className="cart-items">{cart.map((it, i) => { const found = it.product.prices.find((v) => v.size === it.size) ?? it.product.prices[0]; if (!found) return null; return <div className="cart-row" key={`${it.product.id}-${it.size}-${i}`}><div className="cart-row-info"><b>{it.product.name[locale]}</b><small>{it.size} · {formatPrice(found.price)}</small><div className="qty-controls"><button type="button" onClick={() => updateQty(it.product.id, it.size, -1)} aria-label={tr ? "Azalt" : "Decrease"}>−</button><span>{it.qty}</span><button type="button" onClick={() => updateQty(it.product.id, it.size, 1)} aria-label={tr ? "Artır" : "Increase"}>+</button></div></div><div className="cart-row-end"><b>{formatPrice(found.price * it.qty)}</b><Button variant="icon" onClick={() => remove(it.product.id)} aria-label="Remove"><X /></Button></div></div>; })}</div>}
      <div className="cart-total"><span>{tr ? "Toplam" : "Total"}</span><b>{formatPrice(total)}</b></div>
      <Button className="checkout" disabled={!cart.length} onClick={() => setWaiting(true)}>{tr ? "Ödemeye geç" : "Checkout"}</Button>
      {waiting && <p className="checkout-wait" role="status">{tr ? "API bekleniyor — ödeme servisine bağlanılıyor…" : "Waiting for API — connecting to the payment service…"}</p>}
    </aside>
  </div>;
}

export function Footer() {
  const { locale, setAccountOpen, setCartOpen } = useStore(); const tr = locale === "tr"; const [sent, setSent] = useState(false);
  const marquee = tr ? "Smooth. Smooth Tiger. · Elle harmanlanır · Küçük partiler · Mikro-hayırseverlik · " : "Smooth. Smooth Tiger. · Hand blended · Small batches · Micro-philanthropy · ";
  return <footer className="site-footer">
    <div className="footer-marquee" aria-hidden="true"><div>{marquee.repeat(4)}</div></div>
    <div className="footer-trust">{(tr ? [["Ücretsiz kargo", "750 TL üzeri siparişlerde"], ["Güvenli ödeme", "256-bit şifreli alışveriş"], ["Kolay iade", "14 gün içinde"], ["Taze paketleme", "Siparişe özel hazırlanır"]] : [["Free shipping", "On orders over 750 TL"], ["Secure checkout", "256-bit encrypted"], ["Easy returns", "Within 14 days"], ["Packed fresh", "Prepared per order"]]).map(([a, b]) => <div key={a}><strong>{a}</strong><span>{b}</span></div>)}</div>
    <div className="footer-grid">
      <div className="footer-news"><img src={logoLight.url} alt="Smooth Tiger Brews & Accessories" /><h3>{tr ? "Demlenmeden önce haberin olsun." : "Hear it before it steeps."}</h3>
        {sent ? <p>{tr ? "Teşekkürler, listedesiniz." : "Thank you, you're on the list."}</p> : <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}><input type="email" required placeholder={tr ? "E-posta adresiniz" : "Your email"} aria-label="Email" /><button type="submit">{tr ? "Abone ol" : "Subscribe"}</button></form>}</div>
      <div className="footer-col"><small>{tr ? "Mağaza" : "Shop"}</small><Link to="/tea">{tr ? "Çaylar" : "Teas"}</Link><Link to="/coffee">{tr ? "Kahveler" : "Coffees"}</Link><Link to="/journal">{tr ? "Fables" : "Fables"}</Link><button onClick={() => setCartOpen(true)}>{tr ? "Sepetim" : "My bag"}</button></div>
      <div className="footer-col"><small>{tr ? "Hesap" : "Account"}</small><button onClick={() => setAccountOpen(true)}>{tr ? "Giriş yap" : "Sign in"}</button><button onClick={() => setAccountOpen(true)}>{tr ? "Kayıt ol" : "Create account"}</button><span>{tr ? "Sipariş takibi" : "Track order"}</span><span>{tr ? "Kargo & iade" : "Shipping & returns"}</span></div>
      <div className="footer-col"><small>{tr ? "Marka" : "Brand"}</small><Link to="/about">{tr ? "Hikâyemiz" : "Our story"}</Link><span>{tr ? "Mikro-hayırseverlik" : "Micro-philanthropy"}</span><span>{tr ? "Gizlilik" : "Privacy"}</span><span>{tr ? "Mesafeli satış sözleşmesi" : "Terms of sale"}</span></div>
      <div className="footer-col"><small>{tr ? "Takip et" : "Follow"}</small><a href="https://instagram.com/smoothtigerteas" target="_blank" rel="noreferrer">Instagram</a><a href="https://www.tiktok.com/@smoothtigerteas" target="_blank" rel="noreferrer">TikTok</a><a href="https://twitter.com/SmoothTigerTeas" target="_blank" rel="noreferrer">Twitter</a></div>
    </div>
    <p className="footer-legal"><span>© 2026 Smooth Tiger · Mallorca</span><span>Visa · Mastercard · Troy</span></p>
  </footer>;
}
