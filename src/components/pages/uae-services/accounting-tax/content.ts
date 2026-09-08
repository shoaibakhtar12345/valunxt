/**
 * What /en-ae/services/accounting-tax-services/ says.
 *
 * SOURCE — "VALUNXT ACCOUNTING & TAX SERVICES — FINAL DEVELOPMENT-READY PARENT
 * SERVICE PAGE" (20260905). The copy below is that document; nothing here is
 * written or embellished. Where the document gave both a long form and a short
 * card form of the same service, both are kept — the long form is the decision
 * tool's answer, the short form is the card.
 *
 * WHY THIS PAGE HAS ITS OWN CONTENT MODULE. The other five UAE services share
 * ServicePageBody and the five-section shape in ../content.ts. This one is a
 * fifteen-section commercial page with a comparison table, a decision table, a
 * pricing rail and twelve FAQs; expressing it through the shared template would
 * mean bending the template to fit one page and leaving the other five carrying
 * fields they never set.
 *
 * ORDER IS LOAD-BEARING. The document closes with a development instruction:
 * hero, proof, a short problem statement, then THE EIGHT SERVICE CARDS — "the
 * commercial centre of the page" — and "do not allow generic accounting
 * education to push the eight services down the page". The section order in
 * AccountingTaxBody follows that, which is why the problem section is three
 * short blocks and not the essay the source could support.
 *
 * SUB-SERVICE LINKS resolve through vxnServices('en-ae'), so every `slug` below
 * exists in that registry and the eight cards cannot point at a 404.
 */

export interface AtService {
  /** The card's title, and the decision tool's destination label. */
  name: string;
  /** Sub-service slug under /services/accounting-tax-services/. */
  slug: string;
  /** MegaIcon token. */
  icon: string;
  /** The short card headline. */
  cardHead: string;
  /** The short card body. */
  cardText: string;
  /** The long-form promise, used in the expanded detail. */
  head: string;
  /** The long-form body, one paragraph per entry. */
  body: string[];
  bestFor: string;
  outcome: string;
  /** Set where the source carries a scope disclaimer that must travel with it. */
  caveat?: string;
}

export const AT_SERVICES: AtService[] = [
  {
    name: 'Accounting & Bookkeeping',
    slug: 'accounting-bookkeeping',
    icon: 'ledger',
    cardHead: 'Keep Your Books Current',
    cardText:
      'Reliable monthly accounting and reconciliations without building the whole team internally.',
    head: 'Keep Your Books Current Without Building a Full Accounting Team',
    body: [
      'When the books fall behind, reporting, tax and management visibility become harder.',
      'ValuNxt manages day-to-day accounting, reconciliations and financial-record maintenance so the business has a more reliable financial foundation.',
    ],
    bestFor: 'Startups, SMEs and growing businesses needing regular accounting support.',
    outcome: 'Know where the business stands without waiting until year-end.',
  },
  {
    name: 'Part-Time CFO',
    slug: 'cfo-services',
    icon: 'handshake',
    cardHead: 'Get CFO-Level Thinking',
    cardText:
      'Senior financial judgement for cash, growth and bigger management decisions.',
    head: 'Get CFO-Level Thinking Without a Full-Time CFO',
    body: [
      'As a business grows, management starts facing bigger questions around cash, financing, budgets, expansion and financial decisions.',
      'Part-Time CFO support brings senior finance judgement into those conversations without immediately requiring a permanent CFO.',
    ],
    bestFor: 'Businesses that have outgrown basic accounting.',
    outcome: 'Bring senior financial judgement into bigger business decisions.',
  },
  {
    name: 'Management Reporting',
    slug: 'management-reporting',
    icon: 'chart',
    cardHead: 'Turn Numbers Into Decisions',
    cardText:
      'Understand what changed, why it changed and what needs attention next.',
    head: 'Turn Accounting Data Into Decisions',
    body: [
      'Your accounts tell you the result.',
      'Management reporting helps explain what changed, why it changed and what deserves attention next.',
      'ValuNxt turns accounting data into decision-focused financial information for leadership.',
    ],
    bestFor: 'Businesses needing better management visibility.',
    outcome: 'Get financial information early enough to act on.',
  },
  {
    name: 'Budgeting & Forecasting',
    slug: 'budgeting-forecasting',
    icon: 'chart',
    cardHead: 'Plan Before You Commit',
    cardText: 'Build a forward view of revenue, costs, cash and business scenarios.',
    head: 'Stop Managing the Future With Last Month’s Numbers',
    body: [
      'Hiring, expansion, investment and cash decisions happen before the final result is known.',
      'Budgets and forecasts help management understand possible revenue, costs, cash requirements and business scenarios before decisions are locked in.',
    ],
    bestFor: 'Businesses planning growth or major financial decisions.',
    outcome: 'Understand where the business may be heading—not only where it has been.',
  },
  {
    name: 'Financial Statements',
    slug: 'financial-reporting',
    icon: 'document',
    cardHead: 'Financials You Can Rely On',
    cardText:
      'Structured preparation and review of financial statements and supporting schedules.',
    head: 'Financial Statements Management Can Rely On',
    body: [
      'ValuNxt supports the preparation and review of financial statements and supporting schedules based on properly maintained accounting records and applicable reporting requirements.',
    ],
    bestFor:
      'Businesses needing structured financial statements for management and relevant stakeholders.',
    outcome: 'Present the company’s financial position more clearly and consistently.',
  },
  {
    name: 'External Audit Support',
    slug: 'external-audit-support',
    icon: 'shield',
    cardHead: 'Be Ready Before the Audit Starts',
    cardText:
      'Prepare reconciliations, schedules and supporting information before audit pressure begins.',
    head: 'Don’t Start Preparing for the Audit After the Auditor Arrives',
    body: [
      'External audits become harder when reconciliations are unresolved, schedules are incomplete or supporting information is difficult to locate.',
      'ValuNxt sits on your side of the audit process, helping finance prepare schedules, reconciliations and supporting information and manage auditor queries.',
    ],
    bestFor: 'Businesses preparing for an external audit.',
    outcome: 'Reduce last-minute finance disruption and make the audit easier to manage.',
    /* The source states this immediately under the service and again in the
       FAQ. It is a scope limit, not a marketing line, so it travels with the
       service wherever the service is shown. */
    caveat: 'ValuNxt supports the audit. It does not act as the statutory external auditor.',
  },
  {
    name: 'Corporate Tax Filing',
    slug: 'corporate-tax-services',
    icon: 'scales',
    cardHead: 'Start With the Numbers Behind the Return',
    cardText: 'Connect Corporate Tax filing with the financial information underneath it.',
    head: 'Corporate Tax Filing Starts With the Numbers Behind the Return',
    body: [
      'A Corporate Tax Return is not simply a form.',
      'It begins with the financial records and accounting result behind the calculation.',
      'ValuNxt supports preparation, review and filing based on the applicable scope and financial information.',
    ],
    bestFor: 'UAE businesses preparing for Corporate Tax filing.',
    outcome: 'Improve filing preparedness and reduce last-minute Corporate Tax pressure.',
  },
  {
    name: 'VAT Advisory',
    slug: 'vat-services',
    icon: 'ledger',
    cardHead: 'Connect VAT With the Transactions Behind It',
    cardText:
      'Bring greater consistency between accounting records, evidence and VAT reporting.',
    head: 'VAT Compliance Depends on More Than the Return',
    body: [
      'VAT starts with the underlying transactions—sales, purchases, invoices, payments and supporting evidence.',
      'ValuNxt supports VAT compliance and advisory requirements while connecting the VAT position with the accounting records behind it.',
    ],
    bestFor: 'UAE businesses needing VAT compliance or specialist guidance.',
    outcome: 'Improve consistency between transactions, books and VAT reporting.',
  },
];

/* ---- Hero ---------------------------------------------------------------- */

export const AT_HERO = {
  eyebrow: 'Accounting & Tax Services | Dubai, UAE',
  head: 'Accounting & Tax Services in Dubai for Growing Businesses',
  lede: 'From monthly bookkeeping and financial reporting to VAT, Corporate Tax, forecasting and CFO-level support, ValuNxt brings the finance capabilities growing UAE businesses need together under one team.',
  sub: 'Get the books right. Understand the numbers. Plan ahead. Stay tax-ready. Add senior finance support when you need it.',
  chips: ['Fixed-fee scope agreed upfront', 'Bookkeeping from AED 2,000/month'],
  primary: { label: 'Book a Free Consultation', href: '/free-consultation/' },
  secondary: { label: 'Explore Our Services', href: '#at-services' },
};

/* ---- Commercial proof ---------------------------------------------------- */

export const AT_PROOF: { label: string; note: string; icon: string }[] = [
  { label: 'Fixed-fee scope', note: 'Agreed before work begins', icon: 'ledger' },
  { label: 'Dubai-based', note: 'Supporting businesses across the UAE', icon: 'globe' },
  {
    label: 'Accounting + tax + reporting',
    note: 'Connected finance capability',
    icon: 'chart',
  },
  {
    label: 'Senior finance support',
    note: 'Available as your needs grow',
    icon: 'handshake',
  },
];

/* ---- The problem --------------------------------------------------------- */

export const AT_PROBLEM = {
  head: 'Your finance function should do more than record transactions',
  lede: 'Your business makes decisions every day.',
  questions: [
    'Can we afford to hire?',
    'Why did margins fall?',
    'Who still owes us money?',
    'Where is cash going?',
    'What will the next six months look like?',
    'Are our numbers ready for VAT, Corporate Tax or audit?',
  ],
  turn: 'If accounting only tells management what happened months ago, the finance function is not doing enough.',
  ladder: [
    { k: 'Accounting', v: 'gives you the foundation.' },
    { k: 'Reporting', v: 'helps you understand performance.' },
    { k: 'Forecasting', v: 'helps you look ahead.' },
    { k: 'Tax support', v: 'helps keep the business prepared.' },
    { k: 'CFO support', v: 'brings senior financial judgement into bigger decisions.' },
  ],
  close:
    'Accounting tells you what happened. A strong finance function helps you decide what to do next.',
};

/* ---- Decision tool ------------------------------------------------------- */

export const AT_DECISION: { says: string; slug: string; label: string }[] = [
  {
    says: '“We need someone to manage our books each month.”',
    slug: 'accounting-bookkeeping',
    label: 'Accounting & Bookkeeping Outsourcing',
  },
  { says: '“We need senior finance guidance.”', slug: 'cfo-services', label: 'Part-Time CFO' },
  {
    says: '“Management needs better numbers.”',
    slug: 'management-reporting',
    label: 'Management Reporting',
  },
  {
    says: '“We need to plan the next 6–12 months.”',
    slug: 'budgeting-forecasting',
    label: 'Budgeting & Forecasting',
  },
  {
    says: '“We need reliable financial statements.”',
    slug: 'financial-reporting',
    label: 'Financial Statement Preparation & Review',
  },
  {
    says: '“An external audit is coming.”',
    slug: 'external-audit-support',
    label: 'External Audit Support',
  },
  {
    says: '“We need Corporate Tax filing support.”',
    slug: 'corporate-tax-services',
    label: 'Corporate Tax Return Filing',
  },
  {
    says: '“We need VAT advice or compliance support.”',
    slug: 'vat-services',
    label: 'VAT Advisory',
  },
];

/* ---- The finance journey ------------------------------------------------- */

export const AT_JOURNEY: { stage: string; head: string; service: string; note: string }[] = [
  {
    stage: 'Foundation',
    head: 'Get the Books Right',
    service: 'Accounting & Bookkeeping',
    note: 'Reliable accounting creates the financial foundation.',
  },
  {
    stage: 'Visibility',
    head: 'Understand Performance',
    service: 'Financial Statements + Management Reporting',
    note: 'Turn the records into clearer information about performance.',
  },
  {
    stage: 'Planning',
    head: 'Look Ahead',
    service: 'Budgeting & Forecasting',
    note: 'Use the financial foundation to plan revenue, spending and cash requirements.',
  },
  {
    stage: 'Leadership',
    head: 'Support Bigger Decisions',
    service: 'Part-Time CFO',
    note: 'Bring senior financial judgement into management decisions.',
  },
];

export const AT_JOURNEY_RAIL = {
  kicker: 'Running alongside the entire finance process',
  head: 'VAT + Corporate Tax',
  body: [
    'Tax requirements do not begin after a business reaches a particular finance stage.',
    'They can run alongside the financial process from the underlying transaction and accounting record through reporting, planning and filing.',
  ],
  close: 'One Financial Foundation. More Capability as You Grow.',
};

/* ---- Tax position -------------------------------------------------------- */

export const AT_TAX = {
  head: "Your tax position starts with your accounting",
  /* The source states these as five sentences:
       "VAT starts with transactions."
       "Corporate Tax starts with financial information."
       "Financial statements depend on the books."
       "Management reports use the same underlying numbers."
       "Audit support relies on the records and evidence behind them."
     They are split into subject / link / source because the page draws them as
     a dependency map — five things and the one place each of them starts —
     rather than setting them as a list of sentences. Recombining a row in
     order gives the sentence back verbatim. */
  points: [
    { subject: "VAT", link: "starts with", source: "transactions" },
    { subject: "Corporate Tax", link: "starts with", source: "financial information" },
    { subject: "Financial statements", link: "depend on", source: "the books" },
    { subject: "Management reports", link: "use", source: "the same underlying numbers" },
    {
      subject: "Audit support",
      link: "relies on",
      source: "the records and evidence behind them",
    },
  ],
  body: [
    "These are connected finance processes.",
    "The stronger the financial foundation, the easier it becomes to report, review and manage everything built on top of it.",
  ],
  close:
    "Tax Compliance Doesn’t Start With the Return. It Starts With the Records Behind It.",
};

/* ---- Why VALUNXT --------------------------------------------------------- */

export const AT_WHY: { head: string; body: string[] }[] = [
  {
    head: 'One Finance Partner',
    body: [
      'Accounting, reporting, VAT, Corporate Tax and CFO-level support available through one wider team.',
    ],
  },
  {
    head: 'Start Small. Scale the Scope.',
    body: [
      'Begin with bookkeeping. Add reporting. Forecasting. Tax support. Finance leadership.',
      'Use the capability your business needs as it grows.',
    ],
  },
  {
    head: 'Management Insight, Not Just Data Entry',
    body: [
      'The objective is not simply to record transactions.',
      'It is to create reliable financial information management can actually use.',
    ],
  },
  {
    head: 'Senior Finance Capability',
    body: ['Access deeper finance expertise when business questions become more complex.'],
  },
  {
    head: 'Fixed-Fee Scope',
    body: ['Agree the deliverables and commercial scope before the engagement begins.'],
  },
  {
    head: 'Technology-Enabled',
    body: ['ValuNxt works with commonly used accounting systems.'],
  },
];

export const AT_SYSTEMS = ['Zoho Books', 'QuickBooks', 'Xero', 'Odoo', 'Tally'];

export const AT_WHY_CLOSE = 'One Finance Partner—from Bookkeeping to Boardroom Decisions.';

/* ---- Comparison ---------------------------------------------------------- */

export const AT_COMPARE = {
  head: 'Basic accounting support vs an integrated finance partner',
  columns: ['Capability', 'Basic Accounting Support', 'ValuNxt Integrated Finance Support'],
  rows: [
    ['Bookkeeping', 'Core service', 'Available'],
    ['Reconciliations', 'Core service', 'Available'],
    ['Financial statements', 'Scope dependent', 'Dedicated capability'],
    ['Management reporting', 'Additional capability required', 'Available'],
    ['Budgeting & forecasting', 'Additional capability required', 'Available'],
    ['VAT', 'Specialist support may be required', 'Available'],
    ['Corporate Tax', 'Specialist support may be required', 'Available'],
    ['Audit preparation', 'Scope dependent', 'External Audit Support'],
    ['CFO support', 'Outside basic accounting', 'Part-Time CFO available'],
    ['Scalability', 'Accounting-focused', 'Capability can expand with the business'],
  ],
  close: 'The Difference Is What Happens After the Books Are Done.',
  note: [
    'The right finance partner should not force the business to buy services it does not need.',
    'But when management needs more than bookkeeping, the capability should be available.',
  ],
};

/* ---- Commercial options -------------------------------------------------- */

export const AT_OPTIONS: {
  label: string;
  price: string;
  note: string;
  cta: string;
  href: string;
}[] = [
  {
    label: 'Accounting & Bookkeeping',
    price: 'From AED 2,000/month',
    note: 'For businesses needing reliable outsourced monthly accounting.',
    cta: 'Explore Accounting & Bookkeeping',
    href: '/services/accounting-tax-services/accounting-bookkeeping/',
  },
  {
    label: 'Reporting & Forecasting',
    price: 'Request Fixed-Fee Pricing',
    note: 'For Financial Statements, Management Reporting and Budgeting & Forecasting.',
    cta: 'Discuss Your Reporting Needs',
    href: '/free-consultation/',
  },
  {
    label: 'VAT & Corporate Tax',
    price: 'Request Scope & Pricing',
    note: 'For VAT Advisory and Corporate Tax Return Filing.',
    cta: 'Discuss Your Tax Requirements',
    href: '/free-consultation/',
  },
  {
    label: 'Part-Time CFO',
    price: 'Custom Fixed-Fee Scope',
    note: 'For businesses requiring senior finance leadership.',
    cta: 'Discuss CFO Support',
    href: '/free-consultation/',
  },
];

/* ---- Capability without headcount ---------------------------------------- */

export const AT_CAPABILITY = {
  head: 'Build more finance capability without building the whole team',
  lede: 'A growing company may need:',
  roles: [
    'A bookkeeper.',
    'An accountant.',
    'Management reporting.',
    'Tax expertise.',
    'Forecasting.',
    'CFO-level input.',
  ],
  body: [
    'It may not need six separate permanent hires.',
    'Outsourcing can allow a growing business to access the finance capability it needs now and add deeper expertise when the business requires it.',
  ],
  close: ['Start with the problem you need solved today.', 'Add capability as the business grows.'],
  cta: { label: 'Discuss Your Finance Setup', href: '/free-consultation/' },
};

/* ---- Industries ---------------------------------------------------------- */

export const AT_INDUSTRIES: { head: string; body: string[] }[] = [
  {
    head: 'Real Estate & Construction',
    body: [
      'Projects, suppliers, subcontractors and long payment cycles can create significant financial complexity.',
      'ValuNxt supports accounting, reporting, cash visibility, forecasting and tax requirements around these moving parts.',
    ],
  },
  {
    head: 'Trading & Import / Export',
    body: [
      'Supplier balances, customer credit and working-capital requirements can make financial visibility critical.',
      'ValuNxt helps connect accounting, tax and reporting so management can understand what is owed, what is due and where cash is committed.',
    ],
  },
  {
    head: 'F&B & Hospitality',
    body: [
      'High transaction volumes, payroll, supplier costs and tight margins make timely financial information important.',
      'ValuNxt supports bookkeeping, VAT, reporting and wider financial visibility.',
    ],
  },
  {
    head: 'Technology & Startups',
    body: [
      'Fast-growing companies can scale faster than their finance processes.',
      'Start with reliable books and add reporting, forecasting and CFO-level support as the business grows.',
    ],
  },
  {
    head: 'Retail & E-Commerce',
    body: [
      'Sales, collections, refunds and large transaction volumes can create reconciliation complexity.',
      'Structured accounting and reporting help management maintain a clearer financial picture.',
    ],
  },
  {
    head: 'Professional Services',
    body: [
      'Consultancies, agencies and professional firms need visibility into billing, collections, project profitability, payroll and cash.',
      'ValuNxt helps turn those records into useful management information.',
    ],
  },
];

/* ---- Process ------------------------------------------------------------- */

export const AT_PROCESS: { head: string; note: string }[] = [
  {
    head: 'Understand',
    note: 'We review the current finance setup, systems and the problem management needs solved.',
  },
  {
    head: 'Scope',
    note: 'We agree what ValuNxt will manage and what remains with the internal team.',
  },
  { head: 'Onboard', note: 'Access, records, responsibilities and workflows are established.' },
  { head: 'Deliver', note: 'ValuNxt runs the agreed Accounting, Reporting, Tax or finance scope.' },
  { head: 'Scale', note: 'Add additional finance capability when the business requires it.' },
];

export const AT_PROCESS_RAIL = [
  'Accounting',
  'Reporting',
  'Tax',
  'Forecasting',
  'CFO',
];

/* ---- FAQ ----------------------------------------------------------------- */

/**
 * How many of the twelve the page shows.
 *
 * The source lists twelve; eight is what the page renders, so the block stays
 * a scannable column rather than a second document. All twelve stay in this
 * file — they are the client's copy, they are the natural source for FAQ
 * structured data later, and re-adding one is changing this number.
 *
 * The four below the line are the four whose answer the page already gives in
 * full: Management Reporting, Budgeting & Forecasting, Financial Statements
 * and External Audit Support each have a card in the eight-service grid
 * carrying the same "what it is / best for / outcome". The eight kept are the
 * ones the grid does NOT answer — scope, price, how to start, working with an
 * existing accountant — plus Corporate Tax and VAT, which are half the page's
 * subject and would be odd to leave out.
 */
export const AT_FAQ_SHOWN = 8;

export const AT_FAQ: { q: string; a: string[] }[] = [
  {
    q: 'What Accounting and Tax services does ValuNxt provide?',
    a: [
      'ValuNxt provides Accounting & Bookkeeping Outsourcing, Part-Time CFO Services, Management Reporting, Budgeting & Forecasting, Financial Statement Preparation & Review, External Audit Support, Corporate Tax Return Filing and VAT Advisory.',
    ],
  },
  {
    q: 'Can ValuNxt manage our accounting and tax together?',
    a: [
      'Yes. Accounting, VAT and Corporate Tax support can be coordinated through ValuNxt so the tax work remains connected with the underlying financial records.',
    ],
  },
  {
    q: 'How much does accounting cost in Dubai?',
    a: [
      'Pricing depends on transaction volume, complexity and scope. ValuNxt currently publishes Accounting & Bookkeeping from AED 2,000 per month, subject to the agreed engagement.',
    ],
  },
  {
    q: 'Can we outsource only bookkeeping?',
    a: [
      'Yes. A business can begin with Accounting & Bookkeeping Outsourcing without taking additional services and expand the scope later if needed.',
    ],
  },
  {
    q: 'Can ValuNxt work with our existing accountant?',
    a: [
      'Yes. The engagement can be structured around the capability already available internally, with ValuNxt providing specialist reporting, tax or senior finance support.',
    ],
  },
  {
    q: 'What does a Part-Time CFO do?',
    a: [
      'A Part-Time CFO provides senior finance support across areas such as cash-flow planning, budgeting, forecasting, financing discussions, management reporting and strategic financial decisions.',
    ],
  },
  {
    q: 'Do you provide Corporate Tax Return Filing?',
    a: [
      'Yes. ValuNxt supports the preparation, review and filing of UAE Corporate Tax Returns within the agreed engagement scope.',
    ],
  },
  {
    q: 'Can you help with VAT?',
    a: [
      'Yes. VAT Advisory covers compliance and advisory requirements while connecting VAT treatment with the accounting records and transactions behind it.',
    ],
  },
  /* ---- Below AT_FAQ_SHOWN: kept for structured data and for swapping in.
     Each of these four is answered in full by its own card in the eight-service
     grid above, which is why these are the four that came out. ---- */
  {
    q: 'What is Management Reporting?',
    a: [
      'Management Reporting converts accounting information into decision-focused reports for leadership. Depending on scope, this can include management accounts, cash flow, KPIs, budget comparisons, profitability analysis and commentary.',
    ],
  },
  {
    q: 'Do you provide Budgeting & Forecasting?',
    a: [
      'Yes. ValuNxt provides Budgeting & Forecasting support to help management plan expected revenue, costs, cash requirements and financial scenarios.',
    ],
  },
  {
    q: 'Can ValuNxt help prepare financial statements?',
    a: [
      'Yes. ValuNxt provides Preparation & Review of Financial Statements based on the underlying accounting records and relevant reporting requirements.',
    ],
  },
  {
    q: 'Can ValuNxt support us during an external audit?',
    a: [
      'Yes. ValuNxt provides External Audit Support including audit-file preparation, reconciliations, schedules and auditor-query management.',
      'ValuNxt supports the company through the audit. It does not act as the statutory external auditor.',
    ],
  },
];

/* ---- Lead form -----------------------------------------------------------
   The source's own field list. It posts to /form-handler/ like every other
   form on the site: that route matches lead fields by SUFFIX (full_name,
   _email, phone, company), so the `at_` prefix is enough to keep these fields
   distinct from the Contact and Free Consultation forms while still being
   recognised and written to the enquiries table. */

export const AT_FORM = {
  head: 'Tell us what you need help with',
  /* Read by SOURCE_MAP in the form handler, which turns it into the `source`
     column the enquiries desk sorts on. */
  formId: 'accounting-tax',
  fields: [
    { id: 'at_full_name', label: 'Name', type: 'text', required: true },
    { id: 'at_email', label: 'Work Email', type: 'email', required: true },
    { id: 'at_phone', label: 'Phone', type: 'tel', required: true },
    { id: 'at_company', label: 'Company Name', type: 'text', required: false },
  ],
  serviceLabel: 'Service Required',
  serviceOptions: [
    'Accounting & Bookkeeping',
    'Part-Time CFO',
    'Management Reporting',
    'Budgeting & Forecasting',
    'Financial Statements',
    'External Audit Support',
    'Corporate Tax Return Filing',
    'VAT Advisory',
    'Not Sure / Need Guidance',
  ],
  messageLabel: 'Message',
  button: 'Speak to a Finance Adviser',
};

/* ---- Closing ------------------------------------------------------------- */

export const AT_CLOSE = {
  head: 'Start with the finance problem you need solved today.',
  lede: 'Whether you need monthly bookkeeping, better management information, help planning ahead, VAT or Corporate Tax support, audit preparation or CFO-level guidance, ValuNxt can help identify the right place to start.',
  primary: { label: 'Book a Free Accounting & Tax Consultation', href: '/free-consultation/' },
  secondary: { label: 'Explore Our Services', href: '#at-services' },
  tertiary: { label: 'Request Fixed-Fee Pricing', href: '/contact/' },
  /* The source's final positioning block, kept as the last thing on the page. */
  positioning: [
    'Accounting is the foundation.',
    'Reporting creates visibility.',
    'Forecasting helps you plan.',
    'Tax runs through the financial process.',
    'CFO support helps management decide what comes next.',
  ],
  positioningClose: 'One Finance Partner—from Bookkeeping to Boardroom Decisions.',
};
