import fs from 'node:fs';
import path from 'node:path';
import { parse } from '@babel/parser';
import traverseImport from '@babel/traverse';
const traverse=traverseImport.default??traverseImport;
const pages=['home','waec','lowbee','knifebud','gates','jammies','about'];
const errors=[];const assets=new Set();let imageSlots=0;
for(const page of pages){
 const file=`src/pages/${page}.jsx`,source=fs.readFileSync(file,'utf8');
 if(/https:\/\/www\.figma\.com\/api\/mcp\/asset/.test(source))errors.push(file+': temporary image URL');
 const ast=parse(source,{sourceType:'module',plugins:['jsx']});let h1=0;
 traverse(ast,{VariableDeclarator(p){const v=p.node.init;if(v?.type==='TemplateLiteral'&&v.expressions[0]?.name==='assetPathPrefix'){const filename=v.quasis.map(q=>q.value.raw).join('');const local=path.join('public/assets',filename);assets.add(local);if(!fs.existsSync(local)||!fs.statSync(local).size)errors.push('Missing asset '+local);}},JSXElement(p){const n=p.node,tag=n.openingElement.name.name;if(tag==='h1')h1++;if(tag==='img'){imageSlots++;const alt=n.openingElement.attributes.find(a=>a.name?.name==='alt');if(!alt?.value?.value)errors.push(file+': image missing alt text');const src=n.openingElement.attributes.find(a=>a.name?.name==='src')?.value;if(src?.type==='StringLiteral'&&src.value.startsWith('/assets/')){const local='public'+src.value;assets.add(local);if(!fs.existsSync(local)||!fs.statSync(local).size)errors.push('Missing asset '+local);}}if(tag==='a'&&!n.openingElement.attributes.some(a=>a.name?.name==='href'))errors.push(file+': anchor without a destination');}});
 if(h1!==1)errors.push(file+': expected one h1; found '+h1);
}
const manifest=JSON.parse(fs.readFileSync('asset-manifest.json','utf8'));
if(assets.size!==manifest.length)errors.push(`Asset manifest mismatch: ${assets.size}/${manifest.length}`);
if(errors.length){console.error(errors.join('\n'));process.exit(1);}
console.log(`PASS: ${pages.length} React pages, ${imageSlots} image slots, ${assets.size} local assets, headings and navigation destinations.`);
