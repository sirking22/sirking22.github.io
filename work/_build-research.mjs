// Вставляет главу «исследование» третьей в кейс AI pipeline (RU, EN) и сдвигает номера глав.
import fs from 'node:fs';
const root = process.argv[2];
const css = '@media (min-width:1024px){.ap-values.ap-src{grid-template-columns:repeat(3,minmax(0,1fr))}}\n.ap-src{margin-top:32px}\n';
const T = {
  'work/ai-pipeline.html': {
    h2: 'Сначала данные, потом картинка',
    p: 'Концепт начинается с данных. Нейросеть собирает их из трёх источников: что пишут покупатели, что бренд уже крутит в рекламе и что компания говорит акционерам. Выводы и гипотезу с порогом теста делаю я.',
    aria: 'Источники исследования',
    items: [
      ['Отзывы на Reddit', '45 высказываний покупателей Arc\'teryx и тех, кто выбирает куртку. У Dyson четыре покупателя описали шок от грязи на «чистом» полу, из этого выросла идея концепта.'],
      ['Библиотека рекламы Meta', 'У Dyson на 5 ноября 63 активных объявления по США, 12 из них продают скидкой, лазер V15 не показывает ни одно. Концепт показывает лазером невидимую пыль — этого в их рекламе нет.'],
      ['Письма акционерам', '18% ночей на Airbnb — проживания от 28 дней, III квартал 2023. От этой базы считается порог теста концепта: +20% к доле таких броней.'],
    ],
  },
  'en/work/ai-pipeline.html': {
    h2: 'Data first, then the picture',
    p: 'A concept starts with data. The neural network collects it from three sources: what buyers write, what the brand already runs in its ads, and what the company tells shareholders. I draw the conclusions and set the hypothesis with a test threshold.',
    aria: 'Research sources',
    items: [
      ['Reddit reviews', '45 statements from Arc\'teryx buyers and people choosing a jacket. For Dyson, four buyers described the shock of dirt on a “clean” floor; the concept grew from that.'],
      ['Meta Ad Library', 'On 5 November Dyson had 63 active US ads, 12 of them selling on discount, and none showing the V15 laser. The concept uses the laser to show invisible dust, which their ads never do.'],
      ['Shareholder letters', '18% of Airbnb nights are stays of 28+ days, Q3 2023. The concept’s test threshold starts from that base: +20% to the share of such bookings.'],
    ],
  },
};
for (const [rel, t] of Object.entries(T)) {
  const f = `${root}/${rel}`;
  let s = fs.readFileSync(f, 'utf8');
  if (s.includes('ap-src')) { console.log('skip', rel); continue; }
  const mark = s.indexOf('<p class="v3-label"><span>AI_PIPELINE_/_03</span>');
  if (mark < 0) throw new Error('no chapter 03 in ' + rel);
  const at = s.lastIndexOf('<section', mark);
  const head = s.slice(0, at);
  const tail = s.slice(at).replace(/AI_PIPELINE_\/_0([3-8])/g, (_, n) => 'AI_PIPELINE_/_0' + (+n + 1));
  const li = t.items.map(([b, x]) => `<li><b>${b}</b><span>${x}</span></li>`).join('');
  const sec = `<section class="v3-chapter" data-chapter>
    <p class="v3-label"><span>AI_PIPELINE_/_03</span><span></span></p>
    <div class="m1">
      <h2>${t.h2}</h2>
      <div class="copy"><p>${t.p}</p></div>
    </div>
    <ul class="ap-values ap-src" aria-label="${t.aria}">${li}</ul>
  </section>
  `;
  s = head + sec + tail;
  s = s.replace('</style>', css + '</style>');
  fs.writeFileSync(f, s);
  console.log('ok', rel, (s.match(/data-chapter>/g) || []).length, 'chapters');
}
