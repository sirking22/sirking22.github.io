from pathlib import Path
from html.parser import HTMLParser
from PIL import Image
import hashlib, json, re, subprocess
root=Path.cwd(); career=Path('Z:/Files/Codex new/career')
class Parse(HTMLParser):
    def __init__(self): super().__init__(); self.hidden=0; self.text=[]; self.images=[]
    def handle_starttag(self,t,a):
        if t in ('head','style','script','noscript'): self.hidden+=1
        if t=='img' and not self.hidden: self.images.append(dict(a))
    def handle_endtag(self,t):
        if t in ('head','style','script','noscript'): self.hidden=max(0,self.hidden-1)
    def handle_data(self,s):
        if not self.hidden and s.strip(): self.text.append(re.sub(r'\s+',' ',s.strip()))
def parse(s):
    p=Parse(); p.feed(s); return p
sources=[*sorted((career/'pinkman/deck-2026-10-26').glob('slide-*.html')),*sorted((career/'pinkman').glob('demo-*-2026-10-26.html')),root/'index.html',*sorted((root/'v2/work').glob('*.html'))]
# Current AI page must not validate itself as a source.
sources=[p for p in sources if p!=root/'v2/work/ai-pipeline.html']
corpus=' '.join(' '.join(parse(p.read_text(encoding='utf-8')).text) for p in sources)
report={'texts':[],'images':[],'originalSlides':[]}
for name in ['v2/index.html','v2/work/ai-pipeline.html']:
    old=subprocess.check_output(['git','-c',f'safe.directory={root.as_posix()}','show',f'HEAD:{name}']).decode('utf-8')
    previous=parse(old).text; current=parse((root/name).read_text(encoding='utf-8'))
    for text in current.text:
        if text in previous: continue
        bare=re.sub(r'^\d+ / ','',text).replace(' ↗','')
        ok=bare.startswith('[') or bare in corpus
        report['texts'].append({'page':name,'text':text,'verbatimOrPlaceholder':ok})
        assert ok,text
    for a in current.images:
        if 'ai-pipeline/' not in a['src']: continue
        f=(root/name).parent/a['src']
        with Image.open(f) as im: assert (int(a['width']),int(a['height']))==im.size
        assert a.get('decoding')=='async' and a.get('alt')
        report['images'].append({'page':name,'src':a['src'],'dimensionsMatch':True})
for n in range(1,4):
    s=career/f'pinkman/deck-2026-10-26/slide-{n}.png'; d=root/f'v2/assets/ai-pipeline/slide-{n}.png'
    sha=hashlib.sha256(s.read_bytes()).hexdigest(); assert sha==hashlib.sha256(d.read_bytes()).hexdigest()
    report['originalSlides'].append({'file':d.name,'sha256':sha,'unchanged':True})
(root/'.codex-context/run-1030/qa/11-static.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
print('Verbatim/placeholder strings:',len(report['texts']),'; image occurrences:',len(report['images']),'; unchanged slides:',len(report['originalSlides']))
