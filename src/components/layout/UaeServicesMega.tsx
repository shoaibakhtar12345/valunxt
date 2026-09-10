'use client';

/**
 * The UAE Services mega menu.
 *
 * Built to a supplied reference (the KPMG services panel): a blue introduction
 * column on the left, a tabbed pane on the right, and a grey footer band under
 * both, closed by a coloured rule.
 *
 *   ┌───────────────┬──────────────────────────────────────────────┐
 *   │               │  [tab] [tab] [tab] [tab]                 (x) │
 *   │   Services    ├──────────────────────────────────────────────┤
 *   │   lede…       │   link ›      link ›      link ›             │
 *   │               │   link ›      link ›      link ›             │
 *   │   Learn More ›│   View all … ›                               │
 *   ├───────────────┴──────────────────────────────────────────────┤
 *   │  ┌────────────────────────────────┐   OUR NETWORK            │
 *   │  │ Services to meet your goals    │   copy…                  │
 *   │  │ link ›  link ›  link ›         │   View all ›             │
 *   │  └────────────────────────────────┘                          │
 *   ├──────────────────────────────────────────────────────────────┤
 *   └──────────────────────────── accent rule ─────────────────────┘
 *
 * ---------------------------------------------------------------------------
 * WHY THIS IS A CLIENT COMPONENT, when the existing MegaMenu is not
 *
 * The other panels are pure CSS — `li:hover > .panel`. This one has two pieces
 * of state that hover cannot express: which tab is selected, and the close
 * button the reference puts in the tab row. So the panel still OPENS on hover
 * (consistent with the rest of the bar, and it still works before hydration
 * because the CSS does that part), and React only owns the tab and the dismiss.
 *
 * `dismissed` clears on pointer leave. Without that, closing the panel once
 * would leave it shut for the rest of the page — the pointer is still inside
 * the item that opens it, so no hover event would ever re-fire.
 *
 * ---------------------------------------------------------------------------
 * THE TABS ARE THE SERVICES, and the links under them are that service's own
 * children — both read from vxnServices('en-ae'), the same registry the routes
 * and the footer read. Nothing here is a second copy of the menu.
 */

import { useEffect, useId, useRef, useState } from 'react';

import { rurl, vxnServiceName, vxnServices, type Service } from '@/lib/region';

function Chev() {
  return (
    <svg className="vxn-umega__chev" viewBox="0 0 12 12" fill="none" aria-hidden="true" focusable="false">
      <path d="m4 2 4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Short labels for the tab row.
 *
 * The reference fits four tabs on one line and that is what makes the row read
 * as a row. There are six services here, and their registry names run to
 * "Accounting and Tax Services" — six of those need ~1060px against a pane
 * about 833px wide, so the row would wrap to two lines and stop looking like
 * the reference at all.
 *
 * The full name is still on the tab's own page and in the "View all …" link
 * under the grid, so nothing is lost by shortening the tab itself. A slug with
 * no entry falls back to its registry name.
 */
const TAB_LABEL: Record<string, string> = {
  'accounting-tax-services': 'Accounting & Tax',
  'real-estate-transactions': 'Real Estate',
  'mortgages-services': 'Mortgages',
  'valuation-and-advisory': 'Valuation',
  'research-intelligence': 'Research',
  'technology-data-ai': 'Technology & AI',
};

/**
 * The footer band's link set — the rest of the site, not more services.
 *
 * The reference fills this row with cross-cutting "business goals"; the
 * equivalent here is the sections a visitor looking at services is most likely
 * to want next, which is why it is a fixed list rather than derived.
 */
const GOALS: { label: string; href: string }[] = [
  { label: 'Industries', href: '/industries/' },
  { label: 'Track Record', href: '/track-record/' },
  { label: 'Research', href: '/research/' },
  { label: 'Clients', href: '/clients/' },
  { label: 'Partnership', href: '/partnership/' },
  { label: 'Community', href: '/community/' },
  { label: 'Our Group', href: '/our-group/' },
  { label: 'Free Consultation', href: '/free-consultation/' },
  { label: 'Contact', href: '/contact/' },
];

export default function UaeServicesMega({
  region,
  tabIndex,
}: {
  region: string;
  /** -1 for the hidden burger-drawer copy of the bar. */
  tabIndex?: number;
}) {
  const services = vxnServices(region).filter((s) => (s.subs?.length ?? 0) > 0);
  const [active, setActive] = useState(0);
  const [dismissed, setDismissed] = useState(false);
  const uid = useId().replace(/:/g, '');
  const itemRef = useRef<HTMLLIElement>(null);

  /* Escape closes it from anywhere inside, which is the one thing a hover menu
     otherwise gives a keyboard user no way to do. */
  useEffect(() => {
    if (dismissed) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (!itemRef.current?.contains(document.activeElement)) return;
      setDismissed(true);
      itemRef.current?.querySelector<HTMLAnchorElement>('.elementor-item')?.focus();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [dismissed]);

  const tab = tabIndex === -1 ? { tabIndex: -1 } : {};
  const current: Service | undefined = services[active];

  return (
    <li
      ref={itemRef}
      className={`menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children vxn-umega${
        dismissed ? ' is-dismissed' : ''
      }`}
      onMouseLeave={() => setDismissed(false)}
    >
      <a href={rurl(region, '/services/')} className="elementor-item" {...tab}>
        Services
      </a>

      <div className="vxn-umega__panel">
        <div className="vxn-umega__inner">
          <div className="vxn-umega__body">
            {/* The blue column. A heading, a sentence and one link out — the
                reference gives it no navigation of its own. */}
            <aside className="vxn-umega__aside">
              <span className="vxn-umega__asidetitle">Services</span>
              <p className="vxn-umega__asidelede">
                VALUNXT brings accounting, tax, valuation, real estate and technology under one
                accountable partner — so every number you act on holds up to scrutiny.
              </p>
              <a className="vxn-umega__asidelink" href={rurl(region, '/services/')} {...tab}>
                Learn More
                <Chev />
              </a>
            </aside>

            <div className="vxn-umega__main">
              <div className="vxn-umega__tabs" role="tablist" aria-label="Service areas">
                {services.map((s, i) => (
                  <button
                    key={s.slug}
                    type="button"
                    role="tab"
                    id={`${uid}-tab-${i}`}
                    aria-selected={i === active}
                    aria-controls={`${uid}-pane`}
                    className={`vxn-umega__tab${i === active ? ' is-active' : ''}`}
                    /* Hover selects as well as click: the panel is reached by
                       pointer, and making the reader click to preview a tab
                       they are already hovering is a step for nothing. */
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    tabIndex={tabIndex === -1 ? -1 : undefined}
                  >
                    {TAB_LABEL[s.slug ?? ''] ?? vxnServiceName(s)}
                  </button>
                ))}

                <button
                  type="button"
                  className="vxn-umega__close"
                  aria-label="Close the services menu"
                  onClick={() => setDismissed(true)}
                  tabIndex={tabIndex === -1 ? -1 : undefined}
                >
                  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
                    <path d="m3 3 10 10M13 3 3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              <div className="vxn-umega__pane" id={`${uid}-pane`} role="tabpanel" aria-labelledby={`${uid}-tab-${active}`}>
                <ul className="vxn-umega__grid">
                  {(current?.subs ?? []).map((sub) => (
                    <li key={sub.slug}>
                      <a
                        href={rurl(region, `/services/${current!.slug}/${sub.slug}/`)}
                        className="vxn-umega__link"
                        {...tab}
                      >
                        {sub.name}
                        <Chev />
                      </a>
                    </li>
                  ))}
                </ul>

                {current ? (
                  <a
                    className="vxn-umega__viewall"
                    href={rurl(region, `/services/${current.slug}/`)}
                    {...tab}
                  >
                    View all {vxnServiceName(current)}
                    <Chev />
                  </a>
                ) : null}
              </div>
            </div>
          </div>

          <div className="vxn-umega__foot">
            <div className="vxn-umega__goals">
              <h3 className="vxn-umega__goalshead">Explore the rest of VALUNXT</h3>
              <ul className="vxn-umega__goalgrid">
                {GOALS.map((g) => (
                  <li key={g.href}>
                    <a href={rurl(region, g.href)} className="vxn-umega__link" {...tab}>
                      {g.label}
                      <Chev />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="vxn-umega__side">
              <span className="vxn-umega__eyebrow">The Reliant Surveyors Group</span>
              <p className="vxn-umega__sidecopy">
                VALUNXT is part of a senior team of accountants, tax advisers and valuers working
                across Dubai, Noida and Mumbai.
              </p>
              <a className="vxn-umega__sidelink" href={rurl(region, '/network/')} {...tab}>
                View the network
                <Chev />
              </a>
            </div>
          </div>

          <span className="vxn-umega__rule" aria-hidden="true" />
        </div>
      </div>
    </li>
  );
}
