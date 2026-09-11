'use client';

/**
 * The UAE Services mega menu.
 *
 * Built to a supplied reference (the KPMG services panel): a blue introduction
 * column on the left and a tabbed pane on the right, closed by a coloured rule.
 *
 *   ┌───────────────┬──────────────────────────────────────────────┐
 *   │               │  [tab] [tab] [tab] [tab]                 (x) │
 *   │   Services    ├──────────────────────────────────────────────┤
 *   │   lede…       │   link ›      link ›      link ›             │
 *   │               │   link ›      link ›      link ›             │
 *   │               │                                              │
 *   │   Learn More ›│   View all … ›                               │
 *   └──────────────────────────── accent rule ─────────────────────┘
 *
 * The reference also hangs a grey footer band under both columns. It was built
 * here — "Explore the rest of VALUNXT" and a card for the group — and removed on
 * client feedback, with the sheet given more height in its place.
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
 * `dismissed` clears on pointer leave AND on re-entering the trigger. Without
 * either, closing the panel once would leave it shut for the rest of the page —
 * the pointer is still inside the item that opens it, so no hover event would
 * ever re-fire. Leave alone is not enough, and the second one is the fix for
 * the reported "close doesn't work": see the note on the handler below.
 *
 * ---------------------------------------------------------------------------
 * THE TABS ARE THE SERVICES, and the links under them are that service's own
 * children — both read from vxnServices('en-ae'), the same registry the routes
 * and the footer read. Nothing here is a second copy of the menu.
 *
 * Each tab is also a LINK to its service's page, on client request. Hovering or
 * focusing a tab still swaps the pane, so the pointer previews a service and a
 * click commits to it. A tap is the one gesture where those two cannot share an
 * event — see the note on the tab row.
 */

import { useEffect, useRef, useState } from 'react';

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
  const itemRef = useRef<HTMLLIElement>(null);
  /* The tab a touch went down on, and whether its pane was already showing at
     that moment. See the note on the tab row. */
  const tap = useRef<{ index: number; shown: boolean } | null>(null);

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
      {/* ---- WHY THE RE-ARM IS ON THE TRIGGER AND NOT ONLY ON LEAVE --------
          `onMouseLeave` on the <li> was the only thing clearing `dismissed`,
          and it has a hole that is easy to fall into rather than a rare race.

          The panel is a DOM child of this <li>, so while the pointer is over
          the sheet the <li> is still hovered and `mouseleave` has not fired.
          Press ✕ and the sheet stops taking pointer events — but the browser
          does not re-run hit testing until the pointer next MOVES, and if that
          move lands straight on this link (a flick back up to "Services",
          which is exactly what someone does next) the browser fires one
          mouseout whose relatedTarget is this anchor. That is still inside the
          <li>, so React correctly does NOT fire onMouseLeave, `dismissed`
          stays set, and the menu is hovered but refuses to open. It looks
          precisely like a broken close button.

          Clearing on entry to the trigger closes that hole: whatever route the
          pointer took, arriving at "Services" re-arms the menu. The leave
          handler stays as the case where the pointer wanders off elsewhere. */}
      <a
        href={rurl(region, '/services/')}
        className="elementor-item"
        onMouseEnter={() => setDismissed(false)}
        {...tab}
      >
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
                accountable partner, so every number you act on holds up to scrutiny.
              </p>
              <a className="vxn-umega__asidelink" href={rurl(region, '/services/')} {...tab}>
                Learn More
                <Chev />
              </a>
            </aside>

            <div className="vxn-umega__main">
              {/* ---- A TAP IS NOT A HOVER -----------------------------------
                  With a mouse, hovering a tab has selected it long before the
                  click lands, so the click simply follows the link. A touch has
                  no hover in front of it: the tap would navigate before the
                  pane was ever seen — and in the burger drawer, which renders
                  this panel inline and has nothing else to switch the pane
                  with, only the first service's pages could be reached at all.

                  So a tap on a tab whose pane is not showing opens that pane
                  and goes no further, and a second tap follows the link.

                  The check reads a snapshot taken at pointerdown, not `active`
                  at click time. A tap's emulated mouseenter and its focus both
                  select the tab before the click is dispatched, so read at
                  click time every tab would already look shown. `e.detail` is
                  0 for a keyboard activation, which focus has already
                  previewed, so Enter always follows the link. */}
              <div className="vxn-umega__tabs">
                {services.map((s, i) => (
                  <a
                    key={s.slug}
                    href={rurl(region, s.href)}
                    className={`vxn-umega__tab${i === active ? ' is-active' : ''}`}
                    onPointerDown={(e) => {
                      tap.current = e.pointerType === 'mouse' ? null : { index: i, shown: i === active };
                    }}
                    onPointerCancel={() => {
                      tap.current = null;
                    }}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={(e) => {
                      const t = tap.current;
                      tap.current = null;
                      if (t && t.index === i && !t.shown && e.detail !== 0) {
                        e.preventDefault();
                        setActive(i);
                      }
                    }}
                    {...tab}
                  >
                    {TAB_LABEL[s.slug ?? ''] ?? vxnServiceName(s)}
                  </a>
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

              <div
                className="vxn-umega__pane"
                role="group"
                aria-label={current ? vxnServiceName(current) : undefined}
              >
                {/* NOT A <ul> — see THE GRID IS NOT A <ul> in the stylesheet.
                    As one it crashed Elementor's SmartMenus on every UAE page
                    and cut the nav widget's init short. role="list" keeps what
                    the <ul> said. */}
                <div className="vxn-umega__grid" role="list">
                  {(current?.subs ?? []).map((sub) => (
                    <div key={sub.slug} role="listitem">
                      <a
                        href={rurl(region, `/services/${current!.slug}/${sub.slug}/`)}
                        className="vxn-umega__link"
                        {...tab}
                      >
                        {sub.name}
                        <Chev />
                      </a>
                    </div>
                  ))}
                </div>

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

          <span className="vxn-umega__rule" aria-hidden="true" />
        </div>
      </div>
    </li>
  );
}
