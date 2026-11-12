import fs from 'fs';
const dir = new URL('.', import.meta.url);
let t = fs.readFileSync(new URL('dyson-v15.html', dir), 'utf8');
const title = "Arc'teryx · рекламный концепт · не заказ — Арсений Охотин";
t = t.replaceAll('Dyson V15 · рекламный концепт · не заказ — Арсений Охотин', title)
     .replaceAll('work/dyson-v15.html', 'work/arcteryx-winter.html');
const img = (n, w, h, alt) => `<img src="../assets/arcteryx/${n}.webp" width="${w}" height="${h}" loading="lazy" alt="Arc'teryx: ${alt}" decoding="async">`;
const main = `<main class="v3" id="niche">
  <header class="v3-head">
    <h1>Arc'teryx</h1>
    <p class="v3-meta">
      <span>2026</span>
      РЕКЛАМНЫЙ_КОНЦЕПТ
      <span>КРЕАТИВНЫЙ ДИРЕКТОР</span>
      КОНЦЕПТ,_НЕ_ЗАКАЗ
    </p>
  </header>

  <section class="v3-chapter" data-chapter>
    <p class="v3-label"><span>ARCTERYX_/_01</span><span></span></p>
    <div class="m1">
      <h2>Every winter is an expedition.</h2>
      <div class="copy"><p>Рекламный концепт для Arc'teryx. Куртку для гор покупатель носит в городе: ждёт автобус в 7:52, идёт пешком в офис. Кампания называет эту дорогу экспедицией. Герой в полном горном снаряжении стоит среди обычных прохожих, и снегопад, который им мешает, ему — нет.</p><p>Концепт вырос из 45 высказываний покупателей и тех, кто только выбирает куртку, на Reddit. Из них — гипотеза: если бренд сам даст горожанину оправдание носить горную куртку каждый день, больше людей добавят её в корзину. Кампанию проверяет A/B-тест на странице товара. Подробно — в главах 02 и 03.</p></div>
    </div>
    <style>.ax-facts{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:24px;margin:48px 0 56px}.ax-facts b{display:block;font:600 clamp(40px,6vw,72px)/1 var(--display,inherit)}.ax-facts span{display:block;margin-top:8px;font-size:14px;line-height:1.35}@media(max-width:700px){.ax-facts{grid-template-columns:repeat(2,minmax(0,1fr));gap:24px 16px}}</style>
    <div class="ax-facts">
      <p><b>+3%</b><span>цель по доле добавлений в корзину. Ориентир по кейсам New Look и CAMILLA (Contentsquare), не обещание</span></p>
      <p><b>45</b><span>высказываний покупателей с Reddit</span></p>
      <p><b>6</b><span>ситуаций выбора куртки</span></p>
      <p><b>6</b><span>носителей: щит, постер, ситилайт, сторис, сайт, рассылка</span></p>
    </div>
    <div class="mp">
      <figure>
        <img src="../assets/arcteryx/mockup-g1.webp" width="1920" height="1280" loading="lazy" alt="Arc'teryx: щит 3:1 на фасаде" decoding="async">
        <figcaption><b>ARCTERYX_/_01.1</b>Щит на фасаде в городе. Строка: «The commute is a crossing.»</figcaption>
    </figure>
      <figure>
        <img src="../assets/arcteryx/mockup-g6.webp" width="1280" height="1280" loading="lazy" alt="Arc'teryx: квадратный постер на остановке" decoding="async">
        <figcaption><b>ARCTERYX_/_01.1b</b>Квадратный постер на остановке. Строка: «He wants out. She’s ready.»</figcaption>
      </figure>
    </div>
    <div class="m3" data-n="3" style="--cell: 4 / 5">
      <figure><div class="cell"><img src="../assets/arcteryx/mockup-g2.webp" width="1200" height="1500" loading="lazy" alt="Arc'teryx: ситилайт на остановке" decoding="async"></div><figcaption><b>ARCTERYX_/_01.2</b>Ситилайт на остановке, рядом с теми, кто ждёт автобус. Строка: «The 7:52 is late. He’s fine.»</figcaption></figure>
      <figure><div class="cell"><img src="../assets/arcteryx/mockup-g3.webp" width="1080" height="1350" loading="lazy" alt="Arc'teryx: сторис в телефоне" decoding="async"></div><figcaption><b>ARCTERYX_/_01.3</b>Сторис в телефоне по дороге на работу, в окне просмотра с кнопкой Shop now. Строка: «He wants out. She’s ready.»</figcaption></figure>
      <figure><div class="cell"><img src="../assets/arcteryx/mockup-g5.webp" width="1080" height="1350" loading="lazy" alt="Arc'teryx: письмо рассылки в телефоне" decoding="async"></div><figcaption><b>ARCTERYX_/_01.4</b>Письмо рассылки в почте на телефоне, с баннером «The commute is a crossing.»</figcaption></figure>
    </div>
    <figure class="m4">
      <img src="../assets/arcteryx/mockup-g4.webp" width="1920" height="1280" loading="lazy" alt="Arc'teryx: главная магазина на ноутбуке" decoding="async">
      <figcaption><b>ARCTERYX_/_01.5</b>Главная интернет-магазина: в первом экране баннер «The 7:52 is late. He’s fine.», в плитках — кадры сюжетов. Сцены мокапов сгенерированы, макеты вставлены в них без изменений.</figcaption>
    </figure>
  </section>

  <section class="v3-chapter" data-chapter>
    <p class="v3-label"><span>ARCTERYX_/_02</span><span></span></p>
    <div class="m1">
      <h2>Куртка без гор</h2>
      <div class="copy"><p>Я собрал 45 высказываний покупателей Arc'teryx на Reddit. Сообщество само отговаривает горожан от покупки: «оно не стоит денег, если ты реально не пользуешься уличными функциями», «люди идут 1,2 км на пикник и думают, что им нужна куртка за 800 долларов». Один покупатель выбрал другую модель, хотя цвет ему нравился: он не понимал, когда будет её носить.</p><p>Другие пишут, что носят куртку каждый день: «стоит того, чтобы носить её каждый день», «стоит каждой копейки, ношу постоянно».</p><p>Бренд говорит только о функции и прямо боится городской моды. Вице-президент по дизайну Дэн Грин: «как только мы повернём к стритвиру, мы всё потеряем».</p><p><strong>Инсайт: горожанину нужно разрешение носить горную куртку каждый день.</strong> Кампания даёт его языком самого бренда: городская зима тоже экспедиция.</p><p>Правила системы: город в снегопад, герой в горном снаряжении среди обычных прохожих, строка — бытовая ситуация словами экспедиции, лозунг один на все носители.</p></div>
    </div>
  </section>

  <section class="v3-chapter" data-chapter>
    <p class="v3-label"><span>ARCTERYX_/_03</span><span></span></p>
    <div class="m1">
      <h2>Как проверить</h2>
      <div class="copy"><p>Тест: A/B блока на странице товара, кадр кампании против текущего блока. Метрика — <strong>доля добавлений в корзину</strong>. Защита: возвраты не растут, средний чек не падает за счёт ухода в дешёвые модели.</p><p>Ориентир — +3% к доле добавлений в корзину, по кейсам New Look и CAMILLA (Contentsquare). Это кейсы вендора без выборки, поэтому базу беру из аналитики магазина до старта, а чужой процент не обещаю.</p><p>Это гипотеза, тест не запускался. Концепт, не заказ: Arc'teryx к нему отношения не имеет.</p></div>
    </div>
  </section>

  <nav class="v3-next" aria-label="Соседние работы">
    <a href="dyson-v15.html">←_PREVIOUS<strong>Dyson V15</strong></a>
    <a href="rawmid-video.html">NEXT_→<strong>RAWMID · видео-визуал</strong></a>
  </nav>
</main>`;
t = t.replace(/<main class="v3" id="niche">[\s\S]*?<\/main>/, main)
     .replace('<b>DYSON V15</b>', "<b>ARC'TERYX</b>")
     .replace('<a href="rawmid-style.html">←_PREVIOUS</a>', '<a href="dyson-v15.html">←_PREVIOUS</a>')
     .replace('href="../en/work/dyson-v15.html"', 'href="../en/work/arcteryx-winter.html"');
fs.writeFileSync(new URL('arcteryx-winter.html', dir), t);
console.log('ok', t.length, (t.match(/dyson/gi)||[]).length + ' dyson mentions left');
