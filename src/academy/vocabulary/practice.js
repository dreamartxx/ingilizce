// Keep IDs tied to words, never to the current filtered position.
export function createVocabularyExercises(words){
 const choices=(w,answer,pool,accept=[])=>{
  const unique=[...new Set(pool)].filter(s=>s!==answer&&!accept.includes(s));
  const offset=[...w.id].reduce((n,c)=>n+c.charCodeAt(0),0)%Math.max(1,unique.length);
  return [answer,...[...unique.slice(offset),...unique.slice(0,offset)].slice(0,2)];
 };
 const meaning=words.map(w=>{
  const accept=[...(w.aliases||[]),...words.filter(x=>x.id!==w.id&&x.pos===w.pos&&x.tr===w.tr).map(x=>x.en)];
  const peers=words.filter(x=>x.pos===w.pos&&x.tr!==w.tr&&(!w.domain||x.domain===w.domain));
  return {id:`v-${w.id}`,kind:'vocabulary',mode:'meaning',topic:w.topic,level:w.level,word:w.id,pos:w.pos,prompt:`Bu kartın İngilizcesini hatırla: ${w.tr}`,answer:w.en,accept,options:choices(w,w.en,peers.map(x=>x.en),accept),why:`${w.en} = ${w.tr}. ${w.example} (${w.translation})`};
 });
 const context=words.flatMap(w=>{
  if(w.domain&&w.pos==='phrase')return [];
  const forms=[w.en,...(w.forms?.past||[]),...(w.forms?.participle||[])].sort((a,b)=>b.length-a.length);
  let match;
  for(const form of forms){const escaped=form.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');const re=new RegExp(`(?<![a-z])${escaped}(?![a-z])`,'i');const m=re.exec(w.example);if(m){match={answer:m[0],index:m.index,length:m[0].length};break;}}
  if(!match)return [];
  const {answer,index,length}=match;const accept=answer.toLowerCase()===w.en.toLowerCase()?(w.aliases||[]):[];const sentence=w.example.slice(0,index)+'____'+w.example.slice(index+length);
  const peers=words.filter(x=>(!w.domain||x.domain===w.domain)&&x.pos===w.pos&&x.en.toLowerCase()!==w.en.toLowerCase()&&x.tr!==w.tr).map(x=>x.en).filter(s=>s.toLowerCase()!==answer.toLowerCase());
  return [{id:`context-${w.id}`,kind:'vocabulary',mode:'context',word:w.id,pos:w.pos,topic:w.topic,level:w.level,prompt:`${sentence}\n${w.translation}\nİpucu: ${w.tr}`,answer,accept,options:choices(w,answer,peers,accept),why:`${w.example} — ${w.translation} Kelime: ${w.en}.`}];
 });
 const verbs=words.filter(w=>w.forms);
 const forms=verbs.flatMap(w=>['past','participle'].map(form=>{
  const accept=w.forms[form],answer=accept[0];return {id:`${form}-${w.id}`,kind:'grammar',mode:form,word:w.id,pos:'verb',level:'A2',topic:w.topic,prompt:`${w.en} (${w.tr}) → ${form==='past'?'V2: geçmiş zaman biçimi':'V3: üçüncü hâli'} nedir?`,answer,accept,options:choices(w,answer,[w.en,...verbs.flatMap(v=>v.forms[form])],accept),why:`${w.en} → ${w.forms.past.join(' veya ')} → ${w.forms.participle.join(' veya ')}. ${w.forms.type==='regular'?'Düzenli':'Düzensiz'} fiil. ${w.note||''} ${w.example} (${w.translation})`};
 }));
 return [...meaning,...context,...forms];
}
export function chooseSession(items,p,count=20,random=Math.random){
 // Least recently attempted first; random ties prevent the first page dominating practice.
 return items.map(item=>({item,last:p.attempts?.[item.id]?.last||0,tie:random()})).sort((a,b)=>a.last-b.last||a.tie-b.tie).slice(0,count).map(x=>x.item);
}
