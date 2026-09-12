/**
 * The figures band on /en-ae/ (20260912).
 *
 * Built to the reference supplied that day: one wide rounded card on a blue
 * gradient with flowing ribbons across it, a lead panel held apart on the left
 * carrying the headline figure, and three more figures beside it with a hairline
 * between each. The reference's palette is not used; every surface here is the
 * brand's own, and the ribbons are homepage/abstract-2.webp, the artwork already
 * in uploads that the reference's background happens to be a near match for.
 *
 * THE FIGURES ARE THE CLIENT'S, all four of them, and none is new to the site:
 * six practices is the services registry's own count, and 48+ years, 200+ years
 * combined and 10+ industries are the three the home document gives the band
 * below ("Expertise Measured in Decades."). THE SENTENCES UNDER THEM ARE MINE,
 * drafted in the document's register because the document states the figures as
 * one line of prose and gives no caption for any of them. Same for the lead
 * panel's title and paragraph. All of it is a slot to be replaced when the
 * client supplies captions. No em dashes, as on every UAE page.
 *
 * THE BAND BELOW STILL CARRIES THE SAME THREE NUMBERS in its lede, which is
 * client copy and so was left alone; flagged for the client rather than edited
 * here.
 *
 * WHERE IT SITS. Straight after the "Who We Are" trio and before the six
 * services, so the proof is read before the offer. India renders none of it.
 *
 * Motion: components/sections/UaeBandMotion.tsx rolls each figure up to its
 * value once the card is on screen; the values are in the markup, so with the
 * script blocked or motion reduced they simply render.
 *
 * Styles: assets/css/valunxt-landing.css (section 19, .vxn-figs).
 */
import { rimg } from '@/lib/region-assets';
import { rurl, vxnServices } from '@/lib/region';

/** One figure and the line under it. `value` is what renders; `from` is where
 *  the roll starts, so 200+ does not count through 199 uninteresting steps. */
interface Figure {
  value: string;
  label: string;
}

/* Drafted captions, see the header. The three figures are the home document's
   own; the wording under them is not. */
const FIGURES: Figure[] = [
  {
    value: '48+',
    label: 'Years of expertise behind every valuation, report and recommendation.',
  },
  {
    value: '200+',
    label: 'Years of combined experience across the advisory team.',
  },
  {
    value: '10+',
    label: 'Industries served, held to the same standard of evidence in each.',
  },
];

export default function UaeFigureBand({ region }: { region: string }) {
  /* The lead figure is counted, not typed: the services registry is the one
     list the hero, the accordion and the header menu all read, so the panel
     cannot claim a number the page does not show. */
  const practices = vxnServices(region).length;

  return (
    <section className="vxn-figs" aria-labelledby="vxn-figs-title">
      <div className="vxn-figs__card" data-vxn-figs="">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="vxn-figs__texture"
          src={rimg(region, 'homepage/abstract-2.webp')}
          alt=""
          aria-hidden="true"
          loading="lazy"
        />
        {/* The two soft lights that lift the ribbons off the fill. Painted
            rather than drawn, so they cost nothing and scale with the card. */}
        <span className="vxn-figs__glow" aria-hidden="true" />

        <div className="vxn-figs__lead">
          <span className="vxn-figs__rank" data-vxn-count={String(practices)}>
            {practices}
          </span>
          <h2 id="vxn-figs-title" className="vxn-figs__leadTitle">
            Connected Practices for Businesses
          </h2>
          <p className="vxn-figs__leadCopy">
            Accounting and tax, real estate, mortgages, valuation, research and technology,
            advised from one view of your business.
          </p>
          <a className="vxn-figs__leadLink" href={rurl(region, '/services/')}>
            Explore Our Services
            <i aria-hidden="true" className="vamtamtheme- vamtam-theme-arrow-right" />
          </a>
        </div>

        <dl className="vxn-figs__stats">
          {FIGURES.map((f) => (
            <div className="vxn-figs__stat" key={f.value}>
              <dt className="vxn-figs__num" data-vxn-count={f.value}>
                {f.value}
              </dt>
              <dd className="vxn-figs__lbl">{f.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
