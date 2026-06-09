// Keily Costa — interazioni leggere
(function () {
  const nav = document.querySelector('.nav');
  const onScroll = () => {
    if (!nav || nav.classList.contains('nav--dark')) return;
    nav.classList.toggle('is-solid', window.scrollY > 60);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // menu mobile
  const burger = document.querySelector('.burger');
  const menu = document.querySelector('.menu');
  if (burger && menu) {
    burger.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      burger.setAttribute('aria-expanded', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    menu.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => {
        menu.classList.remove('open');
        document.body.style.overflow = '';
      })
    );
  }

  // reveal on scroll
  const items = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && items.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.16 });
    items.forEach(el => io.observe(el));
  } else {
    items.forEach(el => el.classList.add('in'));
  }

  // assicura riproduzione video di sfondo
  document.querySelectorAll('video[autoplay]').forEach(v => {
    v.muted = true;
    const p = v.play();
    if (p && p.catch) p.catch(() => {});
  });
})();
