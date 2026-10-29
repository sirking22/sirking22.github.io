const fs=require('fs'),assert=require('assert/strict'),cp=require('child_process');
const clean=s=>s.replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim();
const rootHTML=fs.readFileSync('index.html','utf8');
const root=clean(rootHTML)+' '+rootHTML;
const a=JSON.parse(fs.readFileSync('.codex-context/night-1030/qa/05-verbatim-sources.json'));
for(const e of a){assert(root.includes(e.text),e.text);if(!e.field.includes('h1'))assert(clean(fs.readFileSync(e.path,'utf8')).includes(e.text),e.path+e.text);}
const cases=[];
for(const n of fs.readdirSync('v2/work')){
  const s=fs.readFileSync('v2/work/'+n,'utf8'),m=s.match(/class="case-heading"[\s\S]*?<p>(.*?)<\/p>/);
  if(m){cases.push(n);assert.equal(m[1].split(' · ').length,4,n);assert(m[1].includes('[роль] · [команда]'));}
}
assert.equal(cases.length,12);
const git=(...args)=>cp.execFileSync('git',['-c','safe.directory=C:/Users/Arseniy/AppData/Local/Temp/wt-showcase-v2',...args],{encoding:'utf8'}).trim();
const changed=git('diff','--name-only').split('\n');
assert(changed.every(p=>p.startsWith('v2/')||p==='.codex-context/night-1030/plan-2026-10-30.md'));
assert.equal(git('branch','--show-current'),'codex/showcase-grid-v2');
const before=[],after=[];
const files=['v2/index.html','v2/info.html','v2/method.html',...cases.map(n=>'v2/work/'+n)];
for(const p of files){
  const visible=s=>s.replace(/<head>[\s\S]*?<\/head>/,'').replace(/<script[\s\S]*?<\/script>/g,'').replace(/<!--[\s\S]*?-->/g,'').replace(/<[^>]+>/g,' ');
  before.push(...(visible(git('show','HEAD:'+p)).match(/\[[^\]\n]+\]/g)||[]));
  after.push(...(visible(fs.readFileSync(p,'utf8')).match(/\[[^\]\n]+\]/g)||[]));
}
const result={sourceMatches:a.length,caseFactLines:cases.length,protectedPathsChanged:0,placeholdersBefore:before.length,placeholdersAfter:after.length};
fs.writeFileSync('.codex-context/night-1030/qa/05-static-results.json',JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify(result));
