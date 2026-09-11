/**
 * "Valunxt Answer", the ask-and-answer band on /en-ae/ (20260911).
 *
 * Modelled on "BCG Answer", the promo on bcg.com's home page: an eyebrow, a
 * display title, a lede and a call to action on the left, and on the right a
 * 16:9 visual of a question being asked and answered. The measurements are in
 * the stylesheet (section 17 of assets/css/valunxt-landing.css) and the visual
 * itself, with its timeline, is UaeAnswerVisual.tsx. This file is the section's
 * copy and the six scenes the visual plays, one per service.
 *
 * THE COPY IS NOT THE CLIENT'S. Every other band on this page carries the home
 * document word for word; this band was asked for after that document was
 * written, so its eyebrow, title, lede, button and the six questions are
 * drafted here, in the document's register, to be replaced when the client
 * supplies theirs (QUESTIONS and the four strings in the JSX below are the
 * whole of it). Everything else the visual shows is the registry's: each
 * answer is the service's own accordion sentence, the list under it names the
 * service's first three pages, the four cards are those pages and the service
 * itself, and the closing card is the service's headline, its accordion
 * sentence and the names of all its pages. (The hero sentence was the card's
 * second paragraph at first; for accounting it opens with the same nine words
 * as the first, so the page list took its place.) No em dashes, as on every
 * UAE page: plain() turns any that reach it into a comma.
 *
 * WHERE IT SITS. After the six services and before the impact strip, because
 * every question it answers is one of theirs. India renders nothing of this.
 */
import { rurl, vxnServiceName, vxnServices } from '@/lib/region';
import { rimg, rimgFirst } from '@/lib/region-assets';

import UaeAnswerVisual, { type AnswerScene } from './UaeAnswerVisual';

/** One question a visitor might type, per service. Drafted, see above. */
const QUESTIONS: Record<string, string> = {
  'accounting-tax-services': 'Is my business ready for UAE Corporate Tax?',
  'real-estate-transactions': 'Is now the right time to buy property in Dubai?',
  'mortgages-services': 'Can a non-resident get a mortgage in the UAE?',
  'valuation-and-advisory': 'What is my business actually worth today?',
  'research-intelligence': 'Is my project feasible in today’s market?',
  'technology-data-ai': 'How do we turn our data into better decisions?',
};

/**
 * Thumbnails for the three page cards under each service, in the order the
 * registry lists the pages. Photographs already in uploads; the service's own
 * picture is the fourth card and the fallback for anything missing here.
 */
const THUMBS: Record<string, string[]> = {
  /* Bookkeeping: a desk with a tablet and a pen. CFO: a presentation of the
     figures. Reporting: a dashboard on a tablet. */
  'accounting-tax-services': ['new-folder/client-1.webp', 'new-folder/client-success-2.webp', 'new-folder/services-4.webp'],
  /* Buy: the Dubai skyline. Sell and rent: a tower. Off plan: a facade. */
  'real-estate-transactions': ['new-folder/dubai.webp', 'new-folder/who-we-are-3.webp', 'blogs/blog-1.webp'],
  /* Residential: the group's mortgage desk. Commercial: a handshake.
     Pre-approval: an adviser with a client. */
  'mortgages-services': ['new-folder/houzzhunt-mortgage-1.webp', 'new-folder/who-we-are-1.webp', 'new-folder/home-banner.webp'],
  /* Business: the group's valuation firm. Company: figures on a tablet.
     Plant and machinery: an industrial abstract. */
  'valuation-and-advisory': ['new-folder/reliant-surveyors-1.webp', 'homepage/capital.webp', 'blogs/blog-3.webp'],
  /* Real estate research: a city at night. Market and investment research:
     analysts at their screens. */
  'research-intelligence': ['homepage/Core-Markets.webp', 'new-folder/research-intelligence-1.webp', 'new-folder/research-intelligence-2.webp'],
  /* Consulting: a dashboard in hand. AI: server racks. ERP: charts. */
  'technology-data-ai': ['new-folder/technology-ai-1.webp', 'homepage/industry-3.webp', 'new-folder/services-2.webp'],
};

/**
 * Registry strings are authored for <Html> and may carry entities; the visual
 * renders text, so they are decoded here. The dash rule is applied at the
 * same time: an em or en dash, entity or character, becomes a comma.
 */
function plain(v: string | undefined): string {
  return String(v ?? '')
    .replace(/\s*(?:&mdash;|&#8212;|&ndash;|&#8211;|—|–)\s*/g, ', ')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/&rsquo;|&#8217;/g, '’')
    .replace(/&lsquo;|&#8216;/g, '‘')
    .replace(/&ldquo;|&#8220;/g, '“')
    .replace(/&rdquo;|&#8221;/g, '”')
    .replace(/<[^>]+>/g, '');
}

export default function UaeAnswerBand({ region }: { region: string }) {
  const scenes: AnswerScene[] = vxnServices(region).map((sv) => {
    const slug = sv.slug ?? sv.href;
    const name = vxnServiceName(sv);
    const short = plain(sv.short);
    const picture = rimg(region, sv.img.replace('/assets/content/uploads/', ''));
    const pages = (sv.subs ?? []).slice(0, 3);
    const thumbs = THUMBS[slug] ?? [];
    /* "Includes A, B and C.": the service's pages, in the registry's order. */
    const names = (sv.subs ?? []).map((p) => p.name);
    const includes =
      names.length > 1
        ? `Includes ${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}.`
        : names.length === 1
          ? `Includes ${names[0]}.`
          : '';

    return {
      key: slug,
      question: QUESTIONS[slug] ?? `What can ${name} do for my business?`,
      answer: plain(sv.desc),
      label: 'Where to start:',
      starts: pages.map((p) => p.name),
      tiles: [
        ...pages.map((p, i) => ({
          kind: short,
          title: p.name,
          href: rurl(region, `${sv.href}${p.slug}/`),
          img: thumbs[i] ? rimgFirst(region, [thumbs[i], sv.img.replace('/assets/content/uploads/', '')]) : picture,
        })),
        { kind: 'Service', title: name, href: rurl(region, sv.href), img: picture },
      ],
      card: {
        chip: short,
        title: plain(sv.headline) || name,
        href: rurl(region, sv.href),
        img: picture,
        alt: name,
        paras: [plain(sv.desc), includes].filter(Boolean),
      },
    };
  });

  return (
    <section className="vxn-answer" aria-labelledby="vxn-answer-title">
      <div className="vxn-answer__inner">
        <div className="vxn-answer__copy">
          <span className="vxn-band__eyebrow">Ask VALUNXT</span>
          <h2 id="vxn-answer-title" className="vxn-answer__title">
            Valunxt Answer
          </h2>
          <p className="vxn-answer__lede">
            Discover the answer to your most important business, property and finance questions.
            Valunxt Answer brings together six connected practices, accounting and tax, real estate,
            mortgages, valuation, research and technology, and guides you to the expertise that
            matters most right now.
          </p>
        </div>

        {/* Its own cell, so the button sits at the foot of the copy column and
            ends level with the visual, as on the reference. */}
        <div className="vxn-answer__foot">
          <a
            className="vxn-band__pill vxn-band__pill--solid vxn-answer__cta"
            href={rurl(region, '/free-consultation/')}
          >
            Ask Us a Question
            <i aria-hidden="true" className="vamtamtheme- vamtam-theme-arrow-right" />
          </a>
        </div>

        <div className="vxn-answer__media">
          <UaeAnswerVisual scenes={scenes} />
        </div>
      </div>
    </section>
  );
}
