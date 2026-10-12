/**
 * NA COZINHA COM O FERRARI & CHURRASQUEANDO
 * Interactive E-Commerce & Showcase Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  // =========================================================================
  // 1. PRODUCTS DATA
  // =========================================================================
  const products = [
    {
      id: 1,
      name: 'Kit Churrasco Assinatura Rafael Ferrari',
      category: 'kits',
      price: 449.90,
      regularPrice: 589.00,
      badge: 'ESCOLHA DO FERRARI',
      badgeType: 'gold',
      rating: 5.0,
      reviewsCount: 148,
      image: 'assets/images/banner_kit_ferrari.jpg',
      installments: '3x de R$ 149,96 sem juros',
      description: 'Conjunto completo com Faca Damasco 10", Tábua Teca e Garras de Urso com gravação a laser.'
    },
    {
      id: 2,
      name: 'Faca Picanheira Artesanal Aço Damasco 10"',
      category: 'facas',
      price: 299.90,
      regularPrice: 389.00,
      badge: 'MAIS VENDIDA',
      badgeType: 'fire',
      rating: 4.9,
      reviewsCount: 312,
      image: 'assets/images/prod_faca_artesanal.jpg',
      installments: '3x de R$ 99,96 sem juros',
      description: 'Lâmina nobre forjada com padrão damasco e empunhadura em jacarandá maciço. Bainha inclusa.'
    },
    {
      id: 3,
      name: 'Tábua Nobre de Churrasco Teca com Canaleta',
      category: 'tabuas',
      price: 189.90,
      regularPrice: 249.00,
      badge: 'ALTA DENSIDADE',
      badgeType: 'fire',
      rating: 4.8,
      reviewsCount: 195,
      image: 'assets/images/prod_tabua_teca.jpg',
      installments: '3x de R$ 63,30 sem juros',
      description: 'Madeira nobre tratada com óleo mineral atóxico. Canaleta profunda anti-respingo e pegadores.'
    },
    {
      id: 4,
      name: 'Kit Churrasco 3 Peças em Estojo de Couro',
      category: 'kits',
      price: 349.90,
      regularPrice: 429.00,
      badge: 'COURO LEGÍTIMO',
      badgeType: 'gold',
      rating: 5.0,
      reviewsCount: 88,
      image: 'assets/images/prod_kit_3pecas.jpg',
      installments: '3x de R$ 116,63 sem juros',
      description: 'Faca Chef, garfo tridente e chaira com cabos combinados em estojo enrolável de couro rústico.'
    },
    {
      id: 5,
      name: 'Garras de Urso em Alumínio Maciço com Suporte',
      category: 'acessorios',
      price: 129.90,
      regularPrice: 169.00,
      badge: 'ESSENCIAL',
      badgeType: 'fire',
      rating: 4.9,
      reviewsCount: 224,
      image: 'assets/images/prod_garra_urso.jpg',
      installments: '3x de R$ 43,30 sem juros',
      description: 'Par de garras para desfiar e firmar a carne no corte com base expositora gravada em madeira.'
    },
    {
      id: 6,
      name: 'Faca Gaúcha 8" Lâmina Larga com Bainha',
      category: 'facas',
      price: 249.90,
      regularPrice: 319.00,
      badge: 'TRADIÇÃO',
      badgeType: 'fire',
      rating: 4.8,
      reviewsCount: 76,
      image: 'assets/images/prod_faca_artesanal.jpg',
      installments: '3x de R$ 83,30 sem juros',
      description: 'Corte agressivo e versátil para carnes pesadas, legumes e uso geral na churrasqueira.'
    },
    {
      id: 7,
      name: 'Tábua Grazing Table para Servir & Frios',
      category: 'tabuas',
      price: 169.90,
      regularPrice: 219.00,
      badge: 'DESIGN EXCLUSIVO',
      badgeType: 'gold',
      rating: 4.9,
      reviewsCount: 94,
      image: 'assets/images/prod_tabua_teca.jpg',
      installments: '3x de R$ 56,63 sem juros',
      description: 'Perfeita para mesas de aperitivo, queijos e apresentação de fatias de churrasco com elegância.'
    },
    {
      id: 8,
      name: 'Estojo Roll Master em Couro Bovino',
      category: 'acessorios',
      price: 189.90,
      regularPrice: 239.00,
      badge: 'ACABAMENTO PREMIUM',
      badgeType: 'gold',
      rating: 5.0,
      reviewsCount: 52,
      image: 'assets/images/prod_kit_3pecas.jpg',
      installments: '3x de R$ 63,30 sem juros',
      description: 'Armazene e transporte até 6 facas com fivelas de latão e costuras duplas reforçadas.'
    }
  ];

  // =========================================================================
  // 2. STATE MANAGEMENT
  // =========================================================================
  let cart = [];
  let activeCoupon = 'FERRARI10';
  let couponDiscountPercentage = 0.10; // 10%
  let activeCategory = 'all';
  let searchQuery = '';

  // Free shipping threshold
  const FREE_SHIPPING_THRESHOLD = 299.00;

  // =========================================================================
  // 3. CAROUSEL ENGINE
  // =========================================================================
  const slides = document.querySelectorAll('.carousel-slide');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');
  const indicatorsContainer = document.getElementById('carouselIndicators');
  let currentSlide = 0;
  let carouselInterval = null;

  function initCarousel() {
    if (!slides.length) return;

    // Create indicator dots
    indicatorsContainer.innerHTML = '';
    slides.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.classList.add('indicator-dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(i));
      indicatorsContainer.appendChild(dot);
    });

    prevBtn?.addEventListener('click', () => {
      prevSlide();
      resetCarouselTimer();
    });

    nextBtn?.addEventListener('click', () => {
      nextSlide();
      resetCarouselTimer();
    });

    startCarouselTimer();
  }

  function goToSlide(index) {
    slides[currentSlide].classList.remove('active');
    indicatorsContainer.children[currentSlide]?.classList.remove('active');

    currentSlide = (index + slides.length) % slides.length;

    slides[currentSlide].classList.add('active');
    indicatorsContainer.children[currentSlide]?.classList.add('active');
  }

  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  function prevSlide() {
    goToSlide(currentSlide - 1);
  }

  function startCarouselTimer() {
    carouselInterval = setInterval(nextSlide, 6000);
  }

  function resetCarouselTimer() {
    clearInterval(carouselInterval);
    startCarouselTimer();
  }

  // =========================================================================
  // 3.1 ANNOUNCEMENT BAR ROTATING ENGINE (INFINITE TICKER)
  // =========================================================================
  const announcementSlides = document.querySelectorAll('.announcement-slide');
  let currentAnnouncement = 0;

  function initAnnouncementRotation() {
    if (!announcementSlides.length || announcementSlides.length <= 1) return;

    setInterval(() => {
      announcementSlides[currentAnnouncement]?.classList.remove('active');
      currentAnnouncement = (currentAnnouncement + 1) % announcementSlides.length;
      announcementSlides[currentAnnouncement]?.classList.add('active');
    }, 3600);
  }

  initAnnouncementRotation();

  // =========================================================================
  // 4. PRODUCTS RENDERING & FILTERING
  // =========================================================================
  const productsGrid = document.getElementById('productsGrid');
  const categoryTabs = document.querySelectorAll('.cat-tab');
  const searchInput = document.getElementById('searchInput');

  function renderProducts() {
    if (!productsGrid) return;

    const filtered = products.filter(p => {
      const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
      const matchesSearch = !searchQuery || 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
      productsGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: var(--text-muted);">
          <div style="font-size: 2.5rem; margin-bottom: 12px;">🔍</div>
          <h3 style="font-family: var(--font-heading); color: #fff; margin-bottom: 6px;">Nenhum produto encontrado</h3>
          <p>Tente buscar por outros termos ou selecionar outra categoria.</p>
        </div>
      `;
      return;
    }

    productsGrid.innerHTML = filtered.map(product => {
      const stars = '★'.repeat(Math.floor(product.rating)) + (product.rating % 1 !== 0 ? '½' : '');
      const badgeClass = product.badgeType === 'gold' ? 'product-badge gold' : 'product-badge';

      return `
        <article class="product-card">
          <div class="product-thumb-wrapper">
            <span class="${badgeClass}">${product.badge}</span>
            <img src="${product.image}" alt="${product.name}" class="product-img" loading="lazy">
          </div>
          <div class="product-body">
            <span class="product-cat">${getCategoryLabel(product.category)}</span>
            <h3 class="product-name">${product.name}</h3>
            <div class="product-rating">
              <span>${stars}</span>
              <span class="product-reviews-count">(${product.reviewsCount})</span>
            </div>
            <div class="product-footer-price">
              <span class="price-regular">De ${formatBRL(product.regularPrice)}</span>
              <span class="price-promo">${formatBRL(product.price)}</span>
              <span class="price-installment-small">${product.installments}</span>
              <button class="btn-add-cart" onclick="quickAddToCart(${product.id})">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="8" cy="21" r="1"></circle><circle cx="19" cy="21" r="1"></circle><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path></svg>
                <span>ADICIONAR AO CARRINHO</span>
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  function getCategoryLabel(cat) {
    const map = {
      facas: 'Facas Artesanais',
      tabuas: 'Tábuas Nobres',
      kits: 'Kits Churrasco',
      acessorios: 'Acessórios da Brasa'
    };
    return map[cat] || 'Cutelaria';
  }

  categoryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      categoryTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeCategory = tab.dataset.category;
      renderProducts();
    });
  });

  searchInput?.addEventListener('input', (e) => {
    searchQuery = e.target.value.trim();
    renderProducts();
  });

  // =========================================================================
  // 5. CART DRAWER & STATE
  // =========================================================================
  const cartDrawer = document.getElementById('cartDrawer');
  const cartBackdrop = document.getElementById('cartBackdrop');
  const openCartBtn = document.getElementById('openCartBtn');
  const closeCartBtn = document.getElementById('closeCartBtn');
  const continueShoppingBtn = document.getElementById('continueShoppingBtn');
  const cartCountEl = document.getElementById('cartCount');
  const cartHeaderTotalEl = document.getElementById('cartHeaderTotal');
  const drawerItemCountEl = document.getElementById('drawerItemCount');
  const cartItemsListEl = document.getElementById('cartItemsList');

  // Coupon elements
  const couponInput = document.getElementById('couponInput');
  const applyCouponBtn = document.getElementById('applyCouponBtn');
  const couponFeedback = document.getElementById('couponFeedback');

  // Calculation elements
  const summarySubtotal = document.getElementById('summarySubtotal');
  const summaryDiscountRow = document.getElementById('summaryDiscountRow');
  const summaryDiscount = document.getElementById('summaryDiscount');
  const summaryShipping = document.getElementById('summaryShipping');
  const summaryGrandTotal = document.getElementById('summaryGrandTotal');
  const summaryInstallment = document.getElementById('summaryInstallment');
  const shippingProgressText = document.getElementById('shippingProgressText');
  const shippingProgressFill = document.getElementById('shippingProgressFill');

  function openCart() {
    cartDrawer?.classList.add('active');
    cartBackdrop?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    cartDrawer?.classList.remove('active');
    cartBackdrop?.classList.remove('active');
    document.body.style.overflow = '';
  }

  openCartBtn?.addEventListener('click', openCart);
  closeCartBtn?.addEventListener('click', closeCart);
  cartBackdrop?.addEventListener('click', closeCart);
  continueShoppingBtn?.addEventListener('click', closeCart);

  // Global addToCart accessible from inline handlers
  window.quickAddToCart = function(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existing = cart.find(item => item.id === productId);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();
    openCart();
  };

  window.changeQuantity = function(productId, delta) {
    const item = cart.find(i => i.id === productId);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
      cart = cart.filter(i => i.id !== productId);
    }
    updateCartUI();
  };

  window.removeItem = function(productId) {
    cart = cart.filter(i => i.id !== productId);
    updateCartUI();
  };

  function updateCartUI() {
    // Total items count
    const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    if (cartCountEl) cartCountEl.textContent = totalCount;
    if (drawerItemCountEl) drawerItemCountEl.textContent = `${totalCount} ${totalCount === 1 ? 'item' : 'itens'}`;

    // Subtotal
    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    // Free shipping progress
    const remainingToFree = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
    const progressPercent = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

    if (shippingProgressFill) shippingProgressFill.style.width = `${progressPercent}%`;
    if (shippingProgressText) {
      if (remainingToFree === 0 && subtotal > 0) {
        shippingProgressText.innerHTML = `🎉 Parabéns! Você ganhou <strong>FRETE GRÁTIS!</strong>`;
      } else {
        shippingProgressText.innerHTML = `Faltam <strong>${formatBRL(remainingToFree)}</strong> para <strong>FRETE GRÁTIS!</strong>`;
      }
    }

    // Render items in drawer
    if (cart.length === 0) {
      cartItemsListEl.innerHTML = `
        <div class="empty-cart-message">
          <div class="empty-cart-icon">🛒</div>
          <p style="font-weight: 600; color: #fff; margin-bottom: 4px;">Seu carrinho está vazio</p>
          <p style="font-size: 0.85rem;">Adicione os produtos selecionados pelo Ferrari para começar.</p>
        </div>
      `;
    } else {
      cartItemsListEl.innerHTML = cart.map(item => `
        <div class="cart-item-card">
          <img src="${item.image}" alt="${item.name}" class="cart-item-thumb">
          <div class="cart-item-details">
            <span class="cart-item-title">${item.name}</span>
            <span class="cart-item-price">${formatBRL(item.price * item.quantity)}</span>
            <div class="cart-item-controls">
              <button class="qty-btn" onclick="changeQuantity(${item.id}, -1)">−</button>
              <span class="qty-number">${item.quantity}</span>
              <button class="qty-btn" onclick="changeQuantity(${item.id}, 1)">+</button>
              <button class="btn-remove-item" onclick="removeItem(${item.id})" aria-label="Remover">Excluir</button>
            </div>
          </div>
        </div>
      `).join('');
    }

    // Calculate Discounts & Totals
    let discount = 0;
    if (activeCoupon && subtotal > 0) {
      discount = subtotal * couponDiscountPercentage;
      if (summaryDiscountRow) summaryDiscountRow.style.display = 'flex';
      if (summaryDiscount) summaryDiscount.textContent = `- ${formatBRL(discount)}`;
    } else {
      if (summaryDiscountRow) summaryDiscountRow.style.display = 'none';
    }

    const shipping = (subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0) ? 0 : 29.90;
    if (summaryShipping) {
      summaryShipping.textContent = (shipping === 0 && subtotal > 0) ? 'GRÁTIS' : (subtotal === 0 ? 'A calcular' : formatBRL(shipping));
      if (shipping === 0 && subtotal > 0) {
        summaryShipping.classList.add('free-text');
      } else {
        summaryShipping.classList.remove('free-text');
      }
    }

    const grandTotal = Math.max(0, subtotal - discount + shipping);

    if (summarySubtotal) summarySubtotal.textContent = formatBRL(subtotal);
    if (summaryGrandTotal) summaryGrandTotal.textContent = formatBRL(grandTotal);
    if (cartHeaderTotalEl) cartHeaderTotalEl.textContent = formatBRL(grandTotal);

    if (summaryInstallment) {
      const installmentVal = grandTotal / 3;
      summaryInstallment.textContent = grandTotal > 0 ? `ou em até 3x de ${formatBRL(installmentVal)} sem juros` : 'ou em até 3x sem juros';
    }
  }

  // Coupon handler
  applyCouponBtn?.addEventListener('click', () => {
    const code = couponInput.value.trim().toUpperCase();
    if (code === 'FERRARI10') {
      activeCoupon = 'FERRARI10';
      couponDiscountPercentage = 0.10;
      couponFeedback.className = 'coupon-feedback success';
      couponFeedback.textContent = '✓ Cupom FERRARI10 aplicado! 10% de desconto.';
      updateCartUI();
    } else if (code === '') {
      activeCoupon = null;
      couponFeedback.textContent = '';
      updateCartUI();
    } else {
      couponFeedback.className = 'coupon-feedback error';
      couponFeedback.textContent = '✗ Cupom inválido ou expirado.';
    }
  });

  // =========================================================================
  // 6. CHECKOUT MODAL
  // =========================================================================
  const checkoutBtn = document.getElementById('checkoutBtn');
  const checkoutModalBackdrop = document.getElementById('checkoutModalBackdrop');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const modalOrderSummary = document.getElementById('modalOrderSummary');

  checkoutBtn?.addEventListener('click', () => {
    if (cart.length === 0) {
      alert('Seu carrinho está vazio! Selecione ao menos um produto para continuar.');
      return;
    }

    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const discount = activeCoupon ? subtotal * couponDiscountPercentage : 0;
    const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 29.90;
    const grandTotal = subtotal - discount + shipping;

    modalOrderSummary.innerHTML = `
      <div style="margin-bottom: 8px;"><strong>Resumo da Demonstração:</strong></div>
      <ul style="list-style: none; margin-bottom: 12px; display: flex; flex-direction: column; gap: 4px;">
        ${cart.map(i => `<li>• ${i.quantity}x ${i.name} - <strong>${formatBRL(i.price * i.quantity)}</strong></li>`).join('')}
      </ul>
      <div style="border-top: 1px dashed rgba(255,255,255,0.15); padding-top: 8px;">
        <div>Cupom Utilizado: <strong>${activeCoupon || 'Nenhum'}</strong></div>
        <div>Frete: <strong>${shipping === 0 ? 'Grátis' : formatBRL(shipping)}</strong></div>
        <div style="font-size: 1.1rem; color: var(--accent-gold); margin-top: 4px;">
          Total do Pedido: <strong>${formatBRL(grandTotal)}</strong>
        </div>
      </div>
    `;

    closeCart();
    checkoutModalBackdrop.classList.add('active');
  });

  closeModalBtn?.addEventListener('click', () => {
    checkoutModalBackdrop.classList.remove('active');
  });

  checkoutModalBackdrop?.addEventListener('click', (e) => {
    if (e.target === checkoutModalBackdrop) {
      checkoutModalBackdrop.classList.remove('active');
    }
  });

  // =========================================================================
  // 7. UTILITIES
  // =========================================================================
  function formatBRL(val) {
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  // Preload initial item (Kit Assinatura) in cart for wow presentation effect
  cart.push({ ...products[0], quantity: 1 });
  updateCartUI();
  couponFeedback.className = 'coupon-feedback success';
  couponFeedback.textContent = '✓ Cupom FERRARI10 aplicado automaticamente (10% OFF)';

  // Initial runs
  initCarousel();
  renderProducts();
});
