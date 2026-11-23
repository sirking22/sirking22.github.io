// Английская версия страницы тестового задания Ryze (23.11.2026).
// Берёт собранную русскую p/ryze-7q4m.html и переводит текстовые узлы и атрибуты по словарю ниже,
// ссылки на кейсы ведёт в /en/. Запуск после node work/_build-ryze.mjs: node work/_build-ryze-en.mjs
// Последней строкой печатает русский текст, оставшийся без перевода (комментарии не в счёт).
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
let h = readFileSync(join(root, 'p/ryze-7q4m.html'), 'utf8');

const T = [
  ['Язык', 'Language'],
  ['Разделы', 'Sections'],
  ['Коротко', 'Summary'],
  ['Аниматик «Ты же должен работать»', 'Animatic “Shouldn’t you be at work?”'],
  ['Ещё два эпизода этого формата, «Рыбалка» и «Стадион». Меняется только место, монолог и экраны Ryze те же.', 'Two more episodes in this format, “Fishing” and “Stadium”. Only the location changes; the monologue and the Ryze screens stay the same.'],
  ['Хук с завязкой и переходом в историю. Сценка «Новости», три кадра. Прохожие смотрят в витрине новость «Black day for ad agencies». Владелец агентства в интервью жалуется, что клиент ушёл не к другому агентству. Маркетолог признаётся, что ушла она: рекламу теперь ведёт без агентства. Дальше её история: боль, страх, результат.', 'A hook with a setup and a transition into the story. The “News” scene, three frames. Passers-by watch a TV in a shop window: “Black day for ad agencies”. In an interview, an agency owner complains that a client didn’t leave for another agency. A marketer admits she was the one who left: she now runs ads without an agency. Then her story: pain, fear, result.'],
  ['Референс: открыть ролик', 'Reference: open the video'],
  ['Сценка «Офис»: аниматик из двух кадров, 6 секунд. Он сам снимает через улицу окно офиса конкурентов: босс в ярости, летят бумаги. Потом переключает на фронталку: он на скамейке напротив, пьёт сок через трубочку.', 'The “Office” scene: a two-frame animatic, 6 seconds. He films a competitor’s office window across the street: the boss is furious, papers are flying. Then he flips to the front camera: he’s on a bench opposite, sipping juice through a straw.'],
  ['Сценка «Он спит»: аниматик из четырёх кадров, 12 секунд. Восемь утра, владелец бизнеса ещё спит, хотя раньше в это время уже сидел в рекламных кабинетах. Жена снимает это как событие. Он садится завтракать и рассказывает: рекламу ведёт Ryze, без его одобрения ничего не меняется.', 'The “He’s asleep” scene: a four-frame animatic, 12 seconds. It’s 8 a.m. and the business owner is still asleep, though at this hour he used to be in the ad dashboards already. His wife films it like a big event. He sits down to breakfast and explains: Ryze runs the ads, and nothing changes without his approval.'],
  ['Хук с ребёнком и переход через отца. Формат «Asking my kids what their dad does for a living»: мама снимает сына в машине. «What does your dad do for a living?» — «Hmm… He tells the computer approve. And computer makes the ads.» Папа на кухне: «So… I’m actually a marketer. A colleague told me about this AI tool for ads». Ролик останавливается на переходе, дальше — как в первом формате.', 'A kid hook with a transition through the dad. The “Asking my kids what their dad does for a living” format: a mom films her son in the car. “What does your dad do for a living?” “Hmm… He tells the computer approve. And computer makes the ads.” Dad in the kitchen: “So… I’m actually a marketer. A colleague told me about this AI tool for ads.” The video stops at the transition; from there it runs like the first format.'],
  ['Три формата, где показана только завязка. «Занят в неудобном месте». Референс по приёму, Holo: в салоне турбулентность и паника, а пилот спокойно занимается рекламой. Адаптация: пробка, сзади сигналят, а герой у окна машины спокойно рассказывает в камеру.', 'Three formats shown as setups only. “Busy in an awkward place”. Reference for the device, Holo: turbulence and panic in the cabin while the pilot calmly works on ads. Adaptation: a traffic jam, horns behind, and the hero at the car window calmly talks to the camera.'],
  ['«Палец вверх», по схеме победителя Holo. Референс: селфи в темноте, подпись в белой плашке, палец вверх. Адаптация: тот же ход, три кадра — удивление, палец, лайк.', '“Thumbs up”, built on a winning Holo ad. Reference: a selfie in the dark, a caption in a white box, a thumbs up. Adaptation: the same move in three frames: surprise, thumb, like.'],
  ['«Танцуют на фоне», по схеме победителя Holo. Референс: механик танцует в своём автосервисе, история и цифры идут плашками. Адаптация: маркетолог танцует в офисе, сначала история, потом цифры.', '“Dancing in the background”, built on a winning Holo ad. Reference: a mechanic dances in his garage while the story and numbers appear in caption boxes. Adaptation: a marketer dances in the office, story first, then numbers.'],
  ['Перенос чужого живого формата: «этот парень из 2099 года». Один кадр из-за спины с подзумом на экран. На ноутбуке внутренний интерфейс Ryze: расходы по каналам и что он предлагает исправить. На телефоне три действия ждут подтверждения. Цифры на экранах демонстрационные.', 'Adapting someone else’s live format: “this guy from 2099”. One over-the-shoulder shot with a slow zoom into the screen. The laptop shows Ryze’s internal interface: spend by channel and what it suggests fixing. On the phone, three actions wait for approval. The numbers on the screens are demo values.'],
  ['Оригинал: открыть ролик', 'Original: open the video'],
  ['Живые ролики, отдельно. Пример — дед «Are you happy?». Оригинал и тот же план с другим человеком, новый текст под жесты оригинала. Кадры для показа техники, в рекламу идёт свой отснятый план той же схемы.', 'Live-action videos, separately. Example: the grandpa “Are you happy?”. The original and the same shot with a different person, with new lines fitted to the original gestures. These frames show the technique; the ad itself uses our own footage shot to the same scheme.'],
  ['Формат', 'Format'],
  ['База «Форматы»: 14 форматов, 9 из разобранных роликов и 5 под мои концепты. Подача одной фразой, тип съёмки, ролик-источник, концепты по формату.', 'The “Formats” database: 14 formats, 9 from the analyzed videos and 5 for my concepts. A one-line pitch, shooting type, source video and the concepts in each format.'],
  ['Концепт и блоки', 'Concept and blocks'],
  ['База «Блоки» целиком: 74 блока по типам — хук, переход, боль, демо продукта, снятие возражения, обещание, отзыв, призыв. У каждого механика, канал и ролик-источник.', 'The full “Blocks” database: 74 blocks by type: hook, transition, pain, product demo, objection handling, promise, testimonial, call to action. Each has its mechanism, channel and source video.'],
  ['Хуки', 'Hooks'],
  ['Хуки: 19 из 74 блоков, у каждого кадр из ролика, реплика и ролик-источник.', 'Hooks: 19 of the 74 blocks, each with a frame from the video, the line and the source video.'],
  ['Метрики возвращаются', 'Metrics come back'],
  ['Как метрики возвращаются в формат', 'How metrics come back into the format'],
  ['Статистика концептов', 'Concept stats'],
  ['Метрики концептов: удержание 3 с, досмотр, CTR и конверсия, рядом формат концепта. Цифры демонстрационные.', 'Concept metrics: 3-second hold, completion rate, CTR and conversion, next to each concept’s format. The numbers are demo values.'],
  ['Предыдущий слайд', 'Previous slide'],
  ['Следующий слайд', 'Next slide'],
  ['Разбор референсов', 'Reference breakdown'],
  ['Разбор по блокам', 'Block-by-block breakdown'],
  ['База «Референсы»: разобранные ролики из задания (шесть Holo, два Ryze, lisaworldverse) и из моей подборки.', 'The “References” database: videos analyzed from the brief (six Holo, two Ryze, lisaworldverse) and from my own selection.'],
  ['Блоки концепта', 'Concept blocks'],
  ['Блоки концепта «Монстры на рынке»: реплика, сцена, чем держит, и кадры референсов из роликов Holo и Ryze к каждому блоку.', 'Blocks of the “Monsters on the market” concept: the line, the scene, what holds attention, and reference frames from Holo and Ryze videos for each block.'],
  ['Голос аудитории', 'Voice of the audience'],
  ['Образы аудитории: три образа, в каждом — фразы покупателей дословно. Открыт «Специалист по рекламе», 8 фраз.', 'Audience personas: three personas, each with buyers’ phrases word for word. Shown: “Ad specialist”, 8 phrases.'],
  ['Монтажный стол концепта Ф1 «Ты же должен работать»: 34,9 с, блоки и кадры по секундам, справа реплика и что весомо. Эпизоды «Рыбалка» и «Стадион» собираются в том же формате.', 'The edit timeline of concept F1 “Shouldn’t you be at work?”: 34.9 s, blocks and frames by the second, with the line and what carries weight on the right. The “Fishing” and “Stadium” episodes are built in the same format.'],
  ['Закрыть', 'Close'],
  ['Ryze — тестовое задание — Арсений Охотин', 'Ryze — test task — Arseniy Okhotin'],
  ['Ролики', 'Videos'],
  ['Разбор', 'Breakdown'],
  ['Монтаж', 'Edit'],
  ['Скиллы', 'Skills'],
  ['Обо мне', 'About me'],
  ['ТЕСТОВОЕ_ЗАДАНИЕ', 'TEST_TASK'],
  ['ЧАСТИ_1–3', 'PARTS_1–3'],
  ['форматов: 9 из разобранных роликов, 5 под мои концепты', 'formats: 9 from analyzed videos, 5 for my concepts'],
  ['блока из роликов Holo, Ryze, lisaworldverse и моих концептов: хук, боль, демо, отзыв, призыв', 'blocks from Holo, Ryze and lisaworldverse videos and my concepts: hook, pain, demo, testimonial, call to action'],
  ['фраз: дословно от владельцев бизнеса и маркетологов', 'phrases, word for word, from business owners and marketers'],
  ['Концепты → форматы → сотня роликов', 'Concepts → formats → a hundred videos'],
  ['Когда роликов сотня, видно, какой хук и какой блок держат досмотр, и удачное переносится в следующие сценарии. Ниже сначала ролики по заданию, потом — как это устроено у меня в Notion, по шагам от формата до команды.', 'With a hundred videos you can see which hook and which block keep people watching, and what works carries over to the next scripts. Below are the videos for the brief first, then how it works in my Notion, step by step from format to team.'],
  ['Типичная структура сценария', 'Typical script structure'],
  ['Эмоциональный хук', 'Emotional hook'],
  ['+ промис', '+ promise'],
  ['Боль', 'Pain'],
  ['Пруф', 'Proof'],
  ['Страх', 'Fear'],
  ['Отработка возражений', 'Objection handling'],
  ['Результат', 'Result'],
  ['Срочность', 'Urgency'],
  ['Призыв к действию', 'Call to action'],
  ['История-отзыв', 'Testimonial story'],
  ['Один формат целиком, остальное — варианты разной глубины.', 'One format in full; the rest are variants at different depths.'],
  ['Изучил ролики Holo, в том числе победные в библиотеке рекламы Meta, и сделал варианты по их примеру.', 'I studied Holo’s videos, including winners in the Meta Ad Library, and made variants based on them.'],
  ['Чего здесь нет.', 'What’s not here.'],
  ['Большинство роликов Holo, которые я разобрал, — живые кадры с интерфейсом поверх. Экраны и цифры Ryze кладутся на монтаже, поэтому подробно интерфейс показан в первом формате и в «2099». В остальных концептах он подразумевается.', 'Most of the Holo videos I analyzed are live footage with the interface laid over it. Ryze’s screens and numbers go in during the edit, so the interface is shown in detail in the first format and in “2099”. In the other concepts it’s implied.'],
  ['«Ты же должен работать» — сценарий по секундам, раскадровка, кадры.', '“Shouldn’t you be at work?”: a second-by-second script, storyboard and frames.'],
  ['В сценарии видно, как хук переходит в историю и где появляется Ryze. Здесь аниматик: кадры раскадровки с титрами в таймингах сценария. Звука нет: голос и музыка добавляются при сборке ролика.', 'The script shows how the hook turns into the story and where Ryze comes in. This is an animatic: storyboard frames with captions timed to the script. There’s no sound: voice and music are added when the video is assembled.'],
  ['Ещё два эпизода этого формата, «Рыбалка» и «Стадион».', 'Two more episodes in this format, “Fishing” and “Stadium”.'],
  ['Меняется только место, монолог и экраны Ryze те же.', 'Only the location changes; the monologue and the Ryze screens stay the same.'],
  ['Хук с завязкой и переходом в историю.', 'A hook with a setup and a transition into the story.'],
  ['Сценка «Новости», три кадра. Прохожие смотрят в витрине новость «Black day for ad agencies». Владелец агентства в интервью жалуется, что клиент ушёл не к другому агентству. Маркетолог признаётся, что ушла она: рекламу теперь ведёт без агентства. Дальше её история: боль, страх, результат.', 'The “News” scene, three frames. Passers-by watch a TV in a shop window: “Black day for ad agencies”. In an interview, an agency owner complains that a client didn’t leave for another agency. A marketer admits she was the one who left: she now runs ads without an agency. Then her story: pain, fear, result.'],
  ['▶ Референс', '▶ Reference'],
  ['Хук с ребёнком и переход через отца.', 'A kid hook with a transition through the dad.'],
  ['Формат «Asking my kids what their dad does for a living»: мама снимает сына в машине. «What does your dad do for a living?» — «Hmm… He tells the computer approve. And computer makes the ads.» Папа на кухне: «So… I’m actually a marketer. A colleague told me about this AI tool for ads». Ролик останавливается на переходе, дальше — как в первом формате.', 'The “Asking my kids what their dad does for a living” format: a mom films her son in the car. “What does your dad do for a living?” “Hmm… He tells the computer approve. And computer makes the ads.” Dad in the kitchen: “So… I’m actually a marketer. A colleague told me about this AI tool for ads.” The video stops at the transition; from there it runs like the first format.'],
  ['Три формата, где показана только завязка.', 'Three formats shown as setups only.'],
  ['«Занят в неудобном месте». Референс по приёму, Holo: в салоне турбулентность и паника, а пилот спокойно занимается рекламой. Адаптация: пробка, сзади сигналят, а герой у окна машины спокойно рассказывает в камеру.', '“Busy in an awkward place”. Reference for the device, Holo: turbulence and panic in the cabin while the pilot calmly works on ads. Adaptation: a traffic jam, horns behind, and the hero at the car window calmly talks to the camera.'],
  ['«Палец вверх», по схеме победителя Holo.', '“Thumbs up”, built on a winning Holo ad.'],
  ['Референс: селфи в темноте, подпись в белой плашке, палец вверх. Адаптация: тот же ход, три кадра — удивление, палец, лайк.', 'Reference: a selfie in the dark, a caption in a white box, a thumbs up. Adaptation: the same move in three frames: surprise, thumb, like.'],
  ['«Танцуют на фоне», по схеме победителя Holo.', '“Dancing in the background”, built on a winning Holo ad.'],
  ['Референс: механик танцует в своём автосервисе, история и цифры идут плашками. Адаптация: маркетолог танцует в офисе, сначала история, потом цифры.', 'Reference: a mechanic dances in his garage while the story and numbers appear in caption boxes. Adaptation: a marketer dances in the office, story first, then numbers.'],
  ['Перенос чужого живого формата: «этот парень из 2099 года».', 'Adapting someone else’s live format: “this guy from 2099”.'],
  ['Один кадр из-за спины с подзумом на экран. На ноутбуке внутренний интерфейс Ryze: расходы по каналам и что он предлагает исправить. На телефоне три действия ждут подтверждения. Цифры на экранах демонстрационные.', 'One over-the-shoulder shot with a slow zoom into the screen. The laptop shows Ryze’s internal interface: spend by channel and what it suggests fixing. On the phone, three actions wait for approval. The numbers on the screens are demo values.'],
  ['▶ Оригинал', '▶ Original'],
  ['Живые ролики, отдельно. Пример — дед «Are you happy?».', 'Live-action videos, separately. Example: the grandpa “Are you happy?”.'],
  ['Оригинал и тот же план с другим человеком, новый текст под жесты оригинала. Кадры для показа техники, в рекламу идёт свой отснятый план той же схемы.', 'The original and the same shot with a different person, with new lines fitted to the original gestures. These frames show the technique; the ad itself uses our own footage shot to the same scheme.'],
  ['Выводы', 'Takeaways'],
  ['1. Главное — хук, дальше блоки.', '1. The hook comes first, then the blocks.'],
  ['После хука идёт обычная блоковая структура: промис, боль, пруф, страх, отработка возражений, результат, срочность, призыв к действию. Из блоков собираются концепты и форматы. Когда роликов много, по блокам копится статистика, и блоки можно ранжировать по тому, как они работают.', 'After the hook comes the usual block structure: promise, pain, proof, fear, objection handling, result, urgency, call to action. Concepts and formats are assembled from blocks. With many videos, stats build up per block, and blocks can be ranked by how they perform.'],
  ['2. В разобранных роликах держат эмоция, звук и картинка вместе.', '2. In the analyzed videos, emotion, sound and picture hold attention together.'],
  ['У Holo живой голос звучит с первой секунды, хук длится 3–5 секунд, у человека в кадре живая жестикуляция и мимика. Такая эмоция даёт доверие или интерес.', 'In Holo’s videos a live voice starts in the first second, the hook lasts 3–5 seconds, and the person on screen gestures and reacts naturally. That emotion builds trust or interest.'],
  ['3. Ходовой приём — хук и отзыв клиента историей.', '3. The go-to device is a hook followed by a customer testimonial told as a story.'],
  ['После хука клиент рассказывает свою историю: боли, страхи, как они закрылись, пруфы. Второй вариант — быстрый промис в первые секунды.', 'After the hook the customer tells their story: pains, fears, how they were resolved, proof. The other option is a quick promise in the first seconds.'],
  ['Про аналоги.', 'On look-alikes.'],
  ['Делать аналоги успешных роликов считаю нормальным, в рамках приемлемого копировать сработавшее не зазорно. Но я ими не ограничиваюсь: на аналогах развиваются приёмы, и потом сработавшие можно комбинировать между собой.', 'I think making look-alikes of successful videos is fine: within reason, there’s no shame in copying what worked. But I don’t stop there. Look-alikes are where devices develop, and the ones that work can then be combined.'],
  ['Живые ролики.', 'Live-action videos.'],
  ['Их важно пробовать. Чтобы сохранить эмоцию живого ролика, есть три способа:', 'They’re worth trying. There are three ways to keep the emotion of a live video:'],
  ['переснять по той же схеме;', 'reshoot it to the same scheme;'],
  ['снять живьём и потом заменить людей поверх, главное — сохранить эмоции;', 'shoot it live and replace the people afterwards, keeping the emotions;'],
  ['на каналах, где это допустимо, перегенерировать живой ролик.', 'on channels where it’s allowed, regenerate the live video.'],
  ['Чужой ролик идёт в рекламу только с лицензией автора и согласием человека в кадре.', 'Someone else’s video goes into an ad only with the creator’s license and the consent of the person on screen.'],
  ['Как из этого получается сотня роликов и где копится статистика по блокам — ниже, в разделах от «Формата» до «Скиллов».', 'How this turns into a hundred videos and where block stats build up is below, in the sections from “Format” to “Skills”.'],
  ['Формат — подача и точка зрения: тип съёмки и основная завязка. Уличное интервью с микрофоном, разговор двух знакомых, селфи, мокьюментари или их сочетание. Формат задаётся сразу, из него выходит первый концепт. В концепте «Ты же должен работать» герой отдыхает в рабочее время, друг спрашивает, почему он не на работе, и герой отвечает, что рекламу ведёт Ryze. В следующих эпизодах съёмка с одного места, вопрос друга и ответ героя остаются, меняются место и занятие: гриль, рыбалка, стадион.', 'A format is the angle and point of view: the shooting type and the core setup. A street interview with a mic, a chat between two friends, a selfie, a mockumentary, or a mix. The format is set first, and the first concept comes out of it. In the “Shouldn’t you be at work?” concept, the hero is relaxing during working hours, a friend asks why he isn’t at work, and he answers that Ryze runs his ads. In the next episodes the single camera position, the friend’s question and the hero’s answer stay; the place and the activity change: a barbecue, fishing, a stadium.'],
  ['Концепт — конкретный ролик: сценарий, референсы, кадры, материалы. По сути это ТЗ исполнителю. Переход, боль, демо продукта, отзыв и призыв меняются от концепта к концепту и от формата зависят слабо.', 'A concept is a specific video: script, references, frames, materials. In effect it’s the brief for whoever makes it. The transition, pain, product demo, testimonial and call to action change from concept to concept and depend little on the format.'],
  ['тип съёмки, точка зрения, завязка', 'shooting type, point of view, setup'],
  ['Концепт', 'Concept'],
  ['сценарий, референсы, кадры', 'script, references, frames'],
  ['Блоки', 'Blocks'],
  ['хук, боль, демо, отзыв, призыв', 'hook, pain, demo, testimonial, CTA'],
  ['Материал', 'Asset'],
  ['смонтированный ролик', 'edited video'],
  ['Релиз', 'Release'],
  ['выход в Instagram, YouTube, TikTok', 'published on Instagram, YouTube, TikTok'],
  ['KPI-факты', 'KPI facts'],
  ['просмотры, удержание 3 с, досмотр, клики', 'views, 3 s hold, completion, clicks'],
  ['KPI-карточки', 'KPI cards'],
  ['сводка по релизам', 'summary by release'],
  ['← Блок', '← Block'],
  ['какой хук держит первые секунды', 'which hook holds the first seconds'],
  ['← Концепт', '← Concept'],
  ['какой ролик снимать вариантами', 'which video to shoot in variants'],
  ['← Формат', '← Format'],
  ['раскатывать, доработать или закрыть', 'scale, rework or close'],
  ['Метрики релиза возвращаются в блок, концепт и формат. Задачи и проекты — рамка вокруг, на схеме не показаны.', 'Release metrics go back into the block, the concept and the format. Tasks and projects are the frame around this and aren’t shown on the diagram.'],
  ['Когда роликов сотня, у каждого блока копится статистика. График удержания показывает, на каком блоке зрители уходят, а хук проверяется двумя версиями одного ролика с разным началом. Блок, который выиграл такое сравнение, переходит в новые сценарии. Связи между базами уже есть, цифры ниже пока демонстрационные.', 'With a hundred videos, every block builds up stats. The retention graph shows at which block viewers drop off, and a hook is tested with two versions of the same video with different openings. The block that wins goes into new scripts. The links between the databases are already in place; the numbers below are demo values for now.'],
  ['Ролик-референс раскладываю по функциям фраз: хук, переход, боль, демо, отзыв, призыв. Блок уходит в базу с репликой, приёмом и тем, чем он держит. Шесть роликов Holo, два ролика Ryze и ролик lisaworldverse из задания дали 60 блоков, мои концепты — ещё 14.', 'I break a reference video down by what each line does: hook, transition, pain, demo, testimonial, call to action. Each block goes into the database with its line, its device and what holds attention. Six Holo videos, two Ryze videos and the lisaworldverse video from the brief gave 60 blocks; my concepts added 14 more.'],
  ['Из повторов складываются устоявшиеся приёмы. Все хуки в разобранных роликах бьют в эмоцию. История идёт через личный опыт героя, как отзыв. Что хук должен вызывать эмоцию или доверие, пока гипотеза, её проверят следующие ролики. Завязки хуков растут из голоса аудитории: 29 фраз о боли, страхе перед ИИ и о том, с чего человек начинает искать сервис. Фразы разложены по трём образам покупателя, один из них — специалист по рекламе.', 'Repeats turn into established devices. Every hook in the analyzed videos goes for emotion. The story comes through the hero’s personal experience, like a testimonial. That a hook should trigger emotion or trust is still a hypothesis; the next videos will test it. Hook setups grow out of the voice of the audience: 29 phrases about pain, fear of AI and what makes a person start looking for a service. The phrases are sorted into three buyer personas; one of them is an ad specialist.'],
  ['Монтажный стол', 'Edit timeline'],
  ['Сценарий собирается на таймлайне: блоки по секундам, у каждого плана кадр начала и кадр конца, отдельные дорожки для референсов и для варианта Б. Длина реплик рассчитана по темпу речи в референсах: в среднем 3,4 слова в секунду.', 'The script is assembled on a timeline: blocks by the second, a start frame and an end frame for every shot, separate tracks for references and for variant B. Line length is based on the speech rate in the references: 3.4 words per second on average.'],
  ['Скиллы и команда', 'Skills and the team'],
  ['Скилл — инструкция для модели, которая связывает базу знаний с конкретной задачей. Когда модель собирает следующий сценарий, скилл подаёт ей блоки и приёмы из базы. Когда появятся живые метрики, первыми пойдут блоки с лучшими цифрами.', 'A skill is an instruction for the model that connects the knowledge base to a specific task. When the model builds the next script, the skill feeds it blocks and devices from the base. Once live metrics come in, the blocks with the best numbers will go first.'],
  ['Скиллы команды ведутся через GitHub. Монтажёры, дизайнеры и AI-креаторы правят свои скиллы и собирают эталоны, каждая правка идёт отдельным изменением с причиной, её видит вся команда и можно откатить. Раз в неделю я или руководители читаем правки и решаем, какая правка становится стандартом. Приём проходит три уровня: рабочее, устоялось, правило.', 'The team’s skills live in GitHub. Editors, designers and AI creators edit their own skills and collect reference examples. Every edit is a separate change with a reason, visible to the whole team and easy to roll back. Once a week I or the leads review the edits and decide which one becomes the standard. A device goes through three levels: working, established, rule.'],
  ['Постановку задач и приёмку ведут те же скиллы, к ним можно подключить аналитику. В RAWMID после стандартов на типовую задачу приходилось 0,7 правки вместо 2,4 —', 'The same skills handle briefing and sign-off, and analytics can be connected to them. At RAWMID, after the standards, a typical task needed 0.7 revisions instead of 2.4 —'],
  ['кейс «Стандарты»', 'the “Standards” case'],
  ['Сбор референсов', 'Collecting references'],
  ['Разбор ролика по блокам', 'Breaking a video into blocks'],
  ['Концепт от голоса аудитории', 'Concept from the voice of the audience'],
  ['Кадры планов', 'Shot frames'],
  ['Приёмы исполнения', 'Craft techniques'],
  ['Проверка гипотезы', 'Hypothesis testing'],
  ['Вывод → правило для всех', 'Takeaway → rule for everyone'],
  ['Креативный директор. Строю систему, на которой команда выпускает много роликов и видит, что из них работает.', 'Creative director. I build the system a team uses to ship many videos and see which of them work.'],
  ['Кейс', 'Case'],
  [': от данных к кадрам и метрикам. На нём собраны', ': from data to frames and metrics. It was used to build'],
  ['и', 'and'],
  ['Честно об опыте', 'My experience, honestly'],
  ['С ИИ работаю четыре года, последние два с лишним — каждый день. Нейросетевых роликов сделал немного. В этом задании пройдены шаги до монтажного стола, генерацию видео и липсинк не делал.', 'I’ve worked with AI for four years, every day for the last two-plus. I haven’t made many AI videos yet. This task goes as far as the edit timeline; I didn’t do video generation or lip-sync.'],
  ['Продакшен с командой', 'Production with a team'],
  ['RAWMID: команда 10+ человек, гайд по съёмке,', 'RAWMID: a team of 10+, a shooting guide,'],
  ['видео', 'video'],
  ['Постоянно разбираю чужие подачи. Базу блоков выше собрал так же.', 'I break down other people’s ads all the time. The block database above was built the same way.'],
  ['Знания остаются в компании', 'Knowledge stays in the company'],
  ['Правило, найденное на одном ролике, записано в базу и скилл. Его повторяет любой в команде, и оно не уходит вместе с человеком.', 'A rule found on one video is written into the base and the skill. Anyone on the team can repeat it, and it doesn’t leave with the person.'],
  ['Портфолио', 'Portfolio'],
  ['Все кейсы', 'All cases'],
  ['на этом сайте. Сайт тоже сделал сам.', 'on this site. I built the site myself too.'],
  ['Слайд', 'Slide'],
  ['Референс', 'Reference'],
  ['Кадр', 'Frame'],
];
const D = new Map(T);
const tr = s => {
  const k = s.trim();
  if (!D.has(k)) return s;
  return s.slice(0, s.indexOf(k)) + D.get(k) + s.slice(s.indexOf(k) + k.length);
};

// Атрибуты — везде, включая html-строки внутри скриптов.
h = h.replace(/\b(alt|aria-label|title|content|data-t|placeholder)="([^"]*)"/g, (m, a, v) => `${a}="${tr(v)}"`);
// Текстовые узлы и строки в одинарных кавычках внутри <script>; <style> не трогаем.
h = h.replace(/(<script\b[\s\S]*?<\/script>)|(<style\b[\s\S]*?<\/style>)|>([^<]+)(?=<)/g, (m, sc, st, txt) => {
  if (sc) return sc.replace(/'(Слайд|Референс|Кадр)( ?)'/g, (q, s, sp) => `'${D.get(s)}${sp}'`)
    .replace(/'([^'\n]*[А-Яа-яЁё][^'\n]*)'/g, (q, s) => `'${tr(s)}'`);
  if (st) return st;
  return `>${tr(txt)}`;
});

h = h.replace('<html lang="ru"', '<html lang="en"')
  .replace('https://okhotin.site/p/ryze-7q4m.html', 'https://okhotin.site/p/ryze-7q4m-en.html')
  .replace(/href="\.\.\/work\/([\w-]+\.html)"/g, (m, f) => existsSync(join(root, 'en/work', f)) ? `href="../en/work/${f}"` : m)
  .replace(/href="\.\.\/index\.html"/g, 'href="../en/index.html"');

writeFileSync(join(root, 'p/ryze-7q4m-en.html'), h);

const visible = h.replace(/<!--[\s\S]*?-->/g, '').replace(/<style\b[\s\S]*?<\/style>/g, '')
  .replace(/<script\b[\s\S]*?<\/script>/g, s => s.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/[^\n]*/g, ''));
const left = [...new Set(visible.match(/[^<>"'\n]*[А-Яа-яЁё][^<>"'\n]*/g) || [])].map(s => s.trim());
console.log('written p/ryze-7q4m-en.html; untranslated:', left.length);
left.forEach(s => console.log(' - ' + s.slice(0, 120)));
