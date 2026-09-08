'use client';

/**
 * The UAE services index's motion layer.
 *
 * Same two jobs, and the same safety rule, as the Accounting & Tax page's
 * Motion.tsx — reveal-on-scroll driven by a selector table, and a scroll-driven
 * transform on the artwork plates. It is a separate file rather than a shared
 * one because that page's table names nineteen of its own sections; the two
 * have no selector in common, and merging them would mean either page carrying
 * the other's list. If a third page wants this, the engine is what to lift.
 *
 * THE SAFETY RULE, restated because it is the part that matters: the stylesheet
 * renders everything VISIBLE by default. The hidden state exists only under
 * `[data-anim='pending']`, an attribute set here. So a bundle that fails to
 * load, is blocked, or throws leaves a complete page rather than a blank one.
 * Three further guards — reduced motion is honoured before anything is marked,
 * anything already on screen is revealed immediately rather than waiting for an
 * intersection that will never come, and a four-second sweep clears whatever is
 * left pending.
 *
 * THE PLATES. `.svcx-zoom` media is driven by one rAF loop over whatever is
 * currently in view, writing two custom properties the stylesheet turns into a
 * transform:
 *
 *   --vx-z   scale. 1 mid-screen, lifting toward 1.1 at either end of the
 *            element's travel.
 *   --vx-p   drift, -1..1 across that same travel. The stylesheet multiplies it
 *            by the plate's own `--throw`, so a full-bleed band and a plate
 *            inside a 4:3 frame can move by different amounts.
 *
 * Reveal transforms and plate transforms are never on the same element: the
 * frame reveals, the image inside it zooms.
 */

import { useEffect } from 'react';

/** What reveals, and how. `stagger` walks the children of one parent in turn. */
const GROUPS: { sel: string; variant: string; stagger?: boolean }[] = [
  { sel: '.svcx-hero__inner > *', variant: 'up', stagger: true },
  { sel: '.svcx-intro__col > *', variant: 'up', stagger: true },
  { sel: '.svcx-stat', variant: 'up', stagger: true },
  /* The figure arrives from the side it sits on, so the alternation is felt
     rather than only seen. */
  { sel: '.svcx-row:not(.svcx-row--flip) .svcx-row__media', variant: 'left' },
  { sel: '.svcx-row--flip .svcx-row__media', variant: 'right' },
  { sel: '.svcx-row__copy > *', variant: 'up', stagger: true },
  { sel: '.svcx-close__inner > *', variant: 'up', stagger: true },
];

export default function UaeServicesMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.svcx');
    if (!root) return;

    /* Asked for less motion: nothing is marked pending, so the stylesheet's
       visible default stands and no loop ever starts. */
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (typeof IntersectionObserver === 'undefined') return;

    const cleanups: (() => void)[] = [];

    /* ---------- 1. Reveal on scroll ---------- */

    const show = (el: Element) => {
      (el as HTMLElement).dataset.anim = 'in';
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          show(e.target);
          io.unobserve(e.target);
        }
      },
      /* A little past the fold, so a block has finished arriving by the time
         the reader's eye reaches it. */
      { rootMargin: '0px 0px -10% 0px', threshold: 0.06 },
    );
    cleanups.push(() => io.disconnect());

    const pending: HTMLElement[] = [];
    for (const g of GROUPS) {
      const seen = new Map<Element, number>();
      for (const el of root.querySelectorAll<HTMLElement>(g.sel)) {
        el.dataset.anim = 'pending';
        el.dataset.animVariant = g.variant;
        /* Stagger counts per parent, so six service rows each start from their
           own first child rather than continuing the previous row's delay. */
        if (g.stagger && el.parentElement) {
          const n = seen.get(el.parentElement) ?? 0;
          seen.set(el.parentElement, n + 1);
          el.style.setProperty('--vx-delay', `${Math.min(n, 6) * 70}ms`);
        }
        pending.push(el);
        io.observe(el);
      }
    }

    /* Anything already on screen when this runs never gets an intersection
       change, so reveal it now. */
    const vh = window.innerHeight || 0;
    for (const el of pending) {
      const r = el.getBoundingClientRect();
      if (r.top < vh && r.bottom > 0) {
        show(el);
        io.unobserve(el);
      }
    }

    /* Last resort, whatever the observer did. */
    const sweep = window.setTimeout(() => {
      for (const el of pending) if (el.dataset.anim === 'pending') show(el);
    }, 4000);
    cleanups.push(() => window.clearTimeout(sweep));

    /* ---------- 2. Zoom and drift on the plates ---------- */

    const zoomers = [...root.querySelectorAll<HTMLElement>('.svcx-zoom')];
    if (zoomers.length) {
      const inView = new Set<HTMLElement>();
      let frame = 0;

      const paint = () => {
        frame = 0;
        const h = window.innerHeight || 1;
        for (const el of inView) {
          const r = el.getBoundingClientRect();
          /* 0 when the element's top sits at the bottom of the viewport, 1 when
             its bottom has reached the top — its whole travel, whatever its
             height. */
          const span = r.height + h || 1;
          const p = Math.min(1, Math.max(0, (h - r.top) / span));
          const away = Math.abs(p - 0.5) * 2;
          el.style.setProperty('--vx-z', (1 + away * 0.1).toFixed(4));
          el.style.setProperty('--vx-p', (p * 2 - 1).toFixed(4));
        }
        if (inView.size) frame = requestAnimationFrame(paint);
      };

      const zio = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            const el = e.target as HTMLElement;
            if (e.isIntersecting) inView.add(el);
            else {
              inView.delete(el);
              el.style.setProperty('--vx-z', '1');
              el.style.setProperty('--vx-p', '0');
            }
          }
          /* The loop only exists while something is on screen. */
          if (inView.size && !frame) frame = requestAnimationFrame(paint);
        },
        { rootMargin: '10% 0px' },
      );
      for (const el of zoomers) zio.observe(el);

      cleanups.push(() => {
        zio.disconnect();
        if (frame) cancelAnimationFrame(frame);
      });
    }

    return () => {
      for (const fn of cleanups) fn();
    };
  }, []);

  return null;
}
