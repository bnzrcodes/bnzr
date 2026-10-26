import fs from 'node:fs';
import { parse } from '@babel/parser';
import traverseImport from '@babel/traverse';
import generateImport from '@babel/generator';
const traverse=traverseImport.default??traverseImport;
const generate=generateImport.default??generateImport;
const {replacements,removeLabels}=JSON.parse(fs.readFileSync('design-reference/caption-updates.json','utf8'));
const textContent=el=>el.children.map(c=>c.type==='JSXText'?c.value:c.type==='JSXElement'?textContent(c):c.type==='JSXExpressionContainer'&&c.expression.type==='TemplateLiteral'?c.expression.quasis.map(q=>q.value.raw).join(''):'').join(' ').replace(/\s+/g,' ').trim();
let changed=0,removed=0;
for(const file of fs.readdirSync('design-reference').filter(f=>f.endsWith('.jsx'))){
 const filename='design-reference/'+file,ast=parse(fs.readFileSync(filename,'utf8'),{sourceType:'module',plugins:['jsx']});
 traverse(ast,{JSXElement(p){
  const n=p.node,nameAttr=n.openingElement.attributes.find(a=>a.name?.name==='data-name');
  if(nameAttr?.value?.value==='Project context'){p.remove();removed++;return;}
  if(['p','span'].includes(n.openingElement.name.name)){
   const value=textContent(n);
   if(removeLabels.includes(value)){p.remove();removed++;return;}
   if(replacements[value]){n.children=[{type:'JSXText',value:replacements[value]}];changed++;}
  }
  if(nameAttr?.value?.value){nameAttr.value.value=nameAttr.value.value.replace(/^(IMAGE|MOTION) PLACEHOLDER \/ /,'').replace(/ \/ Replace with final asset$/,'').replace(/^▶\s*/,'');}
 }});
 fs.writeFileSync(filename,generate(ast,{jsescOption:{minimal:true}}).code+'\n');
}
console.log(JSON.stringify({captionsUpdated:changed,draftNotesAndContextSectionsRemoved:removed}));
