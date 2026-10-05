'use client';

/**
 * The enquiry section, shared by the landing page and every service page:
 * one white panel carrying the headline and the direct lines on the left,
 * and the minimal form on the right.
 *
 * The left panel's backdrop is either one of the practice's live abstracts
 * (`variant`, the default, as the service pages use) or a photographic
 * abstract (`image`, which wins where both are given). The landing page
 * passes the glass-facade abstract in /real-estate/hero/.
 */
import { BRAND } from '../../data/site';
import { LEAD } from '../../data/landing';
import LeadForm, { type Interest } from './LeadForm';
import { useEnquiry } from './enquiry';
import LiveAbstract from './LiveAbstract';
import type { EstateVariant } from '../three/estateScenes';
import { IcArrowUp, IcChat, IcMail, IcPhone, SectionHead } from './shared';

export default function Enquire({
  title = LEAD.title,
  lede = LEAD.lede,
  interest,
  about,
  onClearAbout,
  variant = 'lattice',
  image,
  imageAlt = '',
}: {
  title?: string;
  lede?: string;
  interest?: Interest;
  about?: string;
  onClearAbout?: () => void;
  /** The live abstract behind the headline. Ignored when `image` is given. */
  variant?: EstateVariant;
  /** A photographic abstract to use instead of the live one. */
  image?: string;
  imageAlt?: string;
}) {
  const ctx = useEnquiry();
  const asking = about ?? ctx?.about;
  const clear = onClearAbout ?? ctx?.clear;
  const wa = BRAND.phoneHref.replace(/[^\d]/g, '');
  const lines = [
    { icon: <IcPhone />, label: 'Call the Dubai desk', value: BRAND.phone, href: BRAND.phoneHref },
    { icon: <IcChat />, label: 'WhatsApp', value: 'Message an advisor', href: `https://wa.me/${wa}`, external: true },
    { icon: <IcMail />, label: 'Email', value: BRAND.email, href: `mailto:${BRAND.email}` },
  ];

  return (
    <section className="re-l-sec re-l-enq" id="enquire">
      <div className="re-wrap">
        <div className="re-l-enq__panel" data-rv="up">
          <aside className="re-l-enq__side">
            {image ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img className="re-l-enq__abs" src={image} alt={imageAlt} aria-hidden={imageAlt ? undefined : 'true'} loading="lazy" />
            ) : (
              <LiveAbstract variant={variant} className="re-l-enq__live" />
            )}
            <div className="re-l-enq__copy">
              <SectionHead eyebrow={LEAD.eyebrow} title={title} lede={lede} light />
              <ul className="re-l-enq__lines">
                {lines.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} {...(l.external ? { target: '_blank', rel: 'noopener' } : {})}>
                      {l.icon}
                      <span>
                        <small>{l.label}</small>
                        {l.value}
                      </span>
                      <IcArrowUp />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
          <div className="re-l-enq__main">
            <p className="re-l-enq__kicker">Book a twenty-minute call</p>
            <LeadForm interest={interest} about={asking || undefined} onClearAbout={clear} />
          </div>
        </div>
      </div>
    </section>
  );
}
