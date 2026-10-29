import test from 'node:test';
import assert from 'node:assert/strict';
import {medicalWords,medicalCategories} from '../src/academy/medical/index.js';
import {medicalDialogues,medicalDialogueExercises} from '../src/academy/medical/dialogues.js';
import {words,wordById,wordExercises,exerciseById,audioTexts} from '../src/academy/catalog.js';
import {freshProgress} from '../src/learning.js';
import {recordAnswer,mistakeQueue,isCorrect} from '../src/academy/engine.js';
import {validProgress} from '../src/state.js';

test('Muayene has a complete parent category, distinct clinical senses and supported forms',()=>{
 assert.equal(medicalCategories[0].id,'muayene');assert.equal(medicalCategories[0].title,'Muayene');assert.equal(medicalCategories.length,16);
 assert.equal(medicalWords.length,365);assert.equal(new Set(medicalWords.map(w=>w.id)).size,365);
 assert.equal(medicalWords.filter(w=>w.forms).length,45);assert.equal(medicalWords.filter(w=>w.pos==='phrase').length,65);
 for(const w of medicalWords){assert.ok(w.categories.includes('muayene'));assert.equal(w.domain,'clinical');assert.equal(w.hasAudio,false);assert.ok(wordById[w.id]);assert.ok(w.tr&&w.example&&w.translation);}
 for(const c of medicalCategories.slice(1)){assert.equal(c.parent,'muayene');assert.ok(medicalWords.filter(w=>w.categories.includes(c.id)).length>=20,c.id);}
 const clinical=wordById['clinical-noun-stool'],ordinary=words.find(w=>w.en==='stool'&&!w.domain);
 assert.equal(clinical.tr,'dışkı');if(ordinary)assert.notEqual(clinical.id,ordinary.id);
 assert.equal(wordById['clinical-verb-discharge'].tr,'taburcu etmek');assert.equal(audioTexts.length,636);
});
test('medical aliases and inflections are accepted without presenting other valid variants as wrong options',()=>{
 for(const w of medicalWords){const q=exerciseById[`v-${w.id}`];assert.ok(q);for(const alias of w.aliases||[])assert.ok(isCorrect(q,alias));for(const f of w.forms?['past','participle']:[]){const q=exerciseById[`${f}-${w.id}`];for(const form of w.forms[f])assert.ok(isCorrect(q,form));}}
 assert.ok(isCorrect(exerciseById['v-clinical-noun-diarrhoea'],'diarrhea'));assert.ok(isCorrect(exerciseById['v-clinical-noun-electrocardiogram'],'EKG'));
 assert.equal(wordExercises.filter(q=>q.word?.startsWith('clinical-')).length,755);
});
test('clinical cards and dialogue errors round-trip through the existing progress schema',()=>{
 let p=freshProgress();for(const w of medicalWords)p.wordCards[w.id]={due:1,last:0,days:0,repetitions:0};
 const ids=['v-clinical-noun-blood-pressure','past-clinical-verb-bleed',medicalDialogueExercises[0].id];for(const id of ids)p=recordAnswer(p,id,'wrong',1);
 assert.ok(validProgress(p));const restored=JSON.parse(JSON.stringify(p));assert.ok(validProgress(restored));assert.deepEqual(mistakeQueue(restored,{all:true}).map(q=>q.id),ids);
});
test('eight bilingual conversations have both roles and registered comprehension exercises',()=>{
 assert.equal(medicalDialogues.length,8);assert.equal(medicalDialogueExercises.length,16);
 for(const d of medicalDialogues){assert.ok(d.lines.length>=6);assert.ok(d.lines.some(l=>l[0]==='doctor'));assert.ok(d.lines.some(l=>l[0]==='patient'));for(const [role,en,tr] of d.lines)assert.ok(['doctor','patient'].includes(role)&&en&&tr);assert.equal(medicalDialogueExercises.filter(q=>q.dialogue===d.id).length,2);}
 for(const q of medicalDialogueExercises)assert.equal(exerciseById[q.id],q);
});
