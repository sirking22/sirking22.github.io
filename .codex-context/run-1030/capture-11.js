async (page) => {
  await page.setViewportSize({width:1440,height:900});
  const results=[];
  for (const name of ['demo-fon-1-19-2026-10-26','demo-screen2-types-2026-10-26']) {
    await page.goto(`file:///Z:/Files/Codex%20new/career/pinkman/${name}.html`);
    await page.evaluate(()=>document.fonts.ready);
    await page.screenshot({path:`output/playwright/run-11/${name}.png`,fullPage:true});
    results.push({name,width:1440,height:900,title:await page.title()});
  }
  return results;
}
