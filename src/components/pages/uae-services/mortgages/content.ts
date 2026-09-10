/**
 * What /en-ae/services/mortgages-services/ says.
 *
 * Written for the service template on client instruction (20260910): the
 * Accounting & Tax page, section for section, with the words changed. The
 * copy draws on what the market already publishes for this desk — the
 * registry's line ("Whole-of-market mortgage structuring for resident,
 * non-resident and corporate borrowers"), the shared template's intro, and
 * the six sub-services vxnServices('en-ae') lists — and states what the desk
 * does and who it is for. Nothing here is an outcome promise; see
 * ../template/types.ts for why.
 *
 * SUB-SERVICE SLUGS resolve through vxnServices('en-ae'), so every slug below
 * exists in that registry and the strip cannot point at a 404.
 */
import type { ServiceTemplateContent } from '../template/types';

export const MORTGAGES_TEMPLATE: ServiceTemplateContent = {
  slug: 'mortgages-services',
  crumb: 'Mortgages',
  hero: {
    head: 'Mortgage Services in Dubai for Residents, Non-Residents and Businesses',
    sub: 'Know what you can borrow. Compare the whole market. Have the approval in place before the offer. Refinance when the terms have moved.',
    /* about-us-banner is the plate the old template used for this desk's
       banner: wide, and quiet enough on the left for the copy. */
    image: ['services/mortgages-hero.webp', 'new-folder/about-us-banner.webp'],
    alt: 'The ValuNxt office reception',
  },
  intro: {
    head: 'One Mortgage Partner from Pre-Approval to Refinance.',
    lede: 'Property finance structured, packaged and negotiated with UAE lenders — whole-of-market, for resident, non-resident and corporate borrowers alike. Terms are argued on the evidence, not on whichever lender happens to be closest.',
    proof: [
      { label: 'Whole of market', note: 'Every UAE lender, not a panel of three' },
      { label: 'Resident and non-resident', note: 'Salaried, self-employed and corporate borrowers' },
      { label: 'Packaged for a yes', note: 'Applications prepared the way lenders assess them' },
      { label: 'Islamic and conventional', note: 'Murabaha and Ijara alongside conventional terms' },
    ],
    chips: ['Whole-of-market comparison', 'Pre-approval before you make an offer'],
    primary: { label: 'Book a Free Consultation', href: '/free-consultation/' },
    secondary: { label: 'Explore Our Services', href: '#at-services' },
    image: ['services/mortgages-intro.webp', 'new-folder/houzzhunt-mortgage-2.webp'],
  },
  strip: {
    kicker: 'Explore services',
    head: 'Find the finance that fits your position',
    lede: 'Start with the loan you need today — a first mortgage, a commercial facility, a refinance — and add structure as your position changes.',
    cta: 'Ready to get started?',
    subs: [
      {
        name: 'Residential Mortgages',
        slug: 'residential-mortgages',
        cardText: 'Whole-of-market home loans for UAE residents, structured around income and the property.',
        figure: ['services/mo-explore-residential-mortgages.webp', 'new-folder/who-we-are-1.webp'],
      },
      {
        name: 'Commercial Mortgages',
        slug: 'commercial-mortgages',
        cardText: 'Finance for offices, warehouses, retail and mixed-use assets, for owner-occupiers and investors.',
        figure: ['services/mo-explore-commercial-mortgages.webp', 'new-folder/services-4.webp'],
      },
      {
        name: 'Mortgage Pre Approval',
        slug: 'mortgage-pre-approval',
        cardText: 'An approval in principle before you make an offer, so you negotiate as a funded buyer.',
        figure: ['services/mo-explore-mortgage-pre-approval.webp', 'new-folder/services-1.webp'],
      },
      {
        name: 'Refinancing',
        slug: 'refinancing',
        cardText: 'Existing loans re-priced and restructured when the market or your circumstances have moved.',
        figure: ['services/mo-explore-refinancing.webp', 'new-folder/insights-2.webp'],
      },
      {
        name: 'Non Resident Mortgages',
        slug: 'non-resident-mortgages',
        cardText: 'UAE property finance for overseas buyers, with income and documents from abroad handled.',
        figure: ['services/mo-explore-non-resident-mortgages.webp', 'new-folder/client-success-2.webp'],
      },
      {
        name: 'Islamic Finance',
        slug: 'islamic-finance',
        cardText: 'Sharia-compliant home and commercial finance, compared against conventional terms.',
        figure: ['services/mo-explore-islamic-finance.webp', 'new-folder/who-we-are-3.webp'],
      },
    ],
  },
  solution: {
    head: 'Find the Right Solution',
    tabs: [
      {
        tab: 'Buying a Home',
        intro:
          'A purchase is won on the certainty a buyer brings to the table. Pre-approval first, then a whole-of-market comparison, whether the income sits in the UAE or overseas.',
        slugs: ['residential-mortgages', 'mortgage-pre-approval', 'non-resident-mortgages'],
      },
      {
        tab: 'Business Property',
        intro:
          'Commercial assets are lent against differently — on the asset, the lease and the borrower together. The application is built the way the credit committee reads it.',
        slugs: ['commercial-mortgages'],
      },
      {
        tab: 'Restructuring',
        intro:
          'Terms move. A loan that was right at completion may not be right three years on, and an Islamic structure may fit better than the conventional one it replaces.',
        slugs: ['refinancing', 'islamic-finance'],
      },
    ],
    images: [['new-folder/houzzhunt-mortgage-1.webp'], ['new-folder/services-2.webp'], ['new-folder/about-us-1.webp']],
  },
  banner: {
    head: 'The Finance Agenda from the ValuNxt Mortgage Desk',
    body: 'Our mortgage desk brings pre-approval, whole-of-market comparison, application packaging and negotiation together under one team, so a buyer or business in the UAE deals with one adviser rather than with each lender in turn.',
    cta: { label: 'Learn more', href: '#at-services' },
    image: ['services/mortgages-banner.webp', 'banners/uae-slider-2.webp'],
  },
  related: { head: 'Explore Related Services' },
  close: {
    head: 'Start with the loan you need approved today.',
    lede: 'Whether you are buying a first home, financing a commercial asset, borrowing from overseas or re-pricing a loan you already hold, ValuNxt can help identify the right place to start.',
    primary: { label: 'Book a Free Mortgage Consultation', href: '/free-consultation/' },
    image: ['services/mortgages-talk.webp', 'new-folder/houzzhunt-mortgage-1.webp'],
  },
};
