/* ============================================================
   ArtMagma — js/navbar.js
   Comportamentos do navbar: scroll, hamburguer.
   Carregue APÓS components.js.
   ============================================================ */

(function () {
  /* Aguarda o DOM estar pronto (components.js já injetou o navbar) */
  const init = () => {
    const navbar     = document.getElementById('navbar');
    const hamburger  = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks= document.querySelectorAll('.mobile-link');

    if (!navbar) return;

    /* ── Sombra ao rolar ── */
    const onScroll = () => {
      navbar.classList.toggle('scrolled', window.scrollY > 30);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // checar posição inicial

    /* ── Hamburguer ── */
    if (!hamburger || !mobileMenu) return;

    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('open', isOpen);
      mobileMenu.setAttribute('aria-hidden', String(!isOpen));
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    /* Fechar ao clicar em link */
    mobileLinks.forEach(link => {
      link.addEventListener('click', closeMobile);
    });

    /* Fechar ao clicar fora */
    document.addEventListener('click', e => {
      if (!navbar.contains(e.target) && !mobileMenu.contains(e.target)) {
        closeMobile();
      }
    });

    /* Fechar com ESC */
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeMobile();
    });

    function closeMobile() {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('open');
      mobileMenu.setAttribute('aria-hidden', 'true');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  };

  /* Pode rodar imediatamente pois components.js é síncrono */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
