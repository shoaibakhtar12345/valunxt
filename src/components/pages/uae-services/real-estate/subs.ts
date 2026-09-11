/**
 * The three pages under /en-ae/services/real-estate-transactions/.
 *
 * Practice-level sections once, page-level copy per sub-service; the names
 * and slugs are the registry's. See ../template/subTypes.ts for the shape,
 * the length rules and the note on the success story being a placeholder.
 */
import { buildSubs, type SubParent, type SubSpec } from '../template/subTypes';
import {
  BAND_PHOTO,
  PANEL_PLATE,
  SHARED_VISION,
  SITE_ARTICLES,
  STORY_PHOTO,
  WHY_PHOTO,
  stripOf,
} from '../template/subShared';
import { REAL_ESTATE_TEMPLATE } from './content';

const PARENT: SubParent = {
  service: 'real-estate-transactions',
  crumb: 'Real Estate',
  hero: { image: REAL_ESTATE_TEMPLATE.hero.image, alt: REAL_ESTATE_TEMPLATE.hero.alt },
  panel: PANEL_PLATE,
  why: {
    pill: 'Why us?',
    titleTop: 'One Interest',
    titleMid: 'Represented:',
    titleMark: 'Yours',
    note: 'No inventory behind the advice, and no side of the table but yours.',
    cta: { label: 'Schedule a Call', href: '/free-consultation/' },
    ...WHY_PHOTO,
  },
  approach: {
    eyebrow: 'Our approach',
    columns: [
      {
        title: 'Independent by design',
        body:
          'We hold no inventory and take no listing fee, so a recommendation is never a way of moving ' +
          'stock. The property we suggest is the one we would buy with our own money at the price we ' +
          'would pay for it — and we say so when there is not one.',
      },
      {
        title: 'Evidence before opinion',
        body:
          'Every price we put to a buyer or a seller comes from transaction comparables and the ' +
          'group’s RICS-regulated valuers, not from the asking prices around it. That is what makes ' +
          'an offer defensible and a counter-offer credible.',
      },
      {
        title: 'One desk to completion',
        body:
          'The adviser who sources the property negotiates it, coordinates the mortgage desk and the ' +
          'valuers, and is at the transfer. Nothing is handed to a different team halfway through, ' +
          'which is where most transactions lose their thread.',
      },
    ],
  },
  insights: {
    title: 'Deciding Before the Deal',
    lede:
      'The best property decisions are made before the offer, on evidence rather than on instinct. ' +
      'Explore our latest thinking on buying, funding and holding real estate in the UAE.',
    all: { label: 'Learn more', href: '/blogs/' },
    cards: SITE_ARTICLES,
  },
  story: {
    ...STORY_PHOTO,
    alt: 'An adviser reviewing a property file',
    quote:
      'We had two offers on the table and no way to judge them. VALUNXT priced the asset on ' +
      'comparables, ran the diligence and handled the negotiation — and the deal closed at the ' +
      'number they said it would.',
    initials: 'AH',
    role: 'Private investor',
    org: 'Dubai residential portfolio',
    pill: 'Success story',
    title: 'An Off-Market Acquisition, Priced on Evidence',
    stat: 'Two weeks',
    note: 'from instruction to a signed MOU, with valuation, diligence and negotiation from one desk.',
    cta: { label: 'Discuss Your Case', href: '/free-consultation/' },
    arrow: { href: '/services/real-estate-transactions/', label: 'More about Real Estate' },
  },
  band: {
    ...BAND_PHOTO,
    title: 'VALUNXT Transaction Intelligence',
    body:
      'Working with the group’s RICS-regulated valuers, research team and mortgage desk, VALUNXT ' +
      'turns a property search into a decision you can defend — priced, checked and negotiated ' +
      'before the money moves.',
    cta: { label: "Discover what's next", href: '/services/technology-data-ai/' },
  },
  vision: SHARED_VISION,
  strip: stripOf('real-estate-transactions', [
    'Buying',
    'Selling & Leasing',
    'Off-Plan',
    'Due Diligence',
    'Negotiation',
    'Completion',
  ]),
  talk: {
    head: REAL_ESTATE_TEMPLATE.close.head,
    lede: REAL_ESTATE_TEMPLATE.close.lede,
    cta: REAL_ESTATE_TEMPLATE.close.primary,
    image: REAL_ESTATE_TEMPLATE.close.image,
  },
};

const SPECS: SubSpec[] = [
  {
    slug: 'buy-property',
    title: 'Buy Property',
    lede:
      'We help buyers find, assess and secure the right property across Dubai and Abu Dhabi — residential and commercial, ready or off-plan. Whether you are buying a first home, an investment apartment or a commercial unit for your business, we bring independent sourcing, evidence-based pricing and a negotiation run on your side of the table only.',
    brief: {
      lede:
        'We partner with buyers to run a purchase as a decision rather than a search. The approach is built on acquisitions handled across freehold Dubai and Abu Dhabi, which has shown that a good purchase needs both the right asset and a process that tests the price, the title and the terms before the deposit is paid.',
      whatIntro: 'The what covers what a buyer needs settled before committing, including:',
      what: [
        { lead: 'A brief, not a wish list', text: 'setting budget, use, location, yield or lifestyle priorities and the constraints — visa, financing, timing — that narrow the search.', stress: 'the constraints' },
        { lead: 'Independent sourcing', text: 'across the whole market, on and off portal, with no inventory of our own to steer you towards.' },
        { lead: 'Pricing on evidence', text: 'from transaction comparables and the group’s RICS-regulated valuers, so an offer is a number you can defend.' },
        { lead: 'Diligence on the asset', text: 'title, service charges, developer and building history, mortgage clearance and community rules, before the MOU.' },
      ],
      howIntro: 'The how runs the purchase through to keys:',
      how: [
        { lead: 'One adviser throughout.', text: 'The person who sourced the property negotiates it, manages the paperwork and is there at transfer.', stress: 'One adviser' },
        { lead: 'Negotiation with a plan.', text: 'A target, a walk-away and the evidence for both, agreed with you before the first offer is made.' },
        { lead: 'Finance in step.', text: 'The group’s mortgage desk runs pre-approval and the loan alongside, so the offer is a funded one.' },
        { lead: 'Completion managed.', text: 'NOC, transfer, trustee appointment and handover coordinated, with the timeline published and tracked.' },
      ],
      panel: { title: 'Buy-Side Advisory', sub: 'Independent sourcing, evidence-based pricing and negotiation for buyers across Dubai and Abu Dhabi.' },
    },
  },
  {
    slug: 'sell-rent-lease-property',
    title: 'Sell & Rent/Lease Property',
    lede:
      'We help owners sell or lease property at a price the market will pay, through a process that reaches the buyers and tenants who will pay it. Whether you are selling an apartment, leasing an office or letting a portfolio, we bring evidence-based pricing, considered marketing and negotiation that protects the value you have built.',
    brief: {
      lede:
        'We partner with owners to run a disposal or a letting as a managed process rather than a listing left to luck. The approach is built on sales and leases handled across residential and commercial assets in the UAE, which has shown that the outcome is decided by the price asked, the market reached and the terms agreed — in that order.',
      whatIntro: 'The what sets out what an owner needs in place before going to market, including:',
      what: [
        { lead: 'A price on evidence', text: 'from recent transactions, current competing stock and the group’s valuers, so the asking price is a strategy rather than a hope.', stress: 'a strategy rather than a hope' },
        { lead: 'The asset presented', text: 'with the documents a buyer or tenant will ask for — title, service charges, NOCs, floor plans — ready before the first viewing.' },
        { lead: 'Marketing that reaches', text: 'the buyers and tenants for this asset, through portals, the group’s network and direct approaches, not a single listing.' },
        { lead: 'Terms thought through', text: 'for a lease — term, escalation, fit-out, break clauses — or a sale — deposit, timeline, conditions — before an offer arrives.' },
      ],
      howIntro: 'The how keeps the process in your control:',
      how: [
        { lead: 'Weekly reporting.', text: 'Enquiries, viewings, feedback and offers reported every week, so a decision to hold or adjust is made on data.', stress: 'reported every week' },
        { lead: 'Qualified interest only.', text: 'Buyers and tenants are qualified on funding and intent before a viewing is booked.' },
        { lead: 'Negotiation on your side.', text: 'Every offer is assessed against the plan agreed with you, and countered with the evidence behind the price.' },
        { lead: 'Completion handled.', text: 'MOU, NOC, transfer or lease registration and handover managed to a published timeline.' },
      ],
      panel: { title: 'Sell-Side & Leasing', sub: 'Pricing, marketing and negotiation for owners selling or leasing across the UAE.' },
    },
  },
  {
    slug: 'off-plan-properties',
    title: 'Off Plan Properties',
    lede:
      'We help buyers assess an off-plan purchase before a deposit is paid: the developer, the payment plan, the location and the exit. Whether you are buying to live in, to let or to resell on completion, we bring independent analysis of what a launch offers, what it will cost to completion and what it is likely to be worth when the keys are handed over.',
    brief: {
      lede:
        'We partner with buyers to treat an off-plan purchase as an investment decision rather than a launch-day reaction. The approach is built on launches assessed across Dubai and Abu Dhabi, which has shown that the outcome depends less on the brochure than on the developer’s record, the payment plan’s shape and the market the project will complete into.',
      whatIntro: 'The what sets out what has to be checked before committing, including:',
      what: [
        { lead: 'The developer', text: 'track record on delivery, escrow compliance, RERA registration and how earlier phases have traded since handover.', stress: 'how earlier phases have traded' },
        { lead: 'The payment plan', text: 'modelled to completion, including post-handover instalments, DLD fees and the cash needed at each milestone.' },
        { lead: 'The location and the pipeline', text: 'what is planned around the project and what supply will complete alongside it.' },
        { lead: 'The exit', text: 'expected value at completion against the total cost, tested with the group’s valuers and research team, whether you plan to let, hold or resell.' },
      ],
      howIntro: 'The how keeps you in a strong position through the build:',
      how: [
        { lead: 'Launch access.', text: 'Early sight of releases from developers across the emirates, and a view on which are worth the queue.', stress: 'which are worth the queue' },
        { lead: 'Negotiated terms.', text: 'Unit choice, payment plan and incentives negotiated where the developer allows it, before the SPA is signed.' },
        { lead: 'Milestone tracking.', text: 'Construction progress, escrow reporting and instalment dates monitored and reported to you through the build.' },
        { lead: 'Handover and beyond.', text: 'Snagging, handover, registration and — if you plan to let — the letting managed by the same team.' },
      ],
      panel: { title: 'Off-Plan Advisory', sub: 'Developer, payment plan, location and exit assessed before a deposit is paid.' },
    },
  },
];

export const REAL_ESTATE_SUBS = buildSubs(PARENT, SPECS);
