const fs=require('fs'),path=require('path');
const walk=d=>fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(d+'/'+e.name):e.name.endsWith('.html')?[d+'/'+e.name]:[]);
const result={pages:0,localReferences:0,missing:[],pending:0};
for(const f of walk('v2/en')){
 result.pages++;const html=fs.readFileSync(f,'utf8');result.pending+=(html.match(/\[EN:/g)||[]).length;
 for(const m of html.matchAll(/(?:href|src|poster)="([^"]+)"/g)){
  const h=m[1];if(/^(https?:|mailto:|tel:|data:|#)/.test(h))continue;
  result.localReferences++;const t=path.resolve(path.dirname(f),h.split(/[?#]/)[0]);if(!fs.existsSync(t))result.missing.push({f,h});
 }
}
fs.writeFileSync('.codex-context/run-1030/qa/12-static.json',JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(result));
