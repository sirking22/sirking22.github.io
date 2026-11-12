// Кейс «Стандарты» RU и EN (13.11.2026, опросник владельца «Кейс Notion заново»): глав по шагам петли
// сигнал → исследование → гипотеза → производство по нормам → выпуск → метрики → новая норма.
// Сверху: что даёт система, три цифры (источник — work/ai-pipeline.html) и петля ссылками на главы.
// Кадры, подписи и alt берутся из текущей страницы по имени файла, поэтому скрипт повторяем.
// Запуск: node work/_build-standards.mjs
import fs from 'fs';
const root = new URL('../', import.meta.url);

const style = `<style>
.std-lead{margin:0 0 clamp(48px,6vw,96px)}
.std-lead>p{max-width:34em;margin:0 0 32px;font-size:clamp(20px,1.6vw,28px);line-height:1.3;text-wrap:pretty}
.std-nums{list-style:none;margin:0;padding:20px 0 0;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px;border-top:1px solid var(--line)}
.std-nums b{display:block;margin-bottom:8px;font-size:clamp(28px,2.6vw,44px);font-weight:400;line-height:1.1}
.std-nums span{display:block;font-size:16px;line-height:1.4;text-wrap:pretty}
.std-loop{list-style:none;display:flex;flex-wrap:wrap;gap:8px 12px;margin:32px 0 0;padding:0;font:400 12px/1.4 var(--mono);text-transform:uppercase;letter-spacing:.02em}
.std-loop li:not(:last-child)::after{content:"→";margin-left:12px}
.std-loop a{color:var(--ink);text-underline-offset:3px}
@media (max-width:700px){.std-nums{grid-template-columns:minmax(0,1fr)}}
</style>`;

const L = {
  ru: {
    file: 'work/notion-system.html', label: 'СТАНДАРТЫ', prev: 'Предыдущий кадр', next: 'Следующий кадр',
    lead: 'Система в Notion, по которой команда RAWMID из 10+ человек ведёт контент от сигнала в метриках до выпуска. Решение, которое сработало, становится нормой для следующей задачи.',
    nums: [['0,7 правки', 'на типовую задачу вместо 2,4 после норм и чек-листов'], ['1 171 → 33', 'задачи сведены к типовым, у каждой своя норма часов'], ['1 098 / 1 001 ч', 'план и факт по 82 задачам']],
    steps: [
      ['Сигнал', 'Система сама подсвечивает задачи, где часы или круги правок вышли за норму, форматы, потерявшие отклик, и точки контакта с провалом по метрике.'],
      ['Исследование', 'Под сигнал поднимаются основания: группы аудитории, задачи категории с ожидаемым результатом, что делают конкуренты. Из них видно, где именно просело.'],
      ['Гипотеза', 'Сигнал становится целью с ключевыми результатами. Под неё пишутся гипотезы и концепты.'],
      ['Производство по нормам', 'Концепт уходит в задачи по типовым: исполнитель, срок, норма часов, план и факт. Просрочка горит красным флагом.'],
      ['Выпуск', 'Материал выходит в канал и попадает в базу релизов с датой и версией. Релиз связан со своим материалом и целью.'],
      ['Метрики', 'Статистика приходит в базу фактов с источником и периодом и поднимается в ключевые результаты цели.'],
      ['Новая норма', 'Подтвердившееся закрепляется в типовой задаче: шаги, правила, удачные примеры и пересчитанная норма часов. Следующий сигнал сверяется уже с ней.'],
    ],
  },
  en: {
    file: 'en/work/notion-system.html', label: 'STANDARDS', prev: 'Previous frame', next: 'Next frame',
    lead: 'A Notion system the RAWMID team of 10+ uses to run content from a signal in the metrics to release. A decision that worked becomes the norm for the next task.',
    nums: [['0.7 revisions', 'per typical task after norms and checklists, down from 2.4'], ['1,171 → 33', 'tasks reduced to typical ones, each with its own hour norm'], ['1,098 / 1,001 h', 'planned vs actual across 82 tasks']],
    steps: [
      ['Signal', 'The system flags tasks where hours or revision rounds went over the norm, formats that lost response, and touchpoints that dropped in the metrics.'],
      ['Research', 'Under a signal sit the grounds: audience groups, category jobs with expected outcomes, what competitors do. They show where exactly it dropped.'],
      ['Hypothesis', 'A signal becomes a goal with key results. Hypotheses and concepts are written under it.'],
      ['Production to norms', 'A concept turns into tasks built on typical ones: owner, deadline, hour norm, plan and actual. Overdue tasks get a red flag.'],
      ['Release', 'The piece goes out to a channel and lands in the releases base with date and version. Each release links to its material and goal.'],
      ['Metrics', 'Stats arrive in the facts base with source and period and roll up into the goal’s key results.'],
      ['New norm', 'What proved itself is fixed in the typical task: steps, rules, good examples and a recalculated hour norm. The next signal is checked against it.'],
    ],
  },
};

// Медиа по шагу: строка — карусель, массив с ['fig', файл] — отдельные фигуры.
const plan = [
  [['fig', 'shot-tasks.webp']],
  ['shot-audience.webp', 'shot-jobs.webp', 'shot-competitors.webp', 'shot-light.webp'],
  [['fig', 'chain-walkthrough.mp4'], ['fig', 'shot-ideas.webp']],
  ['shot-typical-tasks.webp', 'shot-production.webp', 'shot-load.webp'],
  ['shot-releases.webp', 'shot-content.webp'],
  [['fig', 'shot-facts-2026-09.webp'], ['fig', 'case-materials.mp4']],
  [['fig', 'shot-norms.webp']],
];
const pad = (n) => String(n).padStart(2, '0');

for (const l of ['ru', 'en']) {
  const c = L[l], f = new URL(c.file, root);
  const raw = fs.readFileSync(f, 'utf8'), crlf = raw.includes('\r\n');
  let t = raw.replace(/\r\n/g, '\n');
  const media = {};
  for (const m of t.matchAll(/<(img|video)\b[^>]*?\bsrc="([^"]*\/)([^"/]+\.(?:webp|mp4))"[^>]*>/g)) {
    media[m[3]] = { kind: m[1], tag: m[0].replace(/\s*class="is-active"/, '').replace(/\s*data-cap="[^"]*"/, ''), cap: (m[0].match(/data-cap="([^"]*)"/) || [])[1] };
  }
  for (const m of t.matchAll(/<figure class="m[45]"[^>]*>\s*<(?:img|video)\b[^>]*?src="[^"]*\/([^"/]+)"[\s\S]*?<figcaption><b>[^<]*<\/b>([\s\S]*?)<\/figcaption>/g)) media[m[1]].cap = m[2].trim();
  const need = plan.flat(2).filter((x) => x !== 'fig');
  const miss = need.filter((x) => !media[x] || !media[x].cap);
  if (miss.length) throw new Error(`${l}: нет кадра или подписи — ${miss.join(', ')}`);
  const wh = (x) => media[x].tag.match(/width="(\d+)" height="(\d+)"/).slice(1).join('/');

  const chapters = c.steps.map(([h, copy], i) => {
    const n = pad(i + 1), p = plan[i];
    let body;
    if (typeof p[0] === 'string') {
      const imgs = p.map((x, k) => '        ' + media[x].tag.replace('<img', k ? '<img' : '<img class="is-active"').replace(/>$/, ` data-cap="${media[x].cap}">`)).join('\n');
      body = `    <div class="m2" data-carousel>
      <div class="m2-stage">
${imgs}
      </div>
      <div class="m2-ctrl">
        <p class="m2-cap"><b>${c.label}_/_${n}.<span data-i>1</span></b> <span data-captext>${media[p[0]].cap}</span></p>
        <div class="m2-nav"><button type="button" data-prev aria-label="${c.prev}">←</button><span data-counter>01_/_${pad(p.length)}</span><button type="button" data-next aria-label="${c.next}">→</button></div>
      </div>
      <div class="m2-thumbs" data-thumbs></div>
    </div>`;
    } else {
      body = p.map(([, x], k) => {
        const v = media[x].kind === 'video';
        return `    <figure class="${v ? 'm5' : 'm4'}" style="--r:${wh(x)}">
      ${media[x].tag}${v ? '</video>' : ''}
      <figcaption><b>${c.label}_/_${n}.${k + 1}</b>${media[x].cap}</figcaption>
    </figure>`;
      }).join('\n');
    }
    return `  <section class="v3-chapter" id="s${i + 1}" data-chapter>
    <p class="v3-label"><span>${c.label}_/_${n}</span><span></span></p>
    <div class="m1">
      <h2>${h}</h2>
      <div class="copy"><p>${copy}</p></div>
    </div>
${body}
  </section>`;
  });

  const lead = `  <!--std-lead-->${style}
  <section class="std-lead" aria-label="${c.label}">
    <p>${c.lead}</p>
    <ul class="std-nums">${c.nums.map(([b, s]) => `<li><b>${b}</b><span>${s}</span></li>`).join('')}</ul>
    <ol class="std-loop">${c.steps.map(([h], i) => `<li><a href="#s${i + 1}">${h}</a></li>`).join('')}</ol>
  </section><!--/std-lead-->`;

  const head = t.indexOf('<header class="v3-head">');
  const from = t.indexOf('</header>', head) + '</header>'.length;
  const to = t.indexOf('  <nav class="v3-next"', from);
  if (head < 0 || to < 0) throw new Error(`${l}: нет шапки или навигации`);
  t = t.slice(0, from) + '\n\n' + lead + '\n\n' + chapters.join('\n\n') + '\n\n' + t.slice(to);
  fs.writeFileSync(f, crlf ? t.replace(/\n/g, '\r\n') : t);
  console.log(c.file, 'глав', chapters.length, 'кадров', need.length);
}
