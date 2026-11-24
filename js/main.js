/* =========================================================
   Mikhael Moraes · Advogado — interações da landing page
   - Menu hambúrguer (celular/tablet)
   - Destaque da seção visível no menu (IntersectionObserver)
   - Botão "voltar ao topo"
   A rolagem suave é feita via CSS (scroll-behavior).
   ========================================================= */
(function () {
  'use strict';

  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('menu-principal');
  var navLinks = Array.prototype.slice.call(nav.querySelectorAll('a[href^="#"]'));
  var toggleLabel = toggle.querySelector('.sr-only');

  /* ---------- Menu hambúrguer ---------- */
  function setMenu(open) {
    toggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
    toggleLabel.textContent = open ? 'Fechar menu' : 'Abrir menu';
  }

  toggle.addEventListener('click', function () {
    setMenu(toggle.getAttribute('aria-expanded') !== 'true');
  });

  // Fecha o menu ao escolher uma seção
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () { setMenu(false); });
  });

  // Fecha com a tecla Esc
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      setMenu(false);
      toggle.focus();
    }
  });

  /* ---------- Seção ativa no menu ---------- */
  var sections = navLinks
    .map(function (link) { return document.querySelector(link.getAttribute('href')); })
    .filter(Boolean);

  function setActive(id) {
    navLinks.forEach(function (link) {
      var active = link.getAttribute('href') === '#' + id;
      link.classList.toggle('is-active', active);
      if (active) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
  }

  if ('IntersectionObserver' in window) {
    // Faixa de detecção no terço superior da tela
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, { rootMargin: '-35% 0px -60% 0px', threshold: 0 });

    sections.forEach(function (section) { observer.observe(section); });
  }

  // No fim da página, a última seção pode ser curta demais para cruzar a faixa
  function checkBottom() {
    var atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
    if (atBottom) setActive(sections[sections.length - 1].id);
  }

  /* ---------- Voltar ao topo ---------- */
  var backToTop = document.querySelector('.back-to-top');
  var ticking = false;

  function onScroll() {
    backToTop.classList.toggle('is-visible', window.scrollY > 600);
    checkBottom();
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });

  onScroll();
})();
