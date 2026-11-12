// Страница концепта Airbnb (11.11.2026). Оболочка — arcteryx-winter.html,
// заменяются заголовки, хлебные крошки и <main>. Кадры — career/concept-airbnb/candidates
// (t2 офисы, g2 угол, t1 ключ), выбор владельца 11.11 в decisions/DECISIONS.md.
// Запуск: node work/_build-airbnb.mjs
import fs from 'fs';
const dir = new URL('.', import.meta.url);
let t = fs.readFileSync(new URL('arcteryx-winter.html', dir), 'utf8');
const oldTitle = "Arc'teryx · рекламный концепт · не заказ — Арсений Охотин";
const title = 'Airbnb · рекламный концепт · не заказ — Арсений Охотин';
const img = (n, w, h, alt) => `<img src="../assets/airbnb/airbnb-${n}.webp" width="${w}" height="${h}" loading="lazy" alt="Airbnb: ${alt}" decoding="async">`;
const cell = (n, w, h, alt, num, cap) => `<figure><div class="cell">${img(n, w, h, alt)}</div><figcaption><b>AIRBNB_/_${num}</b>${cap}</figcaption></figure>`;
const main = `<main class="v3" id="niche">
  <header class="v3-head">
    <h1>Airbnb</h1>
    <p class="v3-meta">
      <span>2026</span>
      РЕКЛАМНЫЙ_КОНЦЕПТ
      <span>КРЕАТИВНЫЙ ДИРЕКТОР</span>
      КОНЦЕПТ,_НЕ_ЗАКАЗ
    </p>
  </header>

  <section class="v3-chapter" data-chapter>
    <p class="v3-label"><span>AIRBNB_/_01</span><span></span></p>
    <div class="m1">
      <h2>Give it a month.</h2>
      <div class="copy"><p>Рекламный концепт для Airbnb. У Airbnb есть жильё на месяц и дольше, но его знают как жильё на отпуск. Месяц в чужой квартире пугает: будет ли где работать, станет ли место своим. Кампания показывает месяц как базу: офис с видом на город, угол, который за четыре недели обживается, и запасной ключ.</p><p>Первый сюжет — офис на месяц. Один баннер на город: стол, кресло и монитор стоят у окна с видом, который есть только здесь. Людей в кадре нет, место ждёт того, кто приедет.</p></div>
    </div>
    <style>.ax-facts{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:24px;margin:48px 0 56px}.ax-facts b{display:block;font:600 clamp(40px,6vw,72px)/1 var(--display,inherit)}.ax-facts span{display:block;margin-top:8px;font-size:14px;line-height:1.35}@media(max-width:700px){.ax-facts{grid-template-columns:repeat(2,minmax(0,1fr));gap:24px 16px}}</style>
    <div class="ax-facts">
      <p><b>18%</b><span>ночей на Airbnb — брони от 28 ночей, I квартал 2023. В конце 2021 года доля была выше</span></p>
      <p><b>28+</b><span>ночей — бронирование, на которое работает кампания</span></p>
      <p><b>3</b><span>сюжета: офис, угол, ключ</span></p>
      <p><b>4</b><span>города в серии офисов: Кейптаун, Мехико, Копенгаген, Лиссабон</span></p>
    </div>
    <style>@media (min-width:900px){.mp.mp-ab{grid-template-columns:15fr 8fr}}</style>
    <div class="mp mp-ab">
      <figure>
        <img src="../assets/airbnb/mockup-m1.webp" width="1536" height="1024" loading="lazy" alt="Airbnb: ситилайт на остановке в Лиссабоне" decoding="async">
        <figcaption><b>AIRBNB_/_01.1</b>Ситилайт на остановке в Лиссабоне, рядом с теми, кто приехал с чемоданом. Строка: «Your office this month.»</figcaption>
      </figure>
      <figure>
        <img src="../assets/airbnb/mockup-m3.webp" width="1122" height="1402" loading="lazy" alt="Airbnb: пост в ленте на телефоне" decoding="async">
        <figcaption><b>AIRBNB_/_01.1b</b>Пост в ленте. Строка: «Give it a month.»</figcaption>
      </figure>
    </div>
    <div class="m3" data-n="3" style="--cell: 3 / 2">
      <figure><div class="cell"><img src="../assets/airbnb/mockup-m2.webp" width="1536" height="1024" loading="lazy" alt="Airbnb: экран в зале прилёта" decoding="async"></div><figcaption><b>AIRBNB_/_01.2</b>Экран в зале прилёта, Копенгаген. Офис на месяц встречает на выходе из аэропорта.</figcaption></figure>
      <figure><div class="cell"><img src="../assets/airbnb/mockup-m4.webp" width="1536" height="1024" loading="lazy" alt="Airbnb: постер в переходе метро" decoding="async"></div><figcaption><b>AIRBNB_/_01.3</b>Постер в переходе метро. Строка: «Your wall.»</figcaption></figure>
      <figure><div class="cell"><img src="../assets/airbnb/mockup-m6.webp" width="1536" height="1024" loading="lazy" alt="Airbnb: бумажный постер на стене в Мехико" decoding="async"></div><figcaption><b>AIRBNB_/_01.4</b>Бумажный постер на стене в Мехико. Строка: «Stay long enough for a spare key.»</figcaption></figure>
    </div>
    <figure class="m4">
      <img src="../assets/airbnb/mockup-m5.webp" width="1536" height="849" loading="lazy" alt="Airbnb: постер на платформе метро" decoding="async">
      <figcaption><b>AIRBNB_/_01.5</b>Постер на платформе метро. Строка: «A month adds up.» Сцены мокапов сгенерированы по готовым баннерам. Текст на щитах сверен с макетами, знак заменён на точный.</figcaption>
    </figure>
    <div class="m3" data-n="4" style="--cell: 4 / 5">
      ${cell('o-k4', 880, 1100, 'рабочее место с видом на Кейптаун', '01.1', 'Кейптаун. Стол у окна, за ним гора.')}
      ${cell('o-k2', 880, 1100, 'рабочее место с видом на Мехико', '01.2', 'Мехико. Стол у окна над городом.')}
      ${cell('o-l2', 880, 1100, 'рабочее место с видом на Копенгаген', '01.3', 'Копенгаген. Стол у окна над крышами.')}
      ${cell('o-k1', 880, 1100, 'рабочее место с видом на Лиссабон', '01.4', 'Лиссабон. Стол у окна, за ним река.')}
    </div>
  </section>

  <section class="v3-chapter" data-chapter>
    <p class="v3-label"><span>AIRBNB_/_02</span><span></span></p>
    <div class="m1">
      <h2>Угол за четыре недели</h2>
      <div class="copy"><p>Второй сюжет — один и тот же угол квартиры в четырёх кадрах, с первой недели по четвёртую. Каждую неделю в нём прибавляется что-то своё: растения, открытки, вещи. К концу месяца чужая квартира выглядит обжитой.</p></div>
    </div>
    <div class="m3" data-n="3" style="--cell: 1 / 1">
      ${cell('a1', 880, 1100, 'угол квартиры за четыре недели', '02.1', 'Баннер 4:5 для ленты. Строка: «Give it a month.»')}
      ${cell('b1', 1080, 1080, 'стена от пустой к обжитой', '02.2', 'Квадрат. Строка: «Your wall.»')}
      ${cell('b2', 1080, 1080, 'стол с растениями по неделям', '02.3', 'Квадрат. Строка: «Your table.»')}
    </div>
  </section>

  <section class="v3-chapter" data-chapter>
    <p class="v3-label"><span>AIRBNB_/_03</span><span></span></p>
    <div class="m1">
      <h2>Запасной ключ</h2>
      <div class="copy"><p>Третий сюжет — связка ключей. Запасной ключ дают тем, кто живёт, а не гостит. Каждую неделю на связке прибавляется местный брелок.</p></div>
    </div>
    <div class="m3" data-n="2" style="--cell: 1 / 1">
      ${cell('k-g4', 1080, 1080, 'связка ключей с местными брелоками', '03.1', 'Строка: «Stay long enough for a spare key.»')}
      ${cell('k-h3', 1080, 1080, 'четыре связки, по неделе на каждую', '03.2', 'Строка: «Every week, a little more local.»')}
    </div>
    <figure class="m4">
      ${img('k-h1', 1363, 1100, 'брелоки месяца')}
      <figcaption><b>AIRBNB_/_03.3</b>Строка: «A month adds up.» Кадры сгенерированы, текст и знак поставлены отдельным слоем.</figcaption>
    </figure>
  </section>

  <section class="v3-chapter" data-chapter>
    <p class="v3-label"><span>AIRBNB_/_04</span><span></span></p>
    <div class="m1">
      <h2>Как проверить</h2>
      <div class="copy"><p>Гипотеза: если показать месяц как обжитую базу, больше людей из кампании перейдут к жилью на месяц и забронируют от 28 ночей. Метрика — доля таких бронирований среди переходов из кампании. Тест не запускался, это концепт.</p><p>Speculative concept. Not affiliated with or endorsed by Airbnb.</p></div>
    </div>
  </section>

  <nav class="v3-next" aria-label="Соседние работы">
    <a href="arcteryx-winter.html">←_PREVIOUS<strong>Arc'teryx</strong></a>
    <a href="rawmid-video.html">NEXT_→<strong>RAWMID · видео-визуал</strong></a>
  </nav>
</main>`;
t = t.replace(/<main class="v3" id="niche">[\s\S]*?<\/main>/, main)
     .replaceAll(oldTitle, title)
     .replaceAll('work/arcteryx-winter.html', 'work/airbnb-month.html')
     .replace("<b>ARC'TERYX</b>", '<b>AIRBNB</b>')
     .replace(/<link rel="alternate" hreflang="en"[^>]*>\n?/, '')
     .replace('href="../en/work/airbnb-month.html"', 'href="../en/"');
fs.writeFileSync(new URL('airbnb-month.html', dir), t);
console.log('ok', t.length, (t.match(/arc.?teryx/gi) || []).length + " arcteryx mentions left");

await import('./_fit-figures.mjs?' + Date.now()); // 12.11: рамки m4/m5 под кадр
