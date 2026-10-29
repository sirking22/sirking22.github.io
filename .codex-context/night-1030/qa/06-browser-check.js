async (page) => {
  const rows=[], errors=[];
  page.on('pageerror',e=>errors.push(String(e)));
  for(const width of [1920,800,375]) {
    errors.length=0;
    await page.setViewportSize({width,height:1080});
    await page.goto('http://127.0.0.1:8765/v2/drafts/rawmid-decision.html');
    await page.evaluate(()=>document.fonts.ready);
    const result=await page.evaluate(async()=>{
      const imgs=[...document.images].filter(i=>!i.src.includes('mc.yandex.ru'));
      const broken=[];
      for(const i of imgs){i.loading='eager';try{await i.decode()}catch{broken.push(i.src)}}
      return {overflow:Math.max(0,document.documentElement.scrollWidth-innerWidth),images:imgs.length,broken,robots:document.querySelector('meta[name=robots]').content,headings:[...document.querySelectorAll('main h2')].map(h=>h.textContent)};
    });
    await page.screenshot({path:'.codex-context/night-1030/qa/06-rawmid-decision-'+width+'.png',fullPage:true});
    rows.push({width,...result,errors:[...errors]});
  }
  return rows;
}
