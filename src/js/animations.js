import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initAnimations() {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(pointer: fine)').matches;

  if (reduceMotion) return; // page is fully readable without motion

  gsap.registerPlugin(ScrollTrigger);

  /* 1. HERO LOAD-IN (hierarchy: headline first, then support)
     Hidden states are set by JS, so no-JS users see everything. */
  gsap.set('.hero .line', { yPercent: 110 });
  gsap.set('[data-hero-fade]', { opacity: 0, y: 24 });
  gsap.timeline({ defaults: { ease: 'power4.out' } })
    .to('.hero .line', { yPercent: 0, duration: 1.1, stagger: 0.12, delay: 0.15 })
    .to('[data-hero-fade]', { opacity: 1, y: 0, duration: 0.9, stagger: 0.1 }, '-=0.6');

  /* 2. NAV STATE (state transition on leaving the hero) */
  ScrollTrigger.create({
    trigger: document.body,
    start: '80px top',
    end: 'max',
    toggleClass: { targets: '#nav', className: 'scrolled' }
  });

  /* 3. SCROLL REVEALS (hierarchy: content enters as it's read) */
  gsap.utils.toArray('[data-reveal]').forEach(function (el) {
    gsap.from(el, {
      y: 44, opacity: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 86%', once: true }
    });
  });

  /* 4. STICKY STACK for Selected Work (storytelling sequence)
     Canonical pattern: pin each card at "top top" until the
     last card arrives; previous card scales/fades as the next
     one scrolls in. Disabled on mobile: cards stack normally. */
  var mm = gsap.matchMedia();
  mm.add('(min-width: 900px)', function () {
    var cards = gsap.utils.toArray('.stack-card');
    cards.forEach(function (card, i) {
      if (i === cards.length - 1) return;
      ScrollTrigger.create({
        trigger: card,
        start: 'top top',
        endTrigger: cards[cards.length - 1],
        end: 'top top',
        pin: true,
        pinSpacing: false
      });
      gsap.to(card.querySelector('.project-card'), {
        scale: 0.92,
        opacity: 0.45,
        ease: 'none',
        scrollTrigger: {
          trigger: cards[i + 1],
          start: 'top bottom',
          end: 'top top',
          scrub: true
        }
      });
    });
  });

  /* 5. MAGNETIC PRIMARY CTA (feedback; desktop pointers only)
     Direct transforms via gsap.quickTo: no state, no re-renders. */
  if (finePointer) {
    var cta = document.getElementById('magnetic-cta');
    if (cta) {
      var qx = gsap.quickTo(cta, 'x', { duration: 0.4, ease: 'power3.out' });
      var qy = gsap.quickTo(cta, 'y', { duration: 0.4, ease: 'power3.out' });
      cta.addEventListener('pointermove', function (e) {
        var r = cta.getBoundingClientRect();
        qx((e.clientX - (r.left + r.width / 2)) * 0.3);
        qy((e.clientY - (r.top + r.height / 2)) * 0.3);
      });
      cta.addEventListener('pointerleave', function () {
        gsap.to(cta, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.45)' });
      });
    }

    /* subtle 3D tilt on project cards (feedback on hover) */
    gsap.utils.toArray('.project-card').forEach(function (card) {
      var rx = gsap.quickTo(card, 'rotationX', { duration: 0.5, ease: 'power3.out' });
      var ry = gsap.quickTo(card, 'rotationY', { duration: 0.5, ease: 'power3.out' });
      gsap.set(card, { transformPerspective: 1100 });
      card.addEventListener('pointermove', function (e) {
        var r = card.getBoundingClientRect();
        rx(-((e.clientY - r.top) / r.height - 0.5) * 4);
        ry(((e.clientX - r.left) / r.width - 0.5) * 4);
      });
      card.addEventListener('pointerleave', function () {
        gsap.to(card, { rotationX: 0, rotationY: 0, duration: 0.7, ease: 'power3.out' });
      });
    });
  }
}
