import fs from 'node:fs';
import path from 'node:path';
import { parse } from '@babel/parser';
import traverseImport from '@babel/traverse';
import generateImport from '@babel/generator';
import * as t from '@babel/types';
const traverse = traverseImport.default ?? traverseImport;
const generate = generateImport.default ?? generateImport;
const root = process.cwd();
const pages = ['home','waec','lowbee','knifebud','gates','jammies','about'];
fs.mkdirSync('src/pages', {recursive:true});
fs.mkdirSync('design-reference', {recursive:true});
const unsupported = new Set();
const attr=(el,name)=>el.openingElement.attributes.find(a=>a.type==='JSXAttribute'&&a.name.name===name);
const value=(el,name)=>attr(el,name)?.value?.value;
const set=(el,name,v)=>{const a=attr(el,name);if(a)a.value=t.stringLiteral(v);else el.openingElement.attributes.push(t.jsxAttribute(t.jsxIdentifier(name),t.stringLiteral(v)));};
const rename=(el,name)=>{el.openingElement.name=t.jsxIdentifier(name);if(el.closingElement)el.closingElement.name=t.jsxIdentifier(name);};
function classes(input='') {
 const result={};
 const rules={relative:{position:'relative'},absolute:{position:'absolute'},flex:{display:'flex'},block:{display:'block'},'flex-col':{'flex-direction':'column'},'items-start':{'align-items':'flex-start'},'items-center':{'align-items':'center'},'justify-between':{'justify-content':'space-between'},'justify-center':{'justify-content':'center'},'content-stretch':{'align-content':'flex-start'},'shrink-0':{'flex-shrink':'0'},'overflow-clip':{overflow:'clip'},'overflow-hidden':{overflow:'hidden'},'not-italic':{'font-style':'normal'},'font-normal':{'font-weight':'400'},'font-medium':{'font-weight':'500'},'w-full':{width:'100%'},'h-full':{height:'100%'},'size-full':{width:'100%',height:'100%'},'h-px':{height:'1px'},'inset-0':{inset:'0'},'left-0':{left:'0'},'object-cover':{'object-fit':'cover'},'object-contain':{'object-fit':'contain'},'pointer-events-none':{'pointer-events':'none'},'max-w-none':{'max-width':'none'},'text-left':{'text-align':'left'},'text-center':{'text-align':'center'},'whitespace-nowrap':{'white-space':'nowrap'},'whitespace-pre-wrap':{'white-space':'pre-wrap'},'cursor-pointer':{cursor:'pointer'},hidden:{display:'none'},border:{'border-width':'1px','border-style':'solid'},'border-dashed':{'border-style':'dashed'},'[word-break:break-word]':{'overflow-wrap':'break-word'}};
 for(const c of input.split(/\s+/).filter(Boolean)){
  if(rules[c]){Object.assign(result,rules[c]);continue;}
  if(c.startsWith("font-['Inter:")){result['font-family']="'Inter', sans-serif";continue;}
  const m=c.match(/^([a-z-]+)-\[(.*)\]$/);if(!m){unsupported.add(c);continue;}
  let [,k,v]=m;v=v.replace(/var\((--compact-[a-z]+),[^)]+\)/g,'var($1)');
  const prop={w:'width',h:'height',gap:'gap',rounded:'border-radius',tracking:'letter-spacing',top:'top',left:'left',aspect:'aspect-ratio'}[k];
  if(prop){result[prop]=v;continue;}
  if(k==='size'){result.width=result.height=v;continue;}
  if(k==='text'){if(v.startsWith('color:'))result.color=v.slice(6);else if(v.startsWith('#'))result.color=v==='#f0f0ec'?'var(--compact-foreground)':v;else result['font-size']=v;continue;}
  if(k==='bg'){result.background=v;continue;}
  if(k==='border'){result['border-color']=v;continue;}
  if(k==='leading'){result['line-height']=v;continue;}
  if(/^p[xytrbl]?$/.test(k)){const axes={p:['top','right','bottom','left'],px:['left','right'],py:['top','bottom'],pt:['top'],pr:['right'],pb:['bottom'],pl:['left']}[k];for(const a of axes)result['padding-'+a]=v;continue;}
  unsupported.add(c);
 }
 return result;
}
const decl=o=>Object.entries(o).map(([k,v])=>`${k}:${v}`).join(';');
function source(key,mobile){const name=`${key}${mobile?'-mobile':''}`;const local=`design-reference/${name}.jsx`;const input=fs.readFileSync(fs.existsSync(local)?local:`/tmp/bnzr-react-reference/${name}.txt`,'utf8');const end=input.indexOf('\n\nSUPER CRITICAL');let code=end<0?input:input.slice(0,end);if(!code)throw Error('Missing reference '+key);code=code.replace(/const assetPathPrefix = "[^"]+";/,'const assetPathPrefix = "/assets";');fs.writeFileSync(local,code+'\n');return parse(code,{sourceType:'module',plugins:['jsx']});}
function elements(ast){const list=[];traverse(ast,{JSXElement(p){list.push(p.node);}});return list;}
const routeById={'50:507':'/about','50:517':'/work/gates','50:518':'/work/waec','50:520':'/work/knifebud','50:521':'/work/lowbee','50:528':'/jammies','50:556':'/jammies','72:399':'/#work'};
const textContent=el=>el.children.map(c=>c.type==='JSXText'?c.value:c.type==='JSXElement'?textContent(c):c.type==='JSXExpressionContainer'&&c.expression.type==='TemplateLiteral'?c.expression.quasis.map(q=>q.value.raw).join(''):'').join(' ').replace(/\s+/g,' ').trim();
// This caption remains on desktop but was removed from the Figma mobile view.
const desktopOnlyNodeIds = new Set(['50:369']);
let css='/* Figma-derived page layouts. Theme tokens and shared behavior live in styles.css. */\n';
let count=0;
for(const page of pages){
 const desktop=source(page,false),mobile=source(page,true),ds=elements(desktop),ms=elements(mobile);
 for(const a of [desktop,mobile]){const refs={};traverse(a,{VariableDeclarator(p){if(p.node.init?.type==='TemplateLiteral')refs[p.node.id.name]=p.node.init.quasis.map(q=>q.value.raw).join('');}});for(const el of elements(a))el._assetKey=refs[attr(el,'src')?.value?.expression?.name];}const used=new Set(); const signature=el=>[el.openingElement.name.name,value(el,'data-name')?.replace(/Desktop|Mobile/g,'View'),textContent(el),el._assetKey].join('|'); const matches=ds.map((el,i)=>{if(i===0){used.add(0);return ms[0];}let j=ms.findIndex((m,k)=>!used.has(k)&&signature(m)===signature(el));if(j<0&&value(el,'data-name'))j=ms.findIndex((m,k)=>!used.has(k)&&value(m,'data-name')===value(el,'data-name'));if(j<0&&(desktopOnlyNodeIds.has(value(el,'data-node-id'))||/PLACEHOLDER|From exam number to certificate|Before → after/.test(textContent(el)))){const hidden=t.cloneNode(el,true);set(hidden,'className','hidden');return hidden;}if(j<0)throw Error(page+': unmatched element '+i+' '+signature(el).slice(0,100));used.add(j);return ms[j];});
 const rootEl=ds[0];let heading=false;
 ds.forEach((el,i)=>{
  const m=matches[i],dClass=value(el,'className')||'',mClass=value(m,'className')||'',d=classes(dClass),mob=classes(mClass),name=value(el,'data-name')||'',id=value(el,'data-node-id'),tag=el.openingElement.name.name,label=textContent(el),cn=`${page}-${i}`;
  
  // Preserve desktop and mobile art direction with ordinary scoped CSS.
  if(i===0){for(const o of [d,mob]){delete o.width;delete o.height;delete o['padding-left'];delete o['padding-right'];delete o.background;}rename(el,'main');set(el,'id','main-content');set(el,'className',cn+' site-page');}
  else set(el,'className',cn);
  css+=`.${cn}{${decl(d)}}\n`;
  const reset={};for(const k of Object.keys(d))if(!(k in mob))reset[k]='initial';Object.assign(reset,mob);
  css+=`@media(max-width:719px){.${cn}{${decl(reset)}}}\n`;
  // Real controls replace visual-only Figma prototype hotspots.
  if(/^(Light|Dark) ◐$/.test(label)&&name==='Compact / Link'||name==='Theme switch'){
   rename(el,'ThemeToggle');el.openingElement.selfClosing=true;el.closingElement=null;el.children=[];
  } else if(routeById[id]) {rename(el,'a');set(el,'href',routeById[id]);}
  else if(name==='Compact / Link'&&/^← (Work|Home|Back to)/.test(label)){rename(el,'a');set(el,'href',/work/i.test(label)?'/#work':'/');}
  if(page==='home'&&id==='50:491'){rename(el,'a');set(el,'href','/');set(el,'aria-label','Eben — home');}
  if(page==='home'&&id==='50:510')set(el,'id','work');
  // The source has nested visual link labels; only the actual anchor is focusable.
  el.openingElement.attributes=el.openingElement.attributes.filter(a=>!['role','tabIndex'].includes(a.name?.name));
  if(tag==='img'){
   const src=attr(el,'src')?.value?.expression?.name||'';
   const alt=src==='imgEbenezerOlabinjo'?'Portrait of Ebenezer Olabinjo':name||({home:'Selected project preview',waec:'WAEC Digital Certificate design',lowbee:'Lowbee product design',knifebud:'Knifebud service and product imagery',gates:'Making it Real research artefact',jammies:'Jammies community and gospel artwork',about:'Ebenezer Olabinjo'}[page]);
   set(el,'alt',alt);set(el,'loading',i<35?'eager':'lazy');set(el,'decoding','async');set(el,'data-zoomable','true');
   if(page!=='home'&&src!=='imgEbenezerOlabinjo'){set(el,'tabIndex','0');set(el,'role','button');set(el,'aria-label','Expand image: '+alt);}
  }
  if(attr(el,'target'))set(el,'rel','noopener noreferrer');
  if(id==='50:368'){
   // Figma exposes this embedded video's poster, but not the source MP4.
   el.openingElement.selfClosing=false;el.closingElement=t.jsxClosingElement(t.jsxIdentifier('div'));
   const poster=t.jsxElement(t.jsxOpeningElement(t.jsxIdentifier('img'),[
    t.jsxAttribute(t.jsxIdentifier('className'),t.stringLiteral('media-poster')),
    t.jsxAttribute(t.jsxIdentifier('src'),t.stringLiteral('/assets/waec-motion-poster.png')),
    t.jsxAttribute(t.jsxIdentifier('alt'),t.stringLiteral('WAEC Digital Certificate — video preview')),
    t.jsxAttribute(t.jsxIdentifier('loading'),t.stringLiteral('lazy')),
   ],true),null,[],true);
   el.children=[poster];
  }
  if(tag==='p'&&parseFloat(d['font-size'])>=27&&!heading){rename(el,'h1');heading=true;}
  else if(tag==='p'&&d['font-size']==='22px')rename(el,'h2');
  if(page==='home'&&id==='50:503'){rename(el,'h1');heading=true;}
  if(page==='home'&&['50:513','50:525','50:540'].includes(id))rename(el,'h2');
  count++;
 });
 // Draw link arrows as SVG so mobile platforms cannot substitute emoji glyphs.
 let hasArrow=false;
 traverse(desktop,{JSXText(p){
  if(!p.node.value.includes('↗'))return;
  hasArrow=true;
  const pieces=p.node.value.split('↗'),nodes=[];
  pieces.forEach((piece,i)=>{
   if(piece)nodes.push(t.jsxText(piece));
   if(i<pieces.length-1)nodes.push(t.jsxElement(t.jsxOpeningElement(t.jsxIdentifier('LinkArrow'),[],true),null,[],true));
  });
  p.replaceWithMultiple(nodes);
 }});
 if(hasArrow)desktop.program.body.unshift(t.importDeclaration([t.importSpecifier(t.identifier('LinkArrow'),t.identifier('LinkArrow'))],t.stringLiteral('../components/LinkArrow')));
 desktop.program.body.unshift(t.importDeclaration([t.importSpecifier(t.identifier('ThemeToggle'),t.identifier('ThemeToggle'))],t.stringLiteral('../components/ThemeToggle')));
 fs.writeFileSync(`src/pages/${page}.jsx`,'// Adapted from the approved Ready for Dev Figma page.\n'+generate(desktop,{jsescOption:{minimal:true}}).code+'\n');
}
if(unsupported.size)throw Error('Unmapped Figma styles: '+[...unsupported].join(', '));
fs.writeFileSync('src/design.css',css);
console.log(JSON.stringify({pages:pages.length,elements:count,stylesheetBytes:css.length,unsupported:[...unsupported]}));
