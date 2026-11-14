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
const RZ = [['3x1', 3], ['4x1', 4], ['16x9', 16 / 9], ['1x1', 1], ['4x5', .8], ['2x3', 2 / 3], ['9x16', 9 / 16]];
const rzRow = (k, name) => `<div class="ax-rz-row"><b>${name}</b><div class="ax-rz-strip">${RZ.map(([f, r]) => `<img src="../assets/airbnb/airbnb-rz-${k}-${f}.webp" width="${Math.round(360 * r)}" height="360" loading="lazy" alt="Airbnb: ${name.toLowerCase()}, формат ${f.replace('x', ':')}" decoding="async" style="--r:${r.toFixed(3)}">`).join('')}</div></div>`;
// 14.11: карта ресайзов — три сюжета по семь форматов, самые готовые баннеры (владелец: «какие самые готовые, и больше не нужно»)
const rzMap = `<style>.ax-rz{margin:64px 0 0}.ax-rz-h,.ax-rz-row b{display:block;font:400 12px/1.4 var(--mono);text-transform:uppercase;letter-spacing:.02em}.ax-rz-row{margin-top:20px}.ax-rz-row b{margin-bottom:8px}.ax-rz-strip{display:flex;gap:6px;align-items:flex-start}.ax-rz-strip img{flex:var(--r) 1 0;min-width:0;width:0;height:auto}.ax-rz-f{margin-top:16px;font-size:14px;line-height:1.4}@media(max-width:700px){.ax-rz-strip{overflow-x:auto;scrollbar-width:none}.ax-rz-strip img{flex:none;width:auto;height:140px}}</style>
    <div class="ax-rz" role="group" aria-label="Карта ресайзов">
      <p class="ax-rz-h">Карта ресайзов · 7 форматов на сюжет</p>
      ${rzRow('office', 'Офис')}
      ${rzRow('room', 'Комната')}
      ${rzRow('key', 'Ключ')}
      <p class="ax-rz-f">3:1 · 4:1 · 16:9 · 1:1 · 4:5 · 2:3 · 9:16 — от билборда до сторис. Заголовок, подпись и знак в каждом формате ставит один скрипт, по одним правилам отступов.</p>
    </div>`;
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
      <h2>Месяц как база, а не отпуск</h2>
      <div class="copy"><p>Рекламный концепт для Airbnb. Гипотеза: если показать месяц в чужом городе как обжитую базу, больше людей забронируют жильё от 28 ночей. Сейчас Airbnb знают как жильё на отпуск, а месяц в чужой квартире пугает: будет ли где работать, станет ли место своим.</p><p>Кампания отвечает тремя сюжетами: офис с видом на город, комната, которая за месяц становится своей, и запасной ключ. Ниже — мокапы на носителях и карта ресайзов: каждый сюжет разложен на семь стандартных форматов.</p></div>
    </div>
    <style>.ax-facts{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:24px;margin:48px 0 56px}.ax-facts b{display:block;font:600 clamp(40px,6vw,72px)/1 var(--display,inherit)}.ax-facts span{display:block;margin-top:8px;font-size:14px;line-height:1.35}@media(max-width:700px){.ax-facts{grid-template-columns:repeat(2,minmax(0,1fr));gap:24px 16px}}</style>
    <div class="ax-facts">
      <p><b>+20%</b><span>к доле броней от 28 ночей среди переходов из кампании против обычной рекламы — порог теста. Гипотеза, тест не запускался</span></p>
      <p><b>18%</b><span>ночей на Airbnb — проживания от 28 дней, III квартал 2023, письмо компании акционерам</span></p>
      <p><b>3</b><span>сюжета: офис, комната, ключ</span></p>
      <p><b>×3</b><span>меньше картинок в работе, чем у Arc'teryx: около 130 против 380. Маршрут собран по опыту двух прошлых концептов</span></p>
    </div>
    <figure class="m4">
      <img src="../assets/airbnb/mockup-n1.webp" width="1536" height="1024" loading="lazy" alt="Airbnb: билборд над улицей в Лиссабоне" decoding="async">
      <figcaption><b>AIRBNB_/_01.1</b>Билборд над улицей в Лиссабоне. Строка: «Give it a month.»</figcaption>
    </figure>
    <div class="m3" data-n="3" style="--cell: 3 / 2">
      <figure><div class="cell"><img src="../assets/airbnb/mockup-n2.webp" width="1536" height="1024" loading="lazy" alt="Airbnb: билборд на стене дома в Кейптауне" decoding="async"></div><figcaption><b>AIRBNB_/_01.2</b>Билборд на стене дома в Кейптауне, за крышами Столовая гора. Строка: «Your office this month.»</figcaption></figure>
      <figure><div class="cell"><img src="../assets/airbnb/mockup-n5.webp" width="1536" height="1024" loading="lazy" alt="Airbnb: печатная панель на станции метро" decoding="async"></div><figcaption><b>AIRBNB_/_01.3</b>Печатная панель на станции метро. Строка: «Give it a month.»</figcaption></figure>
      <figure><div class="cell"><img src="../assets/airbnb/mockup-n6.webp" width="1536" height="1024" loading="lazy" alt="Airbnb: ситилайт на остановке в Мехико" decoding="async"></div><figcaption><b>AIRBNB_/_01.4</b>Ситилайт на остановке в Мехико. Строка: «Your office this month.»</figcaption></figure>
    </div>
    <div class="m3" data-n="4" style="--cell: 4 / 5">
      <figure><div class="cell"><img src="../assets/airbnb/mockup-n3.webp" width="1122" height="1402" loading="lazy" alt="Airbnb: постер на кирпичном фасаде в Копенгагене" decoding="async"></div><figcaption><b>AIRBNB_/_01.5</b>Постер на кирпичном фасаде в Копенгагене. Строка: «Give it a month.»</figcaption></figure>
      <figure><div class="cell"><img src="../assets/airbnb/mockup-n4.webp" width="1122" height="1402" loading="lazy" alt="Airbnb: экран со связкой ключей в торговом центре" decoding="async"></div><figcaption><b>AIRBNB_/_01.6</b>Экран со связкой ключей в торговом центре. Строка: «Give it a month.»</figcaption></figure>
      <figure><div class="cell"><img src="../assets/airbnb/mockup-n7.webp" width="1122" height="1402" loading="lazy" alt="Airbnb: пост в ленте Инстаграма" decoding="async"></div><figcaption><b>AIRBNB_/_01.7</b>Пост в ленте Инстаграма. Строка: «Give it a month.»</figcaption></figure>
      <figure><div class="cell"><img src="../assets/airbnb/mockup-n8.webp" width="1122" height="1402" loading="lazy" alt="Airbnb: сторис в Инстаграме" decoding="async"></div><figcaption><b>AIRBNB_/_01.8</b>Сторис в Инстаграме. Строка: «Give it a month.»</figcaption></figure>
    </div>
    <div class="m3" data-n="2" style="--cell: 3 / 2">
      <figure><div class="cell"><img src="../assets/airbnb/mockup-n9.webp" width="1536" height="1024" loading="lazy" alt="Airbnb: письмо в почте на ноутбуке" decoding="async"></div><figcaption><b>AIRBNB_/_01.9</b>Письмо в почте на ноутбуке. Строка: «Your office this month.»</figcaption></figure>
      <figure><div class="cell"><img src="../assets/airbnb/mockup-n10.webp" width="1536" height="1024" loading="lazy" alt="Airbnb: главная страница Airbnb на мониторе" decoding="async"></div><figcaption><b>AIRBNB_/_01.10</b>Главная страница Airbnb на мониторе. Строка: «Give it a month.» Сцены мокапов сгенерированы по готовым баннерам.</figcaption></figure>
    </div>
    ${rzMap}
  </section>

  <section class="v3-chapter" data-chapter>
    <p class="v3-label"><span>AIRBNB_/_02</span><span></span></p>
    <div class="m1">
      <h2>Чего боятся на месяц</h2>
      <div class="copy"><p>Идея выросла из жалоб на Reddit: за месяц в чужой квартире многое может сломаться. Хозяин отменяет бронь, в квартире нет wifi, пропадает свет. Кампания отвечает на этот страх картинкой: за четыре недели квартира становится своей.</p></div>
    </div>
    <style>.ax-plan{list-style:none;margin:40px 0 0;padding:20px 0 0;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:24px 32px;border-top:1px solid var(--line)}.ax-plan.ax-q{grid-template-columns:repeat(3,minmax(0,1fr))}.ax-plan b{display:block;margin-bottom:8px;font:400 12px/1.4 var(--mono);text-transform:uppercase;letter-spacing:.02em}.ax-plan span{display:block;font-size:16px;line-height:1.4;text-wrap:pretty}@media(max-width:700px){.ax-plan,.ax-plan.ax-q{grid-template-columns:minmax(0,1fr)}}</style>
    <ul class="ax-plan ax-q" aria-label="Голос аудитории">
      <li><b>r/AirBnB, декабрь 2025</b><span>«Host cancelled my one month stay seven months after booking with no explanation.»</span></li>
      <li><b>r/AirBnB, май 2025</b><span>«There will be no wifi at our airbnb»</span></li>
      <li><b>Freaking Nomads, март 2026</b><span>«the electricity kept cutting out»</span></li>
    </ul>
  </section>

  <section class="v3-chapter" data-chapter>
    <p class="v3-label"><span>AIRBNB_/_03</span><span></span></p>
    <div class="m1">
      <h2>Офис на месяц</h2>
      <div class="copy"><p>Первый сюжет — офис на месяц. Один баннер на город: стол, кресло и ноутбук стоят у окна с видом, который есть только здесь. Людей в кадре нет, место ждёт того, кто приедет. Строка: «Your office this month.»</p></div>
    </div>
    <div class="m3" data-n="4" style="--cell: 4 / 5">
      ${cell('office-capetown', 880, 1100, 'офис на месяц в Кейптауне', '03.1', 'Кейптаун, за окном Столовая гора.')}
      ${cell('office-lisbon', 880, 1100, 'офис на месяц в Лиссабоне', '03.2', 'Лиссабон, за окном мост и река.')}
      ${cell('office-copenhagen', 880, 1100, 'офис на месяц в Копенгагене', '03.3', 'Копенгаген, за окном Нюхавн.')}
      ${cell('office-mexico', 880, 1100, 'офис на месяц в Мехико', '03.4', 'Мехико, за балконом цветёт жакаранда.')}
    </div>
  </section>

  <section class="v3-chapter" data-chapter>
    <p class="v3-label"><span>AIRBNB_/_04</span><span></span></p>
    <div class="m1">
      <h2>Комната через месяц</h2>
      <div class="copy"><p>Второй сюжет — съёмная комната через месяц жизни в ней. Над столом выросла стена из открыток, билетов и снимков города, в углу стоит чемодан. Комната чужая, но за месяц стала своей. Строка: «Give it a month.»</p></div>
    </div>
    <figure class="m4">
      ${img('room-lisbon-3x1', 1800, 600, 'обжитая съёмная комната в Лиссабоне, билборд')}
      <figcaption><b>AIRBNB_/_04.1</b>Лиссабон, билборд 3:1.</figcaption>
    </figure>
    <figure class="m4">
      ${img('room-mexico-wide', 1600, 900, 'обжитая съёмная комната в Мехико, экран')}
      <figcaption><b>AIRBNB_/_04.2</b>Мехико, экран 16:9. Кадры сгенерированы, текст и знак поставлены отдельным слоем.</figcaption>
    </figure>
  </section>

  <section class="v3-chapter" data-chapter>
    <p class="v3-label"><span>AIRBNB_/_05</span><span></span></p>
    <div class="m1">
      <h2>Запасной ключ</h2>
      <div class="copy"><p>Третий сюжет — связка ключей. Запасной ключ дают тем, кто живёт, а не гостит. Каждую неделю на связке прибавляется местный брелок.</p></div>
    </div>
    <div class="m3" data-n="2" style="--cell: 1 / 1">
      ${cell('key-map', 1080, 1080, 'связка ключей на карте города', '05.1', 'Связка ключей с одним брелоком на карте города.')}
      ${cell('k-h3', 1080, 1080, 'четыре связки, по неделе на каждую', '05.2', 'Строка: «Every week, a little more local.»')}
    </div>
  </section>

  <section class="v3-chapter" data-chapter>
    <p class="v3-label"><span>AIRBNB_/_06</span><span></span></p>
    <div class="m1">
      <h2>Как проверить</h2>
      <div class="copy"><p>Гипотеза: если показать месяц как обжитую базу, больше людей из кампании перейдут к жилью на месяц и забронируют от 28 ночей. Метрика — доля таких бронирований среди переходов из кампании. Порог успеха — +20% к этой доле против обычной рекламы при базе 18% ночей; по моему расчёту для этого нужно около 1 900 броней из кампании в каждой группе. Тест не запускался, это концепт.</p><p>Speculative concept. Not affiliated with or endorsed by Airbnb.</p></div>
    </div>
    <ul class="ax-plan" aria-label="План проверки">
      <li><b>Обоснование</b><span>Жильё на месяц уже покупают: 18% ночей на Airbnb — проживания от 28 дней. Мешает страх из главы 02, и кампания отвечает на него картинкой.</span></li>
      <li><b>Метод</b><span>Две группы: одна видит кампанию, другая — обычную рекламу Airbnb. Сравнивается доля броней от 28 ночей среди переходов.</span></li>
      <li><b>Ожидание</b><span>Доля 21,6% и выше (база 18% плюс 20%) — гипотеза подтвердилась, кампания идёт в другие города. Ниже порога — сюжет страх не снимает, и проверяется следующий.</span></li>
      <li><b>Скорость</b><span>Около 130 картинок в работе против 380 у Arc'teryx и 1 200 у Dyson. Порог взят до кадров, а сюжеты выбраны без точного продуктового объекта, который у Dyson правился десятки кругов.</span></li>
    </ul>
  </section>

  <nav class="v3-next" aria-label="Соседние работы">
    <a href="arcteryx-winter.html">←_PREVIOUS<strong>Arc'teryx</strong></a>
    <a href="rawmid-video.html">NEXT_→<strong>RAWMID · видео-визуал</strong></a>
  </nav>
</main>`;
t = t.replace(/<main class="v3" id="niche">[\s\S]*?<\/main>/, main)
     .replaceAll(oldTitle, title)
     .replaceAll('work/arcteryx-winter.html', 'work/airbnb-month.html')
     .replace("<b>ARC'TERYX</b>", '<b>AIRBNB</b>');  // 12.11: английская страница есть (_build-airbnb-en.mjs), hreflang и переключатель языка оставлены
fs.writeFileSync(new URL('airbnb-month.html', dir), t);
console.log('ok', t.length, (t.match(/arc.?teryx/gi) || []).length + " arcteryx mentions left");

await import('./_fit-figures.mjs?' + Date.now()); // 12.11: рамки m4/m5 под кадр

await import('./_ai-mark.mjs?' + Date.now()); // 12.11: полоса AI-first под шапкой
