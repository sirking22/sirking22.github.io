async (page) => {
  const base = 'http://127.0.0.1:8765';
  const paths = ["404.html","case-rawmid-style.html","drafts/rawmid-decision.html","en/404.html","en/case-rawmid-style.html","en/drafts/rawmid-decision.html","en/index.html","en/info.html","en/method.html","en/work/ai-pipeline.html","en/work/dyson-v15.html","en/work/early-identities.html","en/work/imya.html","en/work/karuna.html","en/work/kreslo-chitalka.html","en/work/notion-system.html","en/work/rawmid-app.html","en/work/rawmid-packaging.html","en/work/rawmid-style.html","en/work/rawmid-video.html","en/work/rebranding.html","en/work/scandic.html","index.html","info.html","method.html","work/ai-pipeline.html","work/dyson-v15.html","work/early-identities.html","work/imya.html","work/karuna.html","work/kreslo-chitalka.html","work/notion-system.html","work/rawmid-app.html","work/rawmid-packaging.html","work/rawmid-style.html","work/rawmid-video.html","work/rebranding.html","work/scandic.html"];
  // Routing disables the browser HTTP cache, so each pass reads the current files.
  await page.route('**/*', route => new URL(route.request().url()).hostname === '127.0.0.1' ? route.continue() : route.fulfill({status:204,body:''}));
  const width = page.viewportSize().width;
  const rows = [];
  let errors = [], failed = [];
  page.on('pageerror', e => errors.push(String(e)));
  page.on('console', m => {if (m.type() === 'error') errors.push(m.text());});
  page.on('response', r => {if(r.status() >= 400) failed.push({url:r.url(), status:r.status()});});
  page.on('requestfailed', r => {if(r.failure()?.errorText !== 'net::ERR_ABORTED') failed.push({url:r.url(), error:r.failure()?.errorText});});
  for (const path of paths) {
    errors = []; failed = [];
    await page.goto(`${base}/v2/${path}`, {waitUntil: 'load'});
    if (/case-rawmid-style|rawmid-packaging/.test(path)) await page.waitForURL('**/work/rawmid-style.html*');
    const result = await page.evaluate(async () => {
      const imgs = [...document.images];
      const images = await Promise.all(imgs.map(async im => {
        im.loading = 'eager';
        try {await im.decode(); return {src:im.currentSrc || im.src, ok:true};}
        catch {return {src:im.currentSrc || im.src, ok:false};}
      }));
      const videos = await Promise.all([...document.querySelectorAll('video')].map(async v => {
        const ok = await new Promise(resolve => {
          const timeout = setTimeout(() => resolve(false), 10000);
          v.addEventListener('loadeddata', () => {clearTimeout(timeout); resolve(true);}, {once:true});
          v.addEventListener('error', () => {clearTimeout(timeout); resolve(false);}, {once:true});
          v.preload = 'auto'; v.load();
        });
        let playback = false;
        if(ok) {v.muted = true; try {await v.play(); await new Promise(r => setTimeout(r, 120)); playback = v.currentTime > 0; v.pause();} catch {}}
        return {src:v.currentSrc || v.src, ok, playback, code:v.error?.code || null, dimensions:[v.videoWidth,v.videoHeight]};
      }));
      const posters = await Promise.all([...document.querySelectorAll('video[poster]')].map(async v => {
        const im = new Image(); im.src = v.poster;
        try {await im.decode(); return {src:v.poster,ok:true};} catch{return {src:v.poster,ok:false};}
      }));
      const overflow = Math.max(0, document.documentElement.scrollWidth - innerWidth);
      const offenders = overflow ? [...document.querySelectorAll('body *')].filter(e => {const r=e.getBoundingClientRect(); return r.width && (r.right>innerWidth+1 || r.left < -1);}).map(e => ({tag:e.tagName, cls:e.className, right:e.getBoundingClientRect().right, left:e.getBoundingClientRect().left})).slice(0,15) : [];
      const unsafeExternal = [...document.querySelectorAll('a[href]')].filter(a => /^https?:/.test(a.href) && new URL(a.href).origin !== location.origin && !a.relList.contains('noopener')).map(a => a.outerHTML);
      return {images, videos, posters, overflow, offenders, unsafeExternal, next:document.querySelector('nav.next a')?.getAttribute('href') || null};
    });
    let filters = [];
    if(path === 'index.html' || path === 'en/index.html') {
      const original = await page.locator('.tile').evaluateAll(ts => ts.map(t => ({href:t.getAttribute('href'), disciplines:t.dataset.disciplines.split(' ')})));
      const counter = await page.locator('[data-filter="all"] span').textContent();
      for(const filter of ['identity','packaging','web','ai','all']) {
        await page.locator(`button[data-filter="${filter}"]`).click();
        filters.push(await page.evaluate(({filter,original,counter}) => {
          const expected = original.filter(t => filter === 'all' || t.disciplines.includes(filter)).map(t => t.href).sort();
          const actual = [...document.querySelectorAll('.tile')].filter(t => !t.hidden && t.getClientRects().length).map(t => t.getAttribute('href')).sort();
          return {filter,expected:expected.length,actual:actual.length,match:JSON.stringify(expected)===JSON.stringify(actual),status:document.querySelector('#filter-status').textContent,counter:Number(counter),total:original.length,overflow:document.documentElement.scrollWidth-innerWidth,pressed:document.querySelector(`button[data-filter="${filter}"]`).getAttribute('aria-pressed')};
        }, {filter,original,counter}));
      }
      await page.screenshot({path:`.codex-context/night-1030/qa/10-${path.startsWith("en/")?"en":"ru"}-index-${width}.png`,fullPage:true});
    }
    rows.push({path,width,finalUrl:page.url(),...result,errors:[...errors],failed:[...failed],filters});
  }
  const links = await page.evaluate(async ({base,paths}) => {
    const checks = [], edges = {}, tilePaths = [];
    for(const path of paths) {
      const response = await fetch(`${base}/v2/${path}`);
      const doc = new DOMParser().parseFromString(await response.text(),'text/html');
      const source = `${base}/v2/${path}`;
      const next = doc.querySelector('nav.next a');
      if(next) edges[path] = new URL(next.getAttribute('href'),source).pathname.replace('/v2/','');
      if(path === 'index.html' || path === 'en/index.html') doc.querySelectorAll('.tile').forEach(t => tilePaths.push(new URL(t.getAttribute('href'),source).pathname.replace('/v2/','')));
      for(const a of doc.querySelectorAll('a[href]')) {
        const url = new URL(a.getAttribute('href'),source);
        if(url.origin !== base) continue;
        const res = await fetch(url);
        let anchor = true;
        if(url.hash) {const target=new DOMParser().parseFromString(await res.text(),'text/html'); anchor=!!target.getElementById(decodeURIComponent(url.hash.slice(1)));}
        checks.push({page:path,href:a.getAttribute('href'),status:res.status,anchor});
      }
    }
    const groups = [tilePaths.filter(p=>!p.startsWith('en/')), tilePaths.filter(p=>p.startsWith('en/'))]; const cycles=groups.map(group=>{let current=group[0]; const chain=[]; while(current&&!chain.includes(current)){chain.push(current);current=edges[current];}return {chain,end:current,exactCycle:chain.length===group.length&&current===group[0]&&group.every(p=>chain.includes(p))};}); let current = tilePaths[0]; const chain = [];
    while(current && !chain.includes(current)) {chain.push(current);current=edges[current];}
    return {checks,edges,tilePaths,cycles,chain,end:current,exactCycle:chain.length===tilePaths.length && current===tilePaths[0] && tilePaths.every(p=>chain.includes(p)),aliases:['work/rawmid-packaging.html → work/rawmid-style.html#packaging','case-rawmid-style.html → work/rawmid-style.html']};
  }, {base,paths});
  return {width,rows,links};
}
