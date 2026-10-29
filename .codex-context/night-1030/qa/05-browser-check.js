async (page) => {
  const paths = ['index.html','info.html','method.html',...['ai-pipeline','dyson-v15','early-identities','imya','karuna','kreslo-chitalka','notion-system','rawmid-app','rawmid-style','rawmid-video','rebranding','scandic'].map(n=>'work/'+n+'.html')];
  const rows=[];
  const errors=[];
  page.on('pageerror', e=>errors.push(String(e)));
  for(const width of [1920,800,375]) {
    await page.setViewportSize({width,height:1080});
    for(const path of paths) {
      errors.length=0;
      await page.goto('http://127.0.0.1:8765/v2/'+path);
      await page.evaluate(()=>document.fonts.ready);
      const data=await page.evaluate(async()=>{
        const imgs=[...document.images].filter(i=>!i.src.includes('mc.yandex.ru'));
        const broken=[];
        for(const im of imgs){ im.loading='eager';try{await im.decode();}catch{broken.push(im.getAttribute('src'));} }
        return {overflow:Math.max(0,document.documentElement.scrollWidth-innerWidth),broken,
          facts:document.querySelector('.case-heading p')?.textContent,
          tileCount:document.querySelectorAll('.tile').length,
          counter:document.querySelector('[data-filter="all"] span')?.textContent};
      });
      rows.push({path,width,...data,errors:[...errors]});
      if(path==='index.html'||path==='work/notion-system.html') await page.screenshot({path:'.codex-context/night-1030/qa/05-'+path.replace('work/','').replace('.html','')+'-'+width+'.png',fullPage:true});
    }
  }
  return rows;
}
