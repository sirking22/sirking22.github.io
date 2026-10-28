# Приёмка v2 — пакет 04-qa

Локальный HTTP-сайт, headless Chromium через Playwright CLI; viewport высотой 1080 px, кэш отключён. Включены все 17 HTML, в том числе два meta-refresh редиректа.

PASS означает: изображения и постеры декодированы, видео загружены и воспроизводятся, горизонтальный выход 0 px, console.error/pageerror 0, неуспешных сетевых запросов 0, внешних HTTP(S)-ссылок без rel="noopener" 0. Текстовые заглушки не считаются битым медиа.

| Страница (от v2/) | Ширина, px | Результат |
| --- | ---: | --- |
| index.html | 1920 | PASS |
| info.html | 1920 | PASS |
| method.html | 1920 | PASS |
| case-rawmid-style.html | 1920 | PASS; редирект → work/rawmid-style.html (с якорем #packaging для rawmid-packaging) |
| work/ai-pipeline.html | 1920 | PASS |
| work/dyson-v15.html | 1920 | PASS |
| work/early-identities.html | 1920 | PASS |
| work/imya.html | 1920 | PASS |
| work/karuna.html | 1920 | PASS |
| work/kreslo-chitalka.html | 1920 | PASS |
| work/notion-system.html | 1920 | PASS |
| work/rawmid-app.html | 1920 | PASS |
| work/rawmid-packaging.html | 1920 | PASS; редирект → work/rawmid-style.html (с якорем #packaging для rawmid-packaging) |
| work/rawmid-style.html | 1920 | PASS |
| work/rawmid-video.html | 1920 | PASS |
| work/rebranding.html | 1920 | PASS |
| work/scandic.html | 1920 | PASS |
| index.html | 1440 | PASS |
| info.html | 1440 | PASS |
| method.html | 1440 | PASS |
| case-rawmid-style.html | 1440 | PASS; редирект → work/rawmid-style.html (с якорем #packaging для rawmid-packaging) |
| work/ai-pipeline.html | 1440 | PASS |
| work/dyson-v15.html | 1440 | PASS |
| work/early-identities.html | 1440 | PASS |
| work/imya.html | 1440 | PASS |
| work/karuna.html | 1440 | PASS |
| work/kreslo-chitalka.html | 1440 | PASS |
| work/notion-system.html | 1440 | PASS |
| work/rawmid-app.html | 1440 | PASS |
| work/rawmid-packaging.html | 1440 | PASS; редирект → work/rawmid-style.html (с якорем #packaging для rawmid-packaging) |
| work/rawmid-style.html | 1440 | PASS |
| work/rawmid-video.html | 1440 | PASS |
| work/rebranding.html | 1440 | PASS |
| work/scandic.html | 1440 | PASS |
| index.html | 800 | PASS |
| info.html | 800 | PASS |
| method.html | 800 | PASS |
| case-rawmid-style.html | 800 | PASS; редирект → work/rawmid-style.html (с якорем #packaging для rawmid-packaging) |
| work/ai-pipeline.html | 800 | PASS |
| work/dyson-v15.html | 800 | PASS |
| work/early-identities.html | 800 | PASS |
| work/imya.html | 800 | PASS |
| work/karuna.html | 800 | PASS |
| work/kreslo-chitalka.html | 800 | PASS |
| work/notion-system.html | 800 | PASS |
| work/rawmid-app.html | 800 | PASS |
| work/rawmid-packaging.html | 800 | PASS; редирект → work/rawmid-style.html (с якорем #packaging для rawmid-packaging) |
| work/rawmid-style.html | 800 | PASS |
| work/rawmid-video.html | 800 | PASS |
| work/rebranding.html | 800 | PASS |
| work/scandic.html | 800 | PASS |
| index.html | 375 | PASS |
| info.html | 375 | PASS |
| method.html | 375 | PASS |
| case-rawmid-style.html | 375 | PASS; редирект → work/rawmid-style.html (с якорем #packaging для rawmid-packaging) |
| work/ai-pipeline.html | 375 | PASS |
| work/dyson-v15.html | 375 | PASS |
| work/early-identities.html | 375 | PASS |
| work/imya.html | 375 | PASS |
| work/karuna.html | 375 | PASS |
| work/kreslo-chitalka.html | 375 | PASS |
| work/notion-system.html | 375 | PASS |
| work/rawmid-app.html | 375 | PASS |
| work/rawmid-packaging.html | 375 | PASS; редирект → work/rawmid-style.html (с якорем #packaging для rawmid-packaging) |
| work/rawmid-style.html | 375 | PASS |
| work/rawmid-video.html | 375 | PASS |
| work/rebranding.html | 375 | PASS |
| work/scandic.html | 375 | PASS |

## Измерения

- 68/68 состояний PASS. На каждой ширине: 98 декодирований изображений, 8 воспроизведений видео, 8 декодирований постеров; учитываются повторные элементы и назначения редиректов.
- 112 внутренних ссылок на каждой ширине: HTTP 200 у всех; все якоря найдены. Резюме PDF также HTTP 200.
- 20/20 переключений фильтров: Айдентика 5, Упаковка 2, Веб 2, AI pipeline 4, Все 12. aria-pressed и live-status верны; счётчик 12 = число плиток.
- После исправления цепочка совпадает с порядком главной: rawmid-style → dyson-v15 → rawmid-video → notion-system → scandic → karuna → rawmid-app → ai-pipeline → imya → kreslo-chitalka → early-identities → rebranding → rawmid-style. До замыкания каждая из 12 работ встречается один раз; тупиков нет. rawmid-packaging — алиас RAWMID.
- Визуально просмотрены полные скриншоты главной на 1920 и 375. Все четыре скриншота: qa/04-index-<ширина>.png.
- Исходные результаты: qa/04-results-{1920,1440,800,375}.json и .log. Проверочный скрипт: qa/04-qa-check.js. Запуск: node .codex-context/night-1030/qa/04-qa-run.cjs <ширина>; сервер: python -m http.server 8765 --bind 127.0.0.1.

## Ограничения

Проверен локальный Chromium. Боевой домен, доступность внешних сайтов и мобильный Safari не проверялись: вне пакета. Метрика исключает автоматизированные визиты через navigator.webdriver. Контентная готовность не принята: остаются 127 заглушек из плана владельца; см. его раздел «Что сломано и не исправлено».

Проверено: 68/68 состояний, 112 внутренних ссылок × 4, 20/20 фильтров, цикл 12/12; ошибок медиа, консоли, HTTP и горизонтального выхода — 0.
