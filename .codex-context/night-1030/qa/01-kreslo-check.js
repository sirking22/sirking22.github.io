async (page) => {
  const results = [];
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  for (const width of [1920, 800, 375]) {
    await page.setViewportSize({ width, height: 1080 });
    for (const name of ['index', 'kreslo-chitalka', 'imya', 'early-identities']) {
      const route = name === 'index' ? '/v2/' : `/v2/work/${name}.html`;
      await page.goto(`http://127.0.0.1:8765${route}`);
      await page.locator('img').evaluateAll(async imgs => {
        await Promise.all(imgs.map(img => {
          img.loading = 'eager';
          return img.decode().catch(() => {});
        }));
      });
      await page.evaluate(() => document.fonts.ready);
      const state = await page.evaluate(() => ({
        images: document.images.length,
        broken: [...document.images].filter(img => !img.complete || !img.naturalWidth).map(img => img.getAttribute('src')),
        overflow: Math.max(0, document.documentElement.scrollWidth - innerWidth),
        numbers: [...document.querySelectorAll('.work-number')].map(el => el.textContent),
        counter: document.querySelector('[data-filter=all]')?.textContent,
        slides: document.querySelector('[data-case=early-identities]')?.querySelectorAll('.slide').length,
        dots: document.querySelector('[data-case=early-identities]')?.querySelectorAll('.dots i').length,
        next: document.querySelector('.next a')?.getAttribute('href'),
        frames: [...document.querySelectorAll('.frames img')].map(img => img.getAttribute('src')),
        placeholders: document.querySelectorAll('.case-notes section').length,
      }));
      if (state.broken.length || state.overflow) throw new Error(JSON.stringify({width, name, state}));
      await page.screenshot({ path: `.codex-context/night-1030/qa/01-${name}-${width}.png`, fullPage: true });
      const filters = [];
      if (name === 'index') {
        if (state.numbers.join(',') !== '01,02,03,04,05,06,07,08,09,10,11,12' || state.counter.trim() !== 'Все 12' || state.slides !== 3 || state.dots !== 3) throw new Error('Grid mismatch');
        for (const [filter, count] of [['identity',5],['packaging',2],['web',2],['ai',4],['all',12]]) {
          await page.locator(`button[data-filter=${filter}]`).click();
          const check = await page.evaluate(() => ({
            visible: [...document.querySelectorAll('.tile')].filter(el => !el.hidden).length,
            cases: [...document.querySelectorAll('.tile')].filter(el => !el.hidden).map(el => el.dataset.case),
            status: document.querySelector('#filter-status').textContent,
            overflow: Math.max(0, document.documentElement.scrollWidth - innerWidth),
            pressed: document.querySelector('button[aria-pressed=true]').dataset.filter,
          }));
          if (check.visible !== count || check.status !== `Работ: ${count}` || check.overflow || check.pressed !== filter) throw new Error(JSON.stringify({width, filter, check}));
          filters.push({filter, ...check});
        }
      }
      results.push({width, page:name, ...state, filters});
    }
  }
  if (errors.length) throw new Error(JSON.stringify(errors));
  return {results, errors};
}
