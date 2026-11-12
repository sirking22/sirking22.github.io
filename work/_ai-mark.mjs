// Полоса «AI-first» под шапкой концепт-кейсов (12.11.2026, слово владельца:
// «сильный начальный указатель, что это AI Powered или AI First концепт»,
// «не размазано, не перегружалось»). Вставляет блок после </header> шапки v3-head,
// повторный запуск заменяет блок. Вызывается из _build-*.mjs, сборщики
// пересобирают <main> и иначе стёрли бы полосу.
// Запуск: node work/_ai-mark.mjs
import fs from 'fs';
const root = new URL('../', import.meta.url);
const pages = ['dyson-v15', 'arcteryx-winter', 'airbnb-month'];
const text = {
  ru: 'Нейросети собрали данные об аудитории и рынке и нарисовали сцены. Выводы, гипотезу с целью теста и кампанию делал я. Процесс записан по шагам и дорабатывается от концепта к концепту, поэтому каждый следующий собирается быстрее.',
  en: 'AI gathered the audience and market data and rendered the scenes. The insights, the hypothesis with its test target and the campaign are mine. The process is written down step by step and improves with every concept, so each one ships faster.',
};
const tag = { ru: 'КОНЦЕПТ', en: 'CONCEPT' };
const style = '<style>.ai-mark{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,2fr);gap:32px;align-items:start;padding:20px 0 0;margin:0 0 56px;border-top:1px solid var(--ink)}.ai-mark b{display:block;font:600 clamp(40px,5vw,72px)/.9 var(--display,inherit);letter-spacing:-.01em;text-transform:uppercase}.ai-mark small{display:block;margin-top:10px;font:400 12px/1.4 var(--mono);letter-spacing:.02em}.ai-mark p{max-width:46rem;font-size:18px;line-height:1.45}@media(max-width:700px){.ai-mark{grid-template-columns:minmax(0,1fr);gap:16px;margin-bottom:40px}.ai-mark p{font-size:16px}}</style>';
const block = (l) => `<!--ai-mark-->\n  ${style}\n  <div class="ai-mark"><div><b>AI-first</b><small>${tag[l]}</small></div><p>${text[l]}</p></div>\n  <!--/ai-mark-->`;
for (const [dir, l] of [['work/', 'ru'], ['en/work/', 'en']]) {
  for (const p of pages) {
    const f = new URL(`${dir}${p}.html`, root);
    let t = fs.readFileSync(f, 'utf8').replace(/\n*  <!--ai-mark-->[\s\S]*?<!--\/ai-mark-->/, '');
    const head = t.indexOf('<header class="v3-head">');
    const end = t.indexOf('</header>', head);
    if (head < 0 || end < 0) throw new Error(`нет шапки v3-head: ${dir}${p}`);
    const at = end + '</header>'.length;
    t = t.slice(0, at) + '\n\n  ' + block(l) + t.slice(at);
    fs.writeFileSync(f, t);
  }
}
