/**
 * /en-ae/services/accounting-tax-services/accounting-bookkeeping/ — the page.
 *
 * A bespoke body, registered in ../../index.ts and dispatched by the
 * [service]/[sub] route. Like the parent Accounting & Tax page it owns its
 * whole page: it opens its own #main-content wrapper and leads with its own
 * hero, so the shared breadcrumb band is NOT rendered above it.
 *
 * ---------------------------------------------------------------------------
 * THE STYLESHEET IS A FILE, NOT A <style> BLOCK
 *
 * public/assets/css/accounting-bookkeeping.css, declared by this page's
 * PageConfig as `site_css` and emitted by HeadAssets after the brand and
 * landing sheets. That is the one structural difference from AccountingTaxBody,
 * which carries its CSS inline. It was asked for that way, and it buys two
 * things: the sheet is cached separately from the HTML, and it is in <head>
 * before first paint rather than mid-body — so there is no window in which the
 * page renders unstyled. It also loads LAST, which is what lets a plain
 * `.abk-*` selector outrank the theme without reaching for `!important`.
 *
 * Nothing in this file sets a style attribute. Every rule lives in that sheet.
 *
 * ---------------------------------------------------------------------------
 * THE FOUR SECTIONS, and what each one is doing
 *
 *   1  HERO       A full-bleed plate with the copy hanging off its foot and a
 *                 progressive blur rising out of the bottom edge — four stacked
 *                 backdrop-filters, each masked to start lower than the last.
 *                 The blur band sits under the copy in the z-order, and the
 *                 hero's bottom padding keeps the text clear of it.
 *
 *   2  BRIEF      An editorial column beside a blue panel. The column is plain
 *                 prose and two 2-up lists; the panel is the supplied brand
 *                 ramp over an abstract plate, with the mark at the top and the
 *                 title at the foot.
 *
 *   3  WHY US     A wide picture band with a frosted card floated on it. The
 *                 frost is its OWN layer inside the card rather than a filter
 *                 on the card itself, which is the only way the card can
 *                 dissolve into the photograph at its right edge without taking
 *                 the text with it.
 *
 *   4  APPROACH   A rule, an eyebrow, three columns. No card, no border, no
 *                 background — the whitespace is the design.
 *
 * ---------------------------------------------------------------------------
 * MOTION. Hover changes colour and light, never position: there is no
 * `transform` under any `:hover` rule in the stylesheet. Scroll reveals come
 * from ./Motion.tsx by selector, and the stylesheet's default is visible — a
 * failed bundle cannot produce a blank page.
 */
import type React from 'react';

import HomeIndustriesRow from '@/components/sections/HomeIndustriesRow';
import { rurl } from '@/lib/region';
import { rimg, rimgFirst } from '@/lib/region-assets';

import AccountingBookkeepingMotion from './Motion';
import {
  ABK_APPROACH,
  ABK_BAND,
  ABK_BRIEF,
  ABK_CASE,
  ABK_HERO,
  ABK_INSIGHTS,
  ABK_STRIP,
  ABK_TALK,
  ABK_VISION,
  ABK_WHY,
  type AbkPoint,
} from './content';

/* -------------------------------------------------------------------------
   Small pieces
   ------------------------------------------------------------------------- */

function ArrowRight() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
      <path d="M1 8h13M9.5 3.5 14 8l-4.5 4.5" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function Plus() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
      <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function ArrowUpRight() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
      <path d="M4.5 11.5 11.5 4.5M5.5 4.5h6v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckCircle() {
  return (
    <svg viewBox="0 0 22 22" fill="none" aria-hidden="true" focusable="false">
      <circle cx="11" cy="11" r="9.25" stroke="currentColor" strokeWidth="1.3" />
      <path d="m7.2 11.3 2.6 2.5 5-5.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * One point in a two-column list.
 *
 * `stress` is a substring of `text` to underline, the way the reference marks a
 * key term mid-sentence. Matched rather than authored as HTML so content.ts
 * stays plain strings — nothing in this page is ever dangerouslySetInnerHTML,
 * and a phrase that no longer appears in the text simply renders unmarked
 * instead of throwing or printing a tag.
 */
function Point({ point }: { point: AbkPoint }) {
  const { lead, text, stress } = point;
  let rest: React.ReactNode = text;

  if (stress) {
    const at = text.indexOf(stress);
    if (at !== -1) {
      rest = (
        <>
          {text.slice(0, at)}
          <u>{stress}</u>
          {text.slice(at + stress.length)}
        </>
      );
    }
  }

  return (
    <li>
      <b>{lead}</b> {rest}
    </li>
  );
}

/* -------------------------------------------------------------------------
   The page
   ------------------------------------------------------------------------- */

export default function AccountingBookkeepingBody({ region }: { region: string }) {
  const crumbs = [
    { label: 'Services', href: '/services/' },
    { label: 'Accounting & Tax', href: '/services/accounting-tax-services/' },
  ];

  return (
    <div className="abk-root" id="main-content">
      {/* ================= 1. HERO ================= */}
      <section className="abk-hero">
        <div className="abk-hero__media abk-zoom">
          <img src={rimg(region, ABK_HERO.image)} alt={ABK_HERO.alt} fetchPriority="high" />
        </div>
        <div className="abk-hero__scrim" aria-hidden="true" />

        {/* Four layers, not one. Each adds its own blur on top of the ones
            before it, so the strength ramps from nothing to 22px down the band
            — which a single masked backdrop-filter cannot do. */}
        <div className="abk-hero__blur" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </div>
        <div className="abk-hero__wash" aria-hidden="true" />

        <div className="abk-hero__inner">
          {/* One column. The reference put a "Contact us" link opposite the
              copy; removed by request, and the grid went with it — a two-column
              grid with nothing in its second track just narrows the paragraph
              for no reason. */}
          <div className="abk-hero__grid">
            <div>
              <nav className="abk-hero__crumb" aria-label="Breadcrumb">
                {crumbs.map((c) => (
                  <span key={c.href}>
                    <a href={rurl(region, c.href)}>{c.label}</a>
                    <span aria-hidden="true"> /</span>
                  </span>
                ))}
                <span>{ABK_HERO.title}</span>
              </nav>

              <h1 className="abk-hero__title">{ABK_HERO.title}</h1>
              <p className="abk-hero__lede">{ABK_HERO.lede}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 2. THE BRIEF ================= */}
      <section className="abk-brief">
        <div className="abk-in">
          <div className="abk-brief__grid">
            <div className="abk-brief__copy">
              <p>{ABK_BRIEF.lede}</p>
              <p>{ABK_BRIEF.whatIntro}</p>

              <ul className="abk-brief__list">
                {ABK_BRIEF.what.map((p) => (
                  <Point key={p.lead} point={p} />
                ))}
              </ul>

              <p>{ABK_BRIEF.howIntro}</p>

              <ul className="abk-brief__list">
                {ABK_BRIEF.how.map((p) => (
                  <Point key={p.lead} point={p} />
                ))}
              </ul>
            </div>

            <figure className="abk-panel">
              <div className="abk-panel__media abk-zoom">
                <img src={rimg(region, ABK_BRIEF.panel.image)} alt={ABK_BRIEF.panel.alt} loading="lazy" />
              </div>
              <div className="abk-panel__glow" aria-hidden="true" />

              {/* The wordmark alone. A decorative burger glyph sat opposite it
                  in the reference; removed by request — it read as a control
                  that opens nothing. */}
              <div className="abk-panel__top">
                <span className="abk-panel__mark">{ABK_BRIEF.panel.mark}</span>
              </div>

              <figcaption className="abk-panel__foot">
                <p className="abk-panel__title">{ABK_BRIEF.panel.title}</p>
                <p className="abk-panel__sub">{ABK_BRIEF.panel.sub}</p>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ================= 3. WHY US ================= */}
      <section className="abk-why">
        <div className="abk-in">
          <div className="abk-why__band">
            <div className="abk-why__media abk-zoom">
              <img src={rimg(region, ABK_WHY.image)} alt={ABK_WHY.alt} loading="lazy" />
            </div>
            <div className="abk-why__tint" aria-hidden="true" />

            <div className="abk-why__card">
              <span className="abk-why__pill">{ABK_WHY.pill}</span>

              {/* A link to the same place the button goes, not a <button> that
                  does nothing. The reference shows a round "+" in the corner;
                  giving it the card's own destination is the one reading of it
                  that leaves no dead control on the page. */}
              <a
                className="abk-why__plus"
                href={rurl(region, ABK_WHY.cta.href)}
                aria-label={ABK_WHY.cta.label}
              >
                <Plus />
              </a>

              <h2 className="abk-why__title">
                {ABK_WHY.titleTop}
                <br />
                {ABK_WHY.titleMid}
                <br />
                <span className="abk-why__mark">{ABK_WHY.titleMark}</span>
              </h2>

              <p className="abk-why__note">{ABK_WHY.note}</p>

              <a className="abk-why__btn" href={rurl(region, ABK_WHY.cta.href)}>
                {ABK_WHY.cta.label}
                <ArrowRight />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 4. OUR APPROACH ================= */}
      <section className="abk-appr">
        <div className="abk-in">
          <div className="abk-appr__rule" aria-hidden="true" />
          <p className="abk-appr__eyebrow">{ABK_APPROACH.eyebrow}</p>

          <div className="abk-appr__grid">
            {ABK_APPROACH.columns.map((c) => (
              <div className="abk-appr__col" key={c.title}>
                <h3 className="abk-appr__h">{c.title}</h3>
                <p className="abk-appr__p">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 5. INSIGHTS RAIL ================= */}
      {/* The card's whole interaction is CSS — :hover and :focus-within on the
          <li>, nothing else. No JavaScript listens to this section, so it works
          before hydration and keeps working if the bundle never arrives.

          The <a> wraps the media and the glass together rather than sitting
          inside the glass, so the entire card is the hit target and keyboard
          focus lands once per card instead of twice. */}
      <section className="abk-ins">
        <div className="abk-in">
          <div className="abk-ins__head">
            <div className="abk-ins__intro">
              <h2 className="abk-ins__h">{ABK_INSIGHTS.title}</h2>
              <p className="abk-ins__lede">{ABK_INSIGHTS.lede}</p>
            </div>
            <a className="abk-ins__all" href={rurl(region, ABK_INSIGHTS.all.href)}>
              {ABK_INSIGHTS.all.label}
            </a>
          </div>

          {/* Four across, inside the container — no scroller. The count in
              content.ts is load-bearing: the grid is four columns, so a fifth
              entry would start a second row holding one card. */}
          <ul className="abk-ins__rail">
            {ABK_INSIGHTS.cards.map((c) => (
              <li className="abk-card" key={c.title}>
                <a className="abk-card__link" href={rurl(region, c.href)}>
                  <span className="abk-card__media">
                    <img src={rimg(region, c.image)} alt={c.alt} loading="lazy" />
                  </span>

                  <span className="abk-card__pill">{c.category}</span>

                  <span className="abk-card__glass">
                    <span className="abk-card__meta">
                      <b>{c.kind}</b>
                      <i>{c.date}</i>
                    </span>

                    <span className="abk-card__title">{c.title}</span>

                    <span className="abk-card__excerpt">{c.excerpt}</span>

                    <span className="abk-card__btn">
                      {ABK_INSIGHTS.all.label}
                      <ArrowRight />
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>


      {/* ================= 6. SUCCESS STORY ================= */}
      {/* Two panels, one band. They share a row and a height, and the gap
          between them is narrow so the pair reads as one object split down the
          middle rather than as two cards that happen to be adjacent. */}
      <section className="abk-case">
        <div className="abk-in">
          <div className="abk-case__grid">
            <figure className="abk-case__photo">
              <img src={rimg(region, ABK_CASE.photo)} alt={ABK_CASE.alt} loading="lazy" />

              {/* Same frosted treatment as the Why Us card — the frost is its
                  own masked layer inside the box, so the panel dissolves into
                  the photograph at its right edge with the text still sharp. */}
              <blockquote className="abk-case__quote">
                <span className="abk-case__mark" aria-hidden="true">
                  &rdquo;
                </span>
                <p className="abk-case__said">{ABK_CASE.quote}</p>
                <footer className="abk-case__by">
                  <span className="abk-case__avatar" aria-hidden="true">
                    {ABK_CASE.initials}
                  </span>
                  <span className="abk-case__who">
                    <b>{ABK_CASE.role}</b>
                    <i>{ABK_CASE.org}</i>
                  </span>
                </footer>
              </blockquote>
            </figure>

            <div className="abk-case__panel">
              <a
                className="abk-case__arrow"
                href={rurl(region, ABK_CASE.arrow.href)}
                aria-label={ABK_CASE.arrow.label}
              >
                <ArrowUpRight />
              </a>

              <span className="abk-case__pill">{ABK_CASE.pill}</span>
              <h2 className="abk-case__h">{ABK_CASE.title}</h2>

              {/* The result and the button share the panel's foot, which is why
                  they are one row rather than two stacked blocks. */}
              <div className="abk-case__foot">
                <div className="abk-case__result">
                  <p className="abk-case__stat">{ABK_CASE.stat}</p>
                  <p className="abk-case__note">{ABK_CASE.note}</p>
                </div>
                <a className="abk-case__cta" href={rurl(region, ABK_CASE.cta.href)}>
                  {ABK_CASE.cta.label}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 7. THE BAND ================= */}
      <section className="abk-band">
        <div className="abk-in">
          <div className="abk-band__box">
            <span className="abk-band__media abk-zoom">
              <img src={rimg(region, ABK_BAND.image)} alt={ABK_BAND.alt} loading="lazy" />
            </span>
            <span className="abk-band__tint" aria-hidden="true" />

            <div className="abk-band__inner">
              <h2 className="abk-band__h">{ABK_BAND.title}</h2>
              <div className="abk-band__side">
                <p className="abk-band__p">{ABK_BAND.body}</p>
                <a className="abk-band__cta" href={rurl(region, ABK_BAND.cta.href)}>
                  {ABK_BAND.cta.label}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 8. FOCUS AND VISION ================= */}
      <section className="abk-vision">
        <div className="abk-in">
          <div className="abk-vision__grid">
            {/* An ordered list, because these are three parts of one statement
                read in sequence — which is also what the rail down their left
                is drawing. */}
            <ol className="abk-vision__steps">
              {ABK_VISION.steps.map((s) => (
                <li className="abk-vision__step" key={s.title}>
                  <span className="abk-vision__ico" aria-hidden="true">
                    <CheckCircle />
                  </span>
                  <div className="abk-vision__body">
                    <h3 className="abk-vision__h">{s.title}</h3>
                    <p className="abk-vision__p">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="abk-vision__side">
              <span className="abk-vision__pill">{ABK_VISION.pill}</span>
              <p className="abk-vision__quote">{ABK_VISION.quote}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 9. THE EXPANDING STRIP ================= */}
      {/* The home page's own component, not a copy of it — so the expand and
          desaturate on hover is the same CSS (.vxn-svc-card in
          valunxt-brand.css) rather than a second implementation that can drift
          from it. Only the list differs.

          It sits OUTSIDE .abk-in on purpose: the .vxn-home-svc-section variant
          strips the container's padding and max-width to run the row full
          bleed, edge to edge, with no gaps and no radii. */}
      <HomeIndustriesRow region={region} items={ABK_STRIP} />

      {/* ================= 10. TALK TO AN EXPERT ================= */}
      {/* Duplicated from /en-ae/services/accounting-tax-services/ by request —
          same copy, same plate, same squared button. The parent carries its CSS
          inline under .at-root, which cannot reach this page, so the rules are
          restated in the stylesheet under .abk-talk with the parent's values
          resolved rather than its tokens. */}
      <section className="abk-talk" aria-labelledby="abk-talk-head">
        <div className="abk-in">
          <div className="abk-talk__grid">
            {/* Decorative: the copy beside it says what it shows. */}
            <figure className="abk-talk__fig">
              <img src={rimgFirst(region, ABK_TALK.image)} alt="" loading="lazy" />
            </figure>

            <div className="abk-talk__copy">
              <h2 className="abk-talk__head" id="abk-talk-head">
                {ABK_TALK.head}
              </h2>
              <p className="abk-talk__lede">{ABK_TALK.lede}</p>
              <a className="abk-talk__cta" href={rurl(region, ABK_TALK.cta.href)}>
                {ABK_TALK.cta.label}
              </a>
            </div>
          </div>
        </div>
      </section>

      <AccountingBookkeepingMotion />
    </div>
  );
}
