const fs=require('node:fs'),path=require('node:path'),cp=require('node:child_process');
function walk(d){return fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(d,e.name)):e.name.endsWith('.html')?[path.join(d,e.name).replaceAll('\\','/')]:[]);}
const pages=walk('v2'),qa=__dirname,cli='E:/DevCache/npm/_npx/31e32ef8478fbf80/node_modules/@playwright/cli/playwright-cli.js';
// Reuse the full package-04 media/link checks, expanding to both languages and drafts.
let code=fs.readFileSync(path.join(qa,'04-qa-check.js'),'utf8');
code=code.replace(/const paths = .*?;\r?\n/,`const paths = ${JSON.stringify(pages.map(p=>p.slice(3)))};\n`)
 .replace('route => route.continue()',"route => new URL(route.request().url()).hostname === '127.0.0.1' ? route.continue() : route.fulfill({status:204,body:''})")
 .replace("if (path === 'case-rawmid-style.html' || path === 'work/rawmid-packaging.html')", "if (/case-rawmid-style|rawmid-packaging/.test(path))")
 .replace("if(path === 'index.html') {", "if(path === 'index.html' || path === 'en/index.html') {")
 .replace('qa/04-index-${width}.png','qa/10-${path.startsWith("en/")?"en":"ru"}-index-${width}.png')
 .replace("if(path === 'index.html') doc.querySelectorAll", "if(path === 'index.html' || path === 'en/index.html') doc.querySelectorAll")
 .replace("let current = tilePaths[0]; const chain = [];", "const groups = [tilePaths.filter(p=>!p.startsWith('en/')), tilePaths.filter(p=>p.startsWith('en/'))]; const cycles=groups.map(group=>{let current=group[0]; const chain=[]; while(current&&!chain.includes(current)){chain.push(current);current=edges[current];}return {chain,end:current,exactCycle:chain.length===group.length&&current===group[0]&&group.every(p=>chain.includes(p))};}); let current = tilePaths[0]; const chain = [];")
 .replace('return {checks,edges,tilePaths,chain,end:current,exactCycle:', 'return {checks,edges,tilePaths,cycles,chain,end:current,exactCycle:');
fs.writeFileSync(path.join(qa,'10-browser.js'),code);
const width=Number(process.argv[2]);
function run(args){const r=cp.spawnSync(process.execPath,[cli,'-s=night10',...args],{encoding:'utf8',maxBuffer:20*1024*1024});if(r.error)throw r.error;return r;}
const size=run(['resize',String(width),'1080']);if(size.status)throw Error(size.stdout+size.stderr);
const r=run(['run-code',code]);fs.writeFileSync(path.join(qa,`10-results-${width}.log`),r.stdout+r.stderr);
const m=r.stdout.match(/### Result\s*([\s\S]*?)\s*### Ran Playwright code/);if(!m)throw Error(r.stdout+r.stderr);
const data=JSON.parse(m[1]);
data.passed=data.rows.length===pages.length&&data.rows.every(r=>!r.overflow&&!r.errors.length&&!r.failed.length&&!r.unsafeExternal.length&&r.images.every(i=>i.ok)&&r.videos.every(v=>v.ok&&v.playback)&&r.posters.every(p=>p.ok)&&r.filters.every(f=>f.match&&f.total===12&&f.counter===12&&f.pressed==='true'&&!f.overflow&&f.status.endsWith(String(f.actual))))&&data.links.checks.every(c=>c.status===200&&c.anchor)&&data.links.cycles.every(c=>c.exactCycle);
fs.writeFileSync(path.join(qa,`10-results-${width}.json`),JSON.stringify(data,null,2)+'\n');
console.log(JSON.stringify({width,passed:data.passed,rows:data.rows.length,images:data.rows.reduce((n,r)=>n+r.images.length,0),videos:data.rows.reduce((n,r)=>n+r.videos.length,0),links:data.links.checks.length,cycles:data.links.cycles,defects:data.rows.filter(r=>r.overflow||r.errors.length||r.failed.length||r.unsafeExternal.length||r.images.some(i=>!i.ok)||r.videos.some(v=>!v.ok||!v.playback)),badLinks:data.links.checks.filter(c=>c.status!==200||!c.anchor)},null,2));
