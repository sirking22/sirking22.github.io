from pathlib import Path
from html.parser import HTMLParser
from html import escape
from PIL import Image
import re, shutil, json, hashlib

ROOT=Path.cwd()
CAREER=Path('Z:/Files/Codex new/career')
OUT=ROOT/'v2/assets/ai-pipeline'
OUT.mkdir(parents=True, exist_ok=True)
QA=ROOT/'output/playwright/run-11'
QA.mkdir(parents=True, exist_ok=True)

class Text(HTMLParser):
    def __init__(self): super().__init__(); self.skip=0; self.parts=[]
    def handle_starttag(self,t,a):
        if t in ('head','script','style'): self.skip+=1
    def handle_endtag(self,t):
        if t in ('head','script','style'): self.skip=max(0,self.skip-1)
    def handle_data(self,d):
        if not self.skip and d.strip(): self.parts.append(d.strip())

def words(p):
    s=p.read_text(encoding='utf-8',errors='replace')
    if p.suffix=='.html':
        h=Text(); h.feed(s); return ' '.join(h.parts)
    return re.sub(r'\s+',' ',s).strip()

def encode(src,name):
    im=Image.open(src).convert('RGB'); im.thumbnail((1600,10000))
    for q in range(90,39,-5):
        im.save(OUT/name,'WEBP',quality=q,method=6)
        if (OUT/name).stat().st_size<=300000: break
    assert (OUT/name).stat().st_size<=300000

assets=[]
for n in range(1,4):
    src=CAREER/f'pinkman/deck-2026-10-26/slide-{n}.png'
    dst=OUT/src.name; shutil.copyfile(src,dst)
    assert hashlib.sha256(src.read_bytes()).digest()==hashlib.sha256(dst.read_bytes()).digest()
    assets.append((src,dst))
for n in ('A','B','C','D'):
    src=CAREER/f'concept-car-flyby/candidates/car-{n}.png'
    dst=OUT/f'car-{n.lower()}.webp'; encode(src,dst.name); assets.append((src,dst))

lines=['# План 30.10 — дополнение, пакет 11-ai-pipeline','',
'## Инвентаризация источников','',
'Все пути ниже — read-only источники. Этап определяется содержимым и назначением файла; «выпуск (макет)» не означает запуск кампании. Черновики концептов служат сырьём, их тексты на сайт не перенесены. Логи и промпты не публикуются.','']
pink=CAREER/'pinkman'
sources=[*sorted((pink/'deck-2026-10-26').glob('*')),*sorted(pink.glob('demo-*-2026-10-26.html')),pink/'show-one-task-2026-10-22.md']
for directory,fs in [('Pinkman',sources),*[(d.name,sorted(f for f in d.rglob('*') if f.is_file())) for d in sorted(CAREER.glob('concept-*'))]]:
    lines += [f'### {directory} — {len(fs)} файлов','', '| Путь | Что показывает | Этап |','|---|---|---|']
    for f in fs:
        rel=f.as_posix(); name=f.name.lower(); parts=f.parts
        stage='бриф'; desc=''
        if f.suffix.lower() in ('.png','.jpg','.webp','.img','.svg','.mp4'):
            if 'refs' in rel: stage='бриф'; desc='Визуальный референс, не собственный результат'
            elif 'sheet' in name or 'zoom' in name: stage='варианты'; desc='Контактный лист / деталь сравнения вариантов'
            elif '/form/' in rel or '/candidates/' in rel: stage='варианты'; desc='Вариант формы автомобиля / паспорт кандидата'
            elif 'flat-' in name or '/set' in rel or 'final' in rel: stage='выпуск (макет)'; desc='Собранный визуальный макет, публикация не подтверждена'
            elif 'slide-' in name: stage='бриф → генерация → выбор → выпуск (схема)' if '1' in name else 'выбор / выпуск → следующий бриф'; desc='Путь видеофона' if '1' in name else ('Накопление опыта; пример условный' if '2' in name else 'Рабочий прототип: нормы RAWMID и гайд YouTube')
            else: stage='генерация / варианты'; desc='Кадр генерации / итерация, выбор не подтверждён'
            try:
                with Image.open(f) as im: desc+=f'; {im.width}×{im.height}'
            except Exception: pass
        elif f.suffix.lower() in ('.md','.txt','.html','.json','.log','.sh','.css','.js'):
            txt=words(f)
            if 'prompt' in name or 'wrapped' in name or 'codex.log' in name or f.suffix=='.sh': stage='генерация'; desc='Промпт / технический журнал / запуск'
            elif 'sheet' in name or 'design-log' in name or 'walkthrough' in name or 'cleanup' in name: stage='выбор / варианты'; desc='Разбор итераций и критериев; не доказательство финального выбора'
            elif 'flat-' in name or 'case-' in name or 'live-spec' in name: stage='выпуск (макет)'; desc='Вёрстка / черновик подачи; не опубликованный результат'
            elif 'slide-1' in name: stage='бриф → генерация → выбор → выпуск (схема)'; desc='Шесть шагов видеофона'
            elif 'slide-2' in name or 'demo-fon' in name: stage='выбор / выпуск → следующий бриф'; desc='Схема накопления опыта; условный пример'
            elif 'slide-3' in name or 'demo-screen2' in name: stage='выпуск → следующий бриф'; desc='Нормы RAWMID, опыт внутри типовой задачи'
            elif 'show-one-task' in name: stage='бриф → выпуск'; desc='Внутренняя подготовка: план/факт и ставки; НЕ публиковать'
            else: desc='Исследование / гипотеза / исходные требования или служебный ресурс'
            if f.suffix not in ('.log','.css','.sh'):
                excerpt=txt[:220].replace('|','\\|').replace('`','’')
                desc+='; «'+excerpt+'…»'
        elif f.suffix=='.pdf': stage='бриф → выпуск (схема)'; desc='PDF колоды; содержание инвентаризировано по slide-1..3.html/png, PDF отдельно не извлекался'
        else: stage='генерация'; desc='Технический файл / исходный ресурс'
        lines.append(f'| `{rel}` | {desc} | {stage} |')
    lines+=['']

lines += ['## Сырьё и вопросы владельцу','',
'- Выбор, глава 04: оставлено `[…]`. Сырьё: `Z:/Files/Codex new/career/pinkman/deck-2026-10-26/slide-1.html` — «сборка в Figma и показ», «согласование»; это схема, а не подтверждение выбора car-A..D. Какой вариант автомобиля выбран и по какому критерию?',
'- Выпуск, глава 05: оставлено `[…]`. Сырьё: тот же `slide-1.html` — «анимация на три минуты номера»; `concept-arcteryx/hypotheses-2026-10-19.md` — «Все гипотезы спекулятивные: тест не запускался, данных бренда изнутри нет». Что действительно выпущено, а что осталось макетом?',
'- Глава 03: заголовок и текст `[…]`; паспорта `concept-car-flyby/candidates/car-A.png` … `car-D.png` показывают варианты, но дословной подписи для публичного объяснения нет. Сырьё: `concept-car-flyby/passports-prompt.txt` — «Common for car-A..D (design passport sheet)», «Four views of the SAME car in a 2x2 grid». Нужна авторская связь между брифом и вариантами.',
'- Год, дисциплина, роль и команда: оставлены плейсхолдеры. Даты 22/26.10.2026 в колоде относятся к срезу данных и материалам показа, а не доказывают период работы и состав команды. Сырьё: `slide-3.html` — «рабочий прототип», «закрытые задачи RAWMID в Notion · 22.10.2026». Какие роль и команда относятся именно к этой работе?',
'- Dyson: только ссылка на существующую работу в главе выпуска, без дублирования кадров/кейса. Сырьё: опубликованный `v2/work/dyson-v15.html`.',
'- `demo-fon-1-19-2026-10-26.html`: снимок сделан и сохранён, но на страницу не включён: условные 11 ч и луп 8 с отсутствуют в колоде; публично использован slide-2.png, где условность указана прямо и нет этих чисел.',
'- `show-one-task-2026-10-22.md`: только инвентаризация. Внутренние имена, ставки, ссылки Notion и арифметика маржи на сайт не перенесены.','',
'## Перенесено дословно','',
'| Место | Текст | Источник |','|---|---|---|',
'| Плитка 08, описание | продакшн и AI-пайплайны | `pinkman/deck-2026-10-26/slide-1.html`, подпись |',
'| Глава 01 | бриф; AI в каждом цикле | `slide-2.html` |',
'| Глава 02 | промт и статика; чистка артефактов | `slide-1.html` |',
'| Глава 04 | согласование | `slide-1.html` |',
'| Подписи кадров | типовые процессы × AI × база знаний; опыт остаётся у студии; рабочий прототип; Опыт внутри задачи | `slide-1.html`, `slide-2.html`, `slide-3.html`, `demo-screen2-types-2026-10-26.html` |',
'| Глава 05 | сохранение опыта; Шаги, правила и примеры хранятся в типовой задаче и достаются каждому, кто её берёт. | `slide-2.html`, `demo-screen2-types-2026-10-26.html` |','']
(ROOT/'.codex-context/run-1030/plan-2026-10-30-b.md').write_text('\n'.join(lines),encoding='utf-8')
print('Inventory written;',len(sources),'Pinkman files; concepts:',sum(1 for d in CAREER.glob('concept-*') for f in d.rglob('*') if f.is_file()))
for _,f in assets:
    with Image.open(f) as im: print(f.name,im.size,f.stat().st_size)
