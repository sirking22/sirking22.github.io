# Финальная приёмка ночи 29→30.10 — пакет 10-final

Итоговая версия после 09-en. Локальный HTTP-сервер, Chromium через установленный Playwright CLI; viewport 1920/1440/800/375 × 1080. Все внешние HTTP-запросы перехвачены ответом 204, сеть не использовалась. Загрузка/воспроизведение внешних сервисов не подтверждается. Кэш отключён маршрутизацией.

38 HTML × 4 ширины = **152/152 PASS**. Каждый PASS: изображения декодируются, видео загружаются и currentTime > 0, постеры декодируются, горизонтальный выход 0 px, console.error/pageerror 0, неуспешные запросы/HTTP ≥400 0, внешние HTTP(S)-ссылки имеют rel=noopener. Перенаправления дождались правильной страницы и якоря. Медиа на странице назначения повторно учитываются для адресов перенаправления.

| Страница | Ширина, px | Результат | Изображения | Видео | Постеры | Выход, px |
| --- | ---: | --- | ---: | ---: | ---: | ---: |
| v2/404.html | 1920 | PASS | 0 | 0 | 0 | 0 |
| v2/404.html | 1440 | PASS | 0 | 0 | 0 | 0 |
| v2/404.html | 800 | PASS | 0 | 0 | 0 | 0 |
| v2/404.html | 375 | PASS | 0 | 0 | 0 | 0 |
| v2/case-rawmid-style.html | 1920 | PASS | 8 | 0 | 0 | 0 |
| v2/case-rawmid-style.html | 1440 | PASS | 8 | 0 | 0 | 0 |
| v2/case-rawmid-style.html | 800 | PASS | 8 | 0 | 0 | 0 |
| v2/case-rawmid-style.html | 375 | PASS | 8 | 0 | 0 | 0 |
| v2/drafts/rawmid-decision.html | 1920 | PASS | 2 | 0 | 0 | 0 |
| v2/drafts/rawmid-decision.html | 1440 | PASS | 2 | 0 | 0 | 0 |
| v2/drafts/rawmid-decision.html | 800 | PASS | 2 | 0 | 0 | 0 |
| v2/drafts/rawmid-decision.html | 375 | PASS | 2 | 0 | 0 | 0 |
| v2/en/404.html | 1920 | PASS | 0 | 0 | 0 | 0 |
| v2/en/404.html | 1440 | PASS | 0 | 0 | 0 | 0 |
| v2/en/404.html | 800 | PASS | 0 | 0 | 0 | 0 |
| v2/en/404.html | 375 | PASS | 0 | 0 | 0 | 0 |
| v2/en/case-rawmid-style.html | 1920 | PASS | 8 | 0 | 0 | 0 |
| v2/en/case-rawmid-style.html | 1440 | PASS | 8 | 0 | 0 | 0 |
| v2/en/case-rawmid-style.html | 800 | PASS | 8 | 0 | 0 | 0 |
| v2/en/case-rawmid-style.html | 375 | PASS | 8 | 0 | 0 | 0 |
| v2/en/drafts/rawmid-decision.html | 1920 | PASS | 2 | 0 | 0 | 0 |
| v2/en/drafts/rawmid-decision.html | 1440 | PASS | 2 | 0 | 0 | 0 |
| v2/en/drafts/rawmid-decision.html | 800 | PASS | 2 | 0 | 0 | 0 |
| v2/en/drafts/rawmid-decision.html | 375 | PASS | 2 | 0 | 0 | 0 |
| v2/en/index.html | 1920 | PASS | 22 | 2 | 2 | 0 |
| v2/en/index.html | 1440 | PASS | 22 | 2 | 2 | 0 |
| v2/en/index.html | 800 | PASS | 22 | 2 | 2 | 0 |
| v2/en/index.html | 375 | PASS | 22 | 2 | 2 | 0 |
| v2/en/info.html | 1920 | PASS | 1 | 0 | 0 | 0 |
| v2/en/info.html | 1440 | PASS | 1 | 0 | 0 | 0 |
| v2/en/info.html | 800 | PASS | 1 | 0 | 0 | 0 |
| v2/en/info.html | 375 | PASS | 1 | 0 | 0 | 0 |
| v2/en/method.html | 1920 | PASS | 2 | 0 | 0 | 0 |
| v2/en/method.html | 1440 | PASS | 2 | 0 | 0 | 0 |
| v2/en/method.html | 800 | PASS | 2 | 0 | 0 | 0 |
| v2/en/method.html | 375 | PASS | 2 | 0 | 0 | 0 |
| v2/en/work/ai-pipeline.html | 1920 | PASS | 0 | 0 | 0 | 0 |
| v2/en/work/ai-pipeline.html | 1440 | PASS | 0 | 0 | 0 | 0 |
| v2/en/work/ai-pipeline.html | 800 | PASS | 0 | 0 | 0 | 0 |
| v2/en/work/ai-pipeline.html | 375 | PASS | 0 | 0 | 0 | 0 |
| v2/en/work/dyson-v15.html | 1920 | PASS | 7 | 0 | 0 | 0 |
| v2/en/work/dyson-v15.html | 1440 | PASS | 7 | 0 | 0 | 0 |
| v2/en/work/dyson-v15.html | 800 | PASS | 7 | 0 | 0 | 0 |
| v2/en/work/dyson-v15.html | 375 | PASS | 7 | 0 | 0 | 0 |
| v2/en/work/early-identities.html | 1920 | PASS | 4 | 0 | 0 | 0 |
| v2/en/work/early-identities.html | 1440 | PASS | 4 | 0 | 0 | 0 |
| v2/en/work/early-identities.html | 800 | PASS | 4 | 0 | 0 | 0 |
| v2/en/work/early-identities.html | 375 | PASS | 4 | 0 | 0 | 0 |
| v2/en/work/imya.html | 1920 | PASS | 2 | 0 | 0 | 0 |
| v2/en/work/imya.html | 1440 | PASS | 2 | 0 | 0 | 0 |
| v2/en/work/imya.html | 800 | PASS | 2 | 0 | 0 | 0 |
| v2/en/work/imya.html | 375 | PASS | 2 | 0 | 0 | 0 |
| v2/en/work/karuna.html | 1920 | PASS | 3 | 0 | 0 | 0 |
| v2/en/work/karuna.html | 1440 | PASS | 3 | 0 | 0 | 0 |
| v2/en/work/karuna.html | 800 | PASS | 3 | 0 | 0 | 0 |
| v2/en/work/karuna.html | 375 | PASS | 3 | 0 | 0 | 0 |
| v2/en/work/kreslo-chitalka.html | 1920 | PASS | 9 | 0 | 0 | 0 |
| v2/en/work/kreslo-chitalka.html | 1440 | PASS | 9 | 0 | 0 | 0 |
| v2/en/work/kreslo-chitalka.html | 800 | PASS | 9 | 0 | 0 | 0 |
| v2/en/work/kreslo-chitalka.html | 375 | PASS | 9 | 0 | 0 | 0 |
| v2/en/work/notion-system.html | 1920 | PASS | 13 | 3 | 3 | 0 |
| v2/en/work/notion-system.html | 1440 | PASS | 13 | 3 | 3 | 0 |
| v2/en/work/notion-system.html | 800 | PASS | 13 | 3 | 3 | 0 |
| v2/en/work/notion-system.html | 375 | PASS | 13 | 3 | 3 | 0 |
| v2/en/work/rawmid-app.html | 1920 | PASS | 4 | 0 | 0 | 0 |
| v2/en/work/rawmid-app.html | 1440 | PASS | 4 | 0 | 0 | 0 |
| v2/en/work/rawmid-app.html | 800 | PASS | 4 | 0 | 0 | 0 |
| v2/en/work/rawmid-app.html | 375 | PASS | 4 | 0 | 0 | 0 |
| v2/en/work/rawmid-packaging.html | 1920 | PASS | 8 | 0 | 0 | 0 |
| v2/en/work/rawmid-packaging.html | 1440 | PASS | 8 | 0 | 0 | 0 |
| v2/en/work/rawmid-packaging.html | 800 | PASS | 8 | 0 | 0 | 0 |
| v2/en/work/rawmid-packaging.html | 375 | PASS | 8 | 0 | 0 | 0 |
| v2/en/work/rawmid-style.html | 1920 | PASS | 8 | 0 | 0 | 0 |
| v2/en/work/rawmid-style.html | 1440 | PASS | 8 | 0 | 0 | 0 |
| v2/en/work/rawmid-style.html | 800 | PASS | 8 | 0 | 0 | 0 |
| v2/en/work/rawmid-style.html | 375 | PASS | 8 | 0 | 0 | 0 |
| v2/en/work/rawmid-video.html | 1920 | PASS | 0 | 3 | 3 | 0 |
| v2/en/work/rawmid-video.html | 1440 | PASS | 0 | 3 | 3 | 0 |
| v2/en/work/rawmid-video.html | 800 | PASS | 0 | 3 | 3 | 0 |
| v2/en/work/rawmid-video.html | 375 | PASS | 0 | 3 | 3 | 0 |
| v2/en/work/rebranding.html | 1920 | PASS | 0 | 0 | 0 | 0 |
| v2/en/work/rebranding.html | 1440 | PASS | 0 | 0 | 0 | 0 |
| v2/en/work/rebranding.html | 800 | PASS | 0 | 0 | 0 | 0 |
| v2/en/work/rebranding.html | 375 | PASS | 0 | 0 | 0 | 0 |
| v2/en/work/scandic.html | 1920 | PASS | 7 | 0 | 0 | 0 |
| v2/en/work/scandic.html | 1440 | PASS | 7 | 0 | 0 | 0 |
| v2/en/work/scandic.html | 800 | PASS | 7 | 0 | 0 | 0 |
| v2/en/work/scandic.html | 375 | PASS | 7 | 0 | 0 | 0 |
| v2/index.html | 1920 | PASS | 22 | 2 | 2 | 0 |
| v2/index.html | 1440 | PASS | 22 | 2 | 2 | 0 |
| v2/index.html | 800 | PASS | 22 | 2 | 2 | 0 |
| v2/index.html | 375 | PASS | 22 | 2 | 2 | 0 |
| v2/info.html | 1920 | PASS | 1 | 0 | 0 | 0 |
| v2/info.html | 1440 | PASS | 1 | 0 | 0 | 0 |
| v2/info.html | 800 | PASS | 1 | 0 | 0 | 0 |
| v2/info.html | 375 | PASS | 1 | 0 | 0 | 0 |
| v2/method.html | 1920 | PASS | 2 | 0 | 0 | 0 |
| v2/method.html | 1440 | PASS | 2 | 0 | 0 | 0 |
| v2/method.html | 800 | PASS | 2 | 0 | 0 | 0 |
| v2/method.html | 375 | PASS | 2 | 0 | 0 | 0 |
| v2/work/ai-pipeline.html | 1920 | PASS | 0 | 0 | 0 | 0 |
| v2/work/ai-pipeline.html | 1440 | PASS | 0 | 0 | 0 | 0 |
| v2/work/ai-pipeline.html | 800 | PASS | 0 | 0 | 0 | 0 |
| v2/work/ai-pipeline.html | 375 | PASS | 0 | 0 | 0 | 0 |
| v2/work/dyson-v15.html | 1920 | PASS | 7 | 0 | 0 | 0 |
| v2/work/dyson-v15.html | 1440 | PASS | 7 | 0 | 0 | 0 |
| v2/work/dyson-v15.html | 800 | PASS | 7 | 0 | 0 | 0 |
| v2/work/dyson-v15.html | 375 | PASS | 7 | 0 | 0 | 0 |
| v2/work/early-identities.html | 1920 | PASS | 4 | 0 | 0 | 0 |
| v2/work/early-identities.html | 1440 | PASS | 4 | 0 | 0 | 0 |
| v2/work/early-identities.html | 800 | PASS | 4 | 0 | 0 | 0 |
| v2/work/early-identities.html | 375 | PASS | 4 | 0 | 0 | 0 |
| v2/work/imya.html | 1920 | PASS | 2 | 0 | 0 | 0 |
| v2/work/imya.html | 1440 | PASS | 2 | 0 | 0 | 0 |
| v2/work/imya.html | 800 | PASS | 2 | 0 | 0 | 0 |
| v2/work/imya.html | 375 | PASS | 2 | 0 | 0 | 0 |
| v2/work/karuna.html | 1920 | PASS | 3 | 0 | 0 | 0 |
| v2/work/karuna.html | 1440 | PASS | 3 | 0 | 0 | 0 |
| v2/work/karuna.html | 800 | PASS | 3 | 0 | 0 | 0 |
| v2/work/karuna.html | 375 | PASS | 3 | 0 | 0 | 0 |
| v2/work/kreslo-chitalka.html | 1920 | PASS | 9 | 0 | 0 | 0 |
| v2/work/kreslo-chitalka.html | 1440 | PASS | 9 | 0 | 0 | 0 |
| v2/work/kreslo-chitalka.html | 800 | PASS | 9 | 0 | 0 | 0 |
| v2/work/kreslo-chitalka.html | 375 | PASS | 9 | 0 | 0 | 0 |
| v2/work/notion-system.html | 1920 | PASS | 13 | 3 | 3 | 0 |
| v2/work/notion-system.html | 1440 | PASS | 13 | 3 | 3 | 0 |
| v2/work/notion-system.html | 800 | PASS | 13 | 3 | 3 | 0 |
| v2/work/notion-system.html | 375 | PASS | 13 | 3 | 3 | 0 |
| v2/work/rawmid-app.html | 1920 | PASS | 4 | 0 | 0 | 0 |
| v2/work/rawmid-app.html | 1440 | PASS | 4 | 0 | 0 | 0 |
| v2/work/rawmid-app.html | 800 | PASS | 4 | 0 | 0 | 0 |
| v2/work/rawmid-app.html | 375 | PASS | 4 | 0 | 0 | 0 |
| v2/work/rawmid-packaging.html | 1920 | PASS | 8 | 0 | 0 | 0 |
| v2/work/rawmid-packaging.html | 1440 | PASS | 8 | 0 | 0 | 0 |
| v2/work/rawmid-packaging.html | 800 | PASS | 8 | 0 | 0 | 0 |
| v2/work/rawmid-packaging.html | 375 | PASS | 8 | 0 | 0 | 0 |
| v2/work/rawmid-style.html | 1920 | PASS | 8 | 0 | 0 | 0 |
| v2/work/rawmid-style.html | 1440 | PASS | 8 | 0 | 0 | 0 |
| v2/work/rawmid-style.html | 800 | PASS | 8 | 0 | 0 | 0 |
| v2/work/rawmid-style.html | 375 | PASS | 8 | 0 | 0 | 0 |
| v2/work/rawmid-video.html | 1920 | PASS | 0 | 3 | 3 | 0 |
| v2/work/rawmid-video.html | 1440 | PASS | 0 | 3 | 3 | 0 |
| v2/work/rawmid-video.html | 800 | PASS | 0 | 3 | 3 | 0 |
| v2/work/rawmid-video.html | 375 | PASS | 0 | 3 | 3 | 0 |
| v2/work/rebranding.html | 1920 | PASS | 0 | 0 | 0 | 0 |
| v2/work/rebranding.html | 1440 | PASS | 0 | 0 | 0 | 0 |
| v2/work/rebranding.html | 800 | PASS | 0 | 0 | 0 | 0 |
| v2/work/rebranding.html | 375 | PASS | 0 | 0 | 0 | 0 |
| v2/work/scandic.html | 1920 | PASS | 7 | 0 | 0 | 0 |
| v2/work/scandic.html | 1440 | PASS | 7 | 0 | 0 | 0 |
| v2/work/scandic.html | 800 | PASS | 7 | 0 | 0 | 0 |
| v2/work/scandic.html | 375 | PASS | 7 | 0 | 0 | 0 |

| Проверка | Итог |
| --- | --- |
| Изображения / видео / постеры | 800 / 64 / 64, ошибок 0 |
| Внутренние ссылки и якоря | 284 на ширину, 1136/1136 HTTP 200 и существующие якоря |
| Фильтры RU/EN | 40/40: identity 5, packaging 2, web 2, ai 4, all 12; точное совпадение набора плиток |
| Счётчик | 12/12 на обеих главных; live-status соответствует фильтру, aria-pressed=true |
| Цепочки RU/EN | По 12 уникальных работ, возврат к первой; нет пропусков и тупиков |
| Небезопасные внешние ссылки | 0 без rel=noopener |

Порядок RU: `work/rawmid-style.html` → `work/dyson-v15.html` → `work/rawmid-video.html` → `work/notion-system.html` → `work/scandic.html` → `work/karuna.html` → `work/rawmid-app.html` → `work/ai-pipeline.html` → `work/imya.html` → `work/kreslo-chitalka.html` → `work/early-identities.html` → `work/rebranding.html` → первая работа. EN повторяет его под `en/work/`. 404 и неопубликованные черновики не являются работами сетки; оба прежних адреса перенаправления проверены отдельно.

Визуально просмотрены `qa/10-ru-index-375.png` и `qa/10-en-index-1920.png`: существующая композиция сохранена, заглушки видимы. Снимки обеих главных сохранены на всех четырёх ширинах. Технический PASS не означает контентную готовность: открытые вопросы — в верхнем порядке и финальном обновлении `plan-2026-10-30.md`.

Доказательства и воспроизведение: `qa/10-run.cjs` расширяет проверки 04 на полный список HTML; `qa/10-browser.js` — выполненный сценарий, `qa/10-results-{1920,1440,800,375}.{json,log}` — результаты, `qa/10-server.cjs` — локальная раздача с Range для MP4. В JSON финальные циклы проверяются раздельно по `links.cycles[].exactCycle`; унаследованное поле `links.exactCycle` сравнивает один RU-цикл со всеми 24 плитками двух языков и не используется как критерий PASS.

Проверено: 152/152 состояний; битые изображения, видео и постеры — 0; console/pageerror, HTTP-ошибки и горизонтальный выход — 0; ссылки 1136/1136, фильтры 40/40, RU/EN-цепочки 12/12.
