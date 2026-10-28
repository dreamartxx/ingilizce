import {units,allPhrases,resources,placement} from './content.js';
const object=x=>!!x&&typeof x==='object'&&!Array.isArray(x);
const integer=(x,max=1000000)=>Number.isInteger(x)&&x>=0&&x<=max;
export function validProgress(s){
 if(!object(s))return false;
 if(!Array.isArray(s.completed)||s.completed.length>units.length||new Set(s.completed).size!==s.completed.length||s.completed.some(x=>!units.some(u=>u.id===x)))return false;
 if(!object(s.cards)||Object.keys(s.cards).length>allPhrases.length||Object.entries(s.cards).some(([id,c])=>!allPhrases.some(p=>p.id===id)||!object(c)||!Number.isFinite(c.due)||c.due<0||c.due>9e15||!integer(c.repetitions)||!integer(c.days,60)||!Number.isFinite(c.last)||c.last<0))return false;
 if(![10,20,30].includes(s.goal)||!object(s.activity)||!object(s.notes))return false;
 if(Object.keys(s.activity).length>4000||Object.entries(s.activity).some(([day,v])=>!/^\d{4}-\d{2}-\d{2}$/.test(day)||!object(v)||Object.entries(v).some(([k,n])=>!['assessment','lessons','reviews','conversations','library'].includes(k)||!integer(n))))return false;
 if(Object.entries(s.notes).some(([k,v])=>!resources.some(r=>r.id===k)||typeof v!=='string'||v.length>3000))return false;
 if(s.assessment!==null){const a=s.assessment;if(!object(a)||!['A1 başlangıç','A1 pekiştirme','A2 çalışma','B1 keşif'].includes(a.level)||!integer(a.score,12)||a.total!==12||typeof a.date!=='string'||!Number.isFinite(Date.parse(a.date))||!Array.isArray(a.answers)||a.answers.length!==placement.length||a.answers.some(v=>v!==null&&!integer(v,2))||!object(a.skills))return false;for(const skill of ['Temel yapı','Okuma','Dinleme']){const v=a.skills[skill];if(!object(v)||v.total!==4||!integer(v.correct,4)||!integer(v.answered,4)||v.correct>v.answered)return false;}}
 if(s.lessonDraft!==null&&(!object(s.lessonDraft)||!units.some(u=>u.id===s.lessonDraft.unit)||!['learn','recall','listen','read','speak'].includes(s.lessonDraft.phase)||!integer(s.lessonDraft.index,5)))return false;
 return true;
}
