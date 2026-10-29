async (page) => {
  const pages = __PAGES__;
  const rows=[];
  const cdp=await page.context().newCDPSession(page);
  await cdp.send('Network.enable'); await cdp.send('Network.setCacheDisabled',{cacheDisabled:true});
  for(const path of pages) {
    await page.setViewportSize({width:375,height:812});
    await page.goto('http://127.0.0.1:8765/'+path);
    if(path==='v2/case-rawmid-style.html') await page.waitForURL('**/work/rawmid-style.html');
    if(path==='v2/work/rawmid-packaging.html') await page.waitForURL('**/work/rawmid-style.html#packaging');
    await page.evaluate(()=>document.fonts.ready);
    await page.waitForTimeout(150);
    const initial=await page.evaluate(()=>performance.getEntriesByType('navigation').concat(performance.getEntriesByType('resource')).filter(r=>r.name.startsWith(location.origin)).reduce((s,r)=>s+r.transferSize,0));
    const data=await page.evaluate(async()=>{
      const images=[...document.images].filter(i=>!i.src.includes('mc.yandex'));
      const broken=[];
      for(const i of images){i.loading='eager';try{await i.decode()}catch{broken.push(i.src)}}
      await new Promise(r=>setTimeout(r,100));
      const entries=performance.getEntriesByType('navigation').concat(performance.getEntriesByType('resource')).filter(r=>r.name.startsWith(location.origin));
      const imageEntries=entries.filter(r=>/\.(webp|png|jpg)(\?|$)/.test(r.name));
      const largest=imageEntries.sort((a,b)=>b.encodedBodySize-a.encodedBodySize)[0];
      const contact=document.querySelector('.top a[href*="contact"], .top a[href*="t.me"]');
      return {total:entries.reduce((s,r)=>s+r.transferSize,0),largest:largest?{path:new URL(largest.name).pathname,bytes:largest.encodedBodySize}:null,broken,overflow:document.documentElement.scrollWidth-innerWidth,contact:contact?{text:contact.textContent,y:contact.getBoundingClientRect().top,href:contact.getAttribute('href')}:null};
    });
    rows.push({path,landed:new URL(page.url()).pathname,initial,...data});
  }
  return rows;
}
