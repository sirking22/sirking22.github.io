const fs=require('fs'), path=require('path');
const base='.codex-context/run-1030/';
// Start from the committed skeleton so the ledger is complete on each run.
const cp=require('child_process');
for(const file of walk('v2/en'))fs.writeFileSync(file,cp.execFileSync('git',['-c','safe.directory=C:/Users/Arseniy/AppData/Local/Temp/wt-showcase-v2','show','92699f438dc787ea33fa3a3470574ea56d6e9ffe:'+file],{encoding:'utf8',maxBuffer:1000000}));
const norm=s=>s.replace(/\s+/g,' ').trim();
const live=fs.readFileSync('en/index.html','utf8');
const pairs=JSON.parse(fs.readFileSync('.codex-context/night-1030/qa/09-pairs.json','utf8'));
const verbatim=new Map(pairs.map(p=>[norm(p.ru),p.en]));
const ruLive=fs.readFileSync('index.html','utf8');
for(const attr of ['data-caption','data-alt']){
 const extract=s=>[...s.matchAll(/<button\b[^>]*class="sys-step[^>]*>/g)].map(m=>m[0].match(new RegExp(attr+'="([^"]*)"'))?.[1]);
 const a=extract(ruLive),b=extract(live);a.forEach((s,i)=>{if(s&&b[i])verbatim.set(norm(s),b[i]);});
}
verbatim.set('Быстро осваиваюсь в новой нише, нахожу рабочие форматы и наращиваю показатели бизнеса.','I get up to speed in a new niche fast, find the formats that work and grow the business numbers.');
verbatim.set('Норма по каждому типу работы посчитана по истории. Часы или круги правок выше нормы — сигнал.','The standard for each type of work is calculated from its own history. Hours or revision rounds above it are a signal.');
verbatim.set('Визуальный язык проиллюстрировал и масштабировал на упаковку, мерч и материалы.','Illustrated the visual language and scaled it across packaging, merch and marketing materials.');
const dictionary=`
источник|source
упаковка и мерч|packaging and merch
год|year
Основная навигация|Main navigation
Работы|Work
Метод|Method
Инфо|Info
Заявление|Statement
Фильтр по дисциплинам|Filter by discipline
Все|All
Работ: 12|Works: 12
Работ|Works
Другие работы|Other work
Все кадры работы|All project frames
следующая работа →|next work →
Смотреть на Behance ↗|View on Behance ↗
ещё по упаковке ↗|more packaging work ↗
Страница не найдена|Page not found
01 / О себе|01 / About
02 / По дисциплинам|02 / By discipline
04 / Опыт|04 / Experience
05 / Метрики|05 / Metrics
01 / Инсайт|01 / Insight
02 / Идея|02 / Idea
03 / Исполнение|03 / Execution
04 / Результат|04 / Result
01 / Бренд-платформа|01 / Brand platform
03 / Рекламные кампании и виды постов|03 / Ad campaigns and post types
04 / Карточки товаров|04 / Product cards
05 / Упаковка и мерч|05 / Packaging and merch
06 / До и после|06 / Before and after
01 / Почему горят сроки и кто перегружен?|01 / Why are deadlines slipping and who is overloaded?
02 / Сколько на самом деле стоит единица контента?|02 / How much does a piece of content actually cost?
03 / Что выходит на неделе и где опубликовано?|03 / What is going out this week and where has it been published?
04 / Что сработало и что масштабировать?|04 / What worked and what should be scaled?
05 / На чём основаны идеи?|05 / What are the ideas based on?
Команда in-house, работа в Notion|In-house team, working in Notion
Гайды и стандарт съёмки|Guides and shoot standards
ИИ в продакшене|AI in production
CTR карточек|Product-card CTR
Арт-дирекшн|Art direction
Айдентика|Identity
Упаковка|Packaging
Веб|Web
Фирменные стили|Brand identities
Система Notion|Notion system
Имя|Imya
Кресло-читалка|Kreslo-chitalka
КРЕСЛО-ЧИТАЛКА|KRESLO-CHITALKA
ИМЯ|IMYA
АЙДЕНТИКА|IDENTITY
ФИРМЕННЫЕ СТИЛИ|BRAND IDENTITIES
ПЕРФОРМАНС-КРЕАТИВ|PERFORMANCE CREATIVE
РЕКЛАМНЫЙ КОНЦЕПТ|ADVERTISING CONCEPT
ПРИЛОЖЕНИЕ|APP
ВИДЕО-ВИЗУАЛ|VIDEO VISUALS
УПАКОВКА|PACKAGING
Арсений Охотин|Arseniy Okhotin
Креативный директор|Creative director
фирменный стиль|brand identity
видео-визуал|video visuals
приложение|app
ребрендинг|rebranding
перформанс-креатив|performance creative
рекламный концепт|advertising concept
упаковка|packaging
концепт, не заказ|concept, not commissioned
концепт|concept
не заказ|not commissioned
название|name
дисциплина|discipline
роль|role
команда|team
инсайт, текст позже|insight, text to follow
идея одной фразой, текст позже|idea in one sentence, text to follow
исполнение, текст позже|execution, text to follow
результат, текст позже|result, text to follow
кадры позже|frames to follow
текст позже|text to follow
описание позже|description to follow
опыт и результаты|experience and results
цитата владельца — выбор позже|owner quote — selection to follow
Варианты|Variants
Критерий выбора|Selection criterion
Почему этот|Why this one
до и после; отвергнутые варианты — позже|before and after; rejected variants to follow
критерий выбора, текст позже|selection criterion, text to follow
почему этот, текст позже|why this one, text to follow
логотип до и после обновления, шрифты, паттерны — позже|logo before and after the update, typefaces, patterns to follow
пример этапа уточнить|stage example to be confirmed
Ищу роль|Looking for a
креативного|creative director
директора ↗|role ↗
Арсений Охотин / источник, год|Arseniy Okhotin / source, year
видео:|video:
снимает владелец|to be recorded by the owner
Аудитория|Audience
Стратегия конкурентов|Competitor strategy
Контент-календарь на месяц|Monthly content calendar
Задачи с отклонением часов от нормы, в %|Tasks with hours deviating from the standard, in %
Путь одного решения|The path of one decision
«Артефакты»: материалы с охватом и метриками|“Artifacts”: materials with reach and metrics
Команда до и после системы|Team before and after the system
Таблица Notion с задачами, часами и сроками по сотрудникам|Notion table with tasks, hours and deadlines by team member
Таблица Notion с типами работ, временем и числом правок|Notion table with work types, time and revision counts
Таблица продакшна в Notion с исполнителями, статусами и сроками|Notion production table with owners, statuses and deadlines
Таблица релизов с каналами, датами и метриками|Release table with channels, dates and metrics
Таблица метрик со значениями, периодами и источниками|Metrics table with values, periods and sources
Таблица аудитории в Notion|Audience table in Notion
Таблица конкурентов в Notion|Competitor table in Notion
Таблица задач аудитории с контекстом и ожидаемым результатом|Audience jobs table with context and desired outcome
Таблица идей с описаниями и статусами|Ideas table with descriptions and statuses
Карточка Notion с двумя кадрами и разбором света и тени|Notion card with two frames and a breakdown of light and shadow
Схема этапов принятия решения с соединяющими стрелками|Diagram of decision-making stages with connecting arrows
Четыре карточки Signal, Decision, Production и Proof, соединённые кольцом|Four cards, Signal, Decision, Production and Proof, connected in a loop
Коллаж фотографий техники, блюд и раскадровок RAWMID|Collage of RAWMID appliance photos, dishes and storyboards
Коробки техники RAWMID с разными макетами упаковки|RAWMID appliance boxes with different packaging layouts
Ряд коробок техники RAWMID с общим оформлением|Row of RAWMID appliance boxes with a shared design
Макеты постов RAWMID с фотографиями продуктов и рецептов|RAWMID post layouts with product photos and recipes
RAWMID: видео до и после|RAWMID: video before and after
RAWMID: видеоматериалы|RAWMID: video materials
RAWMID Клуб: день 3 из 7|RAWMID Club: day 3 of 7
RAWMID Клуб: рецепт зелёного смузи|RAWMID Club: green smoothie recipe
RAWMID Клуб: шаг приготовления в блендере|RAWMID Club: blender preparation step
Dyson V15: уличный щит вечером, зелёный лазер на полу|Dyson V15: outdoor billboard in the evening, green laser on the floor
Dyson V15: уличный щит|Dyson V15: outdoor billboard
Dyson V15: лайтбокс у остановки|Dyson V15: lightbox at a bus stop
Dyson V15: пост 4:5|Dyson V15: 4:5 post
Dyson V15: сторис 9:16|Dyson V15: 9:16 story
Dyson V15: шапка рассылки|Dyson V15: newsletter header
Dyson V15: баннер 3:1|Dyson V15: 3:1 banner
Жёлтая жестяная коробка Scandic с рисунками|Yellow Scandic tin box with illustrations
Голубая жестяная коробка Scandic с рисунками|Light blue Scandic tin box with illustrations
Синяя жестяная коробка Scandic с неоновыми рисунками|Blue Scandic tin box with neon illustrations
Красная коробка Scandic с логотипом МТС|Red Scandic box with the MTS logo
Открытая коробка Scandic с надписью VK Fest 2024|Open Scandic box with VK Fest 2024 lettering
Коробка Scandic на столе рядом с кофейным стаканом и ключами|Scandic box on a table next to a coffee cup and keys
Плакат Karuna «Проверь прежде чем отвечать»|Karuna poster “Check before you answer”
Плакат Karuna с входящим звонком на экране телефона|Karuna poster with an incoming call on a phone screen
Жёлтый контур и белая надпись на тёмном фоне|Yellow outline and white lettering on a dark background
Сиреневый знак и надпись Yajevika на белом фоне|Lilac symbol and Yajevika lettering on a white background
Фирменный стиль: граффити|Brand identity: graffiti
Фирменный стиль: облака|Brand identity: clouds
Бирюзовый логотип «Кресло читалка» и эмблема с книгой|Turquoise “Kreslo chitalka” logo and an emblem with a book
Схема миссии, ценностей и аудитории детского проекта|Diagram of a children's project's mission, values and audience
Бирюзовые и золотистые рекламные баннеры с фотографиями|Turquoise and gold advertising banners with photos
Золотистая и бирюзовая палитры и образцы шрифтов|Gold and turquoise palettes and type samples
Золотистые пиктограммы и повторяющиеся узоры|Gold pictograms and repeating patterns
Блокноты, сумка, значки и канцелярские принадлежности с эмблемами|Notebooks, a bag, badges and stationery with emblems
Круглые эмблемы, пиктограммы и цветные паттерны|Round emblems, pictograms and coloured patterns
Коллаж фотографий детей и бирюзовый логотип «Кресло читалка»|Collage of children's photos and a turquoise “Kreslo chitalka” logo
Схема цикла AI и база опыта: от брифа до сохранения опыта|AI cycle diagram and experience base: from brief to retaining experience
Схема цикла AI и база опыта|AI cycle diagram and experience base
Схема шести этапов видеофона и кадр сцены «Синяя птица»|Diagram of six video backdrop stages and a frame of the “Blue Bird” stage
Серый автомобиль с жёлтыми панелями: профиль, два ракурса и приборная панель|Grey car with yellow panels: profile, two angles and dashboard
Вариант автомобиля B: кузов и салон в четырёх видах|Car variant B: exterior and interior in four views
Вариант автомобиля C: кузов и салон в четырёх видах|Car variant C: exterior and interior in four views
Вариант автомобиля D: кузов и салон в четырёх видах|Car variant D: exterior and interior in four views
Нормы часов RAWMID по типам задач и гайд обложки YouTube|RAWMID standard hours by task type and a YouTube thumbnail guide
Таблица типовых задач RAWMID и блок «Опыт внутри задачи»|RAWMID standard tasks table and an “Experience within the task” section
AI в каждом цикле|AI in every cycle
типовые процессы × AI × база знаний|standard processes × AI × knowledge base
чистка артефактов|artifact cleanup
рабочий прототип|working prototype
Опыт внутри задачи|Experience within the task
Шаги, правила и примеры хранятся в типовой задаче и достаются каждому, кто её берёт.|Steps, rules and examples are stored in the standard task and are available to everyone who takes it on.
продакшн и AI-пайплайны|production and AI pipelines
бриф|brief
промт и статика|prompt and still images
согласование|approval
сохранение опыта|retaining experience
`;
const dict=new Map(dictionary.trim().split('\n').map(s=>s.split('|')));
const substitutions=[...dict].sort((a,b)=>b[0].length-a[0].length);
const translated=[],reused=[];
function tr(source,file){
 const n=norm(source); if(!/[А-Яа-яЁё]/.test(n))return source;
 if(verbatim.has(n)){const en=verbatim.get(n);if(!live.includes(en))throw Error('Missing live string '+en);reused.push({file,ru:n,en});return en;}
 let result=dict.get(n);
 if(!result){result=n;for(const [ru,en] of substitutions)result=result.split(ru).join(en);}
 if(/[А-Яа-яЁё]/.test(result))throw Error('Untranslated: '+file+' '+n+' => '+result);
 translated.push({file,ru:n,en:result});return result;
}
const ledger=JSON.parse(fs.readFileSync('.codex-context/night-1030/qa/09-text-ledger.json','utf8'));
function original(file,inner){const entry=ledger.placeholders.find(p=>p.file===file&&norm(p.ru.replace(/[\[\]]/g,''))===inner);return entry?.ru||inner;}
function walk(d){return fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(d+'/'+e.name):e.name.endsWith('.html')?[d+'/'+e.name]:[]);}
// The AI page and tile were populated by package 11 after the English skeleton.
const ai='v2/en/work/ai-pipeline.html';
let old=fs.readFileSync(ai,'utf8'),ru=fs.readFileSync('v2/work/ai-pipeline.html','utf8');
let section=ru.slice(ru.indexOf('<main>'),ru.indexOf('</main>')+7);
section=section.replace(/src="\.\.\/assets\//g,'src="../../assets/');
section=section.replace(/(alt|aria-label)="([^"]*)"/g,(_,a,s)=>`${a}="${tr(s,ai)}"`);
section=section.replace(/>([^<>]+)</g,(_,s)=>'>'+tr(s,ai)+'<');
old=old.replace(/<main>[\s\S]*?<\/main>/,section);fs.writeFileSync(ai,old);
const home='v2/en/index.html';let h=fs.readFileSync(home,'utf8');
const tile=ru=>ru.match(/<a class="tile(?: later)?" href="work\/ai-pipeline.html"[\s\S]*?<\/a>/)[0];
let t=tile(fs.readFileSync('v2/index.html','utf8'));
t=t.replace('src="assets/','src="../assets/').replace(/(alt|aria-label)="([^"]*)"/g,(_,a,s)=>`${a}="${tr(s,home)}"`).replace(/>([^<>]+)</g,(_,s)=>'>'+tr(s,home)+'<');
h=h.replace(tile(h),t);fs.writeFileSync(home,h);
for(const file of walk('v2/en')){
 let s=fs.readFileSync(file,'utf8');
 s=s.replace(/\[EN: ([^\]]*)\]/g,(_,inner)=>tr(original(file,inner),file));
 fs.writeFileSync(file,s);
}
fs.writeFileSync(base+'qa/12-translations.json',JSON.stringify({translated,reused},null,2)+'\n');
const unique=[...new Map(translated.map(t=>[t.file+'\0'+t.ru,t])).values()];
const esc=s=>s.replaceAll('|','\\|').replaceAll('\n',' ');
fs.appendFileSync(base+'plan-2026-10-30-b.md','\n## Package 12-en — переводы для проверки владельцем\n\nРусские источники — соответствующие страницы `v2/`. Скобки исходных плейсхолдеров сохранены; текст внутри растровых кадров не менялся. Опубликованные переводы из `en/index.html` использованы дословно и в таблицу новых переводов не включены; полный журнал — `qa/12-translations.json`. Повторяющиеся строки внутри одной страницы перечислены один раз.\n\n| Страница | RU — источник | EN — перевод |\n|---|---|---|\n'+unique.map(t=>`| \`${t.file}\` | ${esc(t.ru)} | ${esc(t.en)} |`).join('\n')+'\n');
console.log(JSON.stringify({pages:walk('v2/en').length,newStrings:unique.length,translatedOccurrences:translated.length,reusedOccurrences:reused.length}));
