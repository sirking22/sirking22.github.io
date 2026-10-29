const fs=require('fs'),cp=require('child_process'),path=require('path');
const source=fs.readFileSync(path.join(__dirname,'08-browser.js'),'utf8');
const r=cp.spawnSync(process.execPath,['E:/DevCache/npm/_npx/31e32ef8478fbf80/node_modules/@playwright/cli/playwright-cli.js','-s=night08','run-code',source],{encoding:'utf8',maxBuffer:8*1024*1024});
fs.writeFileSync(path.join(__dirname,'08-browser.log'),r.stdout+r.stderr);
const m=r.stdout.match(/### Result\s*([\s\S]*?)\s*### Ran Playwright code/);
if(!m)throw Error(r.stdout+r.stderr);
const data=JSON.parse(m[1]);fs.writeFileSync(path.join(__dirname,'08-browser.json'),JSON.stringify(data,null,2)+'\n');
console.log(JSON.stringify({views:data.views.map(v=>({width:v.width,status:v.status,overflow:v.overflow,firstScreen:v.firstScreen,tiles:v.tiles.map(t=>({case:t.case,y:t.y,bottom:t.bottom,year:t.year,role:t.role})),contact:v.contactAfterClick,filters:v.filters})),errors:data.errors},null,2));
