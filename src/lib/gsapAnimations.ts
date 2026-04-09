import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Config di default per tutti i ScrollTrigger del sito
const DEFAULT_TRIGGER = {
  start: 'top 88%',
  toggleActions: 'play none none none',
};

// ─────────────────────────────────────────────────────────
// ANIMAZIONE 1 — TEXT REVEAL (righe che salgono da sotto)
// Uso: per titoli hero grandi, headline di sezione
// ─────────────────────────────────────────────────────────
export function animateHeroText(selector: string, delay = 0) {
  const lines = gsap.utils.toArray(`${selector} .line span`) as HTMLElement[];
  if (!lines.length) return;

  gsap.set(lines, { translateY: '110%' });

  gsap.to(lines, {
    translateY: '0%',
    duration: 1,
    ease: 'power4.out',
    stagger: 0.12,
    delay,
  });
}

// ─────────────────────────────────────────────────────────
// ANIMAZIONE 2 — COUNTER (numeri che contano da 0)
// Uso: per statistiche e numeri chiave
// ─────────────────────────────────────────────────────────
export function animateCounters(containerSelector: string) {
  const counters = gsap.utils.toArray(`${containerSelector} .gsap-counter`) as HTMLElement[];
  if (!counters.length) return;

  counters.forEach(counter => {
    const target = parseInt(counter.dataset.target || '0', 10);

    ScrollTrigger.create({
      trigger: counter,
      ...DEFAULT_TRIGGER,
      once: true,
      onEnter: () => {
        gsap.to({ val: 0 }, {
          val: target,
          duration: 1.8,
          ease: 'power2.out',
          onUpdate: function () {
            counter.textContent = Math.round(
              (this.targets()[0] as any).val
            ).toLocaleString('it-IT');
          },
        });
      },
    });
  });
}

// ─────────────────────────────────────────────────────────
// ANIMAZIONE 3 — CARDS A CASCATA (entrata dal basso)
// Uso: per card dei format, pacchetti prezzi, team
// ─────────────────────────────────────────────────────────
export function animateCards(containerSelector: string, staggerDelay = 0.15) {
  const cards = gsap.utils.toArray(`${containerSelector} .gsap-card`) as HTMLElement[];
  if (!cards.length) return;

  gsap.set(cards, { opacity: 0, translateY: 50 });

  cards.forEach((card, i) => {
    gsap.to(card, {
      opacity: 1,
      translateY: 0,
      duration: 0.7,
      ease: 'power3.out',
      delay: i * staggerDelay,
      scrollTrigger: {
        trigger: card as Element,
        ...DEFAULT_TRIGGER,
      },
    });
  });
}

// ─────────────────────────────────────────────────────────
// ANIMAZIONE 4 — STEPS DA SINISTRA
// Uso: per sezioni "Come funziona", processi step-by-step
// ─────────────────────────────────────────────────────────
export function animateSteps(containerSelector: string) {
  const steps = gsap.utils.toArray(`${containerSelector} .gsap-step`) as HTMLElement[];
  if (!steps.length) return;

  gsap.set(steps, { opacity: 0, translateX: -40 });

  steps.forEach((step, i) => {
    gsap.to(step, {
      opacity: 1,
      translateX: 0,
      duration: 0.7,
      ease: 'power3.out',
      delay: i * 0.12,
      scrollTrigger: {
        trigger: step as Element,
        ...DEFAULT_TRIGGER,
      },
    });
  });
}

// ─────────────────────────────────────────────────────────
// ANIMAZIONE 5 — QUOTE REVEAL (righe mascherate)
// Uso: per citazioni, frasi forti, tagline di sezione
// ─────────────────────────────────────────────────────────
export function animateQuote(selector: string) {
  const lines = gsap.utils.toArray(`${selector} .reveal-block .inner`) as HTMLElement[];
  if (!lines.length) return;

  gsap.set(lines, { translateY: '100%' });

  lines.forEach((line, i) => {
    gsap.to(line, {
      translateY: '0%',
      duration: 0.9,
      ease: 'power4.out',
      delay: i * 0.15,
      scrollTrigger: {
        trigger: line as Element,
        ...DEFAULT_TRIGGER,
      },
    });
  });
}

// ─────────────────────────────────────────────────────────
// ANIMAZIONE GENERICA — Fade + slide su qualsiasi elemento
// Uso: per paragrafi, immagini, elementi vari
// direction: 'up' | 'down' | 'left' | 'right' | 'none'
// ─────────────────────────────────────────────────────────
export function animateFade(containerSelector: string, direction: 'up' | 'down' | 'left' | 'right' | 'none' = 'up', stagger = 0) {
  const els = gsap.utils.toArray(`${containerSelector} .gsap-fade`) as HTMLElement[];
  if (!els.length) return;

  const from = {
    opacity: 0,
    translateY: direction === 'up' ? 30 : direction === 'down' ? -30 : 0,
    translateX: direction === 'left' ? -30 : direction === 'right' ? 30 : 0,
  };

  gsap.set(els, from);

  els.forEach((el, i) => {
    gsap.to(el, {
      opacity: 1,
      translateY: 0,
      translateX: 0,
      duration: 0.7,
      ease: 'power3.out',
      delay: i * stagger,
      scrollTrigger: {
        trigger: el as Element,
        ...DEFAULT_TRIGGER,
      },
    });
  });
}
