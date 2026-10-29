import {daily} from './daily.js';
import {world} from './world.js';
import {life} from './life.js';
import {describing} from './describing.js';
import {structure} from './structure.js';
import {verbBlocks} from './verbs.js';

export const partsOfSpeech={noun:'İsim',pronoun:'Zamir',adjective:'Sıfat',verb:'Fiil',adverb:'Zarf',determiner:'Belirleyici',preposition:'Edat',conjunction:'Bağlaç',phrase:'İfade'};
export const categories=[];
const entries=[];
const slug=s=>s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
for(const [source,group] of [[daily,'Ev ve yakın çevrem'],[world,'Günlük hayat'],[life,'Dünya ve yaşam'],[describing,'Nitelikler ve duygular'],[structure,'Cümleyi kuran sözcükler']]){
 let category;
 for(const line of source.trim().split('\n').filter(Boolean)){
  if(line.startsWith('@')){const [id,title,icon,level,pos,tip]=line.slice(1).split('|');category={id,title,icon,level,pos,tip,group};categories.push(category);continue;}
  const [en,tr,example,translation,comparative,superlative]=line.split('|');
  if(!category||!translation)throw Error(`Eksik kelime kaydı: ${line}`);
  entries.push({id:`bank-${category.pos}-${slug(en)}`,en,tr,example,translation,level:category.level,pos:category.pos,categories:[category.id],...(comparative?{comparison:{comparative,superlative}}:{})});
 }
}
for(const block of verbBlocks){
 const id=`${block.kind}-verbs`;
 categories.push({id,title:block.kind==='regular'?'Düzenli fiiller':'Düzensiz fiiller',icon:block.kind==='regular'?'🧩':'🔀',level:block.level,pos:'verb',group:'Fiiller ve çekimleri',tip:block.kind==='regular'?'Geçmiş zaman ve üçüncü hâl çoğunlukla -ed alır. Yazım değişikliklerini ve örnek cümleyi birlikte öğren.':'V1, V2 ve V3 biçimlerini birlikte öğren. Aynı kalanları ve benzer değişenleri küçük gruplar hâlinde tekrar et.'});
 for(const line of block.rows.trim().split('\n').filter(Boolean)){
  const [en,tr,past,participle,example,translation]=line.split('|');if(!translation)throw Error(`Eksik fiil: ${line}`);
  entries.push({id:`bank-verb-${slug(en)}`,en,tr,example,translation,level:block.level,pos:'verb',categories:[id],forms:{type:block.kind,past:past.split('/'),participle:participle.split('/')}});
 }
}
categories.push({id:'course-core',title:'Derslerin temel kelimeleri',icon:'📚',group:'Derslerle birlikte',tip:'32 dersin içindeki kelimeler. Konuyu çalıştıktan sonra burada tekrar et.'});
export const categoryById=Object.fromEntries(categories.map(c=>[c.id,c]));
const sets={
 verb:new Set('rain|report|wake up|help|swim|cook|drive|wait|listen|read|visit|buy|arrive|ring|notice|carry|plan|book|pack|try|enjoy|decide|avoid|improve|practise|achieve|realise|manage|prepare|depend on|imagine|afford|suggest|belong to|recommend|produce|repair|deliver|design|mention|explain|promise|remind|regret|prevent|overlook|reflect|assume|conclude|wish|appreciate|maintain|renovate|arrange|inspect|enquire|clarify|confirm|emphasise|tend to'.split('|')),
 adjective:new Set('ready|tired|cheaper|comfortable|crowded|faster|allowed|necessary|likely|reliable|previous|plausible|frustrated|efficient|appropriate|remarkable|sustainable'.split('|')),
 adverb:new Set('usually|slowly|now|outside|yesterday|suddenly|tomorrow|soon|already|yet|ever|abroad|recently|regularly|previously|fortunately|eventually|instead|perhaps|nearby|however|therefore|otherwise|currently|apparently|particularly|nevertheless'.split('|')),
 preposition:new Set('since|from|before|under|next to|through'.split('|')),
 conjunction:new Set('while|by the time|unless|in case|although|whereas'.split('|')),
 phrase:new Set('every day|where|when|why|how much|last week|please'.split('|')),
 determiner:new Set('enough|few|little'.split('|'))
};
const extraForms={
 'rain':['regular','rained','rained'], 'report':['regular','reported','reported'], 'book':['regular','booked','booked'], 'pack':['regular','packed','packed'], 'avoid':['regular','avoided','avoided'], 'achieve':['regular','achieved','achieved'], 'imagine':['regular','imagined','imagined'], 'afford':['regular','afforded','afforded'], 'produce':['regular','produced','produced'], 'design':['regular','designed','designed'], 'mention':['regular','mentioned','mentioned'], 'remind':['regular','reminded','reminded'], 'wish':['regular','wished','wished'], 'arrange':['regular','arranged','arranged'], 'confirm':['regular','confirmed','confirmed'],
 'wake up':['irregular','woke up','woken up'],
 'depend on':['regular','depended on','depended on'],
 'belong to':['regular','belonged to','belonged to'],
 'tend to':['regular','tended to','tended to'],
 'realise':['regular','realised','realised'],
 'overlook':['regular','overlooked','overlooked'],
 'enquire':['regular','enquired','enquired'],
 'emphasise':['regular','emphasised','emphasised'],
 'renovate':['regular','renovated','renovated'],
 'inspect':['regular','inspected','inspected'],
 'maintain':['regular','maintained','maintained'],
 'appreciate':['regular','appreciated','appreciated'],
 'reflect':['regular','reflected','reflected'],
 'conclude':['regular','concluded','concluded'],
 'assume':['regular','assumed','assumed'],
 'regret':['regular','regretted','regretted'],
 'prevent':['regular','prevented','prevented'],
 'clarify':['regular','clarified','clarified']
};
export function enrichWords(legacy){
 const result=legacy.map(w=>({...w,pos:Object.entries(sets).find(([,set])=>set.has(w.en))?.[0]||'noun',categories:['course-core'],hasAudio:true}));
 const byKey=new Map(result.map(w=>[`${w.en.toLowerCase()}|${w.pos}`,w]));
 for(const entry of entries){
  const key=`${entry.en.toLowerCase()}|${entry.pos}`,existing=byKey.get(key);
  if(existing){existing.categories=[...new Set([...existing.categories,...entry.categories])];if(entry.forms)existing.forms=entry.forms;if(entry.comparison)existing.comparison=entry.comparison;}
  else {const w={...entry,hasAudio:false};result.push(w);byKey.set(key,w);}
 }
 for(const w of result){
  const f=extraForms[w.en];if(w.pos==='verb'&&!w.forms&&f)w.forms={type:f[0],past:[f[1]],participle:[f[2]]};
  if(w.forms&&!w.categories.includes(`${w.forms.type}-verbs`))w.categories.push(`${w.forms.type}-verbs`);
  if(w.en==='read'&&w.pos==='verb')w.note='Yazılışı üç hâlde de read. İlk hâli “riid”, geçmiş ve üçüncü hâli “red” diye okunur.';
  if(w.en==='get'&&w.pos==='verb')w.note='Gotten özellikle Amerikan İngilizcesinde kullanılır. Üçüncü hâl sorularında got ve gotten kabul edilir.';
  if(w.en==='be')w.note='Geçmişte I/he/she/it ile was; you/we/they ile were kullanılır.';
  if(w.en==='learn')w.note='Learned düzenli biçimdir; learnt da geçerlidir ve özellikle Britanya İngilizcesinde görülür.';
  if(w.en==='lie down')w.note='Uzanmak: lie down → lay down → lain down. Yalan söylemek anlamındaki lie → lied → lied ile karıştırma.';
  if(w.en==='lie')w.note='Burada “yalan söylemek” anlamında düzenlidir. “Uzanmak” anlamındaki lie down düzensizdir.';
 }
 return result;
}
