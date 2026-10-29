import {grammar} from './grammar.js';
import {words,legacyWords} from './words.js';
import {createVocabularyExercises} from './vocabulary/practice.js';
import {guideExercises} from './vocabulary/guides.js';
import {readings} from './stories.js';
import {units,allPhrases,scenarios} from '../content.js';
export {grammar,words};
export const levels=['A1','A2','B1','B2'];
export const levelInfo={A1:{title:'Temeli kur',description:'Kendini tanıt, soru sor, günlük ihtiyaçlarını anlat.'},A2:{title:'Günlük hayatı yönet',description:'Geçmişi anlat, plan yap, deneyimlerini paylaş.'},B1:{title:'Bağımsız anlat',description:'Hikâye kur, nedenlerini açıkla, olasılıklardan söz et.'},B2:{title:'Ayrıntı ve nüans',description:'Görüş tartış, çıkarım yap, karmaşık anlam ilişkilerini kur.'}};
const panels=[0,1,2,2,3,2,0,2,0,1,0,1,2,3,0,3,0,1,2,2,0,3,0,2,1,0,1,0,0,0,2,3];
const speakingTasks=[
'Adını, geldiğin yeri ve mesleğini üç kısa cümleyle söyle.','Kafede iki şey sipariş et ve hesabı iste.','Ailenden iki kişiyi ve bir eşyanı tanıt.','Bir sabahını dört alışkanlıkla anlat.','Bir yabancıya yer, zaman ve fiyat hakkında üç soru sor.','Odanı there is/are ve iki yer edatıyla tarif et.','Yapabildiğin iki şeyi söyle ve bir yardım rica et.','Çevrende şu anda olan üç şeyi anlat.',
'Dün ne yaptığını dört cümleyle anlat.','Bir telefon geldiğinde ne yapıyordun? Arka planı ve olayı anlat.','Hafta sonu planını ve o an vereceğin bir yardım teklifini söyle.','İki ulaşım seçeneğini karşılaştır ve birini neden seçtiğini açıkla.','Dört kişilik yemek için alışveriş listesini miktarlarla söyle.','Bir atölyenin iki kuralını, bir önerini ve zorunlu olmayan bir şeyi anlat.','Yaptığın ve henüz yapmadığın iki deneyimden söz et.','Sevdiğin bir hobiyi ve neden öğrenmek istediğini anlat.',
'Ne zamandır öğrendiğini, nasıl çalıştığını ve fark ettiğin gelişmeyi anlat.','Bir aksilikte önce olanı ve daha sonra olanı sıralayarak anlat.','Hava değişirse yapacağın iki planı anlat.','Bir aylık boş zamanın olsa ne yapardın? Nedenleriyle söyle.','Bir kişiyi, bir yeri ve bir eşyayı relative clause ile tanımla.','Bildiğin bir ürünün nasıl üretildiğini üç passive cümleyle anlat.','Bir arkadaşından gelen daveti başka birine aktar.','Şehir ve kasaba yaşamının ikişer iyi ve zor yönünü tartış.',
'Geçmişte kaçırdığın bir fırsatı ve farklı davransaydın ne olacağını anlat.','Geçmişteki bir kararın bugünkü hayatına hayalî etkisini anlat.','Bir olay için iki olası açıklama ve bir güçlü çıkarım üret; kanıtını belirt.','Bir geçmiş pişmanlığını ve şimdiki bir dileğini anlat.','Mahallendeki bir yenilemenin biten ve devam eden aşamalarını açıkla.','Bir kursa kayıt öncesi üç kibar dolaylı soru sor.','Sevdiğin bir filmi anlat; bir ek bilgi cümlesi ve vurgu cümlesi kullan.','Bir kamusal önerinin faydasını, itirazını ve dengeli çözümünü 90 saniyede savun.'
];
const readingExercise=(text,id,topic,level,kind)=>{const [prompt,answer,wrong,why]=text.split('|');return {id,topic,level,kind,prompt,answer,options:[answer,...wrong.split('/')],why};};
export const topics=grammar.map((g,i)=>{const [title,text,translation,q1,q2]=readings[i];return {...g,panel:panels[i],words:words.filter(w=>w.topic===g.id),reading:{title,text,translation},speaking:speakingTasks[i],checks:[{...readingExercise(q1,`r-${g.id}-0`,g.id,g.level,'reading'),context:text},{...readingExercise(q2,`r-${g.id}-1`,g.id,g.level,'reading'),context:text}]};});
export const wordExercises=createVocabularyExercises(words);
const legacyExercises=units.flatMap(u=>[...u.quiz.map((q,i)=>({id:`old-${u.id}-${i}`,kind:'reading',level:u.level,topic:u.id,prompt:q.q,answer:q.options[q.answer],options:q.options,why:q.why})),...u.phrases.map(p=>({id:`phrase-${p.id}`,kind:'vocabulary',level:u.level,topic:u.id,prompt:p.tr,answer:p.en,why:p.hint,options:[p.en,...u.phrases.filter(c=>c.id!==p.id).slice(0,2).map(c=>c.en)]}))]);
export const exercises=[...grammar.flatMap(g=>g.exercises),...topics.flatMap(t=>[...t.checks,{...t.checks[0],id:`l-${t.id}`,kind:'listening',context:undefined,audio:t.reading.text}]),...wordExercises,...guideExercises,...legacyExercises];
export const exerciseById=Object.fromEntries(exercises.map(e=>[e.id,e]));
export const wordById=Object.fromEntries(words.map(w=>[w.id,w]));
export const topicById=Object.fromEntries(topics.map(t=>[t.id,t]));
// Stable per-question rotation avoids making the correct option predictably first.
export function optionsFor(q){const opts=[...new Set(q.options||[q.answer])];const n=[...q.id].reduce((sum,c)=>sum+c.charCodeAt(0),0)%opts.length;return [...opts.slice(n),...opts.slice(0,n)];}
export const placementV2=levels.flatMap(level=>{
 const ts=topics.filter(t=>t.level===level);
 return [ts[0].exercises[0],ts[3].exercises[1],ts[6].exercises[2],{...ts[5].checks[0],context:ts[5].reading.text},{...ts[7].checks[1],context:ts[7].reading.text},{...ts[2].checks[0],context:undefined,audio:ts[2].reading.text}];
});
export const audioTexts=[...new Set([
 ...Object.values(scenarios).flatMap(s=>[s.intro,...s.replies]),
 ...legacyWords.flatMap(w=>[w.en,w.example]),
 ...topics.flatMap(t=>[t.reading.text,t.explanation,t.detail,...t.examples.map(e=>e.en)]),
 ...units.flatMap(u=>[u.story,...u.phrases.map(p=>p.en)]),
 'Hello. Let’s learn English together.'
])];
