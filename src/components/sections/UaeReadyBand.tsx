/**
 * "Ready when you are" — the closing conversion band on /en-ae/.
 *
 * Copy on the left, three ways to start on the right, over a pale wash that
 * drifts slowly behind them. The motion is CSS: two blurred conic blooms on
 * long, offset keyframes, plus a scroll-driven reveal on the cards. No
 * animation library is pulled in for it — a dependency would cost more than the
 * ~30 lines of keyframes it would replace, and the reveal degrades to "already
 * visible" wherever `animation-timeline` is unsupported (see the @supports
 * guard in the stylesheet).
 *
 * Every claim restates something the site already publishes: the free
 * consultation, the fee agreed in writing before work starts, and the UAE line
 * and hours from site-data.
 *
 * Styles: assets/css/valunxt-landing.css (.vxn-ready).
 */
import { rurl, vxnRegionData, vxnRegionPhone } from '@/lib/region';

/** The three glyphs, drawn rather than pulled from the icon font so they share
 *  a stroke weight with the rest of this block. */
function Glyph({ name }: { name: 'talk' | 'quote' | 'call' }) {
  const common = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.7,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    focusable: 'false' as const,
    'aria-hidden': true,
  };
  if (name === 'talk') {
    return (
      <svg {...common}>
        <path d="M8.5 11a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
        <path d="M16 11.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
        <path d="M3 19v-1a5.5 5.5 0 0 1 11 0v1" />
        <path d="M16 14a5 5 0 0 1 5 5v0" />
      </svg>
    );
  }
  if (name === 'quote') {
    return (
      <svg {...common}>
        <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" />
        <path d="M14 3v5h5" />
        <path d="M9 13h6M9 17h4" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M15.5 20.5A13.5 13.5 0 0 1 3.5 8.5a2.5 2.5 0 0 1 2.2-2.5l1.6-.2a1.4 1.4 0 0 1 1.5.9l.9 2.2a1.4 1.4 0 0 1-.4 1.6l-1 .8a10.6 10.6 0 0 0 4.4 4.4l.8-1a1.4 1.4 0 0 1 1.6-.4l2.2.9a1.4 1.4 0 0 1 .9 1.5l-.2 1.6a2.5 2.5 0 0 1-2.5 2.2Z" />
    </svg>
  );
}

/** The small corner arrow every card carries. */
function GoArrow() {
  return (
    <span className="vxn-ready__go" aria-hidden="true">
      <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M4.5 11.5L11.5 4.5M11.5 4.5H5.5M11.5 4.5V10.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export default function UaeReadyBand({ region }: { region: string }) {
  const r = vxnRegionData(region);

  const routes: {
    icon: 'talk' | 'quote' | 'call';
    name: string;
    note: string;
    href: string;
    external?: boolean;
  }[] = [
    {
      icon: 'talk',
      name: 'Book a free consultation',
      note: 'No obligation. A partner listens first and says what is actually needed.',
      href: rurl(region, '/free-consultation/'),
    },
    {
      icon: 'quote',
      name: 'Get a fixed-fee quote',
      note: 'Scope and fee agreed in writing before any work begins.',
      href: rurl(region, '/contact/'),
    },
    {
      icon: 'call',
      name: `Call ${vxnRegionPhone(region)}`,
      note: `${r.hours} · ${r.cities}`,
      href: `tel:${r.tel}`,
      external: true,
    },
  ];

  return (
    <section className="vxn-ready" aria-labelledby="vxn-ready-title">
      {/* Decorative only.

          Drawn rather than photographed: the reference is a set of broad,
          soft-edged ribbons sweeping across a cream ground, and no asset in
          uploads is that — they are all saturated blue studies, which at any
          opacity read as a picture behind the copy rather than as a pale wash.
          Six paths on a 1440x520 canvas, blurred through a filter and drifting
          on long offset loops, land much closer and stay editable: the band
          colour, spacing and curvature are all in this file. */}
      <div className="vxn-ready__wash" aria-hidden="true">
        <span className="vxn-ready__bloom" />
        <svg
          className="vxn-ready__waves"
          viewBox="0 0 1440 520"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          focusable="false"
        >
          <defs>
            {/* Blur reduced from 16 on client feedback. The viewBox is 520 tall
                and `preserveAspectRatio="none"` squashes it into a band that
                was ~420px — so a 16px deviation was being scaled up with
                everything else and the ribbons dissolved into the ground. At 11
                they read as bands again without becoming graphic. */}
            <filter id="vxn-ready-soft" x="-20%" y="-40%" width="140%" height="180%">
              <feGaussianBlur stdDeviation="11" />
            </filter>
            {/* Opacities raised across the ramp for the same reason: the wash
                was there in the markup but not on the screen. */}
            <linearGradient id="vxn-ready-band" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="#C6CEEC" stopOpacity=".46" />
              <stop offset="55%" stopColor="#AFBDE8" stopOpacity=".82" />
              <stop offset="100%" stopColor="#93A7DF" stopOpacity="1" />
            </linearGradient>
          </defs>
          <g filter="url(#vxn-ready-soft)" fill="url(#vxn-ready-band)">
            <path d="M-140 470 C 240 400, 520 300, 900 236 C 1180 188, 1380 160, 1600 140 L1600 214 C 1380 234, 1180 262, 900 310 C 520 374, 240 474, -140 544 Z" />
            <path d="M-140 560 C 260 486, 560 374, 940 306 C 1210 258, 1400 232, 1600 214 L1600 292 C 1400 310, 1210 336, 940 384 C 560 452, 260 564, -140 638 Z" />
            <path d="M-140 372 C 220 312, 480 226, 860 168 C 1150 124, 1370 100, 1600 84 L1600 128 C 1370 144, 1150 168, 860 212 C 480 270, 220 356, -140 416 Z" />
            <path d="M-140 668 C 300 578, 620 452, 1000 380 C 1250 332, 1420 308, 1600 292 L1600 352 C 1420 368, 1250 392, 1000 440 C 620 512, 300 638, -140 728 Z" />
            <path d="M-140 262 C 200 214, 440 148, 820 100 C 1120 62, 1360 42, 1600 30 L1600 62 C 1360 74, 1120 94, 820 132 C 440 180, 200 246, -140 294 Z" />
            <path d="M-140 790 C 340 682, 680 536, 1060 456 C 1290 408, 1440 386, 1600 372 L1600 424 C 1440 438, 1290 460, 1060 508 C 680 588, 340 734, -140 842 Z" />
          </g>
        </svg>
      </div>

      <div className="vxn-ready__inner">
        <div className="vxn-ready__copy">
          <span className="vxn-ready__eyebrow">Ready when you are</span>
          <h2 id="vxn-ready-title" className="vxn-ready__title">
            Start with a conversation, not a commitment.
          </h2>
          <p className="vxn-ready__lede">
            A free consultation, a fixed-fee quote in writing, and a named partner from the first
            call.
          </p>
        </div>

        <ul className="vxn-ready__list">
          {routes.map((it, i) => (
            <li className="vxn-ready__item" key={it.name} style={{ '--i': i } as React.CSSProperties}>
              <a
                className="vxn-ready__card"
                href={it.href}
                {...(it.external ? {} : { rel: 'noopener' })}
              >
                <span className="vxn-ready__icon" aria-hidden="true">
                  <Glyph name={it.icon} />
                </span>
                <span className="vxn-ready__text">
                  <span className="vxn-ready__name">{it.name}</span>
                  <span className="vxn-ready__note">{it.note}</span>
                </span>
                <GoArrow />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
