import { useEffect } from "react";

/** Hero background parallax — matches the site's last known-good behaviour:
 *  active on desktop only (>=768px), respects prefers-reduced-motion. */
export function useHeroParallax(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || window.innerWidth < 768) return;

    let ticking = false;
    function update() {
      el.style.transform = `translateY(${window.scrollY * 0.35}px)`;
      ticking = false;
    }
    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [ref]);
}

/** Rellax-style speed-based parallax for a group of elements inside a
 *  container, keyed by a data-speed attribute. Desktop only. */
export function useRellax(containerRef) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || window.innerWidth < 768) return;

    const items = Array.from(container.querySelectorAll("[data-speed]"));
    if (!items.length) return;

    let ticking = false;
    function update() {
      const viewportCenter = window.innerHeight / 2;
      items.forEach(el => {
        const speed = parseFloat(el.dataset.speed) || 0;
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const delta = (viewportCenter - center) * speed * 0.08;
        el.style.transform = `translateY(${delta}px)`;
      });
      ticking = false;
    }
    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [containerRef]);
}
