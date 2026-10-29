const fs=require('fs'),cp=require('child_process');
const out=cp.spawnSync(process.execPath,['E:/DevCache/npm/_npx/31e32ef8478fbf80/node_modules/@playwright/cli/playwright-cli.js','-s=night05','run-code',fs.readFileSync('.codex-context/night-1030/qa/05-browser-check.js','utf8')],{encoding:'utf8',maxBuffer:10*1024*1024});
fs.writeFileSync('.codex-context/night-1030/qa/05-browser.log',out.stdout+out.stderr);
const m=out.stdout.match(/### Result\s*([\s\S]*?)\s*### Ran Playwright code/);
if(!m)throw Error(out.stdout+out.stderr);
const rows=JSON.parse(m[1]);
fs.writeFileSync('.codex-context/night-1030/qa/05-browser-results.json',JSON.stringify(rows,null,2)+'\n');
console.log(JSON.stringify({checks:rows.length,overflow:rows.filter(r=>r.overflow),broken:rows.filter(r=>r.broken.length),errors:rows.filter(r=>r.errors.length)}));
