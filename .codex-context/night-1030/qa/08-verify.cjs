const fs=require('fs'),crypto=require('crypto'),assert=require('assert');
const q=__dirname,read=p=>fs.readFileSync(p,'utf8'),data=JSON.parse(read(q+'/08-browser.json')),ledger=JSON.parse(read(q+'/08-source-ledger.json')),plan=read(q+'/../plan-2026-10-30.md');
const norm=s=>s.replace(/\s+/g,' ').trim();
const clean=s=>norm(s.replace(/<svg\b[\s\S]*?<\/svg>/g,'').replace(/<[^>]+>/g,'').replace(/&nbsp;/g,' ').replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>'));
for(const source of ledger.sources)assert.equal(crypto.createHash('sha256').update(read(source.path).replace(/^\uFEFF/,'')).digest('hex'),source.sha256,source.path);
for(const ref of ledger.curated){const source=read(ref.path);assert((ref.path.endsWith('.html')?clean(source):norm(source)).includes(ref.quote),ref.path+':'+ref.line);}
assert.equal((plan.match(/^## Скан нанимающего$/gm)||[]).length,1);
assert.equal((plan.match(/\*\*Обновление 08-scan:\*\*/g)||[]).length,1);
assert(!plan.includes('В 11 остальных `.case-notes`'));
for(const title of ['Кто и что делает','Год и роль на плитках','У каждого кейса есть результат','Директорское решение','Связаться одним нажатием','Скорость, телефон, превью'])assert(plan.includes(title),title);
for(const view of data.views){
 assert.equal(view.status,200);assert.equal(view.overflow,0);assert.equal(view.tiles.length,12);assert.equal(view.imageCheck.total,22);assert.equal(view.imageCheck.broken.length,0);
 assert.equal(view.tiles.filter(t=>!t.year.includes('[')).length,4);assert(view.tiles.every(t=>t.role==='[…]'));
 assert.equal(view.tiles[4].case,'scandic');
 assert(view.firstScreen.every(e=>e.aboveFold));
 assert.deepEqual(view.filters.map(f=>f.visible),[5,2,2,4,12]);assert(view.filters.every(f=>f.pressed==='true'&&f.status==='Работ: '+f.visible));
 assert(view.contactAfterClick.url.endsWith('/v2/info.html#contact'));
 assert(view.contactAfterClick.links.filter(l=>l.href.startsWith('mailto:')||l.href.includes('t.me/')).every(l=>l.top>=0&&l.bottom<=view.height));
 for(const suffix of ['', '-full']){const p=q+`/08-home-${view.width}${suffix}.png`,png=fs.readFileSync(p);assert.equal(png.readUInt32BE(16),view.width);if(!suffix)assert.equal(png.readUInt32BE(20),812);}
 const png=fs.readFileSync(q+`/08-contact-${view.width}.png`);assert.equal(png.readUInt32BE(16),view.width);assert.equal(png.readUInt32BE(20),812);
}
assert.equal(data.errors.length,0);
assert.equal(data.cases.length,12);assert(data.cases.every(c=>c.contact==='../info.html#contact'));
assert.equal(data.cases.filter(c=>c.notes?.includes('[результат, текст позже]')).length,9);
assert.equal(data.cases.filter(c=>!c.notes).length,2);
assert(data.cases.find(c=>c.url.includes('rawmid-style')).notes.includes('1,7% → 3,4%'));
const result={passed:true,sourceHashes:ledger.sources.length,verbatimQuotes:ledger.curated.length,casePages:12,resultPresent:1,resultPlaceholder:9,resultSectionAbsent:2,scanChecks:6,widths:data.views.map(v=>({width:v.width,height:v.height,overflow:v.overflow,images:v.imageCheck.total,broken:v.imageCheck.broken.length,filters:v.filters.map(f=>({key:f.key,count:f.visible}))})),screenshots:6,consoleErrors:0,externalRequestsMocked:data.blockedExternal};
fs.writeFileSync(q+'/08-verification.json',JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(result,null,2));
