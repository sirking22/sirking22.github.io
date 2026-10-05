/* 05.10.2026: экран «Цикл» — сцена со стенда source/cycle-gpt/stand.html,
   композиция K3 «два кольца рядом», анимация «путь одной задачи».
   Выбор владельца 02–04.10.2026 (decisions/DECISIONS.md): развитие —
   Исследование → … → Формат; мост «масштаб» в регулярный выпуск; в центре
   восьмёрки знание; метки «A» — только переходы, которые уже ведут агенты.
   Кадр — функция времени render(t), как на стенде. Правка смысла или
   раскладки — сначала на стенде, потом сюда: стенд остаётся черновиком.
   Сцена проигрывается, когда экран в кадре, держит итог и повторяется.
   При prefers-reduced-motion сразу стоит итоговый кадр. */
(function () {
  var scene = document.querySelector('#flow .cycle-scene');
  if (!scene) return;
  var svg = scene.querySelector('svg'), capEl = document.querySelector('#flow .cycle-cap');

  var INK = '#101010', LINE = '#9F9B94', ACC = '#FF4B08';
  var rad = function (a) { return a * Math.PI / 180; }, f = function (n) { return n.toFixed(1); };
  var clamp = function (p) { return p < 0 ? 0 : p > 1 ? 1 : p; };
  var eo = function (p) { return 1 - Math.pow(1 - p, 3); };
  var eio = function (p) { return p < .5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2; };
  var win = function (t, a, b, w) { return t < a ? 0 : t < a + w ? (t - a) / w : t < b ? 1 : t < b + w ? 1 - (t - b) / w : 0; };

  // ---- смысл: этапы через 360/7 от верхней точки; b — что выходит на этапе
  var STEP = 360 / 7;
  var STAGES = [
    { n: 'Исследование', t: 'research', b: ['карта рынка, референсы'] },
    { n: 'Диагностика', t: 'diagnosis', b: ['разрыв: цель против факта'] },
    { n: 'Гипотеза', t: 'hypothesis', b: ['что меняем', 'и какой эффект ждём'] },
    { n: 'Концепт', t: 'concept', b: ['макет, прототип, ТЗ команде'] },
    { n: 'Тест', t: 'test', b: ['замер на аудитории'] },
    { n: 'Вывод', t: 'insight', b: ['что подтвердилось', 'и где граница'] },
    { n: 'Формат', t: 'format', b: ['шаблон и скилл для команды'] }
  ].map(function (x, i) { x.a = -90 + i * STEP; return x; });
  var SECT = [['DISCOVER', 0, 0], ['DEFINE', 1, 2], ['DEVELOP', 3, 3], ['DELIVER', 4, 4], ['LEARN', 5, 6]];
  var INNER = ['типовая задача', 'производство', 'приёмка', 'релиз', 'факт'];

  // ---- композиция K3 в поле 1000 × 562,5
  var K = { c1: [700, 318], R: 140, c2: [318, 345], RI: 98, dir2: -1,
    inner: [[-72, [-8, -14, 'end']], [-144, 'in'], [144, 'in'], [72, 'in'], [0, 'in']],
    hub: [488, 300, 40], labelAt: { 5: 'below' }, bend: 80, genCtrl: [680, 370],
    band: { y: 534, x0: 145, x1: 855 } };

  // ---- сценарий
  var STG = [
    'Исследования и референсы',
    'Разрыв между целью и фактом',
    'Гипотеза: что изменить и почему',
    'Концепт и реализация через команду',
    'Тест на аудитории',
    'Вывод с границами применимости',
    'Подтверждённое становится форматом'
  ];
  var INN = [
    'Масштаб: формат уходит в регулярный выпуск типовой задачей',
    'Производство по типовой задаче',
    'Приёмка по критериям формата',
    'Релиз по плану выпуска',
    'Факт: метрики и трудозатраты'
  ];
  var CAP = {
    dev: 'Внешнее кольцо — развитие: поиск и проверка нового',
    fact: 'Факты выпуска копятся в знании',
    concl: 'Выводы тестов — туда же: доказательства → атомы → паттерны',
    gen: 'Паттерны питают новые гипотезы',
    agents: 'Метки «A» — переходы, которые уже ведут агенты: сбор фактов, ночные прогоны'
  };
  var R1 = ['r1', 'tick', 'sect'].concat(STAGES.map(function (_, i) { return 'n' + i; }));
  var R2 = ['r2', 'stream'].concat(INNER.map(function (_, i) { return 'i' + i; }));
  var BEATS = [{ d: 1.3, cap: CAP.dev, show: [['r1', 0, 1.2], ['tick', 0.3, 0.8], ['sect', 0.6, 0.7]] }]
    .concat(STAGES.map(function (s, i) {
      return { d: 1.5, cap: STG[i], focus: [i], show: [['n' + i, 0.5, 0.5]],
        pulse: { k: 'r1', a0: i ? STAGES[i - 1].a : -90, a1: s.a, t0: 0, d: 0.6 } };
    }))
    .concat([{ d: 2.2, cap: INN[0], dim: R1, focus2: [0], show: [['r2', 0, 0.8], ['stream', 0.4, 0.6], ['bridge', 0.3, 0.8], ['bridgeL', 0.9, 0.5], ['i0', 1.1, 0.5]], pulse: { k: 'path', id: 'bridge', t0: 0.3, d: 0.8 } }])
    .concat([1, 2, 3, 4].map(function (j) {
      return { d: 1.3, cap: INN[j], dim: R1, focus2: [j], show: [['i' + j, 0.5, 0.5]], pulse: { k: 'r2', i0: j - 1, i1: j, t0: 0, d: 0.6 } };
    }))
    .concat([
      { d: 1.8, cap: CAP.fact, dim: R1, hub: 1, show: [['hub', 0, 0.6], ['fact', 0.3, 0.5]], pulse: { k: 'path', id: 'fact', t0: 0.3, d: 0.6 } },
      { d: 1.8, cap: CAP.concl, dim: R2, hub: 1, focus: [5], show: [['concl', 0, 0.5]], pulse: { k: 'path', id: 'concl', t0: 0.1, d: 0.6 } },
      { d: 2.0, cap: CAP.gen, dim: R2, focus: [2], show: [['gen', 0, 1.0]], pulse: { k: 'path', id: 'gen', t0: 0, d: 1.0 } },
      { d: 2.0, cap: CAP.agents, show: [['band', 0, 0.6], ['ag', 0.3, 0.5]] },
      { d: 2.5, cap: '', show: [] }
    ]);
  var S = (function () {
    var t = 0, app = {}, beats = [];
    BEATS.forEach(function (b) {
      var x = {}; for (var k in b) x[k] = b[k]; x.t0 = t; x.t1 = t + b.d; beats.push(x);
      (b.show || []).forEach(function (s) { if (!app[s[0]]) app[s[0]] = { t0: t + s[1], d: s[2] }; });
      t += b.d;
    });
    return { app: app, beats: beats, T: t };
  })();
  // Подряд идущие шаги с одним признаком (dim, focus, hub) — один отрезок
  // времени. Окно по каждому шагу отдельно гасило признак на стыке шагов:
  // первое кольцо мигало при каждом переходе по второму (владелец, 05.10)
  var spanCache = {};
  function spans(key, test) {
    if (spanCache[key]) return spanCache[key];
    var out = [];
    S.beats.forEach(function (x) {
      if (!test(x)) return;
      var l = out[out.length - 1];
      if (l && Math.abs(l[1] - x.t0) < 1e-6) l[1] = x.t1; else out.push([x.t0, x.t1]);
    });
    return (spanCache[key] = out);
  }
  function level(sp, t, w) { var v = 0; sp.forEach(function (s) { v = Math.max(v, win(t, s[0], s[1], w)); }); return v; }
  var MODE = function (k) { return ['r1', 'bridge', 'gen'].indexOf(k) >= 0 ? 'draw' : k === 'r2' ? 'grow' : /^[nim]\d$/.test(k) ? 'pop' : 'fade'; };

  // ---- сборка
  var u = 'cy';
  var cx = K.c1[0], cy = K.c1[1], R = K.R, qx = K.c2[0], qy = K.c2[1], RI = K.RI, hx = K.hub[0], hy = K.hub[1], hr = K.hub[2];
  var p1 = function (r, a) { return [cx + r * Math.cos(rad(a)), cy + r * Math.sin(rad(a))]; };
  var p2 = function (r, a) { return [qx + r * Math.cos(rad(a)), qy + r * Math.sin(rad(a))]; };
  var ph = function (a) { return [hx + hr * Math.cos(rad(a)), hy + hr * Math.sin(rad(a))]; };
  var arc = function (c, r, a0, a1) {
    var x0 = c[0] + r * Math.cos(rad(a0)), y0 = c[1] + r * Math.sin(rad(a0)), x1 = c[0] + r * Math.cos(rad(a1)), y1 = c[1] + r * Math.sin(rad(a1));
    return 'M' + f(x0) + ' ' + f(y0) + ' A ' + r + ' ' + r + ' 0 ' + (Math.abs(a1 - a0) > 180 ? 1 : 0) + ' ' + (a1 > a0 ? 1 : 0) + ' ' + f(x1) + ' ' + f(y1);
  };
  // подпись по дуге головой вверх: в нижней половине путь идёт против часовой
  var up = function (id, c, r, rLow, a, span, cls, txt) {
    var low = Math.sin(rad(a)) > 0.05, rr = low ? rLow : r;
    var d = low ? arc(c, rr, a + span, a - span) : arc(c, rr, a - span, a + span);
    return '<path id="' + u + id + '" d="' + d + '" fill="none"/><text class="' + cls + '"><textPath href="#' + u + id + '" startOffset="50%" text-anchor="middle">' + txt + '</textPath></text>';
  };
  var toward = function (A, B, d) { var L = Math.hypot(B[0] - A[0], B[1] - A[1]); return [A[0] + (B[0] - A[0]) * d / L, A[1] + (B[1] - A[1]) * d / L]; };
  var quad = function (A, C, B) {
    return { d: 'M' + f(A[0]) + ' ' + f(A[1]) + ' Q ' + f(C[0]) + ' ' + f(C[1]) + ', ' + f(B[0]) + ' ' + f(B[1]),
      rev: 'M' + f(B[0]) + ' ' + f(B[1]) + ' Q ' + f(C[0]) + ' ' + f(C[1]) + ', ' + f(A[0]) + ' ' + f(A[1]),
      mid: [(A[0] + 2 * C[0] + B[0]) / 4, (A[1] + 2 * C[1] + B[1]) / 4] };
  };
  var bent = function (A, B, bend) { var L = Math.hypot(B[0] - A[0], B[1] - A[1]); return quad(A, [(A[0] + B[0]) / 2 - (B[1] - A[1]) / L * bend, (A[1] + B[1]) / 2 + (B[0] - A[0]) / L * bend], B); };
  var g = function (k, inner, extra) { return '<g data-k="' + k + '" ' + (extra || '') + '>' + inner + '</g>'; };
  var badge = function (P) { return '<circle cx="' + f(P[0]) + '" cy="' + f(P[1]) + '" r="5.5" fill="' + ACC + '"/><text x="' + f(P[0]) + '" y="' + f(P[1] + 2.5) + '" class="t-badge" text-anchor="middle">A</text>'; };
  var mk = 'url(#' + u + 'ret)';
  var N = STAGES.map(function (s) { return p1(R, s.a); });
  var s = '<defs><marker id="' + u + 'ret" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M1 1 L9 5 L1 9" fill="none" stroke="' + ACC + '" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></marker></defs>';

  // рамка развития: пунктир с делениями
  var t = '<circle cx="' + cx + '" cy="' + cy + '" r="' + (R + 9) + '" fill="none" stroke="' + LINE + '" stroke-width="0.6" stroke-dasharray="2 3"/>';
  for (var a = -90; a < 270; a += 6) { var A1 = p1(R + 9, a), A2 = p1(R + 13, a); t += '<line x1="' + f(A1[0]) + '" y1="' + f(A1[1]) + '" x2="' + f(A2[0]) + '" y2="' + f(A2[1]) + '" stroke="' + LINE + '" stroke-width="0.6"/>'; }
  s += g('tick', t);
  // сектора двойного алмаза
  t = '';
  SECT.forEach(function (x, i) {
    var a0 = STAGES[x[1]].a - STEP / 2, a1 = STAGES[x[2]].a + STEP / 2, B1 = p1(R - 26, a0), B2 = p1(R + 22, a0);
    t += '<line x1="' + f(B1[0]) + '" y1="' + f(B1[1]) + '" x2="' + f(B2[0]) + '" y2="' + f(B2[1]) + '" stroke="' + INK + '" stroke-width="0.8"/>';
    t += up('sec' + i, K.c1, R - 30, R - 22, (a0 + a1) / 2, 30, 't-sector', x[0]);
  });
  s += g('sect', t);
  s += '<circle data-k="r1" cx="' + cx + '" cy="' + cy + '" r="' + R + '" fill="none" stroke="' + INK + '" stroke-width="1.3" pathLength="1" stroke-dasharray="1 1" transform="rotate(-90 ' + cx + ' ' + cy + ')"/>';
  // регулярный выпуск
  s += g('r2', '<circle cx="' + qx + '" cy="' + qy + '" r="' + RI + '" fill="none" stroke="' + INK + '" stroke-width="0.9" stroke-dasharray="5 3"/>', 'style="transform-origin:' + qx + 'px ' + qy + 'px"');
  s += g('stream', up('stream', K.c2, RI + 8, RI + 17, 90, 42, 't-stream', 'регулярный выпуск'));
  K.inner.forEach(function (x, k) {
    var a = x[0], side = x[1], P = p2(RI, a), w = INNER[k], lab;
    if (Array.isArray(side)) lab = '<text x="' + f(P[0] + side[0]) + '" y="' + f(P[1] + side[1]) + '" class="t-inner" text-anchor="' + side[2] + '">' + w + '</text>';
    else {
      var sg = side === 'out' ? 1 : -1, L = p2(RI + sg * 12, a), c = Math.cos(rad(a)) * sg;
      lab = '<text x="' + f(L[0]) + '" y="' + f(L[1] + 3.5 + Math.sin(rad(a)) * sg * 4) + '" class="t-inner" text-anchor="' + (c > 0.3 ? 'start' : c < -0.3 ? 'end' : 'middle') + '">' + w + '</text>';
    }
    s += g('i' + k, '<circle class="dot" cx="' + f(P[0]) + '" cy="' + f(P[1]) + '" r="3"/>' + lab, 'class="inn" style="transform-origin:' + f(P[0]) + 'px ' + f(P[1]) + 'px"');
  });
  // знание в центре восьмёрки
  s += g('hub', '<circle class="hc" cx="' + hx + '" cy="' + hy + '" r="' + hr + '" fill="var(--paper)" stroke="' + INK + '" stroke-width="1"/><text x="' + hx + '" y="' + (hy - 10) + '" class="t-core" text-anchor="middle">Знание</text>'
    + ['доказательства', '→ атомы', '→ паттерны'].map(function (l, i) { return '<text x="' + hx + '" y="' + (hy + 3 + i * 10.5) + '" class="t-base" text-anchor="middle">' + l + '</text>'; }).join(''), 'class="hub"');
  // мост «масштаб»: формат → типовая задача, дугой над подписью этапа
  var T0 = p2(RI, K.inner[0][0]), br = bent([N[6][0], N[6][1] - 13], toward(T0, N[6], 5), K.bend);
  s += '<path data-k="bridge" id="' + u + 'bridge" d="' + br.d + '" fill="none" stroke="' + ACC + '" stroke-width="1.4" pathLength="1" stroke-dasharray="1 1" data-mk="' + mk + '"/>';
  s += g('bridgeL', '<path id="' + u + 'brl" d="' + br.rev + '" fill="none"/><text class="t-hand" dy="-7"><textPath href="#' + u + 'brl" startOffset="50%" text-anchor="middle">масштаб</textPath></text>');
  // факт выпуска → знание; вывод теста → знание; паттерны → гипотеза
  var F = p2(RI, K.inner[4][0]), fq = bent(toward(F, ph(160), 5), toward(ph(160), F, 3), 0);
  s += '<path data-k="fact" id="' + u + 'fact" d="' + fq.d + '" fill="none" stroke="' + ACC + '" stroke-width="1.2" stroke-dasharray="2 3" marker-end="' + mk + '"/>';
  var cq = bent(toward(N[5], ph(50), 13), toward(ph(50), N[5], 3), 0);
  s += '<path data-k="concl" id="' + u + 'concl" d="' + cq.d + '" fill="none" stroke="' + ACC + '" stroke-width="1.2" stroke-dasharray="2 3" marker-end="' + mk + '"/>';
  var gq = quad(ph(-5), K.genCtrl, toward(N[2], K.genCtrl, 14));
  s += '<path data-k="gen" id="' + u + 'gen" d="' + gq.d + '" fill="none" stroke="' + ACC + '" stroke-width="1.6" pathLength="1" stroke-dasharray="1 1" data-mk="' + mk + '"/>';
  // точка пути — под узлами: доходит до этапа и уходит под него, цифру не закрывает
  // до первого шага точка ждёт на первом узле: в 0,0 она выходила за сцену
  s += '<circle data-k="pulse" cx="' + f(N[0][0]) + '" cy="' + f(N[0][1]) + '" r="5" fill="' + ACC + '" style="opacity:0"/>';
  // подложки узлов не тускнеют: сквозь тусклый узел не просвечивают кольцо и деления
  s += N.map(function (P, i) { return '<circle data-k="m' + i + '" cx="' + f(P[0]) + '" cy="' + f(P[1]) + '" r="12" fill="var(--paper)" style="transform-origin:' + f(P[0]) + 'px ' + f(P[1]) + 'px;opacity:0"/>'; }).join('');
  // этапы
  STAGES.forEach(function (stg, i) {
    var a = stg.a, x = N[i][0], y = N[i][1], c = Math.cos(rad(a)), sn = Math.sin(rad(a)), force = K.labelAt[i];
    var lx, ly, anc, lead, top = false;
    if (force === 'below' || sn > 0.5 || (sn > 0 && Math.abs(c) <= 0.25)) { var sd = c >= 0 ? 1 : -1; lx = x + 8 * sd; ly = y + 44; anc = sd > 0 ? 'start' : 'end'; lead = 'M' + f(x) + ' ' + f(y + 12) + ' V' + f(ly - 16) + ' h' + (5 * sd); }
    else if (c > 0.25) { lx = x + 31; ly = y - 2; anc = 'start'; lead = 'M' + f(x + 12) + ' ' + f(y) + ' H' + f(x + 25); }
    else if (Math.abs(c) < 0.12 && sn < 0) { lx = x; ly = y - 30; anc = 'middle'; lead = 'M' + f(x) + ' ' + f(y - 12) + ' V' + f(y - 20); top = true; }
    else { lx = x - 31; ly = y - 2; anc = 'end'; lead = 'M' + f(x - 12) + ' ' + f(y) + ' H' + f(x - 25); }
    var bases = stg.b.map(function (l, j) { return '<text x="' + f(lx) + '" y="' + f(top ? ly - 25 - j * 11 : ly + 14 + j * 11) + '" class="t-base" text-anchor="' + anc + '">' + l + '</text>'; }).join('');
    s += g('n' + i, '<path d="' + lead + '" fill="none" stroke="' + INK + '" stroke-width="0.7"/><circle class="nc" cx="' + f(x) + '" cy="' + f(y) + '" r="12"/><text x="' + f(x) + '" y="' + f(y + 3.1) + '" class="t-num" text-anchor="middle">0' + (i + 1) + '</text><text x="' + f(lx) + '" y="' + f(ly - 13) + '" class="t-term" text-anchor="' + anc + '">' + stg.t + '</text><text x="' + f(lx) + '" y="' + f(ly + 2) + '" class="t-name" text-anchor="' + anc + '">' + stg.n + '</text><g class="b" style="opacity:0">' + bases + '</g>', 'class="n" style="transform-origin:' + f(x) + 'px ' + f(y) + 'px"');
  });
  // агенты: метки на переходах и строка внизу
  s += g('ag', badge([N[0][0] + 11, N[0][1] - 10]) + badge([fq.mid[0] + 2, fq.mid[1] + 11]));
  var by = K.band.y, bx0 = K.band.x0, bx1 = K.band.x1;
  var band = g('band', '<line x1="' + bx0 + '" y1="' + (by - 14) + '" x2="' + bx1 + '" y2="' + (by - 14) + '" stroke="' + INK + '" stroke-width="0.8"/>' + badge([bx0 + 6, by - 3.5]) + '<text x="' + (bx0 + 18) + '" y="' + by + '" class="t-base"><tspan class="t-core">Агенты</tspan>   уже ведут: сбор KPI-фактов, ночные прогоны   ·   Claude Code · Codex · ChatGPT · Notion Workers · 43 скилла</text>');
  // 05.10.2026, владелец по кадру: схема на 10% мельче и прижата к низу —
  // воздух между заголовком и схемой. Масштаб вокруг середины строки агентов
  // (500, 545): нижний край остаётся на месте, верх уходит вниз на ~4,7% ширины
  var FIT = { s: 0.9, ax: 500, ay: 545 };
  svg.innerHTML = '<g class="all" transform="translate(' + f(FIT.ax * (1 - FIT.s)) + ' ' + f(FIT.ay * (1 - FIT.s)) + ') scale(' + FIT.s + ')"><g class="fig">' + s + '</g>' + band + '</g>';

  var fig = svg.querySelector('g.fig');
  // схема по центру сцены: середина рамки колец с подписями (без подписей
  // при наведении и точки пути, которая до первого шага стоит в 0,0) — на x = 500.
  // Зависит от ширины букв: пересчёт после шрифтов и когда сцену стало видно
  function center() {
    var hid = [].slice.call(fig.querySelectorAll('.b, [data-k="pulse"]'));
    hid.forEach(function (e) { e.style.display = 'none'; });
    var bb = fig.getBBox();
    hid.forEach(function (e) { e.style.display = ''; });
    if (bb.width > 0) fig.setAttribute('transform', 'translate(' + f(500 - bb.x - bb.width / 2) + ' 0)');
    return bb.width > 0;
  }
  var els = [].slice.call(svg.querySelectorAll('[data-k]')).filter(function (e) { return e.dataset.k !== 'pulse'; }).map(function (e) { return [e.dataset.k, e]; });
  var pulse = svg.querySelector('[data-k="pulse"]');
  var nodes = [].slice.call(svg.querySelectorAll('g.n')), inner = [].slice.call(svg.querySelectorAll('g.inn')), hub = svg.querySelector('g.hub');

  // ---- кадр: состояние сцены как функция времени
  function render(t) {
    var b = S.beats.filter(function (x) { return t < x.t1; })[0] || S.beats[S.beats.length - 1], lt = t - b.t0;
    var lit = function (key, i) { return level(spans(key + ':' + i, function (x) { return x[key] && (i === undefined || x[key].indexOf(i) >= 0); }), t, 0.3); };
    els.forEach(function (p) {
      var k = p[0], el = p[1];
      // подложка m<i> появляется вместе с узлом n<i>, но не тускнеет
      var sub = k[0] === 'm', ap = S.app[sub ? 'n' + k.slice(1) : k], pr = ap ? clamp((t - ap.t0) / ap.d) : 0, e = eo(pr), m = MODE(k);
      var dm = sub ? 0 : level(spans('dim:' + k, function (x) { return x.dim && x.dim.indexOf(k) >= 0; }), t, 0.4);
      var df = 1 - 0.78 * dm;
      if (m === 'draw') {
        el.style.strokeDashoffset = 1 - e; el.style.opacity = (pr > 0 ? 1 : 0) * df;
        el.setAttribute('marker-end', pr > 0.97 ? el.dataset.mk : 'none');
      } else if (m === 'pop' || m === 'grow') {
        el.style.opacity = e * df; el.style.transform = 'scale(' + (m === 'pop' ? 0.5 + 0.5 * e : 0.3 + 0.7 * e) + ')';
      } else el.style.opacity = e * df;
    });
    nodes.forEach(function (n, i) { var fo = lit('focus', i); n.querySelector('.b').style.opacity = fo; n.classList.toggle('on', fo > 0.5); });
    inner.forEach(function (n, i) { n.classList.toggle('on', lit('focus2', i) > 0.5); });
    hub.classList.toggle('on', lit('hub') > 0.5);
    var P = b.pulse;
    if (P && lt >= P.t0) {
      var q = eio(clamp((lt - P.t0) / P.d)), pt;
      if (P.k === 'r1') pt = p1(R, P.a0 + ((P.a1 - P.a0 + 360) % 360) * q);
      else if (P.k === 'r2') {
        var a0 = K.inner[P.i0][0], a1 = K.inner[P.i1][0];
        if (K.dir2 > 0) while (a1 < a0) a1 += 360; else while (a1 > a0) a1 -= 360;
        pt = p2(RI, a0 + (a1 - a0) * q);
      } else { var path = svg.querySelector('#' + u + P.id), L = path.getTotalLength(), r = path.getPointAtLength(L * q); pt = [r.x, r.y]; }
      // у цели точка гаснет: дальше горит сам узел
      pulse.setAttribute('cx', f(pt[0])); pulse.setAttribute('cy', f(pt[1])); pulse.style.opacity = 1 - clamp((lt - P.t0 - P.d) / 0.15);
    } else pulse.style.opacity = 0;
    if (capEl && capEl.dataset.t !== b.cap) { capEl.textContent = b.cap; capEl.dataset.t = b.cap; }
    if (capEl) capEl.style.opacity = win(t, b.t0, b.t1 + 1, 0.35);
  }

  // ---- проигрыватель: идёт, пока экран в кадре; итог держится 4 с, затем повтор
  // SPEED: владелец 05.10 — основная анимация на 20% быстрее; пауза на итоге — в секундах
  var SPEED = 1.2, HOLD = 4, now = 0, held = 0, playing = false, last = 0, raf = 0;
  function tick(ts) {
    var dt = last ? Math.min((ts - last) / 1000, 0.1) : 0; last = ts;
    if (now < S.T) now = Math.min(S.T, now + dt * SPEED);
    else { held += dt; if (held > HOLD) { now = 0; held = 0; } }
    render(now);
    raf = requestAnimationFrame(tick);
  }
  function play() { if (playing) return; playing = true; last = 0; raf = requestAnimationFrame(tick); }
  function pause() { playing = false; cancelAnimationFrame(raf); }
  var still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  render(still ? S.T : 0);
  center();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(center);
  window.addEventListener('resize', center);
  window.__cycle = { render: render, T: S.T, beats: S.beats, pause: pause, play: play };
  if (still) return;
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { center(); play(); } else pause(); });
    }, { threshold: 0.35 }).observe(scene);
  } else play();
})();
