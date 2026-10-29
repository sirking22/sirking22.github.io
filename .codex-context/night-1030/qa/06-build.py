from pathlib import Path
import re, json

root = Path.cwd()
qa = root / '.codex-context/night-1030/qa'
source = (root / 'v2/work/rawmid-style.html').read_text(encoding='utf-8')
head = source.split('<main>')[0]
head = head.replace('<meta name="viewport"', '<meta name="robots" content="noindex">\n  <meta name="viewport"', 1)
head = head.replace('https://okhotin.site/v2/work/rawmid-style.html', 'https://okhotin.site/v2/drafts/rawmid-decision.html')
before = 'Упаковка линейки до пересборки: разнородные коробки без общего языка.'
after = 'Упаковка после пересборки: единый визуальный язык на всей линейке.'
frames = ''
for name, width, caption in [('before',1074,before),('after',1079,after)]:
    frames += f'<figure class="f wide"><img src="../../assets/case-pack-{name}.webp" width="{width}" height="899" alt="{caption}" loading="lazy" decoding="async"><figcaption>{caption}</figcaption></figure>\n'
main = f'''<main>
<header class="case-heading"><h1>RAWMID</h1><p>[…] · фирменный стиль · [роль] · [команда]</p></header>
<div class="case-chapters">
<section class="case-chapter" id="variants" aria-labelledby="variants-title">
<header class="chapter-heading"><h2 id="variants-title">Варианты</h2><p>[до и после; отвергнутые варианты — позже]</p></header>
<div class="frames">{frames}</div>
</section>
<section class="case-chapter" id="criterion" aria-labelledby="criterion-title">
<header class="chapter-heading"><h2 id="criterion-title">Критерий выбора</h2><p>[критерий выбора, текст позже]</p></header>
</section>
<section class="case-chapter" id="why" aria-labelledby="why-title">
<header class="chapter-heading"><h2 id="why-title">Почему этот</h2><p>[почему этот, текст позже]</p></header>
</section>
</div>
</main>
'''
footer = '<footer' + source.split('<footer',1)[1]
draft = root / 'v2/drafts/rawmid-decision.html'
draft.parent.mkdir(exist_ok=True)
draft.write_text(head + main + footer, encoding='utf-8')

rows = []
def row(path, line, shows, quote):
    rows.append(f'| `{path}:{line}` | {shows} | «{quote.replace(chr(124), "&#124;") }» |')
live = (root/'index.html').read_text(encoding='utf-8').splitlines()
for number, text in enumerate(live,1):
    if number in [314,316,318,340,341,342,343,344,483,613]:
        clean = re.sub('<[^>]+>','',text).strip()
        if number in [340,341,343,344]:
            clean = re.search(r'alt="([^"]+)"',text).group(1)
        row('index.html',number,'Опубликованное основание / подпись; не протокол отбора',clean)
rows.extend([
f'| `assets/case-pack-before.webp` (1074×899) | Просмотрен: прежние коробки, инструкции, логотип. Реальное состояние «до», не отвергнутый эскиз. | «БЫЛО»; подпись root: «{before}» |',
f'| `assets/case-pack-after.webp` (1079×899) | Просмотрен: клубные постеры, техника, мерч, новая коробка. Состояние «после». | «СТАЛО»; подпись root: «{after}» |',
'| `assets/case-decision-scheme.webp` (1600×1600) | Просмотрен: пять наблюдений → решения, идея платформы, нижняя полоса метрик. В текущем root HTML не подключён; только сырьё, не доказательство причинности или отбора альтернатив. | «Мясоеды, вегетарианцы и сыроеды не смешиваются: сыроед не станет смотреть мясной контент» → «Клубы по интересам: RAW, ЗОЖ, ВЕГ, ДАЧА, FAMILY»; «Бренд живёт вокруг интересов покупателя, а не вокруг продаж.» |',
'| `assets/case-decision-scheme-en.webp`, `case-pack-before-en.webp`, `case-pack-after-en.webp` | Английские параллельные файлы; не дополнительные варианты дизайна. Русские оригиналы перечислены выше. | Подписи русских оригиналов: «БЫЛО», «СТАЛО», «Пять наблюдений сошлись в одном бренде». Английские растры отдельно не транскрибированы. |',
'| `assets/case-lineup.webp` (1254×1254), `assets/raw-club-set.webp` | Просмотрен lineup: блендер, коробка, бутылки, кружка, сумка и фартук. Развитие языка на носители; не альтернативы. | В кадре: «RAW Клуб»; `index.html:339`: «Набор RAW-клуба: блендер, бутылки, кружка, фартук, сумка, упаковка техники RAWMID». |',
'| `assets/case-social.webp`, `case-moodboard.webp`, `case-lifestyle.webp`, `case-materials.mp4`, `poster-materials.webp` | Сопутствующие финальные материалы/носители. Само наличие кадров не показывает выбор из вариантов. | `index.html:343–344`: «Подборка кадров и раскадровок для съёмок бренда.»; «Макеты для соцсетей: рецепты и продукты в едином визуальном языке.» |',
'| `v2/assets/rawmid-video-01.webp`, `rawmid-video-02.webp`; `v2/work/rawmid-video.html` | Два кадра видео-кейса и опубликованная связка до/после подачи; не выбор бренд-платформы. | `index.html:483`: «Разбор подачи», «Ролик до разбора и после.» |',
'| `v2/assets/rawmid-app-01.webp` … `rawmid-app-03.webp`; `v2/work/rawmid-app.html` | Три кадра прототипа: реализация продуктовой логики, не отвергнутые направления. | `index.html:342`: «Приложение «RAWMID Клуб»: прототип сам проходит путь от QR на коробке до клуба и следующей покупки». |',
])
external = Path('Z:/Files/Codex new/projects/ez-showcase')
for name, selections, description in [
 ('copy-2026-09-01.md',[119,122,123],'Ранняя редакция кейса без отметки публикации'),
 ('copy-block3-2026-09-16.md',[3,29,30,33,34,37,38,41,42,45,46,49,50,51,67,68,69,74,75,76],'Черновой механизм выбора; числа требуют сверки, не переносить на страницу'),
 ('case-notion-plan-2026-10-28.md',[22,37],'До/после инфраструктуры команды, не выбор айдентики RAWMID')]:
    lines=(external/name).read_text(encoding='utf-8').splitlines()
    for n in selections:
        if n<=len(lines) and lines[n-1].strip(): row((external/name).as_posix(),n,description,lines[n-1].strip())
for name in ['.codex-context/codex-prompt-v4.md','codex-prompt-grid-v2-2026-10-28.md']:
    for n, text in enumerate((root/name).read_text(encoding='utf-8').splitlines(),1):
        if re.search('RAWMID|бренд-платформ|логотип до и после',text,re.I): row(name,n,'Задание на сборку, не первичное доказательство отбора',text)

dyson=Path('Z:/Files/Codex new/career/concept-dyson')
dyrows=[]
pattern=re.compile(r'отклон|отверг|выбра|выбор|критери|лучше|лучший|снят|опоры|контрол|порог|не повторяет|финал|принято',re.I)
for file in sorted(dyson.rglob('*.md')):
    for n, text in enumerate(file.read_text(encoding='utf-8').splitlines(),1):
        if pattern.search(text) and text.strip():
            dyrows.append(f'| `{file.as_posix()}:{n}` | «{text.strip().replace(chr(124), "&#124;") }» |')
assets=[p.relative_to(dyson).as_posix() for p in sorted(dyson.rglob('*')) if p.is_file() and p.suffix.lower() in ['.png','.jpg','.webp']]
section='''

## Режиссёрское решение — сырьё и черновик (06-decision)

Поиск только по локальным источникам. Найденные формулировки ниже — сырьё, а не утверждённый рассказ о выборе. RAWMID: есть платформа, наблюдения и до/после; протокола сравнения отвергнутых направлений с выбранным не найдено. Не называть прежнюю упаковку отвергнутым вариантом. CTR в опубликованной строке относится к карточкам; причинность изменения упаковки им не доказана.

### RAWMID — находки

| Источник | Что показывает / ограничение | Дословный фрагмент |
| --- | --- | --- |
'''+ '\n'.join(rows)+'''

Проверены root index.html, README.md, portfolio-inventory-2026-10-27.md, codex-prompt-grid-v2-2026-10-28.md, контекстные брифы предыдущих сборок, 4 copy-*.md, AUDIT-EN-2026-09-16.md и case-notion-plan-2026-10-28.md; имена всех файлов assets/ и v2/assets/. copy-niche и AUDIT-EN не дали новых оснований выбора RAWMID. Английские дубли и кадры финальных носителей не считаются отвергнутыми вариантами.

`v2/drafts/rawmid-decision.html`: отдельный черновик на существующих классах work-page, noindex, входящих ссылок со страниц нет. В «Вариантах» только опубликованные кадры упаковки до/после с дословными подписями root. Схема наблюдений остаётся здесь как сырьё: она не подключена к live root. «Критерий выбора» и «Почему этот» — квадратные заглушки.

Нужно от владельца (10 минут на выбор материала): какие 2–3 направления действительно сравнивались, где их кадры, какой критерий был задан до выбора и чем выбранное направление прошло его лучше? Если альтернатив не сохранилось, подтвердить возможность рассказать решение через наблюдение → выбор → до/после без реконструкции отвергнутых макетов.

### Dyson — материалы для вариантов и выбора, без новой страницы

Ключевые связки: brief.md — ценовой контроль против доказательства и заранее заданный порог; design-log.md — принятые/отклонённые системы; carousel-systems-2026-10-12.md — две композиции; case-draft-2026-10-15.md — снятое сообщение «Clean at crawling height» из-за отсутствия опоры в отзывах; candidates/regen/*check.md — сравнение геометрии и артефактов с референсом. Это разные уровни решения: стратегия, композиция, точность продукта. Проверки генераций — записи исполнителя, их нельзя автоматически приписывать решению владельца.

Все найденные строки о выборе в Markdown этой папки перечислены ниже с точными путями. Это автоматический реестр кандидатов, включая контекст и ограничения, а не подтверждение их публикации. Исследовательские цитаты требуют сверки с оригиналом (ограничение reviews-cep-2026-10-09.md); план +20% CTR / 50 000 показов / 14 дней не выдавать за проведённый тест или результат Dyson.

| Источник | Дословный фрагмент |
| --- | --- |
'''+ '\n'.join(dyrows)+'''

Визуальные файлы Dyson на диске (полный реестр имён, не утверждённая подборка). Версии creative-A-v1…v4 и concept4-split-v1/v2 можно сопоставить; refs/ — ориентиры продукта; candidates/regen/ — итерации точности. Связь с выбором подтверждать по журналам выше, не по номеру файла. Файлы не изменены, изображения Dyson этим пакетом не переносились на сайт.

'''+ '\n'.join(f'- `{(dyson/p).as_posix()}`' for p in assets)+'\n'
plan=root/'.codex-context/night-1030/plan-2026-10-30.md'
with plan.open('a',encoding='utf-8') as f: f.write(section)
(qa/'06-source-counts.json').write_text(json.dumps({'rawmid_rows':len(rows),'dyson_choice_quotes':len(dyrows),'dyson_visual_files':len(assets)},indent=2),encoding='utf-8')
print(json.dumps({'rawmid_rows':len(rows),'dyson_choice_quotes':len(dyrows),'dyson_visual_files':len(assets)}))
