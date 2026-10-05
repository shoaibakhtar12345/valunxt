'use client';

/**
 * THE HERO — a carousel of four curated slides, each with its own composition
 * rather than one template re-skinned.
 *
 * All four speak the same language: a short two-line headline whose second
 * phrase is set in the display italic, one line of copy, one pill action, and
 * Dubai the city behind it — never a particular property. What differs is the
 * composition, chosen per slide by `layout` in HERO.slides:
 *
 *   centre   Buy       full-bleed night skyline, everything centred.
 *   rail     Rent      full-bleed dusk skyline, copy on a hairline bottom rail
 *                      with the figure at the far end of it.
 *   portal   Off-Plan  the photograph contained in a tall arch on a navy
 *                      field, copy beside it, the payment plan as a bar.
 *   index    Invest    duotone aerial, copy left, the yield set oversized.
 *
 * The track slides sideways; it auto-advances, and pauses on hover/focus,
 * while the tab is hidden and under reduced motion. The search card sits on
 * the hero's bottom edge, overlapping it.
 *
 * While the hero fills the screen the module's header runs transparent with
 * light type — it reads `data-re-on-video` on <html>, the hook the module's
 * header already had, so nothing in Header.tsx had to change.
 */
import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

import { AREAS, HERO, SEARCH, type HeroSlide } from '../../data/landing';
import { scrollToId } from './enquiry';
import { useSearch } from './LandingBody';
import { IcArrow, IcArrowUp, useHeaderOverHero } from './shared';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** The headline: sans lead, display italic accent. */
function Title({ s, first }: { s: HeroSlide; first: boolean }) {
  const inner = (
    <>
      {s.title.lead} <em>{s.title.em}</em>
    </>
  );
  return first ? <h1 className="re-l-car__title">{inner}</h1> : <h2 className="re-l-car__title">{inner}</h2>;
}

function Cta({ s }: { s: HeroSlide }) {
  return (
    <button type="button" className="re-l-car__cta" onClick={() => scrollToId(s.cta.target)}>
      {s.cta.label}
      <IcArrowUp />
    </button>
  );
}

function Stat({ s }: { s: HeroSlide }) {
  return (
    <div className="re-l-car__stat">
      <strong>{s.stat.value}</strong>
      <span>{s.stat.label}</span>
    </div>
  );
}

function Shot({ s, first, className }: { s: HeroSlide; first: boolean; className: string }) {
  return (
    <div className={className}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={s.image} alt={s.alt} {...(first ? { fetchPriority: 'high' as const } : {})} />
    </div>
  );
}

function Slide({ s, first }: { s: HeroSlide; first: boolean }) {
  /* 1 — centre: the photograph carries it, the type sits in the middle. */
  if (s.layout === 'centre') {
    return (
      <div className="re-l-car__in re-l-centre">
        <Shot s={s} first={first} className="re-l-centre__shot" />
        <span className="re-l-centre__wash" aria-hidden="true" />
        <div className="re-wrap re-l-centre__in">
          <span className="re-l-label re-l-label--light">
            <i aria-hidden="true" />
            {s.eyebrow}
          </span>
          <Title s={s} first={first} />
          <p className="re-l-car__lede">{s.lede}</p>
          <Cta s={s} />
        </div>
        <span className="re-l-centre__cap">{s.caption}</span>
      </div>
    );
  }

  /* 2 — rail: everything sits on one hairline at the foot of the frame. */
  if (s.layout === 'rail') {
    return (
      <div className="re-l-car__in re-l-rail">
        <Shot s={s} first={first} className="re-l-rail__shot" />
        <span className="re-l-rail__wash" aria-hidden="true" />
        <div className="re-wrap re-l-rail__in">
          <span className="re-l-rail__cap">{s.caption}</span>
          <div className="re-l-rail__foot">
            <div className="re-l-car__copy">
              <span className="re-l-label re-l-label--light">
                <i aria-hidden="true" />
                {s.eyebrow}
              </span>
              <Title s={s} first={first} />
              <p className="re-l-car__lede">{s.lede}</p>
              <Cta s={s} />
            </div>
            <Stat s={s} />
          </div>
        </div>
      </div>
    );
  }

  /* 3 — portal: the photograph is held inside an arch, not bled off the edge. */
  if (s.layout === 'portal') {
    const plan = s.plan ?? { during: 60, handover: 40 };
    return (
      <div className="re-l-car__in re-l-portal">
        <div className="re-wrap re-l-portal__in">
          <div className="re-l-car__copy">
            <span className="re-l-label re-l-label--light">
              <i aria-hidden="true" />
              {s.eyebrow}
            </span>
            <Title s={s} first={first} />
            <p className="re-l-car__lede">{s.lede}</p>
            <Cta s={s} />
            <div className="re-l-portal__plan">
              <span className="re-l-portal__bar">
                <i style={{ width: `${plan.during}%` }} />
              </span>
              <span className="re-l-portal__keys">
                <span>
                  <strong>{plan.during}%</strong> during construction
                </span>
                <span>
                  <strong>{plan.handover}%</strong> on handover
                </span>
              </span>
            </div>
          </div>
          <figure className="re-l-portal__arch">
            <Shot s={s} first={first} className="re-l-portal__shot" />
            <figcaption>{s.caption}</figcaption>
          </figure>
        </div>
      </div>
    );
  }

  /* 4 — index: duotone aerial, the yield set as the slide's one graphic. */
  return (
    <div className="re-l-car__in re-l-index">
      <Shot s={s} first={first} className="re-l-index__shot" />
      <span className="re-l-index__wash" aria-hidden="true" />
      <div className="re-wrap re-l-index__in">
        <div className="re-l-car__copy">
          <span className="re-l-label re-l-label--light">
            <i aria-hidden="true" />
            {s.eyebrow}
          </span>
          <Title s={s} first={first} />
          <p className="re-l-car__lede">{s.lede}</p>
          <Cta s={s} />
        </div>
        <div className="re-l-index__fig">
          <strong>{s.stat.value}</strong>
          <span>{s.stat.label}</span>
        </div>
      </div>
      <span className="re-l-index__cap">{s.caption}</span>
    </div>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { search, set, results, goToResults } = useSearch();

  useHeaderOverHero(ref);

  /* The carousel: auto-advances, pauses on hover/focus and while the tab is hidden. */
  const slides = HERO.slides;
  const n = slides.length;
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const go = (i: number) => setSlide(((i % n) + n) % n);
  useEffect(() => {
    if (reduce || paused) return;
    const t = window.setInterval(() => {
      if (!document.hidden) setSlide((i) => (i + 1) % n);
    }, 7000);
    return () => window.clearInterval(t);
  }, [reduce, paused, slide, n]);

  const budgets = SEARCH.budgets[search.mode];

  return (
    <>
      <section
        className="re-l-hero re-l-car"
        ref={ref}
        aria-roledescription="carousel"
        aria-label="Dubai real estate"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <div className="re-l-car__viewport">
          <div className="re-l-car__track" style={{ transform: `translateX(-${slide * 100}%)` }}>
            {slides.map((s, i) => (
              <div
                className={`re-l-car__slide${i === slide ? ' is-on' : ''}`}
                key={s.tag}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${n}`}
                aria-hidden={i === slide ? undefined : 'true'}
                {...(i === slide ? {} : { inert: true })}
              >
                <Slide s={s} first={i === 0} />
              </div>
            ))}
          </div>
        </div>

        <div className="re-wrap re-l-car__ctrl">
          <div className="re-l-car__dots" role="tablist" aria-label="Choose a slide">
            {slides.map((s, i) => (
              <button type="button" key={s.tag} role="tab" aria-selected={i === slide} className={i === slide ? 'is-on' : ''} onClick={() => go(i)}>
                <span className="re-l-car__num">0{i + 1}</span>
                {s.tag}
                <i key={`${i}-${i === slide ? slide : ''}`} style={i === slide && !reduce && !paused ? { animation: 're-l-prog 7s linear forwards' } : undefined} />
              </button>
            ))}
          </div>
          <div className="re-l-car__arrows">
            <button type="button" aria-label="Previous slide" onClick={() => go(slide - 1)}>
              <span className="re-l-car__flip">
                <IcArrow />
              </span>
            </button>
            <button type="button" aria-label="Next slide" onClick={() => go(slide + 1)}>
              <IcArrow />
            </button>
          </div>
        </div>
      </section>

      <div className="re-wrap re-l-searchbar">
        <motion.form
          className="re-l-search"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 1.05 }}
          role="search"
          aria-label="Search featured properties"
          onSubmit={(e) => {
            e.preventDefault();
            goToResults();
          }}
        >
          <div className="re-l-search__modes" role="tablist" aria-label="I want to">
            {SEARCH.modes.map((m) => (
              <button type="button" key={m.key} role="tab" aria-selected={search.mode === m.key} className={`re-l-search__mode${search.mode === m.key ? ' is-on' : ''}`} onClick={() => set({ mode: m.key })}>
                {search.mode === m.key ? <motion.span layoutId="re-l-mode-pill" className="re-l-search__pill" transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }} /> : null}
                <span className="re-l-search__lbl">{m.label}</span>
              </button>
            ))}
          </div>
          <label className="re-l-search__field">
            <span>Area</span>
            <select value={search.area} onChange={(e) => set({ area: e.target.value })}>
              <option value="any">All of Dubai</option>
              {AREAS.map((a) => (
                <option key={a.key} value={a.key}>
                  {a.name}
                </option>
              ))}
            </select>
          </label>
          <label className="re-l-search__field">
            <span>Type</span>
            <select value={search.type} onChange={(e) => set({ type: e.target.value })}>
              {SEARCH.types.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </label>
          <label className="re-l-search__field">
            <span>Bedrooms</span>
            <select value={search.beds} onChange={(e) => set({ beds: e.target.value })}>
              {SEARCH.beds.map((b) => (
                <option key={b}>{b}</option>
              ))}
            </select>
          </label>
          <label className="re-l-search__field">
            <span>Budget</span>
            <select value={search.budget} onChange={(e) => set({ budget: Number(e.target.value) })}>
              {budgets.map((b, i) => (
                <option key={b.label} value={i}>
                  {b.label}
                </option>
              ))}
            </select>
          </label>
          <button type="submit" className="re-btn re-l-search__go">
            Search
            <em>{results.length}</em>
          </button>
        </motion.form>
      </div>
    </>
  );
}
