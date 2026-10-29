const fs=require('fs'),cp=require('child_process'),path=require('path');
const qa=__dirname, mode=process.argv[2]||'before';
function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);}
const pages=walk('v2').filter(p=>p.endsWith('.html')).map(p=>p.replaceAll('\\','/'));
const source=fs.readFileSync(path.join(qa,process.argv[3]||'07-measure.js'),'utf8').replace('__PAGES__',JSON.stringify(pages));
const r=cp.spawnSync(process.execPath,['E:/DevCache/npm/_npx/31e32ef8478fbf80/node_modules/@playwright/cli/playwright-cli.js','-s=night07','run-code',source],{encoding:'utf8',maxBuffer:5*1024*1024});
fs.writeFileSync(path.join(qa,`07-${mode}.log`),r.stdout+r.stderr);
const m=r.stdout.match(/### Result\s*([\s\S]*?)\s*### Ran Playwright code/);
if(!m)throw Error(r.stdout+r.stderr);
const data=JSON.parse(m[1]);fs.writeFileSync(path.join(qa,`07-${mode}.json`),JSON.stringify(data,null,2)+'\n');
console.log(JSON.stringify(data));
