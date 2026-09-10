/**
 * The UAE service pages that have been written.
 *
 * ALL SIX SERVICES RENDER THE SAME TEMPLATE — ServiceTemplateBody, fed one
 * content module each — on client instruction (20260910): the Accounting & Tax
 * page, section for section, for the other five, with only the words changed.
 * Adding a service is a content module in this shape and one line below.
 *
 * ServicePageBody and UAE_SERVICE_CONTENT, the five-section template the five
 * used to render through, stay exported: the routes still fall back to them
 * for a slug with content but no body, and a seventh service written that
 * way would still work. Nothing under /services/ uses them today.
 *
 * A slug in UAE_SERVICE_BODIES wins over UAE_SERVICE_CONTENT; the routes check
 * this first. A written page is one worth indexing, so its PageConfig drops
 * the noindex the unwritten ones carry — see uaeServiceIsWritten.
 */
import type { ComponentType } from 'react';

import { UAE_SERVICE_CONTENT, type ServicePageContent } from './content';
import { templatedBody } from './template/ServiceTemplateBody';
import { ACCOUNTING_TAX_TEMPLATE } from './accounting-tax/content';
import { REAL_ESTATE_TEMPLATE } from './real-estate/content';
import { MORTGAGES_TEMPLATE } from './mortgages/content';
import { VALUATION_TEMPLATE } from './valuation/content';
import { RESEARCH_TEMPLATE } from './research/content';
import { TECHNOLOGY_TEMPLATE } from './technology/content';
import AccountingBookkeepingBody from './accounting-tax/bookkeeping/AccountingBookkeepingBody';

export { UAE_SERVICE_CONTENT };
export type { ServicePageContent };

/** The five-section content for a service slug, or undefined where none was written. */
export function uaeServiceContent(slug: string | undefined): ServicePageContent | undefined {
  return slug ? UAE_SERVICE_CONTENT[slug] : undefined;
}

/** Every service, on the template. Keys are vxnServices('en-ae') slugs. */
const UAE_SERVICE_BODIES: Record<string, ComponentType<{ region: string }>> = {
  'accounting-tax-services': templatedBody(ACCOUNTING_TAX_TEMPLATE),
  'real-estate-transactions': templatedBody(REAL_ESTATE_TEMPLATE),
  'mortgages-services': templatedBody(MORTGAGES_TEMPLATE),
  'valuation-and-advisory': templatedBody(VALUATION_TEMPLATE),
  'research-intelligence': templatedBody(RESEARCH_TEMPLATE),
  'technology-data-ai': templatedBody(TECHNOLOGY_TEMPLATE),
};

/** The body for a service slug, or undefined when it has none. */
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
