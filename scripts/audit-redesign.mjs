import {parse} from 'parse5';
import {readdir,readFile,stat} from 'node:fs/promises';
import {resolve,join} from 'node:path';
const root=resolve('dist');
async function walk(dir){let out=[];for(const item of await readdir(dir,{withFileTypes:true})){const path=join(dir,item.name);if(item.isDirectory())out.push(...await walk(path));else if(item.name.endsWith('.html'))out.push(path)}return out}
const files=await walk(root),pages=new Map(),issues=[];const findings=new Map();
for(const file of files){
 const html=await readFile(file,'utf8'),doc=parse(html),ids=new Set(),links=[],texts=[];let h1=0;
 if(/const pricingData|websiteliGetPricingForCountry/.test(html))issues.push(`${file}: browser pricing runtime`);
 function visit(node,skip=false){const tag=node.tagName;const attrs=Object.fromEntries((node.attrs||[]).map(a=>[a.name,a.value]));
  if(attrs.id){if(ids.has(attrs.id))issues.push(`${file}: duplicate ID ${attrs.id}`);ids.add(attrs.id);}
  if(tag==='h1')h1++;
  if(tag==='a'&&attrs.href)links.push(attrs.href);
  if(tag==='meta'&&attrs.content)texts.push(attrs.content);
  if(tag==='script'&&attrs.type==='application/ld+json'){
   try {const json=JSON.parse(node.childNodes?.map(n=>n.value||'').join(''));if(/"(?:price|lowPrice|highPrice|priceCurrency)"\s*:/.test(JSON.stringify(json)))issues.push(`${file}: price structured data`)}catch{issues.push(`${file}: invalid structured data`)}
  }
  if(node.nodeName==='#text'&&!skip)texts.push(node.value);
  for(const child of node.childNodes||[])visit(child,skip||tag==='script'||tag==='style');
 }
 visit(doc);const text=texts.join(' ');
 // Referral commissions are preserved business information, not service prices.
 const terms=/CHF\s*\d[\d’',.]*|(?:€|£|\$)\s*\d[\d,.]*|\b(?:affordable|cheapest|cheap|discount)\b|20\s*%|starting prices|starting price|starts? from/gi;
 for(const match of text.matchAll(terms)){if(/^CHF\s*100$/.test(match[0])&&file.endsWith('/partners/index.html'))continue;const key=match[0];if(!findings.has(key))findings.set(key,[]);const list=findings.get(key);if(list.length<4)list.push(`${file.slice(root.length)}: ${text.slice(Math.max(0,match.index-70),match.index+160)}`)}
 const path=file.slice(root.length).replace(/index\.html$/,'');pages.set(path,{ids,links,h1,file});
}
for(const [path,page] of pages){
 if(page.h1>1)issues.push(`${path}: ${page.h1} H1 headings`);
 for(const href of page.links){if(/^(mailto:|tel:|javascript:|data:)/.test(href))continue;let url;try{url=new URL(href,'https://websiteli.ch'+path)}catch{issues.push(`${path}: invalid URL ${href}`);continue}if(url.origin!=='https://websiteli.ch')continue;
  const route=url.pathname.endsWith('/')?url.pathname:url.pathname+'/';const target=pages.get(route);
  if(target){if(url.hash&&!target.ids.has(decodeURIComponent(url.hash.slice(1))))issues.push(`${path}: missing anchor ${href}`)}else {try {await stat(join(root,decodeURIComponent(url.pathname)))}catch{issues.push(`${path}: missing target ${href}`)}}
 }
}
console.log(JSON.stringify({pages:pages.size,publicCopyFindings:Object.fromEntries(findings),issues:[...new Set(issues)]},null,2));
if(findings.size||issues.length)process.exitCode=1;
