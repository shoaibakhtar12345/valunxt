/**
 * The five pages under /en-ae/services/technology-data-ai/.
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
import { TECHNOLOGY_TEMPLATE } from './content';

const PARENT: SubParent = {
  service: 'technology-data-ai',
  crumb: 'Technology & AI',
  hero: { image: TECHNOLOGY_TEMPLATE.hero.image, alt: TECHNOLOGY_TEMPLATE.hero.alt },
  panel: PANEL_PLATE,
  why: {
    pill: 'Why us?',
    titleTop: 'Technology in',
    titleMid: 'Service of the',
    titleMark: 'Business Case',
    note: 'Measured on outcomes, not activity, and built by people who close books.',
    cta: { label: 'Schedule a Call', href: '/free-consultation/' },
    ...WHY_PHOTO,
  },
  approach: {
    eyebrow: 'Our approach',
    columns: [
      {
        title: 'Finance-grade discipline',
        body:
          'The people who design your systems are the people who will be asked to close on them. ' +
          'Chart of accounts, controls, audit trail and reporting are designed by accountants ' +
          'first, which is why the ERP we implement produces a set of books an auditor can test.',
      },
      {
        title: 'Cloud, with governance',
        body:
          'Moving a core system to the cloud is easy; keeping the data governed once it is there ' +
          'is not. Access, retention, residency and change control are set up as they would be ' +
          'for a financial system — because that is what it is.',
      },
      {
        title: 'Measured on outcomes',
        body:
          'Every engagement starts with the hours, errors or decisions it is meant to change, ' +
          'quantified, and ends with the same measures taken again. Activity is not an outcome, ' +
          'and a dashboard nobody reads is not a result.',
      },
    ],
  },
  insights: {
    title: 'Systems That Finance Can Stand Behind',
    lede:
      'Technology earns its place where it changes a decision or a number. Explore our latest ' +
      'thinking on data, valuation models and the systems behind property and finance in the UAE.',
    all: { label: 'Learn more', href: '/blogs/' },
    cards: SITE_ARTICLES,
  },
  story: {
    ...STORY_PHOTO,
    alt: 'A finance lead reviewing a dashboard',
    quote:
      'Month-end used to run on eleven spreadsheets. VALUNXT moved us to a cloud ERP with a ' +
      'dashboard the board actually reads, and the close came down to four days.',
    initials: 'NP',
    role: 'Chief operating officer',
    org: 'Dubai trading group',
    pill: 'Success story',
    title: 'From Eleven Spreadsheets to One Dashboard',
    stat: '4 days',
    note: 'to a full month-end close, on a cloud ERP with governed data behind every number.',
    cta: { label: 'Discuss Your Case', href: '/free-consultation/' },
    arrow: { href: '/services/technology-data-ai/', label: 'More about Technology & AI' },
  },
  band: {
    ...BAND_PHOTO,
    title: 'VALUNXT Finance Intelligence',
    body:
      'Working with the group’s accountants, valuers and research team, VALUNXT turns a ' +
      'technology roadmap into systems finance can stand behind — governed, measured and built ' +
      'around the business case.',
    cta: { label: "Discover what's next", href: '/services/accounting-tax-services/' },
  },
  vision: SHARED_VISION,
  strip: stripOf('technology-data-ai', [
    'Technology Consulting',
    'AI Solutions',
    'ERP Dashboards',
    'PropTech',
    'Enterprise Solutions',
    'Cloud Migration',
  ]),
  talk: {
    head: TECHNOLOGY_TEMPLATE.close.head,
    lede: TECHNOLOGY_TEMPLATE.close.lede,
    cta: TECHNOLOGY_TEMPLATE.close.primary,
    image: TECHNOLOGY_TEMPLATE.close.image,
  },
};

const SPECS: SubSpec[] = [
  {
    slug: 'technology-consulting',
    title: 'Technology Consulting',
    lede:
      'We help businesses decide what technology to buy, build and change before the money is spent: strategy, system selection and a roadmap written around the business case. Whether you are replacing an ERP, planning a move to the cloud or working out where AI would actually help, we bring finance-grade discipline to a decision that is usually made on a vendor’s demo.',
    brief: {
      lede:
        'We partner with owners and management teams to make technology serve the business rather than the other way round. The approach is built on consulting engagements delivered for UAE businesses moving off spreadsheets and legacy systems, which has shown that the expensive mistakes are made before the contract is signed — in requirements never written and options never compared.',
      whatIntro: 'The what sets out what a technology decision has to be built on, including:',
      what: [
        { lead: 'Requirements, written', text: 'what the business needs the system to do — processes, reports, integrations, controls — captured from the people who will use it.', stress: 'captured from the people who will use it' },
        { lead: 'Options compared', text: 'platforms and vendors assessed against those requirements on cost, fit and risk, on one scorecard.' },
        { lead: 'The business case', text: 'total cost over five years against the measurable gains, so the decision is made on value rather than on features.' },
        { lead: 'A roadmap', text: 'sequenced, resourced and dated, with the dependencies and the points at which the plan should be re-checked.' },
      ],
      howIntro: 'The how keeps the advice independent and the plan honest:',
      how: [
        { lead: 'No vendor ties.', text: 'We sell no software and take no commission, so the recommendation is the one that fits.', stress: 'We sell no software' },
        { lead: 'Finance in the room.', text: 'The group’s accountants and CFOs review the controls, reporting and data the system will have to support.' },
        { lead: 'Governance set up.', text: 'Ownership, decision rights and a steering rhythm agreed before implementation begins.' },
        { lead: 'Review points built in.', text: 'The roadmap re-tested at each milestone against the business case it was built on.' },
      ],
      panel: { title: 'Technology Strategy', sub: 'Strategy, selection and roadmaps for finance and operations systems, written around the business case.' },
    },
  },
  {
    slug: 'ai-solutions',
    title: 'AI Solutions',
    lede:
      'We apply machine learning and automation where a process is repetitive, document-heavy or data-rich — reconciliation, forecasting, invoice processing, reporting, document review — and nowhere it does not pay. Whether you want to automate a finance routine or add prediction to a decision, we bring a business case first, a pilot second and a production system only when the pilot has earned it.',
    brief: {
      lede:
        'We partner with businesses to put AI to work on the problems that cost them time and money today. The approach is built on solutions delivered into UAE finance, property and operations teams, which has shown that the value is in the unglamorous processes — matching, classifying, extracting, forecasting — and that a model is only as good as the data and the controls around it.',
      whatIntro: 'The what sets out where AI earns its place, including:',
      what: [
        { lead: 'Automation', text: 'invoice capture, bank matching, expense coding and document extraction, with the exceptions routed to a person.', stress: 'the exceptions routed to a person' },
        { lead: 'Forecasting', text: 'cash, demand and pricing models trained on your own history and tested against what actually happened.' },
        { lead: 'Analysis and search', text: 'assistants that read your documents, contracts and data and answer with the source shown.' },
        { lead: 'Property applications', text: 'valuation support, comparable matching and portfolio monitoring, built with the group’s valuers.' },
      ],
      howIntro: 'The how keeps AI accountable:',
      how: [
        { lead: 'Business case before build.', text: 'The hours, errors or decisions the solution will change quantified first, and measured after.', stress: 'quantified first, and measured after' },
        { lead: 'Pilot, then scale.', text: 'A bounded pilot on real data with a success threshold agreed in advance; production only when it is met.' },
        { lead: 'Data governed.', text: 'Access, retention, residency and the human review points documented, so the system passes an audit.' },
        { lead: 'Your team trained.', text: 'The people who run the process learn to run the system, with the model’s limits explained plainly.' },
      ],
      panel: { title: 'Applied AI', sub: 'Machine learning and automation on reporting, forecasting and document-heavy processes, with a business case first.' },
    },
  },
  {
    slug: 'erp-dashboards',
    title: 'ERP Dashboards',
    lede:
      'We build management dashboards on top of ERP and accounting data so leadership sees one version of the numbers: cash, margin, sales, operations and the KPIs that drive them, live and reconciled to the ledger. Whether your data sits in one system or five, we bring the model that joins it, the controls that keep it right and the visuals that make it read.',
    brief: {
      lede:
        'We partner with finance and management teams to make the numbers visible without a spreadsheet in between. The approach is built on dashboards delivered over ERP, accounting and operational systems for UAE businesses, which has shown that a dashboard is trusted only when every figure on it can be traced back to the ledger it came from.',
      whatIntro: 'The what sets out what a dashboard has to be built on, including:',
      what: [
        { lead: 'A data model', text: 'that joins ERP, accounting, CRM and operational sources on agreed definitions, so revenue means the same thing on every page.', stress: 'on agreed definitions' },
        { lead: 'Reconciliation', text: 'dashboard totals agreed to the ledger and the source systems automatically, with breaks flagged rather than hidden.' },
        { lead: 'The right measures', text: 'the KPI set management already reports on, plus the drivers beneath them, designed with the people who will read it.' },
        { lead: 'Drill-down', text: 'from a board number to the transactions behind it, so a question is answered on the screen rather than in a meeting.' },
      ],
      howIntro: 'The how keeps the dashboard right after launch:',
      how: [
        { lead: 'Finance-grade controls.', text: 'Refresh schedules, access rights and change control set up as they would be for a financial system, because it is one.', stress: 'because it is one' },
        { lead: 'Built on your platform.', text: 'Power BI, Tableau or the ERP’s own tools — whichever your team can own — rather than something only we can run.' },
        { lead: 'Handed over documented.', text: 'Definitions, data lineage and the model itself documented, so a new analyst can maintain it.' },
        { lead: 'Iterated with use.', text: 'A review after the first month of reading, and the pages reshaped around the questions actually asked.' },
      ],
      panel: { title: 'One Version of the Numbers', sub: 'Management dashboards on ERP and accounting data, reconciled to the ledger and built to be read.' },
    },
  },
  {
    slug: 'proptech',
    title: 'PropTech',
    lede:
      'We build and select data and tooling for property businesses: portfolio and lease management, valuation and comparable databases, transaction pipelines and the analytics that connect them. Whether you manage a portfolio, run a development pipeline or advise on transactions, we bring technology shaped by people who value, research and transact property every day.',
    brief: {
      lede:
        'We partner with owners, developers and advisers to run property on data rather than on files and memory. The approach is built on tooling delivered for UAE portfolios and property businesses, which has shown that property data is scattered — registries, leases, valuations, listings — and that the value is in connecting it reliably before anything is built on top.',
      whatIntro: 'The what covers what property technology has to join up, including:',
      what: [
        { lead: 'Portfolio and leases', text: 'assets, units, leases, rent schedules and expiries in one structured record, with the documents attached.', stress: 'in one structured record' },
        { lead: 'Valuation and comparables', text: 'evidence databases and valuation workflows built with the group’s RICS-regulated valuers.' },
        { lead: 'Transactions', text: 'pipeline, offers, diligence checklists and completion tracking for buy-side and sell-side work.' },
        { lead: 'Market data feeds', text: 'registry, listing and research data integrated and refreshed, so the portfolio is read against the market.' },
      ],
      howIntro: 'The how delivers tools the business actually uses:',
      how: [
        { lead: 'Practitioners in the design.', text: 'Valuers, researchers and transaction advisers from the group specify the workflows, not a generic template.', stress: 'specify the workflows' },
        { lead: 'Build or buy, decided honestly.', text: 'Existing platforms assessed first; we build only where nothing fits.' },
        { lead: 'Data cleaned first.', text: 'Records migrated, de-duplicated and verified before go-live, so the system starts trustworthy.' },
        { lead: 'Reporting built in.', text: 'Portfolio dashboards, rent rolls and valuation summaries delivered from the same data, reconciled.' },
      ],
      panel: { title: 'PropTech', sub: 'Data and tooling for portfolios, valuations and transactions, built by people who work in property.' },
    },
  },
  {
    slug: 'enterprise-solutions',
    title: 'Enterprise Solutions',
    lede:
      'We implement and migrate ERP, accounting and core business systems — to the cloud, with governed data and finance-grade discipline. Whether you are moving off spreadsheets, replacing a legacy system or consolidating several entities onto one platform, we bring selection, configuration, data migration and change management run to a plan, on a fixed scope and fee.',
    brief: {
      lede:
        'We partner with growing businesses to put core systems in place that finance can stand behind. The approach is built on implementations delivered for UAE groups across trading, services and property, which has shown that an ERP project succeeds or fails on three things — the chart of accounts, the data migrated and the people trained — long before the go-live date.',
      whatIntro: 'The what sets out what an enterprise implementation has to get right, including:',
      what: [
        { lead: 'Design before configuration', text: 'chart of accounts, entities, dimensions, approvals and reports designed with finance, so the system reports the way the business is run.', stress: 'designed with finance' },
        { lead: 'Data migration', text: 'opening balances, master data and open items cleaned, reconciled and signed off before go-live, not after.' },
        { lead: 'Integrations', text: 'banking, payroll, CRM, e-commerce and the FTA’s portals connected with controls, not manual re-keying.' },
        { lead: 'Controls and audit trail', text: 'segregation of duties, approvals and logs configured to the standard an auditor will test.' },
      ],
      howIntro: 'The how brings the system live without breaking the month:',
      how: [
        { lead: 'Fixed scope and fee.', text: 'Scope, timeline and fee agreed before the project starts, with change handled by agreement rather than by invoice.', stress: 'agreed before the project starts' },
        { lead: 'Parallel run.', text: 'A period on both systems with the results reconciled, so go-live is a decision made on evidence.' },
        { lead: 'Training that sticks.', text: 'Role-based training on your data and your processes, with a support desk through the first two closes.' },
        { lead: 'Finance in the team.', text: 'The group’s accountants configure and test the finance modules, because they will be asked to close on them.' },
      ],
      panel: { title: 'Core Systems', sub: 'ERP, accounting and core systems implemented or migrated to the cloud, with governed data and a fixed fee.' },
    },
  },
];

export const TECHNOLOGY_SUBS = buildSubs(PARENT, SPECS);
