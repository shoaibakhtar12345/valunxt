/**
 * The five pages under /en-ae/services/valuation-and-advisory/.
 *
 * Practice-level sections once, page-level copy per sub-service; the names
 * and slugs are the registry's. RICS-regulated property valuation runs through
 * group firm Reliant Surveyors, which is why that name appears where it does.
 * See ../template/subTypes.ts for the shape, the length rules and the note on
 * the success story being a placeholder.
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
import { VALUATION_TEMPLATE } from './content';

const PARENT: SubParent = {
  service: 'valuation-and-advisory',
  crumb: 'Valuation',
  hero: { image: VALUATION_TEMPLATE.hero.image, alt: VALUATION_TEMPLATE.hero.alt },
  panel: PANEL_PLATE,
  why: {
    pill: 'Why us?',
    titleTop: 'Every Number',
    titleMid: 'Must',
    titleMark: 'Hold Up',
    note: 'Method documented, assumptions sourced, and RICS standards through the group.',
    cta: { label: 'Schedule a Call', href: '/free-consultation/' },
    ...WHY_PHOTO,
  },
  approach: {
    eyebrow: 'Our approach',
    columns: [
      {
        title: 'RICS through the group',
        body:
          'Property valuation runs through Reliant Surveyors, a RICS-regulated firm, to the Red ' +
          'Book — which is the standard a bank, an auditor or a court expects to see on the cover. ' +
          'Business, plant and financial valuations are prepared to the international standards ' +
          'each of them cites.',
      },
      {
        title: 'Method you can read',
        body:
          'A valuation is an argument, and ours are written to be followed: the basis stated, ' +
          'the approaches run and reconciled, every comparable dated and sourced, every discount ' +
          'explained. A reader who disagrees can see exactly where, which is the point.',
      },
      {
        title: 'Built for the reader who questions it',
        body:
          'We ask at the start who will test the number — a lender, an auditor, a buyer, a ' +
          'tribunal — and build the report to that reader. When the question comes, the valuer ' +
          'who signed the report answers it.',
      },
    ],
  },
  insights: {
    title: 'Numbers That Hold Up',
    lede:
      'A valuation is only useful once someone has questioned it. Explore our latest thinking on ' +
      'value, evidence and the decisions that rest on both in the UAE.',
    all: { label: 'Learn more', href: '/blogs/' },
    cards: SITE_ARTICLES,
  },
  story: {
    ...STORY_PHOTO,
    alt: 'A valuer reviewing a report',
    quote:
      'The bank’s panel valuer and our own number were twenty per cent apart. VALUNXT’s report ' +
      'set out the method line by line, and the lender accepted it without a single query.',
    initials: 'MS',
    role: 'Finance director',
    org: 'Abu Dhabi industrial group',
    pill: 'Success story',
    title: 'A Plant & Machinery Valuation the Lender Accepted First Time',
    stat: 'Zero queries',
    note: 'from the lender on a report built to RICS standards, with every assumption sourced.',
    cta: { label: 'Discuss Your Case', href: '/free-consultation/' },
    arrow: { href: '/services/valuation-and-advisory/', label: 'More about Valuation' },
  },
  band: {
    ...BAND_PHOTO,
    title: 'VALUNXT Valuation Intelligence',
    body:
      'Working with Reliant Surveyors, the research team and the group’s accountants, VALUNXT ' +
      'turns a valuation instruction into a number that holds — method documented, evidence ' +
      'sourced, ready for whoever questions it next.',
    cta: { label: "Discover what's next", href: '/services/technology-data-ai/' },
  },
  vision: SHARED_VISION,
  strip: stripOf('valuation-and-advisory', [
    'Business Valuation',
    'Company Valuation',
    'Plant & Machinery',
    'Asset Valuation',
    'Financial Valuation',
    'Property Valuation',
  ]),
  talk: {
    head: VALUATION_TEMPLATE.close.head,
    lede: VALUATION_TEMPLATE.close.lede,
    cta: VALUATION_TEMPLATE.close.primary,
    image: VALUATION_TEMPLATE.close.image,
  },
};

const SPECS: SubSpec[] = [
  {
    slug: 'business-valuation',
    title: 'Business Valuation',
    lede:
      'We value businesses for transactions, disputes, succession and shareholder events — with a method that is documented, reconciled and defensible to the buyer, the court or the regulator who will question it. Whether you are selling, buying, admitting a partner or resolving a dispute, we bring a number built from evidence and a report that shows how it was reached.',
    brief: {
      lede:
        'We partner with owners, boards and their advisers to make a valuation a position that holds rather than an opinion that is argued. The approach is built on business valuations delivered across UAE trading, service and asset-heavy companies, which has shown that the number matters less than the reasoning a reader can follow to it.',
      whatIntro: 'The what sets out what a business valuation has to contain, including:',
      what: [
        { lead: 'The right basis', text: 'market value, fair value or investment value, fixed to the purpose — a sale, an IFRS test, a court — before any method is applied.', stress: 'fixed to the purpose' },
        { lead: 'Three approaches', text: 'income, market and asset, each run where it is meaningful and reconciled into one conclusion rather than averaged.' },
        { lead: 'Normalised earnings', text: 'owner remuneration, one-off items and related-party terms adjusted, with each adjustment listed.' },
        { lead: 'Evidence', text: 'comparable transactions and listed multiples sourced and dated, and every discount or premium explained.' },
      ],
      howIntro: 'The how makes the report usable by whoever reads it next:',
      how: [
        { lead: 'Scope agreed in writing.', text: 'Purpose, basis, date, reliance and the information relied on, set out before work begins.', stress: 'before work begins' },
        { lead: 'A reviewed report.', text: 'A second valuer reviews method, arithmetic and conclusion against professional standards before issue.' },
        { lead: 'Written to be read.', text: 'The report explains the business, the method and the judgement in plain language, with the workings in appendices.' },
        { lead: 'Defended if needed.', text: 'The valuer who signed it answers the questions a buyer, auditor or tribunal raises.' },
      ],
      panel: { title: 'Business Value', sub: 'Enterprise and equity value for deals, disputes and succession, with the method on the page.' },
    },
  },
  {
    slug: 'company-valuation',
    title: 'Company Valuation',
    lede:
      'We value shares and companies to a standard a buyer, an auditor, a court or a regulator can rely on: for share transfers, buy-outs, capital raises, ESOPs and statutory or regulatory requirements. Whether you need a valuation for a single shareholding or an entire group, we bring the method, the evidence and the report the reader will accept.',
    brief: {
      lede:
        'We partner with companies and their shareholders to put a defensible value on equity at the moments it changes hands. The approach is built on company valuations delivered across the UAE, which has shown that a share value has to answer for control, marketability and the rights attached to the shares — not just for the business beneath them.',
      whatIntro: 'The what covers what a company valuation has to settle, including:',
      what: [
        { lead: 'Enterprise to equity', text: 'the bridge from business value to share value — debt, cash, surplus assets and preferred rights — set out line by line.', stress: 'set out line by line' },
        { lead: 'The shareholding itself', text: 'control or minority, marketable or restricted, with the discounts and premiums evidenced rather than assumed.' },
        { lead: 'The purpose', text: 'a transfer, a buy-out, an ESOP, a regulator — each carries its own basis and reporting requirement, applied from the start.' },
        { lead: 'Group structures', text: 'holding companies, subsidiaries and cross-holdings valued consistently and consolidated once.' },
      ],
      howIntro: 'The how keeps the valuation defensible:',
      how: [
        { lead: 'Standards followed.', text: 'International valuation standards applied and cited, so the report meets the test its reader will apply.', stress: 'International valuation standards' },
        { lead: 'Information verified.', text: 'Financials reconciled to the ledger and management representations documented, with the group’s accountants where needed.' },
        { lead: 'Independence protected.', text: 'One instruction, one client, one fee agreed in advance — never contingent on the outcome.' },
        { lead: 'Explained to the parties.', text: 'The conclusion walked through with shareholders and their advisers, so the number is understood before it is relied on.' },
      ],
      panel: { title: 'Share Value', sub: 'Share and company valuations for transfers, buy-outs, ESOPs and regulators, to a standard that is relied on.' },
    },
  },
  {
    slug: 'plant-machinery-valuation',
    title: 'Plant & Machinery Valuation',
    lede:
      'We value industrial plant, machinery and equipment for lending, insurance, financial reporting and sale — from a single production line to an entire facility. Whether a bank needs security valued, an insurer needs a reinstatement figure or a buyer needs to know what the assets are worth, we bring inspection, evidence and a basis of value fixed to the purpose.',
    brief: {
      lede:
        'We partner with manufacturers, lenders and investors to value the assets that do the work. The approach is built on plant and machinery valuations delivered across UAE industrial estates and free zones, which has shown that each reader — lender, insurer, auditor, buyer — asks a different question of the same equipment, and that the report has to answer the right one.',
      whatIntro: 'The what sets out what a plant and machinery valuation depends on, including:',
      what: [
        { lead: 'Inspection', text: 'the assets seen, identified and recorded on site — make, model, age, condition, utilisation — not valued from a register.', stress: 'not valued from a register' },
        { lead: 'The right basis', text: 'market value in situ, in exchange, or reinstatement cost, fixed to whether the reader is lending, insuring, reporting or selling.' },
        { lead: 'Evidence', text: 'replacement cost from manufacturers and dealers, depreciation on condition and technology, and secondary-market sales where they exist.' },
        { lead: 'Specialised assets', text: 'installed lines, process plant and bespoke equipment valued with the removal, reinstallation and obsolescence they carry.' },
      ],
      howIntro: 'The how delivers a report each reader can use:',
      how: [
        { lead: 'Scoped to the reader.', text: 'Lender, insurer, auditor or buyer named in the instruction, with the basis and reliance set to match.', stress: 'named in the instruction' },
        { lead: 'RICS standards.', text: 'Valued through group firm Reliant Surveyors to the Red Book, so the report carries the standard a bank expects.' },
        { lead: 'Asset register reconciled.', text: 'The fixed asset register agreed to what was found on site, with additions, disposals and ghosts listed.' },
        { lead: 'Explained to the lender.', text: 'Where a bank’s panel number differs, the valuer speaks to the panel with the evidence.' },
      ],
      panel: { title: 'Plant & Machinery', sub: 'Industrial assets inspected and valued for lending, insurance, reporting and sale, to RICS standards.' },
    },
  },
  {
    slug: 'asset-valuation',
    title: 'Asset Valuation',
    lede:
      'We value property and other fixed assets to RICS standards through group firm Reliant Surveyors — residential, commercial, industrial and land — for lending, financial reporting, transactions and disputes. Whether a bank, an auditor, a buyer or a court will read the report, we bring an inspection, the comparable evidence and a method documented to the Red Book.',
    brief: {
      lede:
        'We partner with owners, lenders and auditors to value the assets on the balance sheet and the land beneath them. The approach is built on RICS-regulated valuations delivered across the UAE through Reliant Surveyors, which has shown that a property valuation is only as strong as the comparables behind it and the clarity with which the report explains their use.',
      whatIntro: 'The what sets out what an asset valuation has to carry, including:',
      what: [
        { lead: 'Inspection and measurement', text: 'the property seen and measured to the IPMS standard the report states, with condition, tenure and occupation recorded.', stress: 'seen and measured' },
        { lead: 'Comparable evidence', text: 'transactions and lettings sourced, dated, verified and adjusted in a table the reader can follow.' },
        { lead: 'The right method', text: 'comparison, investment, residual or depreciated replacement cost, chosen for the asset and the purpose.' },
        { lead: 'Basis and assumptions', text: 'market value, fair value or reinstatement, with every special assumption stated up front.' },
      ],
      howIntro: 'The how makes the report reliable for the reader it names:',
      how: [
        { lead: 'Red Book throughout.', text: 'RICS valuation standards applied and the valuer’s regulated status stated, which is what lenders and auditors require.', stress: 'Red Book' },
        { lead: 'Independent.', text: 'No transaction interest and a fee agreed in advance, so the number cannot be said to favour anyone.' },
        { lead: 'Portfolio consistency.', text: 'Multiple assets valued on one date, one basis and one evidence base, then reconciled across the portfolio.' },
        { lead: 'Reviewed before issue.', text: 'A second RICS valuer signs off method, evidence and arithmetic on every report.' },
      ],
      panel: { title: 'Property & Assets', sub: 'RICS-regulated valuation of property and fixed assets through Reliant Surveyors, for lenders, auditors and buyers.' },
    },
  },
  {
    slug: 'financial-valuation',
    title: 'Financial Valuation',
    lede:
      'We value financial instruments, intangible assets and acquisitions for financial reporting: purchase price allocations, impairment tests, share-based payments, and the fair value of investments, loans and derivatives under IFRS. Whether the reader is your auditor or your board, we bring models an auditor can test and a report that explains every input.',
    brief: {
      lede:
        'We partner with finance teams and their auditors to put fair value on the balance sheet with the workings beside it. The approach is built on financial reporting valuations delivered for UAE groups, which has shown that IFRS asks for the number and the method in equal measure, and that an unexplained input is the first thing an auditor challenges.',
      whatIntro: 'The what covers the valuations financial reporting asks for, including:',
      what: [
        { lead: 'Purchase price allocation', text: 'under IFRS 3 — identifiable intangibles, contingent consideration and goodwill — with each asset valued on its own method.', stress: 'each asset valued on its own method' },
        { lead: 'Impairment testing', text: 'under IAS 36 — cash-generating units, value in use and the sensitivities the auditor will run.' },
        { lead: 'Instruments and investments', text: 'unquoted equity, loans, convertibles and derivatives at fair value under IFRS 9 and IFRS 13, with the hierarchy level stated.' },
        { lead: 'Share-based payments', text: 'options and awards valued under IFRS 2 with the inputs — volatility, term, forfeiture — sourced and documented.' },
      ],
      howIntro: 'The how keeps the valuation audit-ready:',
      how: [
        { lead: 'Models built to be tested.', text: 'Inputs, assumptions and calculations in a model the auditor can trace and re-perform, not a black box.', stress: 'trace and re-perform' },
        { lead: 'Inputs sourced.', text: 'Discount rates, growth, multiples and volatility taken from named sources on named dates.' },
        { lead: 'Standards cited.', text: 'The IFRS paragraph and the valuation standard each treatment relies on referenced in the report.' },
        { lead: 'Auditor engaged early.', text: 'Method agreed with the audit team before the model is finalised, so the review is a confirmation.' },
      ],
      panel: { title: 'Fair Value', sub: 'Instruments, intangibles, impairment and acquisitions valued for IFRS, in models an auditor can test.' },
    },
  },
];

export const VALUATION_SUBS = buildSubs(PARENT, SPECS);
