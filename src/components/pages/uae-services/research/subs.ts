/**
 * The six pages under /en-ae/services/research-intelligence/.
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
import { RESEARCH_TEMPLATE } from './content';

const PARENT: SubParent = {
  service: 'research-intelligence',
  crumb: 'Research',
  hero: { image: RESEARCH_TEMPLATE.hero.image, alt: RESEARCH_TEMPLATE.hero.alt },
  panel: PANEL_PLATE,
  why: {
    pill: 'Why us?',
    titleTop: 'The Questions',
    titleMid: 'Deserve',
    titleMark: 'Real Answers',
    note: 'Tested, compared and quantified — before capital is committed.',
    cta: { label: 'Schedule a Call', href: '/free-consultation/' },
    ...WHY_PHOTO,
  },
  approach: {
    eyebrow: 'Our approach',
    columns: [
      {
        title: 'Evidence before recommendation',
        body:
          'We gather the data before we form the view, and we show the data in the report. A ' +
          'conclusion that cannot be traced to a source, a sample or a dataset is not one we ' +
          'publish — which is the difference between research and a well-written opinion.',
      },
      {
        title: 'UAE markets, first hand',
        body:
          'The group values, transacts and finances property across the emirates every week, so ' +
          'our researchers read the market from live evidence rather than from published ' +
          'indices alone — and know when an index is running behind what is actually happening.',
      },
      {
        title: 'Written for the decision',
        body:
          'Every study opens with the question that was asked and the answer that was found. The ' +
          'method and the data follow, for the reader who needs to test them; the summary is for ' +
          'the board that has ten minutes and a decision to make.',
      },
    ],
  },
  insights: {
    title: 'Evidence Before Commitment',
    lede:
      'The best investment decisions are made before the deal, not during it. Explore our latest ' +
      'thinking on markets, feasibility and the evidence behind property decisions in the UAE.',
    all: { label: 'Learn more', href: '/blogs/' },
    cards: SITE_ARTICLES,
  },
  story: {
    ...STORY_PHOTO,
    alt: 'A researcher reviewing a feasibility study',
    quote:
      'We had a site and three ideas for it. VALUNXT’s feasibility study showed which one the ' +
      'market would actually absorb, and the numbers behind it went straight into the lender’s ' +
      'credit paper.',
    initials: 'FA',
    role: 'Development director',
    org: 'Sharjah mixed-use scheme',
    pill: 'Success story',
    title: 'A Feasibility Study That Chose the Scheme',
    stat: '3 options',
    note: 'tested on supply, demand and pricing evidence before a dirham of capital was committed.',
    cta: { label: 'Discuss Your Case', href: '/free-consultation/' },
    arrow: { href: '/services/research-intelligence/', label: 'More about Research' },
  },
  band: {
    ...BAND_PHOTO,
    title: 'VALUNXT Market Intelligence',
    body:
      'Working with the group’s valuers, transaction desk and technology team, VALUNXT turns a ' +
      'market question into evidence you can act on — gathered, tested and quantified before ' +
      'capital is committed.',
    cta: { label: "Discover what's next", href: '/services/technology-data-ai/' },
  },
  vision: SHARED_VISION,
  strip: stripOf('research-intelligence', [
    'Real Estate Research',
    'Market Research',
    'Investment Research',
    'Feasibility Studies',
    'Market Intelligence',
    'Research Reports',
  ]),
  talk: {
    head: RESEARCH_TEMPLATE.close.head,
    lede: RESEARCH_TEMPLATE.close.lede,
    cta: RESEARCH_TEMPLATE.close.primary,
    image: RESEARCH_TEMPLATE.close.image,
  },
};

const SPECS: SubSpec[] = [
  {
    slug: 'real-estate-research',
    title: 'Real Estate Research',
    lede:
      'We gather, test and quantify the evidence behind UAE property decisions: supply, demand, absorption, pricing and rents across residential, commercial, hospitality and industrial markets. Whether you are choosing a submarket, timing an acquisition or sizing a scheme, we bring data that has been checked, comparables that have been verified and analysis written for the decision in front of you.',
    brief: {
      lede:
        'We partner with investors, developers and occupiers to replace market opinion with market evidence. The approach is built on research delivered across the emirates, which has shown that the useful questions — what is being built, what is selling, at what price and to whom — have answers in the data, and that the data has to be cleaned before it can be trusted.',
      whatIntro: 'The what sets out what real estate research has to deliver, including:',
      what: [
        { lead: 'Supply', text: 'existing stock, the pipeline by delivery year and the projects that will actually complete, tracked at building level.', stress: 'the projects that will actually complete' },
        { lead: 'Demand and absorption', text: 'transactions, lettings and take-up by submarket and segment, so a forecast rests on how the market has behaved.' },
        { lead: 'Pricing and rents', text: 'verified comparables, trend and yield, with the outliers explained rather than averaged away.' },
        { lead: 'The submarket view', text: 'what distinguishes one community, one tower or one industrial zone from the next, and what that is worth.' },
      ],
      howIntro: 'The how keeps the research usable and current:',
      how: [
        { lead: 'Verified sources.', text: 'Transaction registries, developer disclosures, listings and the group’s own valuation evidence, cross-checked before use.', stress: 'cross-checked before use' },
        { lead: 'Written for the decision.', text: 'Each report opens with the question asked and the answer found, with the method and the data behind it.' },
        { lead: 'Refreshed on a schedule.', text: 'Standing coverage updated quarterly, so a view taken in March is not stale by June.' },
        { lead: 'Valuation alongside.', text: 'The group’s RICS-regulated valuers test the pricing conclusions, so research and value agree.' },
      ],
      panel: { title: 'Property Evidence', sub: 'Supply, demand, absorption and pricing across UAE property markets, gathered and verified.' },
    },
  },
  {
    slug: 'market-research',
    title: 'Market Research',
    lede:
      'We size markets and describe them: who is buying, renting, spending and paying what, across sectors and locations in the UAE. Whether you are entering a market, launching a product or choosing where to build, we bring primary research, verified secondary data and analysis that turns a market into a set of numbers a plan can be built on.',
    brief: {
      lede:
        'We partner with businesses and investors to know a market before committing to it. The approach is built on studies delivered across property, retail, hospitality and services in the UAE, which has shown that the right study answers a specific question with evidence gathered for it — not a generic report with the client’s name on the cover.',
      whatIntro: 'The what sets out what a market study has to establish, including:',
      what: [
        { lead: 'Market size and growth', text: 'from verified data, with the method of estimation stated and the range it carries.', stress: 'the method of estimation stated' },
        { lead: 'Customers and demand', text: 'who buys, why, how often and at what price, from surveys, interviews and transaction evidence.' },
        { lead: 'Competition', text: 'the operators, projects or products already there, their positioning and where the gaps are.' },
        { lead: 'Location', text: 'catchments, footfall, access and the pipeline that will change them, mapped and quantified.' },
      ],
      howIntro: 'The how delivers research a decision can rest on:',
      how: [
        { lead: 'The question first.', text: 'The decision the research serves is written down with the client before a survey is designed.', stress: 'written down with the client' },
        { lead: 'Primary where it matters.', text: 'Surveys, interviews and site work commissioned where secondary data cannot answer the question.' },
        { lead: 'Evidence over opinion.', text: 'Every conclusion traces to a source, a sample or a dataset named in the report.' },
        { lead: 'Presented, not just delivered.', text: 'Findings walked through with the team who will act on them, and the model handed over.' },
      ],
      panel: { title: 'Market Studies', sub: 'Markets sized and described — customers, competition, location — from evidence gathered for the question.' },
    },
  },
  {
    slug: 'investment-research',
    title: 'Investment Research',
    lede:
      'We test an investment before capital is committed: returns, risks and comparables for a property, a portfolio or a fund. Whether you are assessing an acquisition, weighing a sector or reviewing a manager, we bring cash-flow modelling on evidence, sensitivities on the assumptions that matter and an independent view with no stake in the answer.',
    brief: {
      lede:
        'We partner with investors, family offices and funds to turn conviction into evidence. The approach is built on investment analysis delivered across UAE real estate and related assets, which has shown that most bad investments were made on a return that was never stress-tested and a comparable that was never checked.',
      whatIntro: 'The what sets out what investment research has to test, including:',
      what: [
        { lead: 'The cash flows', text: 'rent, occupancy, costs, capex and exit modelled from evidence, not from the vendor’s brochure.', stress: 'not from the vendor’s brochure' },
        { lead: 'The returns', text: 'yield, IRR and equity multiple over the hold, with and without leverage, on the same model.' },
        { lead: 'The risks', text: 'sensitivities on rent, exit yield, void and rate, so you know which assumption the case depends on.' },
        { lead: 'The comparables', text: 'what similar assets have traded and let for, verified by the group’s valuers.' },
      ],
      howIntro: 'The how gives you a view you can act on:',
      how: [
        { lead: 'Independent.', text: 'No transaction interest and a fixed fee, so the recommendation is not shaped by whether the deal proceeds.', stress: 'No transaction interest' },
        { lead: 'The model handed over.', text: 'A working model with inputs on one sheet, so your team can run its own scenarios after we leave.' },
        { lead: 'Written as a recommendation.', text: 'Proceed, proceed on terms, or decline — with the reasons and the conditions stated.' },
        { lead: 'Reviewed with you.', text: 'The findings presented to the investment committee, with the analyst there to answer the challenge.' },
      ],
      panel: { title: 'Investment Cases', sub: 'Returns, risks and comparables tested before capital is committed, with no stake in the answer.' },
    },
  },
  {
    slug: 'feasibility-studies',
    title: 'Feasibility Studies',
    lede:
      'We prepare feasibility studies for land and development that lenders and boards can act on: highest-and-best-use analysis, market absorption, development cost and financial feasibility on one defended model. Whether you own a plot and want to know what to build, or have a scheme and need to know whether it works, we bring evidence before the commitment.',
    brief: {
      lede:
        'We partner with landowners, developers and lenders to answer the question a site asks before the capital is spent. The approach is built on feasibility studies delivered across the emirates, which has shown that a bankable study has to test the use, the market, the cost and the finance together — and be honest when the answer is not the one the client hoped for.',
      whatIntro: 'The what sets out what a feasibility study has to establish, including:',
      what: [
        { lead: 'Highest and best use', text: 'the uses the site can legally, physically and financially support, tested and ranked rather than assumed from the neighbours.', stress: 'tested and ranked' },
        { lead: 'Market absorption', text: 'how much of the proposed product the market will take, at what price and over what period, from supply and demand evidence.' },
        { lead: 'Development cost', text: 'land, construction, fees, finance and contingency, benchmarked to current UAE tender evidence.' },
        { lead: 'Financial feasibility', text: 'residual land value, profit on cost, IRR and the sensitivities a lender will run, on one model.' },
      ],
      howIntro: 'The how produces a study that survives its readers:',
      how: [
        { lead: 'Written for the lender.', text: 'Structured the way a bank’s credit team reads a development case, with the assumptions they test made explicit.', stress: 'the way a bank’s credit team reads' },
        { lead: 'Valuers and researchers together.', text: 'The group’s RICS-regulated valuers and market researchers work on one study, so value and demand agree.' },
        { lead: 'Scenarios, not a single answer.', text: 'Base, downside and upside cases, with the trigger points named.' },
        { lead: 'Independent of the outcome.', text: 'A fixed fee and no development interest, so the study says what the evidence says.' },
      ],
      panel: { title: 'Feasibility', sub: 'Highest-and-best-use and financial feasibility for land and development, written for lenders and boards.' },
    },
  },
  {
    slug: 'market-intelligence',
    title: 'Market Intelligence',
    lede:
      'We track the UAE property market as it moves — prices, rents, launches, yields, supply and transactions — and deliver it to you on a schedule, in a format built for the decisions you make. Whether you need a monthly dashboard, quarterly briefings or an alert when a submarket turns, we bring standing coverage that keeps your view current between the big decisions.',
    brief: {
      lede:
        'We partner with investors, developers and corporate occupiers who need to know what the market is doing this month, not what it did last year. The approach is built on intelligence programmes run for UAE clients, which has shown that timely, verified and consistently defined data is worth more than a thick annual report nobody opens.',
      whatIntro: 'The what sets out what a market intelligence programme covers, including:',
      what: [
        { lead: 'Prices and rents', text: 'tracked by submarket and segment on a consistent definition, so a move month to month is real rather than a change of method.', stress: 'on a consistent definition' },
        { lead: 'Launches and supply', text: 'new releases, construction progress and deliveries monitored, with the pipeline restated as it changes.' },
        { lead: 'Transactions and yields', text: 'volumes, values and investment yields by sector, from registry and market evidence.' },
        { lead: 'Your watchlist', text: 'the communities, towers, sectors or competitors you care about, followed specifically.' },
      ],
      howIntro: 'The how keeps the intelligence useful:',
      how: [
        { lead: 'On a schedule.', text: 'Monthly data, quarterly briefings and ad hoc alerts, delivered on dates agreed with you.', stress: 'On a schedule' },
        { lead: 'Built for your decisions.', text: 'Dashboards and briefs shaped around the questions your team actually asks, refined as they change.' },
        { lead: 'Verified before it reaches you.', text: 'Every figure cross-checked against a second source before it is published.' },
        { lead: 'An analyst you can call.', text: 'A named researcher who knows your portfolio and can answer the question the dashboard raises.' },
      ],
      panel: { title: 'Standing Coverage', sub: 'Prices, rents, launches and yields tracked as they move, delivered on your schedule.' },
    },
  },
  {
    slug: 'research-reports',
    title: 'Research Reports',
    lede:
      'We publish research reports and bespoke briefs on UAE property and investment — market reviews, sector studies and thematic papers — with the sources and the method behind every figure. Whether you need a published report to support a strategy, a brief for a board or an independent paper for investors, we bring analysis written to be read and evidence that can be checked.',
    brief: {
      lede:
        'We partner with boards, investors and institutions who need research they can put their name beside. The approach is built on reports published and briefs commissioned across the UAE market, which has shown that a report is only as credible as its sourcing, and only as useful as the clarity of its conclusions.',
      whatIntro: 'The what covers what a research report has to deliver, including:',
      what: [
        { lead: 'A clear question', text: 'the market, sector or theme the report addresses stated up front, with the scope and the date of the evidence.', stress: 'the date of the evidence' },
        { lead: 'Sourced evidence', text: 'every chart and figure traceable to a named source, dataset or survey, with the method of any estimate shown.' },
        { lead: 'Independent analysis', text: 'conclusions drawn from the evidence rather than from the sponsor’s position, and stated as such.' },
        { lead: 'A brief for the reader', text: 'an executive summary a board can read in ten minutes, with the detail behind it for those who need it.' },
      ],
      howIntro: 'The how produces a report that holds up in public:',
      how: [
        { lead: 'Peer reviewed.', text: 'A second researcher and, where value is discussed, a RICS-regulated valuer review the draft before issue.', stress: 'review the draft before issue' },
        { lead: 'Designed to be read.', text: 'Charts, maps and tables built to carry the argument, in the group’s house style or yours.' },
        { lead: 'Bespoke or published.', text: 'Confidential briefs for one reader, or reports published under our name or co-branded with you.' },
        { lead: 'Presented on request.', text: 'Findings presented to your board, investors or clients by the analyst who wrote them.' },
      ],
      panel: { title: 'Reports & Briefs', sub: 'Published research and bespoke briefs, with the sources and method behind every figure.' },
    },
  },
];

export const RESEARCH_SUBS = buildSubs(PARENT, SPECS);
