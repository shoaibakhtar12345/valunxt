/**
 * The UAE typography opt-in.
 *
 * One helper, so a page can never end up with half of it. It does two things
 * that only make sense together:
 *
 *   1. appends valunxt-uae-type.css to the page's `site_css`, which HeadAssets
 *      emits LAST — after the theme, Elementor, the brand sheet and any
 *      per-page sheet, which is what lets it win;
 *   2. adds `vxn-uae-type` to the body class, which is the hook every selector
 *      in that file is scoped to.
 *
 * Miss (1) and nothing loads. Miss (2) and it loads and matches nothing. Doing
 * both from one function is the point.
 *
 * SCOPE, and why it is not simply "every UAE page": it was asked for on the
 * market home page and the services section, so those are the four places that
 * call it. Widening it later is a call to this function from wherever else, not
 * a change here.
 *
 * The append order matters. `site_css` is emitted in array order, and this
 * sheet has to come after a page's own — /accounting-bookkeeping/ carries one,
 * and a family declared there would otherwise outlive this.
 */
import type { PageConfig } from './page-config';

/** Bump the query when the sheet changes; it is served with a long cache. */
export const UAE_TYPE_CSS = '/assets/css/valunxt-uae-type.css?v=4';

/** The class every selector in that stylesheet is scoped to. */
export const UAE_TYPE_CLASS = 'vxn-uae-type';

/**
 * The page with UAE typography applied, or the page untouched outside en-ae.
 *
 * Idempotent: calling it twice on one config is a no-op, so a route that
 * decorates a config the factory already decorated cannot double up the
 * stylesheet link or the class.
 */
export function withUaeType(page: PageConfig, region: string): PageConfig {
  if (region !== 'en-ae') return page;

  const sheets = page.site_css ?? [];
  const body = page.body ?? '';
  const hasSheet = sheets.includes(UAE_TYPE_CSS);
  const hasClass = body.split(/\s+/).includes(UAE_TYPE_CLASS);
  if (hasSheet && hasClass) return page;

  return {
    ...page,
    site_css: hasSheet ? sheets : [...sheets, UAE_TYPE_CSS],
    body: hasClass ? body : `${body} ${UAE_TYPE_CLASS}`.trim(),
  };
}
