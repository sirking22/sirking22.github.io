async (page) => {
  await page.addInitScript(() => Object.defineProperty(navigator, 'webdriver', {get: () => true}));
  const base = 'http://127.0.0.1:8765';
  const paths = ['index.html', 'info.html', 'method.html', 'case-rawmid-style.html', ...['ai-pipeline', 'dyson-v15', 'early-identities', 'imya', 'karuna', 'kreslo-chitalka', 'notion-system', 'rawmid-app', 'rawmid-packaging', 'rawmid-style', 'rawmid-video', 'rebranding', 'scandic'].map(name => `work/${name}.html`)];
  const staticChecks = await page.evaluate(async ({base, paths}) => {
    const source = await (await fetch(`${base}/index.html`)).text();
    const parse = text => new DOMParser().parseFromString(text, 'text/html');
    const root = parse(source);
    const snippet = text => text.match(/<script>\s*window.METRIKA_ID[\s\S]*?<\/script>/)[0].replace(/\r\n/g, '\n');
    const unique = new Set();
    const results = [];
    for (const path of paths) {
      const response = await fetch(`${base}/v2/${path}`);
      const text = await response.text();
      const doc = parse(text);
      const get = selector => doc.querySelector(selector)?.content;
      const strings = [];
      doc.querySelectorAll('script, style, noscript').forEach(el => el.remove());
      const walker = doc.createTreeWalker(doc.body, NodeFilter.SHOW_TEXT);
      while (walker.nextNode()) {
        const value = walker.currentNode.textContent.replace(/\s+/g, ' ').trim();
        if (/[А-Яа-яЁё]/.test(value)) strings.push(value);
      }
      for (const el of doc.querySelectorAll('[alt], [aria-label], [title], title, meta[name="description"], meta[property="og:title"], meta[property="og:description"]')) {
        for (const value of [el.getAttribute('alt'), el.getAttribute('aria-label'), el.getAttribute('title'), el.tagName === 'TITLE' ? el.textContent : null, el.getAttribute('content')]) {
          if (value && /[А-Яа-яЁё]/.test(value)) strings.push(value.trim());
        }
      }
      strings.forEach(s => unique.add(s));
      const expectedUrl = `${base.replace(base, 'https://okhotin.site')}/v2/${path === 'index.html' ? '' : path}`;
      const checks = {
        status: response.status,
        exactCounterSnippet: snippet(text) === snippet(source),
        counterOccurrences: (text.match(/window.METRIKA_ID = 111837200;/g) || []).length,
        noscript: text.includes(root.querySelector('noscript').outerHTML),
        title: !!doc.title,
        description: get('meta[name="description"]') === root.querySelector('meta[name="description"]').content,
        ogDescription: get('meta[property="og:description"]') === root.querySelector('meta[property="og:description"]').content,
        ogTitle: get('meta[property="og:title"]') === doc.title,
        ogImage: get('meta[property="og:image"]') === 'https://okhotin.site/assets/og-preview-v4.jpg',
        ogUrl: get('meta[property="og:url"]') === expectedUrl,
        icons: [...doc.querySelectorAll('link[rel="icon"], link[rel="apple-touch-icon"]')].map(el => new URL(el.getAttribute('href'), `${base}/v2/${path}`).pathname),
        russianStringOccurrences: strings.length
      };
      results.push({path, ...checks});
    }
    return {pages: results, uniqueRussianStrings: unique.size, russianStringOccurrences: results.reduce((n, p) => n + p.russianStringOccurrences, 0)};
  }, {base, paths});
  for (const result of staticChecks.pages) {
    if (result.status !== 200 || result.counterOccurrences !== 1 || Object.values(result).includes(false)) throw new Error(JSON.stringify(result));
    if (JSON.stringify(result.icons) !== JSON.stringify(['/assets/icon-32.png', '/assets/icon-16.png', '/assets/icon-180.png'])) throw new Error(JSON.stringify(result));
  }
  const browserChecks = [];
  for (const path of ['?r=qa-tech', 'work/kreslo-chitalka.html?r=qa-tech']) {
    const errors = [], requests = [];
    const onError = error => errors.push(error.message);
    const onConsole = message => { if (message.type() === 'error') errors.push(message.text()); };
    const onRequest = request => { if (request.url().includes('mc.yandex.ru')) requests.push(request.url()); };
    page.on('pageerror', onError);
    page.on('console', onConsole);
    page.on('request', onRequest);
    await page.goto(`${base}/v2/${path}`);
    await page.waitForLoadState('networkidle');
    const state = await page.evaluate(() => ({counterId: window.METRIKA_ID, webdriver: navigator.webdriver, label: new URL(location.href).searchParams.get('r'), ymType: typeof window.ym}));
    browserChecks.push({path, errors, metrikaRequests: requests, ...state});
    page.off('pageerror', onError);
    page.off('console', onConsole);
    page.off('request', onRequest);
    if (errors.length || requests.length || state.counterId !== 111837200 || state.label !== 'qa-tech') throw new Error(JSON.stringify(browserChecks));
  }
  const resources = [];
  for (const path of ['/assets/og-preview-v4.jpg', '/assets/icon-32.png', '/assets/icon-16.png', '/assets/icon-180.png', '/assets/Arseniy-Okhotin-Creative-Director.pdf']) {
    const response = await page.request.get(`${base}${path}`);
    resources.push({path, status: response.status(), bytes: (await response.body()).length});
    if (!response.ok()) throw new Error(JSON.stringify(resources));
  }
  return {staticChecks, browserChecks, resources};
}
