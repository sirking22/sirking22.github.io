async (page) => {
  const report={layouts:[],errors:[],responses:[],links:[],filters:[]};
  page.on('pageerror',e=>report.errors.push(e.message));
  page.on('console',m=>{if(m.type()==='error')report.errors.push(m.text());});
  page.on('response',r=>{if(r.status()>=400)report.responses.push({url:r.url(),status:r.status()});});
  for (const width of [1920,1440,800,375]) {
    await page.setViewportSize({width,height:900});
    for (const path of ['index.html','work/ai-pipeline.html']) {
      await page.goto('http://127.0.0.1:8771/v2/'+path);
      await page.evaluate(async()=>{await document.fonts.ready;await Promise.all([...document.images].map(i=>{i.loading='eager';return i.decode().catch(()=>{});}));});
      report.layouts.push({path,width,...await page.evaluate(()=>({scrollWidth:document.documentElement.scrollWidth,broken:[...document.images].filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src),tiles:document.querySelectorAll('.tile').length,chapters:document.querySelectorAll('.case-chapter').length,aiTiles:document.querySelectorAll('[data-case="ai-pipeline"] img').length}))});
      await page.screenshot({path:`output/playwright/run-11/${path.replaceAll('/','-').replace('.html','')}-${width}.png`,fullPage:true});
    }
  }
  const links=await page.locator('a[href]').evaluateAll(as=>as.map(a=>a.href).filter(h=>h.startsWith(location.origin)));
  for(const url of [...new Set(links)]){const r=await page.request.get(url);report.links.push({url,status:r.status()});}
  await page.goto('http://127.0.0.1:8771/v2/index.html');
  for(const filter of ['ai','all']) {
    await page.locator(`button[data-filter="${filter}"]`).click();
    report.filters.push({filter,visible:await page.locator('.tile:visible').count(),aiVisible:await page.locator('[data-case="ai-pipeline"]').isVisible(),pressed:await page.locator(`button[data-filter="${filter}"]`).getAttribute('aria-pressed')});
  }
  await page.locator('[data-case="ai-pipeline"]').click();
  report.tileTarget=page.url();
  await page.locator('.related-work a').click();
  report.dysonTarget=page.url();
  await page.goto('http://127.0.0.1:8771/v2/work/ai-pipeline.html');
  await page.locator('.next a').click(); report.nextTarget=page.url();
  await page.goto('http://127.0.0.1:8771/v2/work/ai-pipeline.html');
  await page.evaluate(r=>{const pre=document.createElement('pre');pre.id='qa-result';pre.textContent=JSON.stringify(r,null,2);document.body.appendChild(pre);},report);
  return report;
}
