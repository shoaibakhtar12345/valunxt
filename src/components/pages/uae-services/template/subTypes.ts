/**
 * What a UAE sub-service page says — the content behind SubServiceTemplateBody,
 * and the builder that assembles it.
 *
 * THIRTY-THREE PAGES, ONE SHAPE. On client instruction (20260910) every page
 * beneath the six UAE services takes the Accounting & Bookkeeping page's UI,
 * section for section, with only the words changed. Ten sections, of which two
 * are genuinely about the sub-service — the hero and the brief (a lede and two
 * four-point lists) — and eight are about the practice it belongs to: why us,
 * the approach, the insights rail, the success story, the band, the vision,
 * the strip and the close.
 *
 * So the content is written in two layers. A SubParent holds the eight
 * practice-level sections once per service; a SubSpec holds the two
 * page-level sections per sub-service; buildSubs() zips them into the flat
 * SubServiceTemplateContent the body renders. A sub-service that needs to
 * override a practice-level section can — see SubSpec — but none does today.
 *
 * LENGTHS ARE PART OF THE DESIGN. A point that runs to six lines breaks the
 * two-column list's alignment, and a lede longer than about 55 words pushes
 * the hero's copy into the blur band. Keep replacements near the sizes the
 * modules use.
 *
 * FIGURES ARE NEVER OUTCOMES, and the success stories are PLACEHOLDERS: the
 * one on the bookkeeping page was written as a stand-in for a real case study
 * and the five written for the other practices are the same. They read as
 * plausible, they are attributed to a role and a kind of client rather than a
 * name, and they must be replaced by, or approved as, real ones before this
 * section carries the firm's name in public.
 */
import type { Industry } from '@/components/sections/HomeIndustriesRow';

export interface SubLink {
  label: string;
  href: string;
}

/** A point in one of the two-column lists in the brief. */
export type SubPoint = {
  /** The bolded lead-in. Two or three words. */
  lead: string;
  /** The rest of the sentence. HTML is not parsed — see `stress`. */
  text: string;
  /** A phrase inside `text` to underline, as the reference marks key terms. */
  stress?: string;
};

/** A column in the approach section. */
export type SubColumn = { title: string; body: string };

/** One card in the insights rail. EXACTLY FOUR per page — the grid is four across. */
export type SubInsight = {
  /** The pill over the artwork. Shown at rest, faded out on hover. */
  category: string;
  /** Small caps line above the title: kind, then date. */
  kind: string;
  date: string;
  /** Clamped to three lines at rest; shown whole on hover. */
  title: string;
  /** Revealed on hover only. Four lines at the card's width. */
  excerpt: string;
  href: string;
  /** Passed through rimg(), so it is a path under uploads/. */
  image: string;
  alt: string;
};

/** One item on the vision rail. */
export type SubStep = { title: string; body: string };

export interface SubWhy {
  pill: string;
  /** Three lines, because a fourth overflows the card at 1280. */
  titleTop: string;
  titleMid: string;
  titleMark: string;
  note: string;
  cta: SubLink;
  image: string;
  alt: string;
}

export interface SubApproach {
  eyebrow: string;
  columns: SubColumn[];
}

export interface SubInsights {
  title: string;
  lede: string;
  all: SubLink;
  cards: SubInsight[];
}

export interface SubStory {
  photo: string;
  alt: string;
  quote: string;
  /** Initials, not a photograph: a stock headshot attached to a named role reads
   *  as a real person who did not say this. */
  initials: string;
  role: string;
  org: string;
  pill: string;
  title: string;
  /** The whole point of the panel. Everything else on it is caption. */
  stat: string;
  note: string;
  cta: SubLink;
  arrow: SubLink;
}

export interface SubBand {
  image: string;
  alt: string;
  title: string;
  body: string;
  cta: SubLink;
}

export interface SubVision {
  steps: SubStep[];
  pill: string;
  quote: string;
}

export interface SubTalk {
  head: string;
  lede: string;
  cta: SubLink;
  /** Candidates, first-that-exists. */
  image: string[];
}

export interface SubBrief {
  lede: string;
  whatIntro: string;
  what: SubPoint[];
  howIntro: string;
  how: SubPoint[];
  panel: {
    mark: string;
    title: string;
    sub: string;
    image: string;
    alt: string;
  };
}

/** The flat content one page renders. */
export interface SubServiceTemplateContent {
  /** The parent service slug. */
  service: string;
  /** This page's slug under it. */
  slug: string;
  /** Services, then the parent. The page's own name is the crumb's last, unlinked step. */
  crumbs: SubLink[];
  hero: {
    title: string;
    lede: string;
    /** Candidates, first-that-exists. */
    image: string[];
    alt: string;
  };
  brief: SubBrief;
  why: SubWhy;
  approach: SubApproach;
  insights: SubInsights;
  story: SubStory;
  band: SubBand;
  vision: SubVision;
  /** Six, because the row divides the viewport between however many it is given
   *  and six is what the home pages are tuned for. */
  strip: Industry[];
  talk: SubTalk;
}

/** The practice-level layer: everything the pages under one service share. */
export interface SubParent {
  service: string;
  /** The breadcrumb's middle step, short. "Accounting & Tax", not the registry name. */
  crumb: string;
  hero: { image: string[]; alt: string };
  panel: { mark: string; image: string; alt: string };
  why: SubWhy;
  approach: SubApproach;
  insights: SubInsights;
  story: SubStory;
  band: SubBand;
  vision: SubVision;
  strip: Industry[];
  talk: SubTalk;
}

/** The page-level layer: what one sub-service says for itself. */
export interface SubSpec {
  slug: string;
  /** The hero title. Matches the registry's SubService.name. */
  title: string;
  /** The hero paragraph — about 50 words. */
  lede: string;
  /** A photograph of its own, if it has one; otherwise the parent's. */
  hero?: { image?: string[]; alt?: string };
  brief: Omit<SubBrief, 'panel'> & { panel: { title: string; sub: string } };
  /** Per-page overrides of the practice-level sections. None used today. */
  override?: Partial<Pick<SubServiceTemplateContent, 'why' | 'approach' | 'insights' | 'story' | 'band' | 'vision' | 'strip' | 'talk'>>;
}

/**
 * The pages under one service, keyed by sub slug, ready for the registry.
 *
 * The breadcrumb, the hero photograph and the panel's mark and plate are the
 * parent's unless the spec says otherwise; everything in `override` replaces
 * the parent's section wholesale rather than merging into it.
 */
export function buildSubs(parent: SubParent, specs: SubSpec[]): Record<string, SubServiceTemplateContent> {
  const out: Record<string, SubServiceTemplateContent> = {};
  for (const s of specs) {
    out[s.slug] = {
      service: parent.service,
      slug: s.slug,
      crumbs: [
        { label: 'Services', href: '/services/' },
        { label: parent.crumb, href: `/services/${parent.service}/` },
      ],
      hero: {
        title: s.title,
        lede: s.lede,
        image: s.hero?.image ?? parent.hero.image,
        alt: s.hero?.alt ?? parent.hero.alt,
      },
      brief: {
        ...s.brief,
        panel: { ...parent.panel, ...s.brief.panel },
      },
      why: parent.why,
      approach: parent.approach,
      insights: parent.insights,
      story: parent.story,
      band: parent.band,
      vision: parent.vision,
      strip: parent.strip,
      talk: parent.talk,
      ...s.override,
    };
  }
  return out;
}
