'use client';

/**
 * ABOUT — the desk in one paragraph and three figures, sitting between the
 * hero and the featured listings.
 *
 * The composition is the one the client asked for: a minimal label in a narrow
 * left column, the statement set large on the right with its opening sentence
 * in ink and the rest running muted behind it, the figures on a hairline rule
 * beneath, and then two views of the city on an asymmetric pair — the city
 * itself, never a particular property.
 *
 * The figures are not written here — they come from data/landing.ts, where
 * each is annotated with the place on the site it is already published. Do not
 * add a figure to that list that is not true of the desk.
 */
import { ABOUT } from '../../data/landing';
import { Label } from './shared';

export default function About() {
  return (
    <section className="re-l-sec re-l-about" id="about">
      <div className="re-wrap re-l-about__in">
        <Label className="re-l-about__label">{ABOUT.eyebrow}</Label>

        <div className="re-l-about__body">
          <p className="re-l-about__say" data-rv="up">
            {ABOUT.lead} <span>{ABOUT.rest}</span>
          </p>

          <ul className="re-l-about__stats" data-rv="up" data-rv-i="2">
            {ABOUT.stats.map((s) => (
              <li key={s.label}>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="re-l-about__shots" data-rv="up" data-rv-i="3">
          {ABOUT.shots.map((v) => (
            <figure key={v.image}>
              <span className="re-l-about__frame">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={v.image} alt={v.alt} loading="lazy" />
              </span>
              <figcaption>
                <strong>{v.caption}</strong>
                <span>{v.note}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
