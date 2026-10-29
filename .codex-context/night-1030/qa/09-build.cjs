const fs=require('fs'),cp=require('child_process'),path=require('path');
const qa=__dirname, cli='E:/DevCache/npm/_npx/31e32ef8478fbf80/node_modules/@playwright/cli/playwright-cli.js';
function run(fn,arg){const code=`async (page) => {await page.goto('http://127.0.0.1:8765/v2/');return await page.evaluate(${fn.toString()}, ${JSON.stringify(arg)});}`; const r=cp.spawnSync(process.execPath,[cli,'-s=night09','run-code',code],{encoding:'utf8',maxBuffer:20*1024*1024});const m=(r.stdout||'').match(/### Result\s*([\s\S]*?)\s*### Ran Playwright code/);if(!m)throw Error(r.stdout+r.stderr+String(r.error));return JSON.parse(m[1]);}
const pairs=run(async()=>{
 const sources=await Promise.all(['/index.html','/en/index.html'].map(p=>fetch(p).then(r=>r.text())));
 const docs=sources.map(s=>new DOMParser().parseFromString(s,'text/html'));
 const key=e=>{let parts=[];for(let a=e;a&&a.tagName!=='HTML';a=a.parentElement){if(a.id){parts.unshift('#'+a.id);break;}parts.unshift(a.tagName+'.'+[...a.classList].join('.')+':'+[...a.parentElement.children].filter(x=>x.tagName===a.tagName).indexOf(a));}return parts.join('>');};
 const en=new Map([...docs[1].querySelectorAll('body *')].map(e=>[key(e),e]));const out=[];
 for(const ru of docs[0].querySelectorAll('body *')){if(['SCRIPT','STYLE','SVG','PATH'].includes(ru.tagName))continue;const e=en.get(key(ru));if(!e||e.tagName!==ru.tagName)continue;
 for(const attr of ['alt','aria-label','title']){const a=ru.getAttribute(attr),b=e.getAttribute(attr);if(a&&b&&/[А-Яа-яЁё]/.test(a)&&!/[А-Яа-яЁё]/.test(b))out.push({ru:a,en:b,key:key(ru)+'@'+attr});}
 const a=ru.textContent.trim(),b=e.textContent.trim();if(a&&b&&/[А-Яа-яЁё]/.test(a)&&!/[А-Яа-яЁё]/.test(b)&&!ru.querySelector('p,li,div,section'))out.push({ru:a,en:b,key:key(ru)});
 }
 return out;
},null);
fs.writeFileSync(path.join(qa,'09-pairs.json'),JSON.stringify(pairs,null,2)+'\n');
function walk(d){return fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>e.isDirectory()&&e.name!=='en'?walk(path.join(d,e.name)):e.isFile()&&e.name.endsWith('.html')?[path.join(d,e.name).replaceAll('\\','/')]:[]);}
const pages=walk('v2');
const built=run(async pages=>{
 const parse=s=>new DOMParser().parseFromString(s,'text/html');
 const pairs=await fetch('/.codex-context/night-1030/qa/09-pairs.json').then(r=>r.json());
 const enRoot=parse(await fetch('/en/index.html').then(r=>r.text()));
 const norm=s=>s.replace(/\s+/g,' ').trim();
 const map=new Map(pairs.map(p=>[norm(p.ru),p.en]));
 // These exact substrings are also present in the published English page.
 const manual={'Арсений Охотин':'Arseniy Okhotin','Креативный директор':'Creative director','Креативный директор · Арсений Охотин':'Creative Director · Arseniy Okhotin','Написать на почту ↗':'ezmail2222@gmail.com','Резюме ↗':'Resume (PDF)'};
 for(const [ru,en] of Object.entries(manual)){if(!enRoot.documentElement.textContent.includes(en))throw Error('Missing verbatim source: '+en);map.set(ru,en);}
 const ledger=[];const pending=[];
 const tr=(s,file,where)=>{const n=norm(s);if(!/[А-Яа-яЁё]/.test(n)&&!/^\[/.test(n))return s;
 if(map.has(n)){ledger.push({file,where,ru:n,en:map.get(n),source:'en/index.html'});return map.get(n);}
 const value='[EN: '+n.replace(/[\[\]]/g,'')+']';pending.push({file,where,ru:n,en:value});return value;};
 const result=[];
 for(const file of pages){
 const doc=parse(await fetch('/'+file).then(r=>r.text()));
 doc.querySelectorAll('.language-switch').forEach(e=>e.remove());
 const target=file.replace('v2/','v2/en/');const base=new URL('/'+file,location.origin);const newBase=new URL('/'+target,location.origin);
 const relative=(url,from)=>{const a=from.pathname.split('/');a.pop();const b=url.pathname.split('/');while(a.length&&b.length&&a[0]===b[0]){a.shift();b.shift();}return '../'.repeat(a.length)+b.join('/')+url.search+url.hash;};
 for(const e of doc.querySelectorAll('[href],[src],[poster]'))for(const attr of ['href','src','poster']){const v=e.getAttribute(attr);if(!v||/^(https?:|mailto:|tel:|data:|#)/.test(v))continue;let url=new URL(v,base);if(attr==='href'&&/\.html$/.test(url.pathname)&&url.pathname.startsWith('/v2/'))url.pathname=url.pathname.replace('/v2/','/v2/en/');e.setAttribute(attr,relative(url,newBase));}
 for(const e of doc.querySelectorAll('meta[http-equiv="refresh"]'))e.content=e.content.replace(/url=(.*)/i,(_,v)=>'url='+v); // Same local work path in mirrored redirects.
 doc.documentElement.lang='en';
 for(const e of doc.querySelectorAll('script,style'))e.dataset.enSkip='true';
 // Replace an entire inline phrase when it has an exact English counterpart.
 for(const e of [...doc.body.querySelectorAll('p,h1,h2,h3,h4,a,span,b,strong,em,li,dt,dd,summary,button,figcaption')]){if(e.closest('script,style,noscript')||e.querySelector('p,div,section,li,nav,header,footer,figure,img,video,iframe,svg'))continue;const n=norm(e.textContent);if(map.has(n)){e.textContent=tr(n,target,e.tagName+'.'+e.className);}}
 const walker=doc.createTreeWalker(doc.documentElement,NodeFilter.SHOW_TEXT);let node;
 while(node=walker.nextNode()){if(node.parentElement.closest('script,style,noscript'))continue;const s=node.textContent;if(/[А-Яа-яЁё]/.test(s)||/^\s*\[/.test(s))node.textContent=s.replace(s.trim(),tr(s.trim(),target,node.parentElement.tagName));}
 // Metadata and accessibility strings follow the same exact-match rule.
 for(const e of doc.querySelectorAll('*'))for(const attr of ['alt','aria-label','title','content']){if(!e.hasAttribute(attr)||attr==='content'&&!(e.matches('meta[name="description"],meta[property="og:title"],meta[property="og:description"]')))continue;e.setAttribute(attr,tr(e.getAttribute(attr),target,e.tagName+'@'+attr));}
 for(const selector of ['meta[name="description"]','meta[property="og:description"]']){const e=doc.querySelector(selector),src=enRoot.querySelector(selector);if(e&&src)e.content=src.content;}
 for(const e of doc.querySelectorAll('meta[property="og:url"],link[rel="canonical"]')){const attr=e.tagName==='META'?'content':'href';e.setAttribute(attr,e.getAttribute(attr).replace('/v2/','/v2/en/'));}
 const heading=doc.querySelector('.statement h1');if(heading)heading.innerHTML='From a new niche<br> to steady sales.';
 const status=doc.getElementById('filter-status');if(status)status.dataset.countLabel='[EN: Работ]';
 const ruURL=new URL('/'+file,location.origin);
 const switcher=doc.createElement('a');switcher.className='language-switch';switcher.hreflang='ru';switcher.lang='ru';switcher.href=relative(ruURL,newBase);switcher.textContent='RU';
 (doc.querySelector('.top nav')||doc.body).append(switcher);
 for(const e of doc.querySelectorAll('[data-en-skip]'))e.removeAttribute('data-en-skip');
 result.push({file:target,html:'<!doctype html>\n'+doc.documentElement.outerHTML+'\n'});
 }
 return {pages:result,ledger,pending};
},pages);
for(const p of built.pages){fs.mkdirSync(path.dirname(p.file),{recursive:true});fs.writeFileSync(p.file,p.html);}
fs.writeFileSync(path.join(qa,'09-text-ledger.json'),JSON.stringify({verbatim:built.ledger,placeholders:built.pending},null,2)+'\n');
for(const file of pages){let s=fs.readFileSync(file,'utf8');if(s.includes('class="language-switch"'))continue;const en=path.posix.relative(path.posix.dirname(file),file.replace('v2/','v2/en/'));const a=`<a class="language-switch" href="${en}" hreflang="en" lang="en">EN</a>`;s=s.includes('</nav>')?s.replace('</nav>',a+'\n</nav>'):s.replace('</body>',a+'\n</body>');fs.writeFileSync(file,s);}
console.log(JSON.stringify({pages:pages.length,verbatim:built.ledger.length,placeholders:built.pending.length}));
