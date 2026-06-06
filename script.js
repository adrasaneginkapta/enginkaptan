/* ── Tema toggle ── */
(function () {
  const html = document.documentElement;
  const btn = document.querySelector('[data-theme-toggle]');

  const SUN = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
    <circle cx="12" cy="12" r="5"/>
    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
  </svg>`;

  const MOON = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>`;

  // Sistem tercihini oku, data-theme yoksa uygula
  let theme = html.getAttribute('data-theme');
  if (!theme) {
    theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    html.setAttribute('data-theme', theme);
  }

  function applyTheme(t) {
    html.setAttribute('data-theme', t);
    if (btn) {
      btn.innerHTML = t === 'dark' ? SUN : MOON;
      btn.setAttribute('aria-label', t === 'dark' ? 'Aydınlık moda geç' : 'Karanlık moda geç');
    }
  }

  applyTheme(theme);

  if (btn) {
    btn.addEventListener('click', () => {
      theme = theme === 'dark' ? 'light' : 'dark';
      applyTheme(theme);
    });
  }
})();

/* ── Mobil menü ── */
(function () {
  const toggle = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-menu]');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
    toggle.textContent = open ? '✕' : '☰';
  });

  // Dışarıya tıklayınca kapat
  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && !toggle.contains(e.target)) {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.textContent = '☰';
    }
  });
})();

/* ── Scroll: header arka plan ── */
(function () {
  const header = document.querySelector('.site-header');
  if (!header) return;
  const update = () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', update, { passive: true });
  update();
})();

/* ── Reveal animasyonu ── */
(function () {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  items.forEach(el => io.observe(el));
})();
