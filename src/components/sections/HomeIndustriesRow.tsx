/**
 * The industries row on both market home pages — the full-bleed strip of cards
 * that expands under the pointer.
 *
 * It was the same block of captured markup written out twice, once in each home
 * body, listing five services and linking each card to a service page. It is one
 * component now: the two markets show the same sectors, and a list kept in two
 * 2,000-line files is a list that drifts.
 *
 * The cards are no longer links. They carry a sector and a photograph and
 * nothing else, so there is nothing to navigate to — and with no destination,
 * the arrow that used to sit in each footer was an affordance for a click that
 * does nothing, so it has gone too. The expand-and-desaturate animation is
 * untouched: it is pure CSS on `.vxn-svc-card:hover` (see valunxt-brand.css) and
 * never depended on the element being an anchor.
 *
 * Artwork: each sector names the file it wants first and falls back to a
 * stand-in from the old five. rimgFirst() takes the first candidate that exists,
 * so dropping `industry-healthcare.webp` into
 * assets/content/uploads/homepage/ replaces the stand-in with no code change —
 * and a per-market override under uploads/regions/<slug>/ wins over both.
 */
import { rimgFirst } from '@/lib/region-assets';

export interface Industry {
  /** Plain text — this is a heading, not markup. */
  name: string;
  /** Preferred artwork first, current stand-in last. */
  img: string[];
}

/**
 * Stand-ins, and how good they are:
 *   industry-1  concourse of people        — reads as retail footfall
 *   industry-2  atrium architecture        — reads as real estate
 *   industry-3  rows of server racks       — approximate for logistics
 *   industry-4  workstation and code       — reads as technology
 *   industry-5  advisers and a world map   — reads as professional services
 *   abstract-1  neutral blue abstract      — deliberately says nothing
 *
 * Healthcare and Manufacturing & Logistics have no photography in the library;
 * they take the two least-wrong stand-ins until real images are supplied.
 */
const INDUSTRIES: Industry[] = [
  {
    name: 'Real Estate & Construction',
    img: ['homepage/industry-real-estate-construction.webp', 'homepage/industry-2.webp'],
  },
  {
    name: 'Retail & F&B',
    img: ['homepage/industry-retail-fnb.webp', 'homepage/industry-1.webp'],
  },
  {
    name: 'Healthcare',
    img: ['homepage/industry-healthcare.webp', 'homepage/abstract-1.webp'],
  },
  {
    name: 'Manufacturing & Logistics',
    img: ['homepage/industry-manufacturing-logistics.webp', 'homepage/industry-3.webp'],
  },
  {
    name: 'Technology & Startups',
    img: ['homepage/industry-technology-startups.webp', 'homepage/industry-4.webp'],
  },
  {
    name: 'Professional Services',
    img: ['homepage/industry-professional-services.webp', 'homepage/industry-5.webp'],
  },
];

/**
 * The strip, optionally with a different list behind it.
 *
 * The Accounting & Bookkeeping page shows the same expanding row over its own
 * six disciplines rather than over sectors, so the cards, the CSS and the
 * hover are shared and only the list differs. Both home pages call this with no
 * arguments and are unaffected.
 *
 * `eyebrow` and `heading` are props for completeness only: the
 * `.vxn-home-svc-section` variant hides that block outright
 * (`.elementor-element-85963b4 { display:none }` in valunxt-brand.css), so
 * nothing passed here is ever painted. They stay because the markup does.
 */
export default function HomeIndustriesRow({
  region,
  items = INDUSTRIES,
  eyebrow = 'Industries We Serve',
  heading = 'The Sectors We Work Across',
}: {
  region: string;
  items?: Industry[];
  eyebrow?: string;
  heading?: string;
}) {
  return (
    <div className="vxn-home-svc-section vxn-home-svc-shifted">
      <div
        className="elementor-element elementor-element-85963b4 e-flex e-con-boxed e-con e-parent"
        data-id="85963b4"
        data-element_type="container"
        data-e-type="container"
      >
        <div className="e-con-inner">
          <div
            className="elementor-element elementor-element-04c603a e-con-full e-flex e-con e-child"
            data-id="04c603a"
            data-element_type="container"
            data-e-type="container"
          >
            <div
              className="elementor-element elementor-element-118f825 elementor-invisible animated-fast elementor-widget elementor-widget-heading"
              data-id="118f825"
              data-element_type="widget"
              data-e-type="widget"
              data-settings={'{"_animation":"slideInUp"}'}
              data-widget_type="heading.default"
            >
              <div className="elementor-widget-container">
                <span className="elementor-heading-title elementor-size-default">
                  {eyebrow}
                </span>
              </div>
            </div>
            <div
              className="elementor-element elementor-element-e5cafd1 elementor-invisible elementor-widget__width-initial elementor-widget-tablet__width-inherit animated-fast elementor-widget elementor-widget-heading"
              data-id="e5cafd1"
              data-element_type="widget"
              data-e-type="widget"
              data-settings={'{"_animation":"slideInUp","_animation_delay":100}'}
              data-widget_type="heading.default"
            >
              <div className="elementor-widget-container">
                <h2 className="elementor-heading-title elementor-size-default">
                  {heading}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="elementor-element elementor-element-0a5fdf3 e-flex e-con-boxed e-con e-parent vxn-svc-grid"
        data-id="0a5fdf3"
        data-element_type="container"
        data-e-type="container"
      >
        <div className="e-con-inner">
          <div className="vxn-svc-row">
            {items.map((industry) => (
              <div className="vxn-svc-card" key={industry.name}>
                <div className="vxn-svc-card__media">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={rimgFirst(region, industry.img)}
                    alt={industry.name}
                    loading="lazy"
                  />
                </div>
                <div className="vxn-svc-card__footer">
                  <h4 className="vxn-svc-card__title">{industry.name}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
