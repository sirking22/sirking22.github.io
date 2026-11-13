// Английская страница концепта Airbnb (12.11.2026). Оболочка — en/work/arcteryx-winter.html,
// <main> берётся из собранной русской work/airbnb-month.html и переводится по словарю ниже.
// Запуск после node work/_build-airbnb.mjs: node work/_build-airbnb-en.mjs
import fs from 'fs';
const dir = new URL('.', import.meta.url);
const en = new URL('../en/work/', dir);
let t = fs.readFileSync(new URL('arcteryx-winter.html', en), 'utf8');
const ru = fs.readFileSync(new URL('airbnb-month.html', dir), 'utf8');
let main = ru.match(/<main class="v3" id="niche">[\s\S]*?<\/main>/)[0].replaceAll('src="../assets/', 'src="../../assets/');
const q = s => s.replace(/«/g, '“').replace(/»/g, '”');
const T = [
  ['РЕКЛАМНЫЙ_КОНЦЕПТ', 'ADVERTISING_CONCEPT'], ['КРЕАТИВНЫЙ ДИРЕКТОР', 'CREATIVE DIRECTOR'], ['КОНЦЕПТ,_НЕ_ЗАКАЗ', 'CONCEPT,_NOT_COMMISSIONED'],
  ['Рекламный концепт для Airbnb. У Airbnb есть жильё на месяц и дольше, но его знают как жильё на отпуск. Месяц в чужой квартире пугает: будет ли где работать, станет ли место своим. Кампания показывает месяц как базу: офис с видом на город, угол, который за четыре недели обживается, и запасной ключ.',
   'An advertising concept for Airbnb. Airbnb has stays of a month or longer, but people know it for holidays. A month in someone else’s flat feels risky: will there be a place to work, will it ever feel like yours? The campaign shows a month as a base: an office with a view of the city, a corner that fills up over four weeks, and a spare key.'],
  ['Первый сюжет — офис на месяц. Один баннер на город: стол, кресло и монитор стоят у окна с видом, который есть только здесь. Людей в кадре нет, место ждёт того, кто приедет.',
   'The first story is an office for a month. One banner per city: a desk, a chair and a monitor by a window with a view you only get there. There are no people in the frame; the place is waiting for whoever arrives.'],
  ['к доле броней от 28 ночей среди переходов из кампании против обычной рекламы — порог теста. Гипотеза, тест не запускался', 'share of 28+ night bookings among campaign clicks vs regular ads: the test threshold. A hypothesis, not tested yet'],
  ['ночей на Airbnb — проживания от 28 дней, III квартал 2023, письмо компании акционерам', 'of nights on Airbnb were stays of 28+ days in Q3 2023, per the company’s shareholder letter'],
  ['ночей — бронирование, на которое работает кампания', 'nights: the booking the campaign is built for'],
  ['сюжета: офис, угол, ключ', 'stories: office, corner, key'],
  ['города в серии офисов: Кейптаун, Мехико, Копенгаген, Лиссабон', 'cities in the office series: Cape Town, Mexico City, Copenhagen, Lisbon'],
  ['ситилайт на остановке в Лиссабоне', 'city light at a bus stop in Lisbon'],
  ['Ситилайт на остановке в Лиссабоне, рядом с теми, кто приехал с чемоданом.', 'City light at a bus stop in Lisbon, next to people arriving with suitcases.'],
  ['пост в ленте на телефоне', 'feed post on a phone'], ['Пост в ленте.', 'Feed post.'],
  ['экран в зале прилёта', 'screen in the arrivals hall'],
  ['Экран в зале прилёта, Копенгаген. Офис на месяц встречает на выходе из аэропорта.', 'Screen in the arrivals hall, Copenhagen. The office for a month greets you on the way out of the airport.'],
  ['постер в переходе метро', 'poster in a metro underpass'], ['Постер в переходе метро.', 'Poster in a metro underpass.'],
  ['бумажный постер на стене в Мехико', 'paper poster on a wall in Mexico City'], ['Бумажный постер на стене в Мехико.', 'Paper poster on a wall in Mexico City.'],
  ['постер на платформе метро', 'poster on a metro platform'], ['Постер на платформе метро.', 'Poster on a metro platform.'],
  ['Сцены мокапов сгенерированы по готовым баннерам. Текст на щитах сверен с макетами, знак заменён на точный.', 'The mockup scenes were generated from the finished banners. The text on every board was checked against the layouts, and the logo was replaced with the exact mark.'],
  ['рабочее место с видом на Кейптаун', 'workspace with a view of Cape Town'], ['Кейптаун. Стол у окна, за ним гора.', 'Cape Town. A desk by the window, the mountain behind it.'],
  ['рабочее место с видом на Мехико', 'workspace with a view of Mexico City'], ['Мехико. Стол у окна над городом.', 'Mexico City. A desk by the window above the city.'],
  ['рабочее место с видом на Копенгаген', 'workspace with a view of Copenhagen'], ['Копенгаген. Стол у окна над крышами.', 'Copenhagen. A desk by the window above the rooftops.'],
  ['рабочее место с видом на Лиссабон', 'workspace with a view of Lisbon'], ['Лиссабон. Стол у окна, за ним река.', 'Lisbon. A desk by the window, the river behind it.'],
  ['Угол за четыре недели', 'A corner over four weeks'],
  ['Второй сюжет — один и тот же угол квартиры в четырёх кадрах, с первой недели по четвёртую. Каждую неделю в нём прибавляется что-то своё: растения, открытки, вещи. К концу месяца чужая квартира выглядит обжитой.',
   'The second story is the same corner of a flat in four frames, from week one to week four. Each week something of your own appears: plants, postcards, things. By the end of the month someone else’s flat looks lived-in.'],
  ['угол квартиры за четыре недели', 'a corner of the flat over four weeks'], ['Баннер 4:5 для ленты.', '4:5 feed banner.'],
  ['стена от пустой к обжитой', 'a wall going from empty to lived-in'], ['стол с растениями по неделям', 'a table with plants, week by week'], ['Квадрат.', 'Square.'],
  ['Запасной ключ', 'The spare key'],
  ['Третий сюжет — связка ключей. Запасной ключ дают тем, кто живёт, а не гостит. Каждую неделю на связке прибавляется местный брелок.',
   'The third story is a bunch of keys. You get a spare key when you live somewhere, not when you visit. Every week a local keyring joins the bunch.'],
  ['связка ключей с местными брелоками', 'a bunch of keys with local keyrings'], ['четыре связки, по неделе на каждую', 'four bunches, one for each week'], ['брелоки месяца', 'keyrings of the month'],
  ['Кадры сгенерированы, текст и знак поставлены отдельным слоем.', 'The frames were generated; the text and logo were set as a separate layer.'],
  ['Как проверить', 'How to test it'],
  ['Гипотеза: если показать месяц как обжитую базу, больше людей из кампании перейдут к жилью на месяц и забронируют от 28 ночей. Метрика — доля таких бронирований среди переходов из кампании. Порог успеха — +20% к этой доле против обычной рекламы при базе 18% ночей; по моему расчёту для этого нужно около 1 900 броней из кампании в каждой группе. Тест не запускался, это концепт.',
   'Hypothesis: if a month is shown as a lived-in base, more people from the campaign will move on to monthly stays and book 28 nights or more. The metric is the share of such bookings among visits from the campaign. Success threshold: +20% to that share against regular ads, from a base of 18% of nights; by my estimate this needs about 1,900 campaign bookings per group. The test has not been run; this is a concept.'],
  ["Чего боятся на месяц", "What could go wrong in a month"],
  ["Идея выросла из жалоб на Reddit: за месяц в чужой квартире многое может сломаться. Хозяин отменяет бронь, в квартире нет wifi, пропадает свет. Кампания отвечает на этот страх картинкой: за четыре недели квартира становится своей.", "The idea grew out of complaints on Reddit: a lot can go wrong over a month in someone else’s flat. The host cancels, there is no wifi, the power keeps cutting out. The campaign answers that fear with a picture: in four weeks the flat becomes yours."],
  ["Голос аудитории", "Audience voice"],
  ["r/AirBnB, декабрь 2025", "r/AirBnB, December 2025"],
  ["r/AirBnB, май 2025", "r/AirBnB, May 2025"],
  ["Freaking Nomads, март 2026", "Freaking Nomads, March 2026"],
  ["меньше картинок в работе, чем у Arc'teryx: около 130 против 380. Маршрут собран по опыту двух прошлых концептов", "fewer working images than Arc'teryx: about 130 against 380. The route was built on what the two previous concepts taught"],
  ["План проверки", "Test plan"],
  ["Обоснование", "Rationale"],
  ["Метод", "Method"],
  ["Ожидание", "Expectation"],
  ["Скорость", "Speed"],
  ["Жильё на месяц уже покупают: 18% ночей на Airbnb — проживания от 28 дней. Мешает страх из главы 02, и кампания отвечает на него картинкой.", "People already buy monthly stays: 18% of nights on Airbnb are stays of 28+ days. The fear from chapter 02 holds the rest back, and the campaign answers it with a picture."],
  ["Две группы: одна видит кампанию, другая — обычную рекламу Airbnb. Сравнивается доля броней от 28 ночей среди переходов.", "Two groups: one sees the campaign, the other sees regular Airbnb ads. The comparison is the share of 28+ night bookings among visits."],
  ["Доля 21,6% и выше (база 18% плюс 20%) — гипотеза подтвердилась, кампания идёт в другие города. Ниже порога — сюжет страх не снимает, и проверяется следующий.", "A share of 21.6% or more (an 18% base plus 20%) confirms the hypothesis, and the campaign moves to other cities. Below the threshold the story does not remove the fear, and the next one is tested."],
  ["Около 130 картинок в работе против 380 у Arc'teryx и 1 200 у Dyson. Порог взят до кадров, а сюжеты выбраны без точного продуктового объекта, который у Dyson правился десятки кругов.", "About 130 working images against 380 for Arc'teryx and 1,200 for Dyson. The threshold was set before any frames, and the stories avoid an exact product object, the kind that took Dyson dozens of rounds."],
  ['СОБРАН_В_AI_PIPELINE_→', 'BUILT_IN_AI_PIPELINE_→'],
  ['Строка:', 'Line:'],
];
T.sort((x, y) => y[0].length - x[0].length); // длинные фразы раньше коротких: «Запасной ключ» входит в абзац
for (const [a, b] of T) main = main.replaceAll(a, b);
main = main.replace(/<nav class="v3-next"[\s\S]*?<\/nav>/, t.match(/<nav class="v3-next"[\s\S]*?<\/nav>/)[0]); // соседние работы — из английской оболочки
main = q(main);
const left = main.match(/[А-Яа-яЁё][^<>"]*/g);
if (left) { console.error('не переведено:', left); process.exit(1); }
const oldTitle = "Arc'teryx · advertising concept · not commissioned — Arseniy Okhotin";
t = t.replace(/<main class="v3" id="niche">[\s\S]*?<\/main>/, main)
     .replaceAll(oldTitle, 'Airbnb · advertising concept · not commissioned — Arseniy Okhotin')
     .replaceAll('work/arcteryx-winter.html', 'work/airbnb-month.html')
     .replace("<b>ARC'TERYX</b>", '<b>AIRBNB</b>');
fs.writeFileSync(new URL('airbnb-month.html', en), t);
console.log('ok', t.length, (t.match(/arc.?teryx/gi) || []).length + ' arcteryx mentions left');
await import('./_fit-figures.mjs?' + Date.now());

await import('./_ai-mark.mjs?' + Date.now()); // 12.11: полоса AI-first под шапкой
