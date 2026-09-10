/**
 * What /en-ae/services/real-estate-transactions/ says.
 *
 * Written for the service template on client instruction (20260910): the
 * Accounting & Tax page, section for section, with the words changed. The
 * copy draws on what the market already publishes for this practice — the
 * registry's line ("Sourcing, acquisition and disposal across residential and
 * commercial property, with independent advice at every step"), the shared
 * template's intro, and the three sub-services vxnServices('en-ae') lists —
 * and states what the practice does and who it is for. Nothing here is an
 * outcome promise; see ../template/types.ts for why.
 *
 * SUB-SERVICE SLUGS resolve through vxnServices('en-ae'), so every slug below
 * exists in that registry and the strip cannot point at a 404.
 */
import type { ServiceTemplateContent } from '../template/types';

export const REAL_ESTATE_TEMPLATE: ServiceTemplateContent = {
  slug: 'real-estate-transactions',
  crumb: 'Real Estate',
  hero: {
    head: 'Real Estate Transactions in Dubai, Independently Advised',
    sub: 'Find the right property. Price it on evidence. Negotiate with one interest at the table. Complete with the paperwork in order.',
    /* building-real-esate is the plate the old template used for this
       practice's banner. Despite the name it is an adviser at a laptop, not a
       building; near square, so the band takes its middle. */
    image: ['services/real-estate-hero.webp', 'homepage/building-real-esate.webp'],
    alt: 'An adviser at a laptop in an office',
  },
  intro: {
    head: 'One Transaction Partner from Search to Handover.',
    lede: 'Sourcing, acquisition and disposal across residential and commercial property, with diligence, pricing and deal management handled by the same team that values the asset — in Dubai, Abu Dhabi and beyond.',
    proof: [
      { label: 'Independent advice', note: 'No inventory behind it and no listing to move' },
      { label: 'Dubai and Abu Dhabi', note: 'Residential and commercial, freehold and leasehold' },
      { label: 'Valuation in the group', note: 'RICS-regulated through Reliant Surveyors' },
      { label: 'One team, end to end', note: 'Sourcing, diligence, negotiation and completion' },
    ],
    chips: ['No inventory behind the advice', 'Buy-side and sell-side from one desk'],
    primary: { label: 'Book a Free Consultation', href: '/free-consultation/' },
    secondary: { label: 'Explore Our Services', href: '#at-services' },
    image: ['services/real-estate-intro.webp', 'homepage/industry-2.webp'],
  },
  strip: {
    kicker: 'Explore services',
    head: 'Find the right route into the market',
    lede: 'Start with the transaction in front of you — buying, selling, leasing or off-plan — and add advice as the deal develops.',
    cta: 'Ready to get started?',
    subs: [
      {
        name: 'Buy Property',
        slug: 'buy-property',
        cardText: 'Sourcing, diligence and negotiation for residential and commercial purchases across the UAE.',
        figure: ['services/re-explore-buy-property.webp', 'new-folder/who-we-are-2.webp'],
      },
      {
        name: 'Sell & Rent/Lease Property',
        slug: 'sell-rent-lease-property',
        cardText: 'Pricing, marketing and negotiation for owners selling or leasing, with the paperwork handled.',
        figure: ['services/re-explore-sell-rent-lease.webp', 'new-folder/client-success-1.webp'],
      },
      {
        name: 'Off Plan Properties',
        slug: 'off-plan-properties',
        cardText: 'Developer, payment plan and location assessed before a deposit is paid.',
        figure: ['services/re-explore-off-plan.webp', 'new-folder/services-1.webp'],
      },
    ],
  },
  solution: {
    head: 'Find the Right Solution',
    /* One item a tab: the practice publishes three pages and each answers a
       different question. The template renders what the arrays hold. */
    tabs: [
      {
        tab: 'Buying',
        intro:
          'Sourcing the right asset is where a transaction is won or lost. Diligence, pricing and negotiation run from one desk, with the valuation team in the group behind the number.',
        slugs: ['buy-property'],
      },
      {
        tab: 'Selling & Leasing',
        intro:
          'An owner needs a price the market will pay and a process that reaches the buyers and tenants who will pay it. Pricing, marketing and negotiation, with completion handled.',
        slugs: ['sell-rent-lease-property'],
      },
      {
        tab: 'Off-Plan',
        intro:
          'A deposit on a plan is a commitment to a developer, a payment schedule and a location that does not exist yet. Each is assessed before the money moves.',
        slugs: ['off-plan-properties'],
      },
    ],
    images: [['homepage/industry-2.webp'], ['new-folder/client-success-2.webp'], ['new-folder/who-we-are-3.webp']],
  },
  banner: {
    head: 'The Transaction Agenda from the ValuNxt Real Estate Team',
    body: 'Our real estate practice brings sourcing, diligence, pricing and negotiation together under one team, so a buyer, seller or investor in the UAE has one adviser through the whole transaction rather than a broker at each stage.',
    cta: { label: 'Learn more', href: '#at-services' },
    image: ['services/real-estate-banner.webp', 'banners/uae-slider-1.webp'],
  },
  related: { head: 'Explore Related Services' },
  close: {
    head: 'Start with the property decision in front of you today.',
    lede: 'Whether you are buying a first UAE home, selling or leasing an asset you own, or weighing an off-plan launch, ValuNxt can help identify the right place to start.',
    primary: { label: 'Book a Free Real Estate Consultation', href: '/free-consultation/' },
    image: ['services/real-estate-talk.webp', 'new-folder/client-1.webp'],
  },
};
