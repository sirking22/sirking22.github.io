from pathlib import Path
from PIL import Image
import re,json
root=Path.cwd();qa=root/'.codex-context/night-1030/qa'
changes={
'Коллаж фотографий, цветовых палитр и раскадровок RAWMID':'Коллаж фотографий техники, блюд и раскадровок RAWMID',
'alt="Путь одного решения"':'alt="Схема этапов принятия решения с соединяющими стрелками"',
'alt="Signal → Decision → Production → Proof"':'alt="Четыре карточки Signal, Decision, Production и Proof, соединённые кольцом"',
'alt="Фирменный стиль: Яжевика"':'alt="Сиреневый знак и надпись Yajevika на белом фоне"'}
pages=list((root/'v2').rglob('*.html'))
for p in pages:
    text=p.read_text(encoding='utf-8')
    for old,new in changes.items():text=text.replace(old,new)
    p.write_text(text,encoding='utf-8')
def ratio(h):
    c=[int(h[i:i+2],16)/255 for i in [0,2,4]]
    l=sum((v/12.92 if v<=.04045 else ((v+.055)/1.055)**2.4)*w for v,w in zip(c,[.2126,.7152,.0722]))
    return 1.05/(l+.05)
errors=[];images=[]
for p in pages:
    text=p.read_text(encoding='utf-8')
    for required in ['<html lang="ru"','name="viewport"','rel="canonical"']:
        if required not in text:errors.append([str(p.relative_to(root)),required])
    for tag in re.findall(r'<img\b[^>]*>',text):
        a=dict(re.findall(r'([\w-]+)="([^"]*)"',tag))
        if not all(k in a for k in ['width','height','loading','decoding','alt']):errors.append([str(p.relative_to(root)),tag])
        if a.get('src','').startswith('http'):continue
        asset=(p.parent/a['src']).resolve()
        with Image.open(asset) as im:
            if [str(im.width),str(im.height)]!=[a['width'],a['height']]:errors.append(['dimensions',str(p),tag])
        images.append({'page':p.relative_to(root).as_posix(),'src':asset.relative_to(root).as_posix(),'bytes':asset.stat().st_size})
        if asset.stat().st_size>300000:errors.append(['over300KB',str(asset)])
oversize=[str(p) for p in (root/'v2/assets').rglob('*') if p.is_file() and p.suffix.lower() in ['.webp','.png','.jpg'] and p.stat().st_size>300000]
result={'pages':len(pages),'imgInstances':len(images),'uniqueImages':len(set(i['src'] for i in images)),'largest':max(images,key=lambda i:i['bytes']),'errors':errors,'oversize':oversize,'contrast':{h:ratio(h) for h in ['8a8a8a','767676','d4af37','887020','101010']}}
(qa/'07-static.json').write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf-8');print(json.dumps(result,ensure_ascii=False))
