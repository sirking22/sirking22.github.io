const fs=require('fs'),path=require('path'),cp=require('child_process');
const qa=__dirname;
function walk(d){return fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(d,e.name)):e.name.endsWith('.html')?[path.join(d,e.name).replaceAll('\\','/')]:[]);}
const pages=walk('v2/en'), defects=[];let links=0,switches=0,placeholders=0;
for(const file of walk('v2')){
 const s=fs.readFileSync(file,'utf8');if(!s.includes('class="language-switch"'))defects.push('switch '+file);else switches++;
 if(!file.startsWith('v2/en/'))continue;
 placeholders+=(s.match(/\[EN:/g)||[]).length;
 for(const required of ['lang="en"','name="viewport"','rel="canonical"','111837200','property="og:image"'])if(!s.includes(required))defects.push(file+' missing '+required);
 const original=fs.readFileSync(file.replace('v2/en/','v2/'),'utf8');
 for(const tag of ['img','video','iframe','figure']){const re=new RegExp('<'+tag+'\\b','g');if((s.match(re)||[]).length!==(original.match(re)||[]).length)defects.push('media structure '+file+' '+tag);}
 for(const m of s.matchAll(/\b(?:href|src|poster)="([^"]+)"/g)){
 const v=m[1];if(/^(https?:|mailto:|tel:|data:|#)/.test(v))continue;
 const p=path.resolve(path.dirname(file),decodeURIComponent(v.split(/[?#]/)[0]));links++;if(!fs.existsSync(p))defects.push(file+' -> '+v);
 }
}
const code=fs.readFileSync(path.join(qa,'09-browser.js'),'utf8').replace('__PAGES__',JSON.stringify(pages));
const r=cp.spawnSync(process.execPath,['E:/DevCache/npm/_npx/31e32ef8478fbf80/node_modules/@playwright/cli/playwright-cli.js','-s=night09','run-code',code],{encoding:'utf8',maxBuffer:12*1024*1024});
fs.writeFileSync(path.join(qa,'09-browser.log'),r.stdout+r.stderr);
const m=(r.stdout||'').match(/### Result\s*([\s\S]*?)\s*### Ran Playwright code/);if(!m)throw Error(r.stdout+r.stderr+String(r.error));
const data=JSON.parse(m[1]);
data.static={pages:pages.length,switches,localReferences:links,placeholders,defects};data.passed=!defects.length&&!data.errors.length&&!data.failedRequests.length&&data.ruStatus==='Работ: 5'&&data.ruAllStatus==='Работ: 12'&&data.views.every(v=>v.status===200&&v.lang==='en'&&v.overflow===0&&!v.broken.length&&!v.unwrapped.length&&v.switch.length===1);
fs.writeFileSync(path.join(qa,'09-verification.json'),JSON.stringify(data,null,2)+'\n');
console.log(JSON.stringify({passed:data.passed,static:data.static,errors:data.errors,failed:data.failedRequests,views:data.views.filter(v=>v.overflow||v.broken.length),filters:data.filters},null,2));
