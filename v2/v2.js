(() => {
  'use strict';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const touch = matchMedia('(hover: none)');
  const controllers = [];
  const resets = [];
  const filters = document.querySelector('.work-filters');
  const rows = [...document.querySelectorAll('.mosaic-row')];
  const tiles = [...document.querySelectorAll('.tile')];
  const grid = document.querySelector('.grid');
  const quote = document.querySelector('.owner-quote');
  // Save the approved composition so "All" restores the original row composition.
  const composition = rows.map(row => [...row.children]);

  if (filters) {
    filters.hidden = false;
    filters.addEventListener('click', event => {
      const button = event.target.closest('button[data-filter]');
      if (!button) return;
      const discipline = button.dataset.filter;
      filters.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
      rows.forEach(row => { row.replaceChildren(); row.hidden = true; });
      // Detached tiles also pause and reset their media before the new layout.
      tiles.forEach(tile => { tile.hidden = true; });
      let selected;
      if (discipline === 'all') {
        selected = tiles;
        composition.forEach((items, i) => {
          rows[i].append(...items);
          rows[i].hidden = false;
        });
      } else {
        selected = tiles.filter(tile => tile.dataset.disciplines.split(' ').includes(discipline));
        // Use the same native aspect ratios for each freshly composed row.
        for (let start = 0, i = 0; start < selected.length; start += 4, i++) {
          const items = selected.slice(start, start + 4);
          const ratios = items.map(tile => {
            const [w, h] = tile.style.getPropertyValue('--ratio').split('/').map(Number);
            return w / h;
          });
          const totalRatio = ratios.reduce((sum, ratio) => sum + ratio, 0);
          rows[i].append(...items);
          rows[i].style.setProperty('--tracks', ratios.map(ratio => `${ratio / totalRatio}fr`).join(' '));
          rows[i].style.setProperty('--row-width', `${totalRatio * 420 + (items.length - 1) * 16}px`);
          rows[i].hidden = false;
        }
      }
      if (discipline === 'all') rows.forEach((row, i) => {
        row.style.setProperty('--tracks', composition[i].map(tile => {
          const [w, h] = tile.style.getPropertyValue('--ratio').split('/').map(Number);
          return `${w / h}fr`;
        }).join(' '));
      });
      selected.forEach(tile => { tile.hidden = false; });
      quote.hidden = discipline !== 'all';
      grid.dataset.filter = discipline;
      document.getElementById('filter-status').textContent = `Работ: ${selected.length}`;
      resets.forEach(reset => reset());
    });
  }

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
      const active = tile.isConnected && !tile.hidden && !reduced.matches && !document.hidden && (touch.matches ? visible : hovered);
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
    resets.push(() => { hovered = false; visible = false; sync(); });
  });

  const syncAll = () => controllers.forEach(sync => sync());
  reduced.addEventListener('change', syncAll);
  touch.addEventListener('change', syncAll);
  document.addEventListener('visibilitychange', syncAll);
})();
