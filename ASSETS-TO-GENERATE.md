# Что заказать у GPT как ассеты сайта

Порядок — по влиянию на результат, а не по красоте. Первые два закрывают
дыры, которые сейчас реально стоят откликов; третий усиливает первый экран.

Во все промпты подставляется Global Style Lock из
`projects/ez-design-lab/ASSET_PROMPTS.md` без изменений. Дополнительно — запреты
из твоего борда 06 Guardrails: никакого глянцевого золота, никакого золота без
назначения, никаких стоковых гор и фэнтезийных лучей, никакого текста и
логотипов внутри изображения.

---

## 1. Превью ссылки (og:image) — 1200×630. Самое важное

**Зачем.** Когда ты отправляешь ссылку HR в отклике, мессенджере или почте,
там подтягивается картинка-превью. Сейчас её нет — ссылка выглядит голой
строкой. Это первое, что видит человек, и сейчас оно пустое.

**Важно:** генератор рисует только фон. Текст на превью накладываю я кодом —
у генераторов текст выходит кривым, а тезис должен читаться дословно.

```text
A horizontal 1200x630 background plate for a link preview card.
Dark graphite stone surface, deep and calm, with a single thin gold seam
running diagonally through the lower right third. Strong empty space across
the entire left two thirds — text will be placed there later.
No text, no logo, no interface, no human figure. Restrained, editorial,
high contrast, cinematic but quiet.
```

## 2. Монограмма ez для иконки вкладки

**Зачем.** Сейчас у страницы пустая иконка. Во вкладке браузера и в закладках
HR она выглядит безымянным прямоугольником. На твоих бордах монограмма уже
есть — нужна её чистая версия под мелкий размер.

```text
A minimal monogram of the two lowercase letters "ez" set in a refined
editorial serif, metallic gold on deep graphite. Centered, tight margins,
perfectly legible at 32 pixels. Flat, no bevel, no glossy highlight,
no reflection, no background texture, no frame. Square canvas, 512x512.
```

Пришли квадратом 512×512 — нарежу нужные размеры сам.

## 3. Метафоричный кадр первого экрана — 1920×1080

**Зачем.** Сейчас там просто скала — фактура без сюжета. Второй и третий твои
макеты сильнее именно метафорой: разлом, свет изнутри, человеческая фигура
для масштаба. Это то, что твой борд называет «Real. Metaphorical. Purposeful».

**Условие, без которого кадр не подойдёт:** объект справа, левые 55% кадра
почти пустые. Иначе заголовок ляжет прямо на изображение.

```text
A monolithic dark stone formation split by a narrow vertical opening,
warm light emerging from within the gap. A single small human figure stands
at the base for scale, far right of frame. The left 55 percent of the image
must stay almost empty — quiet graphite darkness and haze, no objects.
Architectural light and shadow, not landscape photography.
No text, no logo, no interface. 1920x1080.
```

---

## Чего заказывать НЕ нужно

- **Разделители, линии, рамки, подложки под скриншоты.** Всё это рисует CSS
  одним правилом, весит ноль и не мылится при масштабировании. Картинка
  вместо линии — это мегабайт ради того, что стоит нисколько.
- **Текстуры-фоны.** Три уже стоят на первом, третьем и пятом экранах. Ещё
  одна ничего не изменит: на тёмном фоне разница между фактурой и ровной
  заливкой видна, только если приглядываться.
- **Иконки шагов метода.** Схема уже нарисована вектором, иконки будут спорить
  с ней. Вот для слайдов они пригодятся — но это отдельный разговор, после
  витрины.

## Формат отдачи

Присылай PNG в исходном разрешении, не сжимай. Сжатие в webp беру на себя:
на этом материале оно даёт выигрыш в 70 раз без видимой потери, вручную так
не выйдет.
