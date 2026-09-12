'use client';

/* eslint-disable @next/next/no-img-element -- the site serves every image
   verbatim out of /public (next.config: images.unoptimized), as every other
   section does; the pictures here are no different. */

/**
 * The Valunxt Answer stage (rebuilt 20260912, pared back the same day): a
 * rail of six questions down the left, an ask field across the top right,
 * and under it the answer card for the question that is lit. The rail plays
 * itself, one question after another, and the visitor can take over at any
 * point. The card is the service's picture, its chip, its headline, the
 * answer and one link; the three page links with thumbnails and the rail's
 * counter that the first build carried went on client feedback, so the
 * stage has room around what is left.
 *
 * WHY THIS SHAPE. The first build (20260911) restaged bcg.com's "BCG Answer"
 * render beat for beat: a question typed into a glass pill over pastel
 * spheres, a thinking square, a panel that opened into four cards, then a
 * white article card. Rehman flagged it as too close to the source. What is
 * kept from that build is the data (one scene per service: its question, its
 * accordion sentence, its first three pages and its picture) and the typing
 * of the question; everything the eye reads is new. The stage is the brand's
 * dark pleated-blue artwork rather than spheres, the six questions are on
 * screen at once and are buttons, the answer is one card that slides up under
 * the field, and the control is a round glass button beside the field rather
 * than a grey square in the corner.
 *
 * THE SEQUENCE, per scene:
 *
 *   0.00s  the rail lights the question and its progress bar starts; the
 *          field is empty; the previous card has gone
 *   0.25s  the caret appears and the question is typed, 22ms a character at
 *          the start slowing to 62ms at the end (about 1.5s for 44 characters)
 *   typed  the send button lights
 *   +0.55s the card slides up; its parts (chip, title, answer, the service
 *          link) fade in one after another
 *   +7.10s the card lifts away
 *   +7.55s next scene
 *
 * The rail's progress bar is a CSS animation whose duration is that scene's
 * length, written on the button by sceneLength() at render, so the bar and
 * the clock agree without the script touching it each frame.
 *
 * WHAT THE VISITOR CAN DO. Press a question: the stage jumps to that scene
 * and plays it. Rest the pointer anywhere on the stage: the clock holds, so
 * the card can be read and its links followed, and it resumes on leaving.
 * Press the control: the stage stays paused until it is pressed again, and
 * a press on a question while paused shows that question answered, without
 * the typing. Scrolling the stage out of view or hiding the tab holds it
 * too. Under prefers-reduced-motion nothing plays on its own: the first
 * question is shown answered, the rail switches between finished answers,
 * and the control offers to play.
 *
 * THE SCHEDULER is one sorted list of steps with absolute times and a single
 * timeout that fires the next due step. Pausing records the elapsed time and
 * stops the timeout; resuming rebases the clock and carries on, so a hold in
 * the middle of typing resumes mid-word. Seeking sets the elapsed time to a
 * scene's start and runs its first step at once.
 *
 * The stage's geometry is in assets/css/valunxt-landing.css, section 17.
 */
import { useEffect, useRef, type CSSProperties } from 'react';

import { LogoXGlyph } from '@/components/brand/LogoX';

export interface AnswerScene {
  key: string;
  /** The question typed into the field and listed on the rail. */
  question: string;
  /** The answer: the service's own accordion sentence. */
  answer: string;
  service: {
    name: string;
    short: string;
    headline: string;
    href: string;
    img: string;
    alt: string;
  };
}

type Phase = 'idle' | 'typing' | 'sent' | 'answer' | 'exit';

interface Step {
  at: number;
  run: () => void;
}

/* The beats, in ms. `start` is from the scene's start; the rest are from the
   end of typing, which moves with the question's length. */
const BEAT = {
  start: 250,
  answer: 550,
  exit: 7100,
  end: 7550,
};

/* One keystroke's delay: 22ms at the start of the question rising to 62ms at
   its end, so the typing slows as a hand would. */
function keyDelay(k: number, n: number): number {
  const p = k / n;
  return 22 + 40 * p * p;
}

/** A scene's whole length in ms, for the rail's progress bar. */
export function sceneLength(question: string): number {
  let t = BEAT.start;
  const n = question.length;
  for (let k = 1; k <= n; k++) t += keyDelay(k, n);
  return t + BEAT.end;
}

function pad(i: number): string {
  return String(i).padStart(2, '0');
}

export default function UaeAnswerVisual({ scenes, texture }: { scenes: AnswerScene[]; texture: string }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const qRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const q = qRef.current;
    if (!stage || !q || scenes.length === 0) return;

    const rail = stage.querySelector<HTMLElement>('.vxn-ans__qs');
    const buttons = Array.from(stage.querySelectorAll<HTMLButtonElement>('.vxn-ans__q'));
    const cards = Array.from(stage.querySelectorAll<HTMLElement>('.vxn-ans__card'));

    const setPhase = (p: Phase) => {
      stage.dataset.phase = p;
    };
    const setActive = (i: number) => {
      buttons.forEach((b, k) => {
        b.classList.toggle('is-active', k === i);
        b.style.setProperty('--vxn-ans-skip', '0ms');
        if (k === i) b.setAttribute('aria-current', 'true');
        else b.removeAttribute('aria-current');
      });
      cards.forEach((c, k) => c.classList.toggle('is-active', k === i));
      /* On the phone the rail is a row that scrolls sideways: bring the lit
         question into view, sideways only, never by scrolling the page. */
      if (rail && rail.scrollWidth > rail.clientWidth + 1) {
        const b = buttons[i];
        rail.scrollTo({ left: Math.max(0, b.offsetLeft - 16), behavior: 'smooth' });
      }
    };
    /* A scene shown finished, for a press while paused or under reduced
       motion: the question in the field, the card up, no typing. */
    const showFinished = (i: number) => {
      setActive(i);
      q.textContent = scenes[i].question;
      setPhase('answer');
    };

    /* ---- The steps ------------------------------------------------------ */
    const steps: Step[] = [];
    const starts: number[] = [];
    /* When each scene's card is up, for a press that skips the typing. */
    const answerAt: number[] = [];
    let t0 = 0;
    scenes.forEach((scene, i) => {
      const at = (offset: number, run: () => void) => steps.push({ at: t0 + offset, run });
      starts.push(t0);

      at(0, () => {
        setPhase('idle');
        q.textContent = '';
        setActive(i);
      });

      let t = BEAT.start;
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

      at(typed, () => setPhase('sent'));
      at(typed + BEAT.answer, () => setPhase('answer'));
      answerAt.push(t0 + typed + BEAT.answer);
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

    const runDue = (now: number) => {
      while (next < steps.length && steps[next].at <= now) {
        steps[next].run();
        next++;
      }
    };
    const tick = () => {
      runDue(performance.now() - startedAt);
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
    /* Jump to a scene's start and run its first step at once. The scene's
       button loses and regains .is-active in that step, which restarts its
       progress bar even when it was the lit one already. */
    const seek = (i: number) => {
      pause();
      elapsed = starts[i];
      next = steps.findIndex((s) => s.at >= starts[i]);
      buttons[i].classList.remove('is-active');
      void buttons[i].offsetWidth;
      runDue(elapsed);
    };
    /* Jump to the moment a scene's card is up and show it finished: for a
       press while paused, or while the pointer rests on the stage. The clock
       carries on from there when it runs again, so the card holds for the
       rest of its beat and the next question is typed after it. The progress
       bar is started that far along with a negative delay. */
    const skipTo = (i: number) => {
      pause();
      elapsed = answerAt[i];
      next = steps.findIndex((s) => s.at > answerAt[i]);
      buttons[i].classList.remove('is-active');
      void buttons[i].offsetWidth;
      showFinished(i);
      buttons[i].style.setProperty('--vxn-ans-skip', `-${Math.round(answerAt[i] - starts[i])}ms`);
    };

    /* ---- What plays it -------------------------------------------------- */
    const button = stage.querySelector<HTMLButtonElement>('.vxn-ans__ctrl');
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let inView = false;
    let held = false;
    let manual = still;

    const label = () => {
      if (!button) return;
      button.setAttribute('aria-label', manual ? 'Play the questions' : 'Pause the questions');
      stage.classList.toggle('is-manual', manual);
    };
    const wants = () => inView && !manual && !held && !document.hidden;
    const sync = () => {
      if (wants()) play();
      else pause();
      label();
    };

    if (still) showFinished(0);

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

    const onQuestion = (e: Event) => {
      const b = (e.currentTarget as HTMLElement).closest<HTMLButtonElement>('.vxn-ans__q');
      if (!b) return;
      const i = buttons.indexOf(b);
      if (i < 0) return;
      /* Paused, or the pointer resting on the stage (a mouse press leaves it
         there): the answer at once. Otherwise the scene from its start. */
      if (manual || held) skipTo(i);
      else seek(i);
      sync();
    };
    buttons.forEach((b) => b.addEventListener('click', onQuestion));

    /* A pointer resting on the stage holds the clock so the card can be read
       and its links followed. Touch has no rest, so it is the mouse only. */
    const onEnter = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      held = true;
      sync();
    };
    const onLeave = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      held = false;
      sync();
    };
    stage.addEventListener('pointerenter', onEnter);
    stage.addEventListener('pointerleave', onLeave);

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
      buttons.forEach((b) => b.removeEventListener('click', onQuestion));
      stage.removeEventListener('pointerenter', onEnter);
      stage.removeEventListener('pointerleave', onLeave);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [scenes]);

  return (
    <div
      className="vxn-ans"
      data-phase="idle"
      ref={stageRef}
      role="region"
      aria-label="Six questions and where each is answered"
    >
      {/* The ground: the brand's pleated-blue artwork, breathing slowly, under
          a wash that darkens the rail's side. */}
      <div className="vxn-ans__bg" aria-hidden="true">
        <img className="vxn-ans__weave" src={texture} alt="" decoding="async" />
        <i className="vxn-ans__wash" />
      </div>

      {/* The rail: the six questions, each a button, the lit one carrying the
          progress bar for its scene. */}
      <div className="vxn-ans__rail">
        <div className="vxn-ans__railhead">
          <span className="vxn-ans__railtitle">Pick a question</span>
        </div>
        <ol className="vxn-ans__qs">
          {scenes.map((s, i) => (
            <li className="vxn-ans__qi" key={s.key}>
              <button
                type="button"
                className={`vxn-ans__q${i === 0 ? ' is-active' : ''}`}
                aria-current={i === 0 ? 'true' : undefined}
                style={{ '--vxn-ans-dur': `${Math.round(sceneLength(s.question))}ms` } as CSSProperties}
              >
                <span className="vxn-ans__num">{pad(i + 1)}</span>
                <span className="vxn-ans__qtext">{s.question}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>

      {/* The ask field and, beside it, the control. */}
      <div className="vxn-ans__top">
        <div className="vxn-ans__field" aria-hidden="true">
          <span className="vxn-ans__mark">
            <LogoXGlyph />
          </span>
          <span className="vxn-ans__typed">
            <span className="vxn-ans__qtyped" ref={qRef} />
            <i className="vxn-ans__caret" />
          </span>
          <span className="vxn-ans__send">
            <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" focusable="false">
              <path d="M8 13.5V3M3.5 7.5 8 3l4.5 4.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
        <button type="button" className="vxn-ans__ctrl" aria-label="Pause the questions">
          <svg className="vxn-ans__ico vxn-ans__ico--pause" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" focusable="false">
            <path d="M3.5 2.5h3.2v11H3.5zM9.3 2.5h3.2v11H9.3z" fill="currentColor" />
          </svg>
          <svg className="vxn-ans__ico vxn-ans__ico--play" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" focusable="false">
            <path d="M4.4 2.6v10.8L13.2 8z" fill="currentColor" />
          </svg>
        </button>
      </div>

      {/* The answer cards, one per scene, stacked; the lit scene's is shown. */}
      <div className="vxn-ans__view">
        {scenes.map((s, i) => (
          <article className={`vxn-ans__card${i === 0 ? ' is-active' : ''}`} key={s.key}>
            <img className="vxn-ans__art" src={s.service.img} alt="" loading="lazy" decoding="async" />
            <div className="vxn-ans__body">
              <span className="vxn-ans__chip">{s.service.short}</span>
              <h3 className="vxn-ans__title">{s.service.headline}</h3>
              <p className="vxn-ans__text">{s.answer}</p>
              <a className="vxn-ans__more" href={s.service.href}>
                Explore {s.service.name}
                <i aria-hidden="true" className="vamtamtheme- vamtam-theme-arrow-right" />
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
