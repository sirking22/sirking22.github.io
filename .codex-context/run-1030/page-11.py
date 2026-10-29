from pathlib import Path
from PIL import Image
import re, json
root=Path.cwd(); assets=root/'v2/assets/ai-pipeline'
for src in (root/'output/playwright/run-11').glob('demo-*.png'):
    im=Image.open(src).convert('RGB')
    assert im.width==1440
    for quality in range(90,39,-5):
        dst=assets/(src.stem+'.webp'); im.save(dst,'WEBP',quality=quality,method=6)
        if dst.stat().st_size<=300000: break
    assert dst.stat().st_size<=300000

def img(name,alt,hero=False):
    with Image.open(assets/name) as im: w,h=im.size
    return f'<img src="../assets/ai-pipeline/{name}" width="{w}" height="{h}" alt="{alt}"'+('' if hero else ' loading="lazy"')+' decoding="async">'
def frame(name,alt,caption='[…] ',wide=True):
    return '<figure class="f'+(' wide' if wide else '')+'">\n'+img(name,alt)+'\n<figcaption>'+caption.strip()+'</figcaption>\n</figure>'
def chapter(id,title,text,content):
    return f'<section class="case-chapter" id="{id}" aria-labelledby="{id}-title">\n<header class="chapter-heading"><h2 id="{id}-title">{title}</h2><p>{text}</p></header>\n{content}\n</section>'

p=root/'v2/work/ai-pipeline.html'; html=p.read_text(encoding='utf-8')
start=html.index('<div class="hero empty">'); end=html.index('<nav class="next"',start)
body='<div class="hero">'+img('slide-2.png','Схема цикла AI и база опыта: от брифа до сохранения опыта',True)+'</div>\n'
body+='<header class="case-heading"><h1>AI pipeline</h1>\n<p>[…] · [дисциплина] · [роль] · [команда]</p></header>\n<div class="case-chapters">\n'
body+=chapter('brief','01 / бриф','AI в каждом цикле','<div class="frames">'+frame('slide-1.png','Схема шести этапов видеофона и кадр сцены «Синяя птица»','типовые процессы × AI × база знаний')+'</div>')+'\n'
body+=chapter('generation','02 / промт и статика','чистка артефактов','<div class="frames">'+frame('car-a.webp','Серый автомобиль с жёлтыми панелями: профиль, два ракурса и приборная панель')+'</div>')+'\n'
body+=chapter('variants','03 / […]','[…]','<div class="frames">'+frame('car-b.webp','Вариант автомобиля B: кузов и салон в четырёх видах',wide=False)+frame('car-c.webp','Вариант автомобиля C: кузов и салон в четырёх видах',wide=False)+frame('car-d.webp','Вариант автомобиля D: кузов и салон в четырёх видах')+'</div>')+'\n'
body+=chapter('selection','04 / согласование','[…]','<div class="empty chapter-empty">[…]</div>')+'\n'
body+=chapter('release','05 / сохранение опыта','[…]','<div class="frames">'+frame('slide-3.png','Нормы часов RAWMID по типам задач и гайд обложки YouTube','рабочий прототип')+frame('demo-screen2-types-2026-10-26.webp','Таблица типовых задач RAWMID и блок «Опыт внутри задачи»','Опыт внутри задачи')+'</div>\n<p class="related-work">Шаги, правила и примеры хранятся в типовой задаче и достаются каждому, кто её берёт.</p>\n<p class="related-work"><a href="dyson-v15.html">Dyson V15 ↗</a></p>')
body+='\n</div>\n\n'
p.write_text(html[:start]+body+html[end:],encoding='utf-8')
p=root/'v2/index.html'; html=p.read_text(encoding='utf-8')
start=html.index('<a class="tile later" href="work/ai-pipeline.html"'); end=html.index('</a>',start)+4
tile=html[start:end].replace('class="tile later"','class="tile"')
tile=tile.replace('<div class="frame"><span>[кадры позже]</span></div>','<div class="frame"><img src="assets/ai-pipeline/slide-2.png" width="2560" height="1440" alt="Схема цикла AI и база опыта" class="slide is-active" loading="lazy" decoding="async"></div>')
tile=tile.replace('[описание позже]','продакшн и AI-пайплайны')
p.write_text(html[:start]+tile+html[end:],encoding='utf-8')
manifest=[]
for f in sorted(assets.iterdir()):
    with Image.open(f) as im: manifest.append({'file':f.name,'width':im.width,'height':im.height,'bytes':f.stat().st_size})
(root/'output/playwright/run-11/assets.json').write_text(json.dumps(manifest,indent=2),encoding='utf-8')
print(json.dumps(manifest,indent=2))
