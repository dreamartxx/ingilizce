import {units,allPhrases,resources,placement} from './content.js';
import {wordById,topicById,exerciseById,levels,placementV2} from './academy/catalog.js';
const object=x=>!!x&&typeof x==='object'&&!Array.isArray(x);
const integer=(x,max=1000000)=>Number.isInteger(x)&&x>=0&&x<=max;
export function validProgress(s){
 if(!object(s))return false;
 if(!Array.isArray(s.completed)||s.completed.length>units.length||new Set(s.completed).size!==s.completed.length||s.completed.some(x=>!units.some(u=>u.id===x)))return false;
 if(!object(s.cards)||Object.keys(s.cards).length>allPhrases.length||Object.entries(s.cards).some(([id,c])=>!allPhrases.some(p=>p.id===id)||!object(c)||!Number.isFinite(c.due)||c.due<0||c.due>9e15||!integer(c.repetitions)||!integer(c.days,60)||!Number.isFinite(c.last)||c.last<0))return false;
 if(![10,20,30].includes(s.goal)||!object(s.activity)||!object(s.notes))return false;
 if(Object.keys(s.activity).length>4000||Object.entries(s.activity).some(([day,v])=>!/^\d{4}-\d{2}-\d{2}$/.test(day)||!object(v)||Object.entries(v).some(([k,n])=>!['assessment','lessons','reviews','conversations','library','exercises'].includes(k)||!integer(n))))return false;
 if(Object.entries(s.notes).some(([k,v])=>!resources.some(r=>r.id===k)||typeof v!=='string'||v.length>3000))return false;
 if(s.assessment!==null){const a=s.assessment;if(!object(a)||!['A1 başlangıç','A1 pekiştirme','A2 çalışma','B1 keşif'].includes(a.level)||!integer(a.score,12)||a.total!==12||typeof a.date!=='string'||!Number.isFinite(Date.parse(a.date))||!Array.isArray(a.answers)||a.answers.length!==placement.length||a.answers.some(v=>v!==null&&!integer(v,2))||!object(a.skills))return false;for(const skill of ['Temel yapı','Okuma','Dinleme']){const v=a.skills[skill];if(!object(v)||v.total!==4||!integer(v.correct,4)||!integer(v.answered,4)||v.correct>v.answered)return false;}}
 if(s.lessonDraft!==null&&(!object(s.lessonDraft)||!units.some(u=>u.id===s.lessonDraft.unit)||!['learn','recall','listen','read','speak'].includes(s.lessonDraft.phase)||!integer(s.lessonDraft.index,5)))return false;
 const finite=x=>Number.isFinite(x)&&x>=0&&x<=9e15;
 const mapValid=(value,registry,check)=>value===undefined||(object(value)&&Object.keys(value).length<=Object.keys(registry).length&&Object.entries(value).every(([id,v])=>Object.hasOwn(registry,id)&&check(v)));
 if(!mapValid(s.wordCards,wordById,c=>object(c)&&finite(c.due)&&finite(c.last)&&integer(c.days,60)&&integer(c.repetitions)))return false;
 if(s.favourites!==undefined&&(!Array.isArray(s.favourites)||s.favourites.length>Object.keys(wordById).length||new Set(s.favourites).size!==s.favourites.length||s.favourites.some(id=>!Object.hasOwn(wordById,id))))return false;
 if(!mapValid(s.attempts,exerciseById,a=>object(a)&&integer(a.count)&&typeof a.correct==='boolean'&&finite(a.last)))return false;
 if(!mapValid(s.mistakes,exerciseById,m=>object(m)&&integer(m.count)&&typeof m.wrong==='string'&&m.wrong.length<=500&&finite(m.last)&&finite(m.due)&&typeof m.resolved==='boolean'&&Array.isArray(m.correctDays)&&m.correctDays.length<=3&&new Set(m.correctDays).size===m.correctDays.length&&m.correctDays.every(d=>typeof d==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(d))&&m.resolved===(m.correctDays.length===3)))return false;
 const stages=['explain','words','grammar','listen','read','speak'];
 if(!mapValid(s.course,topicById,a=>Array.isArray(a)&&a.length<=6&&new Set(a).size===a.length&&a.every(x=>stages.includes(x))))return false;
 if(!mapValid(s.writing,topicById,v=>typeof v==='string'&&v.length<=3000))return false;
 if(s.courseDraft!=null&&(!object(s.courseDraft)||!Object.hasOwn(topicById,s.courseDraft.topic)||!stages.includes(s.courseDraft.stage)))return false;
 if(s.placementV2!=null){const a=s.placementV2;if(!object(a)||!levels.includes(a.recommended)||!Array.isArray(a.answers)||a.answers.length!==placementV2.length||a.answers.some((v,i)=>v!==null&&!placementV2[i].options.includes(v))||typeof a.date!=='string'||!Number.isFinite(Date.parse(a.date))||!object(a.bands)||typeof a.scope!=='string'||a.scope.length>300)return false;for(const l of levels){const b=a.bands[l];if(!object(b)||b.total!==6||!integer(b.correct,6)||!integer(b.answered,6)||b.correct>b.answered)return false;}}
 return true;
}
