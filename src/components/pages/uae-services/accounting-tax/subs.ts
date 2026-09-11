/**
 * The eight pages under /en-ae/services/accounting-tax-services/.
 *
 * The practice-level sections — why us, the approach, the insights rail, the
 * success story, the band, the vision, the strip and the close — are the
 * Accounting & Bookkeeping page's own, read from ./bookkeeping/content.ts so
 * that page renders exactly as it did. The other seven pages say what their
 * sub-service does in the hero and the brief; the eight names and slugs are
 * the registry's (vxnServices('en-ae')).
 *
 * See ../template/subTypes.ts for the shape, the length rules and the note on
 * the success stories being placeholders.
 */
import { buildSubs, type SubParent, type SubSpec } from '../template/subTypes';
import { SHARED_VISION } from '../template/subShared';
import {
  ABK_APPROACH,
  ABK_BAND,
  ABK_BRIEF,
  ABK_CASE,
  ABK_HERO,
  ABK_INSIGHTS,
  ABK_STRIP,
  ABK_TALK,
  ABK_WHY,
} from './bookkeeping/content';

const PARENT: SubParent = {
  service: 'accounting-tax-services',
  crumb: 'Accounting & Tax',
  hero: { image: ['services/accounting-tax-hero.webp', ABK_HERO.image], alt: ABK_HERO.alt },
  panel: { mark: ABK_BRIEF.panel.mark, image: ABK_BRIEF.panel.image, alt: ABK_BRIEF.panel.alt },
  why: ABK_WHY,
  approach: ABK_APPROACH,
  insights: ABK_INSIGHTS,
  story: ABK_CASE,
  band: ABK_BAND,
  vision: SHARED_VISION,
  strip: ABK_STRIP,
  talk: ABK_TALK,
};

const SPECS: SubSpec[] = [
  {
    slug: 'accounting-bookkeeping',
    title: ABK_HERO.title,
    lede: ABK_HERO.lede,
    brief: {
      lede: ABK_BRIEF.lede,
      whatIntro: ABK_BRIEF.whatIntro,
      what: ABK_BRIEF.what,
      howIntro: ABK_BRIEF.howIntro,
      how: ABK_BRIEF.how,
      panel: { title: ABK_BRIEF.panel.title, sub: ABK_BRIEF.panel.sub },
    },
  },
  {
    slug: 'cfo-services',
    title: 'Part-Time CFO',
    lede:
      'We give growing businesses senior finance leadership without a full-time hire: a named CFO who owns cash, forecasting, financing and the questions the board actually asks. Whether you are raising capital, planning expansion or simply outgrowing basic accounting, we bring judgement, structure and a monthly rhythm that keeps decisions grounded in the numbers.',
    brief: {
      lede:
        'We partner with founders and management teams to run finance as a leadership function rather than a back office. The approach is built on CFO mandates delivered across free zone and mainland groups, which has shown that senior judgement only helps when it arrives on a schedule and speaks from the same ledger management already trusts.',
      whatIntro: 'The what sets out where a part-time CFO earns their place, including:',
      what: [
        { lead: 'Cash and runway', text: 'modelled thirteen weeks ahead and refreshed every month, so a funding gap is a plan rather than a surprise.', stress: 'thirteen weeks ahead' },
        { lead: 'Financing and lenders', text: 'prepared as a case — covenants, facilities and the bank pack — before the conversation with the bank begins.' },
        { lead: 'Board and investor reporting', text: 'one pack, one narrative, with the variances explained before anyone has to ask.' },
        { lead: 'Pricing and margin', text: 'tested against real cost data, so a growth decision is made on contribution rather than on revenue alone.' },
      ],
      howIntro: 'The how keeps senior input regular rather than occasional:',
      how: [
        { lead: 'A fixed cadence.', text: 'A monthly finance review with a published agenda, a weekly cash call when it is needed, and a named CFO who attends both.', stress: 'a published agenda' },
        { lead: 'Your systems, your data.', text: 'We work in the ledger and tools you already run, so every number in the pack can be traced back to an entry.' },
        { lead: 'Management enablement.', text: 'Department heads learn to read their own numbers; the CFO’s job is to make the finance conversation one they can hold themselves.' },
        { lead: 'Documented decisions.', text: 'Every recommendation is written down with its assumptions, so the reasoning survives the meeting it was made in.' },
      ],
      panel: { title: 'Finance Leadership', sub: 'CFO-level judgement on cash, funding and growth, on a monthly rhythm and a fixed fee.' },
    },
  },
  {
    slug: 'management-reporting',
    title: 'Management Reporting',
    lede:
      'We turn a closed set of books into a management pack that explains what changed, why it changed and what needs attention next. Whether your reporting is a spreadsheet emailed on the tenth or a dashboard nobody trusts, we bring structured metrics, clean comparatives and a monthly narrative built for the people who have to act on it.',
    brief: {
      lede:
        'We partner with management teams to make reporting a decision tool rather than a record of the past. The approach is built on packs delivered to owners, boards and lenders across the UAE, which has shown that useful reporting needs both the right measures and a routine that gets them to the table while the month is still open.',
      whatIntro: 'The what defines the measures a pack has to carry, including:',
      what: [
        { lead: 'A defined KPI set', text: 'agreed with management once — revenue, margin, cash and the five operating drivers that move them — and held constant month to month.', stress: 'held constant month to month' },
        { lead: 'Variance analysis', text: 'against budget and prior period, with the cause named rather than the number restated.' },
        { lead: 'Cash and working capital', text: 'shown as days, not just balances, so a slipping debtor book is visible before it becomes an overdraft.' },
        { lead: 'Segment views', text: 'by entity, cost centre, project or product line, built from the ledger’s own structure so they always reconcile back.' },
      ],
      howIntro: 'The how gets the pack out while it still matters:',
      how: [
        { lead: 'A reporting calendar.', text: 'The pack lands on a fixed working day after close, every month, with the close itself scheduled to make that date.', stress: 'a fixed working day' },
        { lead: 'One version of the numbers.', text: 'The pack is built from the ledger, not from a parallel spreadsheet, so finance and management are reading the same figures.' },
        { lead: 'Commentary that answers questions.', text: 'Each section opens with what changed and why, written by the accountant who closed the period.' },
        { lead: 'Dashboards where they help.', text: 'Live views for the measures that move daily, the printed pack for the ones that need a month of context.' },
      ],
      panel: { title: 'Decision Reporting', sub: 'A monthly pack that says what changed and why, built from the ledger and delivered on a fixed date.' },
    },
  },
  {
    slug: 'budgeting-forecasting',
    title: 'Budgeting & Forecasting',
    lede:
      'We build the forward view a business needs before it commits: a budget management owns, a rolling forecast that moves with the year, and scenarios that show what hiring, expansion or a new facility would do to cash. Whether you are planning the next quarter or presenting to a lender, we bring models that are traceable, tested and updated on a schedule.',
    brief: {
      lede:
        'We partner with management teams to plan on numbers rather than on last month’s result. The approach is built on budgets and forecasts prepared for owner-managed businesses and funded groups across the UAE, which has shown that a forecast is only trusted when its assumptions are visible and its variances are explained every month.',
      whatIntro: 'The what sets out what a forward view has to contain, including:',
      what: [
        { lead: 'An annual budget', text: 'built bottom-up with department heads, phased by month and tied to the chart of accounts the actuals will report against.', stress: 'tied to the chart of accounts' },
        { lead: 'A rolling forecast', text: 'refreshed each month with actuals to date, so the year-end view is never more than a month old.' },
        { lead: 'Cash flow forecasting', text: 'weekly for the next quarter and monthly beyond it, with receipts and payments modelled on real terms rather than averages.' },
        { lead: 'Scenarios', text: 'for the decisions on the table — a hire, a lease, a price change — run against the same model rather than a fresh spreadsheet.' },
      ],
      howIntro: 'The how keeps the model honest through the year:',
      how: [
        { lead: 'Assumptions on the page.', text: 'Every driver — growth, margin, payment days, headcount — sits in one visible table, so a change is one edit rather than a rebuild.', stress: 'one visible table' },
        { lead: 'Actuals in, variances out.', text: 'The month closes, the actuals load, and the variance report explains where the year has moved and why.' },
        { lead: 'Owned by management.', text: 'Department heads set and defend their own lines; finance builds the model and runs the review, not the numbers.' },
        { lead: 'Version control.', text: 'Each forecast is dated and kept, so a lender or a board can see what was expected and when the expectation changed.' },
      ],
      panel: { title: 'Forward View', sub: 'Budgets, rolling forecasts and cash scenarios, built on visible assumptions and refreshed every month.' },
    },
  },
  {
    slug: 'financial-reporting',
    title: 'Financial Statements',
    lede:
      'We prepare and review financial statements that management, auditors, lenders and regulators can rely on — IFRS-compliant, built from a reconciled ledger and supported by schedules that agree to every line. Whether you need annual statements for an audit, interim accounts for a bank or consolidated figures for a group, we bring the discipline that makes the numbers stand.',
    brief: {
      lede:
        'We partner with finance teams to make financial statements the natural output of a well-kept ledger rather than a year-end project. The approach is built on statements prepared across free zone and mainland entities, which has shown that a clean set of accounts needs both correct accounting and a file that lets a reader test it.',
      whatIntro: 'The what covers what a set of statements has to get right, including:',
      what: [
        { lead: 'IFRS treatment', text: 'applied consistently — revenue recognition, leases, provisions and financial instruments — with the policy written down and followed.', stress: 'the policy written down' },
        { lead: 'Supporting schedules', text: 'for every balance sheet line, prepared as the statements are, so nothing is asserted without a schedule behind it.' },
        { lead: 'Disclosures', text: 'complete and current, including related parties, commitments and the judgements an auditor will ask about first.' },
        { lead: 'Consolidation', text: 'across entities and currencies, with intercompany balances eliminated from a reconciliation rather than a plug.' },
      ],
      howIntro: 'The how keeps the statements defensible from draft to sign-off:',
      how: [
        { lead: 'Prepared from the close.', text: 'The statements are drafted from the reconciled trial balance, not rebuilt from exports, so they agree to the ledger by construction.', stress: 'agree to the ledger by construction' },
        { lead: 'Reviewed before release.', text: 'A second accountant reviews treatment, disclosure and arithmetic against a checklist before any draft leaves the team.' },
        { lead: 'Audit-ready file.', text: 'The workpapers are indexed the way an auditor requests them, so the audit starts on the evidence rather than on a search for it.' },
        { lead: 'Timetabled.', text: 'Interim and annual statements run to a calendar agreed with management, the auditor and the lender who is waiting for them.' },
      ],
      panel: { title: 'Statements That Stand', sub: 'IFRS financial statements prepared from a reconciled ledger, with a schedule behind every line.' },
    },
  },
  {
    slug: 'external-audit-support',
    title: 'External Audit Support',
    lede:
      'We sit on your side of the audit: preparing schedules, reconciliations and supporting evidence before the auditor arrives, managing their queries while they are in, and closing the points they raise. Whether it is a first audit or a statutory annual one, we bring the preparation that turns an audit from a disruption into a review of work already done.',
    brief: {
      lede:
        'We partner with finance teams to make an external audit a confirmation of a good year rather than a reconstruction of it. The approach is built on audit seasons supported across the UAE, which has shown that most audit pain comes from evidence that exists but cannot be found, and from queries answered by the wrong person under time pressure.',
      whatIntro: 'The what sets out what audit readiness actually means, including:',
      what: [
        { lead: 'A complete audit file', text: 'indexed to the auditor’s own request list — reconciliations, schedules, confirmations and minutes — assembled before fieldwork opens.', stress: 'before fieldwork opens' },
        { lead: 'Reconciled control accounts', text: 'bank, debtors, creditors, VAT and intercompany, each agreed to its schedule on the year-end date.' },
        { lead: 'Judgement memos', text: 'for the positions an auditor tests hardest — revenue, provisions, impairment, going concern — written with the evidence attached.' },
        { lead: 'Prior-year points closed', text: 'with the fix documented, so last year’s management letter is not this year’s finding.' },
      ],
      howIntro: 'The how keeps the audit moving once it starts:',
      how: [
        { lead: 'One point of contact.', text: 'Auditor queries come to us, are logged, answered from the file and tracked to closure, so your team keeps running the business.', stress: 'logged, answered from the file' },
        { lead: 'Readiness review.', text: 'A pre-audit review six weeks before fieldwork, so anything missing is found by us rather than by them.' },
        { lead: 'Scope kept clear.', text: 'We support the audit; we do not perform it. The statutory auditor’s independence is protected on every engagement.' },
        { lead: 'Lessons written up.', text: 'Every finding becomes a change to the monthly routine, so the next audit starts further ahead than this one did.' },
      ],
      panel: { title: 'Audit Ready', sub: 'Schedules, reconciliations and evidence prepared before the auditor arrives — and queries managed while they are in.' },
    },
  },
  {
    slug: 'corporate-tax-services',
    title: 'Corporate Tax Filing',
    lede:
      'We take a UAE business from corporate tax registration to a filed return, starting with the numbers underneath it. Whether you are registering for the first time, working out a free zone position or preparing a group’s first return, we bring accounting that carries the tax computation from the first entry and a filing prepared to withstand an FTA query.',
    brief: {
      lede:
        'We partner with businesses to treat corporate tax as an outcome of the ledger rather than a form completed after it. The approach is built on registrations and returns prepared for mainland and free zone entities, which has shown that a defensible filing needs both the right adjustments and a record that shows how each one was reached.',
      whatIntro: 'The what sets out what a corporate tax filing rests on, including:',
      what: [
        { lead: 'Registration and status', text: 'confirmed on the facts — mainland, qualifying free zone, small business relief — with the position documented before the first return.', stress: 'documented before the first return' },
        { lead: 'Taxable income', text: 'computed from the accounting profit with every adjustment scheduled: disallowed expenses, exempt income, transfer pricing effects.' },
        { lead: 'Transfer pricing', text: 'for related-party transactions, supported by the disclosure form and the documentation the threshold requires.' },
        { lead: 'The return itself', text: 'prepared, reviewed and filed on the EmaraTax portal ahead of the deadline, with payment scheduled to match.' },
      ],
      howIntro: 'The how keeps the filing defensible after it is submitted:',
      how: [
        { lead: 'Tax runs through the year.', text: 'The bookkeeping carries the tax classification from the first entry, so the year-end computation is a review rather than a reconstruction.', stress: 'from the first entry' },
        { lead: 'A filing file.', text: 'Every return is kept with its computation, schedules and the correspondence behind it, ready for the seven-year record requirement.' },
        { lead: 'Deadlines published.', text: 'Registration, return and payment dates sit on a calendar your team can see, with the work scheduled to land ahead of each.' },
        { lead: 'Queries handled.', text: 'If the FTA asks, the answer comes from the file we built, prepared by the people who prepared the return.' },
      ],
      panel: { title: 'Corporate Tax', sub: 'Registration, computation and filing for UAE entities, built from the ledger and ready for an FTA query.' },
    },
  },
  {
    slug: 'vat-services',
    title: 'VAT Advisory',
    lede:
      'We keep VAT consistent with the transactions behind it: registration, returns, input tax recovery and the questions a growing business meets — imports, free zone supplies, mixed use, group registration. Whether you file quarterly with a small team or run VAT across several entities, we bring compliance tied to the ledger and advice you can act on before the return is due.',
    brief: {
      lede:
        'We partner with businesses to make VAT an outcome of clean transaction records rather than a quarterly scramble. The approach is built on registrations, returns and advisory delivered across UAE trading, service and property businesses, which has shown that VAT disputes are almost always decided by the evidence held at the point of the transaction.',
      whatIntro: 'The what sets out where VAT has to be right, including:',
      what: [
        { lead: 'Treatment by transaction', text: 'standard, zero-rated, exempt, out of scope and reverse charge — coded at entry and reviewed before each return.', stress: 'coded at entry' },
        { lead: 'Input tax recovery', text: 'supported by compliant tax invoices, with blocked and apportioned recovery identified before it is claimed.' },
        { lead: 'Returns and payments', text: 'prepared from the ledger, reconciled to it, and filed on EmaraTax ahead of every deadline.' },
        { lead: 'Specialist positions', text: 'designated zones, imports and the reverse charge, real estate supplies, and voluntary disclosures where an error is found.' },
      ],
      howIntro: 'The how keeps VAT consistent between quarters:',
      how: [
        { lead: 'A VAT calendar.', text: 'Filing and payment dates for every registration, with the return prepared a week ahead so a query can be answered before it is due.', stress: 'a week ahead' },
        { lead: 'Reconciled to the books.', text: 'Output and input tax on the return agree to the VAT control accounts in the ledger, every period, without exception.' },
        { lead: 'Evidence kept.', text: 'Tax invoices, customs documents and contracts are filed with the return they support, ready for an FTA audit.' },
        { lead: 'Advice before the transaction.', text: 'A new supply, a new market or a new entity is reviewed for VAT before the first invoice is raised, not after.' },
      ],
      panel: { title: 'VAT Compliance', sub: 'Registration, returns and advisory tied to the transactions behind them, filed ahead of every deadline.' },
    },
  },
];

export const ACCOUNTING_TAX_SUBS = buildSubs(PARENT, SPECS);
