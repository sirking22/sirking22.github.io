async (page) => {
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.goto('http://127.0.0.1:8765/v2/work/rawmid-video.html');
  const read=()=>page.locator('video').evaluateAll(v=>v.map(i=>({paused:i.paused,loop:i.loop,autoplay:i.autoplay,controls:i.controls})));
  const initial=await read();
  await page.emulateMedia({reducedMotion:'no-preference'});await page.waitForTimeout(150);
  const restored=await read();
  await page.locator('video').first().evaluate(v=>v.play());
  await page.emulateMedia({reducedMotion:'reduce'});await page.waitForTimeout(150);
  const changed=await read();
  await page.goto('http://127.0.0.1:8765/v2/');
  await page.locator('.tile').nth(2).hover();await page.waitForTimeout(850);
  const tiles=await page.locator('.tile video').evaluateAll(v=>v.map(i=>({paused:i.paused,autoplay:i.autoplay})));
  return {initial,restored,changed,tiles};
}
