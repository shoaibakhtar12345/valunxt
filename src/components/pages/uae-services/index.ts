/**
 * The UAE service pages that have been written.
 *
 * ALL SIX SERVICES RENDER THE SAME TEMPLATE — ServiceTemplateBody, fed one
 * content module each — on client instruction (20260910): the Accounting & Tax
 * page, section for section, for the other five, with only the words changed.
 * Adding a service is a content module in this shape and one line below.
 *
 * ALL THIRTY-THREE SUB-SERVICES DO THE SAME on SubServiceTemplateBody — the
 * Accounting & Bookkeeping page, section for section — fed by one subs.ts per
 * service. Adding a sub-service is a SubSpec in the parent's module; the
 * registry below is built from the six modules in a loop and never has to be
 * touched.
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
import { templatedSubBody } from './template/SubServiceTemplateBody';
import { ACCOUNTING_TAX_TEMPLATE } from './accounting-tax/content';
import { ACCOUNTING_TAX_SUBS } from './accounting-tax/subs';
import { REAL_ESTATE_TEMPLATE } from './real-estate/content';
import { REAL_ESTATE_SUBS } from './real-estate/subs';
import { MORTGAGES_TEMPLATE } from './mortgages/content';
import { MORTGAGES_SUBS } from './mortgages/subs';
import { VALUATION_TEMPLATE } from './valuation/content';
import { VALUATION_SUBS } from './valuation/subs';
import { RESEARCH_TEMPLATE } from './research/content';
import { RESEARCH_SUBS } from './research/subs';
import { TECHNOLOGY_TEMPLATE } from './technology/content';
import { TECHNOLOGY_SUBS } from './technology/subs';

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
 * Every page BENEATH a service, keyed by `<service slug>/<sub slug>`.
 *
 * Keyed by the pair, not by the sub slug alone: two services may each end up
 * with an `accounting-bookkeeping`, and the parent is what tells them apart.
 * Every entry here loads the sub-service template's stylesheet — see
 * SUB_SITE_CSS in lib/uae-service-pages.ts, which applies it to all of them.
 */
const UAE_SUB_BODIES: Record<string, ComponentType<{ region: string }>> = Object.fromEntries(
  [ACCOUNTING_TAX_SUBS, REAL_ESTATE_SUBS, MORTGAGES_SUBS, VALUATION_SUBS, RESEARCH_SUBS, TECHNOLOGY_SUBS].flatMap(
    (set) => Object.values(set).map((c) => [`${c.service}/${c.slug}`, templatedSubBody(c)] as const),
  ),
);

/** The body for a sub-service, or undefined while it is unwritten. */
export function uaeSubServiceBody(
  service: string | undefined,
  sub: string | undefined,
): ComponentType<{ region: string }> | undefined {
  return service && sub ? UAE_SUB_BODIES[`${service}/${sub}`] : undefined;
}
