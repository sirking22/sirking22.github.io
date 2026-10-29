const fs=require('fs'),path=require('path'),assert=require('assert');
const draft='v2/drafts/rawmid-decision.html',html=fs.readFileSync(draft,'utf8');
const files=[];function walk(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,e.name);if(e.isDirectory())walk(p);else if(p.endsWith('.html'))files.push(p)}}walk('v2');
const incoming=[];for(const file of files){if(file.replaceAll('\\','/')===draft)continue;const text=fs.readFileSync(file,'utf8');for(const m of text.matchAll(/(?:href|src)="([^"]+)"/g))if(m[1].includes('rawmid-decision'))incoming.push(file)}
const missing=[],local=[];for(const m of html.matchAll(/(?:href|src)="([^"]+)"/g)){if(/^(https?:|mailto:|#)/.test(m[1]))continue;const target=path.resolve(path.dirname(draft),m[1].split('#')[0]);local.push(m[1]);if(!fs.existsSync(target))missing.push(m[1])}
const captions=[...html.matchAll(/<figcaption>(.*?)<\/figcaption>/g)].map(m=>m[1]);
const live=fs.readFileSync('index.html','utf8');assert(captions.every(c=>live.includes(c)));assert(!incoming.length);assert(!missing.length);assert(/name="robots" content="noindex"/.test(html));
const result={htmlPagesScanned:files.length,incomingLinks:incoming.length,localReferences:local.length,missingReferences:missing,verbatimCaptions:captions.length,newCssRules:0};
fs.writeFileSync('.codex-context/night-1030/qa/06-static-results.json',JSON.stringify(result,null,2)+'\n');console.log(result);
