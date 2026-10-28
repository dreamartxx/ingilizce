import {placement,units} from './content.js';
export const freshProgress = () => ({assessment:null,completed:[],cards:{},activity:{},goal:20,notes:{},lessonDraft:null,wordCards:{},favourites:[],mistakes:{},attempts:{},course:{},courseDraft:null,writing:{},placementV2:null});
export const dayKey = (date=new Date()) => new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Istanbul',year:'numeric',month:'2-digit',day:'2-digit'}).format(date);
export function assess(answers) {
 const evaluated=placement.map((q,i)=>({...q,skipped:answers[i]===null,correct:answers[i]===q.answer}));
 const score=evaluated.filter(q=>q.correct).length;
 const count=level=>evaluated.filter(q=>q.level===level&&q.correct).length;
 const level=count('A1')<3?'A1 başlangıç':count('A2')<4?'A1 pekiştirme':count('B1')<2?'A2 çalışma':'B1 keşif';
 const skills=Object.fromEntries(['Temel yapı','Okuma','Dinleme'].map(s=>{const qs=evaluated.filter(q=>q.skill===s);return [s,{correct:qs.filter(q=>q.correct).length,total:qs.length,answered:qs.filter(q=>!q.skipped).length}]}));
 return {level,score,total:placement.length,skills,date:new Date().toISOString(),answers};
}
export function scheduleReview(previous, rating, now=Date.now()) {
 const repetitions=rating==='again'?0:(previous?.repetitions||0)+1;
 const days=rating==='again'?0:rating==='hard'?1:Math.min(60,Math.round((previous?.days||1)*(rating==='easy'?3:2)));
 return {repetitions,days,due:now+(rating==='again'?10*60*1000:days*86400000),last:now};
}
export function recordActivity(p,kind,amount=1){const day=dayKey();return {...p,activity:{...p.activity,[day]:{...p.activity[day],[kind]:(p.activity[day]?.[kind]||0)+amount}}};}
export function streak(activity, now=new Date()) {let n=0;const d=new Date(now); if(!activity[dayKey(d)])d.setDate(d.getDate()-1);while(activity[dayKey(d)]){n++;d.setDate(d.getDate()-1);}return n;}
export function normalize(text){return text.toLowerCase().replace(/[’‘]/g,"'").replace(/[^a-z0-9' ]/g,'').replace(/\s+/g,' ').trim();}

export function recommendedUnit(p){const offset=p.assessment?.level?.startsWith('B1')?6:p.assessment?.level?.startsWith('A2')?5:0;return [...units.slice(offset),...units.slice(0,offset)].find(u=>!p.completed.includes(u.id))||units[0];}
