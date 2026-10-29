async (page) => {
  const result = { method: 'Local Chromium; 30-second scan is an expert reading, not a recruiter study', views: [], cases: [] };
  const errors = [], blockedExternal = [];
  page.on('pageerror', e => errors.push(String(e)));
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  await page.route('**/*', route => {if(new URL(route.request().url()).hostname === '127.0.0.1') return route.continue(); blockedExternal.push(route.request().url()); return route.fulfill({status:204,body:''});});
  for (const width of [1440, 375]) {
    await page.setViewportSize({width, height: 812});
    const response = await page.goto('http://127.0.0.1:8765/v2/');
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({path: `.codex-context/night-1030/qa/08-home-${width}.png`});
    await page.screenshot({path: `.codex-context/night-1030/qa/08-home-${width}-full.png`, fullPage: true});
    const view = await page.evaluate(() => {
      const rect = e => {const r=e.getBoundingClientRect(); return {x:r.x,y:r.y,width:r.width,height:r.height,bottom:r.bottom,aboveFold:r.bottom<=innerHeight&&r.y>=0};};
      const item = e => ({text:e.innerText,href:e.getAttribute('href'),...rect(e)});
      return {width:innerWidth,height:innerHeight,overflow:document.documentElement.scrollWidth-innerWidth,
        firstScreen:[...document.querySelectorAll('.top,.statement h1,.brand-signature,.statement > p:not(.brand-signature),.work-filters')].map(e=>({selector:e.className||e.tagName,...item(e)})),
        tiles:[...document.querySelectorAll('.tile')].map(e=>({case:e.dataset.case,...item(e),year:e.querySelector('.work-year').innerText,role:e.querySelector('.work-practice').innerText})),
        contact:[...document.querySelectorAll('a')].filter(e=>/contact|mailto:|t.me/.test(e.getAttribute('href'))).map(item),
        images:[...document.images].filter(e=>!e.closest('noscript')).map(e=>({src:e.currentSrc,loaded:e.complete&&e.naturalWidth>0})),
        preview:[...document.querySelectorAll('meta[property^="og:"]')].map(e=>({property:e.getAttribute('property'),content:e.content})),
        navigation:performance.getEntriesByType('navigation').map(e=>({duration:e.duration,transferSize:e.transferSize})),
        transfer:performance.getEntriesByType('resource').reduce((sum,e)=>sum+e.transferSize,0)};
    });
    view.status=response.status();
    view.imageCheck=await page.evaluate(async()=>{const imgs=[...document.images].filter(e=>!e.closest('noscript'));for(const img of imgs){img.loading='eager';try{await img.decode();}catch{}}return {total:imgs.length,broken:imgs.filter(e=>!e.complete||!e.naturalWidth).map(e=>e.currentSrc)};});
    await page.screenshot({path: `.codex-context/night-1030/qa/08-home-${width}-full.png`, fullPage: true});
    const filters=[];
    for(const key of ['identity','packaging','web','ai','all']) {
      await page.locator(`[data-filter="${key}"]`).click();
      filters.push(await page.evaluate(key=>({key,pressed:document.querySelector(`[data-filter="${key}"]`).getAttribute('aria-pressed'),visible:[...document.querySelectorAll('.tile')].filter(e=>e.getClientRects().length).length,status:document.querySelector('#filter-status').innerText}),key));
    }
    view.filters=filters;
    await page.locator('.top a[href="info.html#contact"]').click();
    await page.waitForURL('**/info.html#contact');
    await page.locator('#contact a.contact-button').waitFor();
    await page.evaluate(() => document.fonts.ready);
    view.contactAfterClick=await page.evaluate(()=>({url:location.href,links:[...document.querySelectorAll('#contact a')].map(e=>({text:e.innerText,href:e.href,top:e.getBoundingClientRect().top,bottom:e.getBoundingClientRect().bottom}))}));
    await page.screenshot({path: `.codex-context/night-1030/qa/08-contact-${width}.png`});
    result.views.push(view);
  }
  for(const tile of result.views[0].tiles) {
    await page.goto('http://127.0.0.1:8765/v2/'+tile.href);
    result.cases.push(await page.evaluate(()=>({url:location.href,h1:document.querySelector('h1')?.innerText,chapters:[...document.querySelectorAll('.case-chapter')].map(e=>({id:e.id,text:e.innerText})),notes:document.querySelector('.case-notes')?.innerText||null,text:document.querySelector('main')?.innerText,contact:document.querySelector('.top a[href*="contact"]')?.getAttribute('href')})));
  }
  result.errors=errors;
  result.blockedExternal=[...new Set(blockedExternal)];
  return result;
}
