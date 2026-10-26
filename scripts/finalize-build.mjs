import fs from 'node:fs';
import path from 'node:path';

// Static route entry documents make direct links work on simple file hosts too.
const index=fs.readFileSync('dist/index.html','utf8');
const routes={
 '/about':'About Eben — Research & Product Design',
 '/work/waec':'WAEC Digital Certificate — Ebenezer Olabinjo',
 '/work/lowbee':'Lowbee — Ebenezer Olabinjo',
 '/work/knifebud':'Knifebud — Ebenezer Olabinjo',
 '/work/gates':'Making it Real / DODO — Ebenezer Olabinjo',
 '/jammies':'Jammies — Gospel Platform & Community',
};
for(const [route,title]of Object.entries(routes)){
 const dir=path.join('dist',route);fs.mkdirSync(dir,{recursive:true});
 fs.writeFileSync(path.join(dir,'index.html'),index.replace(/<title>[^<]*<\/title>/,`<title>${title.replaceAll('&','&amp;')}</title>`));
}
fs.writeFileSync('dist/404.html',index);
console.log('Prepared six direct-link route entries and the SPA fallback.');
