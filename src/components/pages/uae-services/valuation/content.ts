/**
 * What /en-ae/services/valuation-and-advisory/ says.
 *
 * Written for the service template on client instruction (20260910): the
 * Accounting & Tax page, section for section, with the words changed. The
 * copy draws on what the market already publishes for this practice — the
 * registry's line ("RICS-aligned property valuation and advisory for lenders,
 * funds, developers and private owners"), the shared template's intro, and
 * the five sub-services vxnServices('en-ae') lists — and states what the
 * practice does and who it is for. Nothing here is an outcome promise; see
 * ../template/types.ts for why.
 *
 * RICS-regulated property valuation runs through group firm Reliant Surveyors,
 * which is why that name appears where it does and nowhere it does not.
 *
 * SUB-SERVICE SLUGS resolve through vxnServices('en-ae'), so every slug below
 * exists in that registry and the strip cannot point at a 404.
 */
import type { ServiceTemplateContent } from '../template/types';

export const VALUATION_TEMPLATE: ServiceTemplateContent = {
  slug: 'valuation-and-advisory',
  crumb: 'Valuation',
  hero: {
    head: 'Valuation & Advisory in Dubai for Lenders, Investors and Owners',
    sub: 'Value the business. Value the assets. Document the method. Hold the number when it is questioned.',
    /* Reliant Surveyors is the group's valuation firm, so its photograph is
       the one that belongs on this banner. */
    image: ['services/valuation-hero.webp', 'new-folder/reliant-surveyors-1.webp'],
    alt: 'A meeting under the Reliant Surveyors sign',
  },
  intro: {
    head: 'One Valuation Partner from Instruction to Defence.',
    lede: 'RICS-compliant real estate valuation runs through group firm Reliant Surveyors, and the method behind every figure is documented rather than asserted — so a number holds up when it is questioned, not just when it is read.',
    proof: [
      { label: 'RICS-regulated', note: 'Property valuation through group firm Reliant Surveyors' },
      { label: 'Business and assets', note: 'Companies, plant, machinery and financial instruments' },
      { label: 'Method documented', note: 'Every assumption written down and sourced' },
      { label: 'Built for scrutiny', note: 'Banks, auditors, courts and investors' },
    ],
    chips: ['Method documented, not asserted', 'RICS standards through the group'],
    primary: { label: 'Book a Free Consultation', href: '/free-consultation/' },
    secondary: { label: 'Explore Our Services', href: '#at-services' },
    image: ['services/valuation-intro.webp', 'new-folder/reliant-surveyors-2.webp'],
  },
  strip: {
    kicker: 'Explore services',
    head: 'Find the valuation your decision needs',
    lede: 'Start with the number you need defended today — for a deal, a lender, an auditor or a dispute — and add advisory as the decision develops.',
    cta: 'Ready to get started?',
    subs: [
      {
        name: 'Business Valuation',
        slug: 'business-valuation',
        cardText: 'Enterprise and equity value for deals, disputes, succession and shareholder events.',
        figure: ['services/va-explore-business-valuation.webp', 'new-folder/services-1.webp'],
      },
      {
        name: 'Company Valuation',
        slug: 'company-valuation',
        cardText: 'Share and company valuations prepared to a standard a buyer, court or regulator can rely on.',
        figure: ['services/va-explore-company-valuation.webp', 'new-folder/who-we-are-1.webp'],
      },
      {
        name: 'Plant & Machinery Valuation',
        slug: 'plant-machinery-valuation',
        cardText: 'Industrial assets valued for lending, insurance, reporting and sale.',
        figure: ['services/va-explore-plant-machinery-valuation.webp', 'homepage/industry-3.webp'],
      },
      {
        name: 'Asset Valuation',
        slug: 'asset-valuation',
        cardText: 'Property and other fixed assets valued to RICS standards through Reliant Surveyors.',
        figure: ['services/va-explore-asset-valuation.webp', 'homepage/industry-2.webp'],
      },
      {
        name: 'Financial Valuation',
        slug: 'financial-valuation',
        cardText: 'Instruments, intangibles and purchase price allocations for financial reporting.',
        figure: ['services/va-explore-financial-valuation.webp', 'new-folder/insights-1.webp'],
      },
    ],
  },
  solution: {
    head: 'Find the Right Solution',
    tabs: [
      {
        tab: 'Businesses',
        intro:
          'A business is worth what a defended method says it is worth. Market, income and asset approaches are run and reconciled, and the reasoning travels with the number.',
        slugs: ['business-valuation', 'company-valuation'],
      },
      {
        tab: 'Assets',
        intro:
          'Lenders, insurers and auditors each ask a different question of the same asset. Plant, machinery and property are valued to the basis each of them needs.',
        slugs: ['plant-machinery-valuation', 'asset-valuation'],
      },
      {
        tab: 'Financial Reporting',
        intro:
          'IFRS puts fair value on the balance sheet and asks for the workings. Instruments, intangibles and acquisitions are valued to a standard an auditor can test.',
        slugs: ['financial-valuation'],
      },
    ],
    images: [['new-folder/who-we-are-3.webp'], ['homepage/industry-3.webp'], ['new-folder/services-2.webp']],
  },
  banner: {
    head: 'The Valuation Agenda from the ValuNxt Valuation & Advisory Team',
    body: 'Our valuation practice brings business, asset and financial valuation together under one team, with RICS-regulated property valuation in the group, so a lender, investor or owner in the UAE has one defended number rather than several unconnected opinions.',
    cta: { label: 'Learn more', href: '#at-services' },
    image: ['services/valuation-banner.webp', 'banners/uae-slider-4.webp'],
  },
  related: { head: 'Explore Related Services' },
  close: {
    head: 'Start with the number you need defended today.',
    lede: 'Whether you need a business valued for a transaction, plant and machinery valued for a lender, or a fair value that will satisfy an auditor, ValuNxt can help identify the right place to start.',
    primary: { label: 'Book a Free Valuation Consultation', href: '/free-consultation/' },
    image: ['services/valuation-talk.webp', 'new-folder/who-we-are-1.webp'],
  },
};
