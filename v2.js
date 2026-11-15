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
  // "All" puts back the approved tracks; the RAWMID web tile sits under AI pipeline in row 2.
  const approvedTracks = rows.map(row => row.style.getPropertyValue("--tracks"));

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
        row.style.setProperty('--tracks', approvedTracks[i]);
      });
      selected.forEach(tile => { tile.hidden = false; });
      quote.hidden = discipline !== 'all';
      grid.dataset.filter = discipline;
      const status = document.getElementById('filter-status');
      status.textContent = `${status.dataset.countLabel || 'Работ'}: ${selected.length}`;
      resets.forEach(reset => reset());
    });
  }

  // Телефон: слайды крутятся только у одной плитки — той, что ближе к середине экрана
  const touchSeen = new Set();
  let touchCurrent = null;
  function pickTouch() {
    let best = null, bestD = Infinity;
    const mid = innerHeight / 2;
    touchSeen.forEach(t => {
      if (t.hidden) return;
      const r = t.getBoundingClientRect();
      const d = Math.abs(r.top + r.height / 2 - mid);
      if (d < bestD) { bestD = d; best = t; }
    });
    if (best === touchCurrent) return;
    touchCurrent = best;
    controllers.forEach(f => f());
  }
  let touchFrame = 0;
  addEventListener('scroll', () => {
    if (!touch.matches || touchFrame) return;
    touchFrame = requestAnimationFrame(() => { touchFrame = 0; pickTouch(); });
  }, { passive: true });

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
      const active = tile.isConnected && !tile.hidden && !reduced.matches && !document.hidden && (touch.matches ? visible && touchCurrent === tile : hovered);
      if (active === running) return;
      running = active;
      clearInterval(timer);
      timer = null;
      show(0);
      if (running && slides.length > 1) {
        timer = setInterval(() => show((index + 1) % slides.length), 1400);
      }
    }

    tile.addEventListener('mouseenter', () => { hovered = true; sync(); });
    tile.addEventListener('mouseleave', () => { hovered = false; sync(); });
    const observer = new IntersectionObserver(entries => {
      visible = entries[0].intersectionRatio >= .6;
      if (visible) touchSeen.add(tile); else touchSeen.delete(tile);
      pickTouch();
      sync();
    }, { threshold: [0, .6, 1] });
    observer.observe(tile);
    controllers.push(sync);
    resets.push(() => { hovered = false; visible = false; sync(); });
  });

  // Standalone videos remain user-controlled when reduced motion is requested.
  document.querySelectorAll('video:not(.tile video)').forEach(video => {
    const autoplay = video.autoplay;
    const loop = video.loop;
    const sync = () => {
      video.autoplay = autoplay && !reduced.matches;
      video.loop = loop && !reduced.matches;
      if (reduced.matches) video.pause();
    };
    controllers.push(sync);
    sync();
  });

  const syncAll = () => controllers.forEach(sync => sync());
  reduced.addEventListener('change', syncAll);
  touch.addEventListener('change', syncAll);
  document.addEventListener('visibilitychange', syncAll);
})();

/* 09.11.2026 Метод: импульс бежит по ленте, узлы загораются по очереди, дуги возврата дорисовываются в конце
   оборота; три оборота с ускорением повторных этапов, пауза, повтор (логика лендинга без GSAP). */
(() => {
  const board = document.querySelector('.mflow');
  if (!board || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const nodes = [...board.querySelectorAll('.mflow-node')], pulse = board.querySelector('.mflow-pulse');
  const arcs = [...board.querySelectorAll('.mflow-arcs path')];
  const lens = arcs.map(p => p.getTotalLength());
  const wait = ms => new Promise(r => setTimeout(r, ms));
  const hideArcs = () => arcs.forEach((p, i) => { p.style.transition = 'none'; p.style.strokeDasharray = lens[i]; p.style.strokeDashoffset = lens[i]; p.style.opacity = 0; });
  const laps = [{ step: 500, quick: [] }, { step: 320, quick: [1, 2] }, { step: 200, quick: [1, 2, 4] }];
  let visible = true;
  new IntersectionObserver(es => es.forEach(e => { visible = e.isIntersecting; }), { threshold: .25 }).observe(board);
  const run = async () => {
    for (;;) {
      if (!visible || document.hidden) { await wait(400); continue; }
      const wide = getComputedStyle(pulse).display !== 'none';
      const bb = board.getBoundingClientRect();
      const xs = nodes.map(n => { const b = n.getBoundingClientRect(); return b.left - bb.left + 22; });
      const y = nodes[0].getBoundingClientRect().top - bb.top;
      for (const lap of laps) {
        hideArcs();
        pulse.style.transition = 'none'; pulse.style.transform = `translate(${xs[0]}px, ${y}px)`; pulse.style.opacity = wide ? 1 : 0;
        nodes[0].classList.add('is-lit');
        for (let i = 1; i < nodes.length; i++) {
          const d = lap.quick.includes(i) ? lap.step * .42 : lap.step;
          await wait(20);
          pulse.style.transition = `transform ${d}ms ease-in-out`; pulse.style.transform = `translate(${xs[i]}px, ${y}px)`;
          await wait(d); nodes[i].classList.add('is-lit');
        }
        for (const [k, p] of arcs.entries()) { p.style.opacity = 1; p.style.transition = `stroke-dashoffset 500ms ease-out ${Math.floor(k / 3) * 140}ms`; }
        await wait(20); arcs.forEach(p => { p.style.strokeDashoffset = 0; });
        await wait(700); pulse.style.transition = 'opacity 220ms'; pulse.style.opacity = 0;
        await wait(250); nodes.forEach(n => n.classList.remove('is-lit')); await wait(350);
      }
      await wait(1200);
    }
  };
  hideArcs(); run();
})();

/* 15.11.2026: on touch the tile caption hides under an "i" badge; tapping it shows the caption over the frame on a gradient, like hover on desktop. */
(() => {
  if (!window.matchMedia('(hover: none)').matches) return;
  const en = (document.documentElement.lang || '').startsWith('en');
  document.querySelectorAll('.home .tile:not(.later)').forEach(tile => {
    if (!tile.querySelector(':scope > .cap')) return;
    const b = document.createElement('span');
    b.className = 'cap-i'; b.textContent = 'i';
    b.setAttribute('role', 'button'); b.setAttribute('tabindex', '0');
    b.setAttribute('aria-label', en ? 'About this case' : 'О кейсе'); b.setAttribute('aria-expanded', 'false');
    const toggle = e => { e.preventDefault(); e.stopPropagation(); const o = tile.classList.toggle('cap-open'); b.setAttribute('aria-expanded', o ? 'true' : 'false'); };
    b.addEventListener('click', toggle);
    b.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') toggle(e); });
    tile.appendChild(b);
  });
})();

// Телефон: меню за кнопкой, язык отдельно
(() => {
  const nav = document.querySelector('.top nav');
  if (!nav) return;
  const en = document.documentElement.lang === 'en';
  const b = document.createElement('button');
  b.type = 'button';
  b.className = 'menu-btn';
  b.setAttribute('aria-expanded', 'false');
  b.innerHTML = '<span aria-hidden="true"></span>' + (en ? 'Menu' : 'Меню');
  b.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    b.setAttribute('aria-expanded', String(open));
  });
  const panel = document.createElement('div');
  panel.className = 'menu-panel';
  [...nav.querySelectorAll('a:not(.language-switch)')].forEach(a => panel.appendChild(a));
  nav.prepend(b, panel);
  const close = () => { nav.classList.remove('open'); b.setAttribute('aria-expanded', 'false'); };
  nav.addEventListener('click', e => { if (e.target.closest('a')) close(); });
  document.addEventListener('click', e => { if (!nav.contains(e.target)) close(); });
  addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
})();
