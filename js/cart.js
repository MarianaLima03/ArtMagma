/* ============================================================
   ArtMagma — js/cart.js
   Gerenciamento do carrinho com localStorage.
   Funciona em todas as páginas.
   ============================================================ */

const Cart = (function () {
  const KEY = 'artmagma_cart';

  /* ─── Leitura / Escrita ─── */
  function getAll() {
    try {
      return JSON.parse(localStorage.getItem(KEY)) || [];
    } catch {
      return [];
    }
  }

  function save(items) {
    localStorage.setItem(KEY, JSON.stringify(items));
  }

  /* ─── Operações ─── */
  function add(product) {
    const items = getAll();
    const existing = items.find(i => i.id === product.id);

    if (existing) {
      existing.qty += 1;
    } else {
      items.push({ ...product, qty: 1 });
    }

    save(items);
    updateBadge();
    showToast(`✔ ${product.nome} adicionado ao carrinho!`);
  }

  function remove(id) {
    save(getAll().filter(i => i.id !== id));
    updateBadge();
  }

  function changeQty(id, delta) {
    const items = getAll();
    const item = items.find(i => i.id === id);
    if (!item) return;

    item.qty += delta;
    if (item.qty <= 0) {
      save(items.filter(i => i.id !== id));
    } else {
      save(items);
    }
    updateBadge();
  }

  function clear() {
    save([]);
    updateBadge();
  }

  function total() {
    return getAll().reduce((sum, i) => sum + i.preco * i.qty, 0);
  }

  function count() {
    return getAll().reduce((sum, i) => sum + i.qty, 0);
  }

  /* ─── Badge ─── */
  function updateBadge() {
    const badge = document.getElementById('cartBadge');
    if (!badge) return;

    const n = count();
    badge.textContent = n > 99 ? '99+' : n;

    /* Animação de bump */
    badge.classList.remove('bump');
    void badge.offsetWidth; // reflow para reiniciar animação
    badge.classList.add('bump');
    setTimeout(() => badge.classList.remove('bump'), 300);
  }

  /* ─── Toast ─── */
  function showToast(msg) {
    let toast = document.getElementById('toast');
    if (!toast) return;

    clearTimeout(Cart._toastTimer);
    toast.textContent = msg;
    toast.classList.add('show');

    Cart._toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
  }

  /* ─── Render (página de checkout) ─── */
  function renderCheckout() {
    const list    = document.getElementById('cartItemsList');
    const totalEl = document.getElementById('cartTotalValue');
    const emptyEl = document.getElementById('cartEmpty');
    const formEl  = document.getElementById('checkoutFormSection');

    if (!list) return;

    const items = getAll();

    if (items.length === 0) {
      list.innerHTML = '';
      if (emptyEl)  emptyEl.classList.remove('hidden');
      if (formEl)   formEl.classList.add('hidden');
      if (totalEl)  totalEl.textContent = 'R$ 0,00';
      return;
    }

    if (emptyEl) emptyEl.classList.add('hidden');
    if (formEl)  formEl.classList.remove('hidden');

    list.innerHTML = items.map(item => `
      <div class="cart-item" data-id="${item.id}">
        <img src="${item.imagem}" alt="${item.nome}" loading="lazy"/>
        <div class="cart-item__info">
          <div class="cart-item__name">${item.nome}</div>
          <div class="cart-item__price">
            R$ ${(item.preco * item.qty).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
        </div>
        <div class="cart-item__qty">
          <button class="qty-dec" data-id="${item.id}" aria-label="Diminuir">−</button>
          <span>${item.qty}</span>
          <button class="qty-inc" data-id="${item.id}" aria-label="Aumentar">+</button>
        </div>
        <button class="cart-item__remove" data-id="${item.id}" aria-label="Remover ${item.nome}">
          <i class="fas fa-trash-can"></i>
        </button>
      </div>
    `).join('');

    /* Subtotal, frete, total */
    const subtotal = total();
    const frete    = subtotal > 0 ? (subtotal >= 500 ? 0 : 29.90) : 0;
    const totalFinal = subtotal + frete;

    document.getElementById('cartSubtotal').textContent =
      'R$ ' + subtotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
    document.getElementById('cartFrete').textContent =
      frete === 0 ? 'Grátis' : 'R$ ' + frete.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
    if (totalEl) totalEl.textContent =
      'R$ ' + totalFinal.toLocaleString('pt-BR', { minimumFractionDigits: 2 });

    /* Eventos dos botões */
    list.querySelectorAll('.qty-dec').forEach(btn => {
      btn.addEventListener('click', () => { changeQty(+btn.dataset.id, -1); renderCheckout(); });
    });
    list.querySelectorAll('.qty-inc').forEach(btn => {
      btn.addEventListener('click', () => { changeQty(+btn.dataset.id, +1); renderCheckout(); });
    });
    list.querySelectorAll('.cart-item__remove').forEach(btn => {
      btn.addEventListener('click', () => { remove(+btn.dataset.id); renderCheckout(); });
    });
  }

  /* ─── Init ─── */
  function init() {
    updateBadge();

    /* Botões "Adicionar ao carrinho" */
    document.addEventListener('click', e => {
      const btn = e.target.closest('[data-add-cart]');
      if (!btn) return;

      add({
        id:     +btn.dataset.id,
        nome:   btn.dataset.nome,
        preco:  +btn.dataset.preco,
        imagem: btn.dataset.imagem || '',
      });
    });

    /* Renderizar checkout se estivermos nessa página */
    if (document.getElementById('cartItemsList')) {
      renderCheckout();
    }
  }

  document.addEventListener('DOMContentLoaded', init);

  /* API pública */
  return { add, remove, changeQty, clear, getAll, total, count, updateBadge, renderCheckout };
})();
