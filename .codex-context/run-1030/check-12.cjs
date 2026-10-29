const fs=require('fs'),cp=require('child_process');
const walk=d=>fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(d+'/'+e.name):e.name.endsWith('.html')?[d+'/'+e.name]:[]);
const files=walk('v2/en');
const fn=async(page,files)=>{
 const result={views:[],errors:[],failedResponses:[],switches:[],sourceChecks:[],filters:[]};
 page.on('pageerror',e=>result.errors.push(e.message));page.on('console',m=>{if(m.type()==='error')result.errors.push(m.text());});
 await page.route('**/*',r=>new URL(r.request().url()).hostname==='127.0.0.1'?r.continue():r.fulfill({status:204,body:''}));
 page.on('response',r=>{if(r.status()>=400)result.failedResponses.push({url:r.url(),status:r.status()});});
 const origin='http://127.0.0.1:8771/';
 await page.goto(origin+'v2/en/');
 for(const file of files){
  result.sourceChecks.push(await page.evaluate(async file=>{
   const parse=s=>new DOMParser().parseFromString(s,'text/html');
   const ruFile=file.replace('v2/en/','v2/');
   const [en,ru]=await Promise.all([file,ruFile].map(f=>fetch('/'+f).then(r=>r.text()).then(parse)));
   const getStrings=doc=>{const out=[];const w=doc.createTreeWalker(doc.documentElement,NodeFilter.SHOW_TEXT);let n;while(n=w.nextNode())if(!n.parentElement.closest('script,style,noscript'))out.push(n.textContent);for(const el of doc.querySelectorAll('*'))for(const a of ['alt','title','aria-label','data-count-label','content'])if(el.hasAttribute(a))out.push(el.getAttribute(a));return out;};
   const enStrings=getStrings(en),ruStrings=getStrings(ru);
   const brackets=ss=>ss.reduce((n,s)=>n+(s.match(/\[[^\]]*\]/g)||[]).length,0);
   const sw=en.querySelector('.language-switch'),rs=ru.querySelector('.language-switch');
   const enBase=new URL(file,location.origin+'/'),ruBase=new URL(ruFile,location.origin+'/');
   return {file,cyrillic:enStrings.filter(s=>/[А-Яа-яЁё]/.test(s)),pending:enStrings.filter(s=>s.includes('[EN:')),enBrackets:brackets(enStrings),ruBrackets:brackets(ruStrings),switchToRu:sw?new URL(sw.getAttribute('href'),enBase).pathname:null,expectedRu:'/'+ruFile,switchToEn:rs?new URL(rs.getAttribute('href'),ruBase).pathname:null,expectedEn:'/'+file,redirect:en.querySelector('meta[http-equiv="refresh"]')?.content};
  },file));
 }
 for(const width of [1440,375]){
  await page.setViewportSize({width,height:900});
  for(const file of files){
   await page.goto(origin+file);if(/case-rawmid-style|rawmid-packaging/.test(file))await page.waitForURL('**/v2/en/work/rawmid-style.html*');
   await page.evaluate(async()=>{await document.fonts.ready;await Promise.all([...document.images].map(i=>{i.loading='eager';return i.decode().catch(()=>{});}));});
   result.views.push({file,width,...await page.evaluate(()=>({overflow:Math.max(0,document.documentElement.scrollWidth-innerWidth),broken:[...document.images].filter(i=>!i.naturalWidth&&!i.closest('noscript')).map(i=>i.src),lang:document.documentElement.lang}))});
   if(file==='v2/en/index.html'||file==='v2/en/work/ai-pipeline.html')await page.screenshot({path:`output/playwright/run-12/${file.replaceAll('/','-')}-${width}.png`,fullPage:true});
  }
 }
 for(const file of files.filter(f=>!f.includes('case-rawmid-style')&&!f.includes('rawmid-packaging'))){
  await page.goto(origin+file);await page.locator('.language-switch').click();const ru=page.url();await page.locator('.language-switch').click();result.switches.push({file,ru,en:page.url(),pass:page.url()===origin+file});
 }
 await page.goto(origin+'v2/en/index.html');
 for(const key of ['identity','packaging','web','ai','all']){await page.locator(`[data-filter="${key}"]`).click();result.filters.push({key,status:await page.locator('#filter-status').textContent(),visible:await page.locator('.tile:visible').count()});}
 return result;
};
fs.mkdirSync('output/playwright/run-12',{recursive:true});
const code=`async page=>await (${fn.toString()})(page,${JSON.stringify(files)})`;
const r=cp.spawnSync(process.execPath,['E:/DevCache/npm/_npx/31e32ef8478fbf80/node_modules/@playwright/cli/playwright-cli.js','-s=run12','run-code',code],{encoding:'utf8',maxBuffer:20000000,timeout:240000});
const m=(r.stdout||'').match(/### Result\s*([\s\S]*?)\s*### Ran Playwright code/);if(!m)throw Error(r.stdout+r.stderr+r.error);
const result=JSON.parse(m[1]);fs.writeFileSync('.codex-context/run-1030/qa/12-checks.json',JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify({views:result.views.length,errors:result.errors,failedResponses:result.failedResponses,badViews:result.views.filter(v=>v.overflow||v.broken.length||v.lang!=='en'),badSources:result.sourceChecks.filter(s=>s.cyrillic.length||s.pending.length||s.enBrackets!==s.ruBrackets||(!s.redirect&&(s.switchToRu!==s.expectedRu||s.switchToEn!==s.expectedEn))),switches:result.switches.length,badSwitches:result.switches.filter(s=>!s.pass),filters:result.filters},null,2));
