from pathlib import Path
from PIL import Image
import re, json, html
root=Path.cwd(); qa=root/'.codex-context/night-1030/qa'; pages=list((root/'v2').rglob('*.html'))
attrs=lambda t:dict(re.findall(r'([\w-]+)="([^"]*)"',t))
refs=set((root/'v2/assets').glob('*'))
for p in pages:
    for tag in re.findall(r'<(?:img|video)\b[^>]*>',p.read_text(encoding='utf-8')):
        a=attrs(tag)
        for k in ['src','poster']:
            if a.get(k) and not a[k].startswith('http'): refs.add((p.parent/a[k]).resolve())
mapping={}; compressed=[]
for p in sorted(refs):
    if not p.is_file() or p.suffix.lower() not in ['.webp','.png','.jpg','.jpeg'] or p.stat().st_size<=300000: continue
    before=p.stat().st_size
    im=Image.open(p); im.thumbnail((1600,100000),Image.Resampling.LANCZOS)
    target=p if p.is_relative_to(root/'v2') else root/'v2/assets'/('optimized-'+str(p.relative_to(root/'assets')).replace('\\','-').replace('/','-').rsplit('.',1)[0]+'.webp')
    if target.suffix!='.webp':target=target.with_suffix('.webp')
    for quality in [88,82,76,70,64,58,50]:
        im.save(target,'WEBP',quality=quality,method=6)
        if target.stat().st_size<=300000:break
    assert target.stat().st_size<=300000
    mapping[p]=target
    compressed.append({'source':str(p.relative_to(root)),'target':str(target.relative_to(root)),'before':before,'after':target.stat().st_size,'width':im.width,'height':im.height,'quality':quality})
alts={
'case-moodboard.webp':'Коллаж фотографий, цветовых палитр и раскадровок RAWMID',
'case-social.webp':'Макеты постов RAWMID с фотографиями продуктов и рецептов',
'case-pack-before.webp':'Коробки техники RAWMID с разными макетами упаковки',
'case-pack-after.webp':'Ряд коробок техники RAWMID с общим оформлением',
'karuna-01.webp':'Плакат Karuna с входящим звонком на экране телефона',
'karuna-02.webp':'Плакат Karuna «Проверь прежде чем отвечать»',
'kreslo-01.webp':'Коллаж фотографий детей и бирюзовый логотип «Кресло читалка»',
'kreslo-02.webp':'Схема миссии, ценностей и аудитории детского проекта',
'kreslo-03.webp':'Золотистые пиктограммы и повторяющиеся узоры',
'kreslo-04.webp':'Бирюзовый логотип «Кресло читалка» и эмблема с книгой',
'kreslo-05.webp':'Золотистая и бирюзовая палитры и образцы шрифтов',
'kreslo-06.webp':'Круглые эмблемы, пиктограммы и цветные паттерны',
'kreslo-07.webp':'Блокноты, сумка, значки и канцелярские принадлежности с эмблемами',
'kreslo-09.webp':'Бирюзовые и золотистые рекламные баннеры с фотографиями',
'style-kan-dark.webp':'Жёлтый контур и белая надпись на тёмном фоне',
'shot-load.webp':'Таблица Notion с задачами, часами и сроками по сотрудникам',
'shot-production.webp':'Таблица продакшна в Notion с исполнителями, статусами и сроками',
'shot-norms.webp':'Таблица Notion с типами работ, временем и числом правок',
'shot-audience.webp':'Таблица аудитории в Notion',
'shot-competitors.webp':'Таблица конкурентов в Notion',
'shot-jobs.webp':'Таблица задач аудитории с контекстом и ожидаемым результатом',
'shot-ideas.webp':'Таблица идей с описаниями и статусами',
'shot-light.webp':'Карточка Notion с двумя кадрами и разбором света и тени',
'shot-releases.webp':'Таблица релизов с каналами, датами и метриками',
'shot-facts-2026-09.webp':'Таблица метрик со значениями, периодами и источниками',
'scandic-01.webp':'Жёлтая жестяная коробка Scandic с рисунками',
'scandic-02.webp':'Голубая жестяная коробка Scandic с рисунками',
'scandic-03.webp':'Синяя жестяная коробка Scandic с неоновыми рисунками',
'scandic-04.webp':'Красная коробка Scandic с логотипом МТС',
'scandic-05.webp':'Открытая коробка Scandic с надписью VK Fest 2024',
'scandic-06.webp':'Коробка Scandic на столе рядом с кофейным стаканом и ключами',
}
for p in pages:
    text=p.read_text(encoding='utf-8'); count=0
    def image(m):
        global count
        tag=m[0]; a=attrs(tag); src=a.get('src','')
        def setatt(key,value):
            nonlocal tag
            value=html.escape(str(value),quote=True)
            if re.search(r'\b'+key+r'="[^"]*"',tag): tag=re.sub(r'\b'+key+r'="[^"]*"',lambda _:key+'="'+value+'"',tag)
            else:tag=tag[:-1]+' '+key+'="'+value+'">'
        if src.startswith('http'):
            setatt('width',1);setatt('height',1);setatt('loading','lazy');setatt('decoding','async');return tag
        original=(p.parent/src).resolve(); target=mapping.get(original,original)
        if target!=original:
            import os
            setatt('src',os.path.relpath(target,p.parent).replace('\\','/'))
        with Image.open(target) as im:setatt('width',im.width);setatt('height',im.height)
        if original.name in alts:setatt('alt',alts[original.name])
        eager=count==0 and p.name!='method.html'
        if p.name=='index.html': eager=src in ['../assets/case-moodboard.webp','../assets/dyson/set-ooh-street.webp','../assets/shot-load.webp']
        setatt('loading','eager' if eager else 'lazy');setatt('decoding','async');count+=1
        return tag
    text=re.sub(r'<img\b[^>]*>',image,text)
    canonical='https://okhotin.site/'+p.relative_to(root).as_posix()
    if p.name=='index.html':canonical='https://okhotin.site/v2/'
    if p.name=='case-rawmid-style.html':canonical='https://okhotin.site/v2/work/rawmid-style.html'
    if p.name=='rawmid-packaging.html':canonical='https://okhotin.site/v2/work/rawmid-style.html#packaging'
    text=text.replace('</head>','  <link rel="canonical" href="'+canonical+'">\n</head>')
    if 'src="v2.js"' not in text and 'src="../v2.js"' not in text and 'http-equiv="refresh"' not in text:
        text=text.replace('</head>','  <script src="'+('../' if p.parent.name in ['work','drafts'] else '')+'v2.js" defer></script>\n</head>')
    p.write_text(text,encoding='utf-8')
# Existing template, only placeholder for the missing-page message.
text=(root/'v2/info.html').read_text(encoding='utf-8')
text=text.replace('https://okhotin.site/v2/info.html','https://okhotin.site/v2/404.html').replace('<title>Инфо —','<title>404 —').replace('content="Инфо —','content="404 —')
text=re.sub(r'<main>[\s\S]*?</main>','<main><h1 class="page-title">[Страница не найдена]</h1><p class="page-intro"><a href="index.html">Работы ↗</a></p></main>',text)
text=text.replace(' aria-current="page"','').replace('<meta charset="utf-8">','<meta charset="utf-8">\n  <meta name="robots" content="noindex">')
(root/'v2/404.html').write_text(text,encoding='utf-8')
css=root/'v2/v2.css';text=css.read_text(encoding='utf-8').replace('--mute: #8a8a8a','--mute: #767676').replace('--brand-gold: #d4af37','--brand-gold: #887020');css.write_text(text,encoding='utf-8')
(qa/'07-compression.json').write_text(json.dumps(compressed,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps(compressed,ensure_ascii=False))
