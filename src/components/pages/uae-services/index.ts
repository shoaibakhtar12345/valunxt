/**
 * The UAE service pages that have been written.
 *
 * Every service under /en-ae/services/ renders the shared coming-soon body until
 * its page exists. A slug present in UAE_SERVICE_CONTENT has a page: the route
 * renders ServicePageBody with that content, and — because a written page is one
 * worth indexing — its PageConfig drops the noindex the unwritten ones carry.
 *
 * Adding a page is one entry in content.ts. Nothing here changes.
 */
import type { ComponentType } from 'react';

import { UAE_SERVICE_CONTENT, type ServicePageContent } from './content';
import AccountingTaxBody from './accounting-tax/AccountingTaxBody';
import AccountingBookkeepingBody from './accounting-tax/bookkeeping/AccountingBookkeepingBody';

export { UAE_SERVICE_CONTENT };
export type { ServicePageContent };

/** The content for a service slug, or undefined while the page is unwritten. */
export function uaeServiceContent(slug: string | undefined): ServicePageContent | undefined {
  return slug ? UAE_SERVICE_CONTENT[slug] : undefined;
}

/**
 * Services whose page is written as its own component rather than through the
 * shared template.
 *
 * A service earns an entry here when the client supplies a page the five-section
 * template cannot express — Accounting & Tax is a fifteen-section commercial
 * page with two data tables, a pricing rail and twelve FAQs. The alternative was
 * to widen ServicePageContent until it could hold all of that, which would leave
 * the other five services carrying a dozen fields they never set.
 *
 * A slug here wins over UAE_SERVICE_CONTENT; the route checks this first.
 */
const UAE_SERVICE_BODIES: Record<string, ComponentType<{ region: string }>> = {
  'accounting-tax-services': AccountingTaxBody,
};

/** The bespoke body for a service slug, or undefined when it uses the template. */
export function uaeServiceBody(
  slug: string | undefined,
): ComponentType<{ region: string }> | undefined {
  return slug ? UAE_SERVICE_BODIES[slug] : undefined;
}

/** True when the slug has a written page at all, by either route. */
export function uaeServiceIsWritten(slug: string | undefined): boolean {
  return !!uaeServiceBody(slug) || !!uaeServiceContent(slug);
}

/**
 * Pages BENEATH a service that have been written, keyed by
 * `<service slug>/<sub slug>`.
 *
 * The twenty-nine sub-services share the coming-soon body until one of them is
 * designed. There is no template equivalent here — a sub-page is written as its
 * own component or it is not written at all — so unlike the services above this
 * is the only registry, and a page that appears in it must also appear in
 * SUB_SITE_CSS in lib/uae-service-pages.ts if it carries a stylesheet.
 *
 * Keyed by the pair, not by the sub slug alone: two services may each end up
 * with an `accounting-bookkeeping`, and the parent is what tells them apart.
 */
const UAE_SUB_BODIES: Record<string, ComponentType<{ region: string }>> = {
  'accounting-tax-services/accounting-bookkeeping': AccountingBookkeepingBody,
};

/** The bespoke body for a sub-service, or undefined while it is unwritten. */
export function uaeSubServiceBody(
  service: string | undefined,
  sub: string | undefined,
): ComponentType<{ region: string }> | undefined {
  return service && sub ? UAE_SUB_BODIES[`${service}/${sub}`] : undefined;
}
