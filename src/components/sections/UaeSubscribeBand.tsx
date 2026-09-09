/**
 * The newsletter card on /en-ae/.
 *
 * No form here any more. The card states what the list is and sends people to
 * /contact/ to ask for it, so there is one lead route on this page rather than
 * an inline field that posts somewhere else. The Elementor form markup this
 * used to carry — the `.elementor-form` wrapper, the hidden post_id/form_id and
 * `form_fields[email]` — is gone with it; /form-handler/ is untouched and still
 * serves every other form on the site.
 *
 * Styles: assets/css/valunxt-landing.css (.vxn-sub).
 */
import { rurl } from '@/lib/region';
import { rimg } from '@/lib/region-assets';

export default function UaeSubscribeBand({ region }: { region: string }) {
  return (
    <section className="vxn-sub" aria-labelledby="vxn-sub-title">
      {/* The field the card sits on. It was a flat #071E3C; this is the same
          depth of navy carried by artwork instead, so the section reads as part
          of the same family as the card rather than as a plain dark gap. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="vxn-sub__ground"
        src={rimg(region, 'banners/breadcrumb-banner.png')}
        alt=""
        aria-hidden="true"
        loading="lazy"
      />

      <div className="vxn-sub__card">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="vxn-sub__texture"
          src={rimg(region, 'homepage/abstract-2.webp')}
          alt=""
          aria-hidden="true"
          loading="lazy"
        />

        <p id="vxn-sub-title" className="vxn-sub__copy">
          Subscribe to Valunxt Insights &mdash; our monthly look at the accounting, bookkeeping and
          reporting issues facing UAE businesses.
        </p>

        {/* Labelled rather than a bare arrow: the round button used to make
            sense beside an input, but on its own it would not say where it
            goes. */}
        <a className="vxn-sub__cta" href={rurl(region, '/contact/')}>
          <span className="vxn-sub__cta-label">Subscribe</span>
          <span className="vxn-sub__cta-go" aria-hidden="true">
            <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M4.5 11.5L11.5 4.5M11.5 4.5H5.5M11.5 4.5V10.5"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </a>
      </div>
    </section>
  );
}
