/**
 * The three pages under /en-ae/services/real-estate-transactions/.
 *
 * Practice-level sections once, page-level copy per sub-service; the names
 * and slugs are the registry's. See ../template/subTypes.ts for the shape,
 * the length rules and the note on the success story being a placeholder.
 *
 * BUY PROPERTY IS THE CLIENT'S page document (20260912), word for word, under
 * the same two rules as the home and service pages: nothing added to the
 * document or dropped from it, and no em dashes anywhere on the UAE pages.
 * The document writes every one of the eight practice-level sections for this
 * page in its own words, so the page carries them all in `override` and the
 * PARENT below is what the other two pages show until their documents arrive.
 * Where the document and a slot did not meet, the call is marked at the line.
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
  /* The Buy Property document writes the breadcrumb out in full. */
  crumb: 'Real Estate Transactions',
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
    lede: 'Your next home or investment starts with the right opportunity. Explore the UAE property market with expertise guiding every move.',
    brief: {
      lede: [
        'Buying property should feel exciting, not complicated. Whether it is a place to call home or an investment for the future, Valunxt brings the search, market perspective and transaction support together to make the journey easier from the start.',
        'Tell us what you are looking for. We help you narrow the market, explore the right opportunities and move forward when the right property comes along.',
      ],
      /* The document heads each list; the brief has a plain paragraph before
         each list and no heading, so the heading is set as that paragraph. */
      whatIntro: 'A Property Search Built Around You',
      /* The document's points are a title over a sentence. The list renders a
         bold lead-in followed by the rest on one line, so a full stop closes
         each lead, as the how-lists on the other pages do. */
      what: [
        { lead: 'Properties That Fit.', text: 'Explore homes and investment opportunities matched to your location, budget and priorities.' },
        { lead: 'More Relevant Options.', text: 'Compare apartments, villas, townhouses and investment properties without getting lost in endless listings.' },
        { lead: 'Market Perspective.', text: 'Understand the location, pricing and market dynamics behind the properties you are considering.' },
        { lead: '100% Transparency.', text: 'Stay informed on the property, price, process and next steps throughout your purchase.' },
      ],
      howIntro: 'From Search to Keys',
      how: [
        { lead: 'Curated Viewings.', text: 'View properties worth your time, selected around what you are actually looking for.' },
        { lead: 'Confident Negotiation.', text: 'Move into offers with market context and support when price and terms matter.' },
        { lead: 'Hassle-Free Coordination.', text: 'Navigate documentation, approvals and transaction requirements without chasing every step yourself.' },
        { lead: 'Seamless Closure.', text: 'From an accepted offer to transfer and handover, we help keep everything moving until the keys are yours.' },
      ],
      panel: {
        title: 'Buying Property, Made Effortless.',
        sub: 'From finding the right property to negotiating the right terms and completing the transaction, we stay with you through every move.',
      },
    },
    override: {
      why: {
        pill: 'Why us?',
        /* Two lines in the document, three in the card, the last of them
           highlighted: the second line is split so the highlight lands on its
           final word. */
        titleTop: 'Your Property Search.',
        titleMid: 'Without the',
        titleMark: 'Guesswork.',
        note: 'From the right opportunities to the right terms, we bring transparency, market insight and dedicated support to every move.',
        /* The document gives the buttons labels but no destinations; the
           search buttons lead where every other UAE consultation button does. */
        cta: { label: 'Find My Property', href: '/free-consultation/' },
        ...WHY_PHOTO,
      },
      approach: {
        eyebrow: 'Our approach',
        columns: [
          {
            title: 'Understand What Matters',
            /* The commas around "today and over the longer term" stand where
               the document's dashes were. */
            body: 'We start by understanding what you want from the property, today and over the longer term, before shaping the search around you.',
          },
          {
            title: 'Explore With Perspective',
            body: 'We help you compare opportunities beyond the surface, bringing greater context to the properties and communities you are considering.',
          },
          {
            title: 'Move With Confidence',
            body: 'When the right opportunity stands out, we help turn consideration into action with clear guidance through the decisions that follow.',
          },
        ],
      },
      insights: {
        title: 'Know the Market. Spot the Opportunity.',
        lede: 'Explore the locations, trends and market intelligence shaping smarter property decisions across the UAE.',
        /* /blogs/ is where the header's Insights item leads. The document's
           four cards are topics, not published articles, so each leads there
           too and carries no category, kind or date. The plates are the four
           the site's articles use. */
        all: { label: 'Explore Market Insights', href: '/blogs/' },
        cards: [
          { title: 'Where Buyers Are Looking', excerpt: 'Communities gaining attention and why.', href: '/blogs/', image: 'blogs/blog-1.webp', alt: '' },
          { title: 'Ready vs Off-Plan', excerpt: 'Which route fits your property goals?', href: '/blogs/', image: 'blogs/blog-2.webp', alt: '' },
          { title: 'What Drives Property Value?', excerpt: 'The factors influencing what a property is worth.', href: '/blogs/', image: 'blogs/blog-3.webp', alt: '' },
          { title: 'Before You Buy', excerpt: 'The insights worth knowing before you commit.', href: '/blogs/', image: 'blogs/blog-4.webp', alt: '' },
        ],
      },
      story: {
        ...STORY_PHOTO,
        alt: 'An adviser reviewing a property file',
        /* The document gives the quote no speaker and the panel no label, so
           the attribution row and the pill are left off rather than invented. */
        quote: 'Valunxt made our property search much more focused. We explored the right options, understood the market better and had support throughout the purchase.',
        title: 'More Choice. One Focused Property Search.',
        stat: '50K+',
        note: 'property listings giving buyers access to opportunities across the UAE market.',
        cta: { label: 'Find Your Property', href: '/free-consultation/' },
        arrow: { href: '/services/real-estate-transactions/', label: 'More about Real Estate' },
      },
      band: {
        ...BAND_PHOTO,
        /* The document sets a kicker over a headline; the band has one heading
           and one paragraph, so the kicker is the heading and the headline
           opens the paragraph. Its own paragraph was tried first and sat as a
           stray short line in the right-aligned side column. */
        title: 'VALUNXT Property Intelligence',
        body: 'More Clarity Behind Every Property Choice. Go beyond the listing with a clearer view of location, pricing, market movement and investment potential so you understand the opportunity before you make your move.',
        cta: { label: 'Get in Touch', href: '/contact/' },
      },
      vision: {
        /* Each step in the document is a title, a one-line lead and a
           sentence; a step has a title and a body, so the lead opens the body. */
        steps: [
          {
            title: 'Property Selection',
            body: 'More relevant from the start. Explore opportunities aligned with your location, budget, lifestyle and investment priorities.',
          },
          {
            title: 'Market Intelligence',
            body: 'Know what sits behind the price. Understand pricing trends, demand, community dynamics and the market signals influencing your decision.',
          },
          {
            title: 'Connected Expertise',
            body: 'More support when you need it. Access valuation, mortgage and research expertise alongside your property journey when the decision calls for it.',
          },
        ],
        pill: 'Our Vision',
        /* The comma after "clearer" stands where the document's dash was. */
        quote: 'To make every property decision clearer, connecting the right opportunity with the insight to recognise its potential.',
      },
      /* "Explore by Property" heads the strip in the document; the row's
         heading block is hidden by the home page's CSS, so nothing shows it. */
      strip: stripOf('real-estate-transactions', [
        'Apartments',
        'Villas',
        'Townhouses',
        'Waterfront Homes',
        'Investment Properties',
        'Ready Properties',
      ]),
      talk: {
        head: 'Your Next Property Move Starts Here.',
        lede: 'Ready to turn your property plans into your next address? Start the conversation with Valunxt.',
        cta: { label: 'Start Your Search', href: '/free-consultation/' },
        image: REAL_ESTATE_TEMPLATE.close.image,
      },
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
