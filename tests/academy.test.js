import test from 'node:test';
import assert from 'node:assert/strict';
import {topics,words,grammar,exercises,exerciseById,levels,placementV2,optionsFor} from '../src/academy/catalog.js';
import {recordAnswer,mistakeQueue,placementResult,markStage} from '../src/academy/engine.js';
import {freshProgress} from '../src/learning.js';
import {validProgress} from '../src/state.js';

test('all four levels have complete curriculum and unique question identities',()=>{
 assert.equal(topics.length,32);assert.equal(words.length,192);
 assert.equal(new Set(exercises.map(q=>q.id)).size,exercises.length);
 for(const l of levels){assert.equal(topics.filter(t=>t.level===l).length,8);assert.equal(words.filter(w=>w.level===l).length,48);}
 for(const t of topics){assert.equal(t.words.length,6);assert.equal(t.exercises.length,4);assert.equal(t.examples.length,3);assert.equal(t.checks.length,2);assert.ok(t.reading.text.length>90);assert.ok(t.reading.translation);assert.ok(t.speaking);}
 for(const w of words)assert.ok(w.en&&w.tr&&w.example&&w.translation);
 for(const q of exercises){assert.ok(q.prompt&&q.answer&&q.why,q.id);assert.ok(q.options.includes(q.answer),q.id);assert.equal(new Set(optionsFor(q)).size,3,q.id);}
 assert.ok(exercises.some(q=>optionsFor(q)[0]!==q.answer));
});
test('wrong answers accumulate and need three distinct correct days to resolve',()=>{
 const id=grammar[0].exercises[0].id,q=exerciseById[id];let p=freshProgress();const now=Date.parse('2026-01-01T09:00:00Z');
 p=recordAnswer(p,id,'is',now);assert.equal(p.mistakes[id].count,1);assert.equal(mistakeQueue(p,{now}).length,1);assert.ok(validProgress(p));
 p=recordAnswer(p,id,'are',now+1);assert.equal(p.mistakes[id].count,2);
 p=recordAnswer(p,id,q.answer,now+2);p=recordAnswer(p,id,q.answer,now+3);assert.equal(p.mistakes[id].correctDays.length,1);assert.equal(p.mistakes[id].resolved,false);
 p=recordAnswer(p,id,q.answer,now+86400000);assert.equal(p.mistakes[id].resolved,false);
 p=recordAnswer(p,id,q.answer,now+2*86400000);assert.equal(p.mistakes[id].resolved,true);assert.equal(mistakeQueue(p,{all:true}).length,0);assert.ok(validProgress(p));
 p=recordAnswer(p,id,'wrong',now+3*86400000);assert.equal(p.mistakes[id].resolved,false);assert.equal(p.mistakes[id].correctDays.length,0);
});
test('unknown IDs and malformed state are rejected while legacy saves remain valid',()=>{
 const p=freshProgress();assert.equal(recordAnswer(p,'unknown','x'),p);
 const legacy={...p};for(const key of ['wordCards','favourites','mistakes','attempts','course','courseDraft','writing','placementV2'])delete legacy[key];assert.ok(validProgress(legacy));
 assert.equal(validProgress({...p,wordCards:{unknown:{due:1,last:0,days:1,repetitions:1}}}),false);
 assert.equal(validProgress({...p,favourites:['unknown']}),false);
 assert.equal(validProgress({...p,mistakes:{[exercises[0].id]:{count:1,wrong:'x',last:1,due:1,correctDays:[],resolved:true}}}),false);
 assert.ok(validProgress(markStage(p,topics[0].id,'explain')));
 assert.equal(validProgress({...p,writing:{[topics[0].id]:'x'.repeat(3001)}}),false);
});
test('placement respects foundations and separately counts skipped listening',()=>{
 const answers=placementV2.map(q=>q.level==='A1'?null:q.answer);const r=placementResult(answers);assert.equal(r.recommended,'A1');assert.equal(r.bands.A1.answered,0);
 const full=placementResult(placementV2.map(q=>q.answer));assert.equal(full.recommended,'B2');assert.ok(validProgress({...freshProgress(),placementV2:full}));
 const skip=placementResult(placementV2.map(q=>q.audio?null:q.answer));assert.equal(skip.bands.B2.answered,5);
});
test('complete new state fits the server payload limit',()=>{
 let p=freshProgress();for(const q of exercises)p=recordAnswer(p,q.id,'x'.repeat(500));for(const t of topics)p.writing[t.id]='x'.repeat(3000);
 assert.ok(validProgress(p));assert.ok(Buffer.byteLength(JSON.stringify({state:p,revision:1}))<512*1024);
});
