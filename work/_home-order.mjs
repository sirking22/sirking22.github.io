// Главная RU и EN (13.11.2026, опросник владельца): пять кейсов первыми — RAWMID, Dyson, AI pipeline,
// Стандарты, Airbnb; номера плиток по порядку показа; счётчики по числу плиток;
// строка под заголовком «что делаю» из фразы 23 банка фраз podacha. Ряд row-b не трогается.
// Повторный запуск даёт тот же результат. Запуск: node work/_home-order.mjs
import fs from 'fs';
const root = new URL('../', import.meta.url);
const rows = [['rawmid-style', 'dyson-v15', 'ai-pipeline', 'notion-system'], ['airbnb', 'arcteryx', 'rawmid-video', 'scandic']];
const what = {
  ru: '15+ лет в дизайне, 3,5 года во главе команды 10+. Идеи из данных об аудитории и рынке, производство на своей системе с нейросетями, эффект в метриках.',
  en: '15+ years in design, 3.5 years leading a team of 10+. Ideas from audience and market data, production on my own AI-powered system, impact measured in metrics.',
};
for (const [file, l] of [['index.html', 'ru'], ['en/index.html', 'en']]) {
  const f = new URL(file, root);
  const raw = fs.readFileSync(f, 'utf8'), crlf = raw.includes('\r\n');
  let t = raw.replace(/\r\n/g, '\n');
  const tiles = {};
  for (const m of t.matchAll(/<a class="tile"[\s\S]*?<\/a>\n/g)) tiles[m[0].match(/data-case="([^"]+)"/)[1]] = m[0];
  const ratio = (c) => { const [a, b] = tiles[c].match(/--ratio:([\d./]+)/)[1].split('/').map(Number); return b ? a / b : a; };
  const starts = [...t.matchAll(/<div class="mosaic-row[^"]*"[^>]*>\n/g)];
  for (let i = 1; i >= 0; i--) {
    const s = starts[i], from = s.index + s[0].length;
    let to = from; // ряд — подряд идущие плитки; цитата и </div> после них остаются на месте
    while (t.startsWith('<a class="tile"', to)) to = t.indexOf('</a>\n', to) + '</a>\n'.length;
    const open = s[0].replace(/--tracks:[^"]*/, '--tracks:' + rows[i].map((c) => ratio(c) + 'fr').join(' '));
    t = t.slice(0, s.index) + open + rows[i].map((c) => tiles[c]).join('') + t.slice(to);
  }
  let n = 0;
  t = t.replace(/<span class="work-number">\d+<\/span>/g, () => `<span class="work-number">${String(++n).padStart(2, '0')}</span>`);
  t = t.replace(/(data-filter="all" aria-pressed="true">\S+ <span>)\d+/, `$1${n}`).replace(/(id="filter-status"[^>]*>\S+: )\d+/, `$1${n}`);
  t = t.replace(/<span class="hero-what">[^<]*<\/span>/, '').replace(/(<p class="hero-sub">[\s\S]*?)(<\/p>)/, `$1<span class="hero-what">${what[l]}</span>$2`);
  fs.writeFileSync(f, crlf ? t.replace(/\n/g, '\r\n') : t);
  console.log(file, n, rows.flat().every((c) => tiles[c]) ? 'ok' : 'НЕТ ПЛИТКИ');
}
