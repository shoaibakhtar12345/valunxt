/**
 * The mega-menu line icons and the ringed CTA arrow.
 *
 * Lifted out of MegaMenu.tsx so the client-side accordion (MegaAccordion.tsx)
 * can draw a service icon without importing MegaMenu — which imports the
 * region registry and the company list, neither of which has any business in
 * the browser bundle.
 *
 * Drawn here rather than pulled from the theme's icon font: the font ships a
 * marketing-brochure set, and the menu wants a single consistent 24px stroke
 * family. Tokens are named in vxnServices() (icon: 'ledger') so the registry
 * stays the one place a service is defined.
 *
 * Every glyph is a 24×24 currentColor stroke path, so the tile controls colour.
 */
const ICON_PATHS: Record<string, string> = {
  /* Accounting & tax — a ledger sheet with ruled lines. */
  ledger:
    '<path d="M6 3h9l5 5v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z"/><path d="M14 3v6h6"/><path d="M9 13h7M9 17h5"/>',
  /* Real estate — a tower block. */
  building:
    '<path d="M3 21h18"/><path d="M5 21V6a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v15"/><path d="M13 21V11a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v10"/><path d="M8 9h2M8 13h2M8 17h2M16 14h1M16 18h1"/>',
  /* Mortgages — a key. */
  key: '<circle cx="8" cy="15" r="4"/><path d="M10.9 12.1 20 3"/><path d="m17 6 2.5 2.5M15 8l2 2"/>',
  /* Valuation — balance scales. */
  scales:
    '<path d="M12 4v17M8 21h8M5 7h14"/><path d="m5 7-3 6a3 3 0 0 0 6 0Z"/><path d="m19 7-3 6a3 3 0 0 0 6 0Z"/><circle cx="12" cy="4" r="1.4"/>',
  /* Research — a trend line over a chart frame. */
  chart:
    '<path d="M4 4v15a1 1 0 0 0 1 1h15"/><path d="m7 15 3.5-4 3 2.5L20 7"/><path d="M20 7h-3.5M20 7v3.5"/>',
  /* Technology & AI — a processor die. */
  chip: '<rect x="7" y="7" width="10" height="10" rx="2"/><path d="M10 10h4v4h-4z"/><path d="M10 3v4M14 3v4M10 17v4M14 17v4M3 10h4M3 14h4M17 10h4M17 14h4"/>',
  /* Capital advisory — two hands meeting. */
  handshake:
    '<path d="m11 17 2 2a1.4 1.4 0 0 0 2 0 1.4 1.4 0 0 0 0-2"/><path d="m15 17 1.5 1.5a1.4 1.4 0 0 0 2-2L13 11"/><path d="M2 9h3l4-4 4 4h3"/><path d="M22 9h-3l-4 4-2-2"/><path d="M2 9v6h2M22 9v6h-2"/>',
  /* Reports — a bound document. */
  document:
    '<path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z"/><path d="M14 3v5h5"/><path d="M9 12h7M9 16h7"/>',
  /* Community — a small group. */
  users:
    '<circle cx="9" cy="8" r="3.2"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 5.4a3.2 3.2 0 0 1 0 5.2"/><path d="M18 14.2A6.5 6.5 0 0 1 21.5 20"/>',
  /* Partnership / network — a connected globe. */
  globe:
    '<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18Z"/>',
  /* Insight / commentary — a nib. */
  pen: '<path d="M4 20h4L20 8a2.5 2.5 0 0 0-3.5-3.5L4 16.5V20Z"/><path d="m15 6 3.5 3.5"/><path d="M4 16.5 7.5 20"/>',
  /* Clients — a shield, i.e. work held in confidence. */
  shield: '<path d="M12 3 5 6v5.5c0 4.3 2.9 8.1 7 9.5 4.1-1.4 7-5.2 7-9.5V6l-7-3Z"/><path d="m9 12 2 2 4-4"/>',
};

export function MegaIcon({ token }: { token?: string }) {
  const d = ICON_PATHS[token ?? ''] ?? ICON_PATHS.document;
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      dangerouslySetInnerHTML={{ __html: d }}
    />
  );
}

/** The ringed arrow that ends every CTA on the sheet — the "view all" link and
    each card. Drawn rather than typed so the ring is a true circle at any size. */
export function MegaArrow() {
  return (
    <span className="vxn-mega__circ" aria-hidden="true">
      <svg
        viewBox="0 0 24 24"
        width="16"
        height="16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        focusable="false"
      >
        <path d="M4 12h15" />
        <path d="m13 6 6 6-6 6" />
      </svg>
    </span>
  );
}
