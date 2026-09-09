/**
 * /en-ae/services/accounting-tax-services/ — the written parent service page.
 *
 * The other five UAE services share ServicePageBody's five-section shape. This
 * one does not, because the source document is a fifteen-section commercial
 * page: a decision table, a capability comparison, a pricing rail, an industry
 * grid, a five-step process and twelve FAQs. Bending the shared template to
 * hold that would leave the other five services carrying fields they never set.
 *
 * SECTION ORDER IS FROM THE SOURCE, not chosen here. It closes with a
 * development instruction — hero, proof, a short problem statement, then the
 * eight service cards, "the commercial centre of the page", and "do not allow
 * generic accounting education to push the eight services down the page".
 *
 * ---------------------------------------------------------------------------
 * THE VISUAL SYSTEM
 *
 * The first pass read as a stack of unrelated blocks: every section was a flat
 * band, each one started and stopped at a hard edge, and the only thing between
 * two of them was a change of background colour. Three things fix that, and
 * they are the whole of this rewrite.
 *
 * 1. ARTWORK, NOT COLOUR, CARRIES THE DARK BANDS. Four plates in
 *    uploads/banners and uploads/homepage do the work: abstract-2 under the
 *    hero, abstract-3 (navy with a gold filament sweep) under the closing band
 *    and the tax rail, texture-1 and texture-2 in the figures and behind cards.
 *    Every one of them is on .at-zoom, so it scales and drifts against the
 *    scroll — see Motion.tsx. A plate that moves is what stops a full-bleed
 *    band reading as a rectangle of paint.
 *
 * 2. SECTIONS OVERLAP RATHER THAN BUTT. The proof strip is a white panel that
 *    sits ON the foot of the hero, and the closing band's plate runs under the
 *    form above it. An overlap is what tells the eye two bands belong to one
 *    page; a seam tells it they were pasted together.
 *
 * 3. ONE SPACING SCALE. --pad, --gap, --cardpad and --radius are declared once
 *    on .at-root and every section reads them, so no two grids can drift apart
 *    and the rhythm down the page is even at all three breakpoints.
 *
 * ---------------------------------------------------------------------------
 * HOVER MOVES NOTHING
 *
 * Every hover state here changes colour, light or coverage — never position.
 * There is no `transform` under any `:hover` rule in this file, deliberately:
 * a grid of eight cards that each jump 5px on approach is restless to read, and
 * on a trackpad it flickers as the pointer crosses a gap. What replaced it:
 *
 *   the texture      a plate already inside the card, fading up from 0
 *   the accent       a rule wiped in with clip-path, which paints without
 *                    moving the element or forcing a reflow
 *   the arrow        the link's own `gap` opens, so the glyph travels without
 *                    a transform on anything
 *
 * ---------------------------------------------------------------------------
 * MOTION, and the rule that matters most
 *
 *   hover        CSS only. Never gated on JavaScript.
 *   reveal       Motion.tsx, by selector. The stylesheet's default is VISIBLE;
 *                the hidden state exists only under [data-anim='pending'],
 *                which that file sets — so a failed bundle cannot produce a
 *                blank page. See its header for the rest of the guards.
 *   plates       .at-zoom, also Motion.tsx: one rAF loop writing --at-z and
 *                --at-p, which this stylesheet turns into scale and drift.
 *
 * The glass panels run their own aurora on an infinite 'alternate' cycle — no
 * seam, because alternate eases back to where it began — and that is pure CSS
 * with no observer behind it.
 *
 * TYPE AND !IMPORTANT. The Elementor kit styles bare h2/h3/p/table at a
 * specificity these classes cannot reach on their own, which is why every type
 * declaration below is marked. Same reason ServicePageBody marks its own.
 */
import type React from "react";

import { BASE, rurl, vxnServiceName, vxnServices } from "@/lib/region";
import { rimgFirst } from "@/lib/region-assets";
import AccountingTaxMotion from "./Motion";
import type { AtService } from "./content";
import {
  AT_BANNER,
  AT_CLOSE,
  AT_HERO,
  AT_PROOF,
  AT_SERVICES,
  AT_SOLUTION,
  AT_WHY_CLOSE,
} from "./content";

/** Every sub-service link on the page hangs off this one prefix. */
const SUB = "/services/accounting-tax-services/";

/**
 * A photograph per service, for the explorer's detail panel.
 *
 * Same candidate convention as PLATE below: a purpose-shot filename first, an
 * existing library photograph behind it, so commissioning eight proper shots is
 * a drop into uploads/services/ and no code change at all.
 *
 * The library files are picked for what they show, not for what they are called
 * — services-2 is the one abstract of the eight because forecasting has nothing
 * literal to photograph. accounting-and-tax-services.webp is deliberately NOT
 * used here: it is the 6206×3888 original at 877KB, and the capability section
 * further down already spends it.
 */
const EXPLORE_FIGURE: Record<string, string[]> = {
  "accounting-bookkeeping": [
    "services/at-explore-accounting-bookkeeping.webp",
    "new-folder/services-1.webp",
  ],
  "cfo-services": [
    "services/at-explore-cfo-services.webp",
    "new-folder/client-success-2.webp",
  ],
  "management-reporting": [
    "services/at-explore-management-reporting.webp",
    "new-folder/services-3.webp",
  ],
  "budgeting-forecasting": [
    "services/at-explore-budgeting-forecasting.webp",
    "new-folder/services-2.webp",
  ],
  "financial-reporting": [
    "services/at-explore-financial-reporting.webp",
    "new-folder/insights-2.webp",
  ],
  "external-audit-support": [
    "services/at-explore-external-audit-support.webp",
    "new-folder/insights-3.webp",
  ],
  "corporate-tax-services": [
    "services/at-explore-corporate-tax-services.webp",
    "homepage/client-2.webp",
  ],
  "vat-services": [
    "services/at-explore-vat-services.webp",
    "new-folder/insights-1.webp",
  ],
};

/**
 * A photograph per related service line, for the cards in section 4.
 *
 * NOT Service.img FROM THE REGISTRY, which is what these cards used first. That
 * field points at the full-bleed original each service page opens with, and
 * those files are enormous — valuation-and-advisory.webp alone is 9.9MB at
 * 6206px wide. Five of them behind five 338x116 cards was 24MB of image for
 * roughly a postage stamp each, which would have made this page unusable on a
 * phone.
 *
 * The library files below are 24KB-406KB and 1024-1920px: about 1.2MB for the
 * five. Same candidate convention as PLATE and EXPLORE_FIGURE, so dropping a
 * properly cropped services/at-related-<slug>.webp in replaces the stand-in
 * with no code change. A service line with no entry here still renders — it
 * falls through to its registry image, heavy but not missing.
 */
const RELATED_FIGURE: Record<string, string[]> = {
  "real-estate-transactions": [
    "services/at-related-real-estate-transactions.webp",
    "new-folder/real-estate-wealth-advisory-1.webp",
  ],
  "mortgages-services": [
    "services/at-related-mortgages-services.webp",
    "new-folder/houzzhunt-mortgage-1.webp",
  ],
  "valuation-and-advisory": [
    "services/at-related-valuation-and-advisory.webp",
    "new-folder/reliant-surveyors-2.webp",
  ],
  "research-intelligence": [
    "services/at-related-research-intelligence.webp",
    "new-folder/research-intelligence-1.webp",
  ],
  "technology-data-ai": [
    "services/at-related-technology-data-ai.webp",
    "new-folder/technology-ai-1.webp",
  ],
};

/**
 * The plates, in the order they read down the page.
 *
 * Each is a candidate list in the house convention: a purpose-shot filename
 * first, the supplied library plate last, so dropping a commissioned file into
 * uploads replaces the stand-in with no code change and a market can override
 * either under uploads/regions/<slug>/.
 *
 * THE .webp BEFORE THE .png IS NOT DECORATION. abstract-2 and abstract-3 were
 * supplied as PNG at 1.2MB and 2.1MB — 3.2MB of decoration on one page, and
 * 1.2MB of it above the fold. Re-encoded at q82 they are 24KB and 102KB, with
 * no visible difference on a gradient this smooth. The PNGs stay in the repo
 * and stay last in the list, so nothing breaks if a .webp is ever removed.
 */
const PLATE = {
  /* Abstract, by request, in place of the Palm Jumeirah aerial: abstract-3,
     deep navy with a gold filament sweep.

     WHY THIS ONE OF THE THREE. Measured across the band the copy occupies, in
     80px columns: abstract-2 is too bright almost everywhere; abstract-1 holds
     4.5:1 only for its first 320px and then the filaments come up, which is
     narrower than the headline; abstract-3 runs 5.2–11:1 the whole way across.

     AND IT ENDS THE OVERLAYS. Any photograph puts unpredictable brightness
     under white type — the aerial needed a scrim on phones, because a portrait
     viewport always shows a landscape photo's full height, island included. An
     abstract has no such accident in it: dark is where it is dark at every
     width, so the hero now carries nothing over it on any screen.

     It is the same plate as the rail and the close. That is deliberate — the
     page opens and closes on it — and it is why the hero got the gold sweep
     rather than a fourth piece of artwork nobody has seen.
     uae-slider-1-hero.webp stays in uploads, unused. */
  /* THE HERO ARTWORK IS NOW A RIGHT-HAND OBJECT, NOT A FULL-BLEED PLATE. The
     banner's own left-to-right blue ramp carries the band; this file is the
     sculpture that sits in its right half behind a horizontal mask (see
     .at-hero__art). abstract-2 is the stand-in because it is the glossiest of
     the three and the only one that is bright the whole way across — a dark
     plate has nothing to catch the light the ramp is throwing at it.

     abstract-3 moved to the rail and the close, which is where the gold sweep
     was always doing the work. Drop services/accounting-tax-hero.webp in and
     it takes over with no code change. */
  hero: [
    "services/accounting-tax-hero.webp",
    "homepage/abstract-2.webp",
    "homepage/abstract-2.png",
  ],
  /* The intro band's photograph. Landscape, people, and a working scene — the
     band is the page's proposition and the picture has to look like the work
     rather than like a stock office. accounting-and-tax-services.webp is not a
     candidate here: the capability section already spends it. */
  /* services-1 moved to the service strip, which shows it at the top of the
     eight panels — the same photograph twice inside one screen of scrolling
     read as a mistake. who-we-are-2 is the better fit here anyway: it is the
     one library shot with ValuNxt's own branding in it. */
  intro: ["services/accounting-tax-intro.webp", "new-folder/who-we-are-2.webp"],
  /* The closing band's photograph. A meeting, not a desk: the section asks the
     reader to talk to someone. */
  talk: ["services/accounting-tax-talk.webp", "new-folder/career-1.webp"],
  /* The banner card's right half — the picture in the 50/50 split.

     uae-slider-3 is a pale periwinkle field with a bright blue glass form in
     its right two-thirds, so the card reads dark-to-light across the join
     rather than blue-into-blue. That contrast is the point now: with no mask
     between the halves, a plate close to the ramp's own value would make the
     split look like a mistake instead of a choice.

     WHERE THE FORM SITS STILL MATTERS. The left third of the file is a flat
     field, and that is the third sitting against the ramp's edge — a busy left
     edge would fight the join it is butted up against. */
  banner: ["services/accounting-tax-banner.webp", "banners/uae-slider-3.webp"],
};

const CSS = `
.at-root{
  /* Palette */
  --ny:#0E355F;
  --ny2:#0053B7;
  --ny3:#00408C;
  --body:#4d5863;
  --muted:#6A7590;
  --gold:#F5B301;
  /* The supplied brand ramp. Everything blue in the service strip is painted
     with this one gradient — the description card, the number badges and the
     filled arrow — so the section reads as one colour rather than as three
     flat blues that happen to be near each other. */
  --brand:linear-gradient(150deg,#0E3FA8 0%,#1436D8 48%,#0B2DBE 100%);
  --line:rgba(14,53,95,.12);
  --line2:rgba(14,53,95,.08);
  --tint:#F4F8FD;
  --tint2:#EDF3FB;

  /* One spacing scale for the whole page. Every section, grid and card reads
     these, so nothing can drift out of step with anything else.

     --maxw is 1440 on this page by request: the eight service cards, the
     comparison table and the five-column process all had more to say than a
     1280 measure gave them room for. Note the trade — the subscribe block and
     the footer under this page still render in a 1280 box, so above 1488px
     this page's bands run 80px wider on each side than the chrome around
     them. Everything within the page still starts and ends on one pair of
     vertical lines, which is what the scale is for. */
  /* 40px, flat, at every width — the UAE services house rule the rest of the
     section already follows (see ServicePageBody and UaeServicesBody). This page
     was the exception at 88/72/60/52, which is why it read as a different
     template from the five services beside it. The horizontal gutter still
     lives on the inner wrapper, so 0 here cannot let copy touch the edge. */
  --pad:40px;
  --gutter:24px;
  --maxw:1440px;
  --gap:24px;
  --cardpad:24px;
  --radius:18px;
  --headgap:44px;

  font-family:"DM Sans",sans-serif;
  background:#fff;
}
/* border-box across the page. Without it --maxw sets the CONTENT box and the
   gutter is added outside it, so a 1280 container measured 1328 and no two
   things that declared the same width actually shared an edge. This is the
   single declaration that makes "equal width" true rather than approximately
   true. */
.at-root,.at-root *,.at-root *::before,.at-root *::after{box-sizing:border-box;}

.at-root section{padding:var(--pad) 0;}
/* The hero is a banner rather than a band: its height comes from min-height and
   its copy hangs off the bottom, so the 40px is what sits under the last line
   rather than what sets the band's size. */
/* The one container. Every band on the page uses it or copies it exactly. */
.at-in,.at-hero__inner{
  width:100%;max-width:var(--maxw);margin:0 auto;padding:0 var(--gutter);
}

/* ==========================================================================
   PLATES — the shared artwork layer.

   One class for every plate on the page. It is always absolutely positioned,
   always object-fit:cover, and always driven by Motion.tsx: --at-z scales it
   and --at-p drifts it, so the artwork moves against the scroll while the copy
   over it stays where it was set. The '--throw' each plate declares is how far
   it drifts — a full-bleed band can take 26px without showing its edge; a
   plate inside a 280px card cannot.
   ========================================================================== */
.at-plate{
  position:absolute;inset:calc(var(--throw,18px) * -1) 0;
  width:100%;height:calc(100% + var(--throw,18px) * 2);
  object-fit:cover;pointer-events:none;
  z-index:-2;
}
.at-zoom{
  transform:translate3d(0,calc(var(--at-p,0) * var(--throw,18px)),0) scale(var(--at-z,1));
  transform-origin:center;
  will-change:transform;
}

/* ---- Shared type -------------------------------------------------------- */
/* The eyebrow. It was a rule and a word — the same mark the rest of the site
   uses, which made every section on this page open the same anonymous way. It
   is a badge now: a tinted pill with a lit dot, so a section label reads as an
   object rather than as a line of small caps floating above the heading. */
.at-kicker{
  display:inline-flex;align-items:center;gap:9px;
  padding:7px 15px 7px 12px!important;border-radius:999px;
  background:rgba(0,83,183,.07);border:1px solid rgba(0,83,183,.18);
  font-size:11px!important;font-weight:700!important;letter-spacing:.15em!important;
  text-transform:uppercase;color:var(--ny2)!important;margin:0 0 18px!important;
}
.at-kicker::before{
  content:"";flex:0 0 auto;width:7px;height:7px;border-radius:50%;
  background:currentColor;box-shadow:0 0 0 3px rgba(0,83,183,.14);
}
.at-h2{
  font-family:"Forum",serif!important;font-weight:400!important;
  color:var(--ny)!important;
  font-size:clamp(28px,3.4vw,42px)!important;line-height:1.13!important;
  margin:0 0 16px!important;max-width:38ch;
}
.at-lede{
  color:var(--body)!important;font-size:17px!important;line-height:1.7!important;
  margin:0 0 10px!important;max-width:76ch;
}
.at-sec__head{margin-bottom:var(--headgap);}
/* ---- Buttons ------------------------------------------------------------
   No transform on hover anywhere. The arrow travels because the flex 'gap'
   opens, not because the glyph is moved. */
.at-btn{
  display:inline-flex;align-items:center;gap:10px;
  padding:15px 28px;border-radius:999px;
  font-size:15px;font-weight:600;line-height:1;text-decoration:none!important;
  transition:background-color .25s ease,color .25s ease,border-color .25s ease,
             box-shadow .3s ease,gap .3s cubic-bezier(.22,.61,.36,1);
}
.at-btn:hover{gap:16px;}
.at-btn--solid{background:var(--ny2);color:#fff!important;border:1px solid var(--ny2);}
.at-btn--solid:hover{background:var(--ny3);border-color:var(--ny3);box-shadow:0 14px 30px -14px rgba(0,64,140,.7);}
/* The intro band's second button. (.at-btn--ghost went with the closing band,
   and .at-pill and .at-go with the decision table and the options grid — the
   page is down to two button finishes, which is two more than it needs but one
   fewer than it had.) */
.at-btn--line{background:transparent;color:var(--ny2)!important;border:1px solid rgba(0,83,183,.4);}
.at-btn--line:hover{background:rgba(0,83,183,.07);border-color:var(--ny2);}

/* ==========================================================================
   HERO — the blue banner.

   A flat editorial band, not a photograph with type on it. Three parts:

   1. THE RAMP. One linear-gradient running deep navy at the left, where the
      copy sits, out to a lit blue at the right, plus a radial that acts as the
      light source behind the artwork. Nothing is painted OVER the band, so the
      white type is readable on colour alone and there is no scrim to maintain.

   2. THE ARTWORK IS A RIGHT-HAND OBJECT, MASKED. .at-hero__art holds the plate
      to the right 58% and dissolves it from transparent at 0 to solid at 62%
      of its own width. The mask is the whole trick: without it the plate reads
      as a rectangle pasted onto the band, and with it the sculpture appears to
      emerge out of the ramp. Swap the file, never the mask — PLATE.hero picks
      up services/accounting-tax-hero.webp the moment that file exists.

   3. THE COPY IS CENTRED IN ITS OWN COLUMN, not pinned to the page gutter.
      That is what puts the block roughly a sixth of the way across, the way
      the banner is drawn, and it holds the proportion at every width instead
      of needing a fixed inset per breakpoint.

   The two blurred aurora fields that used to drift across this band are gone
   with the design that needed them: they existed to give a flat navy panel
   something to look at, and the ramp plus the sculpture now do that.
   ========================================================================== */
.at-hero{
  position:relative;isolation:isolate;overflow:hidden;
  background:
    radial-gradient(118% 130% at 84% 46%,rgba(84,166,255,.5) 0%,rgba(84,166,255,0) 60%),
    linear-gradient(96deg,#07206B 0%,#0A2C97 24%,#0E42C6 48%,#1358DE 70%,#1A6FEF 100%);
  /* The banner is sized by min-height and the copy's own padding, so the 40px
     section rule the rest of the page runs on would only add a seam here. */
  padding:0!important;
  min-height:clamp(300px,29vw,440px);
  display:flex;align-items:center;
}
.at-hero__art{
  position:absolute;top:0;right:0;bottom:0;
  width:min(58%,880px);z-index:-1;pointer-events:none;overflow:hidden;
  -webkit-mask-image:linear-gradient(90deg,transparent 0%,rgba(0,0,0,.26) 22%,rgba(0,0,0,.78) 44%,#000 62%);
          mask-image:linear-gradient(90deg,transparent 0%,rgba(0,0,0,.26) 22%,rgba(0,0,0,.78) 44%,#000 62%);
}
.at-hero__art img{
  display:block;width:100%;height:100%;
  object-fit:cover;object-position:62% 50%;
  filter:saturate(1.12) contrast(1.05);
}
.at-hero__inner{
  position:relative;z-index:1;
  display:grid;grid-template-columns:minmax(0,1.3fr) minmax(0,.7fr);
  align-items:center;
}
/* 520px is the measure, and it is doing two jobs: it holds the headline to
   three lines at the top of the clamp, and it keeps the block clear of the
   point where the artwork's mask starts to paint. */
.at-hero__copy{
  justify-self:center;width:100%;max-width:520px;
  padding:clamp(44px,5.4vw,76px) 0;
}
/* THERE IS NO EYEBROW ON THIS BANNER. AT_HERO dropped the field and the design
   never had one: the band is a headline and a single underlined line. A label
   above them would be a third object competing with the sculpture for the same
   corner of the eye. If one ever comes back, it is the tinted .at-kicker badge
   the sections below use, not a bespoke rule here. */
.at-hero__head{
  font-family:"Forum",serif!important;font-weight:400!important;color:#fff!important;
  font-size:clamp(34px,4.5vw,62px)!important;line-height:1.05!important;
  letter-spacing:-.004em!important;margin:0 0 24px!important;
}
/* Underlined, as drawn. It is set on the text rather than as a border under the
   paragraph so the rule tracks the wrap instead of running the full measure. */
.at-hero__sub{
  color:rgba(255,255,255,.94)!important;font-size:15px!important;line-height:1.85!important;
  margin:0!important;max-width:none;
  text-decoration:underline!important;
  text-decoration-color:rgba(255,255,255,.42);
  text-decoration-thickness:1px;text-underline-offset:5px;
}

/* ==========================================================================
   THE INTRO BAND — the proposition, stated.

   A centred head and lede over a two-rail body: the four commercial points as
   a ruled list on the left, the photograph filling the right.

   WHY THE HEAD IS SANS AND EVERYTHING ELSE HERE IS SERIF. The head is set in
   DM Sans 300 at display size — one thin line across the middle of the band —
   and the four point titles under it are Forum. That is the contrast the band
   is built on: the statement is light and wide, the terms under it are solid
   and small. Setting both in the same serif collapses the difference and the
   section reads as one undifferentiated column of headings.

   THE LIST IS RULED TOP AND BOTTOM. Each point owns its top rule and the list
   owns the last one, so four points read as a stated set rather than as four
   loose paragraphs — and adding a fifth needs no change to the closing rule.

   THE RAILS STRETCH. align-items:stretch, and the figure takes height:100%, so
   the photograph runs to the same bottom line as the buttons beside it however
   long the four notes turn out to be.
   ========================================================================== */
.at-intro{
  background:#fff;
  padding:clamp(46px,5.2vw,74px) 0 clamp(50px,5.6vw,82px)!important;
}
.at-intro__top{
  max-width:840px;margin:0 auto clamp(32px,3.8vw,52px);text-align:center;
}
.at-intro__head{
  font-family:"DM Sans",sans-serif!important;font-weight:300!important;
  color:#16233C!important;font-size:clamp(27px,3.5vw,46px)!important;
  line-height:1.16!important;letter-spacing:-.012em!important;margin:0 0 15px!important;
}
.at-intro__lede{
  color:var(--muted)!important;font-size:16px!important;line-height:1.62!important;
  margin:0 auto!important;max-width:80ch;
}
.at-intro__grid{
  display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);
  gap:clamp(26px,3.6vw,58px);align-items:stretch;
}
.at-intro__copy{display:flex;flex-direction:column;}
.at-intro__points{
  margin:0;padding:0;list-style:none;border-bottom:1px solid var(--line);
}
.at-intro__point{
  position:relative;border-top:1px solid var(--line);
  padding:21px 0 23px 24px;
}
/* A square, not a disc, and the one warm mark on a page of blues. It has to
   read at 9px, which is what rules the disc out. */
.at-intro__point::before{
  content:"";position:absolute;left:0;top:29px;width:9px;height:9px;
  background:var(--gold);
}
.at-intro__label{
  font-family:"Forum",serif!important;font-weight:400!important;
  color:var(--ny)!important;font-size:20px!important;line-height:1.32!important;
  letter-spacing:0!important;text-transform:none!important;margin:0 0 6px!important;
}
.at-intro__note{
  color:var(--body)!important;font-size:14.5px!important;line-height:1.66!important;
  margin:0!important;
}
/* The chips and the buttons follow the list in flow. They were pinned to the
   rail's bottom line with margin-top:auto, which is the right move when the
   rail is the shorter of the two columns — and the wrong one here, because
   the rail is what sets the row height and the photograph stretches to it. All
   the pin did was open a hole between the chips and the buttons. */
.at-intro__chips{
  display:flex;flex-wrap:wrap;gap:10px;
  margin:28px 0 22px;padding:0;list-style:none;
}
.at-intro__chip{
  display:inline-flex;align-items:center;gap:9px;
  padding:9px 17px;border-radius:999px;
  background:rgba(0,83,183,.06);border:1px solid rgba(0,83,183,.2);
  color:var(--ny);font-size:13.5px;font-weight:500;
}
.at-intro__chip i{
  width:6px;height:6px;border-radius:50%;background:var(--ny2);flex:0 0 auto;
}
.at-intro__ctas{display:flex;flex-wrap:wrap;gap:14px;}
.at-intro__figure{margin:0;overflow:hidden;border-radius:3px;min-height:340px;}
.at-intro__figure img{
  display:block;width:100%;height:100%;object-fit:cover;
}

/* ==========================================================================
   THE BANNER — the reference card.

   One rounded card split down the middle: the brand ramp and three things on
   the left — a heading, a paragraph and a pill — texture on the right. That is
   the whole section.

   IT REPLACED A THREE-BLOCK PROBLEM STATEMENT: a section head, six questions in
   two columns, then the turn on its own dark plate. The questions went with it
   by request, and the card depends on their going: it is drawn short and wide,
   and it only stays short and wide while nothing else is added to the left
   rail. Anything that has to be said here has to fit a heading and about forty
   words, or the shape is gone.

   THE PILL IS PINNED, NOT SPACED. margin-top:auto on .at-prob__cta is what puts
   it on the panel's bottom edge with the gap opening above it, which is how the
   reference is drawn. A margin instead would leave it floating under the
   paragraph at one card height and detached at another.

   THE SPLIT IS 50/50 AND HARD, by request — the ramp fills the left column,
   the plate fills the right, and the join is the column edge.

   It was a long mask before, dissolving the plate across the first 56% of its
   own column so the two halves blended into each other. That is gone: the two
   halves are meant to read as two halves.

   IF A BLEND IS EVER WANTED BACK, feather the plate's left edge with a mask —
   the way .at-hero__art still does — rather than painting a matching colour
   over it. --brand is a 150deg ramp, so the colour at the column edge changes
   down its height, and no single flat blue can match it; the first attempt at
   this card tried exactly that and the join showed as a faint vertical line.
   ========================================================================== */
.at-prob__card{
  display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);
  overflow:hidden;border-radius:14px;
  background:var(--brand);
  min-height:clamp(250px,25vw,360px);
}
.at-prob__panel{
  display:flex;flex-direction:column;
  padding:clamp(26px,3vw,44px);
}
/* Half gradient, half picture, and the join is the column edge. It carries no
   background of its own so the card's ramp shows while the plate is still
   loading — after that the plate covers this column completely. */
.at-prob__art{position:relative;isolation:isolate;overflow:hidden;}
.at-prob__art .at-plate{
  --throw:20px;opacity:1;
  /* A small saturation lift and nothing else. The brightness cut this carried
     was there to pull a plate down into a masked blend; there is no blend now,
     and dimming a plate whose lightness IS the contrast would only flatten the
     card. */
  filter:saturate(1.06);
}
/* Sans, not the page's serif, and only a little larger than the paragraph
   under it: the reference sets both in the same grotesque, and that restraint
   is most of why the card reads as a banner rather than as another section
   opening. */
.at-prob__head{
  font-family:"DM Sans",sans-serif!important;font-weight:500!important;color:#fff!important;
  font-size:clamp(19px,1.9vw,26px)!important;line-height:1.32!important;
  letter-spacing:-.005em!important;margin:0 0 15px!important;max-width:26ch;
}
.at-prob__body{
  color:rgba(255,255,255,.85)!important;font-size:13.5px!important;line-height:1.72!important;
  margin:0!important;max-width:52ch;
}
.at-prob__cta{
  align-self:flex-end;margin-top:auto;
  display:inline-flex;align-items:center;gap:11px;
  padding:12px 24px;border-radius:999px;
  background:#8FC0FF;color:var(--ny)!important;
  font-size:11.5px;font-weight:700;letter-spacing:.13em;text-transform:uppercase;
  text-decoration:none!important;white-space:nowrap;
  transition:background-color .3s ease,gap .3s ease;
}
.at-prob__cta:hover{background:#fff;gap:15px;}

/* ==========================================================================
   THE SERVICE STRIP — eight panels, one open.

   A hover accordion, replacing the four-across card grid: eight photographic
   panels side by side, one expanded and carrying its description, the other
   seven collapsed to a title and a number. The first panel is the resting
   state, so the strip is never a row of eight anonymous slivers.

   IT IS CSS ONLY, and which panel is open is three selectors:

     .at-acc__panel:first-child                          resting
     .at-acc:hover .at-acc__panel:hover                   pointer
     .at-acc:focus-within .at-acc__panel:focus-visible    keyboard

   — plus two rules between them that close the first child the moment the
   strip is pointed at or tabbed into. ORDER IS LOAD-BEARING: those closing
   rules must sit between the resting rules and the opening ones, because the
   resting rule and the closing rule carry the same specificity and the later
   one has to win.

   THE GAP IS PADDING, NOT A FLEX GAP. A flex gap is dead space: crossing it makes
   .at-acc:hover true while no panel is hovered, every panel collapses, and the
   strip flickers on the way from one panel to the next. Here the gap is
   padding-right on the panel, so the eight hit areas are contiguous and the
   pointer is always inside exactly one of them.

   THE OPEN PANEL'S CARD HAS A FIXED WIDTH and is clipped by the panel it sits
   in. A percentage width would re-wrap its paragraph on every frame of the
   0.62s expansion; a fixed one simply slides out from behind the panel's edge,
   which is what the reference does.
   ========================================================================== */
.at-services{background:var(--tint);}
/* Heading left, the invitation right, both on the strip's own edges. */
.at-services__head{
  display:flex;align-items:flex-end;justify-content:space-between;
  gap:var(--gap);margin:0 0 var(--headgap);
}
.at-services__head .at-sec__head{margin:0!important;}
.at-services__cta{
  display:inline-flex;align-items:center;gap:13px;flex:0 0 auto;
  color:var(--ny)!important;text-decoration:none!important;
  font-size:14px;font-weight:500;padding-bottom:4px;
}
.at-services__cta i{
  display:inline-flex;align-items:center;justify-content:center;
  width:40px;height:40px;border-radius:50%;flex:0 0 auto;
  border:1px solid rgba(0,83,183,.34);color:var(--ny2);
  transition:background-color .3s ease,border-color .3s ease,color .3s ease;
}
.at-services__cta:hover i{background:var(--brand);border-color:#1436D8;color:#fff;}

.at-acc{
  /* How many times a closed panel the open one is. Eight panels means the
     open share cannot be as generous as it would be at five. */
  --open:3.2;

  /* ---- THE TIMING, IN ONE PLACE --------------------------------------
     --ease is a long deceleration (an ease-out quint): it leaves fast and
     lands slowly, which is what makes a width change read as a panel opening
     rather than as a layout jump. The earlier curve was a standard ease-out
     over .62s and it arrived before the eye had followed it.

     THE TWO DIRECTIONS ARE NOT THE SAME LENGTH, and that is the fix that
     matters more than the duration. Every piece of content in here fades OUT
     quickly and with no delay, and fades IN slowly and after one. Sharing a
     single delayed curve both ways is what made the old transition feel
     abrupt: closing a panel sat still for .16s before anything happened, so
     the strip appeared to lurch and then catch up.

     How it is expressed: the fast, no-delay transition is the BASE rule, and
     the slow delayed one is set on the open-state rules only. A transition
     runs with the value the element has in the state it is moving TO, so an
     element gaining the open rule takes the slow curve and an element losing
     it falls back to the fast one. No JavaScript and no duplicate keyframes.

     The open sequence is deliberately staggered — panel, then card at .42s,
     then the link at .62s — so the three arrive in the order you read them.

     WHY IT IS ALSO CHEAPER THAN IT LOOKS. A flex-grow transition is layout
     work on every frame, and three things were making each of those frames
     more expensive than it had to be:

       the card's backdrop-filter   a blur sampling a region that was
                                    repainting anyway — and invisible under a
                                    95%-opaque fill. Gone.
       the image's filter:          brightness/saturate on a multi-megapixel
                                    bitmap is a GPU pass per frame. The dim is
                                    an opacity-animated overlay now
                                    (.at-acc__inner::after), which composites.
       no containment               a panel's repaint could invalidate its
                                    neighbours. contain:layout paint stops it
                                    at the panel edge.

     will-change on the image is applied only while the strip is engaged, so
     eight large photographs are not each holding a promoted layer at rest. */
  --ease:cubic-bezier(.25,1,.3,1);

  display:flex;align-items:stretch;
  height:clamp(360px,32vw,470px);
}
.at-acc__panel{
  position:relative;flex:1 1 0;min-width:0;
  padding-right:8px;text-decoration:none!important;
  transition:flex-grow 1.35s var(--ease);
}
.at-acc__panel:last-child{padding-right:0;}
.at-acc__inner{
  position:relative;display:block;height:100%;overflow:hidden;
  border-radius:12px;background:var(--brand);isolation:isolate;
  /* The panel's layout and paint stop at its own edge, so eight of them
     resizing together cannot each invalidate the other seven. */
  contain:layout paint;
}
.at-acc__img{
  position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:-2;
  transform:scale(1.04);
  transition:transform 1.6s var(--ease);
}
/* Promoted only while the strip is being used. Left on permanently it would be
   eight full-panel photographs each holding their own compositor layer. */
.at-acc:hover .at-acc__img,
.at-acc:focus-within .at-acc__img{will-change:transform;}
/* The dim on a closed panel. It was filter:brightness() on the image, which is
   a GPU pass over the whole bitmap every frame of a transition that is already
   doing layout. An opacity fade on a flat colour is composited instead. */
.at-acc__inner::after{
  content:"";position:absolute;inset:0;z-index:-1;pointer-events:none;
  background:#061428;opacity:.34;
  transition:opacity 1.2s ease;
}
.at-acc__scrim{
  position:absolute;inset:0;z-index:-1;pointer-events:none;
  background:linear-gradient(180deg,rgba(6,22,44,.62) 0%,rgba(6,22,44,.14) 34%,rgba(6,22,44,0) 56%,rgba(6,22,44,.52) 100%);
}
/* The closed panel's whole content, so it is set narrow and allowed to wrap as
   far down as the name needs. */
.at-acc__title{
  position:absolute;left:18px;right:15px;top:18px;
  color:#fff;font-size:13.5px;font-weight:500;line-height:1.34;
  opacity:1;transform:none;
  /* This is the title ARRIVING — a panel closing behind you — so it waits for
     the card it is replacing to clear out first. Leaving is the fast rule on
     the open states below. */
  transition:opacity .6s ease .3s,transform .6s var(--ease) .3s;
}
.at-acc__card{
  position:absolute;left:16px;bottom:16px;
  width:clamp(206px,22vw,332px);
  padding:20px 20px 18px;border-radius:10px;
  background:var(--brand);
  opacity:0;transform:translateY(18px);
  /* The base is the card LEAVING: quick, and immediately. */
  transition:opacity .34s ease,transform .46s var(--ease);
}
.at-acc__head{
  display:block;color:#fff!important;font-family:"DM Sans",sans-serif!important;
  font-size:16px!important;font-weight:600!important;line-height:1.3!important;
  letter-spacing:0!important;margin:0 0 9px!important;
}
.at-acc__text{
  display:block;color:rgba(255,255,255,.86);font-size:12.5px;line-height:1.6;
  margin:0 0 17px;
}
/* Later than the card, so the invitation arrives after the panel it sits on. */
.at-acc__more{
  display:inline-flex;align-items:center;gap:11px;
  color:#fff;font-size:13px;font-weight:500;
  opacity:0;transition:opacity .28s ease;
}
.at-acc__more i{
  display:inline-flex;align-items:center;justify-content:center;
  width:32px;height:32px;border-radius:50%;flex:0 0 auto;
  border:1px solid rgba(255,255,255,.42);
  transition:background-color .3s ease,border-color .3s ease,color .3s ease;
}
.at-acc__panel:hover .at-acc__more i{
  background:#fff;border-color:#fff;color:#1436D8;
  transition:background-color .5s ease .62s,border-color .5s ease .62s,color .5s ease .62s;
}
.at-acc__num{
  position:absolute;right:14px;bottom:14px;
  display:inline-flex;align-items:center;justify-content:center;
  width:34px;height:34px;border-radius:50%;
  background:var(--brand);color:#fff;
  font-size:11.5px;font-weight:600;letter-spacing:.04em;
}

/* ---- OPEN, at rest ------------------------------------------------------ */
.at-acc__panel:first-child{flex-grow:var(--open);}
.at-acc__panel:first-child .at-acc__img{transform:scale(1);}
.at-acc__panel:first-child .at-acc__inner::after{opacity:0;}
.at-acc__panel:first-child .at-acc__title{
  opacity:0;transform:translateY(-6px);
  transition:opacity .32s ease,transform .32s ease;
}
.at-acc__panel:first-child .at-acc__card{
  opacity:1;transform:none;
  transition:opacity .75s ease .42s,transform 1s var(--ease) .42s;
}
.at-acc__panel:first-child .at-acc__more{opacity:1;transition:opacity .65s ease .62s;}
/* ---- CLOSED, the moment the strip is engaged ---------------------------- */
.at-acc:hover .at-acc__panel,
.at-acc:focus-within .at-acc__panel{flex-grow:1;}
.at-acc:hover .at-acc__panel .at-acc__img,
.at-acc:focus-within .at-acc__panel .at-acc__img{transform:scale(1.04);}
.at-acc:hover .at-acc__panel .at-acc__inner::after,
.at-acc:focus-within .at-acc__panel .at-acc__inner::after{opacity:.34;}
.at-acc:hover .at-acc__panel .at-acc__title,
.at-acc:focus-within .at-acc__panel .at-acc__title{opacity:1;transform:none;}
.at-acc:hover .at-acc__panel .at-acc__card,
.at-acc:focus-within .at-acc__panel .at-acc__card{opacity:0;transform:translateY(18px);}
.at-acc:hover .at-acc__panel .at-acc__more,
.at-acc:focus-within .at-acc__panel .at-acc__more{opacity:0;}
/* ---- OPEN, the engaged one ---------------------------------------------- */
.at-acc:hover .at-acc__panel:hover,
.at-acc:focus-within .at-acc__panel:focus-visible{flex-grow:var(--open);}
.at-acc:hover .at-acc__panel:hover .at-acc__img,
.at-acc:focus-within .at-acc__panel:focus-visible .at-acc__img{transform:scale(1);}
.at-acc:hover .at-acc__panel:hover .at-acc__inner::after,
.at-acc:focus-within .at-acc__panel:focus-visible .at-acc__inner::after{opacity:0;}
.at-acc:hover .at-acc__panel:hover .at-acc__title,
.at-acc:focus-within .at-acc__panel:focus-visible .at-acc__title{
  opacity:0;transform:translateY(-6px);
  transition:opacity .32s ease,transform .32s ease;
}
.at-acc:hover .at-acc__panel:hover .at-acc__card,
.at-acc:focus-within .at-acc__panel:focus-visible .at-acc__card{
  opacity:1;transform:none;
  transition:opacity .75s ease .42s,transform 1s var(--ease) .42s;
}
.at-acc:hover .at-acc__panel:hover .at-acc__more,
.at-acc:focus-within .at-acc__panel:focus-visible .at-acc__more{
  opacity:1;transition:opacity .65s ease .62s;
}

/* ==========================================================================
   RELATED SERVICES — the other five UAE service lines.

   A grid of split cards: a tinted panel carrying a label and a name, a
   photograph beside it, one rounded frame around both. The first card is the
   feature and takes both rows of the left column — that asymmetry is the whole
   composition, and without it five equal tiles read as a table of contents.

   The five are vxnServices('en-ae') minus this page's own service, so adding a
   service line to the registry adds a card here and removing one removes it.
   Nothing about this section is written down twice.
   ========================================================================== */
.at-rel__head{
  font-family:"Forum",serif!important;font-weight:400!important;color:var(--ny)!important;
  font-size:clamp(26px,3vw,36px)!important;line-height:1.2!important;
  margin:0 0 var(--headgap)!important;
}
/* Two columns and two rows, which is all three cards need: the feature takes
   the left column whole, the other two stack in the right. */
.at-rel__grid{
  display:grid;grid-template-columns:repeat(2,minmax(0,1fr));
  grid-auto-rows:minmax(118px,1fr);gap:var(--gap);
}
.at-rel__card{
  display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);
  overflow:hidden;border-radius:10px;background:var(--tint2);
  text-decoration:none!important;
  transition:background-color .35s ease,box-shadow .35s ease;
}
.at-rel__card:first-child{grid-row:span 2;}
.at-rel__card:hover{background:var(--tint);box-shadow:0 22px 44px -32px rgba(6,18,32,.42);}
.at-rel__panel{
  display:flex;flex-direction:column;justify-content:center;
  padding:18px 20px;
}
.at-rel__card:first-child .at-rel__panel{padding:28px 30px;}
.at-rel__eyebrow{
  display:block;font-size:9.5px;font-weight:700;letter-spacing:.16em;
  text-transform:uppercase;color:var(--muted);margin:0 0 9px;
}
.at-rel__title{
  display:block;font-family:"DM Sans",sans-serif;font-weight:400;
  color:var(--ny);font-size:15px;line-height:1.32;
}
.at-rel__card:first-child .at-rel__title{
  font-size:clamp(19px,2vw,25px);line-height:1.24;
}
.at-rel__shot{position:relative;display:block;overflow:hidden;}
.at-rel__shot img{
  position:absolute;inset:0;width:100%;height:100%;object-fit:cover;
  transition:transform .9s cubic-bezier(.22,1,.36,1);
}
.at-rel__card:hover .at-rel__shot img{transform:scale(1.05);}

/* ==========================================================================
   TALK TO AN EXPERT — the page's last word.

   A tinted band, a photograph on the left, and the close's own copy on the
   right under a squared button rather than the pill the rest of the page uses.
   The square is deliberate: it is the only one on the page, and this is the
   only place the page asks for something outright.
   ========================================================================== */
.at-talk{
  background:var(--tint);
  padding:clamp(44px,5vw,72px) 0!important;
}
.at-talk__grid{
  display:grid;grid-template-columns:minmax(0,.92fr) minmax(0,1.08fr);
  gap:clamp(28px,4.5vw,72px);align-items:center;
}
.at-talk__fig{
  margin:0;position:relative;overflow:hidden;aspect-ratio:4/3;border-radius:2px;
}
.at-talk__fig img{
  position:absolute;inset:0;width:100%;height:100%;object-fit:cover;
}
.at-talk__head{
  font-family:"DM Sans",sans-serif!important;font-weight:300!important;
  color:#16233C!important;font-size:clamp(25px,3.1vw,40px)!important;
  line-height:1.18!important;letter-spacing:-.012em!important;
  margin:0 0 16px!important;max-width:20ch;
}
.at-talk__lede{
  color:var(--body)!important;font-size:15px!important;line-height:1.7!important;
  margin:0 0 26px!important;max-width:52ch;
}
.at-talk__cta{
  display:inline-flex;align-items:center;
  padding:14px 26px;border-radius:3px;
  background:var(--ny2);color:#fff!important;
  font-size:13px;font-weight:600;text-decoration:none!important;
  transition:background-color .3s ease;
}
.at-talk__cta:hover{background:var(--ny);}

/* ==========================================================================
   RESPONSIVE — three steps, and the scale tokens do most of the work.
   ========================================================================== */
@media(max-width:1180px){
  .at-root{--gap:20px;--cardpad:24px;--headgap:36px;}
  .at-acc{--open:3;height:clamp(340px,34vw,420px);}
  .at-acc__title{left:15px;right:13px;top:15px;font-size:12.5px;}
  .at-services__head{align-items:flex-start;}
  /* One rail. The figure loses its stretch height with the row it was
     stretching to, so it takes an aspect ratio instead of a min-height —
     a 340px band under the list would crop the photograph to a strip. */
  .at-intro__grid{grid-template-columns:minmax(0,1fr);gap:calc(var(--gap) * 1.6);}
  .at-intro__figure{min-height:0;aspect-ratio:16/9;}
}
@media(max-width:900px){
  .at-root{--headgap:30px;}
  /* THE ACCORDION STOPS HERE, and it stops before it stops being readable: at
     this width a closed panel is under 90px and its title is about one word a
     line. Two columns of open cards instead — same eight panels, same content,
     and nothing held behind a hover a touch screen cannot perform.

     Every state rule has to be restated with its full selector. The mechanism
     above is written at three, four and five classes deep, so a bare
     .at-acc__card in here would lose to it. */
  .at-acc{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;height:auto;}
  .at-acc__panel{padding-right:0;}
  .at-acc__inner{height:300px;}
  .at-acc__title,
  .at-acc:hover .at-acc__panel .at-acc__title,
  .at-acc:focus-within .at-acc__panel .at-acc__title{display:none;}
  .at-acc__card,
  .at-acc__panel:first-child .at-acc__card,
  .at-acc:hover .at-acc__panel .at-acc__card,
  .at-acc:hover .at-acc__panel:hover .at-acc__card,
  .at-acc:focus-within .at-acc__panel .at-acc__card,
  .at-acc:focus-within .at-acc__panel:focus-visible .at-acc__card{
    opacity:1;transform:none;width:auto;right:16px;
  }
  .at-acc__more,
  .at-acc__panel:first-child .at-acc__more,
  .at-acc:hover .at-acc__panel .at-acc__more,
  .at-acc:hover .at-acc__panel:hover .at-acc__more,
  .at-acc:focus-within .at-acc__panel .at-acc__more,
  .at-acc:focus-within .at-acc__panel:focus-visible .at-acc__more{opacity:1;}
  .at-acc__img,
  .at-acc__panel:first-child .at-acc__img,
  .at-acc:hover .at-acc__panel .at-acc__img,
  .at-acc:hover .at-acc__panel:hover .at-acc__img,
  .at-acc:focus-within .at-acc__panel .at-acc__img,
  .at-acc:focus-within .at-acc__panel:focus-visible .at-acc__img{transform:none;}
  .at-acc__inner::after,
  .at-acc__panel:first-child .at-acc__inner::after,
  .at-acc:hover .at-acc__panel .at-acc__inner::after,
  .at-acc:hover .at-acc__panel:hover .at-acc__inner::after,
  .at-acc:focus-within .at-acc__panel .at-acc__inner::after,
  .at-acc:focus-within .at-acc__panel:focus-visible .at-acc__inner::after{opacity:0;}
  /* The card has the bottom of the panel to itself now, so the number moves
     up rather than fighting it for the corner. */
  .at-acc__num{top:14px;bottom:auto;}
  /* One column: the picture becomes a band under the copy rather than half the
     card. The 50/50 split is a two-column idea and there is only one column
     here, so the halves become top and bottom. */
  .at-prob__card{grid-template-columns:minmax(0,1fr);min-height:0;}
  .at-prob__art{aspect-ratio:16/6;}
  .at-talk__grid{grid-template-columns:minmax(0,1fr);gap:calc(var(--gap) * 1.5);}
  .at-talk__fig{aspect-ratio:16/9;}
}
@media(max-width:640px){
  .at-root{--gutter:20px;--cardpad:22px;--radius:16px;--headgap:26px;}
  .at-acc{grid-template-columns:minmax(0,1fr);}
  .at-acc__inner{height:280px;}
  /* One column, and the feature card stops spanning: a row span in a
     single-column grid is just a taller card with nothing beside it. */
  .at-rel__grid{grid-template-columns:minmax(0,1fr);grid-auto-rows:minmax(104px,auto);}
  .at-rel__card:first-child{grid-row:auto;}
  .at-rel__card:first-child .at-rel__panel{padding:20px 22px;}
  .at-rel__card:first-child .at-rel__title{font-size:17px;}
  .at-talk__cta{width:100%;justify-content:center;}
  .at-services__head{flex-direction:column;align-items:flex-start;gap:18px;}
  /* Full width, because a right-aligned pill under a full-width paragraph
     reads as an orphan at this measure. */
  .at-prob__cta{align-self:stretch;justify-content:center;margin-top:24px;}
  .at-prob__art{aspect-ratio:16/8;}
  .at-intro__figure{aspect-ratio:4/3;}
  .at-intro__point{padding:18px 0 20px 22px;}
  /* THE UNDERLINE COMES OFF ON PHONES. It is drawn under a single line of
     banner copy; at this width the same sentence is four, and four fully
     underlined lines read as a stack of links rather than as one rule under
     the headline. */
  .at-hero__sub{text-decoration:none!important;}
}

/* ==========================================================================
   MOTION — see Motion.tsx. The default here is VISIBLE; only [data-anim]
   values that JavaScript sets can hide anything, so a blocked or failed bundle
   leaves the page fully readable.
   ========================================================================== */
[data-anim='pending']{opacity:0;}
[data-anim='pending'][data-anim-variant='up']{translate:0 22px;}
[data-anim='pending'][data-anim-variant='left']{translate:-18px 0;}
[data-anim='pending'][data-anim-variant='right']{translate:18px 0;}
[data-anim='pending'][data-anim-variant='scale']{scale:.97;}
[data-anim='in']{
  opacity:1;translate:none;scale:none;
  transition:opacity .6s cubic-bezier(.22,.61,.36,1) var(--at-delay,0ms),
             translate .7s cubic-bezier(.22,.61,.36,1) var(--at-delay,0ms),
             scale .7s cubic-bezier(.22,.61,.36,1) var(--at-delay,0ms);
}

@media(prefers-reduced-motion:reduce){
  /* The plate drift and every entrance come off. Colour, frost and the hover
     states that carry meaning stay — none of them moved anything to begin
     with. (The hero's two drifting aurora fields went with the banner
     rewrite, so there is nothing left to switch off there.) */
  .at-zoom{transform:none;will-change:auto;}
  [data-anim]{opacity:1!important;translate:none!important;scale:none!important;transition:none!important;}
  /* The strip still opens and closes — it is how the section is read — but it
     does it instantly rather than easing across 1.35s.

     !important, and it is load-bearing: the open-state rules above set their
     own transition at four and five classes deep, so a bare declaration here
     would lose to them and reduced-motion users would still get the full
     expansion. */
  .at-acc__panel,.at-acc__img,.at-acc__title,.at-acc__card,.at-acc__more,
  .at-acc__more i,.at-acc__inner::after{transition:none!important;}
  .at-btn{transition:background-color .25s ease,color .25s ease;}
  .at-btn:hover{gap:inherit;}
}
`;

/** The arrow that ends every CTA on the page. */
function Arrow() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M4 12h15" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}


export default function AccountingTaxBody({ region }: { region: string }) {
  const sub = (slug: string) => rurl(region, `${SUB}${slug}/`);
  const plate = (which: keyof typeof PLATE) => rimgFirst(region, PLATE[which]);
  /* AT_SOLUTION names its items by slug; this is where they become the services
     themselves, so the tab block below renders AT_SERVICES copy directly and
     cannot fall out of step with the strip above it. A slug that no longer
     exists drops out here rather than rendering as undefined. */
  /* The cards in section 4: every UAE service line except this page's own,
     cut to three.

     THREE IS THE COMPOSITION, NOT A CONTENT DECISION. The grid is one feature
     card spanning both rows of the left column beside two stacked cards in the
     right — that shape needs exactly three. A fourth and fifth flowed onto a
     third row and left the feature card orphaned above them, which is what the
     five-card version looked like. Change the count and the layout has to
     change with it; RELATED_FIGURE still holds all five, so which three show
     is this one number. */
  const RELATED = vxnServices(region)
    .filter((sv) => sv.slug !== "accounting-tax-services")
    .slice(0, 3);
  const SOL = AT_SOLUTION.map((g) => ({
    tab: g.tab,
    intro: g.intro,
    items: g.slugs
      .map((sl) => AT_SERVICES.find((x) => x.slug === sl))
      .filter((x): x is AtService => Boolean(x)),
  }));

  /* #main-content / #main / <article> are the theme's page wrappers. Every
     other page body opens them; this one had been getting them from
     PageHeroSection, which no longer runs above it. Skipping them would drop
     the skip-link target and the layout-full class the theme's own rules key
     off. */
  return (
    <div id="main-content">
      <div id="main" role="main" className="vamtam-main layout-full">
        <article className="full page type-page status-publish hentry at-root">
          <style dangerouslySetInnerHTML={{ __html: CSS }} />
          <AccountingTaxMotion />

          {/* ---- 1. HERO — a banner: label, title, one line ----
              Everything else it used to carry is section 2 below. */}
          <section className="at-hero" aria-labelledby="at-hero-head">
            {/* The artwork sits in the band's right half rather than under the
                whole of it, so the copy on the left is on flat colour and needs
                no scrim. The mask that dissolves its left edge into the ramp is
                on .at-hero__art; the image itself is only ever a cover crop.

                Decorative: it carries no information the headings beside it do
                not already state. */}
            <div className="at-hero__art" aria-hidden="true">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="at-zoom" src={plate("hero")} alt="" />
            </div>
            <div className="at-hero__inner">
              <div className="at-hero__copy">
                <h1 className="at-hero__head" id="at-hero-head">
                  {AT_HERO.head}
                </h1>
                <p className="at-hero__sub">{AT_HERO.sub}</p>
              </div>
            </div>
          </section>

          {/* ---- 2. THE INTRO BAND ----
              The proposition, the description, the chips, the two CTAs and the
              four proof points — all of it lifted out of the hero, and all of
              it the same AT_HERO / AT_PROOF / AT_WHY_CLOSE content it was
              before. Nothing here is new copy.

              The head and lede are centred over the band; the four proof points
              are a ruled list in the left rail with the photograph beside them.
              The kicker the band used to open with is gone: a centred statement
              does not need a label above it telling the reader it is one. */}
          <section className="at-intro" aria-labelledby="at-intro-head">
            <div className="at-in">
              <div className="at-intro__top">
                <h2 className="at-intro__head" id="at-intro-head">
                  {AT_WHY_CLOSE}
                </h2>
                <p className="at-intro__lede">{AT_HERO.lede}</p>
              </div>

              <div className="at-intro__grid">
                <div className="at-intro__copy">
                  {/* The proof points read as terms, so they are headings with
                      a note under each rather than an icon rail. The icon each
                      one still declares in content.ts is unused HERE and used
                      by the service cards — it is not dead. */}
                  <ul
                    className="at-intro__points"
                    aria-label="What working with ValuNxt means"
                  >
                    {AT_PROOF.map((pr) => (
                      <li className="at-intro__point" key={pr.label}>
                        <h3 className="at-intro__label">{pr.label}</h3>
                        <p className="at-intro__note">{pr.note}</p>
                      </li>
                    ))}
                  </ul>

                  <ul className="at-intro__chips">
                    {AT_HERO.chips.map((c) => (
                      <li className="at-intro__chip" key={c}>
                        <i aria-hidden="true" />
                        {c}
                      </li>
                    ))}
                  </ul>

                  <div className="at-intro__ctas">
                    <a
                      className="at-btn at-btn--solid"
                      href={rurl(region, AT_HERO.primary.href)}
                    >
                      {AT_HERO.primary.label}
                      <Arrow />
                    </a>
                    <a
                      className="at-btn at-btn--line"
                      href={AT_HERO.secondary.href}
                    >
                      {AT_HERO.secondary.label}
                      <Arrow />
                    </a>
                  </div>
                </div>

                {/* Decorative: the four points beside it say what it shows. */}
                <figure className="at-intro__figure">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={plate("intro")} alt="" loading="lazy" />
                </figure>
              </div>
            </div>
          </section>

          {/* ---- 2b. THE SERVICE STRIP — the commercial centre ----
              Was section 4, a four-across grid of eight cards. It is a hover
              accordion now and it has moved up here, directly under the
              proposition, because the source document's own instruction is not
              to let generic accounting education push the eight services down
              the page — and the grid, sitting after the problem statement, was
              doing exactly that.

              Same eight AT_SERVICES entries, same slugs, same photographs the
              explorer below already uses (EXPLORE_FIGURE). The id is unchanged,
              so the hero's "Explore Our Services" anchor still lands here. */}
          <section
            className="at-services"
            id="at-services"
            aria-labelledby="at-services-head"
          >
            <div className="at-in">
              <div className="at-services__head">
                <div className="at-sec__head">
                  <span className="at-kicker">Explore services</span>
                  <h2 className="at-h2" id="at-services-head">
                    Find the finance support your business needs
                  </h2>
                  <p className="at-lede">
                    Start with the problem you need solved today. Add more
                    capability as your business grows.
                  </p>
                </div>
                <a
                  className="at-services__cta"
                  href={rurl(region, AT_HERO.primary.href)}
                >
                  <i aria-hidden="true">
                    <Arrow />
                  </i>
                  Ready to get started?
                </a>
              </div>

              <div className="at-acc">
                {AT_SERVICES.map((sv, i) => (
                  <a
                    className="at-acc__panel"
                    href={sub(sv.slug)}
                    key={sv.slug}
                  >
                    <span className="at-acc__inner">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        className="at-acc__img"
                        src={rimgFirst(region, EXPLORE_FIGURE[sv.slug] ?? [])}
                        alt=""
                        loading="lazy"
                      />
                      <span className="at-acc__scrim" aria-hidden="true" />
                      {/* The closed panel's label. It repeats the heading in
                          the card below it, so it is hidden from assistive
                          technology — the h3 is always in the accessibility
                          tree whether or not its panel is the open one. */}
                      <span className="at-acc__title" aria-hidden="true">
                        {sv.name}
                      </span>
                      <span className="at-acc__card">
                        <h3 className="at-acc__head">{sv.name}</h3>
                        <span className="at-acc__text">{sv.cardText}</span>
                        <span className="at-acc__more">
                          <i aria-hidden="true">
                            <Arrow />
                          </i>
                          Explore more
                        </span>
                      </span>
                      <span className="at-acc__num" aria-hidden="true">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </section>

          {/* ---- 2c. FIND THE RIGHT SOLUTION ----
              THE HOME PAGE'S SECTION, COPIED. Everything from the
              <div data-elementor-id="17"> below to its closing tag is the
              captured Elementor markup already running at / and at
              /our-group/valunxt-corporate-services/ — same element ids, same
              structure, same tab widget. Only three things changed:

                the copy      every string is now AT_SOLUTION / AT_SERVICES
                one item      panel 3 lost its third block; this page has two
                              services in that group, not three
                the pictures  overridden in the <style> above, the same way the
                              corporate services page overrides them

              WHY IT IS COPIED AND NOT REBUILT. The tab behaviour is Elementor's
              nested-tabs widget, and elements-handlers.min.js — which every page
              already loads — is what switches the panels. Rebuilding the markup
              would mean rebuilding that too. The .elementor-17 wrapper is what
              lets post-17.css style it; see EXTRA_CSS in lib/uae-service-pages.ts
              for how this page comes to load that sheet. */}
          {/* The three tab pictures. post-17.css sets them to the home page's
              real-estate, capital and marketing shots; these are the accounting
              equivalents. Page-scoped override rather than an edit to that
              sheet, because the home page loads it too — the same reason and
              the same shape as the override in ValunxtCorporateServicesBody. */}
          <style
            id="accounting-tax-solution-images"
            dangerouslySetInnerHTML={{
              __html: [
                ["aa3aa17", "services/accounting-and-tax-services.webp"],
                ["b12020e", "new-folder/about-us-1.webp"],
                ["9106445", "new-folder/who-we-are-1.webp"],
              ]
                .map(
                  ([id, img]) => `
.elementor-17 .elementor-element.elementor-element-${id}:not(.elementor-motion-effects-element-type-background),
.elementor-17 .elementor-element.elementor-element-${id} > .elementor-motion-effects-container > .elementor-motion-effects-layer{
  background-image:url("${BASE}/assets/content/uploads/${img}")!important;
  background-position:center center!important;
  background-size:cover!important;
}`,
                )
                .join("\n"),
            }}
          />

      <div data-elementor-type="wp-page" data-elementor-id="17" className="elementor elementor-17" data-elementor-post-type="page">
      <div className="elementor-element elementor-element-d50462f e-flex e-con-boxed e-con e-parent" data-id="d50462f" data-element_type="container" data-e-type="container">
      							<div className="e-con-inner">
      								<div className="elementor-element elementor-element-82cf741 e-con-full e-flex e-con e-child" data-id="82cf741" data-element_type="container" data-e-type="container" data-settings={"{\"background_background\":\"classic\"}"}>
      									<div className="elementor-element elementor-element-79f93d1 e-con-full e-flex e-con e-child" data-id="79f93d1" data-element_type="container" data-e-type="container" data-settings={"{\"background_background\":\"classic\"}"}>
      										<div className="elementor-element elementor-element-e81eaa1 elementor-invisible animated-fast elementor-widget elementor-widget-heading" data-id="e81eaa1" data-element_type="widget" data-e-type="widget" data-settings={"{\"_animation\":\"slideInUp\"}"} data-widget_type="heading.default">
      											<div className="elementor-widget-container">
      												<h2 className="elementor-heading-title elementor-size-default">Find the Right Solution</h2>
      											</div>
      										</div>
      									</div>
      									<div className="elementor-element elementor-element-21fcef5 e-flex e-con-boxed e-con e-child" data-id="21fcef5" data-element_type="container" data-e-type="container">
      										<div className="e-con-inner">
      											<div className="elementor-element elementor-element-9af78b4 e-n-tabs-none elementor-widget elementor-widget-n-tabs" data-id="9af78b4" data-element_type="widget" data-e-type="widget" data-settings={"{\"tabs_justify_horizontal\":\"stretch\",\"horizontal_scroll\":\"enable\"}"} data-widget_type="nested-tabs.default">
      												<div className="elementor-widget-container">
      													<div className="e-n-tabs" data-widget-number="162494644" aria-label="Tabs. Open items with Enter or Space, close with Escape and navigate using the Arrow keys.">
      														<div className="e-n-tabs-heading" role="tablist">
      															<button id="e-n-tab-title-1624946441" data-tab-title-id="e-n-tab-title-1624946441" className="e-n-tab-title" aria-selected="true" data-tab-index="1" role="tab" tabIndex={0} aria-controls="e-n-tab-content-1624946441" style={{ '--n-tabs-title-order': "1" } as React.CSSProperties}>
      																<span className="e-n-tab-title-text">
      																	{SOL[0].tab} </span>
      															</button>
      															<button id="e-n-tab-title-1624946442" data-tab-title-id="e-n-tab-title-1624946442" className="e-n-tab-title" aria-selected="false" data-tab-index="2" role="tab" tabIndex={-1} aria-controls="e-n-tab-content-1624946442" style={{ '--n-tabs-title-order': "2" } as React.CSSProperties}>
      																<span className="e-n-tab-title-text">
      																	{SOL[1].tab} </span>
      															</button>
      															<button id="e-n-tab-title-1624946443" data-tab-title-id="e-n-tab-title-1624946443" className="e-n-tab-title" aria-selected="false" data-tab-index="3" role="tab" tabIndex={-1} aria-controls="e-n-tab-content-1624946443" style={{ '--n-tabs-title-order': "3" } as React.CSSProperties}>
      																<span className="e-n-tab-title-text">
      																	{SOL[2].tab} </span>
      															</button>
      														</div>
      														<div className="e-n-tabs-content">
      															<div id="e-n-tab-content-1624946441" role="tabpanel" aria-labelledby="e-n-tab-title-1624946441" data-tab-index="1" style={{ '--n-tabs-title-order': "1" } as React.CSSProperties} className="e-active elementor-element elementor-element-2c53b5e e-con-full e-flex e-con e-child" data-id="2c53b5e" data-element_type="container" data-e-type="container">
      																<div className="elementor-element elementor-element-304a6aa e-con-full e-flex e-con e-child" data-id="304a6aa" data-element_type="container" data-e-type="container">
      																	<div className="vamtam-has-theme-widget-styles elementor-element elementor-element-ebee893 elementor-invisible animated-fast elementor-widget elementor-widget-text-editor" data-id="ebee893" data-element_type="widget" data-e-type="widget" data-settings={"{\"_animation\":\"fadeIn\"}"} data-widget_type="text-editor.default">
      																		<div className="elementor-widget-container">
      																			<p>{SOL[0].intro}</p>
      																		</div>
      																	</div>
      																	<div className="elementor-element elementor-element-013bb2d elementor-hidden-tablet elementor-hidden-mobile elementor-widget elementor-widget-spacer" data-id="013bb2d" data-element_type="widget" data-e-type="widget" data-widget_type="spacer.default">
      																		<div className="elementor-widget-container">
      																			<div className="elementor-spacer">
      																				<div className="elementor-spacer-inner"></div>
      																			</div>
      																		</div>
      																	</div>
      																	<div className="elementor-element elementor-element-b39c796 elementor-invisible e-con-full animated-fast e-flex e-con e-child" data-id="b39c796" data-element_type="container" data-e-type="container" data-settings={"{\"animation\":\"slideInUp\"}"}>
      																		<div className="elementor-element elementor-element-8bd2e78 elementor-widget elementor-widget-heading" data-id="8bd2e78" data-element_type="widget" data-e-type="widget" data-widget_type="heading.default">
      																			<div className="elementor-widget-container">
      																				<h5 className="elementor-heading-title elementor-size-default">{SOL[0].items[0].name}</h5>
      																			</div>
      																		</div>
      																		<div className="elementor-element elementor-element-fb1cbfe elementor-widget elementor-widget-heading" data-id="fb1cbfe" data-element_type="widget" data-e-type="widget" data-widget_type="heading.default">
      																			<div className="elementor-widget-container">
      																				<span className="elementor-heading-title elementor-size-default">{SOL[0].items[0].cardText}</span>
      																			</div>
      																		</div>
      																	</div>
      																	<div className="elementor-element elementor-element-76e2ddb elementor-invisible e-con-full animated-fast e-flex e-con e-child" data-id="76e2ddb" data-element_type="container" data-e-type="container" data-settings={"{\"animation\":\"slideInUp\",\"animation_delay\":50}"}>
      																		<div className="elementor-element elementor-element-088c3c8 elementor-widget elementor-widget-heading" data-id="088c3c8" data-element_type="widget" data-e-type="widget" data-widget_type="heading.default">
      																			<div className="elementor-widget-container">
      																				<h5 className="elementor-heading-title elementor-size-default">{SOL[0].items[1].name}</h5>
      																			</div>
      																		</div>
      																		<div className="elementor-element elementor-element-3669349 elementor-widget elementor-widget-heading" data-id="3669349" data-element_type="widget" data-e-type="widget" data-widget_type="heading.default">
      																			<div className="elementor-widget-container">
      																				<span className="elementor-heading-title elementor-size-default">{SOL[0].items[1].cardText}</span>
      																			</div>
      																		</div>
      																	</div>
      																	<div className="elementor-element elementor-element-1b6f08c elementor-invisible e-con-full animated-fast e-flex e-con e-child" data-id="1b6f08c" data-element_type="container" data-e-type="container" data-settings={"{\"animation\":\"slideInUp\",\"animation_delay\":100}"}>
      																		<div className="elementor-element elementor-element-860873a elementor-widget elementor-widget-heading" data-id="860873a" data-element_type="widget" data-e-type="widget" data-widget_type="heading.default">
      																			<div className="elementor-widget-container">
      																				<h5 className="elementor-heading-title elementor-size-default">{SOL[0].items[2].name}</h5>
      																			</div>
      																		</div>
      																		<div className="elementor-element elementor-element-d6dd169 elementor-widget elementor-widget-heading" data-id="d6dd169" data-element_type="widget" data-e-type="widget" data-widget_type="heading.default">
      																			<div className="elementor-widget-container">
      																				<span className="elementor-heading-title elementor-size-default">{SOL[0].items[2].cardText}</span>
      																			</div>
      																		</div>
      																	</div>
      																</div>
      																<div className="elementor-element elementor-element-aa3aa17 e-con-full e-flex e-con e-child" data-id="aa3aa17" data-element_type="container" data-e-type="container" data-settings={"{\"background_background\":\"classic\"}"}>
      																	<div className="elementor-element elementor-element-c645356 e-con-full e-flex e-con e-child" data-id="c645356" data-element_type="container" data-e-type="container" data-settings={"{\"position\":\"absolute\"}"}>
      																		<div className="elementor-element elementor-element-a7ee314 elementor-widget elementor-widget-template" data-id="a7ee314" data-element_type="widget" data-e-type="widget" data-widget_type="template.default">
      																			<div className="elementor-widget-container">
      																				<div className="elementor-template">
      																					<div data-elementor-type="container" data-elementor-id="7162" className="elementor elementor-7162" data-elementor-post-type="elementor_library">
      																						<div className="elementor-element elementor-element-c895366 e-con-full e-flex e-con e-child" data-id="c895366" data-element_type="container" data-e-type="container">
      																							<div className="elementor-element elementor-element-37bc217 e-con-full blur-background e-flex e-con e-child" data-id="37bc217" data-element_type="container" data-e-type="container">
      																							</div>
      																							<div className="elementor-element elementor-element-7aa6fbd e-con-full blur-background e-flex e-con e-child" data-id="7aa6fbd" data-element_type="container" data-e-type="container">
      																							</div>
      																							<div className="elementor-element elementor-element-5500eb5 e-con-full blur-background e-flex e-con e-child" data-id="5500eb5" data-element_type="container" data-e-type="container">
      																							</div>
      																							<div className="elementor-element elementor-element-ba4229b e-con-full blur-background e-flex e-con e-child" data-id="ba4229b" data-element_type="container" data-e-type="container">
      																							</div>
      																							<div className="elementor-element elementor-element-0df9fbc e-con-full blur-background e-flex e-con e-child" data-id="0df9fbc" data-element_type="container" data-e-type="container">
      																							</div>
      																							<div className="elementor-element elementor-element-a5c7002 e-con-full blur-background elementor-hidden-mobile e-flex e-con e-child" data-id="a5c7002" data-element_type="container" data-e-type="container">
      																							</div>
      																						</div>
      																					</div>
      																				</div>
      																			</div>
      																		</div>
      																	</div>
      																	<div className="vamtam-has-theme-widget-styles elementor-element elementor-element-af8c0d5 elementor-view-default elementor-widget elementor-widget-icon" data-id="af8c0d5" data-element_type="widget" data-e-type="widget" data-widget_type="icon.default">
      																		<div className="elementor-widget-container">
      																			<div className="elementor-icon-wrapper">
      																				<div className="elementor-icon">
      																					<img src={`${BASE}/LOGO/icon-white.jpg`} alt="VALUNXT" className="vamtam-logo-sign-img" />
      																				</div>
      																			</div>
      																		</div>
      																	</div>
      																	<div className="vamtam-has-theme-widget-styles elementor-element elementor-element-d48003c vamtam-icon-pos-row-reverse elementor-widget elementor-widget-button" data-id="d48003c" data-element_type="widget" data-e-type="widget" data-widget_type="button.default">
      																		<div className="elementor-widget-container">
      																			<div className="elementor-button-wrapper">
      																				<a className="elementor-button elementor-button-link elementor-size-sm" href={rurl(region, '/free-consultation/')}>
      																					<span className="elementor-button-content-wrapper">
      																						<span className="elementor-button-icon">
      																							<i aria-hidden="true" className="vamtamtheme- vamtam-theme-arrow-right"></i> </span>
      																						<span className="elementor-button-text">{AT_HERO.primary.label}</span>
      																					</span>
      																				</a>
      																			</div>
      																		</div>
      																	</div>
      																</div>
      															</div>
      															<div id="e-n-tab-content-1624946442" role="tabpanel" aria-labelledby="e-n-tab-title-1624946442" data-tab-index="2" style={{ '--n-tabs-title-order': "2" } as React.CSSProperties} className=" elementor-element elementor-element-b09ef26 e-con-full e-flex e-con e-child" data-id="b09ef26" data-element_type="container" data-e-type="container">
      																<div className="elementor-element elementor-element-1f65f56 e-con-full e-flex e-con e-child" data-id="1f65f56" data-element_type="container" data-e-type="container">
      																	<div className="vamtam-has-theme-widget-styles elementor-element elementor-element-f17fe4b elementor-invisible animated-fast elementor-widget elementor-widget-text-editor" data-id="f17fe4b" data-element_type="widget" data-e-type="widget" data-settings={"{\"_animation\":\"fadeIn\"}"} data-widget_type="text-editor.default">
      																		<div className="elementor-widget-container">
      																			<p>{SOL[1].intro}</p>
      																		</div>
      																	</div>
      																	<div className="elementor-element elementor-element-0613e1d elementor-hidden-tablet elementor-hidden-mobile elementor-widget elementor-widget-spacer" data-id="0613e1d" data-element_type="widget" data-e-type="widget" data-widget_type="spacer.default">
      																		<div className="elementor-widget-container">
      																			<div className="elementor-spacer">
      																				<div className="elementor-spacer-inner"></div>
      																			</div>
      																		</div>
      																	</div>
      																	<div className="elementor-element elementor-element-6f77473 elementor-invisible e-con-full animated-fast e-flex e-con e-child" data-id="6f77473" data-element_type="container" data-e-type="container" data-settings={"{\"animation\":\"slideInUp\"}"}>
      																		<div className="elementor-element elementor-element-62bf561 elementor-widget elementor-widget-heading" data-id="62bf561" data-element_type="widget" data-e-type="widget" data-widget_type="heading.default">
      																			<div className="elementor-widget-container">
      																				<h5 className="elementor-heading-title elementor-size-default">{SOL[1].items[0].name}</h5>
      																			</div>
      																		</div>
      																		<div className="elementor-element elementor-element-3fd1366 elementor-widget elementor-widget-heading" data-id="3fd1366" data-element_type="widget" data-e-type="widget" data-widget_type="heading.default">
      																			<div className="elementor-widget-container">
      																				<span className="elementor-heading-title elementor-size-default">{SOL[1].items[0].cardText}</span>
      																			</div>
      																		</div>
      																	</div>
      																	<div className="elementor-element elementor-element-c4d2bf3 elementor-invisible e-con-full animated-fast e-flex e-con e-child" data-id="c4d2bf3" data-element_type="container" data-e-type="container" data-settings={"{\"animation\":\"slideInUp\",\"animation_delay\":50}"}>
      																		<div className="elementor-element elementor-element-a8c50aa elementor-widget elementor-widget-heading" data-id="a8c50aa" data-element_type="widget" data-e-type="widget" data-widget_type="heading.default">
      																			<div className="elementor-widget-container">
      																				<h5 className="elementor-heading-title elementor-size-default">{SOL[1].items[1].name}</h5>
      																			</div>
      																		</div>
      																		<div className="elementor-element elementor-element-606e001 elementor-widget elementor-widget-heading" data-id="606e001" data-element_type="widget" data-e-type="widget" data-widget_type="heading.default">
      																			<div className="elementor-widget-container">
      																				<span className="elementor-heading-title elementor-size-default">{SOL[1].items[1].cardText}</span>
      																			</div>
      																		</div>
      																	</div>
      																	<div className="elementor-element elementor-element-1cf2afa elementor-invisible e-con-full animated-fast e-flex e-con e-child" data-id="1cf2afa" data-element_type="container" data-e-type="container" data-settings={"{\"animation\":\"slideInUp\",\"animation_delay\":100}"}>
      																		<div className="elementor-element elementor-element-27dcb8b elementor-widget elementor-widget-heading" data-id="27dcb8b" data-element_type="widget" data-e-type="widget" data-widget_type="heading.default">
      																			<div className="elementor-widget-container">
      																				<h5 className="elementor-heading-title elementor-size-default">{SOL[1].items[2].name}</h5>
      																			</div>
      																		</div>
      																		<div className="elementor-element elementor-element-e2fb95b elementor-widget elementor-widget-heading" data-id="e2fb95b" data-element_type="widget" data-e-type="widget" data-widget_type="heading.default">
      																			<div className="elementor-widget-container">
      																				<span className="elementor-heading-title elementor-size-default">{SOL[1].items[2].cardText}</span>
      																			</div>
      																		</div>
      																	</div>
      																</div>
      																<div className="elementor-element elementor-element-b12020e e-con-full e-flex e-con e-child" data-id="b12020e" data-element_type="container" data-e-type="container" data-settings={"{\"background_background\":\"classic\"}"}>
      																	<div className="elementor-element elementor-element-4bec2ed e-con-full e-flex e-con e-child" data-id="4bec2ed" data-element_type="container" data-e-type="container" data-settings={"{\"position\":\"absolute\"}"}>
      																		<div className="elementor-element elementor-element-c0a24aa e-con-full blur-background e-flex e-con e-child" data-id="c0a24aa" data-element_type="container" data-e-type="container">
      																		</div>
      																		<div className="elementor-element elementor-element-8c08fe0 e-con-full blur-background e-flex e-con e-child" data-id="8c08fe0" data-element_type="container" data-e-type="container">
      																		</div>
      																		<div className="elementor-element elementor-element-acc151c e-con-full blur-background e-flex e-con e-child" data-id="acc151c" data-element_type="container" data-e-type="container">
      																		</div>
      																		<div className="elementor-element elementor-element-b133692 e-con-full blur-background e-flex e-con e-child" data-id="b133692" data-element_type="container" data-e-type="container">
      																		</div>
      																		<div className="elementor-element elementor-element-83dbc33 e-con-full blur-background e-flex e-con e-child" data-id="83dbc33" data-element_type="container" data-e-type="container">
      																		</div>
      																		<div className="elementor-element elementor-element-11b87a4 e-con-full blur-background e-flex e-con e-child" data-id="11b87a4" data-element_type="container" data-e-type="container">
      																		</div>
      																	</div>
      																	<div className="vamtam-has-theme-widget-styles elementor-element elementor-element-6e950e7 elementor-view-default elementor-widget elementor-widget-icon" data-id="6e950e7" data-element_type="widget" data-e-type="widget" data-widget_type="icon.default">
      																		<div className="elementor-widget-container">
      																			<div className="elementor-icon-wrapper">
      																				<div className="elementor-icon">
      																					<img src={`${BASE}/LOGO/icon-white.jpg`} alt="VALUNXT" className="vamtam-logo-sign-img" />
      																				</div>
      																			</div>
      																		</div>
      																	</div>
      																	<div className="vamtam-has-theme-widget-styles elementor-element elementor-element-369ca21 vamtam-icon-pos-row-reverse elementor-widget elementor-widget-button" data-id="369ca21" data-element_type="widget" data-e-type="widget" data-widget_type="button.default">
      																		<div className="elementor-widget-container">
      																			<div className="elementor-button-wrapper">
      																				<a className="elementor-button elementor-button-link elementor-size-sm" href={rurl(region, '/free-consultation/')}>
      																					<span className="elementor-button-content-wrapper">
      																						<span className="elementor-button-icon">
      																							<i aria-hidden="true" className="vamtamtheme- vamtam-theme-arrow-right"></i> </span>
      																						<span className="elementor-button-text">{AT_HERO.primary.label}</span>
      																					</span>
      																				</a>
      																			</div>
      																		</div>
      																	</div>
      																</div>
      															</div>
      															<div id="e-n-tab-content-1624946443" role="tabpanel" aria-labelledby="e-n-tab-title-1624946443" data-tab-index="3" style={{ '--n-tabs-title-order': "3" } as React.CSSProperties} className=" elementor-element elementor-element-8c8b5b0 e-con-full e-flex e-con e-child" data-id="8c8b5b0" data-element_type="container" data-e-type="container">
      																<div className="elementor-element elementor-element-9cbfb46 e-con-full e-flex e-con e-child" data-id="9cbfb46" data-element_type="container" data-e-type="container">
      																	<div className="vamtam-has-theme-widget-styles elementor-element elementor-element-70aeb57 elementor-invisible animated-fast elementor-widget elementor-widget-text-editor" data-id="70aeb57" data-element_type="widget" data-e-type="widget" data-settings={"{\"_animation\":\"fadeIn\"}"} data-widget_type="text-editor.default">
      																		<div className="elementor-widget-container">
      																			<p>{SOL[2].intro}</p>
      																		</div>
      																	</div>
      																	<div className="elementor-element elementor-element-e1c4161 elementor-hidden-tablet elementor-hidden-mobile elementor-widget elementor-widget-spacer" data-id="e1c4161" data-element_type="widget" data-e-type="widget" data-widget_type="spacer.default">
      																		<div className="elementor-widget-container">
      																			<div className="elementor-spacer">
      																				<div className="elementor-spacer-inner"></div>
      																			</div>
      																		</div>
      																	</div>
      																	<div className="elementor-element elementor-element-7b2bedd elementor-invisible e-con-full animated-fast e-flex e-con e-child" data-id="7b2bedd" data-element_type="container" data-e-type="container" data-settings={"{\"animation\":\"slideInUp\"}"}>
      																		<div className="elementor-element elementor-element-43e1c5b elementor-widget elementor-widget-heading" data-id="43e1c5b" data-element_type="widget" data-e-type="widget" data-widget_type="heading.default">
      																			<div className="elementor-widget-container">
      																				<h5 className="elementor-heading-title elementor-size-default">{SOL[2].items[0].name}</h5>
      																			</div>
      																		</div>
      																		<div className="elementor-element elementor-element-91573d5 elementor-widget elementor-widget-heading" data-id="91573d5" data-element_type="widget" data-e-type="widget" data-widget_type="heading.default">
      																			<div className="elementor-widget-container">
      																				<span className="elementor-heading-title elementor-size-default">{SOL[2].items[0].cardText}</span>
      																			</div>
      																		</div>
      																	</div>
      																	<div className="elementor-element elementor-element-25d7ebe elementor-invisible e-con-full animated-fast e-flex e-con e-child" data-id="25d7ebe" data-element_type="container" data-e-type="container" data-settings={"{\"animation\":\"slideInUp\",\"animation_delay\":50}"}>
      																		<div className="elementor-element elementor-element-713a3f8 elementor-widget elementor-widget-heading" data-id="713a3f8" data-element_type="widget" data-e-type="widget" data-widget_type="heading.default">
      																			<div className="elementor-widget-container">
      																				<h5 className="elementor-heading-title elementor-size-default">{SOL[2].items[1].name}</h5>
      																			</div>
      																		</div>
      																		<div className="elementor-element elementor-element-ccb9733 elementor-widget elementor-widget-heading" data-id="ccb9733" data-element_type="widget" data-e-type="widget" data-widget_type="heading.default">
      																			<div className="elementor-widget-container">
      																				<span className="elementor-heading-title elementor-size-default">{SOL[2].items[1].cardText}</span>
      																			</div>
      																		</div>
      																	</div>
      																</div>
      																<div className="elementor-element elementor-element-9106445 e-con-full e-flex e-con e-child" data-id="9106445" data-element_type="container" data-e-type="container" data-settings={"{\"background_background\":\"classic\"}"}>
      																	<div className="elementor-element elementor-element-a43d0e7 e-con-full e-flex e-con e-child" data-id="a43d0e7" data-element_type="container" data-e-type="container" data-settings={"{\"position\":\"absolute\"}"}>
      																		<div className="elementor-element elementor-element-8578008 e-con-full blur-background e-flex e-con e-child" data-id="8578008" data-element_type="container" data-e-type="container">
      																		</div>
      																		<div className="elementor-element elementor-element-0eb77e5 e-con-full blur-background e-flex e-con e-child" data-id="0eb77e5" data-element_type="container" data-e-type="container">
      																		</div>
      																		<div className="elementor-element elementor-element-23dfb15 e-con-full blur-background e-flex e-con e-child" data-id="23dfb15" data-element_type="container" data-e-type="container">
      																		</div>
      																		<div className="elementor-element elementor-element-a8bfe90 e-con-full blur-background e-flex e-con e-child" data-id="a8bfe90" data-element_type="container" data-e-type="container">
      																		</div>
      																		<div className="elementor-element elementor-element-a5886a5 e-con-full blur-background e-flex e-con e-child" data-id="a5886a5" data-element_type="container" data-e-type="container">
      																		</div>
      																		<div className="elementor-element elementor-element-530e76b e-con-full blur-background e-flex e-con e-child" data-id="530e76b" data-element_type="container" data-e-type="container">
      																		</div>
      																	</div>
      																	<div className="vamtam-has-theme-widget-styles elementor-element elementor-element-80e387a elementor-view-default elementor-widget elementor-widget-icon" data-id="80e387a" data-element_type="widget" data-e-type="widget" data-widget_type="icon.default">
      																		<div className="elementor-widget-container">
      																			<div className="elementor-icon-wrapper">
      																				<div className="elementor-icon">
      																					<img src={`${BASE}/LOGO/icon-white.jpg`} alt="VALUNXT" className="vamtam-logo-sign-img" />
      																				</div>
      																			</div>
      																		</div>
      																	</div>
      																	<div className="vamtam-has-theme-widget-styles elementor-element elementor-element-0a6c708 vamtam-icon-pos-row-reverse elementor-widget elementor-widget-button" data-id="0a6c708" data-element_type="widget" data-e-type="widget" data-widget_type="button.default">
      																		<div className="elementor-widget-container">
      																			<div className="elementor-button-wrapper">
      																				<a className="elementor-button elementor-button-link elementor-size-sm" href={rurl(region, '/free-consultation/')}>
      																					<span className="elementor-button-content-wrapper">
      																						<span className="elementor-button-icon">
      																							<i aria-hidden="true" className="vamtamtheme- vamtam-theme-arrow-right"></i> </span>
      																						<span className="elementor-button-text">{AT_HERO.primary.label}</span>
      																					</span>
      																				</a>
      																			</div>
      																		</div>
      																	</div>
      																</div>
      															</div>
      														</div>
      													</div>
      												</div>
      											</div>
      										</div>
      									</div>
      								</div>
      							</div>
      						</div>
      </div>

          {/* ---- 3. THE PROBLEM ---- */}
          <section className="at-prob" aria-labelledby="at-problem-head">
            <div className="at-in">
              <div className="at-prob__card">
                <div className="at-prob__panel">
                  <h2 className="at-prob__head" id="at-problem-head">
                    {AT_BANNER.head}
                  </h2>
                  <p className="at-prob__body">{AT_BANNER.body}</p>
                  <a className="at-prob__cta" href={AT_BANNER.cta.href}>
                    {AT_BANNER.cta.label}
                    <Arrow />
                  </a>
                </div>

                {/* Decorative: the copy beside it is the whole of the section. */}
                <div className="at-prob__art" aria-hidden="true">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="at-plate at-zoom"
                    src={plate("banner")}
                    alt=""
                    loading="lazy"
                  />
                </div>
              </div>
              {/* The five-card capability ladder and its closing band used to
                  sit here. Removed by request: it restated in five cards what
                  the eight service cards two sections down say with links on
                  them, and the section reached the commercial content faster
                  without it. `turn` is the section's ending now. */}
            </div>
          </section>

          {/* ---- 4. RELATED SERVICES ----
              Twelve sections used to follow the banner: the service explorer,
              the decision table, the finance journey, connected processes, why
              ValuNxt, the comparison, the commercial options, capability
              without headcount, industries, the process rail, the FAQs, the
              lead form and the closing band. All removed by request; they are
              in git if any of it is wanted back.

              The five cards are the registry's other UAE service lines, not
              this page's eight sub-services — those are already the strip
              above, and repeating them here would be the same list twice. */}
          <section className="at-rel" aria-labelledby="at-rel-head">
            <div className="at-in">
              <h2 className="at-rel__head" id="at-rel-head">
                Explore Related Services
              </h2>

              <div className="at-rel__grid">
                {RELATED.map((sv) => (
                  <a
                    className="at-rel__card"
                    href={rurl(region, sv.href)}
                    key={sv.slug ?? sv.href}
                  >
                    <span className="at-rel__panel">
                      <span className="at-rel__eyebrow">Service</span>
                      <span className="at-rel__title">
                        {vxnServiceName(sv)}
                      </span>
                    </span>
                    {/* Decorative: the name beside it is the link's label. */}
                    <span className="at-rel__shot">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={rimgFirst(region, [
                          ...(RELATED_FIGURE[sv.slug ?? ""] ?? []),
                          sv.img.replace("/assets/content/uploads/", ""),
                        ])}
                        alt=""
                        loading="lazy"
                      />
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </section>

          {/* ---- 5. TALK TO AN EXPERT ----
              AT_CLOSE, which the removed closing band used to render: same
              head, same paragraph, same primary link. Its secondary and
              tertiary buttons and the five-line positioning block went with
              that band — this section asks for one thing. */}
          <section className="at-talk" aria-labelledby="at-talk-head">
            <div className="at-in">
              <div className="at-talk__grid">
                {/* Decorative: the copy beside it says what it shows. */}
                <figure className="at-talk__fig">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={plate("talk")} alt="" loading="lazy" />
                </figure>

                <div className="at-talk__copy">
                  <h2 className="at-talk__head" id="at-talk-head">
                    {AT_CLOSE.head}
                  </h2>
                  <p className="at-talk__lede">{AT_CLOSE.lede}</p>
                  <a
                    className="at-talk__cta"
                    href={rurl(region, AT_CLOSE.primary.href)}
                  >
                    {AT_CLOSE.primary.label}
                  </a>
                </div>
              </div>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
}
