'use client';

/**
 * The UAE sub-service template's motion layer.
 *
 * Same contract as the service template's Motion.tsx, and deliberately the
 * same shape so the two behave alike — it is scoped to `.abk-root` and drives
 * that template's selectors only.
 *
 * THE SAFETY RULE. The stylesheet's default is VISIBLE. The hidden state exists
 * only under `[data-anim='pending']`, an attribute this file sets, so a bundle
 * that is blocked, fails or throws leaves a fully readable page rather than an
 * empty one. Two further guards: anything already on screen when this runs is
 * revealed immediately rather than left waiting for an intersection that will
 * never come, and a sweep after four seconds reveals whatever is still pending.
 *
 * THE PLATES. `.abk-zoom` media is driven by one rAF loop over whatever is in
 * view — not a scroll listener per element — writing two custom properties the
 * stylesheet turns into a transform:
 *
 *   --abk-z   scale. 1 mid-screen, lifting to 1.10 at either end of the
 *             element's travel: a zoom-out as it arrives, back in as it leaves.
 *   --abk-p   drift, -1..1 across the same travel. The stylesheet decides how
 *             far that throws and on which axis.
 */

import { useEffect } from 'react';

/** What reveals, and how. `stagger` walks siblings of one parent in sequence. */
const GROUPS: { sel: string; variant: string; stagger?: boolean }[] = [
  { sel: '.abk-hero__crumb, .abk-hero__title, .abk-hero__lede', variant: 'up', stagger: true },
  { sel: '.abk-brief__copy > *', variant: 'up', stagger: true },
  { sel: '.abk-panel', variant: 'right' },
  { sel: '.abk-why__card', variant: 'left' },
  { sel: '.abk-appr__rule, .abk-appr__eyebrow', variant: 'up', stagger: true },
  { sel: '.abk-appr__col', variant: 'up', stagger: true },
  { sel: '.abk-ins__head > *', variant: 'up', stagger: true },
  /* The cards, not the rail. Revealing the rail would put data-anim on the
     element that scrolls, and [data-anim='in'] sets the whole `transition`
     shorthand — which would land on the scroller rather than on the cards. */
  { sel: '.abk-card', variant: 'up', stagger: true },
  { sel: '.abk-case__photo', variant: 'left' },
  { sel: '.abk-case__panel', variant: 'right' },
  { sel: '.abk-band__box', variant: 'up' },
  { sel: '.abk-vision__step', variant: 'up', stagger: true },
  { sel: '.abk-vision__side > *', variant: 'up', stagger: true },
  /* NOT `.vxn-svc-card`. Those cards animate by `flex-grow .65s` on hover, and
     [data-anim] sets the whole `transition` shorthand at equal specificity from
     further down the sheet — it would replace that list and the strip would
     snap open with no animation. The strip is full-bleed and arrives already
     in view often enough that it does not need one. */
  { sel: '.abk-talk__fig', variant: 'left' },
  { sel: '.abk-talk__copy > *', variant: 'up', stagger: true },
];

export default function SubServiceTemplateMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.abk-root');
    if (!root) return;

    /* Asked for less motion: nothing is marked pending, so the stylesheet's
       visible default stands and no loop ever starts. */
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      typeof IntersectionObserver === 'undefined'
    ) {
      return;
    }

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
      /* A little past the fold, so a block has finished arriving by the time the
         reader's eye reaches it rather than animating under their nose. */
      { rootMargin: '0px 0px -10% 0px', threshold: 0.08 },
    );
    cleanups.push(() => io.disconnect());

    const pending: HTMLElement[] = [];
    for (const g of GROUPS) {
      /* Stagger counts per parent, so the three approach columns start from
         their own first child rather than continuing the hero's sequence. */
      const seen = new Map<Element, number>();
      for (const el of root.querySelectorAll<HTMLElement>(g.sel)) {
        el.dataset.anim = 'pending';
        el.dataset.animVariant = g.variant;
        if (g.stagger && el.parentElement) {
          const n = seen.get(el.parentElement) ?? 0;
          seen.set(el.parentElement, n + 1);
          el.style.setProperty('--abk-delay', `${Math.min(n, 6) * 80}ms`);
        }
        pending.push(el);
        io.observe(el);
      }
    }

    /* Anything already on screen when this runs never gets an intersection
       change — the hero, on every load — so reveal it now. */
    const vh = window.innerHeight || 0;
    for (const el of pending) {
      const r = el.getBoundingClientRect();
      if (r.top < vh && r.bottom > 0) {
        show(el);
        io.unobserve(el);
      }
    }

    const sweep = window.setTimeout(() => {
      for (const el of pending) if (el.dataset.anim === 'pending') show(el);
    }, 4000);
    cleanups.push(() => window.clearTimeout(sweep));

    /* ---------- 2. Zoom and drift on the plates ---------- */

    const zoomers = [...root.querySelectorAll<HTMLElement>('.abk-zoom')];
    if (zoomers.length) {
      const inView = new Set<HTMLElement>();
      let frame = 0;

      const paint = () => {
        frame = 0;
        const h = window.innerHeight || 1;
        for (const el of inView) {
          const r = el.getBoundingClientRect();
          /* 0 when the element's top sits at the bottom of the viewport, 1 when
             its bottom has reached the top — its whole travel across the
             screen, whatever its height. */
          const span = r.height + h || 1;
          const p = Math.min(1, Math.max(0, (h - r.top) / span));
          const away = Math.abs(p - 0.5) * 2;
          el.style.setProperty('--abk-z', (1 + away * 0.1).toFixed(4));
          el.style.setProperty('--abk-p', (p * 2 - 1).toFixed(4));
        }
        if (inView.size) frame = requestAnimationFrame(paint);
      };

      const zio = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            const el = e.target as HTMLElement;
            if (e.isIntersecting) {
              inView.add(el);
            } else {
              inView.delete(el);
              el.style.setProperty('--abk-z', '1');
              el.style.setProperty('--abk-p', '0');
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
