/**
 * The UAE home page footer.
 *
 * A flat, single-panel footer on the brand blue — logo and practice links on
 * one row, a rule, then the positioning line beside the social row, and the
 * legal links and copyright below. Selected per page: /en-ae/ carries
 * `"footer": "uae"` in page-configs.json, so every other page (and the India
 * home) keeps footer 2094 untouched.
 *
 * The wrapper elements and ids are the ones PageShell's other footers use, so
 * the theme's layout rules and the back-to-top offset behave the same.
 *
 * The social accounts are still unpublished — footer 2094 records why the icons
 * were captured without hrefs — so they render here as unlinked marks rather
 * than pointing visitors at profiles that may not be the company's.
 *
 * Styles: assets/css/valunxt-landing.css (.vxn-foot).
 */
import { BASE, rurl } from '@/lib/region';
import { vxnEmail, vxnYear } from '@/lib/site-data';
import SocialIcons, { type SocialItem } from './SocialIcons';

const SOCIAL: readonly SocialItem[] = [
  { network: 'linkedin-in', repeater: 'elementor-repeater-item-01247a2' },
  { network: 'x-twitter', repeater: 'elementor-repeater-item-dd89806' },
  { network: 'youtube', repeater: 'elementor-repeater-item-5c328d0' },
  { network: 'instagram', repeater: 'elementor-repeater-item-inst0001' },
];

/** The practice row along the top, mirroring the header's Services set. */
const PRACTICES: readonly (readonly [string, string])[] = [
  ['/services/', 'Services'],
  ['/about/', 'About us'],
  ['/industries/', 'Industries'],
  ['/network/', 'Network'],
  ['/blogs/', 'Insights'],
];

const LEGAL: readonly (readonly [string, string])[] = [
  ['/terms-conditions/', 'Terms & conditions'],
  ['/privacy-policy/', 'Privacy policy'],
  ['/disclaimer/', 'Disclaimer'],
  ['/contact/', 'Contact us'],
];

export default function FooterUae({ region }: { region: string }) {
  return (
    <div data-wpr-lazyrender="1" className="footer-wrapper">
      <footer id="main-footer" className="main-footer">
        <footer className="vxn-foot" aria-label="Site footer">
          <div className="vxn-foot__inner">
            <div className="vxn-foot__top">
              <a className="vxn-foot__logo" href={rurl(region, '/')} aria-label="VALUNXT — home">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${BASE}/assets/content/uploads/logo/valunxt-white.svg`}
                  width={190}
                  height={38}
                  alt="VALUNXT"
                />
              </a>
              <nav className="vxn-foot__nav" aria-label="Practices">
                {PRACTICES.map(([href, label]) => (
                  <a key={href} href={rurl(region, href)}>
                    {label}
                  </a>
                ))}
              </nav>
            </div>

            <hr className="vxn-foot__rule" />

            <div className="vxn-foot__mid">
              <p className="vxn-foot__blurb">
                We are a senior team of accountants, tax advisers and valuers bringing accounting
                and tax, transactions, mortgages, valuation, research and technology together under
                one accountable partner, so every number you act on holds up to scrutiny.
              </p>
              <div className="vxn-foot__social">
                <SocialIcons items={SOCIAL} />
              </div>
            </div>

            <div className="vxn-foot__legal">
              {LEGAL.map(([href, label]) => (
                <a key={href} href={rurl(region, href)}>
                  {label}
                </a>
              ))}
              <a href={`mailto:${vxnEmail()}`}>{vxnEmail()}</a>
            </div>

            <p className="vxn-foot__copy">
              &copy; {vxnYear()} VALUNXT. All rights reserved.
            </p>
          </div>
        </footer>
      </footer>
    </div>
  );
}
