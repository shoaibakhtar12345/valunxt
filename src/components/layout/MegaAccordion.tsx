'use client';

/**
 * The services index inside the mega-menu sheet, as an accordion.
 *
 * The UAE menu names six services and thirty pages beneath them. Listing all
 * thirty at once made the sheet 671px tall and turned a menu into a page, so
 * the children are folded away: six service rows, two columns of three, and a
 * disclosure that opens one service's pages at a time.
 *
 * NO BLURB ON THE ROW. There was one while the index ran a single column the
 * full width of the rail. At half that width a clamped sentence truncates
 * inside its first clause, where it says less than the name above it already
 * does — and costs 18px a row, six times over, on a sheet whose length was the
 * complaint. The sentence still leads the service's own page.
 *
 * ONE OPEN AT A TIME. The sheet hangs from the bar and is capped to the
 * viewport; letting all six open would put it back where it started. Opening a
 * service closes the one before it, so the sheet's height moves by one drawer
 * and never by six. The first service is open on arrival, so the panel never
 * reads as an empty list of headings.
 *
 * THE ROW IS TWO CONTROLS, NOT ONE. The name still links to the service's own
 * overview page — that link predates this and removing it would bury six pages
 * a level deeper — and the chevron beside it is a real <button> that toggles.
 * Making the whole row a toggle would have cost the link; making the whole row
 * a link would have cost the toggle.
 *
 * The animation is CSS (grid-template-rows 0fr -> 1fr, see valunxt-brand.css);
 * this component only owns which index is open.
 */

import { useId, useState } from 'react';
import Html from '@/components/Html';
import { MegaIcon } from './MegaIcons';

export interface MegaAccordionSub {
  /** Plain text — SubService.name is documented as such, so no <Html>. */
  t: string;
  /** Already region-prefixed by MegaMenu. */
  href: string;
}

export interface MegaAccordionGroup {
  /** May carry entities (`Research &amp; Intelligence`), so rendered via <Html>. */
  t: string;
  href: string;
  icon: string;
  subs: MegaAccordionSub[];
}

export default function MegaAccordion({
  groups,
  tabIndex,
}: {
  groups: MegaAccordionGroup[];
  /** -1 for the hidden mobile/sticky nav copies, matching every other link. */
  tabIndex?: number;
}) {
  /* Each header renders the nav two or four times over, so the ids that tie a
     button to the drawer it opens have to be unique per copy. useId() is the
     one generator that agrees between the server render and hydration. */
  const uid = useId();
  const [open, setOpen] = useState(0);
  const tab = tabIndex === -1 ? { tabIndex: -1 } : {};

  /* Two columns, split here rather than in CSS, because CSS cannot give them
     independent heights. `columns: 2` breaks an element across the gap, and a
     two-track grid shares its rows between the columns — open the drawer on
     the left and the row grows on both sides, stranding a hole of white under
     the service on the right. Two real columns, each its own flex stack, so a
     drawer only ever moves what is under it.

     Split at the half, so a seventh service lands at the foot of the left
     column and the eighth starts the right — the order still reads down then
     across, which is how the index read when it was one column. */
  const half = Math.ceil(groups.length / 2);
  const columns = [groups.slice(0, half), groups.slice(half)];

  return (
    <div className="vxn-mega__list vxn-mega__list--grouped">
      {columns.map((col, c) => (
        <div className="vxn-mega__groupcol" key={c}>
          {col.map((g, j) => {
            /* The index into `groups`, not into this column: one drawer is
               open across both columns, so the state cannot be per-column. */
            const i = c === 0 ? j : half + j;
            const isOpen = open === i;
            const panelId = `${uid}s${i}`;
            const titleId = `${uid}t${i}`;
            return (
              <div
                className={`vxn-mega__group${isOpen ? ' is-open' : ''}`}
                key={g.href + g.t}
              >
                <div className="vxn-mega__grouprow">
                  <a className="vxn-mega__grouphead" href={g.href} {...tab}>
                    <span className="vxn-mega__ico" aria-hidden="true">
                      <MegaIcon token={g.icon} />
                    </span>
                    <span className="vxn-mega__groupbody">
                      <Html as="span" className="vxn-mega__grouptitle" id={titleId} html={g.t} />
                    </span>
                  </a>
                  {g.subs.length ? (
                    <button
                      type="button"
                      className="vxn-mega__grouptoggle"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      /* Labelled by the service name rather than a written-out
                         "Show pages under …": the names carry entities, and
                         aria-expanded already says what the control does. */
                      aria-labelledby={titleId}
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      /* No `tab` here, unlike every link around it. The -1 the
                         hidden copies carry is a placeholder SmartMenus rewrites
                         to 0 when it initialises the burger drawer — and it only
                         walks anchors, so a <button> would keep the -1 and the
                         drawer's folds would be unreachable from the keyboard.
                         Nothing leaks by leaving it out: the drawer's <nav> is
                         `display: none` on the desktop bar, and inside the drawer
                         the panel is `display: none` until its parent item is
                         opened, so the button is unfocusable in both. */
                    >
                      <svg
                        viewBox="0 0 24 24"
                        width="16"
                        height="16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                        focusable="false"
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </button>
                  ) : null}
                </div>

                {/* Three elements, and each earns its place: __drawer is the grid
                    whose single row animates 0fr -> 1fr, __drawerclip is what
                    `overflow: hidden` cuts the list off against, and __subs
                    carries the padding. The clip has to sit between them because
                    padding on a zero-height box is still painted — put it on the
                    clipped element and the drawer never closes flush.

                    `inert` is what keeps a closed drawer's links out of the tab
                    order. Not `visibility: hidden`: the closed sheet above is held
                    out of the tab order by its own `visibility: hidden`, which
                    every descendant inherits, so a drawer declaring itself visible
                    would punch a hole through it and leave five links tabbable
                    with the menu shut. It reads off `isOpen` like the class does,
                    so there is still one source of truth for what is open. */}
                <div className="vxn-mega__drawer" id={panelId} inert={!isOpen}>
                  <div className="vxn-mega__drawerclip">
                    <div className="vxn-mega__subs">
                      {g.subs.map((s) => (
                        <a className="vxn-mega__sub" href={s.href} key={s.href} {...tab}>
                          {s.t}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
