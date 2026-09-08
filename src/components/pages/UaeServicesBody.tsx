/**
 * /en-ae/services/ — the UAE services index.
 *
 * The shared ServicesBody is India's: 1,000 lines of captured Elementor markup
 * naming the group's four verticals and linking to their four pages. Serving it
 * to the UAE put four Indian services, and four Indian URLs, under a UAE
 * visitor's Services menu.
 *
 * This is the UAE's own index, built from vxnServices('en-ae') — the same
 * registry behind the header menu and the UAE home page — so the six services
 * and the pages beneath them are listed wherever they are listed, and adding one
 * is still a single entry in that registry.
 *
 * ---------------------------------------------------------------------------
 * WHY IT IS NOT A CARD GRID ANY MORE
 *
 * It was three columns of two: six bordered cards, each with a 46px icon, a
 * sentence and a list of links. It worked, and it said nothing. Six services
 * the firm sells as its whole proposition were reduced to the smallest unit the
 * page had; none of the artwork already sitting in uploads/services was on the
 * page at all; and a card tall enough to hold accounting's eight sub-services
 * left the three-item real estate card two-thirds empty.
 *
 * Each service is a full band now, alternating: figure left / copy right, then
 * the reverse, six times down the page. That shape is the point —
 *
 *   it gives the photograph a size worth loading. These are 1800px commercial
 *   shots that a 46px icon tile could never justify;
 *
 *   it gives eight sub-service links room to sit two-up under the copy instead
 *   of stretching one card past its neighbours;
 *
 *   and the alternation is what carries the eye down a long page. Six identical
 *   rows are a list. Six that swap sides read as a rhythm, and the reader
 *   arrives at the sixth still reading.
 *
 * THE TEXTURE. Every figure sits on a second plate offset behind it — texture-1
 * and texture-2 from uploads/banners, the blue and the blue-violet ribbon,
 * alternating with the row. It is what stops a rounded photograph from reading
 * as a stock image dropped on white: the frame has something behind it, that
 * something is brand-coloured, and it leans out on whichever side the figure is
 * not. The intro and closing bands carry their own plates (abstract-1 and
 * abstract-3) on the same system.
 *
 * ARTWORK IS RESOLVED, NOT HARD-CODED. Every plate goes through rimgFirst with
 * a candidate list in the house convention — a purpose-shot filename first, the
 * supplied library plate last — so dropping a commissioned file into uploads
 * replaces the stand-in with no code change, and a market can override either
 * under uploads/regions/<slug>/.
 *
 * ---------------------------------------------------------------------------
 * HOVER MOVES NOTHING, the same rule the written service pages follow. A hover
 * changes colour, light or coverage: the figure's scrim lifts and its border
 * brightens, a heading's underline is wiped in with background-size, a link's
 * own `gap` opens so the chevron travels without a transform. Nothing on this
 * page jumps when a pointer crosses it.
 *
 * MOTION. Hover is CSS and never gated on JavaScript. The reveals and the plate
 * drift are Motion's, by selector — and the stylesheet's default is VISIBLE, so
 * a failed bundle cannot produce a blank page. See UaeServicesMotion.tsx.
 *
 * TYPE AND !IMPORTANT. The Elementor kit styles bare h2/h3/p at a specificity
 * these classes cannot reach on their own, which is why every type declaration
 * below is marked — the same reason ServicePageBody marks its own.
 */
import { rurl, vxnRegionData, vxnServiceName, vxnServices } from '@/lib/region';
import { rimgFirst } from '@/lib/region-assets';
import { MegaIcon } from '@/components/layout/MegaIcons';
import Html from '@/components/Html';
import UaeServicesMotion from './UaeServicesMotion';
import type { PageConfig } from '@/lib/page-config';

/**
 * The two ribbon textures, alternating with the row.
 *
 * texture-1 is the bright blue silk, texture-2 the blue-violet — the brand's
 * two accents — so the plate behind the figure changes with the side the figure
 * sits on, and the alternation is legible even in peripheral vision.
 */
const TEXTURE = [
  ['services/service-texture-a.webp', 'banners/texture-1.webp'],
  ['services/service-texture-b.webp', 'banners/texture-2.webp'],
];

/**
 * The intro band's wash and the closing band's plate.
 *
 * abstract-2 rather than abstract-1 under the intro: abstract-1 is a field of
 * vertical filaments, and at the 17% this wash runs at they stop reading as
 * artwork and start reading as banding in the render. abstract-2's diagonal
 * waves survive the same opacity. abstract-3 — navy with a gold filament sweep,
 * the most editorial of the three — is kept for the close, which is the one
 * moment the page asks for something.
 */
const PLATE = {
  intro: ['services/services-intro.webp', 'homepage/abstract-2.webp', 'homepage/abstract-2.png'],
  close: ['services/services-close.webp', 'homepage/abstract-3.webp', 'homepage/abstract-3.png'],
};

/**
 * A service's own photograph, with room for a replacement.
 *
 * The registry's `img` is the supplied file. The `-wide` name in front of it is
 * a hook, not a bug: valuation-and-advisory.webp is 547×365, which is soft in a
 * frame this size, and this is what lets a better crop be dropped into uploads
 * without touching the registry or this file.
 */
function figureFor(img: string): string[] {
  const rel = img.replace(/^\/assets\/content\/uploads\//, '');
  return [rel.replace(/\.webp$/, '-wide.webp'), rel];
}

const CSS = `
.svcx{
  /* Palette — the same tokens the written service pages declare, so a colour is
     never picked twice. */
  --ny:#0E355F;
  --ny2:#0053B7;
  --ny3:#00408C;
  --pl:#9C00DD;
  --body:#4d5863;
  /* Two steps darker than the #6A7590 the written service pages use for the
     same job. Both places it is used here are 11–12.5px uppercase — below the
     large-text threshold, so they need 4.5:1 — and half the bands on this page
     are --tint rather than white, where #6A7590 lands at 4.32:1. This is
     5.6:1 on the tint and 5.9:1 on white. */
  --muted:#5A6478;
  --line:rgba(14,53,95,.12);
  --line2:rgba(14,53,95,.07);
  --tint:#F4F8FD;

  /* One spacing scale for the page. Every band, grid and frame reads these, so
     no two rows can drift out of step. */
  --pad:76px;
  --gutter:24px;
  --maxw:1240px;
  --gap:24px;
  --radius:20px;

  font-family:"DM Sans",sans-serif;
  background:#fff;
}
/* border-box across the page: without it --maxw sets the CONTENT box and the
   gutter is added outside it, so two bands that declare the same width do not
   actually share an edge. */
.svcx,.svcx *,.svcx *::before,.svcx *::after{box-sizing:border-box;}
.svcx section{padding:var(--pad) 0;}
.svcx-in{width:100%;max-width:var(--maxw);margin:0 auto;padding:0 var(--gutter);}

/* ==========================================================================
   PLATES — the shared artwork layer.

   Always absolutely positioned, always object-fit:cover, always driven by
   Motion: --vx-z scales it and --vx-p drifts it, so the artwork moves against
   the scroll while the copy over it stays where it was set. Each plate declares
   its own --throw, because a full-bleed band can take 26px without showing its
   edge and a plate inside a 4:3 frame cannot.
   ========================================================================== */
.svcx-plate{
  position:absolute;inset:calc(var(--throw,18px) * -1) 0;
  width:100%;height:calc(100% + var(--throw,18px) * 2);
  object-fit:cover;pointer-events:none;
}
.svcx-zoom{
  transform:translate3d(0,calc(var(--vx-p,0) * var(--throw,18px)),0) scale(var(--vx-z,1));
  transform-origin:center;
  will-change:transform;
}

/* ---- Reveal --------------------------------------------------------------
   VISIBLE IS THE DEFAULT. The hidden state below exists only under
   [data-anim='pending'], which Motion sets — so if that bundle never runs,
   every element on this page renders normally. */
.svcx [data-anim]{
  transition:opacity .72s cubic-bezier(.22,.61,.36,1) var(--vx-delay,0ms),
             transform .72s cubic-bezier(.22,.61,.36,1) var(--vx-delay,0ms);
}
.svcx [data-anim='pending']{opacity:0;}
.svcx [data-anim='pending'][data-anim-variant='up']{transform:translate3d(0,26px,0);}
.svcx [data-anim='pending'][data-anim-variant='left']{transform:translate3d(-34px,0,0);}
.svcx [data-anim='pending'][data-anim-variant='right']{transform:translate3d(34px,0,0);}
.svcx [data-anim='in']{opacity:1;transform:none;}
@media(prefers-reduced-motion:reduce){
  .svcx [data-anim]{transition:none;opacity:1;transform:none;}
  .svcx-zoom{transform:none;}
}

/* ---- Shared type ---------------------------------------------------------
   The kicker is the badge the written service pages use: a tinted pill with a
   lit dot, so a section label reads as an object rather than as small caps
   floating above a heading. */
.svcx-kicker{
  display:inline-flex;align-items:center;gap:9px;
  padding:7px 15px 7px 12px!important;border-radius:999px;
  background:rgba(0,83,183,.07);border:1px solid rgba(0,83,183,.18);
  font-size:11px!important;font-weight:700!important;letter-spacing:.15em!important;
  text-transform:uppercase;color:var(--ny2)!important;margin:0 0 18px!important;
}
.svcx-kicker::before{
  content:"";flex:0 0 auto;width:7px;height:7px;border-radius:50%;
  background:currentColor;box-shadow:0 0 0 3px rgba(0,83,183,.14);
}
.svcx-h2{
  font-family:"Forum",serif!important;font-weight:400!important;
  color:var(--ny)!important;
  font-size:clamp(30px,3.8vw,46px)!important;line-height:1.11!important;
  margin:0 0 18px!important;
}
.svcx-lede{
  color:var(--body)!important;font-size:17px!important;line-height:1.72!important;
  margin:0!important;
}

/* ---- Buttons -------------------------------------------------------------
   No transform on hover anywhere. The arrow travels because the flex 'gap'
   opens, not because the glyph is moved. */
.svcx-btn{
  display:inline-flex;align-items:center;gap:10px;
  padding:15px 27px;border-radius:999px;
  font-size:14.5px;font-weight:600;line-height:1;text-decoration:none!important;
  transition:background-color .25s ease,color .25s ease,border-color .25s ease,
             box-shadow .3s ease,gap .3s cubic-bezier(.22,.61,.36,1);
}
.svcx-btn:hover{gap:16px;}
.svcx-btn--solid{background:var(--ny2);color:#fff!important;border:1px solid var(--ny2);}
.svcx-btn--solid:hover{background:var(--ny3);border-color:var(--ny3);box-shadow:0 14px 30px -14px rgba(0,64,140,.7);}
.svcx-btn--light{background:#fff;color:var(--ny)!important;border:1px solid #fff;}
.svcx-btn--light:hover{background:#E8F1FF;border-color:#E8F1FF;box-shadow:0 16px 32px -16px rgba(0,0,0,.5);}
.svcx-btn--ghost{
  background:rgba(255,255,255,.1);color:#fff!important;border:1px solid rgba(255,255,255,.5);
  backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);
}
.svcx-btn--ghost:hover{background:rgba(255,255,255,.2);border-color:#fff;}

/* ==========================================================================
   INTRO
   ========================================================================== */
.svcx-intro{
  position:relative;isolation:isolate;overflow:hidden;
  background:var(--tint);
  border-bottom:1px solid var(--line2);
}
/* The wash: the plate is masked away from the copy rail rather than dimmed
   everywhere, so the left half stays clean type on tint and the right half
   carries the artwork. */
.svcx-intro .svcx-plate{
  --throw:22px;
  z-index:-1;opacity:.17;
  -webkit-mask-image:linear-gradient(100deg,transparent 22%,#000 80%);
  mask-image:linear-gradient(100deg,transparent 22%,#000 80%);
}
.svcx-intro__grid{
  display:grid;grid-template-columns:minmax(0,1.15fr) minmax(0,.85fr);
  gap:calc(var(--gap) * 2.2);align-items:end;
}
.svcx-intro__col{max-width:60ch;}

/* The jump rail — six chips, one per band below. A six-band page is a long
   scroll, and a reader who came for mortgages should not have to find them. */
.svcx-jump{display:flex;flex-wrap:wrap;gap:10px;margin:30px 0 0;padding:0;list-style:none;}
.svcx-jump a{
  display:inline-flex;align-items:center;gap:9px;
  padding:9px 16px 9px 12px;border-radius:999px;
  background:#fff;border:1px solid var(--line);
  font-size:13.5px;font-weight:500;color:var(--ny)!important;text-decoration:none!important;
  transition:border-color .25s ease,color .25s ease,box-shadow .3s ease;
}
.svcx-jump a:hover{
  border-color:rgba(0,83,183,.45);color:var(--ny2)!important;
  box-shadow:0 12px 26px -18px rgba(0,64,140,.8);
}
.svcx-jump svg{width:17px;height:17px;color:var(--ny2);flex:0 0 auto;}

/* The counts. Read off the registry, not typed — see the component. */
.svcx-stats{display:grid;gap:16px;margin:0;padding:0;}
.svcx-stat{
  display:grid;grid-template-columns:auto minmax(0,1fr);gap:0 16px;align-items:center;
  padding:16px 20px;border-radius:14px;
  background:#fff;border:1px solid var(--line2);
  box-shadow:0 18px 40px -34px rgba(6,18,32,.5);
}
.svcx-stat__n{
  grid-row:span 2;
  font-family:"Forum",serif!important;font-weight:400!important;
  color:var(--ny2)!important;font-size:34px!important;line-height:1!important;
}
.svcx-stat__k{
  align-self:end;
  font-size:11px!important;font-weight:700!important;letter-spacing:.15em!important;
  text-transform:uppercase;color:var(--muted)!important;margin:0 0 3px!important;
}
.svcx-stat__v{
  align-self:start;
  font-size:15px!important;line-height:1.4!important;color:var(--ny)!important;margin:0!important;
}

/* ==========================================================================
   THE SIX BANDS — figure one side, copy the other, alternating.
   ========================================================================== */
.svcx-band{
  /* Clears the sticky header when a jump chip lands on this band. */
  scroll-margin-top:110px;
  /* The texture plate leans 26px out of the media column on purpose. Between
     1024px and 1288px the column's own edge is only 24px from the viewport, so
     those last two pixels would put a horizontal scrollbar on the whole
     document. 'clip' trims them without making this section a scroll container
     the way overflow:hidden would. */
  overflow-x:clip;
}
.svcx-band--tint{background:var(--tint);}
.svcx-band + .svcx-band{border-top:1px solid var(--line2);}

.svcx-row{
  display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);
  gap:calc(var(--gap) * 2.4);align-items:center;
}
/* DOM order is figure then copy on every row, so keyboard focus runs the same
   way down the whole page; the flip is visual only. */
.svcx-row--flip .svcx-row__media{order:2;}

/* ---- The figure ---------------------------------------------------------- */
.svcx-row__media{position:relative;isolation:isolate;}

/* The texture, offset behind the frame and leaning out on the side the figure
   is not — right on a left-hand figure, left on a right-hand one.

   THE OFFSET IS THE VISIBLE BAND. The plate sits behind an opaque photograph,
   so the only part of it anyone sees is however far it sticks out. At 26px that
   was a blue edge that read as a second shadow; 40px is wide enough for the
   ribbon in it to be legible as a ribbon, which is the whole reason it is
   there. --lean holds the figure so the L is the same width on both sides and
   the two breakpoints have one number to change. */
.svcx-tex{
  --lean:40px;
  position:absolute;z-index:0;display:block;overflow:hidden;
  width:66%;height:76%;right:calc(var(--lean) * -1);bottom:calc(var(--lean) * -1);
  border-radius:var(--radius);
  box-shadow:0 30px 60px -40px rgba(6,18,32,.45);
}
.svcx-row--flip .svcx-tex{right:auto;left:calc(var(--lean) * -1);}
.svcx-tex img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;}
/* The ribbons are saturated enough to shout over a photograph; this holds them
   at the level of a backing plate without flattening them to a block of navy. */
.svcx-tex::after{
  content:"";position:absolute;inset:0;
  background:linear-gradient(140deg,rgba(244,248,253,.26) 0%,rgba(14,53,95,.12) 100%);
}

.svcx-frame{
  position:relative;z-index:1;display:block;overflow:hidden;
  border-radius:var(--radius);aspect-ratio:4 / 3;background:#0A2A50;
  border:1px solid rgba(255,255,255,.55);
  box-shadow:0 44px 74px -44px rgba(6,18,32,.62);
  text-decoration:none!important;
  transition:box-shadow .4s ease,border-color .3s ease;
}
.svcx-frame:hover{border-color:#fff;box-shadow:0 50px 84px -40px rgba(6,18,32,.7);}
.svcx-frame .svcx-plate{--throw:20px;z-index:0;}
/* Two scrims, and both are load-bearing rather than decorative: white type sits
   on this photograph and nothing else guarantees it is readable. The six images
   are supplied art that can be replaced, so the darkening has to hold for a
   bright one as well as for the dark ones currently in uploads.

   The bottom one carries the caption. The top one carries the index badge —
   without it the badge sat on whatever the top-left corner of the photograph
   happened to be, which on the real estate shot is a lit ceiling. Neither runs
   the full height, so the middle of the picture is still the picture. */
.svcx-frame::before{
  content:"";position:absolute;z-index:1;inset:0 0 auto;height:30%;pointer-events:none;
  background:linear-gradient(to bottom,rgba(6,24,52,.62) 0%,rgba(6,24,52,.22) 55%,rgba(6,24,52,0) 100%);
}
.svcx-frame__scrim{
  position:absolute;z-index:1;inset:auto 0 0;height:70%;pointer-events:none;
  background:linear-gradient(to top,rgba(6,24,52,.9) 0%,rgba(6,24,52,.42) 52%,rgba(6,24,52,0) 100%);
}
.svcx-frame__num{
  position:absolute;z-index:2;top:18px;left:18px;
  display:inline-flex;align-items:center;gap:9px;
  padding:8px 15px;border-radius:999px;
  background:rgba(8,28,60,.42);border:1px solid rgba(255,255,255,.3);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.28);
  backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);
  color:#fff;font-size:11.5px;font-weight:700;letter-spacing:.16em;
}
.svcx-frame__num i{
  font-style:normal;width:6px;height:6px;border-radius:50%;
  background:#8FC0FF;box-shadow:0 0 0 3px rgba(143,192,255,.26);
}
/* The service's own promise line, on glass over its own photograph.

   The fill is a white sheen over a dark tint rather than white alone: white
   alone LIGHTENS what is behind it, which on a bright photograph took this
   panel to about 3.4:1 against its own type. The tint under it is what makes
   the panel readable whatever the picture does; the sheen is what still makes
   it read as glass. */
.svcx-frame__cap{
  position:absolute;z-index:2;left:20px;right:20px;bottom:20px;
  margin:0!important;padding:18px 21px;border-radius:14px;
  background:linear-gradient(rgba(255,255,255,.15),rgba(255,255,255,.05)),rgba(8,26,54,.3);
  border:1px solid rgba(255,255,255,.24);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.26);
  backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);
  font-family:"Forum",serif!important;font-weight:400!important;color:#fff!important;
  font-size:clamp(17px,1.6vw,21px)!important;line-height:1.32!important;
  /* 'background', not 'background-color': what changes on hover is the sheen,
     which lives in background-image. */
  transition:background .3s ease,border-color .3s ease;
}
/* Hover lightens the sheen, never the tint — the panel gets brighter without
   losing the contrast the tint is there to guarantee. */
.svcx-frame:hover .svcx-frame__cap{
  background:linear-gradient(rgba(255,255,255,.22),rgba(255,255,255,.09)),rgba(8,26,54,.3);
  border-color:rgba(255,255,255,.42);
}

/* ---- The copy ------------------------------------------------------------ */
.svcx-lead{display:flex;align-items:center;gap:14px;margin:0 0 18px;}
.svcx-lead__ico{
  flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;
  width:52px;height:52px;border-radius:50%;
  background:rgba(0,83,183,.08);border:1px solid rgba(0,83,183,.16);color:var(--ny2);
}
.svcx-lead__ico svg{width:24px;height:24px;}
.svcx-lead__meta{display:flex;flex-direction:column;gap:5px;min-width:0;}
.svcx-lead__num{font-size:11px;font-weight:700;letter-spacing:.2em;color:var(--pl);}
.svcx-lead__short{
  font-size:12.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;
  color:var(--muted);
}
.svcx-h3{
  font-family:"Forum",serif!important;font-weight:400!important;color:var(--ny)!important;
  font-size:clamp(27px,3.1vw,38px)!important;line-height:1.12!important;
  margin:0 0 16px!important;
}
/* The underline is wiped in with background-size, so the link is marked without
   the heading moving. */
.svcx-h3 a{
  color:inherit!important;text-decoration:none!important;
  background-image:linear-gradient(currentColor,currentColor);
  background-size:0 1px;background-repeat:no-repeat;background-position:0 100%;
  transition:background-size .45s cubic-bezier(.22,.61,.36,1),color .25s ease;
}
.svcx-h3 a:hover{color:var(--ny2)!important;background-size:100% 1px;}
.svcx-desc{
  color:var(--body)!important;font-size:16.5px!important;line-height:1.75!important;
  margin:0 0 26px!important;max-width:54ch;
}

/* The sub-services, two-up. Eight of them fill four rows; three fill two. Both
   read as a list under the copy rather than as a card straining to hold them. */
.svcx-subs{
  list-style:none;margin:0 0 30px;padding:20px 0 0;
  display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0 30px;
  border-top:1px solid var(--line);
}
.svcx-subs a{
  display:flex;align-items:center;gap:11px;padding:11px 0;
  border-bottom:1px solid var(--line2);
  font-size:14.5px;color:var(--ny)!important;text-decoration:none!important;
  transition:color .25s ease,gap .3s cubic-bezier(.22,.61,.36,1);
}
.svcx-subs a:hover{color:var(--ny2)!important;gap:17px;}
.svcx-subs a::before{
  content:"";flex:0 0 auto;width:6px;height:6px;border-radius:50%;
  background:var(--ny2);opacity:.3;
  transition:opacity .25s ease,box-shadow .3s ease;
}
.svcx-subs a:hover::before{opacity:1;box-shadow:0 0 0 3px rgba(0,83,183,.14);}
.svcx-subs span{flex:1 1 auto;min-width:0;}
.svcx-subs i{
  font-style:normal;font-size:15px;line-height:1;color:var(--ny2);
  opacity:0;transition:opacity .25s ease;
}
.svcx-subs a:hover i{opacity:1;}

/* ==========================================================================
   CLOSE
   ========================================================================== */
.svcx-close{
  position:relative;isolation:isolate;overflow:hidden;
  background:linear-gradient(150deg,#0B4EA8 0%,#0A2A50 100%);
}
.svcx-close .svcx-plate{--throw:26px;opacity:.5;z-index:-1;}
/* Two soft fields on long unequal cycles. 'alternate' eases each back to where
   it began, which is what removes the seam a plain infinite loop would show. */
.svcx-close::before{
  content:"";position:absolute;z-index:-1;pointer-events:none;border-radius:50%;
  width:44vw;height:44vw;left:-12vw;top:-20vw;filter:blur(72px);
  background:radial-gradient(circle,rgba(94,160,255,.42) 0%,rgba(94,160,255,0) 70%);
  animation:svcx-drift-a 23s ease-in-out infinite alternate;
}
.svcx-close::after{
  content:"";position:absolute;z-index:-1;pointer-events:none;border-radius:50%;
  width:40vw;height:40vw;right:-10vw;bottom:-22vw;filter:blur(72px);
  background:radial-gradient(circle,rgba(156,0,221,.3) 0%,rgba(156,0,221,0) 70%);
  animation:svcx-drift-b 29s ease-in-out infinite alternate;
}
@keyframes svcx-drift-a{
  from{transform:translate3d(0,0,0) scale(1);}
  to{transform:translate3d(6vw,4vw,0) scale(1.14);}
}
@keyframes svcx-drift-b{
  from{transform:translate3d(0,0,0) scale(1.1);}
  to{transform:translate3d(-5vw,-4vw,0) scale(.94);}
}
.svcx-close__inner{
  width:100%;max-width:min(var(--maxw),920px);margin:0 auto;padding:0 var(--gutter);
  text-align:center;
}
.svcx-close__kick{
  display:inline-flex;align-items:center;gap:9px;
  padding:8px 16px 8px 13px!important;border-radius:999px;
  background:rgba(255,255,255,.13);border:1px solid rgba(255,255,255,.28);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.3);
  backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);
  font-size:11px!important;font-weight:700!important;letter-spacing:.15em!important;
  text-transform:uppercase;color:#fff!important;margin:0 0 20px!important;
}
.svcx-close__kick::before{
  content:"";flex:0 0 auto;width:7px;height:7px;border-radius:50%;
  background:#8FC0FF;box-shadow:0 0 0 3px rgba(143,192,255,.28);
}
.svcx-close__head{
  font-family:"Forum",serif!important;font-weight:400!important;color:#fff!important;
  font-size:clamp(30px,4vw,50px)!important;line-height:1.08!important;
  margin:0 auto 18px!important;max-width:20ch;
}
.svcx-close__sub{
  color:rgba(255,255,255,.85)!important;font-size:17px!important;line-height:1.7!important;
  margin:0 auto 30px!important;max-width:56ch;
}
.svcx-close__ctas{display:flex;flex-wrap:wrap;gap:14px;justify-content:center;}

/* ==========================================================================
   BREAKPOINTS
   ========================================================================== */
@media(max-width:1024px){
  .svcx{--pad:56px;--gap:20px;}
  .svcx-intro__grid{grid-template-columns:minmax(0,1fr);gap:36px;align-items:start;}
  .svcx-intro__col{max-width:none;}
  .svcx-stats{grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;}
  .svcx-row{grid-template-columns:minmax(0,1fr);gap:36px;}
  /* One column: the flip has nothing left to say, and leaving it on would put
     the figure under the copy on alternate rows for no reason. */
  .svcx-row--flip .svcx-row__media{order:0;}
  .svcx-frame{aspect-ratio:16 / 10;}
  /* One column, so the figure is wider and the lean can come in without
     disappearing; and the flip is off, so the texture goes back to the right on
     every row. */
  .svcx-tex{--lean:26px;width:58%;height:64%;}
  .svcx-row--flip .svcx-tex{right:calc(var(--lean) * -1);left:auto;}
  .svcx-desc{max-width:none;}
}
@media(max-width:680px){
  .svcx{--pad:44px;--gutter:20px;--radius:16px;}
  .svcx-stats{grid-template-columns:minmax(0,1fr);}
  .svcx-subs{grid-template-columns:minmax(0,1fr);gap:0;}
  .svcx-frame{aspect-ratio:3 / 2;}
  .svcx-frame__cap{left:14px;right:14px;bottom:14px;padding:14px 16px;}
  .svcx-frame__num{top:14px;left:14px;padding:7px 12px;}
  .svcx-tex{--lean:18px;width:54%;height:58%;}
  .svcx-lead__ico{width:46px;height:46px;}
  .svcx-close__ctas{flex-direction:column;align-items:stretch;}
  .svcx-close__ctas .svcx-btn{justify-content:center;}
}
`;

/** The arrow that ends every CTA. Drawn, so it inherits colour and stroke. */
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

/**
 * `page` stays in the signature although nothing here reads it: the call site in
 * app/[region]/services/page.tsx hands every body the same pair, and the shared
 * hero above this one is what consumes the registry entry.
 */
export default function UaeServicesBody({
  region,
}: {
  page: PageConfig;
  region: string;
}) {
  const services = vxnServices(region);
  const market = vxnRegionData(region);

  /* Counted, not typed: add a sub-service to the registry and this figure moves
     with it. A number kept by hand is a number that is eventually wrong. */
  const subCount = services.reduce((n, s) => n + (s.subs?.length ?? 0), 0);

  const plate = (key: keyof typeof PLATE) => rimgFirst(region, PLATE[key]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="svcx">
        <UaeServicesMotion />

        {/* ---- Intro ---- */}
        <section className="svcx-intro" aria-labelledby="svcx-intro-head">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="svcx-plate svcx-zoom" src={plate('intro')} alt="" />
          <div className="svcx-in">
            <div className="svcx-intro__grid">
              <div className="svcx-intro__col">
                <span className="svcx-kicker">What we do</span>
                <h2 className="svcx-h2" id="svcx-intro-head">
                  Advisory Services in the UAE
                </h2>
                <p className="svcx-lede">
                  Accounting, transactions, funding, valuation, research and technology &#8212;
                  every discipline under one roof, so a decision is advised, financed and executed
                  by the same team.
                </p>

                <ul className="svcx-jump">
                  {services.map((s) => (
                    <li key={s.slug ?? s.href}>
                      <a href={`#svc-${s.slug ?? ''}`}>
                        <MegaIcon token={s.icon} />
                        {vxnServiceName(s)}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="svcx-stats">
                <div className="svcx-stat">
                  <span className="svcx-stat__n">{String(services.length).padStart(2, '0')}</span>
                  <span className="svcx-stat__k">Service lines</span>
                  <span className="svcx-stat__v">Advised, financed and executed in-house</span>
                </div>
                <div className="svcx-stat">
                  <span className="svcx-stat__n">{subCount}</span>
                  <span className="svcx-stat__k">Specialist practices</span>
                  <span className="svcx-stat__v">Each with a page of its own</span>
                </div>
                <div className="svcx-stat">
                  <span className="svcx-stat__n">
                    {String(market.offices.length).padStart(2, '0')}
                  </span>
                  <span className="svcx-stat__k">UAE offices</span>
                  <span className="svcx-stat__v">{market.cities}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---- The six bands ---- */}
        {services.map((s, i) => {
          const href = rurl(region, s.href);
          const name = vxnServiceName(s);
          const flip = i % 2 === 1;
          const key = s.slug ?? String(i);

          return (
            <section
              className={`svcx-band${flip ? ' svcx-band--tint' : ''}`}
              id={`svc-${key}`}
              key={key}
              aria-labelledby={`svc-head-${key}`}
            >
              <div className="svcx-in">
                <div className={`svcx-row${flip ? ' svcx-row--flip' : ''}`}>
                  <div className="svcx-row__media">
                    <span className="svcx-tex" aria-hidden="true">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={rimgFirst(region, TEXTURE[i % 2])} alt="" loading="lazy" />
                    </span>

                    <a className="svcx-frame" href={href}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        className="svcx-plate svcx-zoom"
                        src={rimgFirst(region, figureFor(s.img))}
                        alt={`${name} in ${market.cities}`}
                        loading="lazy"
                      />
                      <span className="svcx-frame__scrim" />
                      <span className="svcx-frame__num">
                        <i />
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {s.headline ? <p className="svcx-frame__cap">{s.headline}</p> : null}
                    </a>
                  </div>

                  <div className="svcx-row__copy">
                    <div className="svcx-lead">
                      <span className="svcx-lead__ico" aria-hidden="true">
                        <MegaIcon token={s.icon} />
                      </span>
                      <span className="svcx-lead__meta">
                        <span className="svcx-lead__num">
                          {String(i + 1).padStart(2, '0')} /{' '}
                          {String(services.length).padStart(2, '0')}
                        </span>
                        <Html as="span" className="svcx-lead__short" html={s.short} />
                      </span>
                    </div>

                    <h3 className="svcx-h3" id={`svc-head-${key}`}>
                      <a href={href}>{name}</a>
                    </h3>

                    <Html as="p" className="svcx-desc" html={s.lede ?? s.desc} />

                    {s.subs?.length ? (
                      <ul className="svcx-subs">
                        {s.subs.map((sub) => (
                          <li key={sub.slug}>
                            <a href={rurl(region, `${s.href}${sub.slug}/`)}>
                              <span>{sub.name}</span>
                              <i aria-hidden="true">&rsaquo;</i>
                            </a>
                          </li>
                        ))}
                      </ul>
                    ) : null}

                    <a className="svcx-btn svcx-btn--solid" href={href}>
                      Explore {name}
                      <Arrow />
                    </a>
                  </div>
                </div>
              </div>
            </section>
          );
        })}

        {/* ---- Close ---- */}
        <section className="svcx-close" aria-labelledby="svcx-close-head">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="svcx-plate svcx-zoom" src={plate('close')} alt="" loading="lazy" />
          <div className="svcx-close__inner">
            <span className="svcx-close__kick">Start here</span>
            <h2 className="svcx-close__head" id="svcx-close-head">
              Not sure which of the six you need?
            </h2>
            <p className="svcx-close__sub">
              Most engagements start as one question and end up touching two or three of these
              practices. Tell us the decision you are facing and we will tell you what it takes
              &#8212; at a fee agreed before any work begins.
            </p>
            <div className="svcx-close__ctas">
              <a className="svcx-btn svcx-btn--light" href={rurl(region, '/free-consultation/')}>
                Book a free consultation
                <Arrow />
              </a>
              <a className="svcx-btn svcx-btn--ghost" href={rurl(region, '/contact/')}>
                Talk to our {market.short ?? market.name} team
                <Arrow />
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
