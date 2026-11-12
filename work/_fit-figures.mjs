// 12.11.2026: широкий кадр .m4 и видео .m5 получает --r = ширина/высота картинки, чтобы рамка совпала с краской кадра и подпись при наведении легла на сам кадр.
// Запускать после любого сборщика страниц: node work/_fit-figures.mjs
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
const root = new URL('..', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1');
let n = 0;
for (const dir of ['work', 'en/work']) for (const f of readdirSync(root + dir).filter(f => f.endsWith('.html'))) {
  const p = `${root}${dir}/${f}`, s = readFileSync(p, 'utf8');
  const t = s.replace(/<figure class="(m4|m5)"(?: style="--r:[^"]*")?>(\s*(?:<!--[\s\S]*?-->\s*)*<(?:img|video)[^>]*?width="(\d+)" height="(\d+)")/g, (_, k, rest, w, h) => (n++, `<figure class="${k}" style="--r:${w}/${h}">${rest}`));
  if (t !== s) writeFileSync(p, t);
}
console.log('m4/m5 figures:', n);
