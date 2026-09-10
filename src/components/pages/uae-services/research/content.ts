/**
 * What /en-ae/services/research-intelligence/ says.
 *
 * Written for the service template on client instruction (20260910): the
 * Accounting & Tax page, section for section, with the words changed. The
 * copy draws on what the market already publishes for this practice — the
 * registry's line ("Independent, data-driven research and valuation
 * intelligence for clearer, more confident investment decisions"), the shared
 * template's intro, and the six sub-services vxnServices('en-ae') lists — and
 * states what the practice does and who it is for. Nothing here is an outcome
 * promise; see ../template/types.ts for why.
 *
 * This slug is the one both markets use; the UAE branch of the static route
 * at app/[region]/services/research-intelligence/ is what renders this.
 *
 * SUB-SERVICE SLUGS resolve through vxnServices('en-ae'), so every slug below
 * exists in that registry and the strip cannot point at a 404.
 */
import type { ServiceTemplateContent } from '../template/types';

export const RESEARCH_TEMPLATE: ServiceTemplateContent = {
  slug: 'research-intelligence',
  crumb: 'Research',
  hero: {
    head: 'Research & Intelligence in Dubai for Investors, Developers and Occupiers',
    sub: 'Understand the market. Test the investment. Quantify the evidence. Decide before the capital is committed.',
    image: ['services/research-hero.webp', 'homepage/research-and-intellegance.webp'],
    alt: 'A research team reviewing figures on a laptop',
  },
  intro: {
    head: 'One Research Partner from Question to Decision.',
    lede: 'Supply, demand and pricing evidence for UAE property decisions — gathered, tested and quantified, so what a site should become is a question with a defended answer rather than an opinion.',
    proof: [
      { label: 'Evidence first', note: 'Gathered and tested before the recommendation' },
      { label: 'UAE markets', note: 'Residential, commercial, hospitality and industrial' },
      { label: 'Bankable studies', note: 'Feasibility written for lenders and boards' },
      { label: 'Valuation alongside', note: 'Numbers checked by the group’s valuers' },
    ],
    chips: ['Feasibility before the commitment', 'Evidence a lender can read'],
    primary: { label: 'Book a Free Consultation', href: '/free-consultation/' },
    secondary: { label: 'Explore Our Services', href: '#at-services' },
    image: ['services/research-intro.webp', 'new-folder/research-intelligence-1.webp'],
  },
  strip: {
    kicker: 'Explore services',
    head: 'Find the evidence your decision needs',
    lede: 'Start with the question in front of you — what the market will bear, what a site should become, whether an investment holds — and add research as the decision develops.',
    cta: 'Ready to get started?',
    subs: [
      {
        name: 'Real Estate Research',
        slug: 'real-estate-research',
        cardText: 'Supply, demand, absorption and pricing evidence across UAE residential and commercial markets.',
        figure: ['services/ri-explore-real-estate-research.webp', 'new-folder/research-intelligence-2.webp'],
      },
      {
        name: 'Market Research',
        slug: 'market-research',
        cardText: 'Sector and location studies that size a market and describe who is buying, renting and paying what.',
        figure: ['services/ri-explore-market-research.webp', 'new-folder/services-3.webp'],
      },
      {
        name: 'Investment Research',
        slug: 'investment-research',
        cardText: 'Returns, risks and comparables tested before capital is committed to an asset or a fund.',
        figure: ['services/ri-explore-investment-research.webp', 'new-folder/insights-3.webp'],
      },
      {
        name: 'Feasibility Studies',
        slug: 'feasibility-studies',
        cardText: 'Highest-and-best-use and financial feasibility for land and development, written for lenders.',
        figure: ['services/ri-explore-feasibility-studies.webp', 'new-folder/services-2.webp'],
      },
      {
        name: 'Market Intelligence',
        slug: 'market-intelligence',
        cardText: 'Ongoing tracking of prices, launches, rents and yields, delivered as the market moves.',
        figure: ['services/ri-explore-market-intelligence.webp', 'new-folder/insights-2.webp'],
      },
      {
        name: 'Research Reports',
        slug: 'research-reports',
        cardText: 'Published reports and bespoke briefs, with the sources and method behind every figure.',
        figure: ['services/ri-explore-research-reports.webp', 'new-folder/insights-1.webp'],
      },
    ],
  },
  solution: {
    head: 'Find the Right Solution',
    tabs: [
      {
        tab: 'Understand the Market',
        intro:
          'Every decision starts with what the market is actually doing. Supply, demand, pricing and absorption are gathered and tested, then tracked as they move.',
        slugs: ['real-estate-research', 'market-research', 'market-intelligence'],
      },
      {
        tab: 'Test the Investment',
        intro:
          'Before land is bought or a scheme is funded, the numbers behind it are run: what the site should become, what it will cost and what it will return.',
        slugs: ['investment-research', 'feasibility-studies'],
      },
      {
        tab: 'Publish the Evidence',
        intro:
          'A decision has to be explained to a board, a lender or a partner. Reports and briefs carry the sources and the method, so the reader can test the conclusion.',
        slugs: ['research-reports'],
      },
    ],
    images: [['new-folder/research-intelligence-2.webp'], ['new-folder/insights-3.webp'], ['new-folder/services-3.webp']],
  },
  banner: {
    head: 'The Research Agenda from the ValuNxt Research & Intelligence Team',
    body: 'Our research practice brings market research, feasibility and investment analysis together under one team, so an investor, developer or occupier in the UAE decides on evidence that was gathered, tested and quantified rather than on the opinion nearest to hand.',
    cta: { label: 'Learn more', href: '#at-services' },
    image: ['services/research-banner.webp', 'banners/uae-slider-3.webp'],
  },
  related: { head: 'Explore Related Services' },
  close: {
    head: 'Start with the question you need answered today.',
    lede: 'Whether you need a market sized, a site’s best use tested, an investment case checked or a report your board can rely on, ValuNxt can help identify the right place to start.',
    primary: { label: 'Book a Free Research Consultation', href: '/free-consultation/' },
    image: ['services/research-talk.webp', 'new-folder/insights-main.webp'],
  },
};
