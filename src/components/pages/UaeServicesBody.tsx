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
 * The service pages themselves are not written yet; the sub-service links are
 * here because a page nobody can reach is a page nobody can review.
 */
import { rurl, vxnServiceName, vxnServices } from '@/lib/region';
import { MegaIcon } from '@/components/layout/MegaIcons';
import Html from '@/components/Html';
import type { PageConfig } from '@/lib/page-config';

const CSS = `
/* UAE services house rule: 40px 0 on the section, gutter on the inner wrapper. */
.vxn-uaesvc{background:#fff;padding:40px 0;}
.vxn-uaesvc__inner{max-width:1240px;margin:0 auto;padding:0 24px;}
.vxn-uaesvc__intro{max-width:720px;margin:0 0 56px;}
.vxn-uaesvc__kicker{display:block;font-family:"DM Sans",sans-serif;font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:#9C00DD;font-weight:600;margin-bottom:14px;}
/* !important: the Elementor kit styles bare h2/h3/p at a specificity these
   classes cannot reach, and would otherwise repaint them DM Sans black. */
.vxn-uaesvc__head{font-family:"Forum",serif!important;font-weight:400!important;color:#0E355F!important;font-size:clamp(32px,4.4vw,52px)!important;line-height:1.1!important;margin:0 0 16px!important;}
.vxn-uaesvc__lede{font-family:"DM Sans",sans-serif!important;color:#5b6670!important;font-size:17px!important;line-height:1.7!important;margin:0!important;}
.vxn-uaesvc__grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;}
.vxn-uaesvc__card{display:flex;flex-direction:column;border:1px solid #e6eaee;border-radius:4px;padding:30px 28px 26px;background:#fff;transition:border-color .3s ease,box-shadow .3s ease,transform .3s ease;}
.vxn-uaesvc__card:hover{border-color:#cfd9e4;box-shadow:0 14px 40px rgba(11,26,38,.08);transform:translateY(-3px);}
.vxn-uaesvc__ico{display:inline-flex;align-items:center;justify-content:center;width:46px;height:46px;border-radius:50%;background:rgba(0,83,183,.08);color:#0053B7;margin-bottom:18px;}
.vxn-uaesvc__name{font-family:"Forum",serif!important;font-weight:400!important;color:#0E355F!important;font-size:23px!important;line-height:1.25!important;margin:0 0 10px!important;}
.vxn-uaesvc__name a{color:inherit;text-decoration:none;}
.vxn-uaesvc__name a:hover{color:#0053B7;}
.vxn-uaesvc__desc{font-family:"DM Sans",sans-serif!important;color:#5b6670!important;font-size:14.5px!important;line-height:1.65!important;margin:0 0 18px!important;}
.vxn-uaesvc__subs{list-style:none;margin:0 0 20px;padding:0;border-top:1px solid #eef1f4;}
.vxn-uaesvc__subs li{border-bottom:1px solid #eef1f4;}
.vxn-uaesvc__subs a{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:9px 0;font-family:"DM Sans",sans-serif;font-size:14px;color:#0E355F;text-decoration:none;transition:color .2s ease,padding-left .2s ease;}
.vxn-uaesvc__subs a:hover{color:#0053B7;padding-left:4px;}
.vxn-uaesvc__subs i{font-style:normal;color:#9aa7b4;}
.vxn-uaesvc__more{margin-top:auto;display:inline-flex;align-items:center;gap:9px;font-family:"DM Sans",sans-serif;font-weight:600;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#0053B7;text-decoration:none;}
.vxn-uaesvc__more:hover{color:#9C00DD;}
@media(max-width:1024px){.vxn-uaesvc__grid{grid-template-columns:repeat(2,1fr);}}
@media(max-width:680px){.vxn-uaesvc__inner{padding:0 20px;}.vxn-uaesvc__grid{grid-template-columns:1fr;}}
`;

export default function UaeServicesBody({
  page,
  region,
}: {
  page: PageConfig;
  region: string;
}) {
  const services = vxnServices(region);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <section className="vxn-uaesvc" aria-labelledby="vxn-uaesvc-head">
        <div className="vxn-uaesvc__inner">
          <div className="vxn-uaesvc__intro">
            <span className="vxn-uaesvc__kicker">What we do</span>
            <h2 className="vxn-uaesvc__head" id="vxn-uaesvc-head">
              Advisory Services in the UAE
            </h2>
            <p className="vxn-uaesvc__lede">
              Accounting, transactions, funding, valuation, research and technology &#8212; every
              discipline under one roof, so a decision is advised, financed and executed by the
              same team.
            </p>
          </div>

          <div className="vxn-uaesvc__grid">
            {services.map((s) => {
              const href = rurl(region, s.href);
              return (
                <article className="vxn-uaesvc__card" key={s.slug ?? s.href}>
                  <span className="vxn-uaesvc__ico" aria-hidden="true">
                    <MegaIcon token={s.icon} />
                  </span>
                  <h3 className="vxn-uaesvc__name">
                    <a href={href}>{vxnServiceName(s)}</a>
                  </h3>
                  <Html as="p" className="vxn-uaesvc__desc" html={s.desc} />

                  {s.subs?.length ? (
                    <ul className="vxn-uaesvc__subs">
                      {s.subs.map((sub) => (
                        <li key={sub.slug}>
                          <a href={rurl(region, `${s.href}${sub.slug}/`)}>
                            {sub.name}
                            <i aria-hidden="true">&rsaquo;</i>
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  <a className="vxn-uaesvc__more" href={href}>
                    Explore {vxnServiceName(s)}
                  </a>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
