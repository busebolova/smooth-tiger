import { useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import tiger from "../assets/turquoise-climbing-tiger.png";

export function MotionDirector() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let disposed = false;
    let cleanup = () => {};

    async function createMotion() {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (disposed) return;

      gsap.registerPlugin(ScrollTrigger);
      window.scrollTo({ top: 0, behavior: "instant" });

      const context = gsap.context(() => {


        gsap.fromTo(
          ".hero-title > *, .catalog-hero > div > *, .about-hero > div > *, .journal-page > header > *",
          { y: 42, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.1, stagger: 0.09, ease: "power3.out", delay: 0.18 },
        );
        gsap.fromTo(".title-smooth", { xPercent: -10 }, { xPercent: 0, duration: 1.4, ease: "power4.out", delay: 0.3 });
        gsap.fromTo(".title-tiger", { xPercent: 12 }, { xPercent: 0, duration: 1.4, ease: "power4.out", delay: 0.36 });

        const film = document.querySelector<HTMLElement>(".story-film");
        if (film) {
          gsap.fromTo(film.querySelector("video"), { scale: 1.18 }, { scale: 1, ease: "none", scrollTrigger: { trigger: film, start: "top top", end: "bottom top", scrub: true } });
          gsap.to(film.querySelector(".story-film-title"), { yPercent: -60, opacity: 0, ease: "none", scrollTrigger: { trigger: film, start: "top top", end: "bottom 30%", scrub: true } });
        }
        gsap.utils.toArray<HTMLElement>(".story-card").forEach((chapter) => {
          gsap.fromTo(chapter.querySelector("span"), { scale: 0.4, opacity: 0 }, { scale: 1, opacity: 1, duration: 1, ease: "back.out(2)", scrollTrigger: { trigger: chapter, start: "top 80%", once: true } });
          gsap.fromTo(chapter.querySelector("p"), { y: 60, opacity: 0, clipPath: "inset(0 0 100% 0)" }, { y: 0, opacity: 1, clipPath: "inset(0 0 0% 0)", duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: chapter, start: "top 80%", once: true } });
        });
        gsap.utils.toArray<HTMLElement>(".story-onomato b").forEach((word, i) => {
          gsap.fromTo(word, { xPercent: i % 2 ? 40 : -40 }, { xPercent: i % 2 ? -20 : 20, ease: "none", scrollTrigger: { trigger: ".story-onomato", start: "top bottom", end: "bottom top", scrub: true } });
        });
        gsap.fromTo(".final-word span", { xPercent: -30 }, { xPercent: 10, ease: "none", scrollTrigger: { trigger: ".final-word", start: "top bottom", end: "bottom top", scrub: true } });
        gsap.fromTo(".final-word strong", { xPercent: 30 }, { xPercent: -5, ease: "none", scrollTrigger: { trigger: ".final-word", start: "top bottom", end: "bottom top", scrub: true } });

        const footer = document.querySelector<HTMLElement>(".site-footer");
        if (footer) {
          gsap.fromTo(footer.querySelectorAll(".footer-col, .footer-news, .footer-trust > div"), { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.05, ease: "power2.out", scrollTrigger: { trigger: footer, start: "top 92%", once: true } });
          gsap.to(footer.querySelector(".footer-marquee div"), { xPercent: -50, duration: 22, ease: "none", repeat: -1 });
        }

        gsap.utils.toArray<HTMLElement>(".collection, .section-heading, .story-copy, .journal-item").forEach((element) => {
          gsap.fromTo(element, { y: 70, opacity: 0 }, {
            y: 0,
            opacity: 1,
            duration: 1.15,
            ease: "power3.out",
            scrollTrigger: { trigger: element, start: "top 88%", once: true },
          });
        });

        gsap.utils.toArray<HTMLElement>(".product-card").forEach((card, index) => {
          const artwork = card.querySelector(".product-art");
          const info = card.querySelector(".product-info");
          if (!artwork) return;
          gsap.fromTo(artwork, { clipPath: "inset(100% 0 0 0)", y: 48 }, {
            clipPath: "inset(0% 0 0 0)",
            y: 0,
            duration: 1,
            delay: (index % 3) * 0.08,
            ease: "power4.out",
            scrollTrigger: { trigger: card, start: "top 90%", once: true },
          });
          if (info) {
            gsap.fromTo(info, { opacity: 0, y: 20 }, {
              opacity: 1,
              y: 0,
              duration: 0.7,
              delay: 0.25 + (index % 3) * 0.08,
              scrollTrigger: { trigger: card, start: "top 90%", once: true },
            });
          }
        });

        gsap.utils.toArray<HTMLImageElement>(".hero > img, .about-hero > img, .story-teaser > img").forEach((image) => {
          gsap.fromTo(image, { scale: 1.08, yPercent: -2 }, {
            scale: 1.16,
            yPercent: 8,
            ease: "none",
            scrollTrigger: { trigger: image.parentElement, start: "top top", end: "bottom top", scrub: 1.2 },
          });
        });

        gsap.utils.toArray<HTMLImageElement>(".collection-image img, .catalog-hero > img, .journal-item img").forEach((image) => {
          gsap.fromTo(image, { scale: 1.1, yPercent: -4 }, {
            scale: 1.04,
            yPercent: 5,
            ease: "none",
            scrollTrigger: { trigger: image.parentElement, start: "top bottom", end: "bottom top", scrub: 1 },
          });
        });

        gsap.fromTo(".final-word span", { xPercent: -12 }, {
          xPercent: 4,
          ease: "none",
          scrollTrigger: { trigger: ".final-word", start: "top bottom", end: "bottom top", scrub: 1 },
        });
        gsap.fromTo(".final-word strong", { xPercent: 12 }, {
          xPercent: -4,
          ease: "none",
          scrollTrigger: { trigger: ".final-word", start: "top bottom", end: "bottom top", scrub: 1 },
        });
        gsap.fromTo(".scroll-tiger", { y: 0, rotation: -3 }, { y: () => -(window.innerHeight * 0.66), rotation: 3, ease: "none", scrollTrigger: { trigger: document.documentElement, start: "top top", end: "bottom bottom", scrub: 0.6 } });
      }, document.body);

      const media = window.matchMedia("(hover: hover) and (pointer: fine)");
      const listeners: Array<() => void> = [];
      if (media.matches) {
        document.querySelectorAll<HTMLElement>(".collection-image, .product-art").forEach((frame) => {
          const target = frame.querySelector<HTMLElement>("img, strong");
          if (!target) return;
          const moveX = gsap.quickTo(target, "x", { duration: 0.55, ease: "power3.out" });
          const moveY = gsap.quickTo(target, "y", { duration: 0.55, ease: "power3.out" });
          const onMove = (event: PointerEvent) => {
            const bounds = frame.getBoundingClientRect();
            moveX(((event.clientX - bounds.left) / bounds.width - 0.5) * 12);
            moveY(((event.clientY - bounds.top) / bounds.height - 0.5) * 12);
          };
          const onLeave = () => { moveX(0); moveY(0); };
          frame.addEventListener("pointermove", onMove);
          frame.addEventListener("pointerleave", onLeave);
          listeners.push(() => {
            frame.removeEventListener("pointermove", onMove);
            frame.removeEventListener("pointerleave", onLeave);
          });
        });
      }

      ScrollTrigger.refresh();
      cleanup = () => {
        listeners.forEach((remove) => remove());
        context.revert();
      };
    }

    const startTimer = window.setTimeout(() => { void createMotion(); }, 500);
    return () => {
      disposed = true;
      window.clearTimeout(startTimer);
      cleanup();
    };
  }, [pathname]);

  return <><div className="tiger-climb" aria-hidden="true"><span /><img className="scroll-tiger" src={tiger} width={1024} height={1024} alt="" /></div></>;
}