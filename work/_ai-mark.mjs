// Метка «AI pipeline» в шапке концепт-кейсов (12–13.11.2026). Слово владельца 13.11:
// «много текста сверху… можно как минимум написать, что это кейс AI пайплайна, и сделать
// ссылку на отдельный кейс AI пайплайна, там уже будут подробности».
// Строка-ссылка последней в .v3-meta; полосу 12.11 (<!--ai-mark-->) скрипт убирает.
// Повторный запуск заменяет строку. Вызывается из _build-*.mjs, сборщики пересобирают <main>.
// Запуск: node work/_ai-mark.mjs
import fs from 'fs';
const root = new URL('../', import.meta.url);
const pages = ['dyson-v15', 'arcteryx-winter', 'airbnb-month'];
const label = { ru: 'СОБРАН_В_AI_PIPELINE_→', en: 'BUILT_IN_AI_PIPELINE_→' };
const style = '<style>.v3-meta .ai-link{color:var(--ink);text-decoration:underline;text-underline-offset:3px}.v3-meta .ai-link:hover{text-decoration-thickness:2px}</style>';
const link = (l) => `<!--ai-link-->${style}<a class="ai-link" href="ai-pipeline.html">${label[l]}</a><!--/ai-link-->`;
for (const [dir, l] of [['work/', 'ru'], ['en/work/', 'en']]) {
  for (const p of pages) {
    const f = new URL(`${dir}${p}.html`, root);
    let t = fs.readFileSync(f, 'utf8')
      .replace(/\n*  <!--ai-mark-->[\s\S]*?<!--\/ai-mark-->/, '')
      .replace(/\n\s*<!--ai-link-->[\s\S]*?<!--\/ai-link-->/, '');
    const head = t.indexOf('<header class="v3-head">');
    const meta = t.indexOf('<p class="v3-meta">', head);
    const end = t.indexOf('</p>', meta);
    if (head < 0 || meta < 0 || end < 0) throw new Error(`нет шапки v3-meta: ${dir}${p}`);
    t = t.slice(0, end).replace(/\s*$/, '') + '\n      ' + link(l) + '\n    ' + t.slice(end);
    fs.writeFileSync(f, t);
  }
}
