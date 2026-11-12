// Проверка локальных ссылок сайта: src, href, srcset, poster и url() в HTML и CSS.
// Каждая ссылка должна вести на существующий файл в репозитории.
// Запуск: node scripts/linkcheck.mjs   (код выхода 1, если есть битые ссылки)
// Не проверяются: внешние адреса, якоря, код внутри <script>, архив old/.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SKIP_DIRS = new Set(['old', 'node_modules', 'scripts']);
// Известные исключения: картинки камней по краям из styles.css нужны только
// архиву old/, файлов в репозитории нет и на живых страницах классы не стоят.
const KNOWN_MISSING = new Set(['styles.css -> assets/edge-l.webp', 'styles.css -> assets/edge-r.webp', 'styles.css -> assets/edge-l-bottom.webp']);

const files = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    if (e.name.startsWith('.')) continue;
    const p = path.join(d, e.name);
    if (e.isDirectory()) { if (!(d === root && SKIP_DIRS.has(e.name))) walk(p); }
    else if (/\.(html|css)$/.test(e.name)) files.push(p);
  }
})(root);

const bad = [];
let checked = 0;
for (const f of files) {
  let t = fs.readFileSync(f, 'utf8');
  t = t.replace(/<script\b[\s\S]*?<\/script>/gi, '').replace(/<!--[\s\S]*?-->/g, '');
  if (f.endsWith('.css')) t = t.replace(/\/\*[\s\S]*?\*\//g, '');
  const refs = [];
  for (const m of t.matchAll(/\b(?:src|href|poster|data-src)\s*=\s*"([^"]*)"/g)) refs.push(m[1]);
  for (const m of t.matchAll(/\bsrcset\s*=\s*"([^"]*)"/g))
    for (const part of m[1].split(',')) refs.push(part.trim().split(/\s+/)[0]);
  for (const m of t.matchAll(/url\(\s*(?:&quot;|['"])?([^'")&]+)(?:&quot;|['"])?\s*\)/g)) refs.push(m[1]);
  for (let r of refs) {
    r = (r || '').trim();
    if (!r || /^(https?:|mailto:|tel:|data:|javascript:|#|%23|\/\/)/i.test(r)) continue;
    r = r.split('#')[0].split('?')[0];
    if (!r) continue;
    let target;
    try { target = r.startsWith('/') ? path.join(root, decodeURI(r)) : path.resolve(path.dirname(f), decodeURI(r)); }
    catch { target = path.resolve(path.dirname(f), r); }
    if (r.endsWith('/')) target = path.join(target, 'index.html');
    checked++;
    if (!fs.existsSync(target)) bad.push(`${path.relative(root, f).replaceAll('\\', '/')} -> ${r}`);
  }
}

const uniq = [...new Set(bad)].filter((b) => !KNOWN_MISSING.has(b));
console.log(`Страниц и стилей: ${files.length}, ссылок: ${checked}, битых: ${uniq.length}`);
if (uniq.length) {
  console.log(uniq.join('\n'));
  process.exit(1);
}
