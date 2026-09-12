/**
 * The poster trio on /en-ae/ (20260912).
 *
 * Built to the reference supplied that day: three portrait panels side by side,
 * each a single statement, read as one set because the three grounds differ.
 * The reference's are a dark panel with the brand's chevron cut across it, a
 * photograph, and a flat colour with the statement in dark type. This keeps
 * that rhythm and changes the palette for the brand's: the chevron is the
 * wordmark's own x (components/brand/LogoX.tsx, the device the rest of this page
 * already uses), the flat panel is the CTA gradient, and the accent under the
 * emphasised words is the brand's sky rather than the reference's green.
 *
 * THE GLASS. Every card carries a frosted plate along its foot holding the
 * call and the wordmark, and a specular sheen that crosses the card once as it
 * arrives and again on hover. That was the explicit ask for this section. The
 * plate has an opaque fallback where backdrop-filter is unavailable, as the
 * other two glass panels on the site do, and the sheen is a decoration on a
 * pseudo element, so nothing here is load bearing.
 *
 * THE COPY IS NOT THE CLIENT'S. The home document was written before this
 * section was asked for, so the three statements, the three foot lines and the
 * photograph's caption are drafted here in the document's register, to be
 * replaced when the client supplies theirs. The links are not drafted: each
 * card leads to a page this site already publishes. No em dashes, as on every
 * UAE page.
 *
 * WHERE IT SITS. After the careers band and before the insights carousel, as
 * the closing statement of the middle of the page. India renders none of it.
 *
 * Motion: components/sections/UaeBandMotion.tsx. Styles:
 * assets/css/valunxt-landing.css (section 20, .vxn-post).
 */
import { BASE, rurl } from '@/lib/region';
import { rimgFirst } from '@/lib/region-assets';
import { LogoXGlyph } from '@/components/brand/LogoX';

/** One panel. `lead`/`mark`/`tail` split the statement so the middle words can
 *  take the underline the reference draws under its own. */
interface Poster {
  kind: 'mark' | 'photo' | 'fill';
  lead: string;
  mark: string;
  tail: string;
  /** The line in the frosted plate, which is also the card's call. */
  note: string;
  href: string;
  /** Photo cards only, in preference order. */
  images?: string[];
  alt?: string;
  /** Photo cards only: the small caption the reference sets above the plate. */
  caption?: string;
}

const POSTERS: Poster[] = [
  {
    kind: 'mark',
    lead: 'Advice that ',
    mark: 'protects',
    tail: ' what you are building.',
    note: 'About VALUNXT',
    href: '/about/',
  },
  {
    kind: 'photo',
    lead: 'We work ',
    mark: 'beside the people',
    tail: ' making the decision.',
    note: 'Talk to an Adviser',
    href: '/free-consultation/',
    images: ['new-folder/about-us-1.webp', 'banners/careers.webp'],
    alt: 'Two colleagues reviewing figures together',
    caption: 'Founders, businesses, investors and developers across the UAE',
  },
  {
    kind: 'fill',
    lead: 'Complete financial ',
    mark: 'advisory',
    tail: ', in one place.',
    note: 'Explore Our Services',
    href: '/services/',
  },
];

export default function UaePosterTrio({ region }: { region: string }) {
  return (
    <section className="vxn-post" aria-label="What VALUNXT stands for">
      <div className="vxn-post__grid">
        {POSTERS.map((p) => (
          <a
            className={`vxn-post__card vxn-post__card--${p.kind}`}
            href={rurl(region, p.href)}
            key={p.href}
          >
            {p.kind === 'photo' ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="vxn-post__media"
                  src={rimgFirst(region, p.images ?? [])}
                  alt={p.alt ?? ''}
                  loading="lazy"
                />
                <span className="vxn-post__scrim" aria-hidden="true" />
              </>
            ) : null}

            {p.kind === 'mark' ? (
              <span className="vxn-post__chev" aria-hidden="true">
                <LogoXGlyph />
              </span>
            ) : null}

            <div className="vxn-post__body">
              <h3 className="vxn-post__title">
                {p.lead}
                <em className="vxn-post__hl">{p.mark}</em>
                {p.tail}
              </h3>
              {p.caption ? <p className="vxn-post__cap">{p.caption}</p> : null}
            </div>

            <div className="vxn-post__foot">
              <span className="vxn-post__note">
                {p.note}
                <i aria-hidden="true" className="vamtamtheme- vamtam-theme-arrow-right" />
              </span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="vxn-post__logo"
                src={`${BASE}/assets/content/uploads/logo/valunxt-white.svg`}
                alt=""
                aria-hidden="true"
                width={410}
                height={82}
                loading="lazy"
              />
            </div>

            <span className="vxn-post__sheen" aria-hidden="true" />
          </a>
        ))}
      </div>
    </section>
  );
}
