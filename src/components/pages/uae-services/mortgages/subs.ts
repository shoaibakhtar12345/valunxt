/**
 * The six pages under /en-ae/services/mortgages-services/.
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
import { MORTGAGES_TEMPLATE } from './content';

const PARENT: SubParent = {
  service: 'mortgages-services',
  crumb: 'Mortgages',
  hero: { image: MORTGAGES_TEMPLATE.hero.image, alt: MORTGAGES_TEMPLATE.hero.alt },
  panel: PANEL_PLATE,
  why: {
    pill: 'Why us?',
    titleTop: 'Terms Negotiated',
    titleMid: 'on the',
    titleMark: 'Evidence',
    note: 'Whole of market, packaged for a yes, and a fee agreed before the first application.',
    cta: { label: 'Schedule a Call', href: '/free-consultation/' },
    ...WHY_PHOTO,
  },
  approach: {
    eyebrow: 'Our approach',
    columns: [
      {
        title: 'Whole of market',
        body:
          'Every UAE lender, Islamic and conventional, compared on one sheet — rate, fees, fixed ' +
          'period, early settlement — rather than the three a bank-tied broker is paid to place ' +
          'with. The recommendation is the loan that fits, and we can show why.',
      },
      {
        title: 'Packaged the way lenders read it',
        body:
          'A credit committee approves a case, not a form. We build the application the way ' +
          'underwriting assesses it — income evidenced, liabilities explained, the property file ' +
          'complete — so the first answer is the right one and the rate is negotiated from strength.',
      },
      {
        title: 'Structured for the long term',
        body:
          'The cheapest headline rate is rarely the cheapest loan. We shape the term, the fixed ' +
          'period and the settlement terms to how long you will actually hold the property, and ' +
          'we come back when the market has moved enough to be worth a refinance.',
      },
    ],
  },
  insights: {
    title: 'Reading the Market Before the Bank Does',
    lede:
      'A mortgage is a position in the property market as much as a loan against it. Explore our ' +
      'latest thinking on buying, funding and holding real estate in the UAE.',
    all: { label: 'Learn more', href: '/blogs/' },
    cards: SITE_ARTICLES,
  },
  story: {
    ...STORY_PHOTO,
    alt: 'A case manager reviewing a mortgage file',
    quote:
      'Three banks had said no before we called. VALUNXT repackaged the application the way a ' +
      'credit committee reads it, and the fourth said yes — at a better rate than the first three ' +
      'had quoted.',
    initials: 'RK',
    role: 'Non-resident buyer',
    org: 'Dubai apartment purchase',
    pill: 'Success story',
    title: 'A Non-Resident Mortgage, Approved on the Fourth Application',
    stat: '4 lenders',
    note: 'compared on one term sheet, with the approval in place before the offer went in.',
    cta: { label: 'Discuss Your Case', href: '/free-consultation/' },
    arrow: { href: '/services/mortgages-services/', label: 'More about Mortgages' },
  },
  band: {
    ...BAND_PHOTO,
    title: 'VALUNXT Finance Intelligence',
    body:
      'Working with the group’s valuers, accountants and technology partners, VALUNXT turns a ' +
      'mortgage application into a case a lender can approve — packaged, evidenced and negotiated ' +
      'on the numbers.',
    cta: { label: "Discover what's next", href: '/services/technology-data-ai/' },
  },
  vision: SHARED_VISION,
  strip: stripOf('mortgages-services', [
    'Residential Mortgages',
    'Commercial Mortgages',
    'Pre-Approval',
    'Refinancing',
    'Non-Resident Finance',
    'Islamic Finance',
  ]),
  talk: {
    head: MORTGAGES_TEMPLATE.close.head,
    lede: MORTGAGES_TEMPLATE.close.lede,
    cta: MORTGAGES_TEMPLATE.close.primary,
    image: MORTGAGES_TEMPLATE.close.image,
  },
};

const SPECS: SubSpec[] = [
  {
    slug: 'residential-mortgages',
    title: 'Residential Mortgages',
    lede:
      'We arrange home loans for UAE residents from the whole lending market — banks, Islamic windows and specialist lenders — structured around your income, the property and how long you plan to hold it. Whether you are buying your first home or your third, we bring a comparison you can read, an application packaged to be approved and a rate negotiated on the evidence.',
    brief: {
      lede:
        'We partner with buyers to run a mortgage as a decision made once, well, rather than a form filled under offer pressure. The approach is built on residential loans arranged across Dubai and Abu Dhabi, which has shown that the best terms go to the application a credit committee can approve without a second look.',
      whatIntro: 'The what sets out what a home loan should be built on, including:',
      what: [
        { lead: 'Affordability first', text: 'assessed on the Central Bank’s rules — debt burden ratio, loan-to-value and term — before a property is chosen.', stress: 'before a property is chosen' },
        { lead: 'The whole market compared', text: 'on rate, fees, early settlement terms and the fixed period, on one sheet you can read side by side.' },
        { lead: 'The right structure', text: 'fixed or variable, conventional or Islamic, term and repayment shaped to your plans for the property.' },
        { lead: 'Pre-approval in hand', text: 'so you negotiate the purchase as a funded buyer, with the valuation and offer stages already understood.' },
      ],
      howIntro: 'The how gets the loan approved and drawn without drama:',
      how: [
        { lead: 'Packaged for the lender.', text: 'Income, liabilities, bank statements and the property file presented the way underwriting reads them, with the gaps closed first.', stress: 'the way underwriting reads them' },
        { lead: 'One case manager.', text: 'From pre-approval to disbursement, one person tracks the lender, the valuer, the developer or seller and you.' },
        { lead: 'Valuation and offer.', text: 'The bank valuation and the final offer letter reviewed line by line before you sign.' },
        { lead: 'Disbursement to transfer.', text: 'Liability letters, NOCs, trustee appointment and transfer coordinated with the transaction desk.' },
      ],
      panel: { title: 'Home Loans', sub: 'Whole-of-market residential mortgages for UAE residents, structured around income and the property.' },
    },
  },
  {
    slug: 'commercial-mortgages',
    title: 'Commercial Mortgages',
    lede:
      'We arrange finance for commercial property — offices, warehouses, retail units and mixed-use assets — for owner-occupiers and investors across the UAE. Whether you are buying premises for your business or adding an income asset to a portfolio, we bring lender selection on the asset class, an application built the way a credit committee reads it and terms negotiated on the numbers.',
    brief: {
      lede:
        'We partner with businesses and investors to finance commercial property on its merits. The approach is built on facilities arranged across UAE commercial assets, which has shown that lenders decide on three things together — the asset, the lease or business behind it and the borrower — and that the application has to make the case for all three.',
      whatIntro: 'The what sets out what a commercial facility rests on, including:',
      what: [
        { lead: 'Lender fit', text: 'matched to the asset class — not every bank lends on warehouses or on strata offices — before time is spent on an application.', stress: 'matched to the asset class' },
        { lead: 'The asset and its income', text: 'valuation, lease terms, tenant covenant or, for an owner-occupier, the business’s own accounts.' },
        { lead: 'The borrower', text: 'entity structure, financials, existing facilities and security, presented as a lender assesses them.' },
        { lead: 'The facility shaped', text: 'loan-to-value, tenor, amortisation and covenants negotiated to fit the cash flow that will service it.' },
      ],
      howIntro: 'The how takes the facility from term sheet to drawdown:',
      how: [
        { lead: 'A credit paper, not a form.', text: 'The application is written as the case the committee will read, with the risks answered before they are raised.', stress: 'the case the committee will read' },
        { lead: 'Competitive terms.', text: 'Two or three lenders taken to term sheet where the asset supports it, so the pricing is negotiated rather than accepted.' },
        { lead: 'Conditions managed.', text: 'Valuation, legal, insurance and security conditions tracked and closed on a timeline the transaction can hold.' },
        { lead: 'Group support.', text: 'The group’s accountants prepare the financials and its valuers speak to the bank’s panel where the numbers differ.' },
      ],
      panel: { title: 'Commercial Finance', sub: 'Facilities for offices, warehouses, retail and mixed-use assets, for owner-occupiers and investors.' },
    },
  },
  {
    slug: 'mortgage-pre-approval',
    title: 'Mortgage Pre Approval',
    lede:
      'We secure an approval in principle before you make an offer, so you shop with a budget the bank has already agreed and negotiate as a funded buyer. Whether you are a resident, a non-resident or buying through a company, we bring an eligibility check against every lender’s criteria, a pre-approval from the right one and a clear picture of what you can spend.',
    brief: {
      lede:
        'We partner with buyers to settle the finance before the search, not after the offer. The approach is built on pre-approvals arranged across the UAE market, which has shown that most delayed and lost purchases trace back to a mortgage question that should have been answered weeks earlier.',
      whatIntro: 'The what sets out what a pre-approval has to establish, including:',
      what: [
        { lead: 'Eligibility', text: 'against Central Bank rules and each lender’s own criteria — income type, nationality, age, existing debt — before an application is made.', stress: 'each lender’s own criteria' },
        { lead: 'A real budget', text: 'the maximum loan, the deposit and fees you will need, and the monthly payment at today’s rates and at a stressed one.' },
        { lead: 'The right lender', text: 'chosen for your profile, so the pre-approval you carry is from a bank that will complete, not one that will reprice.' },
        { lead: 'Validity and conditions', text: 'how long the approval holds, what it assumes and what could change it, explained before you rely on it.' },
      ],
      howIntro: 'The how turns the pre-approval into a completed loan:',
      how: [
        { lead: 'Documents once.', text: 'One file — identity, income, statements, liabilities — assembled to the lender’s checklist and reused for the full application.', stress: 'assembled to the lender’s checklist' },
        { lead: 'Fast turnaround.', text: 'A complete file goes to a lender that answers quickly, so you are approved before the property is gone.' },
        { lead: 'Offer support.', text: 'The pre-approval letter and a clear finance timeline given to the seller’s side, which is what makes an offer credible.' },
        { lead: 'Straight to full approval.', text: 'When the property is found, the same case manager converts the pre-approval into the loan.' },
      ],
      panel: { title: 'Approval in Principle', sub: 'Eligibility checked, a budget agreed and a pre-approval in hand before you make an offer.' },
    },
  },
  {
    slug: 'refinancing',
    title: 'Refinancing',
    lede:
      'We re-price and restructure existing property loans when the market or your circumstances have moved: a better rate, a longer or shorter term, equity released or a facility consolidated. Whether your fixed period is ending or you simply have not looked at the loan since completion, we bring a whole-of-market comparison and a settlement plan that shows the saving after every cost.',
    brief: {
      lede:
        'We partner with borrowers to treat a mortgage as a position to be managed rather than a decision made once. The approach is built on refinances arranged across residential and commercial loans in the UAE, which has shown that a switch is only worth making when the saving survives the early settlement fee, the new arrangement costs and the time it takes.',
      whatIntro: 'The what sets out what a refinance has to prove, including:',
      what: [
        { lead: 'A true comparison', text: 'of your current rate, remaining term and early settlement cost against every alternative, over the period you will actually hold the loan.', stress: 'the period you will actually hold the loan' },
        { lead: 'The right objective', text: 'a lower payment, a shorter term, cash released against equity or several loans made one — each shapes a different structure.' },
        { lead: 'Eligibility today', text: 'income, property value and loan-to-value reassessed, because the lender will assess them fresh.' },
        { lead: 'Islamic and conventional', text: 'both considered, including a switch between them where the terms are better.' },
      ],
      howIntro: 'The how completes the switch without a gap:',
      how: [
        { lead: 'Settlement sequenced.', text: 'Liability letter, new approval, disbursement and old-loan settlement scheduled so there is no period on two loans or none.', stress: 'no period on two loans or none' },
        { lead: 'Costs on the table.', text: 'Every fee — settlement, arrangement, valuation, registration — listed before you decide, with the break-even month.' },
        { lead: 'Negotiated retention.', text: 'Your current lender asked to match first where that is quicker and cheaper than moving.' },
        { lead: 'Registration handled.', text: 'Mortgage release and re-registration coordinated with the DLD or the relevant authority.' },
      ],
      panel: { title: 'Refinance', sub: 'Existing loans re-priced and restructured, with the saving shown after every cost.' },
    },
  },
  {
    slug: 'non-resident-mortgages',
    title: 'Non Resident Mortgages',
    lede:
      'We arrange UAE property finance for overseas buyers: eligibility across the lenders that accept non-resident applications, income and documents from your home country handled, and an approval that holds up to completion. Whether you are buying a holiday home, an investment apartment or a base for future residence, we bring the lender knowledge that makes an overseas application work.',
    brief: {
      lede:
        'We partner with international buyers to make a UAE mortgage as straightforward as a domestic one. The approach is built on non-resident loans arranged for buyers across Europe, Asia and the GCC, which has shown that the lender pool is smaller, the criteria stricter and the documents more particular — and that all three are manageable when they are known in advance.',
      whatIntro: 'The what sets out what a non-resident application depends on, including:',
      what: [
        { lead: 'The right lenders', text: 'the banks that lend to non-residents, their loan-to-value limits, accepted countries and income types, identified before you choose a property.', stress: 'identified before you choose a property' },
        { lead: 'Overseas income', text: 'salary, business or rental income evidenced in the form each lender accepts, with translations and attestations where required.' },
        { lead: 'Deposit and costs', text: 'the higher deposit, fees and the currency plan for moving funds, modelled before the offer.' },
        { lead: 'Structure', text: 'personal or through a company, conventional or Islamic, chosen for your tax position at home as well as here.' },
      ],
      howIntro: 'The how runs the application from wherever you are:',
      how: [
        { lead: 'Remote from start to finish.', text: 'Documents collected, verified and submitted without a visit until the signing that requires one.', stress: 'without a visit' },
        { lead: 'One file, one manager.', text: 'A case manager who knows what each lender will ask of an overseas applicant and asks you for it once.' },
        { lead: 'Power of attorney where it helps.', text: 'Signing and transfer arranged in your absence where the lender and the DLD allow it.' },
        { lead: 'Completion coordinated.', text: 'Valuation, offer, disbursement and transfer managed with the transaction desk, in your time zone.' },
      ],
      panel: { title: 'Overseas Buyers', sub: 'UAE property finance for non-residents, with income and documents from abroad handled.' },
    },
  },
  {
    slug: 'islamic-finance',
    title: 'Islamic Finance',
    lede:
      'We arrange Sharia-compliant home and commercial finance — Murabaha, Ijara and diminishing Musharaka — from Islamic banks and Islamic windows across the UAE, and compare it honestly against conventional terms. Whether compliance is the requirement or the pricing simply fits better, we bring the structuring knowledge to choose well and an application built for the bank that will approve it.',
    brief: {
      lede:
        'We partner with buyers and businesses to finance property in a way that fits both their principles and their numbers. The approach is built on Islamic facilities arranged across residential and commercial assets in the UAE, which has shown that the structures differ in ways that matter — on early settlement, on rate resets, on ownership — and that those differences should be understood before signing.',
      whatIntro: 'The what sets out what an Islamic facility has to be chosen on, including:',
      what: [
        { lead: 'The structure', text: 'Murabaha, Ijara or diminishing Musharaka, each with its own ownership path, profit rate mechanism and settlement terms explained plainly.', stress: 'explained plainly' },
        { lead: 'The bank', text: 'Islamic banks and the Islamic windows of conventional banks compared on profit rate, fees and approach to early settlement.' },
        { lead: 'Like-for-like comparison', text: 'against conventional terms over the period you will hold the finance, so the choice is made on the full cost.' },
        { lead: 'Compliance', text: 'the bank’s Sharia board approval and the documentation that supports it, for buyers and businesses who need to evidence it.' },
      ],
      howIntro: 'The how takes the facility to completion:',
      how: [
        { lead: 'Eligibility first.', text: 'Income, liabilities and the property checked against the chosen bank’s criteria before an application is submitted.', stress: 'before an application is submitted' },
        { lead: 'Packaged for the bank.', text: 'The file presented as the Islamic bank’s underwriting assesses it, including the property’s own compliance.' },
        { lead: 'Terms negotiated.', text: 'Profit rate, fixed period and settlement terms negotiated on the evidence, as with any facility.' },
        { lead: 'Registration and transfer.', text: 'The ownership and security structure registered correctly with the DLD, coordinated with the transaction desk.' },
      ],
      panel: { title: 'Islamic Finance', sub: 'Sharia-compliant home and commercial finance, compared plainly against conventional terms.' },
    },
  },
];

export const MORTGAGES_SUBS = buildSubs(PARENT, SPECS);
