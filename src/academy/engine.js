import {exerciseById,placementV2,levels} from './catalog.js';
export const localDay=(time=Date.now())=>new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Istanbul',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date(time));
export const canonical=text=>String(text).normalize('NFKC').toLocaleLowerCase('en').replace(/[’‘]/g,"'").replace(/[.,!?;:"“”]/g,'').replace(/\s+/g,' ').trim();
export const isCorrect=(q,value)=>[q.answer,...(q.accept||[])].some(a=>canonical(a)===canonical(value));
export function recordAnswer(state,id,value,now=Date.now()){
 const q=exerciseById[id];if(!q)return state;
 const correct=isCorrect(q,value),previous=state.mistakes?.[id];
 const attempts={...(state.attempts||{}),[id]:{count:(state.attempts?.[id]?.count||0)+1,correct,last:now}};
 const mistakes={...(state.mistakes||{})};
 if(!correct)mistakes[id]={count:(previous?.count||0)+1,wrong:String(value).slice(0,500),last:now,due:now,correctDays:[],resolved:false};
 else if(previous){const correctDays=[...new Set([...(previous.correctDays||[]),localDay(now)])].slice(-3);mistakes[id]={...previous,last:now,due:now+86400000*Math.max(1,correctDays.length*2),correctDays,resolved:correctDays.length>=3};}
 return {...state,attempts,mistakes};
}
export function mistakeQueue(state,{all=false,kind='all',level='all',now=Date.now()}={}){
 return Object.entries(state.mistakes||{}).filter(([id,m])=>exerciseById[id]&&!m.resolved&&(all||m.due<=now)&&(kind==='all'||exerciseById[id].kind===kind)&&(level==='all'||exerciseById[id].level===level)).sort((a,b)=>b[1].count-a[1].count||a[1].last-b[1].last).map(([id])=>exerciseById[id]);
}
export function placementResult(answers){
 const bands=Object.fromEntries(levels.map(level=>{const qs=placementV2.map((q,i)=>({q,i})).filter(x=>x.q.level===level);return [level,{correct:qs.filter(({q,i})=>answers[i]!==null&&isCorrect(q,answers[i])).length,total:qs.length,answered:qs.filter(({i})=>answers[i]!==null).length}];}));
 let recommended='A1';for(let i=0;i<levels.length-1;i++){if(bands[levels[i]].correct>=4)recommended=levels[i+1];else break;}
 return {recommended,bands,answers,date:new Date().toISOString(),scope:'Çalışma rotası önerisi; konuşma ve yazma ayrıca değerlendirilmelidir.'};
}
export function markStage(state,topic,stage){return {...state,course:{...(state.course||{}),[topic]:[...new Set([...(state.course?.[topic]||[]),stage])]},courseDraft:{topic,stage}};}
