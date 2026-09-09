/**
 * Four feature bands that run between the services accordion and the insights
 * carousel on /en-ae/ only.
 *
 * The layouts are the ones supplied as reference (a dark impact strip, a split
 * spotlight, a three-card mosaic and a careers band). The palette is not: every
 * surface here is built from the brand tokens in valunxt-brand.css, and the
 * artwork is the abstract/texture set already in uploads rather than anything
 * new. The recurring device is the same one the rest of the page uses — the
 * wordmark's x as a corner motif, see components/brand/LogoX.tsx.
 *
 * Nothing here states a claim the site does not already make elsewhere: the
 * fixed fee, the senior team, the RICS regulation through Reliant Surveyors and
 * the Dubai/Noida/Mumbai footprint are all carried over from copy that was
 * already published.
 *
 * India renders none of this — HomeInBody does not import it.
 *
 * Styles: assets/css/valunxt-landing.css (.vxn-impact, .vxn-spotlight,
 * .vxn-mosaic, .vxn-careers).
 */
import { rurl } from '@/lib/region';
import { rimg, rimgFirst } from '@/lib/region-assets';
import { LogoXGlyph } from '@/components/brand/LogoX';

/** The pill CTA used across all four bands. */
function Pill({
  href,
  label,
  variant = 'accent',
}: {
  href: string;
  label: string;
  variant?: 'accent' | 'solid' | 'ghost';
}) {
  return (
    <a className={`vxn-band__pill vxn-band__pill--${variant}`} href={href}>
      {label}
      <i aria-hidden="true" className="vamtamtheme- vamtam-theme-arrow-right" />
    </a>
  );
}

/* -------------------------------------------------------------------------- */

/**
 * 1. The impact strip. A single dark card, headline left and the case for it
 *    right, with the texture washed back far enough to stay a background.
 */
export function ImpactBand({ region }: { region: string }) {
  return (
    <section className="vxn-impact" aria-labelledby="vxn-impact-title">
      <div className="vxn-impact__card">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="vxn-impact__texture"
          src={rimg(region, 'homepage/abstract-3.webp')}
          alt=""
          aria-hidden="true"
          loading="lazy"
        />
        <h2 id="vxn-impact-title" className="vxn-impact__title">
          Impact You Can Evidence
        </h2>
        <div className="vxn-impact__side">
          <p className="vxn-impact__copy">
            See how we work alongside founders, family businesses, developers and private owners
            across the UAE &mdash; compliance kept current, valuations documented to withstand
            scrutiny, and advice you can act on without second-guessing.
          </p>
          <Pill href={rurl(region, '/clients/')} label="Explore Client Stories" />
        </div>
      </div>
    </section>
  );
}

/**
 * 2. The spotlight. One practice given the full width: copy on the left,
 *    artwork on the right, on a tinted band that separates it from the cream
 *    sections either side.
 */
export function SpotlightBand({ region }: { region: string }) {
  return (
    <section className="vxn-spotlight" aria-labelledby="vxn-spotlight-title">
      <div className="vxn-spotlight__inner">
        <div className="vxn-spotlight__copy">
          <span className="vxn-band__eyebrow">Technology, Data &amp; AI</span>
          <h2 id="vxn-spotlight-title" className="vxn-spotlight__title">
            Finance, Made Measurable
          </h2>
          <p className="vxn-spotlight__lede">
            Digital transformation, enterprise and cloud systems, dashboards and AI tooling that
            turn reporting into something you can rely on month after month. Built on the same
            evidence-led method as every other practice here, and quoted at a fee agreed before the
            work starts.
          </p>
          <Pill
            href={rurl(region, '/services/technology-data-ai/')}
            label="Explore the Practice"
            variant="solid"
          />
        </div>
        <figure className="vxn-spotlight__media">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={rimg(region, 'homepage/abstract-2.webp')}
            alt="Abstract rendering of layered data surfaces"
            loading="lazy"
          />
          <span className="vxn-spotlight__x" aria-hidden="true">
            <LogoXGlyph />
          </span>
        </figure>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

interface MosaicCard {
  eyebrow: string;
  title: string;
  cta: string;
  href: string;
  /** Candidates in preference order; the first that exists wins. */
  images?: string[];
  alt?: string;
}

/** The tall card on the left, then the two stacked beside it. */
const MOSAIC_LEAD: MosaicCard = {
  eyebrow: 'About VALUNXT',
  title: 'Where Independent Advice Meets Applied Method',
  cta: 'See How We Work',
  href: '/about/',
  images: ['banners/clients.webp', 'homepage/client-2.webp'],
  alt: 'Advisers and clients in a Dubai office',
};

const MOSAIC_STACK: MosaicCard[] = [
  {
    eyebrow: 'Research &amp; Intelligence',
    title: 'Evidence Before the Commitment',
    cta: 'Read the Research',
    href: '/research/',
  },
  {
    eyebrow: 'The Group',
    title: 'RICS-Regulated Valuation at Scale',
    cta: 'Meet Reliant Surveyors',
    href: '/our-group/reliant-surveyors/',
    images: ['banners/our-group.webp', 'banners/network.webp'],
    alt: 'Valuation team reviewing a property file',
  },
];

/**
 * 3. The mosaic. A tall photographic card beside two shorter ones — the middle
 *    card takes the brand gradient so the group does not read as three
 *    photographs in a row.
 */
export function MosaicBand({ region }: { region: string }) {
  return (
    <section className="vxn-mosaic" aria-label="More from VALUNXT">
      <div className="vxn-mosaic__grid">
        <a className="vxn-mosaic__card vxn-mosaic__card--lead" href={rurl(region, MOSAIC_LEAD.href)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="vxn-mosaic__media"
            src={rimgFirst(region, MOSAIC_LEAD.images ?? [])}
            alt={MOSAIC_LEAD.alt ?? ''}
            loading="lazy"
          />
          <div className="vxn-mosaic__body">
            <span className="vxn-band__eyebrow">{MOSAIC_LEAD.eyebrow}</span>
            <h3 className="vxn-mosaic__title">{MOSAIC_LEAD.title}</h3>
            <span className="vxn-band__pill vxn-band__pill--accent">
              {MOSAIC_LEAD.cta}
              <i aria-hidden="true" className="vamtamtheme- vamtam-theme-arrow-right" />
            </span>
          </div>
        </a>

        <div className="vxn-mosaic__stack">
          {MOSAIC_STACK.map((card, i) => (
            <a
              className={`vxn-mosaic__card vxn-mosaic__card--${i === 0 ? 'grad' : 'photo'}`}
              href={rurl(region, card.href)}
              key={card.href}
            >
              {card.images ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="vxn-mosaic__media"
                    src={rimgFirst(region, card.images)}
                    alt={card.alt ?? ''}
                    loading="lazy"
                  />
                </>
              ) : (
                <span className="vxn-mosaic__x" aria-hidden="true">
                  <LogoXGlyph />
                </span>
              )}
              <div className="vxn-mosaic__body">
                <span
                  className="vxn-band__eyebrow"
                  dangerouslySetInnerHTML={{ __html: card.eyebrow }}
                />
                <h3 className="vxn-mosaic__title">{card.title}</h3>
                <span className="vxn-band__pill vxn-band__pill--accent">
                  {card.cta}
                  <i aria-hidden="true" className="vamtamtheme- vamtam-theme-arrow-right" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * 4. The careers band. Copy on a cream half, artwork on the other with the
 *    team photograph inset over it — the framed-photo-on-texture treatment from
 *    the reference, in the brand's blues.
 */
export function CareersBand({ region }: { region: string }) {
  return (
    <section className="vxn-careers" aria-labelledby="vxn-careers-title">
      <div className="vxn-careers__copy">
        <span className="vxn-band__eyebrow">VALUNXT Careers</span>
        <h2 id="vxn-careers-title" className="vxn-careers__title">
          Build a Career on Work That Holds Up
        </h2>
        <p className="vxn-careers__lede">
          We are a senior team of accountants, tax advisers and valuers, part of the Reliant
          Surveyors group &mdash; from Dubai to Noida to Mumbai. If you would rather be trusted with
          the whole mandate than a slice of it, we should talk.
        </p>
        <div className="vxn-careers__actions">
          <Pill href={rurl(region, '/about/careers/')} label="Explore Careers" variant="ghost" />
          <Pill href={rurl(region, '/contact/')} label="Get in Touch" variant="solid" />
        </div>
      </div>
      <div className="vxn-careers__media">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="vxn-careers__texture"
          src={rimg(region, 'banners/texture-2.webp')}
          alt=""
          aria-hidden="true"
          loading="lazy"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="vxn-careers__inset"
          src={rimgFirst(region, ['banners/careers.webp', 'banners/community.webp'])}
          alt="VALUNXT colleagues in conversation"
          loading="lazy"
        />
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

/** All four, in the order they run on the page. */
export default function UaeImpactBands({ region }: { region: string }) {
  return (
    <>
      <ImpactBand region={region} />
      <SpotlightBand region={region} />
      <MosaicBand region={region} />
      <CareersBand region={region} />
    </>
  );
}
