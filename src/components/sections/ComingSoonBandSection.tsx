/* Lightweight "Coming Soon" band rendered BELOW the image page-hero on sections
   not yet published — today, the UAE services pages.
   Uses page.hero_title (if set) as a small context eyebrow.

   The band's line is a <p>, not the <h1> it was ported as. It always sits under
   PageHeroSection, which already gives the page its <h1> — and that heading is
   the page's name, which is the one worth having. "Coming Soon" is its status.

   Port of includes/partials/coming-soon-band.php. */
import { rurl } from '@/lib/region';
import type { PageConfig } from '@/lib/page-config';

const CSS = `
/* UAE services house rule: 40px 0 on the section, gutter on the inner wrapper. */
.vxn-coming{background:#fff;text-align:center;padding:40px 0;}
.vxn-coming__inner{max-width:640px;margin:0 auto;padding:0 24px;}
.vxn-coming__eyebrow{font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:#9C00DD;font-weight:600;margin-bottom:18px;}
.vxn-coming .vxn-coming__title{font-weight:400!important;color:#0E355F!important;font-size:clamp(40px,6vw,72px);line-height:1.05;margin:0 0 18px;}
.vxn-coming__text{color:#5b6670;font-size:17px;line-height:1.7;margin:0 auto 32px;max-width:520px;}
/* Fills by wedge on hover — mechanism in valunxt-brand.css, this only names
   the colour it sweeps. */
.vxn-coming__cta{display:inline-block;padding:14px 30px;background:#0E355F;color:#fff!important;font-weight:600;font-size:12px;letter-spacing:.14em;text-transform:uppercase;text-decoration:none;border-radius:2px;--vxn-cta-sweep:#0053B7;}
@media(max-width:600px){.vxn-coming__inner{padding:0 20px;}}
`;

export default function ComingSoonBandSection({
  page,
  region,
}: {
  page: PageConfig;
  region: string;
}) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <section className="vxn-coming">
        <div className="vxn-coming__inner">
          {page.hero_title ? <div className="vxn-coming__eyebrow">{page.hero_title}</div> : null}
          <p className="vxn-coming__title">Coming Soon</p>
          <p className="vxn-coming__text">
            This section is on its way. We&#8217;re putting the finishing touches in place &#8212;
            please check back shortly.
          </p>
          <a className="vxn-coming__cta" href={rurl(region, '/contact/')}>
            Talk to us
          </a>
        </div>
      </section>
    </>
  );
}
