import test from 'node:test';
import assert from 'node:assert/strict';
import {words,wordById,wordExercises,exerciseById,audioTexts} from '../src/academy/catalog.js';
import {legacyWords} from '../src/academy/words.js';
import {categories,categoryById,partsOfSpeech} from '../src/academy/vocabulary/data.js';
import {wordGuides,guideExercises} from '../src/academy/vocabulary/guides.js';
import {chooseSession} from '../src/academy/vocabulary/practice.js';
import {isCorrect,recordAnswer,mistakeQueue} from '../src/academy/engine.js';
import {freshProgress} from '../src/learning.js';
import {validProgress} from '../src/state.js';

test('thematic vocabulary preserves old IDs, examples, recordings and saved cards',()=>{
 const p=freshProgress();
 for(const original of legacyWords){const w=wordById[original.id];for(const key of Object.keys(original))assert.equal(w[key],original[key],`${w.id}:${key}`);assert.equal(w.hasAudio,true);p.wordCards[w.id]={due:1,last:0,days:0,repetitions:0};p.favourites.push(w.id);}
 assert.ok(validProgress(p));assert.equal(audioTexts.length,636);
 const modern=words.filter(w=>!w.hasAudio);assert.ok(modern.length>900);assert.ok(modern.every(w=>!w.topic));
});
test('all entries have valid taxonomy, examples and stable distinct sense IDs',()=>{
 assert.equal(new Set(words.map(w=>w.id)).size,words.length);assert.equal(new Set(words.map(w=>`${w.en.toLowerCase()}|${w.pos}|${w.domain||''}`)).size,words.length);
 for(const w of words){assert.ok(partsOfSpeech[w.pos],w.en);assert.ok(w.categories.length);for(const id of w.categories)assert.ok(categoryById[id]);assert.ok(w.tr&&w.example&&w.translation,w.en);assert.ok(exerciseById[`v-${w.id}`]);}
 for(const c of categories)assert.ok(words.filter(w=>w.categories.includes(c.id)).length>=15,c.id);
 for(const id of ['furniture','kitchenware','family','relationships','pronouns','determiners','irregular-verbs','regular-verbs','environment','ideas'])assert.ok(categoryById[id]);
 assert.equal(words.find(w=>w.topic&&w.en==='report').pos,'verb');assert.equal(words.find(w=>w.topic&&w.en==='rain').pos,'verb');assert.equal(words.find(w=>w.topic&&w.en==='since').pos,'preposition');
 assert.equal(words.filter(w=>w.en==='her').length,2);
});
test('every verb has usable forms; variants and irregular read are accepted',()=>{
 for(const w of words.filter(w=>w.pos==='verb')){assert.ok(w.forms,w.en);for(const f of ['past','participle']){const q=exerciseById[`${f}-${w.id}`];assert.ok(q);for(const answer of w.forms[f])assert.ok(isCorrect(q,answer),`${w.en}:${answer}`);assert.ok(!q.options.some(s=>s!==q.answer&&q.accept.includes(s)));}}
 const get=words.find(w=>w.en==='get'&&w.pos==='verb');assert.ok(isCorrect(exerciseById[`participle-${get.id}`],'gotten'));
 const read=words.find(w=>w.en==='read'&&w.pos==='verb');assert.deepEqual(read.forms.past,['read']);assert.ok(read.note);
});
test('context questions restore an exact original sentence and all new questions enter mistake review',()=>{
 const context=wordExercises.filter(q=>q.mode==='context');assert.ok(context.length>1000);
 for(const q of context){const sentence=q.prompt.split('\n')[0];assert.equal(sentence.replace('____',q.answer),wordById[q.word].example,q.id);}
 const q=context.find(q=>!wordById[q.word].hasAudio),p=recordAnswer(freshProgress(),q.id,'wrong',100);
 assert.equal(mistakeQueue(p,{all:true})[0].id,q.id);assert.ok(validProgress(p));
});
test('sessions prefer untouched questions, are bounded and do not repeat the same first page',()=>{
 const qs=wordExercises.filter(q=>q.mode==='meaning').slice(0,30),p=freshProgress();
 qs.slice(0,20).forEach(q=>p.attempts[q.id]={count:1,correct:true,last:100});
 const result=chooseSession(qs,p,10,()=>0.5);assert.deepEqual(result.map(q=>q.id),qs.slice(20).map(q=>q.id));assert.equal(new Set(result.map(q=>q.id)).size,10);assert.deepEqual(chooseSession([],p),[]);
});
test('every word type provides teaching, examples and registered practice',()=>{
 for(const pos of Object.keys(partsOfSpeech)){assert.ok(wordGuides[pos].rules.length>=3);assert.ok(wordGuides[pos].examples.length>=2);assert.ok(guideExercises.some(q=>q.pos===pos));}
 for(const q of guideExercises)assert.equal(exerciseById[q.id],q);
});
