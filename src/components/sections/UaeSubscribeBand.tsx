/**
 * The newsletter section on /en-ae/.
 *
 * Half brand gradient, half photograph, with a frosted bar overlapping the two
 * near the bottom — the label and the headline on the coloured half, the line
 * of copy and the email field on the bar.
 *
 * THE HEADLINE COPY IS THE SENTENCE THAT WAS ALREADY HERE, split across the
 * slots the layout gives it. It read as one paragraph — "Subscribe to Valunxt
 * Insights — our monthly look at the accounting, bookkeeping and reporting
 * issues facing UAE businesses." — and it is the same words now: the name is
 * the label, what the list covers is the headline, and the instruction is the
 * line on the bar.
 *
 * THE INLINE FIELD IS BACK, by request. This section had dropped it so the page
 * carried one lead route; it now takes an email again and the button submits
 * rather than linking to /contact/.
 *
 * THE FIELD LIVES IN UaeSubscribeForm, a client component, because it has to
 * post itself — see the note there for why leaning on Elementor's form handler
 * did not work. This file stays a server component so it can keep resolving its
 * photograph through rimgFirst(), which reads the filesystem.
 *
 * Styles: assets/css/valunxt-landing.css (.vxn-sub).
 */
import { rimgFirst } from '@/lib/region-assets';

import UaeSubscribeForm from './UaeSubscribeForm';

export default function UaeSubscribeBand({ region }: { region: string }) {
  return (
    <section className="vxn-sub" aria-labelledby="vxn-sub-title">
      <div className="vxn-sub__panel">
        <span className="vxn-sub__eyebrow">ValuNxt Insights</span>
        <h2 className="vxn-sub__head" id="vxn-sub-title">
          Our monthly look at the accounting, bookkeeping and reporting issues
          facing UAE businesses.
        </h2>
      </div>

      {/* Decorative: the headline beside it is what the section says. The
          purpose-shot filename comes first in the house convention, so dropping
          banners/uae-insights-subscribe.webp in replaces the stand-in with no
          change here. */}
      <div className="vxn-sub__shot" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="vxn-sub__ground"
          src={rimgFirst(region, [
            'banners/uae-insights-subscribe.webp',
            'new-folder/about-us-1.webp',
          ])}
          alt=""
          loading="lazy"
        />
      </div>

      {/* The bar sits ON the join, crossing from the gradient into the
          photograph — which is the whole reason the two halves meet at a hard
          edge rather than blending. */}
      <div className="vxn-sub__bar">
        <p className="vxn-sub__copy">Subscribe to ValuNxt Insights</p>

        <UaeSubscribeForm />
      </div>
    </section>
  );
}
