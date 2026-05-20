/* ============================================================
   ArtMagma — js/animations.js
   Fade-in suave em elementos ao entrar na viewport.
   Respeita prefers-reduced-motion.
   ============================================================ */

(function () {
  /* Não animar se o usuário preferir menos movimento */
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  const SELECTORS = [
    '.card',
    '.feature',
    '.hero__content',
    '.footer__col',
    '.sobre-home__content',
    '.sobre-page__content',
    '.contato-info',
    '.contato-form-box',
    '.page-hero',
    '.checkout-form',
    '.checkout-summary',
  ].join(', ');

  function init() {
    const elements = document.querySelectorAll(SELECTORS);

    if (!elements.length) return;

    elements.forEach(el => el.classList.add('fade-in'));

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); /* Anima apenas uma vez */
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -30px 0px',
    });

    elements.forEach(el => observer.observe(el));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
