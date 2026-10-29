import {medicalLexicon,medicalVerbRows} from './lexicon.js';
const slug=s=>s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
export const medicalRoot={id:'muayene',title:'Muayene',icon:'🩺',group:'Mesleki İngilizce',tip:'Doktor–hasta görüşmeleri için kelimeler, muayene fiilleri ve hazır cümleler. Bir alt başlık seç; kartlarla öğren, ardından örnek görüşmelerde kullan.'};
export const medicalCategories=[medicalRoot];
export const medicalWords=[];
let category;
for(const line of medicalLexicon.trim().split('\n').filter(Boolean)){
 if(line.startsWith('@')){const [key,title,icon,level,pos,tip]=line.slice(1).split('|');category={id:`muayene-${key}`,title,icon,level,pos,tip,parent:'muayene',group:'Mesleki İngilizce'};medicalCategories.push(category);continue;}
 const [en,tr,example,translation]=line.split('|');if(!category||!translation)throw Error(`Incomplete medical entry: ${line}`);
 medicalWords.push({id:`clinical-${category.pos}-${slug(en)}`,en,tr,example,translation,pos:category.pos,level:category.level,domain:'clinical',categories:[category.id,'muayene'],hasAudio:false});
}
medicalCategories.push({id:'muayene-verbs',title:'Muayenede kullanılan fiiller',icon:'🧩',level:'B1',pos:'verb',tip:'Muayene bağlamında fiil, anlamı ve üç hâli. Breathe fiil, breath isimdir; examine muayene etmek, prescribe reçete etmektir.',parent:'muayene',group:'Mesleki İngilizce'});
for(const line of medicalVerbRows.trim().split('\n')){
 const [en,tr,past,participle,type,example,translation]=line.split('|');if(!translation)throw Error(`Incomplete medical verb: ${line}`);
 medicalWords.push({id:`clinical-verb-${slug(en)}`,en,tr,example,translation,pos:'verb',level:'B1',domain:'clinical',categories:['muayene-verbs','muayene',`${type}-verbs`],hasAudio:false,forms:{type,past:past.split('/'),participle:participle.split('/')}});
}
const variants={diarrhoea:['diarrhea'],localised:['localized'],'general practitioner':['GP'],electrocardiogram:['ECG','EKG'],'complete blood count':['CBC'],'X-ray':['x ray'],'MRI scan':['MRI'],'CT scan':['CT'],'physiotherapy':['physical therapy']};
const notes={
 'chaperone':'Muayenede mahremiyet ve destek için bulunan, bu rol için eğitimli kişi. Her refakatçi veya tercüman chaperone değildir.',
 'next of kin':'İletişim için belirtilen yakın kişi. Bu ifade tek başına yasal karar verme yetkisi anlamına gelmez.',
 'acute':'Acute ile severe aynı değildir: acute başlangıç ve seyri, severe şiddeti anlatır.',
 'stomach':'Hasta bu sözcükle yalnızca mide organını değil, karın bölgesini de kastedebilir. Yerini göstererek netleştirmesini iste.',
 'dizziness':'Dönme hissi, dengesizlik veya bayılacak gibi olma için kullanılabilir. Tam olarak ne hissettiğini sor.',
 'discharge':'Fiil olarak burada taburcu etmek. İsim olarak akıntı veya taburculuk anlamına gelebilir; bağlamı kontrol et.',
 'swell':'V2 swelled; V3 genellikle swollen. Swelled da kabul edilen bir biçimdir.',
 'consent':'Onam sözcüğünü bilmek ile onam sürecini yürütmek farklıdır. Örnekte sözcüğün dil içindeki kullanımını çalışıyorsun.',
 'I feel sick.':'İngiliz İngilizcesinde sıklıkla midem bulanıyor anlamındadır; bağlama göre kendimi hasta hissediyorum da olabilir.',
 'fasting':'Test hazırlığının ayrıntısı teste göre değişir. Bu kart yalnızca “fasting” sözcüğünü öğretir.',
 'false positive':'Test hedeflediği durum yokken pozitif sonuç verebilir. Yalancı pozitif olasılığı test ve bağlamla değerlendirilir.',
 'false negative':'Test hedeflediği durum varken negatif sonuç verebilir. Negatif sözcüğünü tek başına kesin dışlama olarak çevirme.'
};
for(const w of medicalWords){if(variants[w.en])w.aliases=variants[w.en];if(notes[w.en])w.note=notes[w.en];}
export const medicalSources=[
 {label:'NHS · Hekim görüşmesinde iletişim ve sorular',url:'https://www.nhs.uk/nhs-services/gps/what-to-ask-your-doctor/'},
 {label:'MedlinePlus · Tıbbi terimlerin kökleri',url:'https://medlineplus.gov/appendixa.html'},
 {label:'MedlinePlus · Tetkik adları ve hasta açıklamaları',url:'https://medlineplus.gov/lab-tests/'}
];
