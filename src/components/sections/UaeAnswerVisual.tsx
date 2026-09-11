'use client';

/* eslint-disable @next/next/no-img-element -- the site serves every image
   verbatim out of /public (next.config: images.unoptimized), as every other
   section does; the thumbnails here are no different. */

/**
 * The Valunxt Answer visual: a question typed into a glass pill, a thinking
 * square, an answer panel with four cards, then an article card, over drifting
 * spheres. One scene per service, played end to end and looped.
 *
 * WHY THE DOM AND NOT A VIDEO. The reference (bcg.com's "BCG Answer", read on
 * 20260911) is a dotLottie render: 510 frames at 30fps, 17.0 seconds, drawn on
 * a canvas with a scroll-to-play observer, a pause control and a loop. It is a
 * picture of a chat. Rebuilding it in the DOM keeps the sequence and the
 * timings while the cards and the article are real links into the six
 * services, the copy is the registry's, and the whole thing weighs a few
 * kilobytes rather than a .lottie plus a WASM player.
 *
 * THE TIMELINE, per scene, read frame by frame off the reference:
 *
 *   0.0s   spheres only
 *   0.2s   the pill appears (grows in over .3s)
 *   0.8s   typing begins: 44 characters in 1.5s, fast at first and slowing
 *          towards the end (one a frame, then one every three)
 *   2.3s   the question holds for 1.4s
 *   3.7s   the text fades (.3s), then the pill shrinks to a square (.2s)
 *   4.2s   the square thinks (a stepping spinner) for 3.8s
 *   8.0s   it opens into the panel (.4s); the answer fades in
 *   9.0s   the four cards arrive, .1s apart
 *   9.6s   the answer's list reveals line by line
 *  12.4s   panel and cards fade (.3s); the first card's picture is left
 *  12.7s   it becomes a small pill at the top of the stage (.5s)
 *  13.4s   which opens into the white article card (.6s); text fades in
 *  16.4s   the card slides up and out (.5s)
 *  17.0s   next scene
 *
 * Everything a scene needs is in the DOM before it starts; the timeline only
 * sets data-phase on the stage, .is-active on the scene's parts, .is-on on the
 * cards and list lines, and writes the question one character at a time. The
 * geometry of every phase lives in the stylesheet (assets/css/
 * valunxt-landing.css, section 17); the one thing the script measures is the
 * pill's width before it shrinks, because a transition cannot start from auto.
 *
 * THE SCHEDULER is one sorted list of steps with absolute times and a single
 * timeout that fires the next due step. Pausing records the elapsed time and
 * stops the timeout; resuming rebases the clock and carries on, so a pause in
 * the middle of typing resumes mid-word, as the reference's canvas does. CSS
 * transitions already in flight run to their end (at most .6s); the spheres,
 * the caret and the spinner are held with animation-play-state.
 *
 * WHAT PLAYS IT, as on the reference: an IntersectionObserver starts it when
 * the stage comes into view and freezes it when it leaves; a hidden tab
 * freezes it too; the control pauses it until pressed again, and a manual
 * pause is not undone by scrolling. Under prefers-reduced-motion nothing
 * moves: the stage shows the first scene's finished card and the control
 * offers to play, which is one better than the reference, whose canvas stays
 * blank.
 */
import { useEffect, useRef } from 'react';

import { LogoXGlyph } from '@/components/brand/LogoX';

export interface AnswerTile {
  /** The small uppercase label above the title: the practice, or "Service". */
  kind: string;
  title: string;
  href: string;
  img: string;
}

export interface AnswerCard {
  chip: string;
  title: string;
  href: string;
  img: string;
  alt: string;
  paras: string[];
}

export interface AnswerScene {
  key: string;
  question: string;
  answer: string;
  /** The label over the list, "Where to start:". */
  label: string;
  starts: string[];
  tiles: AnswerTile[];
  card: AnswerCard;
}

type Phase =
  | 'idle'
  | 'cursor'
  | 'typing'
  | 'asked'
  | 'clearing'
  | 'thinking'
  | 'expanding'
  | 'answer'
  | 'collapsing'
  | 'preview'
  | 'card'
  | 'exit';

interface Step {
  at: number;
  run: () => void;
}

/* The reference's beats, in ms. The first three are from the scene's start;
   the rest are from the end of typing, which moves with the question's length
   (the reference's 44 characters end at 2.3s). */
const BEAT = {
  pill: 200,
  type: 800,
  asked: 0,
  clearing: 1400,
  thinking: 1700,
  expanding: 5700,
  answer: 6100,
  cards: 6600,
  lines: 7200,
  lineGap: 400,
  collapsing: 10100,
  preview: 10400,
  card: 11100,
  exit: 14100,
  end: 14700,
};

/* One keystroke's delay: 22ms at the start of the question rising to 62ms at
   its end, which averages the reference's 35ms a character and reproduces
   its slowing-down. */
function keyDelay(k: number, n: number): number {
  const p = k / n;
  return 22 + 40 * p * p;
}

/** The eight-spoke "thinking" glyph, stepping round like the reference's. */
function Spinner() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      {Array.from({ length: 8 }, (_, i) => (
        <line
          key={i}
          x1="12"
          y1="2.5"
          x2="12"
          y2="7"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          opacity={(i + 1) / 8}
          transform={`rotate(${i * 45} 12 12)`}
        />
      ))}
    </svg>
  );
}

export default function UaeAnswerVisual({ scenes }: { scenes: AnswerScene[] }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const qRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const box = boxRef.current;
    const q = qRef.current;
    if (!stage || !box || !q || scenes.length === 0) return;

    const setPhase = (p: Phase) => {
      stage.dataset.phase = p;
    };
    const setActive = (i: number) => {
      stage.querySelectorAll<HTMLElement>('[data-scene]').forEach((el) => {
        el.classList.toggle('is-active', Number(el.dataset.scene) === i);
      });
    };
    const turnOn = (i: number, selector: string, at: number) => {
      const el = stage.querySelectorAll<HTMLElement>(`[data-scene="${i}"] ${selector}`)[at];
      if (el) el.classList.add('is-on');
    };

    /* ---- The steps ------------------------------------------------------ */
    const steps: Step[] = [];
    let t0 = 0;
    scenes.forEach((scene, i) => {
      const at = (offset: number, run: () => void) => steps.push({ at: t0 + offset, run });

      at(0, () => {
        setPhase('idle');
        q.textContent = '';
        setActive(i);
        stage.querySelectorAll('.is-on').forEach((el) => el.classList.remove('is-on'));
      });
      at(BEAT.pill, () => setPhase('cursor'));

      let t = BEAT.type;
      const n = scene.question.length;
      for (let k = 1; k <= n; k++) {
        t += keyDelay(k, n);
        const text = scene.question.slice(0, k);
        at(t, () => {
          if (k === 1) setPhase('typing');
          q.textContent = text;
        });
      }
      const typed = t;

      at(typed + BEAT.asked, () => setPhase('asked'));
      at(typed + BEAT.clearing, () => setPhase('clearing'));
      at(typed + BEAT.thinking, () => {
        /* A transition cannot start from width:auto, so the pill's width is
           pinned in px for one frame and released once the square is asked
           for; the stylesheet then animates px to cqw. */
        box.style.width = `${box.getBoundingClientRect().width}px`;
        void box.offsetWidth;
        setPhase('thinking');
        box.style.width = '';
      });
      at(typed + BEAT.expanding, () => setPhase('expanding'));
      at(typed + BEAT.answer, () => setPhase('answer'));
      at(typed + BEAT.cards, () => {
        for (let c = 0; c < scene.tiles.length; c++) turnOn(i, '.vxn-ans__tile', c);
      });
      scene.starts.forEach((_, line) => {
        at(typed + BEAT.lines + line * BEAT.lineGap, () => turnOn(i, '.vxn-ans__line', line));
      });
      at(typed + BEAT.collapsing, () => setPhase('collapsing'));
      at(typed + BEAT.preview, () => setPhase('preview'));
      at(typed + BEAT.card, () => setPhase('card'));
      at(typed + BEAT.exit, () => setPhase('exit'));

      t0 += typed + BEAT.end;
    });
    steps.sort((a, b) => a.at - b.at);
    const total = t0;

    /* ---- The scheduler -------------------------------------------------- */
    let startedAt = 0;
    let elapsed = 0;
    let next = 0;
    let timer: ReturnType<typeof setTimeout> | null = null;
    let playing = false;

    const tick = () => {
      const now = performance.now() - startedAt;
      while (next < steps.length && steps[next].at <= now) {
        steps[next].run();
        next++;
      }
      if (next >= steps.length) {
        /* The loop: rebase the clock at the end of the last scene. */
        startedAt += total;
        next = 0;
      }
      const wait = Math.max(0, steps[next].at - (performance.now() - startedAt));
      timer = setTimeout(tick, wait);
    };
    const play = () => {
      if (playing) return;
      playing = true;
      stage.classList.remove('is-paused');
      startedAt = performance.now() - elapsed;
      tick();
    };
    const pause = () => {
      if (!playing) return;
      playing = false;
      stage.classList.add('is-paused');
      if (timer) clearTimeout(timer);
      timer = null;
      elapsed = performance.now() - startedAt;
    };

    /* ---- What plays it -------------------------------------------------- */
    const button = stage.querySelector<HTMLButtonElement>('.vxn-ans__ctrl');
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let inView = false;
    let manual = still;

    const label = () => {
      if (!button) return;
      const paused = manual || !playing;
      button.setAttribute('aria-label', paused ? 'Play the animation' : 'Pause the animation');
      stage.classList.toggle('is-paused', paused);
    };
    const sync = () => {
      if (inView && !manual && !document.hidden) play();
      else pause();
      label();
    };

    if (still) {
      /* Nothing moves until asked: the first scene's finished card. */
      setActive(0);
      setPhase('card');
    }

    const onButton = () => {
      manual = !manual;
      if (manual) {
        pause();
      } else if (still && elapsed === 0 && next === 0) {
        /* The first press under reduced motion starts from the beginning. */
        setPhase('idle');
      }
      sync();
    };
    button?.addEventListener('click', onButton);

    const io = new IntersectionObserver(
      (entries) => {
        inView = entries.some((e) => e.isIntersecting);
        sync();
      },
      { threshold: 0.15 }
    );
    io.observe(stage);

    const onVisibility = () => sync();
    document.addEventListener('visibilitychange', onVisibility);
    label();

    return () => {
      pause();
      io.disconnect();
      button?.removeEventListener('click', onButton);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [scenes]);

  return (
    <div
      className="vxn-ans"
      data-phase="idle"
      ref={stageRef}
      role="region"
      aria-label="Valunxt Answer, an animated demonstration"
    >
      {/* The spheres. Seven balls, a dark pocket where they meet, all drifting
          on their own slow loops. */}
      <div className="vxn-ans__bg" aria-hidden="true">
        <i className="vxn-ans__deep" />
        {Array.from({ length: 7 }, (_, i) => (
          <i className={`vxn-ans__orb vxn-ans__orb--${i + 1}`} key={i} />
        ))}
      </div>

      {/* The one box that is, in turn, the pill, the square, the panel, the
          picture pill and the article card. */}
      <div className="vxn-ans__box" ref={boxRef}>
        <span className="vxn-ans__ask" aria-hidden="true">
          <span className="vxn-ans__q" ref={qRef} />
          <i className="vxn-ans__caret" />
        </span>

        <span className="vxn-ans__spin" aria-hidden="true">
          <Spinner />
        </span>

        {scenes.map((s, i) => (
          <div className={`vxn-ans__panel${i === 0 ? ' is-active' : ''}`} data-scene={i} key={`p-${s.key}`}>
            <span className="vxn-ans__mark" aria-hidden="true">
              <LogoXGlyph />
            </span>
            <div className="vxn-ans__head">{s.question}</div>
            <p className="vxn-ans__text">{s.answer}</p>
            <div className="vxn-ans__lbl">{s.label}</div>
            <ul className="vxn-ans__list">
              {s.starts.map((line) => (
                <li className="vxn-ans__line" key={line}>
                  {line}
                </li>
              ))}
            </ul>
          </div>
        ))}

        {scenes.map((s, i) => (
          <a
            className={`vxn-ans__card${i === 0 ? ' is-active' : ''}`}
            data-scene={i}
            href={s.card.href}
            key={`c-${s.key}`}
          >
            <img className="vxn-ans__art" src={s.card.img} alt="" loading="lazy" decoding="async" />
            <span className="vxn-ans__cardbody">
              <span className="vxn-ans__chip">{s.card.chip}</span>
              <span className="vxn-ans__cardtitle">{s.card.title}</span>
              <span className="vxn-ans__slot" aria-hidden="true" />
              {s.card.paras.map((p, j) => (
                <span className="vxn-ans__para" key={j}>
                  {p}
                </span>
              ))}
            </span>
          </a>
        ))}
      </div>

      {/* The related cards, to the right of the panel. */}
      <div className="vxn-ans__cards">
        {scenes.map((s, i) => (
          <div className={`vxn-ans__deck${i === 0 ? ' is-active' : ''}`} data-scene={i} key={`d-${s.key}`}>
            {s.tiles.map((tile) => (
              <a className="vxn-ans__tile" href={tile.href} key={tile.href}>
                <img className="vxn-ans__thumb" src={tile.img} alt="" loading="lazy" decoding="async" />
                <span className="vxn-ans__tiletext">
                  <span className="vxn-ans__kind">{tile.kind}</span>
                  <span className="vxn-ans__ttl">{tile.title}</span>
                </span>
              </a>
            ))}
          </div>
        ))}
      </div>

      <button type="button" className="vxn-ans__ctrl" aria-label="Pause the animation">
        <svg className="vxn-ans__ico vxn-ans__ico--pause" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" focusable="false">
          <path d="M3.5 2.5h3.2v11H3.5zM9.3 2.5h3.2v11H9.3z" fill="currentColor" />
        </svg>
        <svg className="vxn-ans__ico vxn-ans__ico--play" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" focusable="false">
          <path d="M4.4 2.6v10.8L13.2 8z" fill="currentColor" />
        </svg>
      </button>
    </div>
  );
}
