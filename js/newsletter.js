/* ============================================================
   ArtMagma — js/newsletter.js
   Validação e feedback do formulário de newsletter.
   ============================================================ */

(function () {
  function init() {
    const form     = document.getElementById('newsletterForm');
    const input    = document.getElementById('newsletterEmail');
    const feedback = document.getElementById('newsletterFeedback');

    if (!form || !input || !feedback) return;

    form.addEventListener('submit', e => {
      e.preventDefault();
      const email = input.value.trim();

      if (!isValid(email)) {
        setFeedback(feedback, '⚠ E-mail inválido. Tente novamente.', 'err');
        input.focus();
        return;
      }

      /* Aqui futuramente: POST para sua API ou serviço de e-mail marketing */
      setFeedback(feedback, '✔ Cadastrado com sucesso! Obrigado.', 'ok');
      input.value = '';

      setTimeout(() => {
        feedback.textContent = '';
        feedback.className = 'form-feedback';
      }, 5000);
    });

    function isValid(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function setFeedback(el, msg, type) {
      el.textContent = msg;
      el.className = `form-feedback form-feedback--${type}`;
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
