/* ============================================================
   ArtMagma — js/components.js
   Injeta navbar, footer e botão WhatsApp em todas as páginas.
   Altere aqui e todas as páginas atualizam automaticamente.

   ✏️  Para trocar o número do WhatsApp, edite WHATSAPP_NUMBER abaixo.
   ============================================================ */

(function () {
  /* ─── CONFIGURAÇÃO ─── */
  const WHATSAPP_NUMBER  = '5544998181001';        // Número com DDI+DDD, sem espaços
  const WHATSAPP_MESSAGE = 'Olá! Tenho interesse em uma faca da ArtMagma. 🔥';

  /* Detecta se estamos na raiz ou dentro de /pages/ */
  const isRoot = !window.location.pathname.includes('/pages/');
  const ROOT   = isRoot ? './' : '../';

  /* Página atual para marcar link ativo */
  const currentPage = window.location.pathname.split('/').pop().replace('.html', '') || 'index';

  /* ─── NAVBAR HTML ─── */
  function navbarHTML() {
    return `
      <nav id="navbar">
        <a href="${ROOT}index.html" class="nav-logo">
          <i class="fas fa-fire-flame-curved"></i>
          <div><span class="logo-art">ART</span><span class="logo-magma">MAGMA</span></div>
        </a>

        <ul class="nav-links">
          <li><a href="${ROOT}index.html"              data-page="index">Início</a></li>
          <li><a href="${ROOT}pages/produtos.html"     data-page="produtos">Produtos</a></li>
          <li><a href="${ROOT}pages/sobre.html"        data-page="sobre">Sobre Nós</a></li>
        </ul>

        <div class="nav-right">
          <div class="nav-icons">
            <div class="cart-wrapper" id="cartWrapper" title="Carrinho">
              <i class="fas fa-cart-shopping"></i>
              <span class="cart-badge" id="cartBadge">0</span>
            </div>
          </div>
          <button class="hamburger" id="hamburger" aria-label="Abrir menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>

      <div class="mobile-menu" id="mobileMenu" aria-hidden="true">
        <ul>
          <li><a href="${ROOT}index.html"           class="mobile-link" data-page="index">Início</a></li>
          <li><a href="${ROOT}pages/produtos.html"  class="mobile-link" data-page="produtos">Produtos</a></li>
          <li><a href="${ROOT}pages/sobre.html"     class="mobile-link" data-page="sobre">Sobre Nós</a></li>
        </ul>
      </div>
    `;
  }

  /* ─── FOOTER HTML ─── */
  function footerHTML() {
    return `
      <footer id="footer">
        <div class="footer__grid">

          <div class="footer__brand">
            <a href="${ROOT}index.html" class="nav-logo">
              <i class="fas fa-fire-flame-curved"></i>
              <div><span class="logo-art">ART</span><span class="logo-magma">MAGMA</span></div>
            </a>
            <p>Facas artesanais forjadas à mão com qualidade e tradição desde a primeira chama.</p>
            <div class="footer__socials">
              <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
              <a href="#" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
              <a href="#" aria-label="WhatsApp"><i class="fab fa-whatsapp"></i></a>
            </div>
          </div>

          <div class="footer__col">
            <h4>Links Rápidos</h4>
            <ul>
              <li><a href="${ROOT}index.html">Início</a></li>
              <li><a href="${ROOT}pages/produtos.html">Produtos</a></li>
              <li><a href="${ROOT}pages/sobre.html">Sobre Nós</a></li>
            </ul>
          </div>

          <div class="footer__col">
            <h4>Atendimento</h4>
            <p>
              (14) 99888-1234<br>
              contato@artmagma.com.br<br>
              Seg - Sex: 08h às 18h<br>
              Sáb: 08h às 12h
            </p>
          </div>

          <div class="footer__col">
            <h4>Newsletter</h4>
            <p class="footer__newsletter-desc">Receba novidades e ofertas exclusivas.</p>
            <form class="newsletter-form" id="newsletterForm" novalidate>
              <input type="email" id="newsletterEmail" placeholder="Seu e-mail" required/>
              <button type="submit" aria-label="Enviar"><i class="fas fa-paper-plane"></i></button>
            </form>
            <p class="form-feedback" id="newsletterFeedback"></p>
          </div>

        </div>
        <div class="footer__bottom">
          © 2024 ArtMagma – Todos os Direitos Reservados
        </div>
      </footer>

      <!-- Toast global -->
      <div class="toast" id="toast" role="status" aria-live="polite"></div>

      <!-- Botão flutuante WhatsApp -->
      <a
        id="whatsappBtn"
        class="whatsapp-btn"
        href="https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Fale conosco pelo WhatsApp"
        title="Fale conosco pelo WhatsApp"
      >
        <i class="fab fa-whatsapp"></i>
        <span class="whatsapp-btn__tooltip">Fale conosco!</span>
      </a>
    `;
  }

  /* ─── INJETAR ─── */
  const navEl    = document.getElementById('navbar-placeholder');
  const footerEl = document.getElementById('footer-placeholder');

  if (navEl)    navEl.innerHTML    = navbarHTML();
  if (footerEl) footerEl.innerHTML = footerHTML();

  /* ─── MARCAR LINK ATIVO ─── */
  document.querySelectorAll('[data-page]').forEach(link => {
    if (link.dataset.page === currentPage) {
      link.classList.add('active');
    }
  });

  /* Redirecionar clique no carrinho para checkout */
  const cartWrapper = document.getElementById('cartWrapper');
  if (cartWrapper) {
    cartWrapper.addEventListener('click', () => {
      window.location.href = `${ROOT}pages/checkout.html`;
    });
    cartWrapper.style.cursor = 'pointer';
  }

})();
