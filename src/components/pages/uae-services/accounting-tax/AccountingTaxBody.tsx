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
import { rurl } from "@/lib/region";
import { rimgFirst } from "@/lib/region-assets";
import { MegaIcon } from "@/components/layout/MegaIcons";
import AccountingTaxMotion from "./Motion";
import {
  AT_CAPABILITY,
  AT_CLOSE,
  AT_COMPARE,
  AT_DECISION,
  AT_FAQ,
  AT_FAQ_SHOWN,
  AT_FORM,
  AT_HERO,
  AT_INDUSTRIES,
  AT_JOURNEY,
  AT_JOURNEY_RAIL,
  AT_OPTIONS,
  AT_PROBLEM,
  AT_PROCESS,
  AT_PROCESS_RAIL,
  AT_PROOF,
  AT_SERVICES,
  AT_SYSTEMS,
  AT_TAX,
  AT_WHY,
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
  hero: [
    "services/accounting-tax-hero.webp",
    "homepage/abstract-3.webp",
    "homepage/abstract-3.png",
  ],
  /* Navy with a gold filament sweep. The most editorial of the four and the
     only one with a second colour in it, so it is kept for the two moments the
     page is asking for something — the tax rail and the close. */
  rail: [
    "services/accounting-tax-rail.webp",
    "homepage/abstract-3.webp",
    "homepage/abstract-3.png",
  ],
  close: [
    "services/accounting-tax-close.webp",
    "homepage/abstract-3.webp",
    "homepage/abstract-3.png",
  ],
  /* Portrait ribbon textures. texture-1 runs bright the whole way down, so it
     takes the figure that carries no type; texture-2 keeps a quiet half low in
     the frame and takes the one that does. */
  figure: ["services/accounting-tax-figure.webp", "banners/texture-1.webp"],
  quiet: ["services/accounting-tax-quiet.webp", "banners/texture-2.webp"],
  /* The outsourcing panel takes the service's own photograph rather than a
     ribbon texture: it is the one figure on the page sitting beside a concrete
     commercial argument, and an abstract plate there said nothing the copy did
     not already say. */
  service: [
    "services/accounting-and-tax-services.webp",
    "services/accounting-tax-figure.webp",
  ],
};

const CSS = `
.at-root{
  /* Palette */
  --ny:#0E355F;
  --ny2:#0053B7;
  --ny3:#00408C;
  --body:#4d5863;
  --muted:#6A7590;
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
.at-in,.at-hero__inner,.at-close__inner{
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
.at-h3{
  font-family:"Forum",serif!important;font-weight:400!important;color:var(--ny)!important;
  font-size:21px!important;line-height:1.2!important;margin:0 0 10px!important;
}

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
/* Only on the closing band, which is a navy gradient of its own — white glass
   is right there. (It was tinted navy while it sat on the hero photograph; the
   hero has no buttons any more.) */
.at-btn--ghost{background:rgba(255,255,255,.1);color:#fff!important;border:1px solid rgba(255,255,255,.5);
  backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);}
.at-btn--ghost:hover{background:rgba(255,255,255,.2);border-color:#fff;}
.at-btn--line{background:transparent;color:var(--ny2)!important;border:1px solid rgba(0,83,183,.4);}
.at-btn--line:hover{background:rgba(0,83,183,.07);border-color:var(--ny2);}

/* ---- The pill CTA -------------------------------------------------------
   Both the decision table's right column and the commercial options used
   .at-go: blue text with an arrow after it. Read as a caption, not a control —
   people were not seeing them as things to click, which on the options grid is
   the entire point of the section.

   This is a real button at link scale: a tinted fill, a visible border, and a
   hover that fills solid. It is a size, not a new colour — it uses the same
   --ny2 the ghost and line buttons do, so a page that already has three button
   finishes does not gain a fourth palette. No transform, per the page's rule;
   what changes is fill, border and shadow. */
.at-pill{
  display:inline-flex;align-items:center;justify-content:center;
  padding:10px 20px;border-radius:999px;
  background:rgba(0,83,183,.08);
  border:1px solid rgba(0,83,183,.28);
  color:var(--ny2)!important;
  font-size:13.5px;font-weight:600;line-height:1.3;text-align:center;
  text-decoration:none!important;
  transition:background-color .25s ease,border-color .25s ease,color .25s ease,
             box-shadow .3s ease;
}
.at-pill:hover,.at-pill:focus-visible{
  background:var(--ny2);border-color:var(--ny2);color:#fff!important;
  box-shadow:0 12px 26px -14px rgba(0,64,140,.85);
}
/* A card-width CTA: the options grid gives each card a full-width button, so
   four cards of different copy lengths still end on one line. */
.at-pill--block{display:flex;width:100%;}

/* Inline "Explore →" links. Same rule: the gap opens, nothing moves. */
.at-go{
  display:inline-flex;align-items:center;gap:8px;
  font-size:13.5px;font-weight:600;color:var(--ny2)!important;text-decoration:none!important;
  transition:gap .3s cubic-bezier(.22,.61,.36,1),color .25s ease;
}
.at-go:hover,a:hover > .at-go,*:hover > .at-go{gap:14px;}

/* ==========================================================================
   HERO
   ========================================================================== */
.at-hero{
  position:relative;isolation:isolate;overflow:hidden;
  background:linear-gradient(150deg,#0B4EA8 0%,#0A2A50 100%);
  /* A banner now, not a landing block. The proposition, the chips, the CTAs and
     the four proof points have all moved down into .at-intro, so what is left
     is a label, a title and one line — and the band is sized for that: a fixed
     min-height rather than padding, with the copy sitting on the lower half so
     it reads as a caption on the picture rather than as a slab in the middle
     of it. */
  padding:var(--pad) 0!important;
  min-height:clamp(360px,42vw,480px);
  display:flex;align-items:flex-end;
}
/* NO OVERLAY: the photograph runs at full strength and nothing is painted over
   it. What keeps the white type readable is the crop — the aerial is deep open
   water across its top band and bright sand along the bottom, so
   object-position parks the water behind the copy and lets the island fall
   below it. Now that the hero carries three lines instead of nine, all of them
   sit in the top half, which is the dark half.

   IF THE HERO IMAGE IS EVER SWAPPED, CHECK THIS. A picture that is light at the
   top has nothing holding the headline up, and this page has no scrim to fall
   back on. */
.at-hero .at-plate{--throw:26px;opacity:1;object-position:50% 0%;}
/* The mobile scrim that used to live here is gone with the photograph that
   needed it: abstract-3 is dark at every width, so there is no overlay on this
   hero at any breakpoint. */
/* Two soft fields on long unequal cycles. 'alternate' eases each back to where
   it began, which is what removes the seam an 'infinite' loop would show. */
.at-hero::before,.at-hero::after{
  content:"";position:absolute;z-index:-1;border-radius:50%;
  filter:blur(72px);pointer-events:none;
}
.at-hero::before{
  width:52vw;height:52vw;left:-12vw;top:-18vw;
  background:radial-gradient(circle,rgba(94,160,255,.5) 0%,rgba(94,160,255,0) 70%);
  animation:at-drift-a 21s ease-in-out infinite alternate;
}
.at-hero::after{
  width:46vw;height:46vw;right:-10vw;bottom:-20vw;
  background:radial-gradient(circle,rgba(150,110,255,.36) 0%,rgba(150,110,255,0) 70%);
  animation:at-drift-b 28s ease-in-out infinite alternate;
}
@keyframes at-drift-a{
  from{transform:translate3d(0,0,0) scale(1);}
  to{transform:translate3d(7vw,5vw,0) scale(1.16);}
}
@keyframes at-drift-b{
  from{transform:translate3d(0,0,0) scale(1.1);}
  to{transform:translate3d(-6vw,-4vw,0) scale(.94);}
}
/* The same badge in glass, so the hero's label and every section label below
   it are recognisably one mark in two finishes. */
/* ---- The glass, now tinted navy rather than white --------------------------
   THE PHOTOGRAPH IS NOT DIMMED ANY MORE, so everything written on it has to
   carry its own contrast. A white translucent fill LIGHTENS what is behind it,
   which is fine over an abstract navy plate and useless over pale sand — the
   chips and the ghost button measured 1.3:1 sitting on the villas.

   Same glass — same blur, same lit top edge, same hairline — with a navy fill
   instead of a white one. It reads as glass, it holds white type at better than
   7:1 whatever the picture does underneath, and the picture itself is left
   completely alone. */
.at-hero__kicker{
  display:inline-flex;align-items:center;gap:9px;
  padding:8px 16px 8px 13px!important;border-radius:999px;
  background:rgba(6,24,52,.6);border:1px solid rgba(255,255,255,.34);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.26);
  backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);
  font-size:11px!important;font-weight:700!important;letter-spacing:.15em!important;
  text-transform:uppercase;color:#fff!important;margin:0 0 22px!important;
}
.at-hero__kicker::before{
  content:"";flex:0 0 auto;width:7px;height:7px;border-radius:50%;
  background:#8FC0FF;box-shadow:0 0 0 3px rgba(143,192,255,.28);
}
/* The section's own 40px is the breathing room; the inner adds only the gutter. */
.at-hero__head{
  font-family:"Forum",serif!important;font-weight:400!important;color:#fff!important;
  font-size:clamp(32px,4.4vw,56px)!important;line-height:1.06!important;
  margin:0 0 18px!important;max-width:20ch;
}
.at-hero__sub{
  color:rgba(255,255,255,.9)!important;font-size:17px!important;line-height:1.62!important;
  margin:0!important;max-width:48ch;
}

/* ==========================================================================
   THE INTRO BAND — what the hero used to carry.

   The hero was a two-rail landing block: label, title, description, two chips,
   two buttons, and a glass panel holding the proposition and four proof points.
   Nine things, all fighting one photograph, and the picture lost.

   Every one of them is here instead, on white where they can be read, in the
   order a reader wants them: the proposition, the description, what it costs,
   what to do next — and the four proof points beside it as a panel of their
   own rather than as the hero's right-hand rail.

   The hero above is now a banner: label, title, one line.
   ========================================================================== */
.at-intro{background:#fff;}
.at-intro__grid{
  display:grid;grid-template-columns:minmax(0,1.12fr) minmax(0,.88fr);
  /* Stretch, not centre: the two rails run to the same bottom line. Centring
     was the previous fix for the proof panel being ~200px shorter, and it left
     a gap above AND below it instead of one below. The panel now fills its
     column and spaces its four points out over that height, so the section
     reads as two columns of one block rather than as a block and a card. */
  gap:calc(var(--gap) * 2.4);align-items:stretch;
}
.at-intro__copy{display:flex;flex-direction:column;}
/* A flex child stretches across the cross axis by default, which turned the
   kicker pill into a full-width bar. Everything else in this rail wants the
   full width; only the badge does not. */
.at-intro__copy > .at-kicker{align-self:flex-start;}
/* The buttons sit on the bottom line, so whichever rail is taller sets it. */
.at-intro__ctas{margin-top:auto;}
.at-intro__head{
  font-family:"Forum",serif!important;font-weight:400!important;color:var(--ny)!important;
  font-size:clamp(27px,3.1vw,38px)!important;line-height:1.14!important;
  margin:0 0 18px!important;max-width:22ch;
}
.at-intro__lede{
  color:var(--body)!important;font-size:17px!important;line-height:1.72!important;
  margin:0 0 26px!important;max-width:56ch;
}
/* The hero's chips, on white. Same shape, tinted rather than glazed — there is
   nothing behind them to see through any more. */
.at-intro__chips{display:flex;flex-wrap:wrap;gap:11px;margin:0 0 28px;padding:0;list-style:none;}
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

/* The four proof points. They were a rail inside the glass panel; here they are
   a panel in their own right, so they read as the firm's terms rather than as a
   caption on the hero. */
.at-intro__proof{
  margin:0;padding:30px 28px;list-style:none;
  display:flex;flex-direction:column;justify-content:space-around;gap:20px;
  background:var(--tint);border:1px solid var(--line2);border-radius:var(--radius);
}
.at-intro__item{
  display:grid;grid-template-columns:40px minmax(0,1fr);gap:0 16px;align-items:start;
}
.at-intro__ico{
  display:inline-flex;align-items:center;justify-content:center;
  width:40px;height:40px;border-radius:50%;
  background:rgba(0,83,183,.09);color:var(--ny2);
}
.at-intro__label{
  display:block;font-size:12px!important;font-weight:700!important;letter-spacing:.11em!important;
  text-transform:uppercase;color:var(--ny)!important;margin:0 0 4px!important;
}
.at-intro__note{
  display:block;font-size:14px!important;line-height:1.55!important;
  color:var(--body)!important;margin:0!important;
}

/* ==========================================================================
   THE PROBLEM — rebuilt.

   It was a column of copy beside a picture: six pill-shaped questions, a
   quoted line, then a five-row definition list, all stacked down the left.
   The questions read as tags rather than as questions, and the list — the
   part that actually carries the argument — was the least emphatic thing in
   the section.

   Three blocks now, each doing one job. The questions become cards a reader
   can recognise their own business in. The turn is a full-bleed statement on
   the dark plate, so the section has a middle. And the ladder is drawn as a
   ladder: five rungs that widen as they climb, which is the point the copy is
   making — each capability rests on the one under it.
   ========================================================================== */

/* ---- The questions ------------------------------------------------------
   Six cards, each 90px tall and carrying one short line, with a 30px serif '?'
   above it. Three things were wrong with that. The mark repeated punctuation
   the sentence already ends with, six times. It forced a two-line card for a
   six-word question, so the block ran the height of a screen to say very
   little. And a grid of identical outlined boxes each holding one generic
   question is the shape of filler — which is exactly how it read.

   They are a list now: two columns, one rule between rows, a small brand tick
   in front of each. Same six questions, roughly a third of the height, and the
   section reads as a stated list rather than as six cards pretending each
   question is a product. */
.at-qs{
  display:grid;grid-template-columns:repeat(2,minmax(0,1fr));
  gap:0 calc(var(--gap) * 2);
  margin:0 0 calc(var(--gap) * 1.6);padding:0;list-style:none;
}
.at-q{
  position:relative;display:flex;align-items:baseline;gap:12px;
  padding:13px 2px;border-bottom:1px solid var(--line2);
  transition:color .25s ease;
}
/* The first row of each column has a rule above it too, so the two columns are
   bracketed as one block rather than reading as two loose lists. */
.at-q:nth-child(1),.at-q:nth-child(2){border-top:1px solid var(--line);}
.at-q::before{
  content:"";flex:0 0 auto;width:6px;height:6px;border-radius:50%;
  background:var(--ny2);opacity:.34;transform:translateY(-3px);
  transition:opacity .25s ease,box-shadow .3s ease;
}
.at-q:hover::before{opacity:1;box-shadow:0 0 0 3px rgba(0,83,183,.14);}
.at-q__text{
  display:block;font-size:16px;line-height:1.5;color:var(--ny);font-weight:500;
}

/* ---- The turn: the section's middle, on the plate ---- */
.at-turn{
  position:relative;isolation:isolate;overflow:hidden;
  border-radius:var(--radius);padding:44px 40px;
  background:#0A2A50;margin:0 0 calc(var(--gap) * 2);
}
.at-turn .at-plate{--throw:22px;opacity:1;}
.at-turn::after{
  content:"";position:absolute;inset:0;z-index:-1;pointer-events:none;
  background:linear-gradient(100deg,rgba(6,24,52,.78) 0%,rgba(6,24,52,.52) 46%,rgba(6,24,52,.16) 100%);
}
.at-turn__text{
  font-family:"Forum",serif!important;font-weight:400!important;color:#fff!important;
  font-size:clamp(21px,2.5vw,30px)!important;line-height:1.28!important;
  margin:0!important;max-width:30ch;
}

/* The figure: a texture with the section's closing line on glass over it. */
.at-figure{
  position:relative;isolation:isolate;overflow:hidden;
  border-radius:var(--radius);min-height:440px;
  display:flex;align-items:flex-end;
  padding:30px;
  background:#0A2A50;
}
.at-figure .at-plate{--throw:22px;opacity:.85;}

/* The outsourcing figure carries a photograph, not a plate: it runs at full
   opacity with a scrim only where the caption sits, so the image reads as an
   image and the white type on it still has something to sit against. */
.at-figure--service .at-plate{opacity:1;}
.at-figure--service::after{
  content:"";position:absolute;inset:auto 0 0;height:62%;z-index:-1;pointer-events:none;
  background:linear-gradient(to top,rgba(6,24,52,.72) 0%,rgba(6,24,52,.28) 52%,rgba(6,24,52,0) 100%);
}

.at-figure__quote{
  position:relative;
  padding:22px 24px;border-radius:14px;
  background:rgba(255,255,255,.12);
  border:1px solid rgba(255,255,255,.24);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.26);
  backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);
  font-family:"Forum",serif!important;font-weight:400!important;color:#fff!important;
  font-size:clamp(19px,1.9vw,23px)!important;line-height:1.34!important;margin:0!important;
}

/* ==========================================================================
   THE EIGHT SERVICE CARDS — the commercial centre.

   The hover is the page's rule in miniature: a texture already inside the card
   fades up, an accent rule is wiped in with clip-path, the border and shadow
   lift. Nothing moves.
   ========================================================================== */
.at-services{background:var(--tint);}
.at-cards{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:var(--gap);}
.at-card{
  position:relative;isolation:isolate;overflow:hidden;
  display:flex;flex-direction:column;
  padding:var(--cardpad);background:#fff;
  border:1px solid var(--line);border-radius:var(--radius);
  text-decoration:none!important;
  transition:box-shadow .4s ease,border-color .35s ease;
}
.at-card:hover{border-color:rgba(0,83,183,.34);box-shadow:0 28px 50px -30px rgba(6,18,32,.4);}
/* The plate, already in the card, at zero. */
.at-card__tex{
  position:absolute;inset:0;width:100%;height:100%;object-fit:cover;
  z-index:-1;opacity:0;pointer-events:none;
  transition:opacity .5s ease;
}
.at-card:hover .at-card__tex{opacity:.1;}
/* clip-path rather than scaleX: it paints the same wipe without a transform
   and without touching layout. */
.at-card::after{
  content:"";position:absolute;left:0;right:0;top:0;height:3px;
  background:linear-gradient(90deg,var(--ny2) 0%,#6FA4F2 100%);
  clip-path:inset(0 100% 0 0);
  transition:clip-path .55s cubic-bezier(.22,.61,.36,1);
}
.at-card:hover::after{clip-path:inset(0 0 0 0);}
.at-card__ico{
  display:inline-flex;width:38px;height:38px;align-items:center;justify-content:center;
  margin:0 0 13px;border-radius:11px;
  background:var(--tint2);color:var(--ny2);
  transition:background-color .35s ease,color .35s ease;
}
.at-card:hover .at-card__ico{background:var(--ny2);color:#fff;}
.at-card__eyebrow{
  display:block;font-size:10.5px!important;font-weight:700!important;letter-spacing:.12em!important;
  text-transform:uppercase;color:var(--muted)!important;margin:0 0 6px!important;
}
.at-card__head{
  font-family:"Forum",serif!important;font-weight:400!important;color:var(--ny)!important;
  font-size:19px!important;line-height:1.2!important;margin:0 0 8px!important;
  transition:color .25s ease;
}
.at-card:hover .at-card__head{color:var(--ny2)!important;}
.at-card__text{
  font-size:14px!important;line-height:1.55!important;color:var(--body)!important;margin:0 0 13px!important;
  display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:3;overflow:hidden;
}
/* Clamped, so a card is a fixed shape rather than as tall as its longest
   sentence. The body takes three lines and each meta value two; past that the
   card was setting the height of its whole row for one entry whose "best for"
   ran longer than the rest. The full text is still in the DOM for search and
   for assistive tech — only the painted box is bounded. */
.at-card__meta{margin:0 0 12px;padding:11px 0 0;border-top:1px solid var(--line2);display:grid;gap:7px;}
.at-card__row{display:grid;gap:1px;}
.at-card__k{font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ny2);}
.at-card__v{
  font-size:12.5px;line-height:1.45;color:var(--body);
  display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;overflow:hidden;
}
/* A footnote, not a filled panel. As a box it added ~100px to the one card
   that carries it, so its row stood taller than the row above with nothing
   said for the extra height. The scope limit still travels with the service —
   it is a scope limit, not a marketing line — it just no longer sets the
   height of the grid. */
.at-card__caveat{
  display:block;margin:0 0 13px;padding:0 0 0 12px;
  border-left:2px solid rgba(0,83,183,.3);
  font-size:11.5px;line-height:1.45;color:var(--muted);
}
.at-card__cta{margin-top:auto;}

/* ==========================================================================
   TABLES — the decision tool and the comparison.

   One set of rules, because they are the same object twice. The header is a
   dark plate rather than a tint: it gives each table a top the eye can find on
   a long page, and it is where the artwork earns its place inside a data
   block. Rows alternate, and the hover is a wash — no movement.
   ========================================================================== */
.at-tablewrap{
  position:relative;overflow:hidden;
  border:1px solid var(--line);border-radius:var(--radius);background:#fff;
  box-shadow:0 22px 44px -34px rgba(6,18,32,.3);
}
.at-tablescroll{overflow-x:auto;-webkit-overflow-scrolling:touch;}

/* ---- Horizontal scroll, made visible -------------------------------------
   The table has always scrolled sideways under 660px. Nothing said so: on a
   phone it looked like a table whose second column had been cropped off, and
   the reader had no reason to think the missing half could be reached.

   Three things say it now. A hint line above the table, shown only where the
   scroll actually exists. A fade on the right edge of the wrapper, which is
   the standard "there is more this way" cue. And the fade is hidden the moment
   the reader reaches the end — .is-end is set by the scroll handler in
   Motion.tsx, so the cue stops lying once it has done its job. */
/* Hidden until the table actually overflows. Measured rather than guessed from
   a breakpoint: the trigger is the table being wider than its box, which is the
   thing the reader needs telling about. */
.at-swipe{
  display:none;align-items:center;gap:8px;
  margin:0 0 12px!important;
  font-size:12.5px!important;font-weight:600!important;letter-spacing:.06em!important;
  color:var(--muted)!important;
}
.at-swipe.is-shown{display:flex;}
.at-swipe svg{flex:0 0 auto;color:var(--ny2);animation:at-swipe-nudge 1.9s ease-in-out infinite;}
@keyframes at-swipe-nudge{
  0%,62%,100%{transform:translateX(0);}
  78%{transform:translateX(5px);}
}
@media(prefers-reduced-motion:reduce){.at-swipe svg{animation:none;}}
.at-tablewrap::after{
  content:"";position:absolute;z-index:2;inset:0 0 0 auto;width:56px;
  pointer-events:none;opacity:0;transition:opacity .3s ease;
  background:linear-gradient(to right,rgba(255,255,255,0) 0%,rgba(255,255,255,.96) 82%);
}
.at-tablewrap.is-scrollable::after{opacity:1;}
.at-tablewrap.is-scrollable.is-end::after{opacity:0;}
.at-table{width:100%;min-width:660px;border-collapse:collapse;font-size:15px;}
.at-table th,.at-table td{
  padding:17px 22px!important;text-align:left;vertical-align:middle;
  border-bottom:1px solid var(--line2);
}
.at-table thead th{
  position:relative;isolation:isolate;overflow:hidden;
  background:linear-gradient(140deg,#0B4EA8 0%,#0A2A50 100%);
  color:#fff!important;
  font-size:11.5px!important;font-weight:700!important;letter-spacing:.12em!important;
  text-transform:uppercase;white-space:nowrap;border-bottom:0;
}
.at-table thead th:first-child{padding-left:26px!important;}
.at-table tbody tr:nth-child(even){background:rgba(14,53,95,.022);}
.at-table tbody tr{transition:background-color .25s ease;}
.at-table tbody tr:hover{background:var(--tint2);}
.at-table tbody tr:last-child th,.at-table tbody tr:last-child td{border-bottom:0;}
.at-table td{color:var(--body)!important;line-height:1.6!important;}
.at-table tbody th,.at-table .at-table__says{
  color:var(--ny)!important;font-weight:600!important;font-size:15px!important;
}
.at-table tbody th{padding-left:26px!important;}
.at-table .at-table__says{font-weight:500!important;}
/* The pills set their own vertical padding, so the cell gives them a little
   breathing room and nothing else. */
.at-decide__go{padding-top:12px!important;padding-bottom:12px!important;white-space:nowrap;}
/* The column being argued for, tinted the whole way down and given the tick. */
.at-table--compare td:last-child{
  background:rgba(0,83,183,.055);color:var(--ny)!important;font-weight:500;
}
.at-table--compare tbody tr:hover td:last-child{background:rgba(0,83,183,.1);}
.at-tick{
  display:inline-flex;align-items:center;gap:9px;
}
.at-tick svg{flex:0 0 auto;color:var(--ny2);}

.at-decide__foot{
  display:flex;flex-wrap:wrap;align-items:center;gap:16px;margin-top:28px;
}
.at-decide__ask{font-size:16px!important;color:var(--ny)!important;font-weight:600!important;margin:0!important;}

/* ==========================================================================
   THE FINANCE JOURNEY
   ========================================================================== */
.at-journey{background:var(--tint);}
/* list-style and the margins live here, not on the element. They were inline
   on the <ol>, and an inline margin:0 beats this stylesheet — which is why the
   four cards were sitting flush against the top edge of the rail below them
   with no gap at all. The rail is a separate statement, so it gets a clear
   step away from the row rather than the grid's own 24px. */
.at-journey__grid{
  display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:var(--gap);
  list-style:none;margin:0 0 calc(var(--gap) * 1.75);padding:0;
}
.at-journey__step{
  position:relative;isolation:isolate;overflow:hidden;
  padding:var(--cardpad);background:#fff;
  border:1px solid var(--line);border-radius:var(--radius);
  transition:box-shadow .4s ease,border-color .35s ease;
}
.at-journey__step:hover{border-color:rgba(0,83,183,.34);box-shadow:0 24px 44px -30px rgba(6,18,32,.36);}
.at-journey__step::after{
  content:"";position:absolute;left:0;right:0;top:0;height:3px;
  background:linear-gradient(90deg,var(--ny2) 0%,#6FA4F2 100%);
  clip-path:inset(0 100% 0 0);
  transition:clip-path .55s cubic-bezier(.22,.61,.36,1);
}
.at-journey__step:hover::after{clip-path:inset(0 0 0 0);}
.at-journey__n{
  display:inline-flex;align-items:center;justify-content:center;
  width:34px;height:34px;border-radius:999px;margin:0 0 16px;
  background:var(--tint2);color:var(--ny2);font-size:14px;font-weight:700;
  transition:background-color .35s ease,color .35s ease;
}
.at-journey__step:hover .at-journey__n{background:var(--ny2);color:#fff;}
.at-journey__stage{
  display:block;font-size:11px!important;font-weight:700!important;letter-spacing:.14em!important;
  text-transform:uppercase;color:var(--ny2)!important;margin:0 0 8px!important;
}
.at-journey__svc{display:block;font-size:13px;font-weight:600;color:var(--ny)!important;margin:0 0 10px;}
.at-journey__note{font-size:14px!important;line-height:1.62!important;color:var(--body)!important;margin:0!important;}

/* The rail: the page's second glass panel, over the gold-filament plate. */
.at-rail{
  position:relative;isolation:isolate;overflow:hidden;border-radius:var(--radius);
  padding:38px;background:#0A2A50;
  border:1px solid rgba(255,255,255,.14);
}
/* The banner reads as itself. The plate is at full strength and the scrim over
   it is only what the copy needs: heavier on the left, where the heading and
   two paragraphs sit, and close to clear on the right, where the artwork's
   gold sweep is and nothing is written. Measured against the plate's lightest
   passage, white type stays past 7:1 on the left third. */
.at-rail .at-plate{--throw:22px;opacity:1;}
.at-rail__kick{
  display:block;font-size:11.5px!important;font-weight:700!important;letter-spacing:.14em!important;
  text-transform:uppercase;color:rgba(255,255,255,.82)!important;margin:0 0 12px!important;
}
.at-rail__head{
  font-family:"Forum",serif!important;font-weight:400!important;color:#fff!important;
  font-size:clamp(23px,2.7vw,32px)!important;line-height:1.14!important;margin:0 0 14px!important;
}
.at-rail__text{color:rgba(255,255,255,.9)!important;font-size:15.5px!important;line-height:1.72!important;margin:0 0 8px!important;max-width:78ch;}
.at-rail__flow{display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:24px 0 18px;padding:0;list-style:none;}
.at-rail__item{
  padding:9px 17px;border-radius:999px;
  background:rgba(255,255,255,.13);border:1px solid rgba(255,255,255,.26);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.28);
  backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);
  color:#fff;font-size:12.5px;font-weight:600;letter-spacing:.07em;text-transform:uppercase;
}
.at-rail__sep{color:rgba(255,255,255,.55);font-size:14px;}
.at-rail__close{
  font-family:"Forum",serif!important;font-weight:400!important;color:#fff!important;
  font-size:clamp(18px,2.1vw,24px)!important;line-height:1.3!important;margin:0!important;
}

/* ==========================================================================
   CONNECTED PROCESSES — rebuilt from scratch.

   It was a bulleted list beside a picture. The list said five true things and
   drew no connection between them, which is the one thing the section exists
   to say: all five start in the same place.

   So it is drawn as a dependency map. Five columns, each naming a process and
   what it starts from, all of them dropping a stem onto one spine, and under
   the spine the foundation they share. The closing line sits on that
   foundation because that is where the argument lands.
   ========================================================================== */
.at-dep{margin:0;padding:0;list-style:none;
  display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:var(--gap);}
.at-dep__item{
  position:relative;display:flex;flex-direction:column;
  padding:24px 20px 26px;background:#fff;
  border:1px solid var(--line);border-radius:var(--radius);
  transition:border-color .35s ease,box-shadow .4s ease;
}
.at-dep__item:hover{border-color:rgba(0,83,183,.34);box-shadow:0 22px 40px -30px rgba(6,18,32,.34);}
.at-dep__subject{
  font-family:"Forum",serif!important;font-weight:400!important;
  font-size:20px!important;line-height:1.18!important;color:var(--ny)!important;
  margin:0 0 14px!important;
}
.at-dep__link{
  display:inline-flex;align-items:center;gap:7px;
  font-size:10.5px;font-weight:700;letter-spacing:.11em;text-transform:uppercase;
  color:var(--ny2);margin:0 0 8px;
}
.at-dep__link::before{content:"";width:14px;height:1px;background:currentColor;opacity:.6;}
.at-dep__source{font-size:14px;line-height:1.5;color:var(--body);margin:0;}
/* The stem: each column drops onto the spine below it. */
.at-dep__item::after{
  content:"";position:absolute;left:50%;bottom:calc(var(--gap) * -1);
  width:1px;height:var(--gap);background:rgba(0,83,183,.28);
}

.at-dep__spine{
  height:1px;background:linear-gradient(90deg,
    rgba(0,83,183,0) 0%,rgba(0,83,183,.34) 10%,
    rgba(0,83,183,.34) 90%,rgba(0,83,183,0) 100%);
  margin:var(--gap) 0 0;
}

/* The foundation everything above rests on. */
.at-dep__base{
  position:relative;isolation:isolate;overflow:hidden;
  margin:var(--gap) 0 0;padding:40px;border-radius:var(--radius);
  background:#0A2A50;
}
.at-dep__base .at-plate{--throw:22px;opacity:1;}

.at-dep__basekick{
  display:inline-flex;align-items:center;gap:9px;
  padding:8px 16px 8px 13px;border-radius:999px;
  background:rgba(255,255,255,.13);border:1px solid rgba(255,255,255,.28);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.3);
  backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);
  font-size:11px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:#fff;
  margin:0 0 18px;
}
.at-dep__basekick::before{content:"";width:7px;height:7px;border-radius:50%;background:#8FC0FF;
  box-shadow:0 0 0 3px rgba(143,192,255,.28);}
.at-dep__baseclose{
  font-family:"Forum",serif!important;font-weight:400!important;color:#fff!important;
  font-size:clamp(21px,2.5vw,31px)!important;line-height:1.26!important;
  margin:0 0 20px!important;max-width:26ch;
}
.at-dep__basebody{color:rgba(255,255,255,.86)!important;font-size:15.5px!important;
  line-height:1.7!important;margin:0 0 6px!important;max-width:72ch;}

/* ==========================================================================
   WHY VALUNXT
   ========================================================================== */
.at-why{background:var(--tint);}
.at-why__grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:var(--gap);margin-bottom:36px;}
.at-why__item{
  position:relative;isolation:isolate;overflow:hidden;
  padding:var(--cardpad);background:#fff;border:1px solid var(--line);border-radius:var(--radius);
  transition:box-shadow .4s ease,border-color .35s ease;
}
.at-why__item:hover{border-color:rgba(0,83,183,.34);box-shadow:0 24px 44px -30px rgba(6,18,32,.36);}
.at-why__tex{
  position:absolute;inset:0;width:100%;height:100%;object-fit:cover;
  z-index:-1;opacity:0;pointer-events:none;transition:opacity .5s ease;
}
.at-why__item:hover .at-why__tex{opacity:.1;}
.at-why__item p{font-size:14.5px!important;line-height:1.66!important;color:var(--body)!important;margin:0 0 9px!important;}
.at-why__item p:last-child{margin-bottom:0!important;}
.at-sys{display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:0 0 28px;padding:0;list-style:none;}
.at-sys__chip{
  padding:10px 20px;border-radius:999px;background:#fff;border:1px solid var(--line);
  font-size:13.5px;font-weight:600;color:var(--ny);
  transition:border-color .25s ease,color .25s ease,box-shadow .3s ease;
}
.at-sys__chip:hover{border-color:rgba(0,83,183,.44);color:var(--ny2);box-shadow:0 10px 22px -16px rgba(6,18,32,.4);}

/* ==========================================================================
   COMPARISON + OPTIONS
   ========================================================================== */
.at-compare__close{
  font-family:"Forum",serif!important;font-weight:400!important;color:var(--ny)!important;
  font-size:clamp(20px,2.4vw,28px)!important;line-height:1.3!important;margin:36px 0 14px!important;max-width:100%;
}
.at-compare__note p{font-size:15.5px!important;line-height:1.7!important;color:var(--body)!important;margin:0 0 7px!important;max-width:74ch;}

.at-options{background:var(--tint);}
.at-options__grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:var(--gap);}
.at-option{
  position:relative;isolation:isolate;overflow:hidden;
  display:flex;flex-direction:column;padding:var(--cardpad);
  background:#fff;border:1px solid var(--line);border-radius:var(--radius);
  transition:box-shadow .4s ease,border-color .35s ease;
}
.at-option:hover{border-color:rgba(0,83,183,.34);box-shadow:0 28px 50px -30px rgba(6,18,32,.4);}
.at-option__tex{
  position:absolute;inset:0;width:100%;height:100%;object-fit:cover;
  z-index:-1;opacity:0;pointer-events:none;transition:opacity .5s ease;
}
.at-option:hover .at-option__tex{opacity:.1;}
.at-option__label{
  display:block;font-size:11px!important;font-weight:700!important;letter-spacing:.12em!important;
  text-transform:uppercase;color:var(--muted)!important;margin:0 0 14px!important;
}
.at-option__price{
  font-family:"Forum",serif!important;font-weight:400!important;color:var(--ny)!important;
  font-size:25px!important;line-height:1.16!important;margin:0 0 14px!important;
}
.at-option__note{font-size:14px!important;line-height:1.62!important;color:var(--body)!important;margin:0 0 22px!important;}
.at-option__cta{margin-top:auto;}

/* ==========================================================================
   CAPABILITY WITHOUT HEADCOUNT
   ========================================================================== */
/* stretch, not start: the two sides are meant to be one object, and a photo
   that stops 180px above the panel beside it reads as a mistake. The panel is
   a flex column with its foot pinned, so whichever side is taller sets the
   height and the other fills it. */
.at-cap__grid{
  display:grid;grid-template-columns:minmax(0,1fr) minmax(0,.78fr);gap:calc(var(--gap) * 2);
  align-items:stretch;
}
.at-cap__panel{
  display:flex;flex-direction:column;
  padding:var(--cardpad) calc(var(--cardpad) * 1.4) calc(var(--cardpad) * 1.4);
  background:linear-gradient(160deg,var(--tint) 0%,#fff 62%);
  border:1px solid var(--line);border-radius:var(--radius);
}
.at-cap__head{margin-bottom:22px;}
.at-cap__head .at-h2{margin-bottom:0!important;}
.at-cap__ask{
  font-size:12px!important;font-weight:700!important;letter-spacing:.12em!important;
  text-transform:uppercase;color:var(--muted)!important;margin:0 0 16px!important;
}

/* The roster. Two columns of numbered rows on a shared hairline grid — the
   reader can count six of them, which is the whole point the copy is making
   about six permanent hires. */
.at-cap__roles{
  display:grid;grid-template-columns:repeat(2,minmax(0,1fr));
  gap:0;margin:0 0 26px;padding:0;list-style:none;
  border-top:1px solid var(--line2);
}
.at-cap__role{
  display:flex;align-items:baseline;gap:14px;
  padding:14px 14px 14px 2px;border-bottom:1px solid var(--line2);
  transition:background-color .25s ease;
}
/* The centre gutter, drawn as a border on the odd cells only so the two
   columns share one rule rather than each carrying an edge. */
.at-cap__role:nth-child(odd){border-right:1px solid var(--line2);padding-right:22px;}
.at-cap__role:nth-child(even){padding-left:22px;}
.at-cap__role:hover{background:rgba(0,83,183,.045);}
.at-cap__n{
  flex:0 0 auto;font-family:"Forum",serif;font-size:14px;line-height:1;
  color:rgba(0,83,183,.5);letter-spacing:.04em;transition:color .25s ease;
}
.at-cap__role:hover .at-cap__n{color:var(--ny2);}
.at-cap__rolename{font-size:15px;line-height:1.4;color:var(--ny);font-weight:500;}

.at-cap__body{margin:0 0 22px;}
.at-cap__body p{
  font-size:15.5px!important;line-height:1.7!important;color:var(--body)!important;
  margin:0 0 8px!important;
}
.at-cap__body p:last-child{margin-bottom:0!important;}
.at-cap__close{
  position:relative;padding:0 0 0 20px;
  font-family:"Forum",serif!important;font-weight:400!important;color:var(--ny)!important;
  font-size:clamp(19px,2.1vw,24px)!important;line-height:1.34!important;
  margin:0 0 26px!important;max-width:34ch;
}
.at-cap__close::before{
  content:"";position:absolute;left:0;top:.24em;bottom:.16em;width:3px;
  border-radius:2px;background:var(--ny2);
}
/* Pinned to the foot, which is what makes the panel's height free to match
   the photograph's without leaving the button floating mid-column. */
.at-cap__foot{margin-top:auto;padding-top:4px;}

/* ==========================================================================
   INDUSTRIES
   ========================================================================== */
.at-ind{background:var(--tint);}
.at-ind__grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:var(--gap);}
.at-ind__item{
  position:relative;isolation:isolate;overflow:hidden;
  padding:var(--cardpad);background:#fff;
  border:1px solid var(--line);border-radius:var(--radius);
  transition:box-shadow .4s ease,border-color .35s ease;
}
.at-ind__tex{
  position:absolute;inset:0;width:100%;height:100%;object-fit:cover;
  z-index:-1;opacity:0;pointer-events:none;transition:opacity .5s ease;
}
.at-ind__item:hover{border-color:rgba(0,83,183,.34);box-shadow:0 24px 44px -30px rgba(6,18,32,.36);}
.at-ind__item:hover .at-ind__tex{opacity:.12;}
.at-ind__item::before{
  content:"";position:absolute;left:0;top:0;bottom:0;width:3px;
  background:linear-gradient(180deg,var(--ny2),rgba(0,83,183,0));
  clip-path:inset(100% 0 0 0);
  transition:clip-path .5s cubic-bezier(.22,.61,.36,1);
}
.at-ind__item:hover::before{clip-path:inset(0 0 0 0);}
.at-ind__item p{font-size:14.5px!important;line-height:1.66!important;color:var(--body)!important;margin:0 0 9px!important;}
.at-ind__item p:last-child{margin-bottom:0!important;}

/* ==========================================================================
   PROCESS
   ========================================================================== */
.at-proc__grid{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:var(--gap);
  list-style:none;margin:0 0 32px;padding:0;}
.at-proc__step{
  padding:26px 20px 24px;border-top:2px solid var(--line);
  transition:border-top-color .35s ease;
}
.at-proc__step:hover{border-top-color:var(--ny2);}
.at-proc__n{
  display:block;font-family:"Forum",serif!important;font-size:32px!important;line-height:1!important;
  color:rgba(0,83,183,.28)!important;margin:0 0 14px!important;transition:color .35s ease;
}
.at-proc__step:hover .at-proc__n{color:var(--ny2)!important;}
.at-proc__head{font-size:16px!important;font-weight:600!important;color:var(--ny)!important;margin:0 0 9px!important;}
.at-proc__note{font-size:14px!important;line-height:1.62!important;color:var(--body)!important;margin:0!important;}
.at-proc__rail{display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:0 0 30px;padding:0;list-style:none;}
.at-proc__railitem{
  padding:9px 18px;border-radius:999px;background:var(--tint);border:1px solid var(--line2);
  font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ny);
}
.at-proc__railsep{color:var(--ny2);}

/* ==========================================================================
   FAQ
   ========================================================================== */
.at-faq{background:var(--tint);}
/* Centred in the body rather than run to the page edges: eight one-line
   questions across 1232px is a very long line to scan back from. The header
   above sits in the same column, so the block reads as one centred object. */
.at-faq__col{max-width:940px;margin:0 auto;}
.at-faq__list{display:grid;gap:12px;}
.at-faq__item{
  background:#fff;border:1px solid var(--line);border-radius:14px;overflow:hidden;
  transition:border-color .3s ease,box-shadow .3s ease;
}
.at-faq__item:hover{border-color:rgba(0,83,183,.28);}
.at-faq__item[open]{border-color:rgba(0,83,183,.34);box-shadow:0 20px 38px -30px rgba(6,18,32,.4);}
.at-faq__q{
  display:flex;align-items:center;justify-content:space-between;gap:18px;
  padding:20px 24px;cursor:pointer;list-style:none;
  font-size:16px;font-weight:600;color:var(--ny);
  transition:color .25s ease,background-color .25s ease;
}
.at-faq__q::-webkit-details-marker{display:none;}
.at-faq__q:hover{color:var(--ny2);background:var(--tint);}
.at-faq__item[open] .at-faq__q{color:var(--ny2);}
/* A plus that becomes a minus. The bar is hidden by opacity, not rotated, so
   nothing on the page transforms on interaction. */
.at-faq__sign{position:relative;flex:0 0 auto;width:16px;height:16px;}
.at-faq__sign::before,.at-faq__sign::after{
  content:"";position:absolute;left:50%;top:50%;background:currentColor;border-radius:2px;
  translate:-50% -50%;
}
.at-faq__sign::before{width:14px;height:2px;}
.at-faq__sign::after{width:2px;height:14px;transition:opacity .3s ease;}
.at-faq__item[open] .at-faq__sign::after{opacity:0;}
.at-faq__a{padding:0 24px 22px;}
.at-faq__a p{font-size:15px!important;line-height:1.72!important;color:var(--body)!important;margin:0 0 10px!important;}
.at-faq__a p:last-child{margin-bottom:0!important;}

/* ==========================================================================
   LEAD FORM — the class names are this page's own, but the field names and
   the hidden post_id/form_id follow the convention /form-handler/ already
   reads, so it lands in the enquiries table beside Contact and Free
   Consultation with no new plumbing.
   ========================================================================== */
.at-form__panel{
  padding:40px;background:var(--tint);border:1px solid var(--line);border-radius:var(--radius);
}
.at-form__grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px;}
.at-form__row{display:flex;flex-direction:column;gap:8px;}
.at-form__row--wide{grid-column:1/-1;}
.at-form__label{
  font-size:11.5px!important;font-weight:700!important;letter-spacing:.11em!important;
  text-transform:uppercase;color:var(--ny)!important;margin:0!important;
}
.at-form__req{color:var(--ny2);margin-left:3px;}
.at-form__grid input,.at-form__grid select,.at-form__grid textarea{
  width:100%;padding:14px 16px;
  font-family:inherit;font-size:15px;color:var(--ny);
  background:#fff;border:1px solid var(--line);border-radius:12px;
  transition:border-color .25s ease,box-shadow .25s ease;
}
.at-form__grid textarea{min-height:130px;resize:vertical;}
.at-form__grid input:hover,.at-form__grid select:hover,.at-form__grid textarea:hover{border-color:rgba(0,83,183,.34);}
.at-form__grid input:focus,.at-form__grid select:focus,.at-form__grid textarea:focus{
  outline:none;border-color:var(--ny2);box-shadow:0 0 0 3px rgba(0,83,183,.14);
}
.at-form__submit{grid-column:1/-1;display:flex;flex-wrap:wrap;align-items:center;gap:18px;}
.at-form__submit button{
  display:inline-flex;align-items:center;gap:10px;
  padding:15px 28px;border:1px solid var(--ny2);border-radius:999px;
  background:var(--ny2);color:#fff;
  font-family:inherit;font-size:15px;font-weight:600;line-height:1;cursor:pointer;
  transition:background-color .25s ease,border-color .25s ease,box-shadow .3s ease,
             gap .3s cubic-bezier(.22,.61,.36,1);
}
.at-form__submit button:hover{
  background:var(--ny3);border-color:var(--ny3);gap:16px;
  box-shadow:0 14px 30px -14px rgba(0,64,140,.7);
}
.at-form__note{font-size:13px!important;line-height:1.62!important;color:var(--muted)!important;margin:0!important;max-width:46ch;}
.at-form__note a{color:var(--ny2)!important;}

/* ==========================================================================
   CLOSE
   ========================================================================== */
.at-close{
  position:relative;isolation:isolate;overflow:hidden;
  /* 40px like every other band — the closing band was the last exception. */
  background:#0A2A50;padding:var(--pad) 0!important;
}
.at-close .at-plate{--throw:26px;opacity:.72;}
.at-close__head{
  font-family:"Forum",serif!important;font-weight:400!important;color:#fff!important;
  font-size:clamp(28px,4vw,48px)!important;line-height:1.08!important;margin:0 0 20px!important;max-width:22ch;
}
.at-close__lede{color:rgba(255,255,255,.92)!important;font-size:17px!important;line-height:1.7!important;margin:0 0 30px!important;max-width:72ch;}
.at-close__ctas{display:flex;flex-wrap:wrap;gap:14px;margin:0 0 46px;}
.at-close__ctas .at-btn--solid{background:#fff;color:var(--ny)!important;border-color:#fff;}
.at-close__ctas .at-btn--solid:hover{background:#E8F1FF;border-color:#E8F1FF;box-shadow:0 16px 32px -16px rgba(0,0,0,.55);}
.at-pos{
  margin:0;padding:30px 0 0;border-top:1px solid rgba(255,255,255,.22);list-style:none;
  display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:18px;
}
.at-pos li{
  font-size:13.5px;line-height:1.55;color:rgba(255,255,255,.86);
  padding-top:14px;border-top:2px solid rgba(255,255,255,.3);
  transition:border-top-color .3s ease,color .3s ease;
}
.at-pos li:hover{border-top-color:#fff;color:#fff;}
.at-pos__close{
  font-family:"Forum",serif!important;font-weight:400!important;color:#fff!important;
  font-size:clamp(19px,2.3vw,26px)!important;line-height:1.3!important;margin:32px 0 0!important;
}

/* ==========================================================================
   THE SERVICE EXPLORER — a chooser on the left, one detail panel on the right.

   The eight cards above are the summary: a headline, a sentence, who it is for.
   This is where each of them is actually explained, and it is the first thing
   on the page to render AtService.head and AtService.body — the long-form copy
   that has been sitting in content.ts unread since the file was written.

   NO JAVASCRIPT. Eight visually-hidden radios sit in front of the grid and the
   panels are switched with :checked ~ , which matters on this page more than it
   usually would: everything else here degrades to "visible but not animated" if
   the bundle fails, and a tab widget that needs a script would have been the one
   thing on the page that degrades to nothing. It also means the section works
   before hydration, arrow keys move between the options for free, and the focus
   ring is the browser's own.

   The cost is the :nth-child coupling between a radio and its panel, so both
   loops below are generated from AT_SERVICES — add a ninth service and the
   rules, the labels and the panels all follow.
   ========================================================================== */
.at-exp{background:#fff;}
.at-exp__wrap{position:relative;}
/* Hidden from sight, not from the keyboard or the accessibility tree. */
.at-exp__radio{
  position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;
  clip:rect(0 0 0 0);clip-path:inset(50%);white-space:nowrap;border:0;
}
.at-exp__grid{
  /* The chooser gets less than half: its longest label is 24 characters, and at
     .86fr the rows ran 600px wide with the text sitting in the first third of
     each one. */
  display:grid;grid-template-columns:minmax(0,.72fr) minmax(0,1.28fr);
  /* Stretch: the eight rows spread over the panel's height instead of stopping
     two-thirds of the way down and leaving 190px of white under them. The
     panel's min-height below is what makes that safe — without a fixed floor
     the rows would resize on every switch. */
  gap:calc(var(--gap) * 2);align-items:stretch;
}

/* ---- The chooser ---- */
.at-exp__list{display:flex;flex-direction:column;}
.at-exp__list .at-exp__opt{flex:1 1 0;}
.at-exp__opt{
  display:flex;align-items:center;gap:14px;
  padding:14px 18px;border-radius:10px;
  border-bottom:1px solid var(--line2);
  color:var(--ny)!important;font-size:15.5px;font-weight:500;line-height:1.35;
  cursor:pointer;
  transition:background-color .28s ease,color .28s ease;
}
.at-exp__opt:first-child{border-top:1px solid var(--line);}
.at-exp__opt:hover{background:rgba(0,83,183,.05);color:var(--ny2)!important;}
.at-exp__n{
  flex:0 0 auto;font-size:11.5px;font-weight:700;letter-spacing:.14em;
  color:var(--muted);transition:color .28s ease;
}
.at-exp__opt:hover .at-exp__n{color:var(--ny2);}
/* The chosen one is painted by the generated block at the bottom of this
   section — the radios are not adjacent to their labels, so it cannot be
   written once with a sibling combinator. */

/* ---- The panel ---- */
/* A floor under the panel so switching service does not resize the section and
   shove the rest of the page up or down. 664px is the tallest of the eight at
   this breakpoint (they run 568–664); it is a MIN, so longer copy simply grows
   past it and the only cost of the number going stale is that a little of the
   jump comes back.

   Why not stack the eight panes in one grid cell and toggle visibility, which
   would size itself: because a visibility:hidden pane still has a box, so all
   eight photographs would load instead of the one on screen. display:none keeps
   the other seven unfetched. */
@media(min-width:901px){
  .at-exp__panes{min-height:664px;}
}
.at-exp__pane{display:none;}
/* THE CARD SITS ON THE PHOTOGRAPH, NOT BESIDE IT.

   It was a 58%-wide card overlapping a 62%-wide photograph, which is the shape
   of the reference section — and at this column width it left the card's first
   290px hanging over bare white with nothing above or below it. Three edges in
   the panel and no two of them agreed.

   Now the photograph spans the column and the card is anchored inside its
   lower-left corner. Every edge in the panel lines up: the photograph's left
   edge, the card's, the paragraphs', the button's and the "Best for" line's are
   one vertical; the photograph's right edge is the column's. */
.at-exp__fig{
  position:relative;isolation:isolate;margin:0 0 28px;
}
.at-exp__shot{
  display:block;width:100%;height:clamp(280px,26vw,380px);
  object-fit:cover;border-radius:12px;
}
.at-exp__quote{
  position:absolute;z-index:1;left:22px;bottom:22px;
  width:min(68%,470px);
  padding:13px;border-radius:10px;
  background:linear-gradient(140deg,#0B4EA8 0%,#0A2A50 100%);
  box-shadow:0 26px 52px -28px rgba(6,18,32,.7);
}
.at-exp__quote p{
  margin:0!important;padding:20px 22px;
  border:1px solid rgba(255,255,255,.42);border-radius:5px;
  font-family:"Forum",serif!important;font-weight:400!important;color:#fff!important;
  font-size:clamp(17px,1.6vw,21px)!important;line-height:1.34!important;
}
.at-exp__body p{
  color:var(--body)!important;font-size:16px!important;line-height:1.75!important;
  margin:0 0 16px!important;
}
.at-exp__caveat{
  margin:0 0 20px!important;padding:12px 16px;
  border-left:3px solid rgba(0,83,183,.35);background:var(--tint);border-radius:0 8px 8px 0;
  font-size:13.5px!important;line-height:1.55!important;color:var(--muted)!important;
}
.at-exp__foot{display:flex;flex-wrap:wrap;align-items:center;gap:14px;margin-top:22px;}
.at-exp__best{
  font-size:13.5px!important;color:var(--muted)!important;margin:0!important;
}
.at-exp__best b{color:var(--ny)!important;font-weight:600!important;}

/* ---- The generated half: which radio lights which option and shows which
        panel. One block per service, written from AT_SERVICES. ---- */
${AT_SERVICES.map(
  (s, i) => `
#at-exp-${s.slug}:checked ~ .at-exp__grid .at-exp__list .at-exp__opt:nth-of-type(${i + 1}){
  background:linear-gradient(140deg,#0B4EA8 0%,#0A2A50 100%);color:#fff!important;
}
#at-exp-${s.slug}:checked ~ .at-exp__grid .at-exp__list .at-exp__opt:nth-of-type(${i + 1}) .at-exp__n{
  color:#8FC0FF;
}
#at-exp-${s.slug}:focus-visible ~ .at-exp__grid .at-exp__list .at-exp__opt:nth-of-type(${i + 1}){
  outline:2px solid var(--ny2);outline-offset:2px;
}
#at-exp-${s.slug}:checked ~ .at-exp__grid .at-exp__panes .at-exp__pane:nth-of-type(${i + 1}){
  display:block;animation:at-exp-in .45s cubic-bezier(.22,.61,.36,1) both;
}`,
).join('')}
@keyframes at-exp-in{
  from{opacity:0;transform:translate3d(0,10px,0);}
  to{opacity:1;transform:none;}
}
@media(prefers-reduced-motion:reduce){
  .at-exp__pane{animation:none!important;}
}

/* ==========================================================================
   RESPONSIVE — three steps, and the scale tokens do most of the work.
   ========================================================================== */
@media(max-width:1180px){
  .at-root{--gap:20px;--cardpad:24px;--headgap:36px;}
  .at-cards,.at-options__grid,.at-journey__grid{grid-template-columns:repeat(2,minmax(0,1fr));}
  .at-proc__grid,.at-dep{grid-template-columns:repeat(3,minmax(0,1fr));}
  .at-pos{grid-template-columns:repeat(3,minmax(0,1fr));}
  /* The stem only makes sense while the columns sit on one line. */
  .at-dep__item::after{display:none;}
  .at-dep__spine{display:none;}
  .at-intro__grid{grid-template-columns:minmax(0,1fr);gap:calc(var(--gap) * 1.6);}
  .at-problem__grid,.at-tax__grid,.at-cap__grid{grid-template-columns:minmax(0,1fr);gap:var(--gap);}
  /* The chooser goes over the panel rather than beside it: below this the
     eight labels are narrower than the words in them. */
  .at-exp__grid{grid-template-columns:minmax(0,1fr);gap:calc(var(--gap) * 1.5);}
  .at-figure{min-height:340px;}
}
@media(max-width:900px){
  .at-root{--headgap:30px;}
  .at-why__grid,.at-ind__grid{grid-template-columns:repeat(2,minmax(0,1fr));}
  .at-turn{padding:34px 30px;}
  .at-exp__quote{width:min(76%,470px);}
  .at-dep__base{padding:32px;}
  .at-rail{padding:30px;}
  .at-form__panel{padding:32px;}
}
@media(max-width:640px){
  .at-root{--gutter:20px;--cardpad:22px;--radius:16px;--headgap:26px;}
  .at-cards,.at-options__grid,.at-journey__grid,.at-why__grid,.at-ind__grid,
  .at-proc__grid,.at-form__grid,.at-qs,.at-dep{grid-template-columns:minmax(0,1fr);}
  /* One column: every question keeps its own rule, so the list still reads as
     a list rather than as six loose lines. */
  .at-q:nth-child(2){border-top:0;}
  .at-cap__roles{grid-template-columns:minmax(0,1fr);}
  .at-cap__role:nth-child(odd){border-right:0;padding-right:14px;}
  .at-cap__role:nth-child(even){padding-left:2px;}
  .at-cap__panel{padding:22px 20px 24px;}
  .at-turn{padding:28px 22px;}
  /* The card would cover most of a 200px photograph, so it steps out below it
     and keeps the overlap as a 40px bite rather than as a takeover. */
  .at-exp__fig{margin-bottom:20px;}
  .at-exp__shot{height:200px;}
  .at-exp__quote{position:relative;left:0;bottom:0;width:auto;margin:-40px 14px 0;}
  .at-exp__quote p{padding:17px 18px;}
  .at-exp__opt{padding:14px;font-size:15px;gap:11px;}
  .at-dep__base{padding:26px 22px;}
  /* Two columns of one-line statements read better than one column of five. */
  .at-pos{grid-template-columns:repeat(2,minmax(0,1fr));}
  .at-problem__rung{grid-template-columns:minmax(0,1fr);gap:4px;}
  .at-rail,.at-form__panel{padding:24px 20px;}
  .at-intro__proof{padding:22px 20px;}
  .at-figure{min-height:280px;padding:20px;}
  .at-table th,.at-table td{padding:15px 18px!important;}
  .at-table thead th:first-child,.at-table tbody th{padding-left:20px!important;}
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
  /* The aurora, the plate drift and every entrance come off. Colour, frost and
     the hover states that carry meaning stay — none of them moved anything to
     begin with. */
  .at-hero::before,.at-hero::after{animation:none;}
  .at-zoom{transform:none;will-change:auto;}
  [data-anim]{opacity:1!important;translate:none!important;scale:none!important;transition:none!important;}
  .at-card::after,.at-journey__step::after,.at-ind__item::before{clip-path:inset(0 0 0 0);transition:none;}
  .at-btn,.at-go,.at-form__submit button{transition:background-color .25s ease,color .25s ease;}
  .at-btn:hover,.at-go:hover,.at-form__submit button:hover{gap:inherit;}
}
`;

/** The arrow that ends every CTA on the page. */
/** The swipe cue's glyph: a hand with a motion trail, pointing right. */
function SwipeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="17"
      height="17"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M3 9h4M4 13h3" />
      <path d="M11 12V6.5a1.5 1.5 0 0 1 3 0V12" />
      <path d="M14 10.5a1.5 1.5 0 0 1 3 0V12" />
      <path d="M17 11.5a1.5 1.5 0 0 1 3 0V15a6 6 0 0 1-6 6h-1.2a4 4 0 0 1-3.1-1.5L7 16.5" />
    </svg>
  );
}

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

/** The tick that marks the ValuNxt column of the comparison. */
function Tick() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="15"
      height="15"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="m5 12.5 4.5 4.5L19 7" />
    </svg>
  );
}

export default function AccountingTaxBody({ region }: { region: string }) {
  const sub = (slug: string) => rurl(region, `${SUB}${slug}/`);
  const plate = (which: keyof typeof PLATE) => rimgFirst(region, PLATE[which]);

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
            {/* Decorative: the artwork carries no information the headings
                over it do not already state. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="at-plate at-zoom" src={plate("hero")} alt="" />
            <div className="at-hero__inner">
              <span className="at-hero__kicker">{AT_HERO.eyebrow}</span>
              <h1 className="at-hero__head" id="at-hero-head">
                {AT_HERO.head}
              </h1>
              <p className="at-hero__sub">{AT_HERO.sub}</p>
            </div>
          </section>

          {/* ---- 2. THE INTRO BAND ----
              The proposition, the description, the chips, the two CTAs and the
              four proof points — all of it lifted out of the hero, and all of
              it the same AT_HERO / AT_PROOF / AT_WHY_CLOSE content it was
              before. Nothing here is new copy. */}
          <section className="at-intro" aria-labelledby="at-intro-head">
            <div className="at-in">
              <div className="at-intro__grid">
                <div className="at-intro__copy">
                  <span className="at-kicker">Working with ValuNxt</span>
                  <h2 className="at-intro__head" id="at-intro-head">
                    {AT_WHY_CLOSE}
                  </h2>
                  <p className="at-intro__lede">{AT_HERO.lede}</p>

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

                <ul
                  className="at-intro__proof"
                  aria-label="What working with ValuNxt means"
                >
                  {AT_PROOF.map((pr) => (
                    <li className="at-intro__item" key={pr.label}>
                      <span className="at-intro__ico" aria-hidden="true">
                        <MegaIcon token={pr.icon} />
                      </span>
                      <span>
                        <span className="at-intro__label">{pr.label}</span>
                        <span className="at-intro__note">{pr.note}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* ---- 3. THE PROBLEM ---- */}
          <section aria-labelledby="at-problem-head">
            <div className="at-in">
              <div className="at-sec__head">
                <span className="at-kicker">The finance question</span>
                <h2 className="at-h2" id="at-problem-head">
                  {AT_PROBLEM.head}
                </h2>
                <p className="at-lede">{AT_PROBLEM.lede}</p>
              </div>

              <ul className="at-qs">
                {AT_PROBLEM.questions.map((q) => (
                  <li className="at-q" key={q}>
                    <span className="at-q__text">{q}</span>
                  </li>
                ))}
              </ul>

              <div className="at-turn">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="at-plate at-zoom"
                  src={plate("figure")}
                  alt=""
                  loading="lazy"
                />
                <p className="at-turn__text">{AT_PROBLEM.turn}</p>
              </div>
              {/* The five-card capability ladder and its closing band used to
                  sit here. Removed by request: it restated in five cards what
                  the eight service cards two sections down say with links on
                  them, and the section reached the commercial content faster
                  without it. `turn` is the section's ending now. */}
            </div>
          </section>

          {/* ---- 4. THE EIGHT SERVICE CARDS — the commercial centre ---- */}
          <section
            className="at-services"
            id="at-services"
            aria-labelledby="at-services-head"
          >
            <div className="at-in">
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

              <div className="at-cards">
                {AT_SERVICES.map((s) => (
                  <a className="at-card" href={sub(s.slug)} key={s.slug}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className="at-card__tex"
                      src={plate("quiet")}
                      alt=""
                      loading="lazy"
                    />
                    <span className="at-card__ico" aria-hidden="true">
                      <MegaIcon token={s.icon} />
                    </span>
                    <span className="at-card__eyebrow">{s.name}</span>
                    <h3 className="at-card__head">{s.cardHead}</h3>
                    <p className="at-card__text">{s.cardText}</p>

                    {/* "Business outcome" and its sentence used to follow
                        "Best for" here. Removed by request: two label/value
                        pairs on an eight-card grid made every card a wall of
                        small text, and the outcome mostly restated the headline
                        above it. The `outcome` field stays in content.ts,
                        unrendered — the same as `head` and `body`, which this
                        card has never shown either. */}
                    <span className="at-card__meta">
                      <span className="at-card__row">
                        <span className="at-card__k">Best for</span>
                        <span className="at-card__v">{s.bestFor}</span>
                      </span>
                    </span>

                    {s.caveat ? (
                      <span className="at-card__caveat">{s.caveat}</span>
                    ) : null}

                    <span className="at-card__cta">
                      <span className="at-go">
                        Explore
                        <Arrow />
                      </span>
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </section>

          {/* ---- 4b. THE SERVICE EXPLORER ----
              The cards above are the summary; this is where each of the eight
              is explained. Radios and :checked do the switching — see the CSS
              note — so the section works with the bundle blocked and before
              hydration. Every word in it is AtService.head / .body / .bestFor,
              already written and until now never rendered. */}
          <section className="at-exp" aria-labelledby="at-exp-head">
            <div className="at-in">
              <div className="at-sec__head">
                <span className="at-kicker">In detail</span>
                <h2 className="at-h2" id="at-exp-head">
                  What each service actually covers
                </h2>
                <p className="at-lede">
                  Choose a service to see what it involves, who it is for, and
                  what changes for the business once it is in place.
                </p>
              </div>

              <div
                className="at-exp__wrap"
                role="group"
                aria-label="Choose a service to read about"
              >
                {/* All eight radios first: the panels are their following
                    siblings, which is what makes :checked ~ reach them. */}
                {AT_SERVICES.map((s, i) => (
                  <input
                    className="at-exp__radio"
                    type="radio"
                    name="at-explore"
                    id={`at-exp-${s.slug}`}
                    key={`r-${s.slug}`}
                    defaultChecked={i === 0}
                  />
                ))}

                <div className="at-exp__grid">
                  <div className="at-exp__list">
                    {AT_SERVICES.map((s, i) => (
                      <label
                        className="at-exp__opt"
                        htmlFor={`at-exp-${s.slug}`}
                        key={`l-${s.slug}`}
                      >
                        <span className="at-exp__n" aria-hidden="true">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {s.name}
                      </label>
                    ))}
                  </div>

                  <div className="at-exp__panes">
                    {AT_SERVICES.map((s) => (
                      <div className="at-exp__pane" key={`p-${s.slug}`}>
                        <div className="at-exp__fig">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            className="at-exp__shot"
                            src={rimgFirst(region, EXPLORE_FIGURE[s.slug] ?? [])}
                            alt=""
                            loading="lazy"
                          />
                          {/* The panel's own promise, on the navy card. */}
                          <div className="at-exp__quote">
                            <p>{s.head}</p>
                          </div>
                        </div>

                        <div className="at-exp__body">
                          {s.body.map((para) => (
                            <p key={para.slice(0, 32)}>{para}</p>
                          ))}
                          {s.caveat ? (
                            <p className="at-exp__caveat">{s.caveat}</p>
                          ) : null}
                          <div className="at-exp__foot">
                            <a className="at-pill" href={sub(s.slug)}>
                              Explore {s.name}
                            </a>
                            <p className="at-exp__best">
                              <b>Best for</b> {s.bestFor}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ---- 5. SERVICE DECISION TOOL ---- */}
          <section aria-labelledby="at-decide-head">
            <div className="at-in">
              <div className="at-sec__head">
                <span className="at-kicker">Where to start</span>
                <h2 className="at-h2" id="at-decide-head">
                  Which finance problem are you trying to solve?
                </h2>
              </div>

              {/* Shown only when the table is actually wider than its box —
                  Motion measures it and sets .is-shown. */}
              <p className="at-swipe" aria-hidden="true">
                <SwipeIcon />
                Swipe to see where to start
              </p>

              <div className="at-tablewrap">
                <div className="at-tablescroll">
                  <table className="at-table at-decide">
                    <thead>
                      <tr>
                        <th scope="col">If this sounds like your business…</th>
                        <th scope="col">For more details click below given links</th>
                      </tr>
                    </thead>
                    <tbody>
                      {AT_DECISION.map((d) => (
                        <tr key={d.slug}>
                          <td className="at-table__says">{d.says}</td>
                          {/* A pill, not an arrow link: eight rows of blue text
                              with a chevron read as labels rather than as the
                              eight destinations the column exists to offer. */}
                          <td className="at-decide__go">
                            <a className="at-pill" href={sub(d.slug)}>
                              {d.label}
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="at-decide__foot">
                <p className="at-decide__ask">Not sure where to start?</p>
                <a
                  className="at-btn at-btn--line"
                  href={rurl(region, "/free-consultation/")}
                >
                  Speak to a Finance Adviser
                  <Arrow />
                </a>
              </div>
            </div>
          </section>

          {/* ---- 6. THE FINANCE JOURNEY ---- */}
          <section className="at-journey" aria-labelledby="at-journey-head">
            <div className="at-in">
              <div className="at-sec__head">
                <span className="at-kicker">How it builds</span>
                <h2 className="at-h2" id="at-journey-head">
                  Start where you are. Add capability as you grow.
                </h2>
              </div>

              <ol className="at-journey__grid">
                {AT_JOURNEY.map((j, i) => (
                  <li className="at-journey__step" key={j.stage}>
                    <span className="at-journey__n" aria-hidden="true">
                      {i + 1}
                    </span>
                    <span className="at-journey__stage">{j.stage}</span>
                    <h3 className="at-h3">{j.head}</h3>
                    <span className="at-journey__svc">{j.service}</span>
                    <p className="at-journey__note">{j.note}</p>
                  </li>
                ))}
              </ol>

              <div className="at-rail">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="at-plate at-zoom"
                  src={plate("rail")}
                  alt=""
                  loading="lazy"
                />
                <span className="at-rail__kick">{AT_JOURNEY_RAIL.kicker}</span>
                <h3 className="at-rail__head">{AT_JOURNEY_RAIL.head}</h3>
                {AT_JOURNEY_RAIL.body.map((p) => (
                  <p className="at-rail__text" key={p.slice(0, 30)}>
                    {p}
                  </p>
                ))}
                <ul className="at-rail__flow">
                  {AT_JOURNEY.map((j, i) => (
                    <li key={j.stage} style={{ display: "contents" }}>
                      {i > 0 ? (
                        <span className="at-rail__sep" aria-hidden="true">
                          →
                        </span>
                      ) : null}
                      <span className="at-rail__item">{j.stage}</span>
                    </li>
                  ))}
                </ul>
                <p className="at-rail__close">{AT_JOURNEY_RAIL.close}</p>
              </div>
            </div>
          </section>

          {/* ---- 7. CONNECTED PROCESSES ---- */}
          <section aria-labelledby="at-tax-head">
            <div className="at-in">
              <div className="at-sec__head">
                <span className="at-kicker">Connected processes</span>
                <h2 className="at-h2" id="at-tax-head">
                  {AT_TAX.head}
                </h2>
              </div>

              {/* Five processes, each naming what it starts from. Read a row in
                  order and it gives the source sentence back verbatim. */}
              <ul className="at-dep">
                {AT_TAX.points.map((pt) => (
                  <li className="at-dep__item" key={pt.subject}>
                    <h3 className="at-dep__subject">{pt.subject}</h3>
                    <span className="at-dep__link">{pt.link}</span>
                    <p className="at-dep__source">{pt.source}</p>
                  </li>
                ))}
              </ul>

              <div className="at-dep__spine" aria-hidden="true" />

              <div className="at-dep__base">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="at-plate at-zoom"
                  src={plate("quiet")}
                  alt=""
                  loading="lazy"
                />
                <span className="at-dep__basekick">One financial foundation</span>
                <p className="at-dep__baseclose">{AT_TAX.close}</p>
                {AT_TAX.body.map((pp) => (
                  <p className="at-dep__basebody" key={pp.slice(0, 30)}>
                    {pp}
                  </p>
                ))}
              </div>
            </div>
          </section>

          {/* ---- 8. WHY VALUNXT ---- */}
          <section className="at-why" aria-labelledby="at-why-head">
            <div className="at-in">
              <div className="at-sec__head">
                <span className="at-kicker">Why ValuNxt</span>
                <h2 className="at-h2" id="at-why-head">
                  Why businesses choose ValuNxt
                </h2>
              </div>

              <div className="at-why__grid">
                {AT_WHY.map((w) => (
                  <div className="at-why__item" key={w.head}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className="at-why__tex"
                      src={plate("quiet")}
                      alt=""
                      loading="lazy"
                    />
                    <h3 className="at-h3">{w.head}</h3>
                    {w.body.map((p) => (
                      <p key={p.slice(0, 30)}>{p}</p>
                    ))}
                  </div>
                ))}
              </div>

              <ul
                className="at-sys"
                aria-label="Accounting systems ValuNxt works with"
              >
                {AT_SYSTEMS.map((s) => (
                  <li className="at-sys__chip" key={s}>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* ---- 9a. COMPARISON ---- */}
          <section aria-labelledby="at-compare-head">
            <div className="at-in">
              <div className="at-sec__head">
                <span className="at-kicker">Compare</span>
                <h2 className="at-h2" id="at-compare-head">
                  {AT_COMPARE.head}
                </h2>
              </div>

              {/* The comparison table scrolls sideways on a phone for exactly
                  the same reason the decision table does, so it says so the
                  same way. The edge fade comes free with .at-tablewrap. */}
              <p className="at-swipe" aria-hidden="true">
                <SwipeIcon />
                Swipe to compare
              </p>

              <div className="at-tablewrap">
                <div className="at-tablescroll">
                  <table className="at-table at-table--compare at-compare">
                    <thead>
                      <tr>
                        {AT_COMPARE.columns.map((c) => (
                          <th scope="col" key={c}>
                            {c}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {AT_COMPARE.rows.map((r) => (
                        <tr key={r[0]}>
                          <th scope="row">{r[0]}</th>
                          <td>{r[1]}</td>
                          <td>
                            <span className="at-tick">
                              <Tick />
                              {r[2]}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <p className="at-compare__close">{AT_COMPARE.close}</p>
              <div className="at-compare__note">
                {AT_COMPARE.note.map((p) => (
                  <p key={p.slice(0, 30)}>{p}</p>
                ))}
              </div>
            </div>
          </section>

          {/* ---- 9b. COMMERCIAL OPTIONS ---- */}
          <section className="at-options" aria-labelledby="at-options-head">
            <div className="at-in">
              <div className="at-sec__head">
                <span className="at-kicker">Commercial options</span>
                <h2 className="at-h2" id="at-options-head">
                  Start with the support you need
                </h2>
              </div>

              <div className="at-options__grid">
                {AT_OPTIONS.map((o) => (
                  <div className="at-option" key={o.label}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className="at-option__tex"
                      src={plate("quiet")}
                      alt=""
                      loading="lazy"
                    />
                    <span className="at-option__label">{o.label}</span>
                    <span className="at-option__price">{o.price}</span>
                    <p className="at-option__note">{o.note}</p>
                    {/* Was an .at-go text link. On a grid of four priced cards
                        the one thing that has to look pressable is the thing
                        that starts the conversation, and blue text with an
                        arrow was not doing it. */}
                    <span className="at-option__cta">
                      <a
                        className="at-pill at-pill--block"
                        href={rurl(region, o.href)}
                      >
                        {o.cta}
                      </a>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ---- 10. CAPABILITY WITHOUT HEADCOUNT ---- */}
          <section aria-labelledby="at-cap-head">
            <div className="at-in">
              <div className="at-cap__grid">
                {/* One panel, not a column of loose parts: the roster is a
                    numbered roll the reader can count, the two body lines sit
                    under a rule, and the CTA is pushed to the foot with
                    margin-top:auto so this side and the photograph beside it
                    close on the same line at any height. */}
                <div className="at-cap__panel">
                  <div className="at-sec__head at-cap__head">
                    <span className="at-kicker">Outsourcing</span>
                    <h2 className="at-h2" id="at-cap-head">
                      {AT_CAPABILITY.head}
                    </h2>
                  </div>

                  <p className="at-cap__ask">{AT_CAPABILITY.lede}</p>

                  <ol className="at-cap__roles">
                    {AT_CAPABILITY.roles.map((r, i) => (
                      <li className="at-cap__role" key={r}>
                        <span className="at-cap__n" aria-hidden="true">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="at-cap__rolename">
                          {r.replace(/\.$/, "")}
                        </span>
                      </li>
                    ))}
                  </ol>

                  <div className="at-cap__body">
                    {AT_CAPABILITY.body.map((p) => (
                      <p key={p.slice(0, 30)}>{p}</p>
                    ))}
                  </div>

                  <p className="at-cap__close">
                    {AT_CAPABILITY.close.join(" ")}
                  </p>

                  <div className="at-cap__foot">
                    <a
                      className="at-btn at-btn--line"
                      href={rurl(region, AT_CAPABILITY.cta.href)}
                    >
                      {AT_CAPABILITY.cta.label}
                      <Arrow />
                    </a>
                  </div>
                </div>

                <figure className="at-figure at-figure--service" style={{ margin: 0 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="at-plate at-zoom"
                    src={plate("service")}
                    alt=""
                    loading="lazy"
                  />
                  <figcaption className="at-figure__quote">
                    {AT_CAPABILITY.close[1] ?? AT_CAPABILITY.close[0]}
                  </figcaption>
                </figure>
              </div>
            </div>
          </section>

          {/* ---- 11. INDUSTRIES ---- */}
          <section className="at-ind" aria-labelledby="at-ind-head">
            <div className="at-in">
              <div className="at-sec__head">
                <span className="at-kicker">Sectors</span>
                <h2 className="at-h2" id="at-ind-head">
                  Built around the way your business operates
                </h2>
              </div>

              <div className="at-ind__grid">
                {AT_INDUSTRIES.map((i) => (
                  <div className="at-ind__item" key={i.head}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className="at-ind__tex"
                      src={plate("quiet")}
                      alt=""
                      loading="lazy"
                    />
                    <h3 className="at-h3">{i.head}</h3>
                    {i.body.map((p) => (
                      <p key={p.slice(0, 30)}>{p}</p>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ---- 12. PROCESS ---- */}
          <section aria-labelledby="at-proc-head">
            <div className="at-in">
              <div className="at-sec__head">
                <span className="at-kicker">How we work</span>
                <h2 className="at-h2" id="at-proc-head">
                  One finance process. The right level of support.
                </h2>
              </div>

              <ol className="at-proc__grid">
                {AT_PROCESS.map((p, i) => (
                  <li className="at-proc__step" key={p.head}>
                    <span className="at-proc__n" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="at-proc__head">{p.head}</h3>
                    <p className="at-proc__note">{p.note}</p>
                  </li>
                ))}
              </ol>

              <ul
                className="at-proc__rail"
                aria-label="The finance process end to end"
              >
                {AT_PROCESS_RAIL.map((r, i) => (
                  <li key={r} style={{ display: "contents" }}>
                    {i > 0 ? (
                      <span className="at-proc__railsep" aria-hidden="true">
                        →
                      </span>
                    ) : null}
                    <span className="at-proc__railitem">{r}</span>
                  </li>
                ))}
              </ul>

              <a
                className="at-btn at-btn--line"
                href={rurl(region, "/contact/")}
              >
                Talk to ValuNxt About Your Finance Function
                <Arrow />
              </a>
            </div>
          </section>

          {/* ---- 13. FAQ ---- */}
          <section className="at-faq" aria-labelledby="at-faq-head">
            <div className="at-in">
              <div className="at-faq__col">
                <div className="at-sec__head">
                  <span className="at-kicker">Questions</span>
                  <h2 className="at-h2" id="at-faq-head">
                    Frequently asked questions
                  </h2>
                </div>

                <div className="at-faq__list">
                  {AT_FAQ.slice(0, AT_FAQ_SHOWN).map((f) => (
                    /* <details> rather than a scripted accordion: it opens with no
                     JavaScript, it is keyboard-operable for free, and the browser's
                     find-in-page can reach a closed answer. */
                    <details className="at-faq__item" key={f.q}>
                      <summary className="at-faq__q">
                        {f.q}
                        <span className="at-faq__sign" aria-hidden="true" />
                      </summary>
                      <div className="at-faq__a">
                        {f.a.map((p) => (
                          <p key={p.slice(0, 30)}>{p}</p>
                        ))}
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ---- 14. LEAD FORM ----
              `.elementor-form` is deliberate on a page that is otherwise none of
              Elementor's business: Elementor Pro's frontend binds the AJAX submit
              handler to that class, and /form-handler/ is already its configured
              endpoint. Without it the form would fall back to a plain POST and
              navigate away from the page. */}
          <section aria-labelledby="at-form-head">
            <div className="at-in">
              <div className="at-sec__head">
                <span className="at-kicker">Get in touch</span>
                <h2 className="at-h2" id="at-form-head">
                  {AT_FORM.head}
                </h2>
              </div>

              <div className="at-form__panel">
                <form
                  className="elementor-form at-form__grid"
                  method="post"
                  name="Accounting &amp; Tax"
                  aria-label="Accounting and Tax enquiry"
                >
                  <input type="hidden" name="form_id" value={AT_FORM.formId} />
                  <input
                    type="hidden"
                    name="post_id"
                    value="accounting-tax-services"
                  />
                  <input
                    type="hidden"
                    name="referer_title"
                    value="Accounting &amp; Tax Services"
                  />

                  {AT_FORM.fields.map((f) => (
                    <div className="at-form__row" key={f.id}>
                      <label
                        className="at-form__label"
                        htmlFor={`at-form-${f.id}`}
                      >
                        {f.label}
                        {f.required ? (
                          <span className="at-form__req" aria-hidden="true">
                            *
                          </span>
                        ) : null}
                      </label>
                      <input
                        id={`at-form-${f.id}`}
                        name={`form_fields[${f.id}]`}
                        type={f.type}
                        placeholder={f.label}
                        required={f.required}
                      />
                    </div>
                  ))}

                  <div className="at-form__row at-form__row--wide">
                    <label
                      className="at-form__label"
                      htmlFor="at-form-at_service"
                    >
                      {AT_FORM.serviceLabel}
                    </label>
                    <select
                      id="at-form-at_service"
                      name="form_fields[at_service]"
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select a service
                      </option>
                      {AT_FORM.serviceOptions.map((o) => (
                        <option value={o} key={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="at-form__row at-form__row--wide">
                    <label
                      className="at-form__label"
                      htmlFor="at-form-at_message"
                    >
                      {AT_FORM.messageLabel}
                    </label>
                    <textarea
                      id="at-form-at_message"
                      name="form_fields[at_message]"
                      placeholder="Tell us what you need help with"
                    />
                  </div>

                  <div className="at-form__submit">
                    <button type="submit">
                      {AT_FORM.button}
                      <Arrow />
                    </button>
                    <p className="at-form__note">
                      By submitting this form you agree to our{" "}
                      <a href={rurl(region, "/privacy-policy/")}>
                        Privacy Policy
                      </a>
                      . VALUNXT may contact you via email or phone regarding
                      your enquiry.
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </section>

          {/* ---- 15. CLOSE ---- */}
          <section className="at-close" aria-labelledby="at-close-head">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="at-plate at-zoom"
              src={plate("close")}
              alt=""
              loading="lazy"
            />
            <div className="at-close__inner">
              <h2 className="at-close__head" id="at-close-head">
                {AT_CLOSE.head}
              </h2>
              <p className="at-close__lede">{AT_CLOSE.lede}</p>
              <div className="at-close__ctas">
                <a
                  className="at-btn at-btn--solid"
                  href={rurl(region, AT_CLOSE.primary.href)}
                >
                  {AT_CLOSE.primary.label}
                  <Arrow />
                </a>
                <a
                  className="at-btn at-btn--ghost"
                  href={AT_CLOSE.secondary.href}
                >
                  {AT_CLOSE.secondary.label}
                  <Arrow />
                </a>
                <a
                  className="at-btn at-btn--ghost"
                  href={rurl(region, AT_CLOSE.tertiary.href)}
                >
                  {AT_CLOSE.tertiary.label}
                  <Arrow />
                </a>
              </div>

              <ul className="at-pos">
                {AT_CLOSE.positioning.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <p className="at-pos__close">{AT_CLOSE.positioningClose}</p>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
}
