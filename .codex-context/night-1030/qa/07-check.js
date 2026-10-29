async (page) => {
  const pages=__PAGES__, rows=[], errors=[];
  page.on('pageerror',e=>errors.push(String(e)));
  page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
  for(const width of [1920,800,375]) {
    await page.setViewportSize({width,height:812});
    for(const path of pages) {
      errors.length=0;
      await page.goto('http://127.0.0.1:8765/'+path);
      if(path==='v2/case-rawmid-style.html')await page.waitForURL('**/work/rawmid-style.html');
      if(path==='v2/work/rawmid-packaging.html')await page.waitForURL('**/work/rawmid-style.html#packaging');
      await page.evaluate(()=>document.fonts.ready);
      const data=await page.evaluate(async()=>{
        const broken=[], attributes=[];
        for(const i of [...document.images].filter(i=>!i.src.includes('mc.yandex'))){i.loading='eager';try{await i.decode()}catch{broken.push(i.src)}if(!i.width||!i.height||i.decoding!=='async'||!i.alt)attributes.push(i.outerHTML);}
        const c=document.querySelector('.top a[href*="contact"]');
        return {overflow:document.documentElement.scrollWidth-innerWidth,broken,attributes,lang:document.documentElement.lang,canonical:document.querySelector('link[rel=canonical]')?.href,viewport:!!document.querySelector('meta[name=viewport]'),contactY:c?.getBoundingClientRect().top};
      });
      await page.keyboard.press('Tab');
      const focus=await page.evaluate(()=>({tag:document.activeElement.tagName,outline:getComputedStyle(document.activeElement).outlineStyle,width:getComputedStyle(document.activeElement).outlineWidth}));
      rows.push({path,width,...data,focus,errors:[...errors]});
      if(['v2/index.html','v2/404.html','v2/work/rawmid-style.html'].includes(path)&&width!==800)await page.screenshot({path:'.codex-context/night-1030/qa/07-'+path.replaceAll('/','-')+'-'+width+'.jpg',quality:85,fullPage:true});
    }
  }
  await page.goto('http://127.0.0.1:8765/v2/');
  const keyboard=[];
  for(let i=0;i<40;i++) {
    await page.keyboard.press('Tab');
    const f=await page.evaluate(()=>({tag:document.activeElement.tagName,filter:document.activeElement.dataset.filter,tile:document.activeElement.classList.contains('tile'),name:document.activeElement.getAttribute('aria-label'),outline:getComputedStyle(document.activeElement).outlineStyle}));
    if(f.filter||f.tile)keyboard.push(f);
  }
  const filters=[];
  for(const filter of ['identity','packaging','web','ai','all']) {
    await page.locator('button[data-filter="'+filter+'"]').focus();
    await page.keyboard.press(filter==='web'?'Space':'Enter');
    filters.push(await page.evaluate(()=>({pressed:[...document.querySelectorAll('[aria-pressed=true]')].map(b=>b.dataset.filter),count:document.querySelectorAll('.tile:not([hidden])').length,status:document.querySelector('#filter-status').textContent})));
  }
  // Exercise slides under both preferences and a preference change while running.
  await page.goto('http://127.0.0.1:8765/v2/');
  await page.emulateMedia({reducedMotion:'no-preference'});
  await page.waitForTimeout(100);
  await page.locator('.tile').first().hover();await page.waitForTimeout(850);
  const normal=await page.locator('.tile').first().evaluate(t=>[...t.querySelectorAll('.slide')].findIndex(i=>i.classList.contains('is-active')));
  await page.emulateMedia({reducedMotion:'reduce'});await page.waitForTimeout(850);
  const reduced=await page.locator('.tile').first().evaluate(t=>[...t.querySelectorAll('.slide')].findIndex(i=>i.classList.contains('is-active')));
  await page.goto('http://127.0.0.1:8765/v2/work/rawmid-video.html');
  const videos=await page.locator('video').evaluateAll(v=>v.map(i=>({paused:i.paused,loop:i.loop,autoplay:i.autoplay,controls:i.controls})));
  await page.emulateMedia({reducedMotion:'no-preference'});
  await page.waitForTimeout(100);
  const restored=await page.locator('video').evaluateAll(v=>v.map(i=>({paused:i.paused,loop:i.loop})));
  await page.locator('video').first().evaluate(v=>v.play());
  await page.emulateMedia({reducedMotion:'reduce'});await page.waitForTimeout(100);
  const changed=await page.locator('video').first().evaluate(v=>({paused:v.paused,loop:v.loop}));
  await page.locator('.top a[href*="contact"]').click();
  const contact=await page.locator('a[href^="mailto:"]').evaluateAll(links=>links.map(a=>({text:a.textContent,top:a.getBoundingClientRect().top,bottom:a.getBoundingClientRect().bottom})));
  return {rows,keyboard,filters,motion:{normal,reduced,videos,restored,changed},contact};
}
