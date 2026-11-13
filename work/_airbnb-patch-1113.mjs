// Доводка кейса Airbnb 13.11.2026: глава «сигнал», план проверки, пометка скорости, номера подписей.
import fs from 'node:fs';
const root = process.argv[2];
const ruF = `${root}/work/_build-airbnb.mjs`, enF = `${root}/work/_build-airbnb-en.mjs`;
let s = fs.readFileSync(ruF, 'utf8');
if (s.includes('ax-plan')) { console.log('уже применено'); process.exit(0); }
const must = (str, what) => { if (!s.includes(what)) throw new Error('нет: ' + what); return str; };

// 1. Подписи офисов повторяли номера мокапов 01.1–01.4.
for (const [a, b, city] of [['01.1', '01.6', 'Кейптаун'], ['01.2', '01.7', 'Мехико'], ['01.3', '01.8', 'Копенгаген'], ['01.4', '01.9', 'Лиссабон']]) {
  const from = `'${a}', '${city}.`; must(s, from); s = s.replace(from, `'${b}', '${city}.`);
}

// 2. Факт скорости вместо списка городов (города есть в подписях).
const cities = '<p><b>4</b><span>города в серии офисов: Кейптаун, Мехико, Копенгаген, Лиссабон</span></p>';
must(s, cities);
s = s.replace(cities, "<p><b>×3</b><span>меньше картинок в работе, чем у Arc'teryx: около 130 против 380. Маршрут собран по опыту двух прошлых концептов</span></p>");

// 3. Новая глава 02 «сигнал», старые 02–04 сдвигаются на 03–05.
const css = '<style>.ax-plan{list-style:none;margin:40px 0 0;padding:20px 0 0;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:24px 32px;border-top:1px solid var(--line)}.ax-plan.ax-q{grid-template-columns:repeat(3,minmax(0,1fr))}.ax-plan b{display:block;margin-bottom:8px;font:400 12px/1.4 var(--mono);text-transform:uppercase;letter-spacing:.02em}.ax-plan span{display:block;font-size:16px;line-height:1.4;text-wrap:pretty}@media(max-width:700px){.ax-plan,.ax-plan.ax-q{grid-template-columns:minmax(0,1fr)}}</style>';
const signal = `<section class="v3-chapter" data-chapter>
    <p class="v3-label"><span>AIRBNB_/_02</span><span></span></p>
    <div class="m1">
      <h2>Чего боятся на месяц</h2>
      <div class="copy"><p>Идея выросла из жалоб на Reddit: за месяц в чужой квартире многое может сломаться. Хозяин отменяет бронь, в квартире нет wifi, пропадает свет. Кампания отвечает на этот страх картинкой: за четыре недели квартира становится своей.</p></div>
    </div>
    ${css}
    <ul class="ax-plan ax-q" aria-label="Голос аудитории">
      <li><b>r/AirBnB, декабрь 2025</b><span>«Host cancelled my one month stay seven months after booking with no explanation.»</span></li>
      <li><b>r/AirBnB, май 2025</b><span>«There will be no wifi at our airbnb»</span></li>
      <li><b>Freaking Nomads, март 2026</b><span>«the electricity kept cutting out»</span></li>
    </ul>
  </section>

  `;
const mark = '<p class="v3-label"><span>AIRBNB_/_02</span>';
const at = s.lastIndexOf('<section', must(s, mark) && s.indexOf(mark));
const tail = s.slice(at).replace(/(AIRBNB_\/_0|'0)([2-4])(?=[.<'])/g, (_, p, n) => p + (+n + 1));
s = s.slice(0, at) + signal + tail;

// 4. План проверки в главе «Как проверить»: обоснование, метод, ожидание, скорость.
const plan = `
    <ul class="ax-plan" aria-label="План проверки">
      <li><b>Обоснование</b><span>Жильё на месяц уже покупают: 18% ночей на Airbnb — проживания от 28 дней. Мешает страх из главы 02, и кампания отвечает на него картинкой.</span></li>
      <li><b>Метод</b><span>Две группы: одна видит кампанию, другая — обычную рекламу Airbnb. Сравнивается доля броней от 28 ночей среди переходов.</span></li>
      <li><b>Ожидание</b><span>Доля 21,6% и выше (база 18% плюс 20%) — гипотеза подтвердилась, кампания идёт в другие города. Ниже порога — сюжет страх не снимает, и проверяется следующий.</span></li>
      <li><b>Скорость</b><span>Около 130 картинок в работе против 380 у Arc'teryx и 1 200 у Dyson. Порог взят до кадров, а сюжеты выбраны без точного продуктового объекта, который у Dyson правился десятки кругов.</span></li>
    </ul>`;
const h = must(s, 'Как проверить</h2>') && s.indexOf('Как проверить</h2>');
const end = s.indexOf('\n  </section>', h);
s = s.slice(0, end) + plan + s.slice(end);
fs.writeFileSync(ruF, s);

// 5. Словарь английской страницы.
const T = [
  ['Чего боятся на месяц', 'What a month feels risky about'],
  ['Идея выросла из жалоб на Reddit: за месяц в чужой квартире многое может сломаться. Хозяин отменяет бронь, в квартире нет wifi, пропадает свет. Кампания отвечает на этот страх картинкой: за четыре недели квартира становится своей.',
   'The idea grew out of complaints on Reddit: a lot can go wrong over a month in someone else’s flat. The host cancels, there is no wifi, the power keeps cutting out. The campaign answers that fear with a picture: in four weeks the flat becomes yours.'],
  ['Голос аудитории', 'Audience voice'], ['r/AirBnB, декабрь 2025', 'r/AirBnB, December 2025'], ['r/AirBnB, май 2025', 'r/AirBnB, May 2025'], ['Freaking Nomads, март 2026', 'Freaking Nomads, March 2026'],
  ["меньше картинок в работе, чем у Arc'teryx: около 130 против 380. Маршрут собран по опыту двух прошлых концептов", "fewer working images than Arc'teryx: about 130 against 380. The route was built on what the two previous concepts taught"],
  ['План проверки', 'Test plan'], ['Обоснование', 'Rationale'], ['Метод', 'Method'], ['Ожидание', 'Expectation'], ['Скорость', 'Speed'],
  ['Жильё на месяц уже покупают: 18% ночей на Airbnb — проживания от 28 дней. Мешает страх из главы 02, и кампания отвечает на него картинкой.',
   'People already buy monthly stays: 18% of nights on Airbnb are stays of 28+ days. The fear from chapter 02 holds the rest back, and the campaign answers it with a picture.'],
  ['Две группы: одна видит кампанию, другая — обычную рекламу Airbnb. Сравнивается доля броней от 28 ночей среди переходов.',
   'Two groups: one sees the campaign, the other sees regular Airbnb ads. The comparison is the share of 28+ night bookings among visits.'],
  ['Доля 21,6% и выше (база 18% плюс 20%) — гипотеза подтвердилась, кампания идёт в другие города. Ниже порога — сюжет страх не снимает, и проверяется следующий.',
   'A share of 21.6% or more (an 18% base plus 20%) confirms the hypothesis, and the campaign moves to other cities. Below the threshold the story does not remove the fear, and the next one is tested.'],
  ["Около 130 картинок в работе против 380 у Arc'teryx и 1 200 у Dyson. Порог взят до кадров, а сюжеты выбраны без точного продуктового объекта, который у Dyson правился десятки кругов.",
   "About 130 working images against 380 for Arc'teryx and 1,200 for Dyson. The threshold was set before any frames, and the stories avoid an exact product object, the kind that took Dyson dozens of rounds."],
];
let e = fs.readFileSync(enF, 'utf8');
const anchor = "  ['Строка:', 'Line:'],";
if (!e.includes(anchor)) throw new Error('нет якоря словаря EN');
e = e.replace(anchor, T.map(([a, b]) => `  [${JSON.stringify(a)}, ${JSON.stringify(b)}],`).join('\n') + '\n' + anchor);
fs.writeFileSync(enF, e);
console.log('ok');
