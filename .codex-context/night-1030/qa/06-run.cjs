const fs=require('fs'),cp=require('child_process');
const r=cp.spawnSync(process.execPath,['E:/DevCache/npm/_npx/31e32ef8478fbf80/node_modules/@playwright/cli/playwright-cli.js','-s=night06','run-code',fs.readFileSync('.codex-context/night-1030/qa/06-browser-check.js','utf8')],{encoding:'utf8',maxBuffer:1024*1024});
fs.writeFileSync('.codex-context/night-1030/qa/06-browser.log',r.stdout+r.stderr);
const m=r.stdout.match(/### Result\s*([\s\S]*?)\s*### Ran Playwright code/);
if(!m)throw Error(r.stdout+r.stderr);
fs.writeFileSync('.codex-context/night-1030/qa/06-browser-results.json',JSON.stringify(JSON.parse(m[1]),null,2)+'\n');
console.log(m[1]);
