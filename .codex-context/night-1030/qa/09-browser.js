async (page) => {
 const files=__PAGES__, result={views:[],errors:[],failedRequests:[],filters:[],switches:[]};
 page.on('pageerror',e=>result.errors.push(String(e)));
 page.on('console',m=>{if(m.type()==='error')result.errors.push(m.text());});
 await page.route('**/*',r=>new URL(r.request().url()).hostname==='127.0.0.1'?r.continue():r.fulfill({status:204,body:''}));
 page.on('response',r=>{if(r.status()>=400)result.failedRequests.push({url:r.url(),status:r.status()});});
 for(const width of [1440,375]){
 await page.setViewportSize({width,height:812});
 for(const file of files){
 const response=await page.goto('http://127.0.0.1:8765/'+file);
 if(/case-rawmid-style|rawmid-packaging/.test(file))await page.waitForURL(url=>url.pathname==='/v2/en/work/rawmid-style.html');
 await page.evaluate(()=>document.fonts.ready);
 await page.waitForTimeout(80);
 const view=await page.evaluate(async()=>{
 const imgs=[...document.images].filter(i=>!i.closest('noscript'));for(const i of imgs){i.loading='eager';try{await i.decode();}catch{}}
 const unwrapped=[];const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let node;while(node=walker.nextNode()){if(!node.parentElement.closest('script,style,noscript')&&/[А-Яа-яЁё]/.test(node.textContent.replace(/\[EN:[^\]]*\]/g,'')))unwrapped.push(node.textContent);}
 return {lang:document.documentElement.lang,overflow:Math.max(0,document.documentElement.scrollWidth-innerWidth),images:imgs.length,broken:imgs.filter(i=>!i.naturalWidth).map(i=>i.src),unwrapped,switch:[...document.querySelectorAll('.language-switch')].map(a=>({text:a.textContent,href:a.getAttribute('href'),lang:a.hreflang})),canonical:document.querySelector('[rel="canonical"]')?.href,robots:document.querySelector('meta[name="robots"]')?.content,tiles:document.querySelectorAll('.tile').length,placeholderCount:(document.body.textContent.match(/\[EN:/g)||[]).length};
 });result.views.push({file,width,status:response.status(),url:page.url(),...view});
 if(file==='v2/en/index.html'){
 await page.screenshot({path:'.codex-context/night-1030/qa/09-en-home-'+width+'.png',fullPage:true});
 for(const key of ['identity','packaging','web','ai','all']){await page.locator(`[data-filter="${key}"]`).click();result.filters.push(await page.evaluate(({width,key})=>({width,key,visible:[...document.querySelectorAll('.tile')].filter(e=>e.getClientRects().length).length,status:document.getElementById('filter-status').textContent,pressed:document.querySelector(`[data-filter="${key}"]`).getAttribute('aria-pressed')}),{width,key}));}
 await page.locator('.language-switch').click();await page.waitForURL('**/v2/index.html');await page.locator('.language-switch').click();await page.waitForURL('**/v2/en/index.html');result.switches.push({width,url:page.url()});
 }
 if(file==='v2/en/work/rawmid-style.html'&&width===375)await page.screenshot({path:'.codex-context/night-1030/qa/09-en-rawmid-375.png',fullPage:true});
 }
 }
 await page.goto('http://127.0.0.1:8765/v2/index.html');
 await page.locator('[data-filter="identity"]').click();
 result.ruStatus=await page.locator('#filter-status').textContent();
 await page.locator('[data-filter="all"]').click();
 result.ruAllStatus=await page.locator('#filter-status').textContent();
 return result;
}
