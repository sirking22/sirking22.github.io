const fs = require('node:fs');
const {spawnSync} = require('node:child_process');
const width = Number(process.argv[2]);
const cli = 'E:/DevCache/npm/_npx/31e32ef8478fbf80/node_modules/@playwright/cli/playwright-cli.js';
const resize = spawnSync(process.execPath, [cli, '-s=night04', 'resize', String(width), '1080'], {encoding:'utf8'});
if(resize.status) throw new Error(resize.stdout + resize.stderr);
const code = fs.readFileSync(`${__dirname}/04-qa-check.js`, 'utf8');
const run = spawnSync(process.execPath, [cli,'-s=night04','run-code',code], {encoding:'utf8',maxBuffer:10*1024*1024});
fs.writeFileSync(`${__dirname}/04-results-${width}.log`,run.stdout+run.stderr);
const match=run.stdout.match(/### Result\s*([\s\S]*?)\s*### Ran Playwright code/);
if(!match) {process.stdout.write(run.stdout+run.stderr);process.exit(1);}
const data=JSON.parse(match[1]);
fs.writeFileSync(`${__dirname}/04-results-${width}.json`,JSON.stringify(data,null,2)+'\n');
console.log(JSON.stringify({width,rows:data.rows.map(r=>({path:r.path,overflow:r.overflow,images:r.images.filter(i=>!i.ok),videos:r.videos,posters:r.posters.filter(i=>!i.ok),errors:r.errors,failed:r.failed,unsafe:r.unsafeExternal,filters:r.filters})),linksFailed:data.links.checks.filter(c=>c.status!==200||!c.anchor),chain:data.links}));
