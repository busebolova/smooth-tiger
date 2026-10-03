<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Use shared product data and a locale context across all storefront routes so bilingual content and cart behavior remain consistent.
- Keep cinematic motion centralized in a client-only GSAP director so route content stays semantic and reduced-motion remains consistent.
- Use the shared storefront provider for account panel state alongside locale and cart state so ecommerce controls remain consistent across routes.
- All product imagery comes from the supplied pack photos via `packImage()` — never generate new packaging artwork for the storefront.
- Cart items carry their selected size (CartItem = product + size); product cards and the detail page pass the active size into `add()`.
- Serve production storefront media from `/public/media` and provide MP4/WebM video fallbacks so assets remain host-independent.
