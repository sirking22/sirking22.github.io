(() => {
  'use strict';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const touch = matchMedia('(hover: none)');
  const controllers = [];

  document.querySelectorAll('.tile').forEach(tile => {
    const slides = [...tile.querySelectorAll('.slide')];
    if (!slides.length) return;
    const dots = [...tile.querySelectorAll('.dots i')];
    let index = 0;
    let timer = null;
    let hovered = false;
    let visible = false;
    let running = false;

    function show(next) {
      index = next;
      slides.forEach((slide, i) => {
        slide.classList.toggle('is-active', i === index);
        if (slide.tagName !== 'VIDEO') return;
        if (i === index && running) {
          slide.play().catch(() => {});
        } else {
          slide.pause();
          if (slide.readyState) slide.currentTime = 0;
        }
      });
      dots.forEach((dot, i) => dot.classList.toggle('is-active', i === index));
    }

    function sync() {
      const active = !reduced.matches && !document.hidden && (touch.matches ? visible : hovered);
      if (active === running) return;
      running = active;
      clearInterval(timer);
      timer = null;
      show(0);
      if (running && slides.length > 1) {
        timer = setInterval(() => show((index + 1) % slides.length), 700);
      }
    }

    tile.addEventListener('mouseenter', () => { hovered = true; sync(); });
    tile.addEventListener('mouseleave', () => { hovered = false; sync(); });
    const observer = new IntersectionObserver(entries => {
      visible = entries[0].intersectionRatio >= .6;
      sync();
    }, { threshold: [0, .6, 1] });
    observer.observe(tile);
    controllers.push(sync);
  });

  const syncAll = () => controllers.forEach(sync => sync());
  reduced.addEventListener('change', syncAll);
  touch.addEventListener('change', syncAll);
  document.addEventListener('visibilitychange', syncAll);
})();
