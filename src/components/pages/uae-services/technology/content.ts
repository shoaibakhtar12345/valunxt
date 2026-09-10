/**
 * What /en-ae/services/technology-data-ai/ says.
 *
 * Written for the service template on client instruction (20260910): the
 * Accounting & Tax page, section for section, with the words changed. The
 * copy draws on what the market already publishes for this practice — the
 * registry's line ("Intelligent platforms, analytics and AI systems that turn
 * market data into better decisions"), the shared template's intro, and the
 * five sub-services vxnServices('en-ae') lists — and states what the practice
 * does and who it is for. Nothing here is an outcome promise; see
 * ../template/types.ts for why.
 *
 * SUB-SERVICE SLUGS resolve through vxnServices('en-ae'), so every slug below
 * exists in that registry and the strip cannot point at a 404.
 */
import type { ServiceTemplateContent } from '../template/types';

export const TECHNOLOGY_TEMPLATE: ServiceTemplateContent = {
  slug: 'technology-data-ai',
  crumb: 'Technology & AI',
  hero: {
    head: 'Technology, Data & AI in Dubai for Finance-Led Businesses',
    sub: 'Plan the change. Build the systems. Put the data on one dashboard. Apply the intelligence where it pays.',
    image: ['services/technology-hero.webp', 'homepage/technology-and-ai.webp'],
    alt: 'Two engineers with a laptop in a server room',
  },
  intro: {
    head: 'One Technology Partner from Strategy to Dashboard.',
    lede: 'ERP, accounting and core systems migrated to the cloud with finance-grade discipline: governed, measured, and redesigned around value you can point at rather than activity you can count.',
    proof: [
      { label: 'Finance-grade discipline', note: 'Systems built by people who close books' },
      { label: 'Cloud and enterprise', note: 'ERP, accounting and core systems' },
      { label: 'Measured outcomes', note: 'Dashboards that show what changed' },
      { label: 'AI where it pays', note: 'Applied to a business case, not a demo' },
    ],
    chips: ['Scope and fee agreed upfront', 'Measured on outcomes, not activity'],
    primary: { label: 'Book a Free Consultation', href: '/free-consultation/' },
    secondary: { label: 'Explore Our Services', href: '#at-services' },
    image: ['services/technology-intro.webp', 'new-folder/technology-ai-1.webp'],
  },
  strip: {
    kicker: 'Explore services',
    head: 'Find the technology your business needs',
    lede: 'Start with the system that is holding you back today — reporting, ERP, a process that still runs on spreadsheets — and add capability as the business grows.',
    cta: 'Ready to get started?',
    subs: [
      {
        name: 'Technology Consulting',
        slug: 'technology-consulting',
        cardText: 'Strategy, selection and roadmaps for finance and operations systems, written around the business case.',
        figure: ['services/te-explore-technology-consulting.webp', 'new-folder/technology-ai-2.webp'],
      },
      {
        name: 'AI Solutions',
        slug: 'ai-solutions',
        cardText: 'Machine learning and automation applied to reporting, forecasting and document-heavy processes.',
        figure: ['services/te-explore-ai-solutions.webp', 'new-folder/services-4.webp'],
      },
      {
        name: 'ERP Dashboards',
        slug: 'erp-dashboards',
        cardText: 'Management dashboards on top of ERP and accounting data, so leadership sees one version of the numbers.',
        figure: ['services/te-explore-erp-dashboards.webp', 'new-folder/insights-2.webp'],
      },
      {
        name: 'PropTech',
        slug: 'proptech',
        cardText: 'Data and tooling for property portfolios, valuations and transactions.',
        figure: ['services/te-explore-proptech.webp', 'homepage/industry-2.webp'],
      },
      {
        name: 'Enterprise Solutions',
        slug: 'enterprise-solutions',
        cardText: 'ERP, accounting and core systems implemented or migrated to the cloud with governed data.',
        figure: ['services/te-explore-enterprise-solutions.webp', 'new-folder/services-1.webp'],
      },
    ],
  },
  solution: {
    head: 'Find the Right Solution',
    tabs: [
      {
        tab: 'Plan the Change',
        intro:
          'Technology fails when it is bought before the question is asked. Strategy, selection and the roadmap come first, and they are written around what the business needs to measure.',
        slugs: ['technology-consulting'],
      },
      {
        tab: 'Build the Systems',
        intro:
          'Core systems moved to the cloud with the same discipline a set of books gets, and dashboards on top of them so leadership reads one version of the numbers.',
        slugs: ['enterprise-solutions', 'erp-dashboards'],
      },
      {
        tab: 'Apply the Intelligence',
        intro:
          'AI and property technology earn their place where a process is repetitive, document-heavy or data-rich — forecasting, reconciliation, portfolio reporting — and nowhere they do not.',
        slugs: ['ai-solutions', 'proptech'],
      },
    ],
    images: [['new-folder/technology-ai-2.webp'], ['new-folder/services-4.webp'], ['homepage/industry-2.webp']],
  },
  banner: {
    head: 'The Technology Agenda from the ValuNxt Technology, Data & AI Team',
    body: 'Our technology practice brings strategy, systems, data and AI together under one team with finance behind it, so a growing UAE business has one partner for the change rather than a vendor for each part of it.',
    cta: { label: 'Learn more', href: '#at-services' },
    image: ['services/technology-banner.webp', 'banners/uae-slider-4.webp'],
  },
  related: { head: 'Explore Related Services' },
  close: {
    head: 'Start with the system you need fixed today.',
    lede: 'Whether you need a technology roadmap, an ERP moved to the cloud, dashboards leadership will actually use or AI applied to a process that eats time, ValuNxt can help identify the right place to start.',
    primary: { label: 'Book a Free Technology Consultation', href: '/free-consultation/' },
    image: ['services/technology-talk.webp', 'new-folder/technology-ai-1.webp'],
  },
};
